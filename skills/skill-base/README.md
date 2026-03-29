# 🛠️ skill-base

An [Agent Skill](https://agentskills.io) that teaches AI coding agents how to create, maintain, and distribute skills.

Compatible with **Claude Code**, **Cursor**, **Gemini CLI**, **Antigravity**, **GitHub Copilot**, **Windsurf**, **Kiro**, **Codex CLI**, **OpenCode**, **AdaL**, and any agent that supports the [agentskills.io](https://agentskills.io) standard.

## What's Inside

The `SKILL.md` file contains:

- 📋 **SKILL.md template** — ready-to-use skeleton with all required sections
- 📝 **Frontmatter spec** — `name`, `description`, `risk`, `category`, `tags`, `tools` and more
- ✅ **Required sections** — what every skill must have and why
- 🎯 **7 best practices** — focus on unknowns, code over prose, good descriptions, metadata, gotchas, 500-line rule, universal install commands
- 📂 **Agent config files** — how to set up AGENTS.md, CLAUDE.md, GEMINI.md, `.cursor/rules/`, `.windsurf/rules/`, `copilot-instructions.md`
- ✔️ **Validation checklist** — pre-publish quality checks
- 🔄 **Monorepo distribution** — syncing skills across packages
- 📝 **Step-by-step guides** — creating new skills and updating existing ones

## Installation

### Via Gemini CLI (recommended)

Requires [Gemini CLI](https://github.com/google-gemini/gemini-cli) (`npm install -g @google/gemini-cli`):

```bash
gemini skills install https://github.com/ivannikov-pro/skill-base.git
```

> **Note:** Gemini CLI requires an API key. Get one at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey), then:
> ```bash
> echo 'export GEMINI_API_KEY="your-key-here"' >> ~/.zshrc
> source ~/.zshrc
> ```

### Via git clone (Antigravity)

```bash
git clone https://github.com/ivannikov-pro/skill-base.git ~/.gemini/antigravity/skills/skill-base
```

### Via git clone (other agents)

```bash
# Global — use agent-specific path (see table below)
# Claude Code:  ~/.claude/skills/skill-base
# Cursor:       ~/.cursor/skills/skill-base
# Windsurf:     ~/.codeium/windsurf/skills/skill-base
# Gemini CLI:   ~/.gemini/skills/skill-base

# Project-specific (works with most agents)
git clone https://github.com/ivannikov-pro/skill-base.git .agents/skills/skill-base
```

### Where agents look for skills

| Agent             | Global (user-level)             | Project (workspace)                    | Source                                                                            |
| ----------------- | ------------------------------- | -------------------------------------- | --------------------------------------------------------------------------------- |
| Claude Code       | `~/.claude/skills/`             | `.claude/skills/`                      | [docs](https://docs.anthropic.com/en/docs/claude-code/skills)                     |
| Gemini CLI        | `~/.gemini/skills/`             | `.gemini/skills/` or `.agents/skills/` | [docs](https://geminicli.com/docs/skills/using-skills)                            |
| Antigravity       | `~/.gemini/antigravity/skills/` | `.agent/skills/` or `.agents/skills/`  | [docs](https://antigravity.google)                                                |
| Cursor            | `~/.cursor/skills/`             | `.cursor/skills/`                      | [docs](https://docs.cursor.com/agent/skills)                                      |
| Copilot (VS Code) | —                               | `.github/skills/` or `.agents/skills/` | [docs](https://code.visualstudio.com/docs/copilot/copilot-extensibility-overview) |
| Windsurf          | `~/.codeium/windsurf/skills/`   | `.windsurf/skills/`                    | [docs](https://docs.windsurf.com/windsurf/skills)                                 |
| Kiro              | `~/.kiro/skills/`               | `.kiro/skills/`                        | [docs](https://kiro.dev/docs/skills/)                                             |
| Codex CLI         | `~/.codex/skills/`              | `.codex/skills/`                       | [docs](https://openai.com/codex)                                                  |
| OpenCode          | `~/.agents/skills/`             | `.agents/skills/`                      | [docs](https://opencode.ai/docs/skills)                                           |
| AdaL CLI          | `~/.adal/skills/`               | `.adal/skills/`                        | [docs](https://sylph.ai)                                                          |

> **Tip:** Install globally to use across all projects. Each agent has its own global directory — see table above.

## For AI Agents

If a user asks you to install this skill:

```bash
# Via Gemini CLI
gemini skills install https://github.com/ivannikov-pro/skill-base.git

# Via git clone (Antigravity)
git clone https://github.com/ivannikov-pro/skill-base.git ~/.gemini/antigravity/skills/skill-base

# Via git clone (other agents)
git clone https://github.com/ivannikov-pro/skill-base.git ~/.agents/skills/skill-base
```

Once installed, read `SKILL.md` before creating or updating any agent skills.

## Do I need to install this in every project?

**No.** This is a meta-skill about the _process_ of creating skills. Install it globally once, and it's available everywhere.

Install in a project only if you want other contributors to benefit from it too.

## Contributing

PRs welcome! If you have best practices, patterns, or gotchas that would help agents create better skills, please contribute.

## 💖 Support

This project is maintained by [@ivannikov-pro](https://github.com/ivannikov-pro).
If it saved you time or brought value, consider:

- 🪙 [Send crypto or PayPal](https://github.com/ivannikov-pro/send-thanks)
- ⭐ Star this repo
- 📱 [Follow](https://github.com/ivannikov-pro) for more projects

## License

[MIT](LICENSE)
