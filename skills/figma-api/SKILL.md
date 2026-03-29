---
name: figma-api
description: How to extract design data from Figma REST API — tokens, SVG icons, images, layout specs. Use when setting up design-to-code pipeline or updating design assets from Figma.
category: design
risk: safe
source: community
tags: [figma, design-tokens, svg, design-system, extraction, svgr, react-icons]
tools: [claude, cursor, gemini, antigravity, copilot, windsurf, kiro, codex]
date_added: "2026-03-27"
license: MIT
compatibility: Requires Python 3.8+ (no pip deps). Node.js 18+ for SVG→React.
metadata:
  author: ivannikov-pro
  version: "1.0.0"
---

# Figma API

Extract design data, tokens, SVG icons, and embedded images from any Figma file via REST API. Includes rate-limit-aware Python extractor and SVG → React component pipeline.

> **Source:** [Figma REST API docs](https://www.figma.com/developers/api)
> **Skill updated:** 2026-03-27

## When to Use

- Extracting design tokens (colors, typography, spacing) from a Figma file
- Downloading SVG icons and converting them to React/TSX components
- Downloading embedded photographs and illustrations from Figma
- Setting up a repeatable, automated design-to-code pipeline
- Re-extracting assets after Figma design changes

## When NOT to Use

- Real-time Figma collaboration — use Figma Dev Mode MCP server instead
- Editing Figma files programmatically — the REST API is read-only for design data
- Working with Figma Variables API — this skill covers `/files` and `/images` endpoints only
- One-off manual exports — use Figma UI export (Ctrl+Shift+E) instead

## Skill Contents

```
figma-api/
├── SKILL.md                        # This file
├── .env.example                    # Figma API credentials template
├── scripts/
│   ├── extract_figma.py            # Python extractor (zero pip deps)
│   └── svg-to-react.mjs           # SVG → React TSX converter
└── references/
    ├── rate-limits.md              # Tier 1/2/3 limits by plan
    ├── design-spec-format.md       # JSON node schema reference
    ├── design-tokens-guide.md      # Token → CSS mapping workflow
    └── svg-to-react-workflow.md    # Full icon integration checklist
```

## Step by Step

### 1. Configure credentials

```bash
cp .agents/skills/figma-api/.env.example /path/to/output/.env
```

Set two variables in `.env`:

- `FIGMA_TOKEN` — from [figma.com/developers/api#access-tokens](https://www.figma.com/developers/api#access-tokens)
- `FIGMA_FILE_ID` — from the Figma URL: `figma.com/design/{FILE_ID}/...`

### 2. Run extraction

```bash
cp .agents/skills/figma-api/scripts/extract_figma.py /path/to/output/
cd /path/to/output
python3 extract_figma.py
```

Output:

| File                   | Description                                |
| ---------------------- | ------------------------------------------ |
| `design-spec.json`     | Full node tree with CSS props (~2–5 MB)    |
| `design-tokens.css`    | CSS custom properties (**reference only**) |
| `exports/*.png`        | Full-page screenshots                      |
| `exports/icons/*.svg`  | Individual SVG icons                       |
| `exports/images/*.png` | Embedded photographs                       |
| `image-refs.json`      | imageRef hash → URL mapping                |

### 3. Convert SVGs → React TSX

```bash
node .agents/skills/figma-api/scripts/svg-to-react.mjs \
  --svg-dir ./exports/icons \
  --out-dir ./src/icons
```

This runs `npx @svgr/cli --typescript` and automatically removes the unused `import * as React` line.

Requires: `npm install -D @svgr/cli`

### 4. Register icons

```typescript
// src/icons/index.ts
export { default as PropTelegram } from "./PropTelegram.js";
export { default as Svg24X24Close } from "./Svg24X24Close.js";
```

### 5. Map design tokens

> ⚠️ **Never** copy `design-tokens.css` directly — use it as reference only.

Compare hex values and manually update your project's semantic CSS variables:

```css
/* Figma: --color-dark-bg: #1e1e20 */
[data-theme="dark"] {
  --color-bg: #1e1e20;
}

/* Figma: --color-accent: #e67278 */
:root {
  --color-primary: #e67278;
}
```

See [references/design-tokens-guide.md](references/design-tokens-guide.md) for full mapping table.

## Key Rules

- The extraction script uses exactly **2 Tier 1 API calls** — on free plans you get only 6/month
- SVG icons must use `fill: currentColor` in CSS to follow theme colors
- The Python script has **zero pip dependencies** — only stdlib (`urllib`, `json`, `pathlib`)
- Test your Figma token with `GET /v1/me` (free, uncounted) before running extraction

## Best Practices

- ✅ Batch all node IDs into a single `/nodes?ids=` call
- ✅ Use `depth=2` for file overview to minimize response size
- ✅ Add courtesy delays between image export requests (`time.sleep(2)`)
- ✅ Use semantic CSS variable names, not Figma's raw naming
- ✅ Keep `design-spec.json` for layout debugging (exact pixel coordinates)
- ❌ Don't run `extract_figma.py` in CI/CD without Enterprise tier
- ❌ Don't copy `design-tokens.css` verbatim into your project
- ❌ Don't fetch individual nodes via separate API calls — batch them

## API Quick Reference

```bash
export FIGMA_TOKEN="your_token"
export FILE_ID="your_file_id"

# Test token (free, uncounted)
curl -s -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/me" | head

# File overview (⚡ Tier 1 — costs quota!)
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/$FILE_ID?depth=2"

# Batch node fetch (⚡ Tier 1)
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/$FILE_ID/nodes?ids=201:1108,201:2122"

# Export as PNG (Tier 2)
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/images/$FILE_ID?ids=201:1108&format=png&scale=2"

# Export as SVG (Tier 2)
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/images/$FILE_ID?ids=186:701&format=svg"

# Embedded images (Tier 2)
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/$FILE_ID/images"
```

See [references/rate-limits.md](references/rate-limits.md) for full tier/plan breakdown.

---

## ⚠️ Gotchas

### Free/Starter plan = 6 Tier 1 calls per MONTH

The single biggest trap. A single `GET /files/:id` counts as 1 Tier 1 call. On free/Starter plans with View seats, you get **6 per month total**. The script uses exactly 2, so ~3 runs per month max.

If you see `Retry-After: 2592000` (30 days) → monthly quota exhausted, no workaround.

### SVGR generates unused React import

`npx @svgr/cli --typescript` adds `import * as React from 'react'` to every `.tsx` file. In React 17+ with JSX transform enabled (`"jsx": "react-jsx"` in tsconfig), this triggers **TS6133** (unused variable). The `svg-to-react.mjs` script strips this automatically.

### Figma imageRef hashes are opaque

Embedded images are saved as `{hash}.png` (e.g., `a1b2c3d4.png`). The `image-refs.json` maps these to Figma URLs for reference. Rename files manually for your project.

### SVG icons need `fill: currentColor` for theming

Figma exports SVGs with hardcoded fill colors. For theme-aware icons, add CSS:

```css
.icon-container svg {
  fill: currentColor;
}
```

### Component names with numbers get `Svg` prefix

SVGR can't create valid JSX identifiers starting with digits. `24x24/close` → `Svg24X24Close.tsx`. This is expected behavior.

### design-spec.json can be 2–5 MB

Consider adding it to `.gitignore` for large Figma files. It's regeneratable via `extract_figma.py`.
