# Contributing to ivannikov-pro/ai-agent-kit

Welcome! We are excited to have you contribute to the `ai-agent-kit`. This repository is a monorepo that houses packages, Next.js apps, CLI tools, as well as a robust registry for AI agent skills, workflows, and Model Context Protocol (MCP) configurations.

## Monorepo Architecture

This project uses `pnpm` workspaces and `turborepo` to manage multiple packages and tools:
- `packages/` — Core packages (e.g., CLI, UI, web app).
- `skills/` — AI agent skills (`SKILL.md` format).
- `workflows/` — AI agent workflows (`.md` format).
- `mcp_servers/` — Model Context Protocol servers/configurations (`MCP.md`).
- `scripts/` — Project-wide utility scripts (e.g., registry builder).

## Setup & Local Development

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Linting and Formatting**:
   We enforce a strict custom ESLint formatting across the monorepo (e.g., 3 blank lines after imports, 2 blank lines between logical blocks). Prettier is **not** used. 
   To format or check your code:
   ```bash
   pnpm turbo run lint
   pnpm turbo run lint --fix
   ```

## Contributing AI Agent Components

If you are contributing a new `skill`, `workflow`, or `mcp_server`:
1. Use the appropriate folder (`skills/`, `workflows/`, `mcp_servers/`).
2. Follow the required structure for the component (e.g., specific YAML frontmatter constraints).
3. Provide a clear `package`, `description`, `category`, and `risk` level.
4. Provide the minimum required documentation/instructions inside the markdown file.

Our registry is automatically validated upon committing (`pnpm run registry:validate`), which ensures your component adheres to correct syntax and schema. Do **not** modify `CATALOG.md` or `registry.json` manually; they are automatically generated during `git commit`.

## Versioning & Releases

This monorepo uses [Changesets](https://github.com/changesets/changesets) for automated semantic versioning and changelog generation. All packages in the repository share a single, synchronized version constraint.

If your Pull Request introduces a new feature, component, or bug fix, **you must include a changeset**:

1. Run the changeset CLI in your feature branch:
   ```bash
   pnpm run changeset
   ```
2. Select the packages affected by your changes.
3. Choose the appropriate version bump (`minor` for new components like skills/workflows/mcp_servers, `patch` for bug fixes).
4. Enter a clear description of your change for the changelog.
5. Commit the generated `.changeset/*.md` file along with your code.

### Manual Release Process (Maintainers Only)

To cut a new release, maintainers should follow these steps from the `master` branch:

1. Consume pending changesets. This strips the changeset files and updates package versions and changelogs automatically:
   ```bash
   pnpm run version-packages
   ```
2. Review the updated versions and `CHANGELOG.md` files, then commit the changes (e.g., `chore: version bump`).
3. Build and publish the updated packages to the registry:
   ```bash
   pnpm run release
   ```

## Submitting a Pull Request (PR)

1. **Create a branch** from `develop` (e.g., `feature/new-skill-name` or `feature/new-workflow-name` or `feature/new-mcp_server-name`).
2. Make your technical and documentation changes.
3. Commit your changes. 
   The `pre-commit` hook will run the registry validator and linters. Please address any errors it catches.
4. **Push** your branch and create the Pull Request on GitHub.
5. Fill out the **Pull Request Template** completely.

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
