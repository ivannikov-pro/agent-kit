---
description: How to look up library documentation using Context7 MCP
---

# Documentation Lookup

Use this workflow whenever you need up-to-date library documentation, API references, or code examples via Context7.

## Steps

1. **Resolve the library ID**
   Call `resolve-library-id` with:
   - `libraryName`: the library name (e.g., "next.js", "openzeppelin")
   - `query`: the user's full question for relevance ranking

2. **Select the best match** from results based on:
   - Exact name match (prioritized)
   - Higher benchmark score (max 100)
   - Source reputation (High > Medium > Low)
   - More code snippets = better coverage
   - If user mentions a version, use version-specific ID (e.g., `/vercel/next.js/v14.3.0`)

3. **Query the documentation**
   Call `query-docs` with:
   - `libraryId`: the selected ID (e.g., `/vercel/next.js`)
   - `query`: specific, descriptive question

4. **Use the documentation** in your response:
   - Include relevant code examples
   - Cite the library version when relevant
   - Don't mix training data with fetched docs

## Rules

- **Max 3 calls per question** — if not found, use best result
- **Always resolve first** — don't guess library IDs (unless user provides one like `/org/project`)
- **Descriptive queries** — `"How to set up JWT auth in Express.js"` NOT `"auth"`
- **No secrets in queries** — never include API keys, passwords, or credentials

## Key Libraries for This Project

<!-- CUSTOMIZE: Replace with your project's actual libraries -->
<!-- Use `resolve-library-id` to find the correct Context7 ID -->

| Library     | Context7 ID    |
| ----------- | -------------- |
| Example lib | `/org/project` |

## Error Handling

- **Quota exceeded**: inform the user, suggest getting API key at context7.com/dashboard
- **No results**: refine query, try alternative library name, or fall back to training data (but tell the user)
- **Wrong library matched**: be explicit about which library you selected and why
