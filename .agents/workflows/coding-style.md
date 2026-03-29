---
description: Coding style preferences for all code in this project
---

# Coding Style Preferences

## Quotes

- Always use **double quotes** (`"`) instead of single quotes (`'`) for strings in TypeScript/JavaScript.

```typescript
// ❌ Wrong
import { readFileSync } from "node:fs";
const name = "hello";

// ✅ Correct
import { readFileSync } from "node:fs";

const name = "hello";
```

## Import Spacing

- After the **import section** (all import statements), add **3 blank lines** before the next code block.

```typescript
import { foo } from "bar";
import { baz } from "qux";

// ─── Code starts here ───────────────────────────────────────────
const x = 1;
```

## Block Spacing

- Between **logical blocks** of code (functions, classes, type definitions, schema blocks, etc.), add **2 blank lines** to visually separate them.

```typescript
export type UserType = {
  name: string;
};

export type PostType = {
  title: string;
};

export const createUser = (name: string): UserType => {
  return { name };
};
```

## Style Guide

- Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) for both JS and TS code.
- For TypeScript, use `eslint-config-airbnb-typescript`.

## Types over Interfaces

Always prefer `type` over `interface` — IDE expands type contents on hover, interface only shows the name.

```typescript
// ✅ Correct — type (IDE shows contents on hover)
type UserConfig = {
  name: string;
  port: number;
};

// ❌ Avoid — interface (IDE shows only "UserConfig")
interface UserConfig {
  name: string;
  port: number;
}
```

Use `interface` **only** when required:

- Declaration merging (`declare module`)
- Class `extends` / `implements`
- Recursive types where interface performs better

## Solidity Conventions

### NatSpec

- **No `@author` tag** — we do not use `@author` in NatSpec comments.
- **No branding** — do not put project names (e.g. "LooksLux") in contract code or comments.
- NatSpec is required on all public/external functions and events.
- Use `@inheritdoc` when implementing interface functions.

### Formatting

- Always run `forge fmt` before committing Solidity code.
- Do not manually format Solidity code — let `forge fmt` handle it.

### Upgrade Safety

- **No `immutable` variables** in upgradeable contracts — immutables are baked into runtime bytecode and break auto-upgrade detection via bytecode comparison.
- All state must use **ERC-7201 namespaced storage**.
- Deploy scripts use `ProxyInfo(proxy).proxy()` (not `vm.load`) to read proxy metadata.

## Formatting Enforcement & Tooling

To enforce the specific `3 blank lines` after imports and `2 blank lines` between logical blocks, we rely entirely on **ESLint Flat Config** using the `@stylistic/eslint-plugin`. 

- **Prettier is NOT used** for JS/TS structural spacing, as it strictly forces 1 blank line and cannot be configured for 2 or 3 blank lines.
- ESLint rule `@stylistic/padding-line-between-statements` is specifically tuned in `packages/config-eslint` to enforce these blocks.
- **Rule Limits**: The `@stylistic/no-multiple-empty-lines` rule is set to `max: 3` so ESLint doesn't flag our required padding.

### Automation Commands
To automatically fix spacing across the monorepo:
```bash
# Safely apply fixes for missing spacing
pnpm turbo run lint -- --fix
```

### Node.js Spacing Formatter Script

When migrating large files or components to this new format, ESLint's `--fix` isn't always capable of *inserting* missing multiple blank lines (it usually only trims excess). You can use our custom formatting script (bundled within the `custom-formatting` skill) to enforce `<import block>\n\n\n\n<next statement>` and `\n\n\n` between top-level blocks.

Run this script before running the linter:
```bash
node .agents/skills/custom-formatting/scripts/force-spacing.mjs <directory_or_file>
```

## Markdown Formatting

All `.md` files in the repository — skills, workflows, docs, playbooks — follow consistent formatting rules for human readability.

### Mermaid Diagrams

When using Mermaid diagrams in markdown:

- **Never use `\n` for line breaks** — Mermaid does't interpret literal `\n` in node labels
- **Never use `<br/>` for multi-line labels** — renders inconsistently and merges visually
- **Use short labels in nodes** + a separate legend table below the diagram for descriptions
- Node labels should be quoted (`["label"]`) to avoid parsing issues with special characters

```markdown
<!-- ❌ Wrong — \n renders literally, <br/> merges visually -->
D["/discovery\n―――\nDescription"]
D["/discovery<br/>Description"]

<!-- ✅ Correct — short label + legend table -->
D["/discovery"]

| Component    | Type     | Purpose           |
| ------------ | -------- | ----------------- |
| `/discovery` | workflow | Discovery Process |
```

### Structural Conventions

- Use `---` horizontal rules to separate major document sections
- Use `>` blockquotes for key principles and important callouts
- Use consistent heading hierarchy: `#` for title, `##` for sections, `###` for subsections
- Use emoji markers for quick visual scanning: ✅ correct, ❌ wrong, 🔵 category, 🟣 category
- Code blocks inside markdown templates should use nested fencing or `markdown` language tag

## UI Components & SVG Icons

- **No Inline SVGs**: NEVER use raw inline `<svg>` tags directly in application component code (e.g., `apps/web-app/src/components`). 
- **Centralized Icons**: All SVG icons must be extracted, formatted as React components, and saved in `packages/ui/src/icons/` (e.g., `IconTelegram.tsx`).
- **Standard Export**: Icons should be exported consistently and added to `packages/ui/src/index.ts`.
- **Responsive Size/Color**: Remove hardcoded `width`, `height`, and `fill` attributes from the SVG component. Use `width="1em" height="1em"` and `fill="currentColor"` so the icon naturally scales and inherits color from its parent text container.

## Shared Data & Constants

- **No Hardcoded Links**: Do not hardcode reusable data (like social media links, emails, platform configurations) directly into UI components.
- **Single Source of Truth**: Import standardized data arrays and objects from `@ivannikov-pro/shared` (e.g., `packages/shared/src/data/social.ts`). This ensures updates propagate correctly across the entire monorepo automatically.

## 🤖 AI Code Generation Guidelines

*Notice for all AI Agents, including Cursor, Claude, Gemini, Kiro, Windsurf, Copilot:*
When you generate or modify code in this repository, you **MUST** natively format your code blocks to respect the spacing rules. **DO NOT** use default 1-line spacing.

**Strict AI Instructions for TypeScript/JavaScript:**
1. You must insert **exactly 3 blank lines** between the final `import` statement and the first line of code.
2. You must insert **exactly 2 blank lines** between top-level `type`, `interface`, `const`, `function`, and `class` declarations.
3. You must use `export function` or `export const` grouped appropriately.
4. When writing `tsx` files, inline SVGs should be avoided — use or create standard icons in `@ivannikov-pro/ui/src/icons`. 

**Strict AI Instructions for Markdown:**
1. Markdown tables should be kept clean without enforcing excessive manual padding or column alignment. Standard unaligned `|---|---|` separators are perfectly acceptable.
2. Mermaid diagram nodes must use **short labels** — never `\n` or `<br/>` for multi-line text. Add a legend table below.
3. Use `---` horizontal rules between major sections for visual separation.
4. Use `>` blockquotes for key principles and callouts.
5. Every `.md` file in `.agents/`, `docs/`, or `packages/` must follow these conventions.

By natively generating code and markdown with these formatting structures, you prevent style drift and maintain consistency across the entire monorepo.

