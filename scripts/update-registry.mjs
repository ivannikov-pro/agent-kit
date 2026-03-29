import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import yaml from "js-yaml";



const isStrict = process.argv.includes("--strict");


const errors = [];
const warnings = [];


function addError(msg) { errors.push("❌ " + msg); }


function addWarning(msg) { warnings.push("⚠️ " + msg); }


const CATEGORY_RULES = [
  { name: "security", keywords: ["security", "auth", "threat", "vulnerability"] },
  { name: "code-quality", keywords: ["lint", "format", "style", "review"] },
  { name: "api-integration", keywords: ["api", "rest", "graphql", "client"] },
  { name: "data-ai", keywords: ["ai", "llm", "agent", "prompt", "context"] },
  { name: "architecture", keywords: ["architecture", "systems", "cloud", "deployment"] },
  { name: "business", keywords: ["business", "client", "proposal", "pricing", "discovery"] },
  { name: "development", keywords: ["coding", "react", "express", "node", "typescript"] },
  { name: "test-automation", keywords: ["test", "testing", "coverage", "jest", "cypress"] },
  { name: "front-end", keywords: ["frontend", "ui", "ux", "css", "html", "react", "vue"] },
  { name: "workflow", keywords: ["workflow", "process", "automation", "ops", "ci", "cd"] }
];


function detectCategory(id, text) {
  const haystack = new Set((text || "").toLowerCase().match(/[a-z0-9]+/g) || []);
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some(k => haystack.has(k))) return rule.name;
  }
  return "general";
}


function checkLocalLinks(content, fileDir) {
  const links = [...content.matchAll(/\[.*?\]\((?!http|mailto|<)(.*?)\)/g)];
  for (const link of links) {
    let target = link[1].split("#")[0].trim();
    if (!target) continue;
    if (path.isAbsolute(target)) continue;
    if (target.startsWith("file://")) continue;
    if (target === "link" || target.includes("://")) continue;
    
    const targetPath = path.join(fileDir, target);
    if (!fsSync.existsSync(targetPath)) {
      addError(`Dangling link in ${fileDir}: path '${target}' does not exist locally.`);
    }
  }
}


async function parseFrontmatter(content, relPath) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) {
    addError(`${relPath}: Missing or malformed YAML frontmatter`);
    return null;
  }
  try {
    return yaml.load(match[1]);
  } catch(e) {
    addError(`${relPath}: YAML parse error: ${e.message}`);
    return null;
  }
}


function renderCatalog(registry) {
  let lines = ["# AI Agent Catalog\n", `Generated at: ${new Date().toISOString()}\n`];
  
  for (const type of ["skills", "workflows", "mcp_servers"]) {
    const items = registry[type] || {};
    const keys = Object.keys(items).sort();
    if (!keys.length) continue;
    
    lines.push(`## ${type.toUpperCase()} (${keys.length})\n`);
    if (type === "mcp_servers") {
      lines.push("| Package | Name | Category | Description | Source |");
      lines.push("| --- | --- | --- | --- | --- |");
      for (const k of keys) {
         const cat = items[k].category || "—";
         lines.push(`| \`${items[k].package}\` | \`${k}\` | ${cat} | ${items[k].description} | \`${items[k].source}\` |`);
      }
    } else {
      lines.push("| Name | Category | Description | Source |");
      lines.push("| --- | --- | --- | --- |");
      for (const k of keys) {
         const cat = items[k].category || "—";
         lines.push(`| \`${k}\` | ${cat} | ${items[k].description} | \`${items[k].source}\` |`);
      }
    }
    lines.push("");
  }
  return lines.join("\n");
}


