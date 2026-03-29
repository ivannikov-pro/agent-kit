import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { RegistryConfig, ResourceInfo } from "./types.js";



const __dirname = dirname(fileURLToPath(import.meta.url));


let cachedRegistry: RegistryConfig | null = null;


/**
 * Load registry from the bundled registry.json file.
 * Falls back to fetching from GitHub if local file not found.
 */
export async function loadRegistry(): Promise<RegistryConfig> {
  if (cachedRegistry) {
    return cachedRegistry;
  }

  // Try local registry: packages/cli/dist/ → monorepo root
  const localPaths = [
    join(__dirname, "..", "..", "..", "registry.json"), // from dist/ → root
    join(__dirname, "..", "registry.json"), // fallback: old layout
  ];

  for (const localPath of localPaths) {
    try {
      const content = await readFile(localPath, "utf-8");

      cachedRegistry = JSON.parse(content) as RegistryConfig;

      return cachedRegistry;
    } catch {
      // try next path
    }
  }

  // Fallback: fetch from GitHub
  {
    const url = "https://raw.githubusercontent.com/ivannikov-pro/ai-agent-kit/master/registry.json";

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to load registry: ${res.status} ${res.statusText}`,
      );
    }

    cachedRegistry = (await res.json()) as RegistryConfig;

    return cachedRegistry;
  }
}


/**
 * List all resources from the registry, optionally filtered by type.
 */
export async function listResources(filter?: {
  skills?: boolean;
  workflows?: boolean;
  mcp?: boolean;
}): Promise<ResourceInfo[]> {
  const registry = await loadRegistry();
  const resources: ResourceInfo[] = [];

  const showAll = !filter || (!filter.skills && !filter.workflows && !filter.mcp_servers);


  if (showAll || filter?.skills) {
    for (const [name, entry] of Object.entries(registry.skills)) {
      resources.push({
        name,
        type: "skill",
        description: entry.description,
        source: entry.source,
        tags: entry.tags,
      });
    }
  }


  if (showAll || filter?.workflows) {
    for (const [name, entry] of Object.entries(registry.workflows)) {
      resources.push({
        name,
        type: "workflow",
        description: entry.description,
        source: entry.source,
      });
    }
  }


  if (showAll || filter?.mcp_servers) {
    for (const [name, entry] of Object.entries(registry.mcp_servers)) {
      resources.push({
        name,
        type: "mcp server",
        description: entry.description,
        source: entry.package,
      });
    }
  }

  return resources;
}


/**
 * Find a resource by name across all types.
 */
export async function findResource(
  name: string,
): Promise<{ type: "skill" | "workflow" | "mcp server"; entry: unknown } | null> {
  const registry = await loadRegistry();

  if (registry.skills[name]) {
    return { type: "skill", entry: registry.skills[name] };
  }

  if (registry.workflows[name]) {
    return { type: "workflow", entry: registry.workflows[name] };
  }

  if (registry.mcp_servers[name]) {
    return { type: "mcp server", entry: registry.mcp_servers[name] };
  }

  return null;
}
