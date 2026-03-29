# Agent Documentation Files

For multi-package projects (monorepos), keep agent configuration files consistent:

| File                              | Who reads it            | Notes                                                    |
| --------------------------------- | ----------------------- | -------------------------------------------------------- |
| `AGENTS.md`                       | All agents              | Universal project context, skills table                  |
| `CLAUDE.md`                       | Claude Code             | Project instructions, key rules                          |
| `GEMINI.md`                       | Gemini CLI, Antigravity | Project context (like CLAUDE.md for Gemini)              |
| `.gemini/settings.json`           | Gemini CLI              | System instruction with skill list                       |
| `.cursor/rules/*.mdc`             | Cursor                  | Project rules (replaced `.cursorrules`)                  |
| `.windsurfrules`                  | Windsurf                | Legacy rules file                                        |
| `.windsurf/rules/*.md`            | Windsurf                | New rules format (Wave 8+)                               |
| `.github/copilot-instructions.md` | Copilot (VS Code)       | Project instructions                                     |
| `.kiro/steering/*.md`             | Kiro                    | Steering files (`product.md`, `tech.md`, `structure.md`) |
| `codex.md`                        | Codex CLI               | Project instructions                                     |

> **Note:** Cursor deprecated `.cursorrules` in favor of `.cursor/rules/*.mdc` files with frontmatter (`description`, `globs`, `alwaysApply`).
> Windsurf deprecated root `.windsurfrules` in favor of `.windsurf/rules/*.md` (since Wave 8).

## AGENTS.md skills table format

```markdown
## Available Skills

Skills are in `.agents/skills/`. Read `SKILL.md` before using:

| Skill        | Description          |
| ------------ | -------------------- |
| `skill-name` | One-line description |
```

## CLAUDE.md / GEMINI.md / codex.md format

```markdown
Read `AGENTS.md` for full project context and architecture.
Read `.agents/skills/<skill>/SKILL.md` before <when to use>.

Key rules:
- <project-specific coding rules>
```

## .gemini/settings.json format

```json
{"systemInstruction": "Read AGENTS.md for context. Skills: <list>. <key rules>."}
```

## .cursor/rules/*.mdc format

```markdown
---
description: When to apply this rule
globs: ["**/*.ts"]
alwaysApply: false
---
Rule instructions here...
```

## .github/copilot-instructions.md format

```markdown
Read `AGENTS.md` for full project context.
Read `.agents/skills/<skill>/SKILL.md` before <when to use>.

Key rules:
- <project-specific coding rules>
```
