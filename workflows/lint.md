---
description: How to lint all packages in the monorepo
---

# Lint All Packages

// turbo-all

1. Lint all packages:

```bash
pnpm lint
```

2. Lint a specific app (replace `<app-name>`):

```bash
pnpm --filter @onchain-giveaway/<app-name> lint
```
