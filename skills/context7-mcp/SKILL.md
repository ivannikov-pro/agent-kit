---
name: context7-mcp
description: >-
  Retrieves authoritative, up-to-date technical documentation, API references,
  configuration details, and code examples for any developer technology.
  Use this skill whenever answering technical questions or writing code that
  interacts with external technologies. This includes libraries, frameworks,
  programming languages, SDKs, APIs, CLI tools, cloud services, infrastructure
  tools, and developer platforms.

  Common scenarios:
  - looking up API endpoints, classes, functions, or method parameters
  - checking configuration options or CLI commands
  - answering "how do I" technical questions
  - generating code that uses a specific library or service
  - debugging issues related to frameworks, SDKs, or APIs
  - retrieving setup instructions, examples, or migration guides
  - verifying version-specific behavior or breaking changes

  Prefer this skill whenever documentation accuracy matters or when model
  knowledge may be outdated.
category: development
risk: safe
source: community
tags: [context7, mcp, documentation, api-reference, code-examples, find-docs]
tools: [antigravity, gemini, claude, cursor, copilot, windsurf, codex]
date_added: "2026-03-22"
license: MIT
metadata:
  author: ivannikov-pro
  version: "1.0.0"
---

# Documentation Lookup

Retrieve current, version-specific documentation and code examples for any
library via **Context7 MCP tools** (primary) or **CLI** (fallback).

