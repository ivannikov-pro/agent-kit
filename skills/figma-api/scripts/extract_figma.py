#!/usr/bin/env python3
"""
Figma Design Data Extractor for IVANNIKOV.PRO

Extracts all CSS-relevant properties from a Figma file via REST API.
Designed to minimize API calls to stay within rate limits.

Usage:
  1. Copy .env.example → .env and set FIGMA_TOKEN
  2. python3 extract_figma.py

─────────────────────────────────────────────────────────────────
⚠️  RATE LIMITS (as of Nov 2025):
    Figma rate limits are per-account, per-minute, based on:
      - Seat type (View/Collab/Dev/Full)
      - Endpoint tier (1/2/3)
      - Plan (Starter/Pro/Org/Enterprise)

    Tier 1 endpoints (GET /files, GET /files/nodes):
      - Starter plan or View seats: UP TO 6 PER MONTH (!)
      - Pro plan Full seats: 10 per minute
      - Org plan Full seats: 15 per minute

    Tier 2 endpoints (GET /images, GET /files/images):
      - View/Collab seats: 5 per minute
      - Pro Full seats: 25 per minute

    Strategy: batch all node IDs in ONE /nodes call (Tier 1),
    then use /images calls (Tier 2) which have higher limits.
─────────────────────────────────────────────────────────────────
"""
import json
import time
import urllib.request
import urllib.error
import os
import sys
from pathlib import Path

# ── Config ──────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent.resolve()
DEST = SCRIPT_DIR

# Load .env
env_file = SCRIPT_DIR / ".env"
if env_file.exists():
    for line in env_file.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

TOKEN = os.environ.get("FIGMA_TOKEN")
if not TOKEN:
    print("❌ FIGMA_TOKEN not set. Create a .env file or export FIGMA_TOKEN.")
    sys.exit(1)

FILE_ID = os.environ.get("FIGMA_FILE_ID", "Vi8yLE5reGrNXWfICflWAG")

# ── Rate limit aware API helper ─────────────────────────────
api_call_count = 0
tier1_calls = 0
tier2_calls = 0

# Tier 1: GET /files, GET /files/nodes — MOST RESTRICTED
# Tier 2: GET /images, GET /files/images — less restricted
TIER1_ENDPOINTS = ["/files/"]
TIER2_ENDPOINTS = ["/images/", "/images?"]


def get_endpoint_tier(url):
    if "/images" in url:
        return 2
    return 1


def api_get(endpoint, retries=3, base_delay=60):
    """Fetch from Figma API with rate-limit awareness."""
    global api_call_count, tier1_calls, tier2_calls
    url = f"https://api.figma.com/v1/{endpoint}"
    tier = get_endpoint_tier(url)

    for attempt in range(retries):
        req = urllib.request.Request(url, headers={"X-Figma-Token": TOKEN})
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                api_call_count += 1
                if tier == 1:
                    tier1_calls += 1
                else:
                    tier2_calls += 1
                data = json.loads(resp.read())
                # Check for rate limit in response body
                if isinstance(data, dict) and data.get("status") == 429:
                    raise urllib.error.HTTPError(url, 429, "Rate limited", {}, None)
                return data
        except urllib.error.HTTPError as e:
            if e.code == 429:
                # Read Retry-After header
                retry_after = None
                if hasattr(e, "headers"):
                    retry_after = e.headers.get("Retry-After")

                if retry_after:
                    retry_seconds = int(retry_after)
                    if retry_seconds > 300:
                        # Long block (days) — per-account monthly limit hit
                        hours = retry_seconds / 3600
                        print(f"\n  🚫 HARD RATE LIMIT: retry-after={retry_seconds}s ({hours:.1f} hours)")
                        print(f"     This is likely a monthly quota limit for your seat type.")
                        print(f"     Solution: upgrade to Pro plan with Full seat, or wait.")
                        print(f"     Total API calls made: {api_call_count} (Tier1: {tier1_calls}, Tier2: {tier2_calls})")
                        return None
                    wait = retry_seconds + 5
                else:
                    wait = base_delay * (attempt + 1)

                if attempt < retries - 1:
                    print(f"  ⏳ Rate limited, waiting {wait}s... ({attempt+1}/{retries})")
                    time.sleep(wait)
                else:
                    print(f"  ❌ Rate limit persists after {retries} retries")
                    return None
            else:
                print(f"  ❌ HTTP {e.code}: {e.reason}")
                return None
        except Exception as e:
            print(f"  ❌ Error: {e}")
            return None
    return None


def download_file(url, dest_path):
    """Download a file from URL."""
    try:
        urllib.request.urlretrieve(url, str(dest_path))
        return True
    except Exception as e:
        print(f"  ❌ Download failed: {e}")
        return False


