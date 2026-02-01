#!/usr/bin/env node
/**
 * Cross-platform link checker script.
 * Uses fast-glob instead of Unix-only find/xargs commands.
 */

const { execSync, spawn } = require("child_process");
const fg = require("fast-glob");
const path = require("path");

const EXCLUDED_DIRS = ["node_modules", "archive", ".git", "dist", ".vitepress/cache"];

async function checkLinks() {
  console.log("Finding markdown files...");

  const files = await fg("**/*.md", {
    ignore: EXCLUDED_DIRS.map((dir) => `${dir}/**`),
    cwd: process.cwd(),
    absolute: true,
  });

  if (files.length === 0) {
    console.log("No markdown files found.");
    return;
  }

  console.log(`Found ${files.length} markdown files. Checking links...\n`);

  let hasErrors = false;

  for (const file of files) {
    const relativePath = path.relative(process.cwd(), file);
    try {
      execSync(`npx markdown-link-check --quiet "${file}"`, {
        stdio: "pipe",
        encoding: "utf-8",
      });
      // Success - no output needed for quiet mode
    } catch (error) {
      // markdown-link-check exits with non-zero if links are broken
      hasErrors = true;
      console.log(`\n${relativePath}:`);
      if (error.stdout) {
        console.log(error.stdout);
      }
      if (error.stderr) {
        console.error(error.stderr);
      }
    }
  }

  if (hasErrors) {
    console.log("\nSome links are broken. See above for details.");
    process.exit(1);
  } else {
    console.log("All links are valid!");
  }
}

checkLinks().catch((err) => {
  console.error("Error running link checker:", err);
  process.exit(1);
});
