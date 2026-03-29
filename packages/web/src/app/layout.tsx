import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/Header";
import { CopyableCommand } from "@/components/CopyableCommand";
import { IconLogo } from "@/components/icons/IconLogo";

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
  other: {
    "msapplication-config": "/browserconfig.xml",
  },
};



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
        <Header />

        {/* ─── Content ─── */}
        <main className="flex-1 relative z-10">{children}</main>

        {/* ─── Footer ─── */}
        <footer className="relative z-10 border-t border-[var(--color-border)] mt-24">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <a
                  href="https://ivannikov.pro"
                  className="flex items-center gap-2 text-[var(--color-text-dim)] hover:text-[var(--color-accent)] transition-colors text-sm font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconLogo className="w-5 h-5" />
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
                <CopyableCommand
                  className="text-xs bg-[var(--color-surface)] border border-[var(--color-border)] px-3 py-1 rounded-md text-[var(--color-accent)]"
                  command="npx @ivannikov-pro/ai-agent-kit@latest"
                  prefix=""
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[var(--color-border)] flex flex-col gap-4 items-center justify-between md:flex-row">
              <div className="text-[var(--color-text-muted)] text-xs">
                © {new Date().getFullYear()} IVANNIKOV.PRO
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-[var(--color-text-muted)] border border-[var(--color-border)] rounded-full px-4 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                OSS (Open Source Software) · MIT Licensed
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
