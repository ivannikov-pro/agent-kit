---
name: skill-base
description: How to create, maintain, and distribute AI agent skills. Use when creating new skills, updating existing ones, or setting up skill infrastructure in a project.
category: meta
risk: safe
source: community
tags: [skill-base, meta-skill, agentskills, multi-agent, scaffolding]
tools: [claude, cursor, gemini, antigravity, copilot, windsurf, kiro, codex]
date_added: "2026-03-21"
license: MIT
metadata:
  author: ivannikov-pro
  version: "1.1.0"
---

# Creating Agent Skills

Guide for creating and maintaining SKILL.md-based skills compatible with all AI agents (Claude Code, Cursor, Gemini CLI, Antigravity, Copilot, Windsurf, Kiro, Codex CLI, OpenCode, AdaL).

> **Standard:** [agentskills.io](https://agentskills.io) (Anthropic, Dec 2025)
> **Skill updated:** 2026-03-28

## When to Use

- Creating a new SKILL.md-based skill from scratch
- Updating an existing skill after a package version change
- Setting up skill infrastructure in a project or monorepo
- Publishing a skill to a community repository
- Distributing skills across multiple AI agents
- **Auditing existing skills** for compliance (use `scripts/audit-skills.sh`)
- **Batch-upgrading** legacy skills from minimal to full frontmatter

## When NOT to Use

- Learning basic markdown syntax — this skill assumes markdown familiarity
- Creating IDE plugins or extensions — skills are markdown-based, not code plugins
- One-off prompts — skills are for reusable, persistent knowledge

## Skill Directory Structure

```
.agents/skills/
  skill-name/
    SKILL.md          # Required: metadata + instructions
    scripts/          # Optional: executable scripts
    references/       # Optional: extra documentation
    examples/         # Optional: usage examples
    assets/           # Optional: templates, configs
```

### Community skill collections

- [antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) — 1200+ skills for all agents
- [Web catalog](https://sickn33.github.io/antigravity-awesome-skills/) — searchable online catalog

### Agent discovery paths

Agents discover skills from global and project directories:

| Agent             | Global                          | Project                                |
| ----------------- | ------------------------------- | -------------------------------------- |
| Claude Code       | `~/.claude/skills/`             | `.claude/skills/`                      |
| Gemini CLI        | `~/.gemini/skills/`             | `.gemini/skills/` or `.agents/skills/` |
| Antigravity       | `~/.gemini/antigravity/skills/` | `.agent/skills/` or `.agents/skills/`  |
| Cursor            | `~/.cursor/skills/`             | `.cursor/skills/`                      |
| Copilot (VS Code) | —                               | `.github/skills/` or `.agents/skills/` |
| Windsurf          | `~/.codeium/windsurf/skills/`   | `.windsurf/skills/`                    |
| Kiro              | `~/.kiro/skills/`               | `.kiro/skills/`                        |
| Codex CLI         | `~/.codex/skills/`              | `.codex/skills/`                       |
| OpenCode          | `~/.agents/skills/`             | `.agents/skills/`                      |
| AdaL CLI          | `~/.adal/skills/`               | `.adal/skills/`                        |

## SKILL.md Template

Two templates available in `assets/`:

- [SKILL.template.md](assets/SKILL.template.md) — generic (workflows, processes, patterns)
- [SKILL.package-template.md](assets/SKILL.package-template.md) — for npm package wrappers

Copy the appropriate template, rename, and fill in your content.

Required structure: frontmatter → title → metadata block → content sections → ⚠️ Gotchas.

## Frontmatter Fields

Official fields per [agentskills.io/specification](https://agentskills.io/specification):

| Field           | Required | Limit        | Description                                                    |
| --------------- | :------: | :----------: | -------------------------------------------------------------- |
| `name`          | ✅        | 1-64 chars   | Lowercase `a-z` + hyphens, must match folder name, no `--`     |
| `description`   | ✅        | 1-1024 chars | What skill does + **when to use it** (agent discovery trigger) |
| `license`       | optional | —            | License identifier or reference to LICENSE file                |
| `compatibility` | optional | 1-500 chars  | Runtime/tool requirements (`Requires Python 3.14+`, etc.)      |
| `metadata`      | optional | —            | Key-value map (`author`, `version`, custom props)              |
| `allowed-tools` | optional | —            | Space-delimited pre-approved tools: `Bash(git:*) Read`         |

Community-extended fields (used by [antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills)):

| Field        | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| `risk`       | `safe`, `unknown`, `offensive`, or `critical` (default: safe) |
| `category`   | Skill category: `meta`, `security`, `development`, etc.       |
| `tags`       | Array of searchable tags                                      |
| `tools`      | Target agents: `[claude, cursor, gemini, ...]`                |
| `date_added` | First publish date (YYYY-MM-DD)                               |
| `source`     | `community` or `official`                                     |

## Required Sections

| Section              | Required    | Why                                         |
| -------------------- | :---------: | ------------------------------------------- |
| YAML frontmatter     | ✅           | Agents discover skills via `description`    |
| Title + description  | ✅           | Context for agent                           |
| When to Use          | ✅           | Trigger conditions for agent selection      |
| Metadata block       | ✅           | Source, version, dates for freshness check  |
| Installation / Usage | ✅           | How to use the skill                        |
| Gotchas (⚠️)         | ✅           | Agent-specific traps and known issues       |
| When NOT to Use      | recommended | Prevents false positive activation          |
| Security & Safety    | recommended | For skills with shell commands or mutations |

## Naming Convention

- Lowercase with hyphens: `express-v5`, `telegraf-v4`, `yao-pkg`
- Version suffix for major-version-specific skills: `-v4`, `-v5`
- `name` in frontmatter must match folder name

## Writing Best Practices

### 1. Focus on what agents DON'T know

❌ Don't explain what Express is — agents know that.
✅ Do explain: v5 async error handling differs from v4, `app.del()` removed.

### 2. Use code examples, not prose

❌ "You can configure the bundler to output multiple formats"
✅ `format: ["cjs", "esm"]`

### 3. Write a good `description` for discovery

The `description` field is how agents **discover** your skill. Include **what it does** and **when to use it**:

```yaml
---
name: express-v5
description: How to use Express v5 — async errors, removed APIs, path syntax, middleware. Use when building HTTP servers.
---
```

### 4. Add metadata block for freshness

```markdown
> **Source:** [github.com/org/repo](link) · [npm](link)
> **Version in project:** `X.Y.Z` · **Published:** YYYY-MM · **Skill updated:** YYYY-MM-DD
```

### 5. Always include Gotchas section

The ⚠️ Gotchas section is the most valuable part. Include:
- Known bugs and workarounds
- Differences from previous versions
- TypeScript quirks (TS2589 etc.)
- Common mistakes

### 6. Keep SKILL.md under 500 lines

Move detailed content to `references/` folder. Agent loads SKILL.md first, then follows links on demand. This keeps context lean and focused.

### 7. Use `npm install` for universality

Use `npm install` in skills, not `pnpm add` or `yarn add`. Users choose their package manager.

## Common Pitfalls

- **Problem:** Description too vague — "A useful skill for developers"
  **Fix:** Include trigger keywords and "Use when..." — agents match on description text

- **Problem:** SKILL.md over 500 lines — agent context overloaded
  **Fix:** Move reference tables, detailed examples to `references/` folder

- **Problem:** Frontmatter `name` doesn't match folder name
  **Fix:** Both must be identical, lowercase with hyphens

- **Problem:** Skill works in Claude but not in Cursor/Gemini
  **Fix:** Each agent reads different directories — check the discovery paths table above

- **Problem:** Skill copied from another project describes wrong project context
  **Fix:** After copying skills between monorepos, always audit project-specific references (package names, directory structures, tech stack). Use `grep -n 'old-project-name' .agents/skills/*/SKILL.md`

- **Problem:** Bilingual skills have description in non-English
  **Fix:** Always write `description` in English with "Use when..." — agents search English tokens. Skill body content can be in any language

- **Problem:** Skills have minimal 3-line frontmatter (name, description, ---)
  **Fix:** Upgrade to full frontmatter using the batch upgrade workflow below

## Security & Safety Notes

- Skills with shell commands (`curl`, `bash`, `wget`) should set `risk: offensive` or `risk: critical`
- Add explicit preconditions and environment expectations for destructive operations
- Include confirmation gates for skills that modify files or systems
- For offensive-security skills, add an "Authorized Use Only" disclaimer

## Validation Checklist

Before publishing a skill:

- [ ] Frontmatter `name` matches folder name
- [ ] `description` in English, contains "Use when..." trigger phrase
- [ ] Extended frontmatter: `category`, `tags`, `tools`, `metadata.version`
- [ ] SKILL.md ≤ 500 lines (detailed content in `references/`)
- [ ] "When to Use" section present
- [ ] ⚠️ Gotchas section present
- [ ] Code examples included, not just prose
- [ ] No stale project references from other repos
- [ ] Tested with at least one AI agent

### Automated Audit

Run the audit script to check all skills at once:

```bash
# From project root
bash .agents/skills/skill-base/scripts/audit-skills.sh .agents/skills

# Or from the skill-base skill itself
bash scripts/audit-skills.sh /path/to/.agents/skills
```

The script checks: frontmatter fields, name matching, trigger phrases, required sections, and line count.

## Batch Frontmatter Upgrade

When upgrading legacy skills from minimal (3-line) to full frontmatter:

### Before (minimal)

```yaml
---
name: my-skill
description: Some description.
---
```

### After (full)

```yaml
---
name: my-skill
description: Some description. Use when <trigger condition>.
category: development
risk: safe
source: local
tags: [relevant, tags]
tools: [claude, cursor, gemini, antigravity, copilot, windsurf, kiro]
date_added: "YYYY-MM-DD"
metadata:
  version: "1.0.0"
---
```

### Upgrade workflow

1. Run audit script to identify non-compliant skills
2. For each skill, add missing fields to existing frontmatter block
3. Add "When to Use" section if missing (after title)
4. Add "⚠️ Gotchas" section if missing (at end)
5. Set `date_added` to when the skill was first created
6. Re-run audit script to verify compliance

## Agent Documentation Files

For multi-package projects (monorepos), keep agent configuration files consistent.

| File                              | Who reads it            | Notes                                                     |
| --------------------------------- | ----------------------- | --------------------------------------------------------- |
| `AGENTS.md`                       | All agents              | Universal project context                                 |
| `CLAUDE.md`                       | Claude Code             | Project instructions                                      |
| `GEMINI.md`                       | Gemini CLI, Antigravity | Project context file                                      |
| `.gemini/settings.json`           | Gemini CLI              | System instruction                                        |
| `.cursor/rules/*.mdc`             | Cursor                  | Replaced `.cursorrules`                                   |
| `.windsurfrules`                  | Windsurf                | Legacy; new: `.windsurf/rules/*.md`                       |
| `.github/copilot-instructions.md` | Copilot (VS Code)       | Project instructions                                      |
| `.kiro/steering/*.md`             | Kiro                    | Project context (`product.md`, `tech.md`, `structure.md`) |
| `codex.md`                        | Codex CLI               | Project instructions                                      |

See [references/AGENT_CONFIG_FILES.md](references/AGENT_CONFIG_FILES.md) for formats and examples.

## Creating a New Skill — Step by Step

1. **Create skill folder** with `SKILL.md` in `.agents/skills/<name>/`
2. **Follow the template** above (frontmatter + metadata + usage + gotchas)
3. **Add to `AGENTS.md`** skills table
4. **Update agent config files** (`CLAUDE.md`, `GEMINI.md`, `.cursor/rules/`, `.windsurf/rules/`, `.github/copilot-instructions.md`)
5. **Validate:** run checklist above, ensure name matches folder
6. **Test** with at least one AI agent before committing

## Updating a Skill

When a package version changes:

1. Update `Version in project` and `Skill updated` date in SKILL.md
2. Review SKILL.md content for API changes
3. Sync all copies if distributed across multiple packages
4. Commit with message: `docs(skills): update <name> to vX.Y.Z`

## Distribution in Monorepos

Root `.agents/skills/` is the source of truth. Copies in sub-packages are synced from root.

See [references/MONOREPO_SYNC.md](references/MONOREPO_SYNC.md) for the full sync checklist.

## Related Skills

From [antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills):

- [`skill-creator`](https://github.com/sickn33/antigravity-awesome-skills/tree/main/skills/skill-creator) — automated CLI workflow for scaffolding skills with progress tracking
- [`skill-writer`](https://github.com/sickn33/antigravity-awesome-skills/tree/main/skills/skill-writer) — advanced synthesis pipeline with evaluation and iteration paths
- [`skill-developer`](https://github.com/sickn33/antigravity-awesome-skills/tree/main/skills/skill-developer) — Claude Code hooks architecture for skill auto-activation
- [`skill-improver`](https://github.com/sickn33/antigravity-awesome-skills/tree/main/skills/skill-improver) — iterative review loop with severity-based issue categorization
