## Context7 (Documentation Lookup)

Always use Context7 MCP when working with library/API documentation, code generation,
setup, or configuration steps — without the user having to explicitly ask.

**Workflow:** `resolve-library-id` → select best match → `query-docs` → use in response.

**Rules:**
- Max **3 calls per question** — use best result if not found
- Library IDs always with `/` prefix: `/vercel/next.js`, not `vercel/next.js`
- Pass the user's **full question** as query, not single words
- If user specifies a version, use version-specific library ID
- Never include API keys, passwords, or secrets in queries

**Key libraries for this project:**
<!-- CUSTOMIZE: Replace with your project's actual libraries -->
<!-- Use `resolve-library-id` to find the correct Context7 ID -->
- `/org/project` — Description
