#!/usr/bin/env node
/**
 * Sort Markdown table body rows alphabetically by the first column.
 *
 * Modes:
 *   --write   (default) writes changes to disk
 *   --check   prints files that would change and exits 1 if any would change
 *
 * Notes:
 * - Ignores tables inside fenced code blocks (``` / ~~~).
 * - Sort is stable: ties keep original order.
 */

const fg = require("fast-glob");
const fs = require("fs/promises");

const args = process.argv.slice(2);
const mode = args.includes("--check") ? "check" : "write";

function isFence(line) {
  // ``` or ~~~ fences (any length >=3)
  return /^\s*(```+|~~~+)\s*/.test(line);
}

function isTableSeparator(line) {
  // matches: | --- | :---: | ---: | --- |
  return /^\s*\|?\s*(:?\-+:?\s*\|\s*)+:?\-+:?\s*$/.test(line);
}

function looksLikeTableRow(line) {
  // basic heuristic: must contain a pipe and not be just whitespace
  return line.includes("|") && line.trim().length > 0;
}

function firstCellKey(row) {
  // drop leading/trailing pipes, split, take first non-empty cell
  const trimmed = row.trim().replace(/^\|/, "").replace(/\|$/, "");
  const cells = trimmed.split("|").map((c) => c.trim());
  const first = cells.find((c) => c.length > 0) || "";
  return first.toLocaleLowerCase();
}

function findTables(lines) {
  const tables = [];
  let i = 0;
  let inFence = false;

  while (i < lines.length) {
    const line = lines[i];

    if (isFence(line)) {
      inFence = !inFence;
      i++;
      continue;
    }

    if (
      !inFence &&
      looksLikeTableRow(lines[i]) &&
      i + 1 < lines.length &&
      isTableSeparator(lines[i + 1])
    ) {
      const start = i;
      let j = i + 2;

      while (j < lines.length) {
        if (isFence(lines[j])) break;
        if (!looksLikeTableRow(lines[j])) break;
        j++;
      }

      const end = j; // exclusive
      tables.push({ start, end });
      i = j;
      continue;
    }

    i++;
  }

  return tables;
}

async function processFile(filePath) {
  const content = await fs.readFile(filePath, "utf8");
  const lines = content.split(/\r?\n/);

  const tables = findTables(lines);
  if (tables.length === 0) return null;

  let changed = false;

  // process from bottom so splices don't shift later indices
  for (let k = tables.length - 1; k >= 0; k--) {
    const { start, end } = tables[k];

    const header = lines[start];
    const sep = lines[start + 1];

    const body = lines.slice(start + 2, end);
    const rows = body.filter((r) => r.trim().length > 0);

    if (rows.length <= 1) continue;

    const parsed = rows.map((row, idx) => ({
      row,
      key: firstCellKey(row),
      idx,
    }));

    const sorted = [...parsed].sort((a, b) => {
      const cmp = a.key.localeCompare(b.key, undefined, { numeric: true });
      if (cmp !== 0) return cmp;
      return a.idx - b.idx; // stable
    });

    const sortedRows = sorted.map((s) => s.row);

    if (rows.join("\n") !== sortedRows.join("\n")) {
      changed = true;

      // Rebuild the table body, preserving blank lines *outside* the table.
      lines.splice(start, end - start, header, sep, ...sortedRows);
    }
  }

  if (!changed) return null;

  const newContent = lines.join("\n");
  if (mode === "write") {
    await fs.writeFile(filePath, newContent, "utf8");
  }

  return filePath;
}

(async () => {
  const patterns = ["**/*.md", "!**/node_modules/**", "!**/.git/**"];
  const files = await fg(patterns, { dot: true });

  const changedFiles = [];

  for (const file of files) {
    try {
      const res = await processFile(file);
      if (res) changedFiles.push(res);
    } catch (err) {
      console.error("Error processing", file, err?.message || String(err));
      process.exitCode = 2;
    }
  }

  if (changedFiles.length === 0) {
    console.log(
      mode === "check"
        ? "No table changes needed."
        : "No table changes needed.",
    );
    process.exit(0);
  }

  if (mode === "check") {
    console.log("Tables are not sorted in:");
    changedFiles.forEach((f) => console.log(" -", f));
    process.exit(1);
  }

  console.log("Updated files:");
  changedFiles.forEach((f) => console.log(" -", f));
  process.exit(0);
})();
