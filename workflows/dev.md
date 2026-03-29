---
description: How to start the full development environment
---

# Start Dev Environment

// turbo-all

1. Start infrastructure (PostgreSQL, Redis, etc.):

```bash
pnpm db:up
```

2. Start all dev servers (frontend, api, etc.):

```bash
pnpm dev
```

3. To stop infrastructure when done:

```bash
pnpm db:down
```

## Individual Services

Start only a specific app:

```bash
pnpm --filter @onchain-giveaway/lookslux-web dev
```

## Docker Services

| Service         | URL                     |
| --------------- | ----------------------- |
| PostgreSQL      | `localhost:5432`        |
| Redis           | `localhost:6379`        |
| pgAdmin         | `http://localhost:5050` |
| Bull Board      | `http://localhost:3100` |
| Redis Commander | `http://localhost:8081` |
