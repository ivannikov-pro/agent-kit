# @ivannikov-pro/ai-agent-kit

🛠️ CLI + MCP server + web catalog for AI agent skills, workflows, and MCP configs.

Your personal toolkit for AI-powered development — browse the catalog, install curated skills into any project, or let your AI agent manage its own toolset via MCP.

## Monorepo Structure

```
ai-agent-kit/
├── packages/cli/     — @ivannikov-pro/ai-agent-kit (npm CLI + MCP server)
├── packages/web/     — Web catalog (Next.js, deployed to GitHub Pages)
├── skills/           — Embedded skills (SKILL.md + assets)
├── workflows/        — Embedded workflows
├── registry.json     — Central resource manifest
└── docs/             — Architecture & contributing guides
```

## Quick Start

```bash
# List all available resources
npx @ivannikov-pro/ai-agent-kit list

# Install a skill into your project
npx @ivannikov-pro/ai-agent-kit add skill-base

# Install globally
npx @ivannikov-pro/ai-agent-kit add find-docs --global

# Interactive project setup
npx @ivannikov-pro/ai-agent-kit init
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `ai-agent-kit list` | List all available resources |
| `ai-agent-kit list --skills` | List only skills |
| `ai-agent-kit add <name>` | Install a skill or workflow |
| `ai-agent-kit add <name> --global` | Install globally (`~/.agents/`) |
| `ai-agent-kit remove <name>` | Remove an installed resource |
| `ai-agent-kit init` | Interactive project initialization |
| `ai-agent-kit mcp` | Start as MCP server (stdio) |

## As MCP Server

Add to your AI agent's MCP config:

```json
{
  "mcpServers": {
    "ai-agent-kit": {
      "command": "npx",
      "args": ["-y", "@ivannikov-pro/ai-agent-kit", "mcp"]
    }
  }
}
```

### MCP Tools

| Tool | Description |
|------|-------------|
| `list_resources` | List skills, workflows, and MCP configs |
| `install_resource` | Install a resource by name |
| `search_resources` | Search by keyword or tag |

## Programmatic API

```typescript
import { AgentKit } from "@ivannikov-pro/ai-agent-kit";

const kit = new AgentKit();

const resources = await kit.list();
await kit.install("find-docs");
```

## Available Resources

### Skills

| Name | Description |
|------|-------------|
| `skill-base` | How to create, maintain, and distribute AI agent skills |
| `find-docs` | Documentation lookup via Context7 MCP |

### MCP Configs

| Name | Package |
|------|---------|
| `ai-notify-tg` | `@ivannikov-pro/ai-notify-tg` |

## Development

```bash
pnpm install              # Install all deps
pnpm build                # Build all packages
pnpm --filter web dev     # Web catalog dev server
pnpm --filter cli build   # Build CLI only
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — components, data flow, build system
- [Contributing](docs/CONTRIBUTING.md) — how to add skills and workflows

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GITHUB_TOKEN` / `GH_TOKEN` | GitHub token for higher API rate limits |

## License

[MIT](./LICENSE)
