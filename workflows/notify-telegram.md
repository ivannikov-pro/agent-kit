---
description: How and when to send Telegram notifications via the ai-notify-tg MCP server
---

# Telegram Notification Workflow

## When to Notify

Always send a Telegram notification in these situations:

### 1. Task Completion (every time)

After finishing any meaningful task (code changes, debugging, research), send a **digest** via `send_notification`:

```
📢 Notification:

project-name
📋 *Задача завершена*

*Что сделано:*
• краткий список изменений
• затронутые файлы

*Результат:* ✅ Успешно / ⚠️ С замечаниями

_Ответьте в Telegram если нужны правки_
```

Use `urgency: "normal"` for routine completions, `urgency: "high"` for errors or breaking changes.

### 2. Blocked on User Input

When you need user input and are calling `notify_user` with `BlockedOnUser: true`:

- **If you DON'T need a real-time choice** — just send a `send_notification` with the question/info so the user can see it from their phone.
- **If you DO need a real-time choice** — use `ask_question`, `ask_yes_no`, or `ask_choice` so the user can respond interactively from Telegram.

### 3. Errors and Failures

If a build, test, or deploy fails — send a `urgency: "high"` notification immediately with the error summary.

- **Start every message with**:
  `📢 Notification:`
  `project-name` (use the repo folder name or `name` from `package.json`. Example: `onchain-giveaway-platform`)
  `📋 *Задача завершена*`
  This lets the user instantly see the project and status.
- Use **Markdown** (`parseMode: "Markdown"`)
- Write in **Russian** (user's language)
- Keep messages **concise** — no walls of text
- Use emoji for visual scanning
- Include file names in backticks

## Tools Reference

| Situation                                 | Tool                |
| ----------------------------------------- | ------------------- |
| Status update / digest / no choice needed | `send_notification` |
| Need text answer (real-time)              | `ask_question`      |
| Yes/No decision (real-time)               | `ask_yes_no`        |
| Multiple choice 2-6 (real-time)           | `ask_choice`        |
| Send a file                               | `send_file`         |

## Important

- **Always duplicate** `notify_user` calls with a Telegram notification — the user may not be in the IDE.
- Do NOT wait or try to detect IDE activity — just always send both.
- When sending digests, group changes by component, don't list every line changed.
- Prefer `send_notification` over interactive tools when you don't need an immediate answer.