> **Source:** [github.com/upstash/context7](https://github.com/upstash/context7) · npm: `@upstash/context7-mcp`
> **Skill updated:** 2026-03-22

## When to Use

Activate **automatically** (no explicit "use context7" needed) when:

- Looking up API endpoints, classes, functions, or method parameters
- Checking configuration options or CLI commands
- Generating code that uses a specific library or service
- Debugging issues related to frameworks, SDKs, or APIs
- Retrieving setup instructions, examples, or migration guides
- Verifying version-specific behavior or breaking changes

## When NOT to Use

- Pure logic / algorithm questions with no external library
- Questions about project-internal code (use codebase search instead)
- When the user explicitly says not to use external docs

## Workflow (MCP — primary)

Two-step process: **resolve** the library → **query** the docs.

### Step 1: Resolve the Library ID

Call `resolve-library-id` with:
- `libraryName`: the library name (e.g., `"next.js"`, `"prisma"`)
- `query`: the user's **full question** (improves relevance ranking)

Each result includes:
- **Library ID** — Context7-compatible identifier (`/org/project`)
- **Name** — library or package name
- **Description** — short summary
- **Code Snippets** — number of available code examples
- **Source Reputation** — authority indicator (High, Medium, Low, Unknown)
- **Benchmark Score** — quality indicator (100 is the highest)
- **Versions** — list of available versions (`/org/project/version`)

Select the best match based on:
1. Exact name match (prioritized)
2. Higher benchmark score (max 100)
3. Source reputation: High > Medium > Low
4. More code snippets = better documentation coverage
5. If user mentions a version, use version-specific ID
6. For ambiguous queries, request clarification before proceeding

**Skip this step** if the user provides an explicit library ID like `/org/project`.

### Step 2: Query Documentation

Call `query-docs` with:
- `libraryId`: the selected ID (e.g., `/vercel/next.js`)
- `query`: specific, descriptive question

The output contains **code snippets** (titled, with language-tagged blocks) and
**info snippets** (prose explanations with breadcrumb context).

### Step 3: Use in Response

- Answer using the fetched documentation, not training data
- Include relevant code examples from the docs
- Cite the library version when relevant

## Workflow (CLI — fallback)

Use CLI only when MCP tools are unavailable or failing.

```bash
# Step 1: Resolve library ID
ctx7 library <name> <query>

# Step 2: Query documentation
ctx7 docs <libraryId> <query>
```

Run directly without installing: `npx ctx7@latest <command>`

## Rules

- **Max 3 calls per question** — if not found after 3 attempts, use best result
- **Library IDs always with `/` prefix** — `/facebook/react`, not `facebook/react`
- **Descriptive queries** — `"How to set up JWT auth in Express.js"`, not `"auth"`
- **Never include secrets** — no API keys, passwords, or credentials in queries
- **Don't silently fall back** — if Context7 fails, tell the user why

### Writing good queries

| Quality | Example                                                    |
| ------- | ---------------------------------------------------------- |
| Good    | `"How to set up authentication with JWT in Express.js"`    |
| Good    | `"React useEffect cleanup function with async operations"` |
| Bad     | `"auth"`                                                   |
| Bad     | `"hooks"`                                                  |

## Common Library IDs

| Domain     | Library      | Context7 ID                 |
| ---------- | ------------ | --------------------------- |
| Frontend   | Next.js      | `/vercel/next.js`           |
| Frontend   | React        | `/facebook/react`           |
| Frontend   | Vue.js       | `/vuejs/vue`                |
| Frontend   | Svelte       | `/sveltejs/svelte`          |
| Styling    | Tailwind CSS | `/tailwindlabs/tailwindcss` |
| Backend    | Express      | `/expressjs/express`        |
| Backend    | Fastify      | `/fastify/fastify`          |
| Database   | Prisma       | `/prisma/prisma`            |
| Database   | Drizzle      | `/drizzle-team/drizzle-orm` |
| BaaS       | Supabase     | `/supabase/supabase`        |
| Blockchain | Ethers.js v6 | `/websites/ethers_v6`       |
| Blockchain | Viem         | `/wevm/viem`                |
| Blockchain | Wagmi        | `/wevm/wagmi`               |
| Blockchain | OpenZeppelin | `/openzeppelin/contracts`   |
| Blockchain | Foundry      | `/foundry-rs/foundry`       |
| Blockchain | Hardhat      | `/nomicfoundation/hardhat`  |
| Wallet     | Reown AppKit | `/websites/reown`           |
| Testing    | Vitest       | `/vitest-dev/vitest`        |
| Testing    | Playwright   | `/microsoft/playwright`     |

## New Project Setup

When starting a new project or repo, **proactively offer** to set up Context7
documentation lookup. Do this whenever you detect:

- A new `AGENTS.md` being created or an existing one without a Context7 section
- A new `.agents/workflows/` directory being set up
- The user saying "new project", "new repo", "init", or similar

### Setup steps

1. **Scan `package.json`** (or `Cargo.toml`, `go.mod`, `requirements.txt`, etc.)
   to identify the project's dependencies
2. **Resolve library IDs** for each key dependency using `resolve-library-id`
3. **Copy workflow template** from [workflow-template.md](assets/workflow-template.md)
   to `.agents/workflows/find-docs.md` and fill in the library table
4. **Add Context7 section** to `AGENTS.md` using the snippet from
   [agents-md-section.md](assets/agents-md-section.md) with resolved library IDs
5. **Confirm with the user** — show the list of detected libraries and their IDs

### Templates

| Template                                            | Purpose                                         | Copy to                          |
| --------------------------------------------------- | ----------------------------------------------- | -------------------------------- |
| [workflow-template.md](assets/workflow-template.md) | Project workflow for `/find-docs` slash command | `.agents/workflows/find-docs.md` |
| [agents-md-section.md](assets/agents-md-section.md) | Context7 section for `AGENTS.md`                | Append to `AGENTS.md`            |

## Authentication

Context7 works **without authentication**. For higher rate limits:

```bash
# Option A: environment variable
export CONTEXT7_API_KEY=your_key

# Option B: OAuth login (CLI only)
ctx7 login
```

Get a free API key at [context7.com/dashboard](https://context7.com/dashboard).

## Error Handling

| Error               | Action                                                         |
| ------------------- | -------------------------------------------------------------- |
| Quota exceeded      | Inform user, suggest getting API key at context7.com/dashboard |
| No results          | Refine query, try alternative library name                     |
| Wrong library match | Be explicit about which library was selected and why           |
| Network error       | Fall back to training data, but **tell the user**              |

## ⚠️ Gotchas

- **Don't guess library IDs** — always resolve first, IDs are not intuitive
  (e.g., ethers.js is `/websites/ethers_v6`, not `/ethers-io/ethers.js`)
- **Single-word queries return garbage** — always use full questions
- **Version-specific IDs have special format** — `/org/project/version`,
  get available versions from `resolve-library-id` output
- **Rate limits without API key** — free tier has low limits, recommend
  getting a key at [context7.com/dashboard](https://context7.com/dashboard)
- **MCP is preferred over CLI** — if MCP tools are available, always use them
  instead of running `ctx7` CLI commands
