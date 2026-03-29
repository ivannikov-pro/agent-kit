# MCP Servers Directory

This directory contains documentation and configurations for **Model Context Protocol (MCP)** servers that are registered in the `ai-agent-kit` registry. 

## How to add a new MCP Server

There are two ways to add a new MCP server to the registry:
1. **As a single markdown file**: Create a file like `mcp/my-server.md`.
2. **As a directory**: Create a directory `mcp/my-server/` with an `MCP.md` file inside. (This is useful if you need to co-locate images or other assets).

### Required Content & Layout

Every MCP markdown file **MUST** contain a valid YAML frontmatter block at the very top. 
The updated registry validation logic explicitly requires the **`package`** and **`description`** properties.

Here is the standard template:

```markdown
---
package: "@example/my-mcp-server" # The NPM package to install or NPX command path
description: >-
  A clear summary of what this MCP server does and why an agent should use it.
  Keep it under 2048 characters.
category: tools             # Optional auto-classification hints
tags: [mcp, example]        # Optional keywords
risk: safe                  # Options: none, safe, critical, offensive, unknown
metadata:
  version: "1.0.0"
---

# My MCP Server

A brief overview.

## Setup & Configuration

Describe how to configure this MCP server (e.g., in `claude_desktop_config.json` or cursor settings). Include API keys, environment variables required, etc.

## When to Use

When should the agent decide to use the tools provided by this MCP server? 

## Do not use

Any anti-patterns or cases where this MCP should NOT be used.

## Instructions

Any custom instructions or limitations for the agent using these tools.
```

### Validation Rules ⚠️

Before you can commit a new MCP server to the repository, `husky` will run `pnpm run registry:validate`.
This process explicitly checks for:
- Missing `package` or `description` YAML keys.
- Unrecognized `risk` levels (defaults to `unknown`).
- **Required Sections:** Your Markdown content must include at least one setup/instructions header (`## Setup`, `## Configuration`, `## Instructions`, or `## When to Use`).
- **Links Check:** All local markdown links must correctly resolve to a local file.
- **Offensive Content:** If `risk: offensive`, then `AUTHORIZED USE ONLY` MUST be present in the markdown.

### Updating the Registry

Once you add or modify a file in this folder, you can manually build the catalog by running:
```bash
pnpm run registry:build
```
This updates `registry.json` and `CATALOG.md`. When committing, this happens automatically!
