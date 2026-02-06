const fs = require("fs");
const path = require("path");

const SYNONYM_FILE = path.join(__dirname, "../docs/05-synonym-blocks.md");
const OUTPUT_FILE = path.join(
  __dirname,
  "../docs/.vitepress/theme/data/synonyms.ts",
);

/**
 * Extract clean terms from an OR pattern
 * Handles: ("term1" OR "term2") and (term1 OR term2)
 * Also handles compound patterns like: (term1 OR term2) (modifier1 OR modifier2)
 */
function extractTermsFromPattern(pattern) {
  // Only process simple OR patterns that look like synonym blocks
  // Skip complex queries with operators
  if (
    pattern.includes("site:") ||
    pattern.includes("filetype:") ||
    pattern.includes("after:") ||
    pattern.includes("intitle:") ||
    pattern.includes("inurl:")
  ) {
    return [];
  }

  // Find the FIRST parenthetical OR group only
  // This handles patterns like: (term1 OR term2) (modifier1 OR modifier2)
  // We only want the first group of actual synonym terms
  const firstGroupMatch = pattern.match(/\(([^()]+)\)/);
  if (!firstGroupMatch) {
    return [];
  }

  const groupContent = firstGroupMatch[1];

  // Must contain OR to be a synonym group
  if (!/\s+OR\s+/i.test(groupContent)) {
    return [];
  }

  // Split on OR (case insensitive, with surrounding whitespace)
  const terms = groupContent
    .split(/\s+OR\s+/i)
    .map((t) => {
      // Remove quotes and trim
      return t.replace(/^["']|["']$/g, "").trim();
    })
    .filter((t) => {
      // Filter out empty terms, operators, and malformed entries
      return (
        t.length > 0 &&
        t.length < 50 && // Reasonable term length
        !t.includes(":") && // No operators
        !t.includes("\r") && // No carriage returns
        !t.includes("\n") && // No newlines
        !t.includes(")") && // No stray parentheses
        !t.includes("(") &&
        !/^\s*$/.test(t) // Not just whitespace
      );
    });

  return terms;
}

function extractSynonymGroups() {
  const content = fs.readFileSync(SYNONYM_FILE, "utf-8");
  const lines = content.split("\n");

  const groups = [];
  let currentGroup = null;
  let captureCode = false;
  let codeBuffer = [];

  // Skip section headers that aren't actual synonym groups
  const skipSections = new Set([
    "how-to-use-synonym-blocks",
    "example-1-drug-alerts-with-full-synonym-block",
    "example-2-peer-workforce-with-multiple-blocks",
    "example-3-naloxone-treatment-combo",
    "quick-reference",
    "building-your-own-blocks",
    "tips-for-building-custom-blocks",
  ]);

  for (const line of lines) {
    const trimmed = line.trim();

    // H2 or H3 headers = new group name
    if (trimmed.match(/^##+ .+/)) {
      if (currentGroup && currentGroup.terms.length > 1) {
        groups.push(currentGroup);
      }
      const name = trimmed
        .replace(/^#+\s*/, "")
        .replace(/[🌏🚨💉👥💊🔬🧪🏥🎪👩‍⚕️📊🏠🧠👶👨‍👩‍👧🖤💛❤️⚖️📋🔄📅🔧📝✅]/gu, "")
        .trim();

      const id = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      // Skip non-synonym sections
      if (skipSections.has(id)) {
        currentGroup = null;
        continue;
      }

      currentGroup = {
        id,
        name,
        terms: [],
        pattern: "",
      };
      continue;
    }

    // Code blocks contain the synonym pattern
    if (trimmed.startsWith("```")) {
      if (!captureCode) {
        captureCode = true;
        codeBuffer = [];
      } else {
        captureCode = false;
        if (currentGroup && codeBuffer.length > 0) {
          // Join with space, normalize whitespace
          const pattern = codeBuffer.join(" ").replace(/\s+/g, " ").trim();

          const terms = extractTermsFromPattern(pattern);

          if (terms.length > 1) {
            currentGroup.terms = terms;
            currentGroup.pattern = pattern;
          }
        }
      }
      continue;
    }

    if (captureCode) {
      codeBuffer.push(line);
    }
  }

  // Push last group
  if (currentGroup && currentGroup.terms.length > 1) {
    groups.push(currentGroup);
  }

  return groups.filter((g) => g.terms.length > 1);
}

function main() {
  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const groups = extractSynonymGroups();

  const output = `// Auto-generated from 05-synonym-blocks.md
// Do not edit manually

export interface SynonymGroup {
  id: string
  name: string
  terms: string[]
  pattern: string
}

export const SYNONYM_GROUPS: SynonymGroup[] = ${JSON.stringify(groups, null, 2)}

export function findSynonyms(term: string): SynonymGroup | undefined {
  const lower = term.toLowerCase()
  return SYNONYM_GROUPS.find(g =>
    g.terms.some(t => t.toLowerCase().includes(lower) || lower.includes(t.toLowerCase()))
  )
}

export function expandWithSynonyms(term: string): string {
  const group = findSynonyms(term)
  if (!group) return term
  return group.pattern
}
`;

  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`Generated ${groups.length} synonym groups to ${OUTPUT_FILE}`);
}

main();
