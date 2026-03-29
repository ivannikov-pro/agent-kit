import {
 mkdir, writeFile, rm, readdir, stat
} from "node:fs/promises";
import { join } from "node:path";



export async function ensureDir(dirPath: string): Promise<void> {
  await mkdir(dirPath, { recursive: true });
}


export async function writeFileContent(
  filePath: string,
  content: string,
): Promise<void> {
  await writeFile(filePath, content, "utf-8");
}


export async function removeDir(dirPath: string): Promise<void> {
  await rm(dirPath, { recursive: true, force: true });
}


export async function dirExists(dirPath: string): Promise<boolean> {
  try {
    const s = await stat(dirPath);

    return s.isDirectory();
  } catch {
    return false;
  }
}


export async function fileExists(filePath: string): Promise<boolean> {
  try {
    const s = await stat(filePath);

    return s.isFile();
  } catch {
    return false;
  }
}


export async function listSubdirs(dirPath: string): Promise<string[]> {
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });

    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
}


export function getSkillsDir(
  projectRoot: string,
  global = false,
): string {
  if (global) {
    const home = process.env.HOME || process.env.USERPROFILE || "~";

    return join(home, ".agents", "skills");
  }

  return join(projectRoot, ".agents", "skills");
}


export function getWorkflowsDir(
  projectRoot: string,
  global = false,
): string {
  if (global) {
    const home = process.env.HOME || process.env.USERPROFILE || "~";

    return join(home, ".agents", "workflows");
  }

  return join(projectRoot, ".agents", "workflows");
}
