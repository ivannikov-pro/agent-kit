import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";



const EXCLUDED_DIRS = ["node_modules", ".next", "dist", "build", ".turbo", "out"];
const ALLOWED_EXTS = [".ts", ".tsx", ".js", ".jsx"];



async function formatFile(filepath) {
  let content = await fs.readFile(filepath, "utf-8");
  if (!content.trim()) {
    return;
  }

  const lines = content.split("\n");

  // 1. Enforce 3 blank lines after imports
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("import ") || (line.startsWith("export ") && line.includes(" from "))) {
      lastImportIdx = i;
    }
  }

  if (lastImportIdx !== -1) {
    let nextContentIdx = lastImportIdx + 1;
    while (nextContentIdx < lines.length && !lines[nextContentIdx].trim()) {
      nextContentIdx++;
    }
    
    if (nextContentIdx < lines.length) {
      const before = lines.slice(0, lastImportIdx + 1);
      const after = lines.slice(nextContentIdx);
      content = [...before, "", "", "", ...after].join("\n");
    }
  }

  // 2. Enforce 2 blank lines before logical blocks 
  const newLines = content.split("\n");
  const result = [];
  const blockPattern = /^(export type |type |export interface |interface |export const |const |export let |let |export function |function |export class |class )/;

  for (let i = 0; i < newLines.length; i++) {
    const line = newLines[i];
    if (blockPattern.test(line)) {
      if (result.length > 0) {
         let j = result.length - 1;
         let emptyCount = 0;
         while (j >= 0 && !result[j].trim()) {
           emptyCount++;
           j--;
         }
         
         if (j >= 0) {
           const prevLine = result[j].trim();
           // Don't format if prev line was an import (handled by 3-lines rule) or if preceded by a JSDoc/comment
           if (!prevLine.startsWith("import ") && !prevLine.startsWith("//") && !prevLine.endsWith("*/")) {
             // Remove existing empty lines
             for (let e = 0; e < emptyCount; e++) {
               result.pop();
             }
             // Push exactly 2 empty lines
             result.push("");
             result.push("");
           }
         }
      }
    }
    result.push(line);
  }

  let finalContent = result.join("\n");
  
  // 3. Convert interface to type (simplified)
  finalContent = finalContent.replace(/^export\s+interface\s+([A-Za-z0-9_]+)\s*(?:extends\s+([A-Za-z0-9_<>,\s]+))?\s*\{/gm, (match, p1, p2) => {
    return p2 ? `export type ${p1} = ${p2.trim()} & {` : `export type ${p1} = {`;
  });
  finalContent = finalContent.replace(/^interface\s+([A-Za-z0-9_]+)\s*(?:extends\s+([A-Za-z0-9_<>,\s]+))?\s*\{/gm, (match, p1, p2) => {
    return p2 ? `type ${p1} = ${p2.trim()} & {` : `type ${p1} = {`;
  });

  await fs.writeFile(filepath, finalContent, "utf-8");
  console.log(`Formatted ${filepath}`);
}



async function processPath(targetPath) {
  try {
    const stat = await fs.stat(targetPath);
    if (stat.isFile()) {
      if (ALLOWED_EXTS.includes(path.extname(targetPath))) {
        await formatFile(targetPath);
      }
    } else if (stat.isDirectory()) {
      if (EXCLUDED_DIRS.some(dir => targetPath.includes(`/${dir}`) || targetPath.endsWith(dir))) {
        return;
      }
      const items = await fs.readdir(targetPath);
      for (const item of items) {
        await processPath(path.join(targetPath, item));
      }
    }
  } catch (err) {
    console.error(`Error processing ${targetPath}:`, err.message);
  }
}



const target = process.argv[2] || ".";
console.log(`Running formatter on: ${path.resolve(target)}`);
await processPath(path.resolve(target));
console.log("Formatting complete. Run 'pnpm turbo run lint -- --fix' to polish.");
