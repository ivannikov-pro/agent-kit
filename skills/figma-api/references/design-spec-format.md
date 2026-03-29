# design-spec.json — Node Structure

The `extract_figma.py` script produces a `design-spec.json` file containing every visible node in the Figma file with all CSS-relevant properties.

## Node Schema

```jsonc
{
  "name": "element name",
  "type": "FRAME | TEXT | RECTANGLE | INSTANCE | COMPONENT | ...",
  "x": 0,
  "y": 0, // absolute position
  "width": 1440,
  "height": 900, // dimensions

  // ── Backgrounds & borders ──────────────────────────
  "fills": [{ "type": "SOLID", "css": "#1e1e20", "hex": "#1e1e20" }],
  "strokes": [{ "type": "SOLID", "css": "#343639", "hex": "#343639" }],
  "strokeWeight": 1,
  "borderRadius": 8, // or borderRadii: [tl, tr, br, bl]

  // ── Spacing ────────────────────────────────────────
  "padding": { "top": 16, "right": 24, "bottom": 16, "left": 24 },

  // ── Flexbox ────────────────────────────────────────
  "layout": {
    "mode": "HORIZONTAL", // → display: flex; flex-direction: row
    "gap": 16, // → gap: 16px
    "primaryAlign": "CENTER", // → justify-content
    "crossAlign": "CENTER", // → align-items
    "sizingH": "FIXED", // FIXED | HUG | FILL
    "sizingV": "HUG",
  },

  // ── Effects ────────────────────────────────────────
  "effects": [
    {
      "type": "DROP_SHADOW",
      "css": "rgba(0, 0, 0, 0.25)",
      "offset": { "x": 0, "y": 4 },
      "radius": 12,
      "spread": 0,
    },
  ],

  // ── Text ───────────────────────────────────────────
  "text": "Hello World",
  "textColor": "#ffffff",
  "textStyle": {
    "fontFamily": "Renner*",
    "fontWeight": 500,
    "fontSize": 36,
    "lineHeightPx": 40,
    "letterSpacing": 0,
    "textAlign": "LEFT",
    "textCase": "ORIGINAL",
    "textDecoration": "NONE",
  },

  // ── Other ──────────────────────────────────────────
  "opacity": 0.8,
  "blendMode": "MULTIPLY",
  "overflow": "hidden",
  "componentId": "186:701", // for INSTANCE/COMPONENT types
  "children": [
    /* nested nodes */
  ],
}
```

## Fill Types

| Fill Type         | Fields                       |
| ----------------- | ---------------------------- |
| `SOLID`           | `css`, `hex`                 |
| `GRADIENT_LINEAR` | `stops: [{color, position}]` |
| `GRADIENT_RADIAL` | `stops: [{color, position}]` |
| `IMAGE`           | `imageRef`, `scaleMode`      |

## Figma Layout Mode → CSS

| Figma                    | CSS                       |
| ------------------------ | ------------------------- |
| `mode: "HORIZONTAL"`     | `flex-direction: row`     |
| `mode: "VERTICAL"`       | `flex-direction: column`  |
| `primaryAlign: "CENTER"` | `justify-content: center` |
| `crossAlign: "CENTER"`   | `align-items: center`     |
| `sizingH: "FILL"`        | `width: 100%` / `flex: 1` |
| `sizingH: "HUG"`         | `width: fit-content`      |
| `sizingH: "FIXED"`       | `width: <value>px`        |

## Working with the JSON

```python
import json

with open("design-spec.json") as f:
    spec = json.load(f)

# Iterate top-level sections
for section_name, node in spec.items():
    print(f"{section_name}: {node['width']}×{node['height']}")

# Find all text nodes
def find_texts(node, texts=None):
    if texts is None: texts = []
    if node.get("type") == "TEXT":
        texts.append({"text": node.get("text"), "style": node.get("textStyle")})
    for child in node.get("children", []):
        find_texts(child, texts)
    return texts
```
