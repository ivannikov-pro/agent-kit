---
name: monorepo-conventions
description: Monorepo structure, tooling conventions, and development practices for the ivannikov-pro-platform. Use when adding packages, configuring builds, or understanding project architecture.
category: development
risk: safe
source: local
tags: [monorepo, pnpm, turborepo, architecture, conventions]
tools: [claude, cursor, gemini, antigravity, copilot, windsurf, kiro]
date_added: "2026-03-28"
metadata:
  version: "2.0.0"
---

# Monorepo Conventions Skill

> **Source:** ivannikov-pro-platform repository
> **Skill updated:** 2026-03-28

## When to Use

- Adding a new package or app to the monorepo
- Understanding the project structure and package relationships
- Configuring build, lint, or test pipelines
- Resolving workspace dependency issues
- Onboarding to the project

## When NOT to Use

- Working on a single-package project outside this monorepo
- Deploying to production (use specific deploy workflows)

## Overview

`ivannikov-pro-platform` is a pnpm workspaces + Turborepo monorepo for the Ivannikov Pro personal brand platform — portfolio site, CV generator, Telegram integrations, and shared UI/data packages.

## Repository Structure

```
ivannikov-pro-platform/
├── apps/
│   ├── telegram-bot/         ← Telegram bot service
│   ├── telegram-mini-app/    ← Telegram Mini App frontend
│   ├── telegram-mini-app-api/← Telegram Mini App API
│   ├── web-admin/            ← Admin panel
│   ├── web-api/              ← Backend API
│   └── web-app/              ← Main website (Next.js 16)
├── packages/
│   ├── config-eslint/        ← Shared ESLint v9 flat config
│   ├── config-typescript/    ← Shared TSConfig
│   ├── cv-data/              ← CV content data
│   ├── cv-generator/         ← PDF CV generator
│   ├── shared/               ← Shared types, data, utilities
│   └── ui/                   ← Shared React components & icons
├── docs/                     ← Technical specs and business playbook
├── .agents/                  ← AI agent skills and workflows
├── turbo.json                ← Turborepo pipeline config
├── pnpm-workspace.yaml       ← Workspace definition
└── package.json              ← Root dependencies
```

## Tooling

| Tool           | Purpose                               |
| -------------- | ------------------------------------- |
| **pnpm**       | Package manager with workspaces       |
| **Turborepo**  | Build orchestration and caching       |
| **TypeScript** | 5.9+ across all TS packages           |
| **ESLint**     | v9 flat config with @stylistic plugin |
| **Next.js**    | 16.x for web-app (SSG)                |
| **tsup**       | Bundle shared packages (ui, shared)   |

## Workspace Layout

Defined in `pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

## Turbo Pipeline

Defined in `turbo.json`:

- `build` — depends on `^build`, outputs `.next/**`, `dist/**`, `build/**`
- `lint` — depends on `^build`
- `typecheck` — depends on `^build`
- `dev` — persistent, no cache
- `clean` — no cache

## Root Scripts

```bash
pnpm dev          # Start all dev servers via turbo
pnpm build        # Build all packages via turbo
pnpm lint         # Lint all packages
pnpm typecheck    # Type-check all packages
```

## Package Naming

All packages use the `@ivannikov-pro/` scope:

| Package                            | Type    | Description                     |
| ---------------------------------- | ------- | ------------------------------- |
| `@ivannikov-pro/web-app`           | app     | Main website (Next.js 16, SSG)  |
| `@ivannikov-pro/web-api`           | app     | Backend API                     |
| `@ivannikov-pro/web-admin`         | app     | Admin panel                     |
| `@ivannikov-pro/telegram-bot`      | app     | Telegram bot service            |
| `@ivannikov-pro/telegram-mini-app` | app     | Telegram Mini App               |
| `@ivannikov-pro/ui`                | package | Shared React components & icons |
| `@ivannikov-pro/shared`            | package | Shared types, data, utilities   |
| `@ivannikov-pro/cv-data`           | package | CV content data                 |
| `@ivannikov-pro/cv-generator`      | package | PDF CV generator                |
| `@ivannikov-pro/config-eslint`     | package | Shared ESLint configuration     |
| `@ivannikov-pro/config-typescript` | package | Shared TypeScript configuration |

## Conventions

1. **Package naming**: `@ivannikov-pro/<package-name>`
2. **Dependencies**: Shared devDependencies in root, app-specific deps in app's `package.json`
3. **Workspace protocol**: Use `"workspace:*"` for inter-package dependencies
4. **Node version**: Use Node.js 22+ (LTS)
5. **File naming**: kebab-case for files, PascalCase for React components
6. **Formatting**: See `/coding-style` workflow — 3 blank lines after imports, 2 between blocks
7. **No Prettier**: Formatting enforced via ESLint @stylistic plugin only
8. **Markdown tables**: Aligned columns with padding (see `/custom-formatting` skill)

## ⚠️ Gotchas

- **Never use Prettier** — it conflicts with the custom 3-line/2-line spacing rules enforced by ESLint
- **`workspace:*` protocol** — always use it for internal dependencies; never hardcode version numbers for monorepo packages
- **Build order matters** — `packages/` must build before `apps/` (Turborepo handles this via `^build`)
- **pnpm strict mode** — pnpm does not hoist by default; phantom dependencies will fail
- **ESLint v9 flat config only** — do not use `.eslintrc.*` files; config is in `packages/config-eslint`
