import { loadAllSkills, loadRegistry } from "@/lib/data";



const typeConfig: Record<string, { color: string; bg: string; border: string }> = {
  skill: {
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/25",
  },
  workflow: {
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/25",
  },
  mcp: {
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
  },
};


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


export default function HomePage() {
  const skills = loadAllSkills();
  const registry = loadRegistry();

  const mcpEntries = Object.entries(registry.mcp).map(([name, entry]) => ({
    name,
    type: "mcp" as const,
    description: entry.description,
    package: entry.package,
  }));


  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* ─── Hero ─── */}
      <section className="text-center pt-20 pb-16 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 text-xs text-[var(--color-text-muted)] border border-[var(--color-border)] rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Open-source · MIT Licensed
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            ai-agent-kit
          </span>
        </h1>

        <p className="text-lg md:text-xl text-[var(--color-text-dim)] max-w-2xl mx-auto mb-10 leading-relaxed">
          Curated collection of skills, workflows, and MCP configs
          for any AI coding assistant. Install with a single command.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
          <code className="inline-flex items-center text-sm bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] px-5 py-2.5 rounded-lg text-[var(--color-accent)] transition-colors cursor-default font-[var(--font-mono)]">
            <span className="text-[var(--color-text-muted)] mr-2">$</span>
            npx @ivannikov-pro/ai-agent-kit list
          </code>
          <code className="inline-flex items-center text-sm bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] px-5 py-2.5 rounded-lg text-[var(--color-accent)] transition-colors cursor-default font-[var(--font-mono)]">
            <span className="text-[var(--color-text-muted)] mr-2">$</span>
            npx @ivannikov-pro/ai-agent-kit add skill-base
          </code>
        </div>
      </section>


      {/* ─── Stats ─── */}
      <section className="grid grid-cols-3 gap-4 mb-20 max-w-md mx-auto animate-fade-in-up-delay-1">
        <StatCard value={skills.length} label="Skills" color="text-cyan-400" />
        <StatCard
          value={Object.keys(registry.workflows).length}
          label="Workflows"
          color="text-purple-400"
        />
        <StatCard value={mcpEntries.length} label="MCP" color="text-emerald-400" />
      </section>


      {/* ─── Skills ─── */}
      <section className="mb-20 animate-fade-in-up-delay-2" id="skills">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <h2 className="text-2xl font-semibold">Skills</h2>
          <span className="text-xs text-[var(--color-text-muted)]">
            {skills.length} available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <a
              key={skill.name}
              href={`/skills/${skill.name}`}
              className="group block p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-surface-hover)] transition-all duration-[var(--transition-base)] no-underline"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                  {skill.name}
                </h3>
                <Badge type="skill" label="skill" />
              </div>

              <p className="text-sm text-[var(--color-text-dim)] leading-relaxed mb-4 line-clamp-2">
                {skill.description.split(".")[0]}.
              </p>

              {skill.tags && skill.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--color-accent-dim)] text-[var(--color-accent)] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {skill.tools && skill.tools.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex flex-wrap gap-1.5">
                  {skill.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-[11px] px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-muted)] font-[var(--font-mono)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      </section>


      {/* ─── MCP Configs ─── */}
      {mcpEntries.length > 0 && (
        <section className="mb-20 animate-fade-in-up-delay-3" id="mcp">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <h2 className="text-2xl font-semibold">MCP Configs</h2>
            <span className="text-xs text-[var(--color-text-muted)]">
              {mcpEntries.length} available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mcpEntries.map((entry) => (
              <div
                key={entry.name}
                className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-emerald-500/25 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-semibold">{entry.name}</h3>
                  <Badge type="mcp" label="mcp" />
                </div>

                <p className="text-sm text-[var(--color-text-dim)] leading-relaxed mb-4">
                  {entry.description}
                </p>

                <code className="inline-flex items-center text-xs bg-[var(--color-background)] border border-[var(--color-border)] px-3 py-1.5 rounded-md text-emerald-400 font-[var(--font-mono)]">
                  <span className="text-[var(--color-text-muted)] mr-1.5">$</span>
                  npm i {entry.package}
                </code>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* ─── CTA ─── */}
      <section className="text-center py-16 mb-8 rounded-2xl bg-gradient-to-br from-indigo-500/8 via-purple-500/8 to-cyan-500/8 border border-[var(--color-border)]">
        <h2 className="text-2xl font-bold mb-3">Get Started</h2>
        <p className="text-[var(--color-text-dim)] mb-8 max-w-md mx-auto">
          Install ai-agent-kit and start adding skills to your AI coding assistant
          in seconds.
        </p>
        <code className="inline-flex items-center text-sm bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] px-6 py-3 rounded-xl text-[var(--color-accent)] transition-colors cursor-default font-[var(--font-mono)]">
          <span className="text-[var(--color-text-muted)] mr-2">$</span>
          npx @ivannikov-pro/ai-agent-kit init
        </code>
      </section>
    </div>
  );
}
