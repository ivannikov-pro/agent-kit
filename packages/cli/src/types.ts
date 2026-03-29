export type ResourceType = "skill" | "workflow" | "mcp server";


export type SkillEntry = {
  source: string;
  description: string;
  tags?: string[];
  version?: string;
};


export type WorkflowEntry = {
  source: string;
  description: string;
};


export type McpEntry = {
  package: string;
  description: string;
  config?: Record<string, unknown>;
};


export type RegistryConfig = {
  $schema?: string;
  version: string;
  skills: Record<string, SkillEntry>;
  workflows: Record<string, WorkflowEntry>;
  mcp_servers: Record<string, McpEntry>;
};


export type AddOptions = {
  workflow?: boolean;
  global?: boolean;
  target?: string;
};


export type ListOptions = {
  skills?: boolean;
  workflows?: boolean;
  mcp?: boolean;
};


export type ResourceInfo = {
  name: string;
  type: ResourceType;
  description: string;
  source: string;
  tags?: string[];
  installed?: boolean;
};
