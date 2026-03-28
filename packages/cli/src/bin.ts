import { Command } from "commander";

import { listCommand } from "./commands/list.js";
import { addCommand } from "./commands/add.js";
import { removeCommand } from "./commands/remove.js";
import { initCommand } from "./commands/init.js";
import { startMcpServer } from "./mcp/server.js";


const program = new Command();


program
  .name("ai-agent-kit")
  .description(
    "CLI + MCP server for installing AI agent skills, workflows, and MCP configs",
  )
  .version("0.1.0");


program
  .command("list")
  .description("List available resources from the registry")
  .option("-s, --skills", "Show only skills")
  .option("-w, --workflows", "Show only workflows")
  .option("-m, --mcp", "Show only MCP configs")
  .action(listCommand);


program
  .command("add")
  .description("Install a skill or workflow into the current project")
  .argument("<name>", "Name of the resource to install")
  .option("-w, --workflow", "Install as workflow")
  .option("-g, --global", "Install globally (~/.agents/)")
  .option("-t, --target <path>", "Custom target directory")
  .action(addCommand);


program
  .command("remove")
  .description("Remove an installed skill or workflow")
  .argument("<name>", "Name of the resource to remove")
  .action(removeCommand);


program
  .command("init")
  .description("Initialize AI agent resources for this project")
  .action(initCommand);


program
  .command("mcp")
  .description("Start as MCP server (stdio transport)")
  .action(startMcpServer);


program.parse();