async function main() {
  const registryPath = path.join(process.cwd(), "registry.json");
  const catalogPath = path.join(process.cwd(), "CATALOG.md");
  let registryObj = { version: "1.0", repo: "ivannikov-pro/ai-agent-kit", skills: {}, workflows: {}, "mcp_servers": {} };

  // Parse skills
  const skillsDir = path.join(process.cwd(), "skills");
  if (fsSync.existsSync(skillsDir)) {
    const skillDirs = await fs.readdir(skillsDir);
    for (const dirName of skillDirs) {
      if (dirName.startsWith(".")) continue;
      const stat = await fs.stat(path.join(skillsDir, dirName));
      if (!stat.isDirectory()) continue;

      const skillPath = path.join(skillsDir, dirName, "SKILL.md");
      if (!fsSync.existsSync(skillPath)) {
        addWarning(`Missing SKILL.md in skills/${dirName}`);
        continue;
      }

      const content = await fs.readFile(skillPath, "utf8");
      const frontmatter = await parseFrontmatter(content, `skills/${dirName}/SKILL.md`);
      if (!frontmatter) continue;

      if (frontmatter.name && frontmatter.name !== dirName) {
        addError(`Name '${frontmatter.name}' in skills/${dirName}/SKILL.md does not match folder name.`);
      }
      if (!frontmatter.description || frontmatter.description.length > 2048) {
        addError(`Description in skills/${dirName} is either missing or too long (>2048 chars).`);
      }

      const risk = frontmatter.risk || "unknown";
      if (!["none", "safe", "critical", "offensive", "unknown"].includes(risk)) {
        addError(`Invalid risk level '${risk}' in skills/${dirName}`);
      }

      if (risk === "offensive" && !content.includes("AUTHORIZED USE ONLY")) {
        addError(`Offensive skill in skills/${dirName} missing 'AUTHORIZED USE ONLY' disclaimer.`);
      }

      if (!/(##\s+When\s+to\s+Use|##\s+Use\s+this\s+skill)/i.test(content)) {
        addWarning(`skills/${dirName}: Missing 'When to Use' section.`);
      }
      
      checkLocalLinks(content, path.join(skillsDir, dirName));

      const tags = (frontmatter.tags || []).map(t => t.toLowerCase());
      const category = frontmatter.category || detectCategory(dirName, `${dirName} ${frontmatter.description} ${tags.join(" ")}`);

      registryObj.skills[dirName] = {
        source: `local:skills/${dirName}`,
        description: frontmatter.description || "",
        category,
        tags,
        risk,
        version: (frontmatter.metadata && frontmatter.metadata.version) ? frontmatter.metadata.version : "1.0.0"
      };
    }
  }

  // Parse workflows
  const workflowsDir = path.join(process.cwd(), "workflows");
  if (fsSync.existsSync(workflowsDir)) {
    const workflowFiles = await fs.readdir(workflowsDir);
    for (const fileName of workflowFiles) {
      if (!fileName.endsWith(".md") || fileName.startsWith(".")) continue;
      const wfName = fileName.replace(".md", "");
      const wfPath = path.join(workflowsDir, fileName);
      
      const content = await fs.readFile(wfPath, "utf8");
      const frontmatter = await parseFrontmatter(content, `workflows/${fileName}`);
      if (!frontmatter) continue;

      const tags = (frontmatter.tags || []).map(t => t.toLowerCase());
      const category = frontmatter.category || detectCategory(wfName, `${wfName} ${frontmatter.description} ${tags.join(" ")}`);

      registryObj.workflows[wfName] = {
        source: `local:workflows/${wfName}`,
        description: frontmatter.description || "",
        category,
        tags
      };
    }
  }

  // Parse MCP servers if directory exists
  const mcpDir = path.join(process.cwd(), "mcp_servers");
  if (fsSync.existsSync(mcpDir)) {
    const mcpItems = await fs.readdir(mcpDir);
    for (const itemName of mcpItems) {
      if (itemName.startsWith(".")) continue;
      
      const itemPath = path.join(mcpDir, itemName);
      const stat = await fs.stat(itemPath);
      
      let mcpName = itemName;
      let mdPath = itemPath;
      
      if (stat.isDirectory()) {
         mdPath = path.join(itemPath, "MCP.md");
         if (!fsSync.existsSync(mdPath)) {
            addWarning(`Missing MCP.md in mcp_servers/${itemName}`);
            continue;
         }
      } else {
         if (!itemName.endsWith(".md") || itemName === "README.md" || itemName === "readme.md") continue;
         mcpName = itemName.replace(".md", "");
      }

      const content = await fs.readFile(mdPath, "utf8");
      const extStr = stat.isDirectory() ? `mcp_servers/${mcpName}/MCP.md` : `mcp_servers/${itemName}`;
      const frontmatter = await parseFrontmatter(content, extStr);
      if (!frontmatter) continue;

      if (!frontmatter.package || !frontmatter.description) {
         addError(`${extStr} missing 'package' or 'description' in frontmatter.`);
         continue;
      }
      if (frontmatter.description.length > 2048) {
         addError(`Description in ${extStr} is too long (>2048 chars).`);
      }
      
      const risk = frontmatter.risk || "unknown";
      if (!["none", "safe", "critical", "offensive", "unknown"].includes(risk)) {
        addError(`Invalid risk level '${risk}' in ${extStr}`);
      }

      if (risk === "offensive" && !content.includes("AUTHORIZED USE ONLY")) {
        addError(`Offensive MCP in ${extStr} missing 'AUTHORIZED USE ONLY' disclaimer.`);
      }

      if (!/(##\s+Instructions|##\s+Setup|##\s+Configuration|##\s+When\s+to\s+Use)/i.test(content)) {
         addWarning(`${extStr}: Missing instructions or setup section.`);
      }
      if (!/(##\s+Do\s+not\s+use)/i.test(content) && !stat.isDirectory()) {
         addWarning(`${extStr}: Missing 'Do not use' section.`);
      }
      
      checkLocalLinks(content, stat.isDirectory() ? itemPath : mcpDir);
      
      const tags = (frontmatter.tags || []).map(t => t.toLowerCase());
      const category = frontmatter.category || detectCategory(mcpName, `${mcpName} ${frontmatter.description} ${tags.join(" ")}`);

      registryObj["mcp_servers"][mcpName] = {
        package: frontmatter.package,
        description: frontmatter.description,
        source: stat.isDirectory() ? `local:mcp_servers/${mcpName}` : `local:mcp_servers/${mcpName}.md`,
        category,
        tags,
        risk,
        version: (frontmatter.metadata && frontmatter.metadata.version) ? frontmatter.metadata.version : "1.0.0"
      };
    }
  }

  // Finalize
  const newRegistryContent = JSON.stringify(registryObj, null, 2) + "\n";
  let existingRegistryContent = "";
  try {
    existingRegistryContent = await fs.readFile(registryPath, "utf8");
  } catch(e) {}

  if (newRegistryContent !== existingRegistryContent) {
    await fs.writeFile(registryPath, newRegistryContent, "utf8");
    await fs.writeFile(catalogPath, renderCatalog(registryObj), "utf8");
  } else if (!fsSync.existsSync(catalogPath)) {
    await fs.writeFile(catalogPath, renderCatalog(registryObj), "utf8");
  }
  
  const totalItems = Object.keys(registryObj.skills).length + Object.keys(registryObj.workflows).length + Object.keys(registryObj["mcp_servers"]).length;
  console.log(`\n📊 Checked items in registry. Wrote ${totalItems} total items.`);

  if (warnings.length) {
    console.log(`\n⚠️  Found ${warnings.length} Warnings:`);
    warnings.forEach(w => console.log(w));
  }

  if (errors.length) {
    console.error(`\n❌ Found ${errors.length} Critical Errors:`);
    errors.forEach(e => console.error(e));
    process.exit(1);
  }

  if (isStrict && warnings.length) {
    console.error("\n❌ STRICT MODE: Failed due to warnings.");
    process.exit(1);
  }

  console.log("\n✨ Registry generated and all validations passed!");
}


main().catch(e => {
  console.error(e);
  process.exit(1);
});
