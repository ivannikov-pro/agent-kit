# @ivannikov-pro/agent-kit

🛠️ CLI + MCP server + web catalog for AI agent skills, workflows, and MCP configs.

Your personal toolkit for AI-powered development — browse the catalog, install curated skills into any project, or let your AI agent manage its own toolset via MCP.

## Monorepo Structure

```
agent-kit/
├── packages/cli/     — @ivannikov-pro/agent-kit (npm CLI + MCP server)
├── packages/web/     — Web catalog (Next.js, deployed to GitHub Pages)
├── skills/           — Embedded skills (SKILL.md + assets)
├── workflows/        — Embedded workflows
├── registry.json     — Central resource manifest
└── docs/             — Architecture & contributing guides
```

## Quick Start

```bash
# List all available resources
npx @ivannikov-pro/agent-kit list

# Install a skill into your project
npx @ivannikov-pro/agent-kit add skill-base

# Install globally
npx @ivannikov-pro/agent-kit add find-docs --global

# Interactive project setup
npx @ivannikov-pro/agent-kit init
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `agent-kit list` | List all available resources |
| `agent-kit list --skills` | List only skills |
| `agent-kit add <name>` | Install a skill or workflow |
| `agent-kit add <name> --global` | Install globally (`~/.agents/`) |
| `agent-kit remove <name>` | Remove an installed resource |
| `agent-kit init` | Interactive project initialization |
| `agent-kit mcp` | Start as MCP server (stdio) |

## As MCP Server

Add to your AI agent's MCP config:

```json
{
  "mcpServers": {
    "agent-kit": {
      "command": "npx",
      "args": ["-y", "@ivannikov-pro/agent-kit", "mcp"]
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
import { AgentKit } from "@ivannikov-pro/agent-kit";

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

MIT © [ivannikov-pro](https://github.com/ivannikov-pro)
