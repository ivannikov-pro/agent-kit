---
description: How to convert an inline SVG or raw SVG file from Figma into a compliant React component in @ivannikov-pro/ui/src/icons
---

# SVG to Icon Workflow

This workflow is used whenever you need to add a new icon from Figma or refactor an existing inline `<svg>` in a component into the central `@ivannikov-pro/ui` package.

## Motivation

To ensure UI consistency across the monorepo, inline SVGs inside application components (`apps/web-app/src/components/*`) are prohibited. They bloat component files, duplicate SVG markup, and prevent global style updates. All icons must be extracted into `<Name>Icon.tsx` components.

## Steps to Convert an SVG

### 1. Create the File
Create a new file in `packages/ui/src/icons/Icon[Name].tsx` (e.g. `IconTelegram.tsx`, `IconArrowRight.tsx`).

### 2. Wrap and Clean the SVG
Wrap the raw SVG in a standard React component block. Apply the following crucial modifications to the `<svg>` element itself:

- Replace all `class` with `className` (standard React camelCase rule).
- Replace all specific `width="..."` and `height="..."` with `width="1em"` and `height="1em"`. This makes the SVG respect the `--icon-size` or parent `fontSize` properly.
- Remove hardcoded `fill` or `stroke` properties mapped to specific hex colors (e.g. `fill="#FFFFFF"`) on the `<svg>` and inner `<path>` elements.
- Replace those colors with `currentColor` so the icon properly inherits color from CSS or parent wrappers.
- Pass `{...props}` down to the `<svg>` element so the consumer can override classes/inline styles effortlessly.

### 3. Example Template

Here is the exact template you should use when generating an Icon component:

```tsx
import React, { SVGProps } from "react";



export function IconName(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor" // Replaces raw hex color
      width="1em"         // Dynamic sizing
      height="1em"        // Dynamic sizing
      {...props}
    >
      <path
        fillRule="evenodd"
        d="..."
      />
    </svg>
  );
}
```

*Note: Ensure you include exactly 3 empty lines after the import statement per our **Coding Style Preferences**.*

### 4. Export the Icon in `index.ts`
Once the component is created, register it in the main UI package entrypoint.

Open `packages/ui/src/index.ts` and append:
```typescript
export * from "./icons/IconName.js";
```

### 5. Final Step: Replace Inline Usage
Go back to the component that originally contained the inline SVG, delete the giant SVG markup, import your new icon component from `@ivannikov-pro/ui`, and use it.

```tsx
import { IconName } from "@ivannikov-pro/ui";



export function MyButton() {
  return (
    <button className="flex items-center gap-2 text-primary-500">
      <IconName className="text-2xl" />
      <span>Click Me</span>
    </button>
  );
}
```
