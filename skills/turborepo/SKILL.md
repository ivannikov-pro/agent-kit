---
name: turborepo
description: How to use Turborepo — monorepo build system with task caching and dependency graph. Use when configuring or running monorepo tasks.
category: development
risk: safe
source: local
tags: [turborepo, monorepo, build, cache, pipeline]
tools: [claude, cursor, gemini, antigravity, copilot, windsurf, kiro]
date_added: "2026-03-28"
metadata:
  version: "1.0.0"
---

# Turborepo

High-performance build system for monorepos. Parallelizes tasks, caches outputs, respects dependency graph.

> **Source:** [github.com/vercel/turborepo](https://github.com/vercel/turborepo) · [npm](https://www.npmjs.com/package/turbo)
> **Version in project:** `2.8.20` · **Published:** 2025-03 · **Skill updated:** 2026-03-21

## When to Use

- Modifying `turbo.json` task configuration
- Running builds, typechecks, or other tasks across the monorepo
- Debugging caching or task dependency issues

## When NOT to Use

- Configuring individual package builds (use `tsup` skill)
- Managing workspace dependencies (use `pnpm-workspaces` skill)

## Installation

```bash
npm install turbo -D
```

## turbo.json Config

Place at monorepo root:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "clean": {
      "cache": false
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

## Task Properties

| Property         | Type       | Description                                           |
| ---------------- | ---------- | ----------------------------------------------------- |
| `dependsOn`      | `string[]` | Tasks that must finish first                          |
| `outputs`        | `string[]` | Files to cache (globs relative to package)            |
| `inputs`         | `string[]` | Files that affect cache hash                          |
| `cache`          | `boolean`  | Whether to cache this task (default: `true`)          |
| `persistent`     | `boolean`  | Long-running task, never completes (e.g. dev servers) |
| `env`            | `string[]` | Env vars that affect cache hash                       |
| `passThroughEnv` | `string[]` | Env vars to pass through without affecting hash       |

## dependsOn Syntax

```json
// ^build — run "build" in dependencies FIRST, then in this package
"dependsOn": ["^build"]

// build — run "build" in SAME package first (no ^)
"dependsOn": ["build"]

// utils#build — run "build" in specific package "utils" first
"dependsOn": ["utils#build"]

// Empty — no dependencies, can run immediately
"dependsOn": []
```

## Common Commands

```bash
# Run build in all packages (respects dependency graph)
npx turbo run build

# Force rebuild (ignore cache)
npx turbo run build --force

# Run for specific package only
npx turbo run build --filter=@ivannikov-pro/app-config

# Run for package and its dependencies
npx turbo run build --filter=@ivannikov-pro/app-config...

# Run multiple tasks
npx turbo run build typecheck

# Dry run — show what would execute
npx turbo run build --dry-run

# Show task graph
npx turbo run build --graph
```

## Filter Syntax

```bash
--filter=<package>         # Exact package (by package.json name)
--filter=<package>...      # Package + its dependencies
--filter=...<package>      # Package + its dependents
--filter=./apps/*          # All packages in apps/ directory
--filter=[HEAD~1]          # Packages changed since last commit
```

## Caching

Turbo caches task outputs based on:

- File inputs (all Git-tracked files by default)
- Environment variables (listed in `env`)
- Task dependencies
- turbo.json config

```bash
# Clear all caches
npx turbo run clean

# Or delete manually
rm -rf node_modules/.cache/turbo
```

## Package-level Config

Override root turbo.json in a package with `turbo.json` in that package:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "extends": ["//"],
  "tasks": {
    "build": {
      "outputs": ["dist/**", ".next/**"]
    }
  }
}
```

`"extends": ["//"]` inherits from root config.

## Environment Variables

```json
{
  "tasks": {
    "build": {
      "env": ["NODE_ENV", "API_URL"],
      "passThroughEnv": ["CI"]
    }
  }
}
```

- `env` — changes to these vars invalidate cache
- `passThroughEnv` — available to task but don't affect cache

## Global Dependencies

```json
{
  "globalDependencies": [".env", "tsconfig.json"],
  "globalEnv": ["CI"],
  "tasks": { ... }
}
```

Changes to global dependencies invalidate ALL task caches.

---

## ⚠️ Gotchas

### outputs must be specified for caching

If you don't specify `outputs`, turbo will still cache that the task succeeded, but won't restore any files. Always specify `outputs: ["dist/**"]` for build tasks.

### ^build means dependency order

`"dependsOn": ["^build"]` runs build in _package dependencies_ first (from `package.json` dependencies/devDependencies). Without `^`, it means same-package task ordering.

### cache: false for side-effect tasks

Tasks like `clean` or `dev` that should never be cached need `cache: false`.

### persistent: true for dev servers

Dev servers never complete. Mark them `persistent: true` so turbo doesn't wait for them and doesn't cache them.

### Filter uses package.json name, not directory

`--filter=app-config` won't work if the package name is `@ivannikov-pro/app-config`. Use the full name or directory path.
