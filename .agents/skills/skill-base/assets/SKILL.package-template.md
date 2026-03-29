---
# name: 1-64 chars, lowercase a-z + hyphens, must match folder name
name: my-package
# description: 1-1024 chars, include "Use when..." for agent discovery
description: How to use <package> — <one-line description>. Use when <trigger condition>.
# category: meta | security | development | documentation | testing | devops | data | design | productivity
category: development
# risk: safe | unknown | offensive | critical
risk: safe
# source: community | official
source: community
tags: [package-name, tag-two]
# tools: claude | cursor | gemini | antigravity | copilot | windsurf | kiro | codex | opencode | adal
tools: [claude, cursor, gemini]
date_added: "YYYY-MM-DD"
license: MIT
# compatibility: 1-500 chars, optional — runtime/tool requirements
# compatibility: Requires Node.js 18+
# allowed-tools: optional — space-delimited pre-approved tools
# allowed-tools: Bash(npm:*) Read
metadata:
  author: <author-or-org>
  version: "1.0.0"
---

# <Package Name>

<One-sentence description of what this package does.>

> **Source:** [github.com/org/repo](https://github.com/org/repo) · [npm](https://www.npmjs.com/package/<package>)
> **Version in project:** `X.Y.Z` · **Published:** YYYY-MM · **Skill updated:** YYYY-MM-DD

## When to Use

- Use when <scenario 1>
- Use when <scenario 2>

## Installation

```bash
npm install <package>
```

## Basic Usage

```typescript
// Minimal working example
```

## Key Options

| Option   | Type     | Default | Description  |
| -------- | -------- | ------- | ------------ |
| `option` | `string` | `""`    | What it does |

## Best Practices

- ✅ Do this
- ❌ Don't do this

## Common Pitfalls

- **Problem:** Description of common issue
  **Solution:** How to fix it

---

## ⚠️ Gotchas

### Known issue title

Explanation of the issue and how to fix it.
