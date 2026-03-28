# @ivannikov-pro/ai-agent-kit

🛠️ CLI + MCP server for installing AI agent skills, workflows, and MCP configs.

## Install

```bash
npx @ivannikov-pro/ai-agent-kit list
npx @ivannikov-pro/ai-agent-kit add <skill-name>
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `ai-agent-kit list` | List available resources |
| `ai-agent-kit list --skills` | List only skills |
| `ai-agent-kit add <name>` | Install a skill or workflow |
| `ai-agent-kit add <name> --global` | Install globally (`~/.agents/`) |
| `ai-agent-kit remove <name>` | Remove an installed resource |
| `ai-agent-kit init` | Interactive project setup |
| `ai-agent-kit mcp` | Start as MCP server (stdio) |

## MCP Server

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

### Tools

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

## License

[MIT](./LICENSE)
