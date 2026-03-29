import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { listResources, findResource } from "../registry.js";
import { installSkill } from "../installer.js";
import type { SkillEntry } from "../types.js";



export async function startMcpServer(): Promise<void> {
  const server = new McpServer({
    name: "ai-agent-kit",
    version: "0.1.0",
  });


  // Tool: list_resources
  server.tool(
    "list_resources",
    "List all available AI agent resources (skills, workflows, MCP configs)",
    {
      type: z
        .enum(["skill", "workflow", "mcp server"])
        .optional()
        .describe("Filter by resource type"),
    },
    async ({ type }) => {
      const filter = type
        ? {
          skills: type === "skill",
          workflows: type === "workflow",
          mcp: type === "mcp server",
        }
        : undefined;

      const resources = await listResources(filter);

      const text = resources
        .map(
          (r) => `[${r.type}] ${r.name} — ${r.description}${r.tags ? ` (tags: ${r.tags.join(", ")})` : ""}`,
        )
        .join("\n");

      return {
        content: [
          {
            type: "text" as const,
            text: text || "No resources found.",
          },
        ],
      };
    },
  );


  // Tool: install_resource
  server.tool(
    "install_resource",
    "Install an AI agent skill or workflow into the current project",
    {
      name: z
        .string()
        .describe("Name of the resource to install"),
      global: z
        .boolean()
        .optional()
        .describe("Install globally instead of project-local"),
    },
    async ({ name, global: isGlobal }) => {
      const result = await findResource(name);

      if (!result) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Resource "${name}" not found in registry.`,
            },
          ],
          isError: true,
        };
      }

      if (result.type === "skill") {
        const targetDir = await installSkill(
          name,
          result.entry as SkillEntry,
          { global: isGlobal },
        );

        return {
          content: [
            {
              type: "text" as const,
              text: `Skill "${name}" installed to ${targetDir}`,
            },
          ],
        };
      }

      if (result.type === "mcp server") {
        return {
          content: [
            {
              type: "text" as const,
              text: `"${name}" is an MCP package. Install via: npm install ${(result.entry as { package: string }).package}`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: `Resource type "${result.type}" installation is not yet supported.`,
          },
        ],
      };
    },
  );


  // Tool: search_resources
  server.tool(
    "search_resources",
    "Search for AI agent resources by keyword or tag",
    {
      query: z
        .string()
        .describe("Search query (matches name, description, or tags)"),
    },
    async ({ query }) => {
      const resources = await listResources();
      const q = query.toLowerCase();

      const matches = resources.filter(
        (r) => r.name.toLowerCase().includes(q)
          || r.description.toLowerCase().includes(q)
          || r.tags?.some((t) => t.toLowerCase().includes(q)),
      );

      if (matches.length === 0) {
        return {
          content: [
            {
              type: "text" as const,
              text: `No resources matching "${query}".`,
            },
          ],
        };
      }

      const text = matches
        .map((r) => `[${r.type}] ${r.name} — ${r.description}`)
        .join("\n");

      return {
        content: [{ type: "text" as const, text }],
      };
    },
  );


  // Start the server
  const transport = new StdioServerTransport();

  await server.connect(transport);

  console.error("ai-agent-kit MCP server running on stdio");
}
