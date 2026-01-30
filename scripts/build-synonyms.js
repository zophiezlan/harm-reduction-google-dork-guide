const fs = require("fs");
const path = require("path");

const SYNONYM_FILE = path.join(__dirname, "../docs/05-synonym-blocks.md");
const OUTPUT_FILE = path.join(__dirname, "../docs/.vitepress/theme/data/synonyms.ts");

function extractSynonymGroups() {
  const content = fs.readFileSync(SYNONYM_FILE, "utf-8");
  const lines = content.split("\n");

  const groups = [];
  let currentGroup = null;
  let captureCode = false;
  let codeBuffer = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // H2 or H3 headers = new group name
    if (trimmed.match(/^##+ .+/)) {
      if (currentGroup && currentGroup.terms.length > 0) {
        groups.push(currentGroup);
      }
      const name = trimmed
        .replace(/^#+\s*/, "")
        .replace(/🌏|🚨|💉|👥|💊|🔬|🧪|🏥|🎪|👩‍⚕️|📊|🏠|🧠|👶|👨‍👩‍👧|🖤💛❤️|⚖️|📋|🔄|📅|🔧/g, "")
        .trim();
      currentGroup = {
        id: name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/-+$/, ""),
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
          const pattern = codeBuffer.join(" ").trim();
          // Extract individual terms from OR pattern
          const terms = pattern
            .replace(/^\(|\)$/g, "")
            .split(/\s+OR\s+/i)
            .map((t) => t.replace(/^["']|["']$/g, "").trim())
            .filter((t) => t.length > 0 && !t.includes("site:") && !t.includes("filetype:"));

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
  if (currentGroup && currentGroup.terms.length > 0) {
    groups.push(currentGroup);
  }

  return groups.filter((g) => g.terms.length > 0);
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
