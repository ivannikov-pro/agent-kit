# @ivannikov-pro/ai-agent-kit-web

Web catalog for browsing AI agent skills, workflows, and MCP configs.

**Live:** [ivannikov-pro.github.io/ai-agent-kit](https://ivannikov-pro.github.io/ai-agent-kit)

## Features

- 🎨 Dark mode UI with skill cards, tags, and search
- 📖 Full SKILL.md rendering on detail pages (react-markdown + GFM)
- ⚡ Static site generation — reads `registry.json` and `skills/` at build time
- 🚀 Auto-deploy to GitHub Pages on push to `master`

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS 4
- react-markdown + remark-gfm
- gray-matter (SKILL.md frontmatter)

## Development

```bash
# From monorepo root
pnpm --filter @ivannikov-pro/ai-agent-kit-web dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm --filter @ivannikov-pro/ai-agent-kit-web build
```

Static output: `packages/web/out/`

## License

[MIT](./LICENSE)
