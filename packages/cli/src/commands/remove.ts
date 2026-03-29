import ora from "ora";
import {
 removeDir, getSkillsDir, getWorkflowsDir, dirExists, fileExists
} from "../utils/fs.js";
import { log } from "../utils/logger.js";



export async function removeCommand(name: string): Promise<void> {
  const spinner = ora(`Removing "${name}"...`).start();


  // Try skills first
  const skillDir = `${getSkillsDir(process.cwd())}/${name}`;

  if (await dirExists(skillDir)) {
    await removeDir(skillDir);

    spinner.succeed(`Skill "${name}" removed from ${skillDir}`);

    return;
  }


  // Try workflows
  const workflowFile = `${getWorkflowsDir(process.cwd())}/${name}.md`;

  if (await fileExists(workflowFile)) {
    const { unlink } = await import("node:fs/promises");

    await unlink(workflowFile);

    spinner.succeed(`Workflow "${name}" removed.`);

    return;
  }


  spinner.fail(`Resource "${name}" not found in current project.`);
  log.dim("  Checked:");
  log.dim(`    ${skillDir}`);
  log.dim(`    ${workflowFile}`);
}
