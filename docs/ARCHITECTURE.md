# Architecture

## Overview

`agent-kit` is a monorepo that provides a CLI, MCP server, and web catalog for distributing AI agent skills, workflows, and MCP configurations.

```
┌──────────────────────────────────────────────────────────────┐
│                        agent-kit monorepo                    │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐ │
│  │  packages/cli │  │ packages/web │  │  skills/ + workflows│ │
│  │              │  │              │  │  (embedded content) │ │
│  │  CLI + MCP   │  │  Next.js SSG │  │                    │ │
│  │  server      │  │  catalog     │  │  SKILL.md files    │ │
│  └──────┬───────┘  └──────┬───────┘  └─────────┬──────────┘ │
│         │                 │                     │            │
│         └─────────────────┴─────────┬───────────┘            │
│                                     │                        │
│                          ┌──────────┴──────────┐             │
│                          │    registry.json     │             │
│                          │  (central manifest)  │             │
│                          └─────────────────────┘             │
└──────────────────────────────────────────────────────────────┘
```

## Components

### 1. CLI (`packages/cli`)

Published as `@ivannikov-pro/agent-kit` on npm. Provides:

| Command | Description |
|---------|-------------|
| `agent-kit list` | List all available resources from registry |
| `agent-kit add <name>` | Install a skill/workflow into the project |
| `agent-kit remove <name>` | Remove an installed resource |
| `agent-kit init` | Interactive project setup |
| `agent-kit mcp` | Start as MCP server (stdio) |

**Tech:** TypeScript, commander, tsup (ESM build), Node 20+

#### Source Resolution

The CLI supports two source types in `registry.json`:

- `local:skills/skill-base` → fetches from `ivannikov-pro/agent-kit` repo (this repo)
- `github:owner/repo/path` → fetches from any GitHub repo

Both resolve via GitHub Contents API. Set `GITHUB_TOKEN` for higher rate limits.

### 2. MCP Server (`packages/cli/src/mcp/`)

Runs via `agent-kit mcp` command using stdio transport. Exposes 3 tools:

| Tool | Description |
|------|-------------|
| `list_resources` | List skills/workflows/MCP with optional type filter |
| `install_resource` | Install a resource by name |
| `search_resources` | Search by keyword/tag |

**Protocol:** `@modelcontextprotocol/sdk`, Zod schemas for tool parameters.

### 3. Web Catalog (`packages/web`)

Static site generated with Next.js. Reads `registry.json` and `skills/*/SKILL.md` at build time.

| Route | Description |
|-------|-------------|
| `/` | Homepage — skill cards, stats, MCP section |
| `/skills/[name]` | Skill detail — rendered SKILL.md with metadata |

**Tech:** Next.js 16, React 19, Tailwind 4, react-markdown, gray-matter

**Deploy:** GitHub Pages via `gh-pages` branch (GitHub Actions)

### 4. Skills (`skills/`)

Each skill is a directory with:

```
skills/<name>/
├── SKILL.md          # Main instruction file (YAML frontmatter + markdown)
├── assets/           # Templates, snippets, examples
└── references/       # Reference documentation
```

SKILL.md frontmatter:

```yaml
---
name: skill-name
description: What this skill does
category: development
tags: [tag1, tag2]
tools: [tool1, tool2]
risk: low
metadata:
  version: "1.0.0"
  author: ivannikov-pro
---
```

### 5. Registry (`registry.json`)

Central manifest mapping resource names to sources:

```json
{
  "version": "1",
  "repo": "ivannikov-pro/agent-kit",
  "skills": {
    "skill-base": {
      "source": "local:skills/skill-base",
      "description": "...",
      "tags": ["meta"],
      "version": "1.0.0"
    }
  },
  "workflows": {},
  "mcp": {
    "ai-notify-tg": {
      "package": "@ivannikov-pro/ai-notify-tg",
      "description": "..."
    }
  }
}
```

## Data Flow

```
User runs:  npx @ivannikov-pro/agent-kit add skill-base
                │
                ▼
       ┌─ Load registry.json (local or GitHub fallback)
       │
       ▼
       ┌─ Parse source: "local:skills/skill-base"
       │   → owner: ivannikov-pro
       │   → repo: agent-kit
       │   → path: skills/skill-base
       │
       ▼
       ┌─ GitHub Contents API: fetch dir listing
       │   GET /repos/ivannikov-pro/agent-kit/contents/skills/skill-base
       │
       ▼
       ┌─ Download each file recursively
       │   SKILL.md, assets/*, references/*
       │
       ▼
       └─ Write to .agents/skills/skill-base/
```

## Build System

| Tool | Purpose |
|------|---------|
| **pnpm** | Package manager with workspace protocol |
| **Turborepo** | Task runner (`build`, `dev`, `lint`) |
| **tsup** | CLI bundler (ESM + DTS) |
| **Next.js** | Web app (Turbopack + static export) |

### Build Commands

```bash
pnpm install              # Install all deps
pnpm build                # Build all packages (turbo)
pnpm --filter cli build   # Build CLI only
pnpm --filter web build   # Build web only
pnpm --filter web dev     # Dev server for web
```

## Directory Layout

```
agent-kit/
├── packages/
│   ├── cli/                    # @ivannikov-pro/agent-kit
│   │   ├── src/
│   │   │   ├── bin.ts          # CLI entry (commander)
│   │   │   ├── index.ts        # Library exports
│   │   │   ├── agent-kit.ts    # AgentKit class (API)
│   │   │   ├── types.ts        # TypeScript types
│   │   │   ├── registry.ts     # Registry loader + cache
│   │   │   ├── installer.ts    # Skill/workflow installer
│   │   │   ├── commands/       # CLI commands
│   │   │   │   ├── list.ts
│   │   │   │   ├── add.ts
│   │   │   │   ├── remove.ts
│   │   │   │   └── init.ts
│   │   │   ├── mcp/
│   │   │   │   └── server.ts   # MCP server (3 tools)
│   │   │   └── utils/
│   │   │       ├── github.ts   # GitHub API + source parser
│   │   │       ├── fs.ts       # Path resolution
│   │   │       └── logger.ts   # Colored output
│   │   ├── tsup.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── web/                    # @ivannikov-pro/agent-kit-web
│       ├── src/
│       │   ├── app/
│       │   │   ├── page.tsx
│       │   │   ├── layout.tsx
│       │   │   ├── globals.css
│       │   │   └── skills/[name]/page.tsx
│       │   └── lib/
│       │       └── data.ts     # Registry + SKILL.md loader
│       ├── next.config.ts
│       └── package.json
│
├── skills/                     # Embedded skills
│   ├── skill-base/
│   └── find-docs/
│
├── workflows/                  # Embedded workflows (future)
│
├── docs/                       # Documentation
│   ├── ARCHITECTURE.md         # This file
│   └── CONTRIBUTING.md         # How to contribute
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # GH Pages deployment
│
├── registry.json               # Resource manifest
├── pnpm-workspace.yaml
├── turbo.json
├── package.json                # Root (private)
├── README.md
└── LICENSE (MIT)
```
