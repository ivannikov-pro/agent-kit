import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { loadSkill, loadAllSkills } from "@/lib/data";


export function generateStaticParams() {
  const skills = loadAllSkills();

  return skills.map((skill) => ({
    name: skill.name,
  }));
}


export default async function SkillPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const skill = loadSkill(name);

  if (!skill) {
    notFound();
  }


  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-[var(--color-text-dim)]">
        <a
          href="/"
          className="hover:text-[var(--color-accent)] transition-colors"
        >
          ← Back to catalog
        </a>
      </nav>


      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold">{skill.name}</h1>
          <span className="text-xs px-2 py-0.5 rounded-full border bg-cyan-500/15 text-cyan-400 border-cyan-500/30">
            skill
          </span>
        </div>

        <p className="text-[var(--color-text-dim)] text-lg leading-relaxed max-w-3xl">
          {skill.description.split(".").slice(0, 2).join(".")}.
        </p>


        {/* Meta chips */}
        <div className="flex flex-wrap gap-3 mt-6">
          {skill.version && (
            <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-dim)]">
              v{skill.version}
            </span>
          )}
          {skill.author && (
            <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-dim)]">
              by {skill.author}
            </span>
          )}
          {skill.license && (
            <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-dim)]">
              {skill.license}
            </span>
          )}
          {skill.category && (
            <span className="text-xs px-3 py-1 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30">
              {skill.category}
            </span>
          )}
        </div>


        {/* Tags */}
        {skill.tags && skill.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {skill.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded bg-[var(--color-accent-dim)] text-[var(--color-accent)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}


        {/* Install command */}
        <div className="mt-6 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="text-xs text-[var(--color-text-dim)] mb-2">
            Install this skill:
          </div>
          <code className="text-sm text-[var(--color-accent)]">
            npx @ivannikov-pro/ai-agent-kit add {skill.name}
          </code>
        </div>
      </header>


      {/* SKILL.md Content */}
      <article className="prose prose-invert prose-sm max-w-none prose-headings:text-[var(--color-text)] prose-p:text-[var(--color-text-dim)] prose-a:text-[var(--color-accent)] prose-code:text-cyan-300 prose-code:bg-[var(--color-surface)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[var(--color-surface)] prose-pre:border prose-pre:border-[var(--color-border)] prose-table:border-collapse [&_th]:border [&_th]:border-[var(--color-border)] [&_th]:px-3 [&_th]:py-2 [&_td]:border [&_td]:border-[var(--color-border)] [&_td]:px-3 [&_td]:py-2 [&_th]:bg-[var(--color-surface)]">
        <Markdown remarkPlugins={[remarkGfm]}>{skill.content}</Markdown>
      </article>
    </div>
  );
}
