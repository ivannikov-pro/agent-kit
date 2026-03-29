---
# name: 1-64 chars, lowercase a-z + hyphens, must match folder name
name: my-skill
# description: 1-1024 chars, include "Use when..." for agent discovery
description: How to <what this skill does>. Use when <trigger condition>.
# category: meta | security | development | documentation | testing | devops | data | design | productivity
category: <your-category>
# risk: safe | unknown | offensive | critical
risk: safe
# source: community | official
source: community
tags: [tag-one, tag-two]
# tools: claude | cursor | gemini | antigravity | copilot | windsurf | kiro | codex | opencode | adal
tools: [claude, cursor, gemini]
date_added: "YYYY-MM-DD"
license: MIT
# compatibility: 1-500 chars, optional — runtime/tool requirements
# compatibility: Requires Python 3.14+ and uv
# allowed-tools: optional — space-delimited pre-approved tools
# allowed-tools: Bash(git:*) Read
metadata:
  author: <author-or-org>
  version: "1.0.0"
---

# <Skill Name>

<One-sentence description of what this skill does.>

> **Source:** [github.com/org/repo](https://github.com/org/repo)
> **Skill updated:** YYYY-MM-DD

## When to Use

- Use when <scenario 1>
- Use when <scenario 2>
- Use when <scenario 3>

## When NOT to Use

- Not for <out-of-scope scenario>

## Overview

<!-- What the agent needs to know to use this skill effectively -->

## Step by Step

1. **Step one** — description
2. **Step two** — description
3. **Step three** — description

## Key Rules

- Rule or constraint the agent must follow
- Another important rule

## Best Practices

- ✅ Do this
- ✅ Also do this
- ❌ Don't do this
- ❌ Avoid this

## Common Pitfalls

- **Problem:** Description of common issue
  **Solution:** How to fix it

---

## ⚠️ Gotchas

### Known issue title

Explanation of the issue and how to avoid it.
