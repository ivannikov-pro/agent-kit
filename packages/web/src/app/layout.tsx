import type { Metadata } from "next";

import "./globals.css";



export const metadata: Metadata = {
  title: {
    default: "ai-agent-kit — AI Agent Toolkit by IVANNIKOV.PRO",
    template: "%s | ai-agent-kit",
  },
  description:
    "Browse and install curated AI agent skills, workflows, and MCP configs. Your open-source toolkit for AI-powered development.",
  keywords: [
    "ai-agent",
    "agent-skills",
    "mcp",
    "ai-coding-assistant",
    "developer-tools",
    "workflows",
    "ivannikov-pro",
  ],
  authors: [{ name: "Aleksandr Ivannikov", url: "https://ivannikov.pro" }],
  creator: "IVANNIKOV.PRO",
  metadataBase: new URL("https://ivannikov.pro/ai-agent-kit"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ivannikov.pro/ai-agent-kit",
    siteName: "ai-agent-kit",
    title: "ai-agent-kit — AI Agent Toolkit",
    description:
      "Browse and install curated AI agent skills, workflows, and MCP configs for any AI coding assistant.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ai-agent-kit — AI Agent Toolkit",
    description:
      "Open-source toolkit of curated skills, workflows, and MCP configs for AI coding assistants.",
  },
  robots: {
    index: true,
    follow: true,
  },
};


function NavLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className="text-[var(--color-text-dim)] hover:text-[var(--color-text)] transition-colors text-sm font-medium"
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="min-h-screen flex flex-col relative">
        {/* ─── Header ─── */}
        <header className="sticky top-0 z-50 border-b border-[var(--color-border)] backdrop-blur-xl bg-[var(--color-background)]/85">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5 group">
              <span className="text-xl font-bold tracking-tight text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                AI-AGENT-KIT
              </span>
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[var(--color-accent-dim)] text-[var(--color-accent)] border border-[var(--color-accent)]/20 uppercase tracking-wider">
                OSS
              </span>
            </a>

            <nav className="flex items-center gap-6">
              <NavLink href="/#skills">Skills</NavLink>
              <NavLink href="/#mcp">MCP</NavLink>
              <NavLink
                href="https://github.com/ivannikov-pro/ai-agent-kit"
                external
              >
                <span className="flex items-center gap-1.5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  GitHub
                </span>
              </NavLink>
              <NavLink
                href="https://www.npmjs.com/package/@ivannikov-pro/ai-agent-kit"
                external
              >
                npm
              </NavLink>
            </nav>
          </div>
        </header>

        {/* ─── Content ─── */}
        <main className="flex-1 relative z-10">{children}</main>

        {/* ─── Footer ─── */}
        <footer className="relative z-10 border-t border-[var(--color-border)] mt-24">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <a
                  href="https://ivannikov.pro"
                  className="text-[var(--color-text-dim)] hover:text-[var(--color-accent)] transition-colors text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IVANNIKOV.PRO
                </a>
                <a
                  href="https://github.com/ivannikov-pro"
                  className="text-[var(--color-text-dim)] hover:text-[var(--color-text)] transition-colors text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>

              <div className="flex items-center gap-3 text-[var(--color-text-muted)] text-sm">
                <span>Install →</span>
                <code className="text-xs bg-[var(--color-surface)] border border-[var(--color-border)] px-3 py-1 rounded-md text-[var(--color-accent)] font-[var(--font-mono)]">
                  npx @ivannikov-pro/ai-agent-kit
                </code>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[var(--color-border)] text-center text-[var(--color-text-muted)] text-xs">
              © {new Date().getFullYear()} IVANNIKOV.PRO · MIT License
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
