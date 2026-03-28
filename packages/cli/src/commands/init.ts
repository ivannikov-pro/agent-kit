import chalk from "chalk";

import { listResources, loadRegistry } from "../registry.js";
import { installSkill } from "../installer.js";
import { log } from "../utils/logger.js";
import { dirExists, getSkillsDir } from "../utils/fs.js";
import type { SkillEntry } from "../types.js";


export async function initCommand(): Promise<void> {
  console.log();
  console.log(chalk.bold("🛠️  ai-agent-kit init"));
  console.log(chalk.dim("  Setting up AI agent resources for this project"));
  console.log();


  // Check what's already installed
  const skillsDir = getSkillsDir(process.cwd());
  const hasSkillsDir = await dirExists(skillsDir);

  if (hasSkillsDir) {
    log.info("Found existing .agents/skills/ directory");
  } else {
    log.info("No .agents/skills/ directory found — will create it");
  }


  // List available resources
  const resources = await listResources();
  const registry = await loadRegistry();

  console.log();
  console.log(chalk.bold("  Available skills to install:"));
  console.log();


  for (const resource of resources) {
    if (resource.type === "skill") {
      const installed = await dirExists(`${skillsDir}/${resource.name}`);
      const status = installed
        ? chalk.green(" (installed)")
        : chalk.dim(" (not installed)");

      console.log(
        `  ${chalk.cyan("•")} ${chalk.bold(resource.name)}${status}`,
      );
      console.log(`    ${chalk.dim(resource.description)}`);
      console.log();
    }
  }


  // Install all not-yet-installed skills
  const toInstall = Object.entries(registry.skills).filter(
    ([name]) => !dirExists(`${skillsDir}/${name}`),
  );

  if (toInstall.length > 0) {
    console.log(
      chalk.bold(
        `  Run ${chalk.cyan("ai-agent-kit add <name>")} to install a skill.`,
      ),
    );
  }


  console.log();
  log.success("Init complete. Your project is ready for AI agents!");
  console.log();
}