# ── Node extraction ─────────────────────────────────────────
def rgba_to_hex(c):
    r, g, b = int(c.get("r", 0) * 255), int(c.get("g", 0) * 255), int(c.get("b", 0) * 255)
    return f"#{r:02x}{g:02x}{b:02x}"


def rgba_to_css(c, opacity=None):
    r, g, b = int(c.get("r", 0) * 255), int(c.get("g", 0) * 255), int(c.get("b", 0) * 255)
    a = opacity if opacity is not None else c.get("a", 1.0)
    if a < 1:
        return f"rgba({r}, {g}, {b}, {round(a, 2)})"
    return f"#{r:02x}{g:02x}{b:02x}"


def extract_fill(fill):
    result = {"type": fill.get("type", "SOLID")}
    if fill.get("type") == "SOLID":
        c = fill.get("color", {})
        result["css"] = rgba_to_css(c, fill.get("opacity"))
        result["hex"] = rgba_to_hex(c)
    elif fill.get("type") in ("GRADIENT_LINEAR", "GRADIENT_RADIAL"):
        result["stops"] = [
            {"color": rgba_to_css(s.get("color", {})), "position": round(s.get("position", 0), 3)}
            for s in fill.get("gradientStops", [])
        ]
    elif fill.get("type") == "IMAGE":
        result["imageRef"] = fill.get("imageRef", "")
        result["scaleMode"] = fill.get("scaleMode", "")
    return result


def extract_effect(eff):
    result = {"type": eff.get("type", "")}
    if eff.get("type") in ("DROP_SHADOW", "INNER_SHADOW"):
        result["css"] = rgba_to_css(eff.get("color", {}))
        result["offset"] = {
            "x": eff.get("offset", {}).get("x", 0),
            "y": eff.get("offset", {}).get("y", 0),
        }
        result["radius"] = eff.get("radius", 0)
        result["spread"] = eff.get("spread", 0)
    elif eff.get("type") in ("LAYER_BLUR", "BACKGROUND_BLUR"):
        result["radius"] = eff.get("radius", 0)
    return result


def extract_node(node, depth=0, max_depth=20):
    """Recursively extract all CSS-relevant properties."""
    n = {"name": node.get("name", ""), "type": node.get("type", "")}

    bb = node.get("absoluteBoundingBox")
    if bb:
        n["x"] = round(bb.get("x", 0), 1)
        n["y"] = round(bb.get("y", 0), 1)
        n["width"] = round(bb.get("width", 0), 1)
        n["height"] = round(bb.get("height", 0), 1)

    fills = [f for f in node.get("fills", []) if f.get("visible", True)]
    if fills:
        n["fills"] = [extract_fill(f) for f in fills]

    strokes = [s for s in node.get("strokes", []) if s.get("visible", True)]
    if strokes:
        n["strokes"] = [extract_fill(s) for s in strokes]
        if node.get("strokeWeight"):
            n["strokeWeight"] = node["strokeWeight"]
        if node.get("strokeAlign"):
            n["strokeAlign"] = node["strokeAlign"]

    effects = [e for e in node.get("effects", []) if e.get("visible", True)]
    if effects:
        n["effects"] = [extract_effect(e) for e in effects]

    if node.get("cornerRadius"):
        n["borderRadius"] = node["cornerRadius"]
    if node.get("rectangleCornerRadii"):
        n["borderRadii"] = node["rectangleCornerRadii"]

    if any(node.get(k) for k in ["paddingLeft", "paddingTop", "paddingRight", "paddingBottom"]):
        n["padding"] = {
            "top": node.get("paddingTop", 0),
            "right": node.get("paddingRight", 0),
            "bottom": node.get("paddingBottom", 0),
            "left": node.get("paddingLeft", 0),
        }

    if node.get("layoutMode"):
        n["layout"] = {
            "mode": node["layoutMode"],
            "gap": node.get("itemSpacing", 0),
            "primaryAlign": node.get("primaryAxisAlignItems", ""),
            "crossAlign": node.get("counterAxisAlignItems", ""),
            "sizingH": node.get("layoutSizingHorizontal", ""),
            "sizingV": node.get("layoutSizingVertical", ""),
        }

    if node.get("opacity") is not None and node["opacity"] < 1:
        n["opacity"] = round(node["opacity"], 2)
    if node.get("blendMode") and node["blendMode"] != "PASS_THROUGH":
        n["blendMode"] = node["blendMode"]
    if node.get("clipsContent"):
        n["overflow"] = "hidden"

    if node.get("type") == "TEXT":
        n["text"] = node.get("characters", "")
        s = node.get("style", {})
        n["textStyle"] = {
            "fontFamily": s.get("fontFamily", ""),
            "fontWeight": s.get("fontWeight", ""),
            "fontSize": s.get("fontSize", ""),
            "lineHeightPx": round(s.get("lineHeightPx", 0), 1),
            "letterSpacing": round(s.get("letterSpacing", 0), 2),
            "textAlign": s.get("textAlignHorizontal", ""),
            "textCase": s.get("textCase", "ORIGINAL"),
            "textDecoration": s.get("textDecoration", "NONE"),
        }
        text_fills = [f for f in node.get("fills", []) if f.get("visible", True)]
        if text_fills and text_fills[0].get("color"):
            n["textColor"] = rgba_to_css(text_fills[0]["color"], text_fills[0].get("opacity"))

    if node.get("type") in ("INSTANCE", "COMPONENT") and node.get("componentId"):
        n["componentId"] = node["componentId"]

    children = node.get("children", [])
    if children and depth < max_depth:
        n["children"] = [extract_node(c, depth + 1, max_depth) for c in children]

    return n


