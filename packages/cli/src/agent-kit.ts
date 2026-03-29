import { listResources, findResource, loadRegistry } from "./registry.js";
import { installSkill, installWorkflow } from "./installer.js";
import type {



  RegistryConfig,
  ResourceInfo,
  SkillEntry,
  WorkflowEntry,
  AddOptions,
} from "./types.js";


export class AgentKit {
  /**
   * List all available resources from the registry.
   */
  async list(filter?: {
    skills?: boolean;
    workflows?: boolean;
    mcp?: boolean;
  }): Promise<ResourceInfo[]> {
    return listResources(filter);
  }


  /**
   * Find a resource by name.
   */
  async find(
    name: string,
  ): Promise<{ type: "skill" | "workflow" | "mcp server"; entry: unknown } | null> {
    return findResource(name);
  }


  /**
   * Install a resource by name.
   */
  async install(name: string, options: AddOptions = {}): Promise<string> {
    const result = await findResource(name);

    if (!result) {
      throw new Error(`Resource "${name}" not found in registry.`);
    }

    if (result.type === "skill") {
      return installSkill(name, result.entry as SkillEntry, options);
    }

    if (result.type === "workflow") {
      return installWorkflow(name, result.entry as WorkflowEntry, options);
    }

    throw new Error(
      `Resource type "${result.type}" cannot be installed directly.`,
    );
  }


  /**
   * Load the full registry config.
   */
  async getRegistry(): Promise<RegistryConfig> {
    return loadRegistry();
  }
}
