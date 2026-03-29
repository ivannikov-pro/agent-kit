# Design Token Integration Guide

How to safely transfer Figma design tokens into a web project's CSS.

## Critical Rule

> ⚠️ **DO NOT** copy `design-tokens.css` directly into your project.

Figma uses raw naming (`--color-dark-bg`), but web projects use semantic naming with theme selectors (`--color-bg` inside `[data-theme='dark']`). Direct copy will break your theme system.

## Workflow

### 1. Extract Tokens

After running `extract_figma.py`, you'll have:

- `design-tokens.json` — structured JSON
- `design-tokens.css` — CSS custom properties (**reference only**)

### 2. Compare Values

Open both files side by side:

| Figma Token                | Value     | Your Semantic Variable                                   |
| -------------------------- | --------- | -------------------------------------------------------- |
| `--color-dark-bg`          | `#1e1e20` | `[data-theme='dark'] { --color-bg: #1e1e20 }`            |
| `--color-dark-surface`     | `#282a2e` | `[data-theme='dark'] { --color-bg-secondary: #282a2e }`  |
| `--color-dark-surface-alt` | `#343639` | `[data-theme='dark'] { --color-bg-tertiary: #343639 }`   |
| `--color-light-bg`         | `#f5f7fa` | `[data-theme='light'] { --color-bg: #f5f7fa }`           |
| `--color-light-surface`    | `#ffffff` | `[data-theme='light'] { --color-bg-secondary: #ffffff }` |
| `--color-accent`           | `#e67278` | `:root { --color-primary: #e67278 }`                     |
| `--color-text-primary`     | `#ffffff` | Dark theme text color                                    |
| `--color-text-secondary`   | `#a7a8aa` | Muted/secondary text                                     |

### 3. Update Only Changed Values

If Figma colors changed, update **only the hex values** in your tokens file. Never change the variable names.

### Typography Mapping

Figma font `Renner*` is a geometric sans-serif similar to Futura/Jost. If `Renner*` is not available as a web font, use `Jost` or `Inter` as alternatives.

| Figma Token         | Size | Weight | Line Height | Semantic Use             |
| ------------------- | ---- | ------ | ----------- | ------------------------ |
| `--text-h1`         | 36px | 500    | 40px        | Page/section titles      |
| `--text-h2`         | 20px | 500    | 24px        | Subtitles, card headings |
| `--text-body-md`    | 16px | 500    | 20px        | Emphasized body text     |
| `--text-body`       | 16px | 400    | 20px        | Regular body text        |
| `--text-small-md`   | 14px | 500    | 20px        | Labels, nav items        |
| `--text-small`      | 14px | 400    | 20px        | Secondary info           |
| `--text-caption-md` | 12px | 500    | 16px        | Tags, badges             |
| `--text-caption`    | 12px | 400    | 16px        | Micro text, footnotes    |

### Layout Constants

| Token             | Value  | Notes                 |
| ----------------- | ------ | --------------------- |
| Desktop width     | 1440px | Figma artboard        |
| Content max-width | 1200px | Centered container    |
| Header height     | 72px   | Fixed                 |
| Footer height     | 72px   | Fixed                 |
| Mobile width      | 360px  | Figma mobile artboard |