def collect_image_refs(node, refs=None):
    if refs is None:
        refs = set()
    for fill in node.get("fills", []):
        ref = fill.get("imageRef")
        if ref:
            refs.add(ref)
    for child in node.get("children", []):
        collect_image_refs(child, refs)
    return refs


def collect_component_ids(node, components=None):
    if components is None:
        components = {}
    if node.get("type") in ("COMPONENT", "COMPONENT_SET"):
        node_id = node.get("id")
        if node_id:
            components[node_id] = node.get("name", "unknown")
    for child in node.get("children", []):
        collect_component_ids(child, components)
    return components


# ── Main ────────────────────────────────────────────────────
def main():
    print("🎨 IVANNIKOV.PRO Figma Design Extractor")
    print("=" * 60)
    print(f"File ID: {FILE_ID}")
    print(f"Output:  {DEST}")
    print()
    print("📋 Strategy: minimize Tier 1 calls (strictest limit)")
    print("   Tier 1 (GET /files, /nodes): 6/month for View seats!")
    print("   Tier 2 (GET /images): 5/min for View seats")
    print()

    exports_dir = DEST / "exports"
    icons_dir = DEST / "exports" / "icons"
    images_dir = DEST / "exports" / "images"
    exports_dir.mkdir(exist_ok=True)
    icons_dir.mkdir(exist_ok=True)
    images_dir.mkdir(exist_ok=True)

    # ────────────────────────────────────────────────────────
    # TIER 1 CALL #1: Get file overview (depth=2)
    # This gives us all page IDs and their top-level frame IDs
    # ────────────────────────────────────────────────────────
    print("📄 [Tier1 #1] File overview (depth=2)...")
    overview = api_get(f"files/{FILE_ID}?depth=2")
    if not overview:
        print("❌ Cannot access file. Check token, file ID, and rate limits.")
        print(f"   API calls used: {api_call_count}")
        sys.exit(1)

    overview_path = DEST / "figma-api-overview.json"
    with open(overview_path, "w") as f:
        json.dump(overview, f, indent=2, ensure_ascii=False)

    pages = overview.get("document", {}).get("children", [])
    print(f"  ✅ {len(pages)} pages found")
    for p in pages:
        frames = len(p.get("children", []))
        print(f"     {p['name']} ({p['id']}): {frames} frames")

    # Collect ALL node IDs we want to fetch (excl. trash)
    all_node_ids = []
    page_frame_map = {}  # node_id → "page/frame" key
    for page in pages:
        if page["name"] == "trash":
            continue
        for frame in page.get("children", []):
            fid = frame.get("id")
            if fid:
                all_node_ids.append(fid)
                page_frame_map[fid] = f"{page['name']}/{frame.get('name', 'unknown')}"

    print(f"\n  Total frames to fetch: {len(all_node_ids)} (excl. trash)")

    # ────────────────────────────────────────────────────────
    # TIER 1 CALL #2: Batch fetch ALL nodes in ONE call
    # The /nodes endpoint accepts multiple IDs — use them all!
    # ────────────────────────────────────────────────────────
    ids_str = ",".join(all_node_ids)
    print(f"\n📄 [Tier1 #2] Batch fetch all {len(all_node_ids)} nodes...")
    nodes_data = api_get(f"files/{FILE_ID}/nodes?ids={ids_str}")

    if not nodes_data:
        print("  ❌ Failed to fetch nodes")
        print(f"  API calls used: {api_call_count} (Tier1: {tier1_calls}, Tier2: {tier2_calls})")
        sys.exit(1)

    # ── Process nodes ───────────────────────────────────────
    print("\n📄 Processing nodes...")
    spec = {}
    all_image_refs = set()
    all_component_ids = {}

    for node_id, node_data in nodes_data.get("nodes", {}).items():
        if node_data is None:
            print(f"  ⚠️ {node_id}: null (not accessible)")
            continue
        doc = node_data.get("document")
        if doc is None:
            continue

        key = page_frame_map.get(node_id, doc.get("name", node_id))
        bb = doc.get("absoluteBoundingBox", {})
        w, h = bb.get("width", 0), bb.get("height", 0)
        print(f"  ✅ {key} ({w:.0f}×{h:.0f})")

        spec[key] = extract_node(doc)
        collect_image_refs(doc, all_image_refs)
        collect_component_ids(doc, all_component_ids)

    # Save design spec
    spec_path = DEST / "design-spec.json"
    with open(spec_path, "w") as f:
        json.dump(spec, f, indent=2, ensure_ascii=False)
    print(f"\n  ✅ design-spec.json: {os.path.getsize(spec_path) / 1024:.1f} KB, {len(spec)} sections")

    # ────────────────────────────────────────────────────────
    # TIER 2: Export screen PNGs (higher rate limit)
    # ────────────────────────────────────────────────────────
    print(f"\n📄 [Tier2] Exporting screen PNGs...")
    export_ids = {}
    for page in pages:
        if page["name"] == "trash":
            continue
        for frame in page.get("children", []):
            bb = frame.get("absoluteBoundingBox", {})
            w, h = bb.get("width", 0), bb.get("height", 0)
            if w > 100 and h > 100:
                safe_name = f"{page['name']}-{frame['name']}".replace(" ", "-").replace("/", "_")
                export_ids[frame["id"]] = safe_name

    if export_ids:
        # Batch all IDs in one /images call
        ids_str = ",".join(export_ids.keys())
        print(f"  Requesting {len(export_ids)} screens as PNG...")
        time.sleep(2)  # small courtesy delay
        img_data = api_get(f"images/{FILE_ID}?ids={ids_str}&format=png&scale=0.5")
        if img_data and img_data.get("images"):
            for nid, url in img_data["images"].items():
                if url:
                    name = export_ids.get(nid, nid.replace(":", "-"))
                    dest_file = exports_dir / f"{name}.png"
                    if download_file(url, dest_file):
                        print(f"    ✅ {dest_file.name}")

    # ────────────────────────────────────────────────────────
    # TIER 2: Export SVG icons (individual components)
    # ────────────────────────────────────────────────────────
    print(f"\n📄 [Tier2] Exporting SVG icons...")
    if all_component_ids:
        comp_ids = list(all_component_ids.keys())[:50]
        ids_str = ",".join(comp_ids)
        print(f"  Requesting {len(comp_ids)} components as SVG...")
        time.sleep(2)
        svg_data = api_get(f"images/{FILE_ID}?ids={ids_str}&format=svg")
        if svg_data and svg_data.get("images"):
            for nid, url in svg_data["images"].items():
                if url:
                    name = all_component_ids.get(nid, nid.replace(":", "-"))
                    safe = name.replace(" ", "-").replace("/", "_").replace("*", "").lower()
                    dest_file = icons_dir / f"{safe}.svg"
                    if download_file(url, dest_file):
                        print(f"    ✅ {dest_file.name}")

    # ────────────────────────────────────────────────────────
    # TIER 2: Fetch embedded images
    # ────────────────────────────────────────────────────────
    print(f"\n📄 [Tier2] Fetching embedded images...")
    if all_image_refs:
        print(f"  Found {len(all_image_refs)} image references")
        time.sleep(2)
        img_fills = api_get(f"files/{FILE_ID}/images")
        if img_fills and img_fills.get("meta", {}).get("images"):
            images_map = img_fills["meta"]["images"]
            for ref in all_image_refs:
                url = images_map.get(ref)
                if url:
                    ext = "png"
                    if ".jpg" in url or ".jpeg" in url:
                        ext = "jpg"
                    elif ".svg" in url:
                        ext = "svg"
                    dest_file = images_dir / f"{ref}.{ext}"
                    if download_file(url, dest_file):
                        print(f"    ✅ {dest_file.name}")
            with open(DEST / "image-refs.json", "w") as f:
                json.dump({"refs": list(all_image_refs), "urls": images_map}, f, indent=2)
            print(f"  ✅ image-refs.json")
    else:
        print("  No embedded images found")

    # ── Summary ─────────────────────────────────────────────
    print("\n" + "=" * 60)
    print("🎉 Extraction complete!")
    print(f"   Sections:    {len(spec)}")
    print(f"   Components:  {len(all_component_ids)}")
    print(f"   Image refs:  {len(all_image_refs)}")
    print(f"   API calls:   {api_call_count} total")
    print(f"     Tier 1:    {tier1_calls} (file data — STRICTEST)")
    print(f"     Tier 2:    {tier2_calls} (images)")
    total = sum(f.stat().st_size for f in DEST.rglob("*") if f.is_file() and f.name != "IVANNIKOV.PRO.fig")
    print(f"   Total size:  {total / 1024 / 1024:.1f} MB (excl. .fig)")


if __name__ == "__main__":
    main()
