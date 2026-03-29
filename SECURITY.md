# Security Policy

## Supported Versions

Currently only the latest version of `@ivannikov-pro/ai-agent-kit` packages and configurations are supported with security updates. We do not backport security fixes to older tags unless specifically noted.

## Reporting a Vulnerability

We take the security of this AI agent monorepo—especially regarding integrations with external APIs and prompt injection risks—very seriously. 

If you discover a security vulnerability or suspect an agent/prompt configuration could lead to unauthorized system access (`offensive` risk leak), please do **NOT** open a public issue. 

Instead, please send an email to **[hi@ivannikov.pro]** with the following details:
- A description of the vulnerability.
- Steps to reproduce the issue.
- Potential impact (e.g., system exposure, prompt leak, token exfiltration).

We will try to acknowledge your email within 48 hours, and provide an initial assessment or plan for resolution. 

### What constitutes a core security vulnerability in this project?
- Extraction of secrets via system prompts or MCP configurations.
- Execution of arbitrary code outside intended sandboxed environments.
- Maliciously crafted workflow files (`workflows/`) that bypass safety checks.
- Supply chain attacks on the `packages/` workspace dependencies.

Please note that standard functional bugs should be reported via our public GitHub Issues securely.
