---
name: express-v5
description: How to use Express v5 — async errors, removed APIs, path syntax, middleware. Use when building HTTP servers with Express.
category: development
risk: safe
source: local
tags: [express, http, node, api, middleware]
tools: [claude, cursor, gemini, antigravity, copilot, windsurf, kiro]
date_added: "2026-03-28"
metadata:
  version: "1.0.0"
---

# Express v5

Minimal web framework for Node.js. v5 is a major rewrite with async error handling, removed deprecated APIs, and modern JS support.

> **Source:** [github.com/expressjs/express](https://github.com/expressjs/express) · [npm](https://www.npmjs.com/package/express)
> **Version in project:** `5.2.1` · **Published:** 2025-03 · **Skill updated:** 2026-03-21

## When to Use

- Building or modifying HTTP server routes and middleware
- Migrating from Express v4 to v5
- Adding error handling, body parsing, or CORS to an Express app

## When NOT to Use

- Working with Telegraf bot webhooks only (use `telegraf-v4` skill)
- Building a frontend app — Express is backend only

## Installation

```bash
npm install express@5
npm install @types/express -D
```

## Basic Server

```typescript
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("Server running on :3000");
});
```

## Key Differences from v4

### ✅ Async error handling (automatic)

```typescript
// v4 — needed try/catch + next(err)
app.get("/data", async (req, res, next) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// v5 — thrown/rejected errors caught automatically
app.get("/data", async (req, res) => {
  const data = await fetchData(); // if this throws, Express catches it
  res.json(data);
});
```

### ❌ Removed APIs

| Removed                  | Replacement                     |
| ------------------------ | ------------------------------- |
| `app.del()`              | `app.delete()`                  |
| `app.param(fn)`          | Direct middleware               |
| `req.host`               | `req.hostname`                  |
| `req.acceptsCharset()`   | `req.acceptsCharsets()`         |
| `res.json(status, obj)`  | `res.status(status).json(obj)`  |
| `res.send(status, body)` | `res.status(status).send(body)` |
| `res.sendfile()`         | `res.sendFile()`                |

### Path syntax changes

```typescript
// v4: optional params with ?
app.get("/user/:id?", handler);

// v5: use {param} syntax for optional
app.get("/user{/:id}", handler);

// v5: regexp in path uses {regexp} syntax
app.get("/file/:name{.:ext}", handler);
```

## Middleware Pattern

```typescript
import express, { type Request, type Response, type NextFunction } from "express";

// Error handler — must have 4 params
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
```

## Router

```typescript
import { Router } from "express";


const router = Router();

router.get("/", (req, res) => { ... });
router.post("/", (req, res) => { ... });

export default router;

// Mount in app
app.use("/api/users", userRouter);
```

## Common Middleware

```typescript
// Body parsing (built-in)
app.use(express.json({ limit: "1kb" }));
app.use(express.urlencoded({ extended: true }));

// CORS
import cors from "cors";
app.use(cors());

// Static files
app.use(express.static("public"));

// Trust proxy (for reverse proxy setups)
app.set("trust proxy", 1);
```

## TypeScript Types

```typescript
import type { Request, Response, NextFunction, Application } from "express";

// Typed request body/params
type CreateUserBody = { name: string; email: string };

app.post("/users", (req: Request<{}, {}, CreateUserBody>, res: Response) => {
  const { name, email } = req.body;
  res.json({ name, email });
});
```

---

## ⚠️ Gotchas

### v5 is NOT v4

Don't copy v4 patterns blindly. Key differences: async errors auto-caught, path syntax changed, some APIs removed. Check the migration guide.

### express.json() limit

Default body limit is 100KB. For small payloads, set `express.json({ limit: "1kb" })`.

### Error handler must be 4-param

Express identifies error handlers by having exactly 4 parameters `(err, req, res, next)`. Missing any one makes it a regular middleware.

### req.ip with trust proxy

Behind a reverse proxy, `req.ip` returns the proxy IP. Set `app.set("trust proxy", 1)` to get the client IP from `X-Forwarded-For`.
