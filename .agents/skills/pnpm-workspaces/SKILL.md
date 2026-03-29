---
name: pnpm-workspaces
description: How to use pnpm workspaces — workspace protocol, filter, publishing. Use when managing workspace dependencies or packages.
category: development
risk: safe
source: local
tags: [pnpm, workspaces, monorepo, dependencies, package-manager]
tools: [claude, cursor, gemini, antigravity, copilot, windsurf, kiro]
date_added: "2026-03-28"
metadata:
  version: "1.0.0"
---

# pnpm Workspaces

Monorepo package management with pnpm. Fast, disk-efficient, strict dependency resolution.

> **Source:** [github.com/pnpm/pnpm](https://github.com/pnpm/pnpm) · [npm](https://www.npmjs.com/package/pnpm)
> **Version in project:** `9.15.0` · **Published:** 2024-12 · **Skill updated:** 2026-03-21

## When to Use

- Adding, removing, or linking workspace dependencies
- Running scripts with `--filter` across packages
- Publishing workspace packages to npm

## When NOT to Use

- Running tasks across the monorepo with caching (use `turborepo` skill)
- Configuring individual package builds (use `tsup` skill)

## Setup

### pnpm-workspace.yaml

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### Install all packages

```bash
pnpm install
```

## Workspace Protocol

Reference workspace packages using `workspace:*`:

```json
{
  "dependencies": {
    "@ivannikov-pro/app-config": "workspace:*",
    "@ivannikov-pro/core": "workspace:*"
  }
}
```

On `npm publish`, `workspace:*` is replaced with the actual version.

## Common Commands

```bash
# Install all workspace packages
pnpm install

# Add dependency to specific package
pnpm add express --filter @ivannikov-pro/server

# Add dev dependency to root
pnpm add turbo -D -w

# Add workspace dependency
pnpm add @ivannikov-pro/app-config --filter @ivannikov-pro/server --workspace

# Remove dependency
pnpm remove lodash --filter @ivannikov-pro/core

# Run script in specific package
pnpm --filter @ivannikov-pro/app-config build

# Run script in all packages
pnpm -r run build

# Run script in root
pnpm run build  # (or just pnpm build)

# List all workspace packages
pnpm ls -r --depth -1

# Execute binary from node_modules
pnpm exec tsup
pnpm dlx create-vite   # like npx, one-off
```

## Filter Syntax

```bash
--filter <package-name>          # By package.json "name"
--filter <package-name>...       # Package + its dependencies
--filter ...<package-name>       # Package + its dependents
--filter ./apps/server           # By relative path
--filter {./packages/*}          # Glob pattern
--filter "[HEAD~1]"              # Changed since last commit
```

## package.json (root)

```json
{
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "clean": "turbo run clean",
    "typecheck": "turbo run typecheck"
  },
  "devDependencies": {
    "turbo": "^2.x",
    "typescript": "^5.x"
  }
}
```

## Publishing Workspace Packages

```bash
# Bump version
pnpm --filter @ivannikov-pro/app-config version patch

# Publish to npm
pnpm --filter @ivannikov-pro/app-config publish --access public
```

---

## ⚠️ Gotchas

### workspace:\* not resolved outside pnpm

`workspace:*` is a pnpm protocol. If you `npm install` a published package, pnpm replaces it with the actual version. But you must `pnpm publish` — plain `npm publish` won't resolve it.

### Hoisting differences from npm/yarn

pnpm uses strict linking — packages can only access dependencies they explicitly declare. If package A depends on lodash but package B doesn't list it, B cannot import lodash (even if it's installed in the root `node_modules`).

### -w flag for root operations

To add/remove dependencies in the root `package.json`, you **must** use `-w` (workspace root):

```bash
pnpm add turbo -D -w  # ✅
pnpm add turbo -D     # ❌ Error: not in a workspace package
```

### pnpm exec vs npx

- `pnpm exec <bin>` — runs from local `node_modules/.bin/`
- `pnpm dlx <package>` — downloads and runs (like `npx`)
- `npx` may resolve differently in pnpm workspaces
