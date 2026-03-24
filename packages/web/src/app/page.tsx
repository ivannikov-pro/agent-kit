import { loadAllSkills, loadRegistry } from "@/lib/data";


const typeColors: Record<string, string> = {
  skill: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  workflow: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  mcp: "bg-green-500/15 text-green-400 border-green-500/30",
};


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
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          agent-kit
        </h1>
        <p className="text-lg text-[var(--color-text-dim)] max-w-2xl mx-auto mb-8">
          Your toolkit for AI-powered development. Browse and install curated
          skills, workflows, and MCP configs for any AI coding assistant.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <code className="text-sm bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-2 rounded-lg text-[var(--color-accent)]">
            npx @ivannikov-pro/agent-kit list
          </code>
          <code className="text-sm bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-2 rounded-lg text-[var(--color-accent)]">
            npx @ivannikov-pro/agent-kit add skill-base
          </code>
        </div>
      </section>


      {/* Stats */}
      <section className="grid grid-cols-3 gap-4 mb-16 max-w-lg mx-auto">
        <div className="text-center p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="text-2xl font-bold text-cyan-400">
            {skills.length}
          </div>
          <div className="text-xs text-[var(--color-text-dim)] mt-1">
            Skills
          </div>
        </div>
        <div className="text-center p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="text-2xl font-bold text-purple-400">
            {Object.keys(registry.workflows).length}
          </div>
          <div className="text-xs text-[var(--color-text-dim)] mt-1">
            Workflows
          </div>
        </div>
        <div className="text-center p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="text-2xl font-bold text-green-400">
            {mcpEntries.length}
          </div>
          <div className="text-xs text-[var(--color-text-dim)] mt-1">
            MCP
          </div>
        </div>
      </section>


      {/* Skills */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <a
              key={skill.name}
              href={`/skills/${skill.name}`}
              className="group block p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-surface-hover)] transition-all duration-200 no-underline"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                  {skill.name}
                </h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${typeColors.skill}`}
                >
                  skill
                </span>
              </div>

              <p className="text-sm text-[var(--color-text-dim)] leading-relaxed mb-4">
                {skill.description.split(".")[0]}.
              </p>

              <div className="flex flex-wrap gap-2">
                {skill.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded bg-[var(--color-accent-dim)] text-[var(--color-accent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {skill.tools && skill.tools.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex flex-wrap gap-1.5">
                  {skill.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-dim)]"
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


      {/* MCP Configs */}
      {mcpEntries.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            MCP Configs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mcpEntries.map((entry) => (
              <div
                key={entry.name}
                className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold">
                    {entry.name}
                  </h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${typeColors.mcp}`}
                  >
                    mcp
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-dim)] mb-3">
                  {entry.description}
                </p>
                <code className="text-xs bg-[var(--color-background)] px-3 py-1.5 rounded text-green-400">
                  npm i {entry.package}
                </code>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* Install CTA */}
      <section className="text-center py-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10 border border-[var(--color-border)]">
        <h2 className="text-2xl font-bold mb-4">Get Started</h2>
        <p className="text-[var(--color-text-dim)] mb-6">
          Install agent-kit globally or use with npx
        </p>
        <code className="text-sm bg-[var(--color-background)] border border-[var(--color-border)] px-6 py-3 rounded-lg text-[var(--color-accent)] inline-block">
          npx @ivannikov-pro/agent-kit init
        </code>
      </section>
    </div>
  );
}
