"use client";

import { useState } from "react";



type CopyableCommandProps = {
  command: string;
  className?: string;
  prefix?: string;
}


export function CopyableCommand({
  command,
  className = "",
  prefix = "$",
}: CopyableCommandProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <code
      onClick={handleCopy}
      className={`relative group cursor-pointer inline-flex items-center ${className} pr-10`}
      title="Click to copy"
    >
      {prefix && (
        <span className="text-[var(--color-text-muted)] mr-2 select-none font-[var(--font-mono)]">
          {prefix}
        </span>
      )}
      <span className="font-[var(--font-mono)]">{command}</span>

      <span
        className={`absolute right-3 flex items-center justify-center transition-all duration-200 ${
          copied ? "text-emerald-400 opacity-100 scale-110" : "text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 scale-100"
        }`}
      >
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        )}
      </span>
    </code>
  );
}
