#!/usr/bin/env node
/**
 * Post-extraction pipeline: SVG → React TSX components
 *
 * Converts raw SVG files from Figma into importable React components
 * using @svgr/cli, then cleans up the unused React import that SVGR adds.
 *
 * Usage:
 *   node svg-to-react.mjs [--svg-dir path] [--out-dir path]
 *
 * Defaults (configurable below or via CLI args):
 *   --svg-dir  ./exports/icons
 *   --out-dir  ./icons
 *
 * Prerequisites:
 *   npm install -D @svgr/cli
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

// ── Parse CLI args ──────────────────────────────────────────
const args = process.argv.slice(2);
function getArg(name, fallback) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && args[idx + 1] ? resolve(args[idx + 1]) : fallback;
}

const SVG_DIR = getArg("svg-dir", resolve("exports/icons"));
const OUT_DIR = getArg("out-dir", resolve("icons"));

if (!existsSync(SVG_DIR)) {
  console.error(`❌ SVG directory not found: ${SVG_DIR}`);
  console.error(`   Run extract_figma.py first, or pass --svg-dir <path>`);
  process.exit(1);
}

console.log("🔄 Converting SVGs → React TSX...");
console.log(`   Source: ${SVG_DIR}`);
console.log(`   Output: ${OUT_DIR}`);
console.log();

// Step 1: Run SVGR
try {
  execSync(
    `npx @svgr/cli --typescript --out-dir "${OUT_DIR}" "${SVG_DIR}"`,
    { stdio: "inherit" }
  );
} catch (e) {
  console.error("❌ SVGR failed. Is @svgr/cli installed? Run: npm install -D @svgr/cli");
  process.exit(1);
}

// Step 2: Remove unused `import * as React from 'react'` (causes TS6133)
const files = readdirSync(OUT_DIR).filter((f) => f.endsWith(".tsx"));
let fixed = 0;
for (const f of files) {
  const path = join(OUT_DIR, f);
  const content = readFileSync(path, "utf8");
  const updated = content.replace(
    /import \* as React from ['"]react['"];\n/g,
    ""
  );
  if (updated !== content) {
    writeFileSync(path, updated);
    fixed++;
  }
}

console.log();
console.log(`✅ Done! ${files.length} components generated, ${fixed} cleaned up.`);
console.log();
console.log("📋 Next steps:");
console.log("   1. Export each icon from an index.ts barrel file");
console.log("   2. Build your UI package");
console.log("   3. Import components: import { IconName } from '@your-org/ui'");
