import type { SkillEntry, WorkflowEntry, AddOptions } from "./types.js";
import { parseSource, downloadGitHubDir } from "./utils/github.js";
import { ensureDir, getSkillsDir, getWorkflowsDir } from "./utils/fs.js";



/**
 * Install a skill from the registry into the project.
 */
export async function installSkill(
  name: string,
  entry: SkillEntry,
  options: AddOptions = {},
): Promise<string> {
  const source = parseSource(entry.source);

  const targetDir = options.target
    ? options.target
    : getSkillsDir(process.cwd(), options.global);

  const skillDir = `${targetDir}/${name}`;

  await ensureDir(skillDir);

  await downloadGitHubDir(source.owner, source.repo, source.path, skillDir);

  return skillDir;
}


/**
 * Install a workflow from the registry into the project.
 */
export async function installWorkflow(
  name: string,
  entry: WorkflowEntry,
  options: AddOptions = {},
): Promise<string> {
  const source = parseSource(entry.source);

  const targetDir = options.target
    ? options.target
    : getWorkflowsDir(process.cwd(), options.global);

  await ensureDir(targetDir);

  await downloadGitHubDir(source.owner, source.repo, source.path, targetDir);

  return targetDir;
}
