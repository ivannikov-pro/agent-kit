# Distribution in Monorepos

## Root skills = source of truth

All skills live in root `.agents/skills/`. Copies in sub-packages are synced from root.

## Sync checklist

When creating or updating a skill:

1. [ ] Edit root `.agents/skills/<name>/SKILL.md`
2. [ ] Copy to each sub-package that directly uses it
3. [ ] Update `AGENTS.md` skills table (root + sub-packages)
4. [ ] Update `CLAUDE.md` skill references
5. [ ] Update `GEMINI.md` skill references
6. [ ] Update `.cursor/rules/` skill rules
7. [ ] Update `.windsurf/rules/` (or `.windsurfrules`) skill references
8. [ ] Update `.gemini/settings.json` system instruction
9. [ ] Update `.github/copilot-instructions.md` skill references
10. [ ] Update `.kiro/steering/` files if applicable
11. [ ] Update `codex.md` skill references
