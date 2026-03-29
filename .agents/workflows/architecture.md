---
description: How to keep the architecture document (docs/ARCHITECTURE.md) up to date after making changes
---

# Keep Architecture Document Up to Date

After any change that affects the project architecture, run this workflow to keep `docs/ARCHITECTURE.md` current.

## When to Run

Run this workflow when any of these change:

- A new app or package is added/removed
- Dependencies between packages change
- A new data flow or integration is introduced (e.g., new API route, new MCP tool)
- Configuration approach changes (new env vars, schema changes)
- Build or deployment pipeline changes
- Conventions or coding standards change

## Steps

1. **Read the current architecture document:**
   Open `docs/ARCHITECTURE.md` and review its contents.

2. **Identify what changed:**
   Compare your recent changes against the architecture doc. Check:
   - Monorepo Structure section (new/removed apps or packages?)
   - Dependency Graph (new edges or removed deps?)
   - Data Flows (new routes, tools, transports?)
   - Package Contracts (new exports, changed APIs?)
   - Conventions section (new patterns, build changes?)

3. **Update the relevant sections:**
   Edit `docs/ARCHITECTURE.md` with the new information. Keep the format consistent:
   - Use mermaid diagrams for dependency graphs
   - Use ASCII flow diagrams for data flows
   - Use tables for package contracts
   - Update the "Last updated" date at the top

4. **Verify accuracy:**
   - Cross-check dependency claims against `package.json` files
   - Verify file paths still exist
   - Ensure data flow descriptions match actual code

> [!IMPORTANT]
> The architecture doc should remain **concise and scannable**. Don't dump implementation details — focus on **structure**, **contracts**, and **flows**. Link to source files for details.
