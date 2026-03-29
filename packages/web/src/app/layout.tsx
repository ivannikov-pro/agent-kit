import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { CopyableCommand } from "@/components/CopyableCommand";
import { IconLogo } from "@/components/icons/IconLogo";
import "./globals.css";



export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AI Agent Kit",
  description: "Professional AI agents and tools ecosystem",
  metadataBase: new URL("https://ivannikov.pro"),
  alternates: {
    canonical: "/ai-agent-kit/",
  },
  openGraph: {
    title: "AI Agent Kit",
    description: "Professional AI agents and tools ecosystem",
    url: "https://ivannikov.pro/ai-agent-kit/",
    siteName: "AI Agent Kit",
    type: "website",
    images: [
      {
        url: "summary_large_image.png",
        width: 1200,
        height: 630,
        alt: "AI Agent Kit - Professional AI agents and tools ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ivannikov_pro",
    title: "AI Agent Kit",
    description: "Professional AI agents and tools ecosystem",
    images: [
      {
        url: "summary_large_image.png",
        width: 1200,
        height: 630,
        alt: "AI Agent Kit - Professional AI agents and tools ecosystem",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "favicon.ico", type: "image/x-icon" },
      { url: "favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "android-icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "android-icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "apple-icon-57x57.png", sizes: "57x57" },
      { url: "apple-icon-60x60.png", sizes: "60x60" },
      { url: "apple-icon-72x72.png", sizes: "72x72" },
      { url: "apple-icon-76x76.png", sizes: "76x76" },
      { url: "apple-icon-114x114.png", sizes: "114x114" },
      { url: "apple-icon-120x120.png", sizes: "120x120" },
      { url: "apple-icon-144x144.png", sizes: "144x144" },
      { url: "apple-icon-152x152.png", sizes: "152x152" },
      { url: "apple-icon-180x180.png", sizes: "180x180" },
    ],
  },
  authors: [{ name: "Aleksandr Ivannikov" }],
  other: {
    "msapplication-config": "browserconfig.xml",
    "msapplication-TileColor": "#000000",
    "msapplication-TileImage": "ms-icon-144x144.png",
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
