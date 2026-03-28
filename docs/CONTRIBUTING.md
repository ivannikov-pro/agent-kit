# Contributing to ai-agent-kit

## Adding a New Skill

1. Create a directory under `skills/`:

```
skills/my-skill/
├── SKILL.md          # Required — main instruction file
├── assets/           # Optional — templates, snippets
└── references/       # Optional — reference docs
```

2. Write `SKILL.md` with YAML frontmatter:

```yaml
---
name: my-skill
description: Short description of what this skill does. Use when <trigger condition>.
category: development
tags: [tag1, tag2]
tools: [tool1, tool2]
risk: low
date_added: "2026-03-25"
license: MIT
metadata:
  version: "1.0.0"
  author: your-name
---

# My Skill

Detailed instructions for the AI agent...
```

3. Register in `registry.json`:

```json
{
  "skills": {
    "my-skill": {
      "source": "local:skills/my-skill",
      "description": "Short description matching SKILL.md",
      "tags": ["tag1", "tag2"],
      "version": "1.0.0"
    }
  }
}
```

4. Verify:

```bash
# Build and test
pnpm --filter cli build
node packages/cli/dist/bin.js list

# Check web renders
pnpm --filter web dev
# Open http://localhost:3000/skills/my-skill
```

5. Commit and push — the skill is now installable via:

```bash
npx @ivannikov-pro/ai-agent-kit add my-skill
```

## Adding a New Workflow

1. Create a markdown file in `workflows/`:

```markdown
---
description: Short description of this workflow
---

## Steps

1. Step one...
2. Step two...
```

2. Register in `registry.json` under `"workflows"`.

## Adding an MCP Config

MCP entries reference published npm packages:

```json
{
  "mcp": {
    "my-mcp": {
      "package": "@scope/my-mcp-package",
      "description": "What this MCP server does"
    }
  }
}
```

## Development

```bash
pnpm install          # Install deps
pnpm build            # Build all packages
pnpm --filter web dev # Dev server (http://localhost:3000)
```

## Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat: add new skill xyz` — new features
- `fix: correct registry path` — bug fixes
- `docs: update architecture` — documentation
- `refactor: simplify installer` — code changes without feature changes
