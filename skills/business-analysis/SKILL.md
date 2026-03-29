---
name: business-analysis
description: Фреймворки бизнес-анализа перед проектом — JTBD, Lean Canvas, Value Proposition Canvas. Use when conducting Discovery sessions, formulating outcome-oriented offers, or analyzing client business models.
category: business
risk: safe
source: local
tags: [jtbd, lean-canvas, value-proposition, discovery, business]
tools: [claude, cursor, gemini, antigravity, copilot, windsurf, kiro]
date_added: "2026-03-28"
metadata:
  version: "1.0.0"
---

# Business Analysis Skill

> **Source:** JTBD (Anthony Ulwick), Lean Canvas (Ash Maurya), Value Proposition Canvas (Osterwalder)
> **Skill updated:** 2026-03-28

## When to Use

- Starting a Discovery session with a new client
- Need to understand client's business model before proposing a solution
- Formulating an outcome-oriented offer instead of feature-based
- Choosing which business framework to apply for analysis
- Defining success metrics before development begins

## When NOT to Use

- Client has already provided detailed business analysis documentation
- Project is purely internal/technical tooling with no business stakeholders
- Quick bug fix or maintenance task with no scope for business reframing

## Overview

Набор фреймворков для быстрого анализа бизнеса клиента перед началом проекта. Цель — перейти от «что клиент просит» к «что клиенту нужно» и сформулировать outcome.

## Фреймворк 1: Jobs-to-be-Done (JTBD)

### Суть

Клиенты «нанимают» продукт для выполнения определённой «работы» в их жизни/бизнесе.

### Формула Job Story

```
Когда [ситуация],
я хочу [мотивация],
чтобы [ожидаемый результат].
```

### Пример для разработки сайта

```
Когда потенциальный клиент ищет услуги в моей нише,
я хочу, чтобы он нашёл мой бизнес и понял ценность предложения,
чтобы он оставил заявку и стал клиентом.
```

→ Это НЕ «мне нужен сайт с 5 страницами» — это job, который сайт должен выполнить.

### Как применять

1. Определите 3–5 главных Jobs клиента
2. Для каждой Job определите: текущее решение → проблемы с ним → идеальный outcome
3. Приоритизируйте Jobs по влиянию на бизнес

## Фреймворк 2: Lean Canvas

### Заполните для бизнеса клиента

```
┌─────────────────┬──────────────┬─────────────────┐
│   PROBLEM       │  SOLUTION    │  UNIQUE VALUE   │
│                 │              │  PROPOSITION    │
│ Top 3 проблемы  │ Top 3 фичи   │ Одно предложение│
│ бизнеса         │ решающие их  │ почему клиенты  │
│                 │              │ выбирают этот   │
│                 │              │ бизнес          │
├─────────────────┼──────────────┼─────────────────┤
│   KEY METRICS   │              │  CHANNELS       │
│                 │              │                 │
│ 2-3 метрики     │              │ Как клиенты     │
│ которые         │              │ находят этот    │
│ определяют      │              │ бизнес          │
│ успех           │              │                 │
├─────────────────┼──────────────┼─────────────────┤
│   COST STRUCTURE│              │  REVENUE STREAMS│
│                 │              │                 │
│ Основные        │              │ Как зарабатывает│
│ расходы         │              │                 │
└─────────────────┴──────────────┴─────────────────┘
```

### Зачем это нужно разработчику?

- Понять, где ваш проект вписывается в бизнес-модель
- Определить, какие метрики проект должен двигать
- Обосновать ценообразование через Revenue Streams

## Фреймворк 3: Value Proposition Canvas

### Для клиента (Customer Profile)

```markdown
### Customer Jobs (Задачи клиента)
1. Функциональные: ...
2. Социальные: ...
3. Эмоциональные: ...

### Pains (Боли)
1. Что расстраивает / раздражает?
2. Какие риски боится?
3. Что мешает выполнить задачи?

### Gains (Выгоды)
1. Что обрадует?
2. Какие результаты ожидает?
3. Что упростит жизнь?
```

### Для вашего решения (Value Map)

```markdown
### Products & Services
- [Что именно вы делаете]

### Pain Relievers (Как снимаете боли)
- Pain 1 → [Ваше решение]
- Pain 2 → [Ваше решение]

### Gain Creators (Как создаёте выгоды)
- Gain 1 → [Ваше решение]
- Gain 2 → [Ваше решение]
```

## Фреймворк 4: Быстрый анализ (5 вопросов)

Когда нет времени на детальный анализ — минимальный набор:

| # | Вопрос                               | Зачем                       |
| --- | ------------------------------------ | --------------------------- |
| 1 | Как бизнес зарабатывает деньги?      | Понять бизнес-модель        |
| 2 | Что мешает зарабатывать больше?      | Найти проблему              |
| 3 | Сколько стоит эта проблема?          | Калибровать ценообразование |
| 4 | Что изменится, если проблема решена? | Определить outcome          |
| 5 | Как мы измерим успех?                | Определить метрики          |

## Метрики для разных типов проектов

### Сайт / Лендинг

- Конверсия посетитель → лид
- Стоимость привлечения клиента (CAC)
- Среднее время на сайте
- Количество лидов / месяц

### Telegram-бот / Автоматизация

- Количество обработанных обращений без человека
- Время реакции на запрос
- Процент автоматизированных задач
- Экономия ФОТ (фонд оплаты труда)

### Мобильное приложение

- DAU / MAU (активные пользователи)
- Retention (удержание)
- Конверсия в целевое действие
- NPS (индекс лояльности)

### E-commerce

- Средний чек
- Конверсия корзина → оплата
- Процент повторных покупок
- LTV клиента

### Web3 / DeFi

- TVL (Total Value Locked)
- Количество уникальных кошельков
- Объём транзакций
- Gas efficiency vs конкуренты

## Как использовать результаты анализа

1. **Discovery Summary** → заполнить по шаблону из `/discovery`
2. **Project Brief** → использовать outcome и метрики из `/project-brief`
3. **Proposal** → обосновать цену через value analysis из `/proposal`
4. **Case Study** → после проекта сравнить метрики до/после из `/case-study`

## Anti-паттерны

- ❌ Пропускать анализ и сразу начинать кодить
- ❌ Спрашивать клиента «какие фичи вам нужны» вместо «какая проблема в бизнесе»
- ❌ Не определять метрики успеха до начала работы
- ❌ Использовать один фреймворк для всех ситуаций (выбирайте подходящий)
- ❌ Делать анализ ради анализа — всегда привязывайте к actionable outcome

## ⚠️ Gotchas

- **JTBD ≠ user stories** — JTBD focuses on the "why" (motivation), user stories on the "what" (feature); don't mix them
- **Lean Canvas is for YOUR understanding** — never show it to the client as-is; translate findings into outcome language
- **"What's your budget?" kills Discovery** — asking about budget before understanding value shifts the conversation to output pricing
- **Frameworks are tools, not deliverables** — the client pays for the outcome recommendation, not for a filled-in canvas
- **5-question rapid analysis is the minimum** — even for the smallest project, always ask the 5 calibration questions from Framework 4

