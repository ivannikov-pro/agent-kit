import chalk from "chalk";
import { listResources } from "../registry.js";
import type { ListOptions } from "../types.js";



export async function listCommand(options: ListOptions): Promise<void> {
  const resources = await listResources({
    skills: options.skills,
    workflows: options.workflows,
    mcp: options.mcp_servers,
  });

  if (resources.length === 0) {
    console.log(chalk.yellow("No resources found."));

    return;
  }


  console.log();
  console.log(chalk.bold("Available resources:"));
  console.log();


  const typeColors: Record<string, (s: string) => string> = {
    skill: chalk.cyan,
    workflow: chalk.magenta,
    mcp: chalk.green,
  };


  const maxNameLen = Math.max(...resources.map((r) => r.name.length));

  for (const resource of resources) {
    const colorFn = typeColors[resource.type] || chalk.white;
    const typeLabel = colorFn(`[${resource.type}]`.padEnd(12));
    const nameLabel = chalk.bold(resource.name.padEnd(maxNameLen + 2));
    const desc = chalk.dim(resource.description);

    console.log(`  ${typeLabel} ${nameLabel} ${desc}`);
  }


  console.log();
  console.log(
    chalk.dim(`  Total: ${resources.length} resource(s)`),
  );
  console.log();
}
