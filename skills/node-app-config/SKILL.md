---
name: node-app-config
description: How to add and use @ivannikov-pro/app-config — convict-based config with dotenv, schema validation. Use when adding configuration management to a package.
category: development
risk: safe
source: local
tags: [config, convict, dotenv, validation, node]
tools: [claude, cursor, gemini, antigravity, copilot, windsurf, kiro]
date_added: "2026-03-28"
metadata:
  version: "1.0.0"
---

# Using app-config

`@ivannikov-pro/app-config` — convict-based config with dotenv, multi-format files (JSON/YAML/TOML), XDG paths, and schema validation.

> **Source:** [packages/app-config](file://packages/app-config) (monorepo local)
> **Version:** `1.0.0` · **Skill updated:** 2026-03-21

## When to Use

- Adding `@ivannikov-pro/app-config` to a new package or app
- Defining or modifying config schemas with convict
- Debugging config loading, validation, or TS2589 errors

## When NOT to Use

- Working with convict API directly (use `node-convict` skill)
- Configuring logging (use `node-app-logger` skill)

## Recommended Directory Structure

```
src/
├── config/
│   ├── index.ts          # Creates convict instance, runs setupConfig(), exports default
│   ├── schema.ts         # Combined schema (spreads base + custom schemas)
│   └── formats.ts        # (optional) Custom convict validation formats
├── logger.ts             # (optional) initLogger(config), exports log4js + loggerPrefix
└── index.ts              # Main entry — imports config, logger, starts app
```

**Why this structure:**

- `config/` is self-contained — schema definition and setup in one place
- `config/index.ts` is the single import point: `import config from "./config"`
- `schema.ts` is separate so you can import the type without triggering setup
- `formats.ts` keeps custom validators isolated (registered before `convict(schema)`)
- `logger.ts` at root level — depends on config but is not part of config

## Quick Setup (3 files)

### 1. config/schema.ts — Define your schema

Spread base schemas + add your own:

```typescript
import {
  envConfigSchema,
  type EnvConfig,
  dataConfigSchema,
  type DataConfig,
  fileConfigSchema,
  type FileConfig,
} from "@ivannikov-pro/app-config";

// Your custom schema
const mySchema = {
  server: {
    port: {
      doc: "HTTP server port",
      format: "port", // convict built-in: validates port range
      default: 3000,
      env: "SERVER_PORT", // reads from env var
      arg: "server-port", // reads from CLI --server-port=3000
    },
    host: {
      doc: "Server host",
      format: String,
      default: "localhost",
      env: "SERVER_HOST",
      arg: "server-host",
    },
  },
};

type MyConfig = {
  server: {
    port: number;
    host: string;
  };
};

// Combined schema
export const schema = {
  ...envConfigSchema,
  ...dataConfigSchema,
  ...fileConfigSchema,
  ...mySchema,
};

export type ConfigSchema = EnvConfig & DataConfig & FileConfig & MyConfig;
```

### 2. config/index.ts — Create and setup config

```typescript
import { convict, setupConfig, type Config } from "@ivannikov-pro/app-config";
import { schema, type ConfigSchema } from "./schema";

const config: Config<ConfigSchema> = convict(schema);
setupConfig(config);

export default config;
```

### 3. Use it

```typescript
import config from "./config";

const port = config.get("server.port"); // typed number
const host = config.get("server.host"); // typed string
```

## Adding app-logger (optional)

If your app uses `@ivannikov-pro/app-logger`, add its schema too:

```typescript
import { loggerConfigSchema, type LoggerConfig } from "@ivannikov-pro/app-logger";

export const schema = {
  ...envConfigSchema,
  ...dataConfigSchema,
  ...fileConfigSchema,
  ...loggerConfigSchema, // adds logger.* config fields
  ...mySchema,
};

export type ConfigSchema = EnvConfig & DataConfig & FileConfig & LoggerConfig & MyConfig;
```

Then init logger:

```typescript
import { initLogger } from "@ivannikov-pro/app-logger";
import config from "./config";

export default initLogger(config);
```

## package.json dependency

Add to `dependencies` (not devDependencies):

```json
{
  "dependencies": {
    "@ivannikov-pro/app-config": "workspace:*"
  }
}
```

Then run `pnpm install`.

## Schema Field Reference

Every schema field supports:

| Property    | Required | Description                                                                              |
| ----------- | -------- | ---------------------------------------------------------------------------------------- |
| `doc`       | ✅        | Human-readable description                                                               |
| `format`    | ✅        | Type: `String`, `Number`, `Boolean`, `"port"`, `"nat"`, `"url"`, array of allowed values |
| `default`   | ✅        | Default value (use `null` for required-no-default)                                       |
| `env`       | optional | Environment variable name                                                                |
| `arg`       | optional | CLI argument name (becomes `--arg-name`)                                                 |
| `sensitive` | optional | If `true`, value is masked in `toString()` output                                        |

## Built-in Schemas (always include these)

| Schema             | Fields                                                      |
| ------------------ | ----------------------------------------------------------- |
| `envConfigSchema`  | `env` (NODE_ENV: production/development/test)               |
| `dataConfigSchema` | `data.configHome`, `data.dir`, `data.skipDirCreate`         |
| `fileConfigSchema` | `config.file.name`, `.path`, `.save`, `.print`, `.skipLoad` |

## Config File Location

Resolved automatically by `setupConfig()`:

- `~/.ivannikov-pro/ai-notify-tg/config.json` (from package.json name)
- Override: `DATA_DIR=mydir` or `CONFIG_FILE_PATH=/absolute/path`

Supported formats: `.json`, `.yaml`, `.yml`, `.toml`

## CLI for Config Management

```bash
# Print current config and exit
node app.js --config-file-print

# Save current config to disk and exit
node app.js --config-file-save

# Skip loading config file
node app.js --config-file-skip-load

# Use YAML format
CONFIG_FILE_NAME=config.yaml node app.js
```

---

## ⚠️ CRITICAL: Known Gotchas

### TS2589 — "Type instantiation is excessively deep"

**Problem:** `convict`'s generic `Config<T>` type causes TS2589 errors during `dts` (declaration) builds when used with complex schemas. The error appears in:

- `config.has()` calls
- Functions that accept `Config<T>` parameters in `.d.ts` output

**Solution 1 — `@ts-ignore` before `config.has()`:**

```typescript
// @ts-ignore — convict Path<any> causes deep type instantiation in dts builds
if (config.has("some.key")) { ... }
```

**Solution 2 — Use `AppConfig` interface for function parameters:**

When a function needs to accept a config object as parameter (e.g. in a library), use `AppConfig` instead of `Config<T>`:

```typescript
import type { AppConfig } from "@ivannikov-pro/app-config";

// ✅ Safe — no deep type instantiation
export function initSomething(config: AppConfig): void {
  const value = config.get("some.key");
}

// ❌ Causes TS2589 in dts builds
export function initSomething(config: Config<MySchema>): void { ... }
```

**When does TS2589 appear?**

- Only during `dts` builds (tsup `dts: true`, `tsc --declaration`)
- Regular `tsc --noEmit` typecheck passes fine
- The error is in convict's type system, not your code

### Validation Mode

`setupConfig()` uses `config.validate({ allowed: "strict" })` — any unknown keys in config file will throw an error.

If you want to share a config file between apps with different schemas, either:

1. Use `config.file.skipLoad = true` for apps that don't need the file
2. Change to `allowed: "warn"` (not recommended — weakens validation)

### Schema Type vs Runtime Type

Always define BOTH the convict schema object AND the TypeScript type:

```typescript
// Schema object (runtime validation)
export const mySchema = {
  server: {
    port: { format: "port", default: 3000, ... },
  },
};

// TypeScript type (compile-time safety)
export type MyConfig = {
  server: {
    port: number;
  };
};
```

The type is NOT auto-inferred from the schema — you must keep them in sync manually.

### Import convict from app-config, not directly

```typescript
// ✅ Central access point
import { convict, type Config } from "@ivannikov-pro/app-config";

// ❌ Don't import convict directly in app code
import convict from "convict";
```

This ensures consistent convict version and registered parsers/formats across the monorepo.
