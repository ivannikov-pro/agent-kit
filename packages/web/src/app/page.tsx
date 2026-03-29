import { loadAllSkills, loadRegistry } from "@/lib/data";
import {



  HomeClient,
  type MCPEntry,
  type WorkflowEntry,
} from "@/components/HomeClient";



export default function HomePage() {
  const skills = loadAllSkills();
  const registry = loadRegistry();

  const mcpEntries: MCPEntry[] = Object.entries(registry.mcp_servers || {}).map(
    ([name, entry]) => ({
      name,
      type: "mcp server",
      description: entry.description,
      package: entry.package,
    })
  );

  const workflowsEntries: WorkflowEntry[] = Object.entries(
    registry.workflows
  ).map(([name, entry]) => ({
    name,
    type: "workflow",
    description: entry.description,
    source: entry.source,
  }));

  return (
    <HomeClient
      skills={skills}
      mcpEntries={mcpEntries}
      workflowsEntries={workflowsEntries}
    />
  );
}
