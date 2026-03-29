# SVG → React Integration Workflow

Step-by-step checklist for integrating Figma SVG icons into a React/Next.js project.

## Prerequisites

```bash
npm install -D @svgr/cli
```

## Pipeline

### 1. Extract SVGs from Figma

```bash
python3 extract_figma.py
# Output: exports/icons/*.svg (one file per Figma component)
```

### 2. Convert SVG → React TSX

```bash
node svg-to-react.mjs --svg-dir ./exports/icons --out-dir ./src/icons
```

Or manually:

```bash
npx @svgr/cli --typescript --out-dir ./src/icons ./exports/icons
```

Then clean up the unused import:

```bash
# In each generated .tsx file, remove:
# import * as React from 'react';
# This line causes TS6133 in React 17+ with JSX transform
```

### 3. Create Barrel Export

```typescript
// src/icons/index.ts
export { default as PropTelegram } from "./PropTelegram.js";
export { default as PropTwitter } from "./PropTwitter.js";
// ... each icon
```

### 4. Theme-Aware SVG Rendering

For icons that should follow the current theme color:

```css
.icon-container svg {
  fill: currentColor; /* inherits text color */
  width: 1em;
  height: 1em;
}
```

```tsx
// Usage in React
<a className="icon-container" href={url}>
  <PropTelegram />
</a>
```

### 5. Icon Mapping Pattern

For dynamic icon rendering (e.g., social links), use a string → component map:

```tsx
import { PropTelegram, PropTwitter, PropFacebook } from "@your-org/ui";
import type { ComponentType, SVGProps } from "react";

const ICON_MAP: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  telegram: PropTelegram,
  twitter: PropTwitter,
  facebook: PropFacebook,
};

// Data source: keep icon keys as strings
const SOCIAL_LINKS = [
  { platform: "telegram", url: "https://t.me/..." },
  { platform: "twitter", url: "https://x.com/..." },
];

// Render
{
  SOCIAL_LINKS.map(({ platform, url }) => {
    const Icon = ICON_MAP[platform];
    return Icon ? (
      <a href={url}>
        <Icon />
      </a>
    ) : null;
  });
}
```

## Figma Component Name → File Name Mapping

SVGR converts Figma component names to PascalCase filenames:

| Figma Component   | SVG File              | React Component     |
| ----------------- | --------------------- | ------------------- |
| `prop=telegram`   | `prop=telegram.svg`   | `PropTelegram.tsx`  |
| `24x24/close`     | `24x24=close.svg`     | `Svg24X24Close.tsx` |
| `property 1=down` | `property-1=down.svg` | `PropertyDown.tsx`  |
| `16x16/flag`      | `16x16=flag.svg`      | `Svg16X16Flag.tsx`  |

> **Note:** Names starting with numbers get a `Svg` prefix automatically.

## Common Issues

| Issue                               | Cause                         | Fix                                                   |
| ----------------------------------- | ----------------------------- | ----------------------------------------------------- |
| TS6133 unused import                | SVGR adds `import * as React` | Remove the line (automated by `svg-to-react.mjs`)     |
| Icons don't change color with theme | Missing `fill: currentColor`  | Add CSS rule, remove hardcoded fill in SVG            |
| Icon renders at wrong size          | SVG has fixed width/height    | Use CSS `width`/`height` or pass `iconSize` prop      |
| Duplicate component names           | Figma naming collision        | Rename in Figma before export, or rename `.tsx` files |
