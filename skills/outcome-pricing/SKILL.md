---
name: outcome-pricing
description: Value-based pricing — ценообразование на основе бизнес-результата, а не часов работы. Use when preparing commercial proposals, justifying project costs, or switching from hourly to value-based pricing.
category: business
risk: safe
source: local
tags: [pricing, value-based, proposal, business, roi]
tools: [claude, cursor, gemini, antigravity, copilot, windsurf, kiro]
date_added: "2026-03-28"
metadata:
  version: "1.0.0"
---

# Outcome Pricing Skill

> **Source:** Gleb Fedorenko video analysis + Blair Enns / Alex Hormozi frameworks
> **Skill updated:** 2026-03-28

## When to Use

- Preparing a commercial proposal (`/proposal`) and need to calculate project price
- Client asks "how much does it cost?" — need to reframe from hours to value
- Switching pricing model from hourly/fixed to outcome-based
- Justifying a higher price point to a client during negotiation
- Comparing ROI of proposed solution vs. client's current spending

## When NOT to Use

- Client is a very early-stage startup with no revenue data
- Purely technical projects with no measurable business outcome
- Internal tooling with no direct business metrics

## Overview

Ценообразование на основе ценности (value-based pricing) привязывает стоимость проекта к **бизнес-результату для клиента**, а не к количеству часов или фич.

> **Ключевой принцип:** Клиент платит не за код — клиент инвестирует в трансформацию своего бизнеса.

## Формула ценообразования

```
Цена проекта = Годовая ценность Outcome × Коэффициент (5–20%)
```

### Определение ценности Outcome

1. **Прямой доход:** Сколько дополнительного дохода принесёт решение?
2. **Сэкономленные расходы:** Сколько бизнес перестанет тратить?
3. **Стоимость времени:** Сколько часов × стоимость часа высвободится?
4. **Альтернативная стоимость:** Сколько бизнес теряет каждый месяц БЕЗ решения?

### Примеры расчёта

#### Пример 1: Telegram-бот для автоматизации поддержки

```
Текущие расходы на поддержку: 3 менеджера × $1,500/мес = $4,500/мес
Автоматизация покроет: 60% обращений
Экономия: $2,700/мес = $32,400/год
Цена проекта: $32,400 × 15% = $4,860 (≈ $5,000)
```

#### Пример 2: Лендинг для запуска продукта

```
Планируемый доход с запуска: $100,000
Прирост конверсии от качественного лендинга: +30%
Дополнительный доход: $30,000
Цена проекта: $30,000 × 10% = $3,000
```

#### Пример 3: Мобильное приложение для бизнеса

```
Оборот бизнеса: $25,000/день = $9M/год
Приложение увеличит retention на 15%: +$1.35M/год
Цена проекта: $1,350,000 × 3-5% = $40,000–$67,000
```

## Якоря для обоснования цены

При презентации цены клиенту используйте **якоря**:

| Якорь                  | Формулировка                                       |
| ---------------------- | -------------------------------------------------- |
| **Дневной доход**      | «Это стоимость X дней вашей работы»                |
| **Стоимость проблемы** | «Вы теряете $Y/мес — проект окупится за Z месяцев» |
| **Альтернатива**       | «Без решения за год вы потеряете $X»               |
| **ROI**                | «На каждый вложенный $1 вы получите $N»            |
| **Предыдущая попытка** | «Прошлая команда стоила $X, и вы заплатили дважды» |

## Модели оплаты

### 1. Фиксированная цена (основная)

- Полная стоимость за проект
- Обоснована через value calculation
- Разбита по фазам

### 2. Retainer + Success Fee

- Базовая цена за разработку
- Бонус при достижении согласованных метрик
- Хорошо работает для долгосрочных отношений

### 3. Revenue Share (для стартапов)

- Пониженная базовая цена
- Процент от дохода/прибыли на определённый период
- Высокий риск, но выравнивает интересы

## Когда НЕ использовать value-based pricing

- Клиент не может оценить ценность outcome (ранний стартап без данных)
- Проект чисто технический без привязки к бизнес-метрикам
- Клиент настаивает на почасовой оплате (красный флаг — подумать, стоит ли работать)

## Инструмент калибровки

Прежде чем назвать цену, задайте себе:

1. **Сколько это стоит для клиента?** (not you)
2. **Сколько клиент зарабатывает?** (калибровка масштаба)
3. **Какой ROI получит клиент?** (должен быть ≥ 3x)
4. **Может ли клиент получить это дешевле?** (конкурентный контекст)
5. **Какая цена сделает вас мотивированным сделать лучший результат?**

## Anti-паттерны

- ❌ Считать цену от часов × ставку
- ❌ Сравнивать свою цену с freelance-биржами
- ❌ Называть цену без предварительного Discovery
- ❌ Не объяснять обоснование цены клиенту
- ❌ Торговаться по цене вместо торговли по scope

## ⚠️ Gotchas

- **ROI must be ≥ 3x** — if your price gives the client less than 3x return, the proposal feels risky from their side
- **Never price before Discovery** — you need business context to calculate value; pricing without it is guessing
- **Revenue Share is high-risk** — only use with startups you deeply trust; always cap the duration
- **"How much do you charge per hour?"** — this is a trap question; redirect to "Let me understand the value first"
- **Anchor the price to their numbers, not yours** — show ROI in their revenue terms, not your cost structure

