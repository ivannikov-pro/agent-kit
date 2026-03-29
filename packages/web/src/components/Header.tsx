"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconLogo } from "./icons/IconLogo";



function NavLink({
  href,
  children,
  external,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className="text-[var(--color-text-dim)] hover:text-[var(--color-text)] transition-colors text-sm font-medium"
      onClick={onClick}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </Link>
  );
}


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] backdrop-blur-xl bg-[var(--color-background)]/85">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Link
            href="https://ivannikov.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-lg font-bold tracking-tight text-[var(--color-text-dim)] hover:text-[var(--color-text)] transition-colors"
          >
            <IconLogo className="w-5 h-5" />
            IVANNIKOV.PRO
          </Link>
          <span className="hidden sm:block text-[var(--color-text-muted)] font-light text-xl">/</span>
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-lg font-bold tracking-tight text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
              AI-AGENT-KIT
            </span>
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[var(--color-accent-dim)] text-[var(--color-accent)] border border-[var(--color-accent)]/20 uppercase tracking-wider"
            >
              OSS
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/#skills">Skills</NavLink>
          <NavLink href="/#workflows">Workflows</NavLink>
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
            <span className="flex items-center gap-1.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M0 0v16h16V0H0zm13.2 13.2H11V5.6h-3v7.6H2.8V2.8h10.4v10.4z" />
              </svg>
              npm
            </span>
          </NavLink>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 -mr-2 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[64px] left-0 w-full h-[calc(100vh-64px)] bg-[var(--color-background)] border-t border-[var(--color-border)] p-6 z-40">
          <nav className="flex flex-col gap-6">
            <NavLink href="/#skills" onClick={() => setIsMobileMenuOpen(false)}>
              Skills
            </NavLink>
            <NavLink href="/#workflows" onClick={() => setIsMobileMenuOpen(false)}>
              Workflows
            </NavLink>
            <NavLink href="/#mcp" onClick={() => setIsMobileMenuOpen(false)}>
              MCP
            </NavLink>
            <div className="h-px bg-[var(--color-border)] w-full my-2"></div>
            <NavLink href="https://ivannikov.pro" external>
              <span className="flex items-center gap-2">
                <IconLogo className="w-5 h-5" />
                IVANNIKOV.PRO
              </span>
            </NavLink>
            <NavLink href="https://github.com/ivannikov-pro/ai-agent-kit" external>
              <span className="flex items-center gap-2">
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
            <NavLink href="https://www.npmjs.com/package/@ivannikov-pro/ai-agent-kit" external>
              <span className="flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M0 0v16h16V0H0zm13.2 13.2H11V5.6h-3v7.6H2.8V2.8h10.4v10.4z" />
                </svg>
                npm
              </span>
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
