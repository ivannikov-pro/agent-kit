import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { loadSkill, loadAllSkills } from "@/lib/data";



export function generateStaticParams() {
  const skills = loadAllSkills();

  return skills.map((skill) => ({
    name: skill.name,
  }));
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const skill = loadSkill(name);

  if (!skill) {
    return { title: "Skill Not Found" };
  }

  return {
    title: skill.name,
    description: skill.description.split(".").slice(0, 2).join(".") + ".",
    openGraph: {
      title: `${skill.name} — ai-agent-kit skill`,
      description: skill.description.split(".")[0] + ".",
    },
  };
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
      <nav className="mb-8 animate-fade-in-up">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-dim)] hover:text-[var(--color-accent)] transition-colors group"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="group-hover:-translate-x-0.5 transition-transform"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to catalog
        </a>
      </nav>


      {/* Header */}
      <header className="mb-12 animate-fade-in-up-delay-1">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold">{skill.name}</h1>
          <span className="text-[10px] px-2.5 py-1 rounded-full border bg-cyan-500/10 text-cyan-400 border-cyan-500/25 font-medium uppercase tracking-wider">
            skill
          </span>
        </div>

        <p className="text-[var(--color-text-dim)] text-lg leading-relaxed max-w-3xl">
          {skill.description.split(".").slice(0, 2).join(".")}.
        </p>


        {/* Meta chips */}
        <div className="flex flex-wrap gap-2.5 mt-6">
          {skill.version && (
            <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-dim)] font-medium">
              v{skill.version}
            </span>
          )}
          {skill.author && (
            <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-dim)] font-medium">
              by {skill.author}
            </span>
          )}
          {skill.license && (
            <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-dim)] font-medium">
              {skill.license}
            </span>
          )}
          {skill.category && (
            <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/25 font-medium">
              {skill.category}
            </span>
          )}
        </div>


        {/* Tags */}
        {skill.tags && skill.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
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


        {/* Install command */}
        <div className="mt-8 p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="text-[11px] text-[var(--color-text-muted)] mb-2 uppercase tracking-wider font-medium">
            Install this skill
          </div>
          <code className="text-sm text-[var(--color-accent)] font-[var(--font-mono)]">
            <span className="text-[var(--color-text-muted)] mr-2">$</span>
            npx @ivannikov-pro/ai-agent-kit add {skill.name}
          </code>
        </div>
      </header>


      {/* SKILL.md Content */}
      <article className="prose-custom animate-fade-in-up-delay-2">
        <Markdown remarkPlugins={[remarkGfm]}>{skill.content}</Markdown>
      </article>
    </div>
  );
}
