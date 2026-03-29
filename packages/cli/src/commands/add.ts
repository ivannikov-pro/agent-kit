import ora from "ora";
import { findResource, loadRegistry } from "../registry.js";
import { installSkill, installWorkflow } from "../installer.js";
import { log } from "../utils/logger.js";
import type { AddOptions, SkillEntry, WorkflowEntry } from "../types.js";



export async function addCommand(
  name: string,
  options: AddOptions,
): Promise<void> {
  const spinner = ora(`Looking up "${name}"...`).start();

  try {
    const result = await findResource(name);

    if (!result) {
      spinner.fail(`Resource "${name}" not found in registry.`);

      const registry = await loadRegistry();
      const allNames = [
        ...Object.keys(registry.skills),
        ...Object.keys(registry.workflows),
        ...Object.keys(registry.mcp_servers),
      ];

      if (allNames.length > 0) {
        log.info(`Available resources: ${allNames.join(", ")}`);
      }

      return;
    }


    if (result.type === "skill") {
      spinner.text = `Installing skill "${name}"...`;

      const targetDir = await installSkill(
        name,
        result.entry as SkillEntry,
        options,
      );

      spinner.succeed(`Skill "${name}" installed to ${targetDir}`);
    } else if (result.type === "workflow") {
      spinner.text = `Installing workflow "${name}"...`;

      const targetDir = await installWorkflow(
        name,
        result.entry as WorkflowEntry,
        options,
      );

      spinner.succeed(`Workflow "${name}" installed to ${targetDir}`);
    } else if (result.type === "mcp server") {
      spinner.info(
        `"${name}" is an MCP package. Install via: npm install ${(result.entry as { package: string }).package}`,
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    spinner.fail(`Failed to install "${name}": ${message}`);
  }
}
