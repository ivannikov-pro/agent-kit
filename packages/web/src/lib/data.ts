import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";

import matter from "gray-matter";



export type SkillData = {
  name: string;
  description: string;
  category?: string;
  tags?: string[];
  risk?: string;
  tools?: string[];
  version?: string;
  author?: string;
  dateAdded?: string;
  license?: string;
  content: string;
};


export type RegistryData = {
  version: string;
  skills: Record<
    string,
    {
      source: string;
      description: string;
      tags?: string[];
      version?: string;
    }
  >;
  workflows: Record<string, { source: string; description: string }>;
  mcp: Record<string, { package: string; description: string }>;
};


function getProjectRoot(): string {
  // packages/web → root (2 levels up)
  return join(process.cwd(), "..", "..");
}


export function loadRegistry(): RegistryData {
  const registryPath = join(getProjectRoot(), "registry.json");

  const content = readFileSync(registryPath, "utf-8");

  return JSON.parse(content) as RegistryData;
}


export function loadSkill(skillName: string): SkillData | null {
  const skillDir = join(getProjectRoot(), "skills", skillName);
  const skillMdPath = join(skillDir, "SKILL.md");

  if (!existsSync(skillMdPath)) {
    return null;
  }

  const raw = readFileSync(skillMdPath, "utf-8");
  const { data, content } = matter(raw);

  return {
    name: (data.name as string) || skillName,
    description: (data.description as string) || "",
    category: data.category as string | undefined,
    tags: data.tags as string[] | undefined,
    risk: data.risk as string | undefined,
    tools: data.tools as string[] | undefined,
    version: data.metadata?.version as string | undefined,
    author: data.metadata?.author as string | undefined,
    dateAdded: data.date_added as string | undefined,
    license: data.license as string | undefined,
    content,
  };
}


export function loadAllSkills(): SkillData[] {
  const skillsDir = join(getProjectRoot(), "skills");

  if (!existsSync(skillsDir)) {
    return [];
  }

  const dirs = readdirSync(skillsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const skills: SkillData[] = [];

  for (const dir of dirs) {
    const skill = loadSkill(dir);

    if (skill) {
      skills.push(skill);
    }
  }

  return skills;
}
