---
name: node-app-logger
description: How to add and use @ivannikov-pro/app-logger — log4js-based logging with convict integration. Use when adding logging to a package.
category: development
risk: safe
source: local
tags: [logging, log4js, convict, node, observability]
tools: [claude, cursor, gemini, antigravity, copilot, windsurf, kiro]
date_added: "2026-03-28"
metadata:
  version: "1.0.0"
---

# Using app-logger

`@ivannikov-pro/app-logger` — log4js-based logging with convict schema integration. Supports stdout, stderr, date-rolling file, and GELF appenders.

> **Source:** [packages/app-logger](file://packages/app-logger) (monorepo local)
> **Version:** `1.0.0` · **Skill updated:** 2026-03-21

## When to Use

- Adding `@ivannikov-pro/app-logger` to a new package or app
- Configuring logger appenders (stdout, file, GELF)
- Setting up logger schema integration with app-config

## When NOT to Use

- Configuring log4js directly without the wrapper (use `node-log4js` skill)
- Working with config schemas only (use `node-app-config` skill)

## Prerequisites

Requires `@ivannikov-pro/app-config` as a peer dependency. Your config schema must include `dataConfigSchema` (for file appender paths).

## Setup (2 files)

### 1. Add logger schema to your config (in `config/schema.ts`):

```typescript
import {
  envConfigSchema,
  type EnvConfig,
  dataConfigSchema,
  type DataConfig,
  fileConfigSchema,
  type FileConfig,
} from "@ivannikov-pro/app-config";
import { loggerConfigSchema, type LoggerConfig } from "@ivannikov-pro/app-logger";

const mySchema = {
  /* your custom schema */
};
type MyConfig = {
  /* your custom type */
};

export const schema = {
  ...envConfigSchema,
  ...dataConfigSchema,
  ...fileConfigSchema,
  ...loggerConfigSchema, // adds logger.* config fields
  ...mySchema,
};

export type ConfigSchema = EnvConfig & DataConfig & FileConfig & LoggerConfig & MyConfig;
```

### 2. Create `logger.ts` at src root:

```typescript
import { initLogger } from "@ivannikov-pro/app-logger";
import config from "./config";

export default initLogger(config);
export const loggerPrefix = "MyApp";
```

### 3. Use it anywhere:

```typescript
import log4js, { loggerPrefix } from "./logger";
const logger = log4js.getLogger(`${loggerPrefix}:module-name`);

logger.info("Server started");
logger.error("Something failed", err);
logger.debug("Debugging info", { key: "value" });
```

## package.json dependency

```json
{
  "dependencies": {
    "@ivannikov-pro/app-config": "workspace:*",
    "@ivannikov-pro/app-logger": "workspace:*"
  }
}
```

## Environment Variables

| Env var            | Default     | Description                                       |
| ------------------ | ----------- | ------------------------------------------------- |
| `LOGGER_LEVEL`     | `info`      | Log level: fatal, error, warn, info, debug, trace |
| `LOGGER_STDOUT`    | `true`      | Enable stdout appender                            |
| `LOGGER_STDERR`    | `false`     | Enable stderr appender                            |
| `LOGGER_FILE`      | `false`     | Enable date-rolling file appender                 |
| `LOGGER_GELF`      | `false`     | Enable GELF (Graylog) appender                    |
| `LOGGER_PM2`       | `false`     | Enable PM2 clustering                             |
| `LOGGER_FILE_NAME` | `debug.log` | Log file name (in data.dir)                       |
| `LOGGER_GELF_HOST` | `127.0.0.1` | GELF server host                                  |
| `LOGGER_GELF_PORT` | `12201`     | GELF server port                                  |

## Key Types

```typescript
import type { Logger, Log4js } from "@ivannikov-pro/app-logger";
import type { LoggerConfig, LoggerConfigExtra, ConfigLogger } from "@ivannikov-pro/app-logger";
```

| Type                | Use for                                                  |
| ------------------- | -------------------------------------------------------- |
| `Logger`            | Individual logger instance (`log4js.getLogger()` return) |
| `Log4js`            | The log4js module instance                               |
| `LoggerConfig`      | Schema type for `logger.*` fields only                   |
| `LoggerConfigExtra` | `LoggerConfig & DataConfig & EnvConfig`                  |
| `ConfigLogger`      | `Config<LoggerConfigExtra>` — for function params        |

## ⚠️ Gotchas

### TS2589 with config.has()

```typescript
// @ts-ignore — convict Path<any> causes deep type instantiation in dts builds
if (!config.has("logger") || !config.has("data")) { ... }
```

### File appender needs data.dir

The file appender writes to `join(config.get("data.dir"), config.get("logger.file.name"))`. Your config schema **must** include `dataConfigSchema`.

### Import from app-config

Types like `Config`, `DataConfig`, `EnvConfig` must come from `@ivannikov-pro/app-config`, not from `convict` directly.
