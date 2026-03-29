import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { loadWorkflow, loadAllWorkflows } from "@/lib/data";
import { CopyableCommand } from "@/components/CopyableCommand";



export const dynamicParams = false;


export function generateStaticParams() {
  const workflows = loadAllWorkflows();

  if (workflows.length === 0) {
    return [{ name: "_empty" }];
  }

  return workflows.map((workflow) => ({
    name: workflow.name,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const workflow = loadWorkflow(name);

  if (!workflow) {
    return { title: "Workflow Not Found" };
  }

  return {
    title: workflow.name,
    description: `${workflow.description.split(".").slice(0, 2).join(".")}.`,
    openGraph: {
      title: `${workflow.name} — ai-agent-kit workflow`,
      description: `${workflow.description.split(".")[0]}.`,
    },
  };
}

export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const workflow = loadWorkflow(name);

  if (!workflow) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 animate-fade-in-up">
        <Link
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
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-12 animate-fade-in-up-delay-1">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold">{workflow.name}</h1>
          <span className="text-[10px] px-2.5 py-1 rounded-full border bg-purple-500/10 text-purple-400 border-purple-500/25 font-medium uppercase tracking-wider">
            workflow
          </span>
        </div>

        <p className="text-[var(--color-text-dim)] text-lg leading-relaxed max-w-3xl">
          {workflow.description.split(".").slice(0, 2).join(".")}{workflow.description.endsWith(".") ? "" : "."}
        </p>

        {/* Install command */}
        <div className="mt-8 p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="text-[11px] text-[var(--color-text-muted)] mb-2 uppercase tracking-wider font-medium">
            Install this workflow
          </div>
          <CopyableCommand
            className="text-sm text-[var(--color-accent)]"
            command={`npx @ivannikov-pro/ai-agent-kit@latest add ${workflow.name}`}
          />
        </div>
      </header>

      {/* Content */}
      <article className="prose-custom animate-fade-in-up-delay-2">
        <Markdown remarkPlugins={[remarkGfm]}>{workflow.content}</Markdown>
      </article>
    </div>
  );
}
