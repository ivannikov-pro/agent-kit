import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "agent-kit — AI Agent Toolkit",
  description:
    "Browse and install AI agent skills, workflows, and MCP configs. Your toolkit for AI-powered development.",
  keywords: [
    "ai-agent",
    "agent-skills",
    "agentskills",
    "mcp",
    "cli",
    "workflows",
  ],
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <nav className="border-b border-[var(--color-border)] backdrop-blur-md sticky top-0 z-50 bg-[var(--color-background)]/80">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 no-underline">
              <span className="text-2xl">🛠️</span>
              <span className="text-lg font-bold text-[var(--color-text)]">
                agent-kit
              </span>
            </a>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/ivannikov-pro/ai-agent-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-dim)] hover:text-[var(--color-text)] transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/@ivannikov-pro/ai-agent-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-dim)] hover:text-[var(--color-text)] transition-colors text-sm"
              >
                npm
              </a>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="border-t border-[var(--color-border)] mt-20">
          <div className="max-w-6xl mx-auto px-6 py-8 text-center text-[var(--color-text-dim)] text-sm">
            Built by{" "}
            <a
              href="https://github.com/ivannikov-pro"
              className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
            >
              ivannikov-pro
            </a>
            {" · "}
            <code className="text-xs bg-[var(--color-surface)] px-2 py-0.5 rounded">
              npx @ivannikov-pro/ai-agent-kit
            </code>
          </div>
        </footer>
      </body>
    </html>
  );
}
