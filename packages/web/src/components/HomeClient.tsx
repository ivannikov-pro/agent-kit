"use client";

import { useState } from "react";
import Link from "next/link";
import type { SkillData } from "@/lib/data";
import { CopyableCommand } from "./CopyableCommand";



const typeConfig: Record<string, { color: string; bg: string; border: string; cardHover: string; titleHover: string; cmdText: string; }> = {
  skill: {
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/25",
    cardHover: "hover:border-cyan-500/30",
    titleHover: "group-hover:text-cyan-400",
    cmdText: "text-cyan-400 hover:border-cyan-500/30",
  },
  workflow: {
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/25",
    cardHover: "hover:border-purple-500/30",
    titleHover: "group-hover:text-purple-400",
    cmdText: "text-purple-400 hover:border-purple-500/30",
  },
  mcp: {
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    cardHover: "hover:border-emerald-500/30",
    titleHover: "group-hover:text-emerald-400",
    cmdText: "text-emerald-400 hover:border-emerald-500/30",
  },
};


function ItemCard({
  href,
  name,
  type,
  description,
  tags,
  tools,
  command,
}: {
  href: string;
  name: string;
  type: "skill" | "workflow" | "mcp server";
  description: string;
  tags?: string[];
  tools?: string[];
  command: string;
}) {
  const cfg = typeConfig[type] || typeConfig.skill;

  return (
    <Link
      href={href}
      className={`group flex flex-col h-full p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-all duration-[var(--transition-base)] no-underline ${cfg.cardHover}`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className={`text-base font-semibold text-[var(--color-text)] transition-colors ${cfg.titleHover}`}>
          {name}
        </h3>
        <Badge type={type} label={type} />
      </div>

      <p className="text-sm text-[var(--color-text-dim)] leading-relaxed mb-4 line-clamp-2">
        {description.split(".")[0]}.
      </p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${cfg.bg} ${cfg.color}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {tools && tools.length > 0 && (
        <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex flex-wrap gap-1.5">
          {tools.map((tool) => (
            <span
              key={tool}
              className="text-[11px] px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-muted)] font-[var(--font-mono)]"
            >
              {tool}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto pt-5">
        <CopyableCommand
          className={`text-xs bg-[var(--color-background)] border border-[var(--color-border)] px-3 py-1.5 rounded-md transition-colors inline-flex ${cfg.cmdText}`}
          command={command}
        />
      </div>
    </Link>
  );
}


function StatCard({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="text-center p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors">
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-[var(--color-text-muted)] mt-1.5 uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );
}


function Badge({
  type,
  label,
}: {
  type: string;
  label: string;
}) {
  const cfg = typeConfig[type] || typeConfig.skill;

  return (
    <span
      className={`text-[10px] px-2 py-0.5 rounded-full border font-medium uppercase tracking-wider ${cfg.color} ${cfg.bg} ${cfg.border}`}
    >
      {label}
    </span>
  );
}


export type MCPEntry = {
  name: string;
  type: "mcp server";
  description: string;
  package: string;
};


export type WorkflowEntry = {
  name: string;
  type: "workflow";
  description: string;
  source: string;
};


export function HomeClient({
  skills,
  mcpEntries,
  workflowsEntries,
}: {
  skills: SkillData[];
  mcpEntries: MCPEntry[];
  workflowsEntries: WorkflowEntry[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const q = searchQuery.toLowerCase();

  const filteredSkills = skills.filter((s) => s.name.toLowerCase().includes(q)
    || s.description.toLowerCase().includes(q)
    || (s.tags && s.tags.some((tag) => tag.toLowerCase().includes(q))));

  const filteredMcp = mcpEntries.filter((m) => m.name.toLowerCase().includes(q)
    || m.description.toLowerCase().includes(q)
    || m.package.toLowerCase().includes(q));

  const filteredWorkflows = workflowsEntries.filter((w) => w.name.toLowerCase().includes(q)
    || w.description.toLowerCase().includes(q));

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* ─── Hero ─── */}
      <section className="text-center pt-20 pb-16 animate-fade-in-up">

        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            ai-agent-kit
          </span>
        </h1>

        <p className="text-lg md:text-xl text-[var(--color-text-dim)] max-w-2xl mx-auto mb-10 leading-relaxed">
          Curated collection of skills, workflows, and MCP configs
          for any AI coding assistant. Install with a single command.
        </p>

        {/* ─── Get Started CTA ─── */}
        <div className="text-center py-8 px-6 mb-12 rounded-2xl bg-gradient-to-br from-indigo-500/8 via-purple-500/8 to-cyan-500/8 border border-[var(--color-border)] max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-2">Get Started</h2>
          <p className="text-sm text-[var(--color-text-dim)] mb-6 max-w-xl mx-auto leading-relaxed">
            Run this command to initialize your workspace. It will create an <code className="bg-[var(--color-surface)] px-1.5 py-0.5 rounded text-[var(--color-text)]">.agents/</code> directory and prepare your project for AI agent skills.
          </p>
          <CopyableCommand
            className="text-sm bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] px-6 py-3 rounded-xl text-[var(--color-accent)] transition-colors"
            command="npx @ivannikov-pro/ai-agent-kit@latest init"
          />
        </div>

        {/* ─── Search Bar ─── */}
        <div className="max-w-2xl mx-auto relative group text-left">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-accent)] transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search skills, workflows, and MCP configs..."
            className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] group-hover:border-[var(--color-border-hover)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] outline-none rounded-xl pl-12 pr-4 py-4 text-[var(--color-text)] transition-all placeholder:text-[var(--color-text-muted)]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="grid grid-cols-3 gap-4 mb-20 max-w-md mx-auto animate-fade-in-up-delay-1">
        <StatCard value={skills.length} label="Skills" color="text-cyan-400" />
        <StatCard value={workflowsEntries.length} label="Workflows" color="text-purple-400" />
        <StatCard value={mcpEntries.length} label="MCP Servers" color="text-emerald-400" />
      </section>

      {/* ─── Nothing Found State ─── */}
      {filteredSkills.length === 0 && filteredWorkflows.length === 0 && filteredMcp.length === 0 && (
        <section className="text-center py-20 animate-fade-in">
          <div className="text-[var(--color-text-dim)]">
            No results found for &quot;{searchQuery}&quot;
          </div>
        </section>
      )}

      {/* ─── Skills ─── */}
      {filteredSkills.length > 0 && (
        <section className="scroll-mt-24 mb-20 animate-fade-in-up-delay-2" id="skills">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h2 className="text-2xl font-semibold">Skills</h2>
            <span className="text-xs text-[var(--color-text-muted)]">
              {filteredSkills.length} available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSkills.map((skill) => (
              <ItemCard
                key={skill.name}
                href={`/skills/${skill.name}`}
                name={skill.name}
                type="skill"
                description={skill.description}
                tags={skill.tags}
                tools={skill.tools}
                command={`npx @ivannikov-pro/ai-agent-kit@latest add ${skill.name}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* ─── Workflows ─── */}
      {(filteredWorkflows.length > 0 || (workflowsEntries.length === 0 && searchQuery === "")) && (
        <section className="scroll-mt-24 mb-20 animate-fade-in-up-delay-3" id="workflows">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <h2 className="text-2xl font-semibold">Workflows</h2>
            <span className="text-xs text-[var(--color-text-muted)]">
              {workflowsEntries.length > 0 ? `${filteredWorkflows.length} available` : "Coming soon"}
            </span>
          </div>

          {workflowsEntries.length === 0 ? (
            <div className="p-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center">
              <p className="text-[var(--color-text-dim)]">Workflows coming soon...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredWorkflows.map((entry) => (
                <ItemCard
                  key={entry.name}
                  href={`/workflows/${entry.name}`}
                  name={entry.name}
                  type="workflow"
                  description={entry.description}
                  tags={["workflow", "agent"]}
                  tools={[entry.source ? "local" : "remote"]}
                  command={`npx @ivannikov-pro/ai-agent-kit@latest add ${entry.name}`}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* ─── MCP Configs ─── */}
      {filteredMcp.length > 0 && (
        <section className="scroll-mt-24 mb-20 animate-fade-in-up-delay-3" id="mcp_servers">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <h2 className="text-2xl font-semibold">MCP Configs</h2>
            <span className="text-xs text-[var(--color-text-muted)]">
              {filteredMcp.length} available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMcp.map((entry) => (
              <ItemCard
                key={entry.name}
                href={`/mcp/${entry.name}`}
                name={entry.name}
                type="mcp server"
                description={entry.description}
                tags={["mcp server"]}
                tools={[entry.package.split("/").pop()!]}
                command={`npm i ${entry.package}`}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
