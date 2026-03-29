# AI Agent Catalog

Generated at: 2026-03-29T02:13:05.767Z

## SKILLS (16)

| Name | Category | Description | Source |
| --- | --- | --- | --- |
| `business-analysis` | business | Фреймворки бизнес-анализа перед проектом — JTBD, Lean Canvas, Value Proposition Canvas. Use when conducting Discovery sessions, formulating outcome-oriented offers, or analyzing client business models. | `local:skills/business-analysis` |
| `client-communication` | business | Outcome-ориентированная коммуникация с клиентом — Discovery-звонки, статусы, презентация результатов. Use when preparing for client meetings, writing status updates, or presenting project results. | `local:skills/client-communication` |
| `context7-mcp` | development | Retrieves authoritative, up-to-date technical documentation, API references, configuration details, and code examples for any developer technology. Use this skill whenever answering technical questions or writing code that interacts with external technologies. This includes libraries, frameworks, programming languages, SDKs, APIs, CLI tools, cloud services, infrastructure tools, and developer platforms.
Common scenarios: - looking up API endpoints, classes, functions, or method parameters - checking configuration options or CLI commands - answering "how do I" technical questions - generating code that uses a specific library or service - debugging issues related to frameworks, SDKs, or APIs - retrieving setup instructions, examples, or migration guides - verifying version-specific behavior or breaking changes
Prefer this skill whenever documentation accuracy matters or when model knowledge may be outdated. | `local:skills/context7-mcp` |
| `custom-formatting` | development | How to use ESLint v9 Flat Config with @stylistic/eslint-plugin to enforce custom padding (like 3 blank lines after imports) instead of Prettier. Use when configuring or fixing formatting rules in this workspace. | `local:skills/custom-formatting` |
| `express-v5` | development | How to use Express v5 — async errors, removed APIs, path syntax, middleware. Use when building HTTP servers with Express. | `local:skills/express-v5` |
| `figma-api` | design | How to extract design data from Figma REST API — tokens, SVG icons, images, layout specs. Use when setting up design-to-code pipeline or updating design assets from Figma. | `local:skills/figma-api` |
| `find-docs` | development | Retrieves authoritative, up-to-date technical documentation, API references, configuration details, and code examples for any developer technology. Use this skill whenever answering technical questions or writing code that interacts with external technologies. This includes libraries, frameworks, programming languages, SDKs, APIs, CLI tools, cloud services, infrastructure tools, and developer platforms.
Common scenarios: - looking up API endpoints, classes, functions, or method parameters - checking configuration options or CLI commands - answering "how do I" technical questions - generating code that uses a specific library or service - debugging issues related to frameworks, SDKs, or APIs - retrieving setup instructions, examples, or migration guides - verifying version-specific behavior or breaking changes
Prefer this skill whenever documentation accuracy matters or when model knowledge may be outdated. | `local:skills/find-docs` |
| `monorepo-conventions` | development | Monorepo structure, tooling conventions, and development practices for the ivannikov-pro-platform. Use when adding packages, configuring builds, or understanding project architecture. | `local:skills/monorepo-conventions` |
| `node-app-config` | development | How to add and use @ivannikov-pro/app-config — convict-based config with dotenv, schema validation. Use when adding configuration management to a package. | `local:skills/node-app-config` |
| `node-app-logger` | development | How to add and use @ivannikov-pro/app-logger — log4js-based logging with convict integration. Use when adding logging to a package. | `local:skills/node-app-logger` |
| `outcome-pricing` | business | Value-based pricing — ценообразование на основе бизнес-результата, а не часов работы. Use when preparing commercial proposals, justifying project costs, or switching from hourly to value-based pricing. | `local:skills/outcome-pricing` |
| `pnpm-workspaces` | development | How to use pnpm workspaces — workspace protocol, filter, publishing. Use when managing workspace dependencies or packages. | `local:skills/pnpm-workspaces` |
| `skill-base` | meta | How to create, maintain, and distribute AI agent skills. Use when creating new skills, updating existing ones, or setting up skill infrastructure in a project. | `local:skills/skill-base` |
| `solidity-contracts` | development | Conventions and architecture for Solidity smart contracts in this project (packages/contracts). Covers contract structure, standards, tooling, and deployment patterns. Use when writing, reviewing, or deploying Solidity code. | `local:skills/solidity-contracts` |
| `tsup` | development | How to use tsup — zero-config TypeScript bundler powered by esbuild. Use when bundling TypeScript packages or configuring build output. | `local:skills/tsup` |
| `turborepo` | development | How to use Turborepo — monorepo build system with task caching and dependency graph. Use when configuring or running monorepo tasks. | `local:skills/turborepo` |

## WORKFLOWS (19)

| Name | Category | Description | Source |
| --- | --- | --- | --- |
| `architecture` | architecture | How to keep the architecture document (docs/ARCHITECTURE.md) up to date after making changes | `local:workflows/architecture` |
| `as-blockchain` | general | Act as Blockchain / Smart Contract Engineer — Solidity, Foundry, gas optimization, indexer-awareness | `local:workflows/as-blockchain` |
| `as-cto` | code-quality | Act as CTO / Tech Lead — architecture, code review, risk assessment, standards | `local:workflows/as-cto` |
| `as-fullstack` | front-end | Act as Full-Stack Developer — end-to-end features across contracts, backend, frontend, and infrastructure | `local:workflows/as-fullstack` |
| `as-qa` | test-automation | Act as QA / Test Engineer — testing strategy, test coverage, regression detection | `local:workflows/as-qa` |
| `as-security` | security | Act as Security Engineer — audit contracts, API security, vulnerabilities, OWASP | `local:workflows/as-security` |
| `case-study` | general | Создание outcome-ориентированного кейса для портфолио | `local:workflows/case-study` |
| `coding-style` | code-quality | Coding style preferences for all code in this project | `local:workflows/coding-style` |
| `contracts-deploy` | general | How to deploy smart contracts to local/testnet/mainnet | `local:workflows/contracts-deploy` |
| `contracts-test` | test-automation | How to build and test smart contracts with Foundry | `local:workflows/contracts-test` |
| `dev` | general | How to start the full development environment | `local:workflows/dev` |
| `discovery` | business | Discovery процесс — глубокое погружение в бизнес клиента перед началом проекта | `local:workflows/discovery` |
| `find-docs` | general | How to look up library documentation using Context7 MCP | `local:workflows/find-docs` |
| `gas-report` | general | How to generate a gas usage report for smart contracts | `local:workflows/gas-report` |
| `lint` | code-quality | How to lint all packages in the monorepo | `local:workflows/lint` |
| `notify-telegram` | data-ai | How and when to send Telegram notifications via the ai-notify-tg MCP server | `local:workflows/notify-telegram` |
| `project-brief` | general | Outcome-first бриф проекта — начинается с бизнес-целей, а не с ТЗ | `local:workflows/project-brief` |
| `proposal` | business | Генерация outcome-ориентированного коммерческого предложения для клиента | `local:workflows/proposal` |
| `svg-to-icon` | development | How to convert an inline SVG or raw SVG file from Figma into a compliant React component in @ivannikov-pro/ui/src/icons | `local:workflows/svg-to-icon` |
