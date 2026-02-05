#!/usr/bin/env node
/**
 * Enhanced Dork Extraction System
 *
 * Extracts dorks from ALL markdown files in the documentation,
 * including rich metadata like difficulty, operators, domains, and tags.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const fg = require("fast-glob");

// =============================================================================
// CONFIGURATION
// =============================================================================

const DOCS_DIR = path.join(__dirname, "../docs");
const OUTPUT_FILE = path.join(__dirname, "../tools/dork-explorer/dork-data.js");
const OUTPUT_JSON = path.join(__dirname, "../tools/dork-explorer/dork-data.json");
const OUTPUT_INTEGRITY = path.join(__dirname, "../tools/dork-explorer/dork-data-integrity.json");

// Source type mappings based on file path
const SOURCE_TYPE_MAP = {
  "dork-packs/": "dork-pack",
  "workflows/": "workflow",
  "tools/": "tool",
  "resources/": "resource",
  "templates/": "template",
};

// Difficulty indicators in section headers
const DIFFICULTY_INDICATORS = {
  "🟢": "beginner",
  "⚡": "beginner",
  Basic: "beginner",
  "Quick Start": "beginner",
  "🟡": "intermediate",
  Intermediate: "intermediate",
  "🔴": "advanced",
  Advanced: "advanced",
  Expert: "expert",
  Investigative: "expert",
};

// All recognized Google search operators
const DORK_OPERATORS = [
  "site",
  "filetype",
  "ext",
  "intitle",
  "allintitle",
  "inurl",
  "allinurl",
  "intext",
  "allintext",
  "inanchor",
  "allinanchor",
  "after",
  "before",
  "daterange",
  "cache",
  "related",
  "info",
  "link",
  "define",
  "source",
  "location",
  "weather",
  "stocks",
  "map",
  "imagesize",
  "AROUND",
];

// Domain category patterns
const DOMAIN_CATEGORIES = {
  government: /\.gov\.|government|legislation/i,
  health: /health\.|\.health\./i,
  education: /\.edu\.|university|academic/i,
  research: /research|journal|pubmed|scholar/i,
  ngo: /\.org\.|ngo|nonprofit/i,
  news: /news|herald|times|abc\.net/i,
  community: /reddit|forum|community|discourse/i,
  international: /who\.int|unodc|emcdda/i,
  "user-hosted": /notion|gitbook|wordpress|medium|substack|github/i,
};

// Content type patterns
const CONTENT_TYPE_MAP = {
  pdf: /filetype:pdf/i,
  doc: /filetype:(doc|docx)/i,
  xls: /filetype:(xls|xlsx|csv)/i,
  ppt: /filetype:(ppt|pptx)/i,
  news: /source:|location:/i,
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Generate a unique ID from pack ID and title
 */
function generateId(packId, title) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${packId}-${slug}`;
}

/**
 * Extract operators used in a query
 */
function extractOperators(query) {
  const operators = [];
  for (const op of DORK_OPERATORS) {
    const regex = new RegExp(`\\b${op}:`, "i");
    if (regex.test(query)) {
      operators.push(op.toLowerCase());
    }
  }
  // Check for AROUND(n)
  if (/AROUND\s*\(\s*\d+\s*\)/i.test(query)) {
    operators.push("AROUND");
  }
  return [...new Set(operators)];
}

/**
 * Extract domains targeted by site: operators
 */
function extractDomains(query) {
  const domains = [];
  const siteMatches = query.matchAll(/site:([^\s"()]+)/gi);
  for (const match of siteMatches) {
    domains.push(match[1].replace(/^\*\.?/, ""));
  }
  return [...new Set(domains)];
}

/**
 * Detect domain category from query
 */
function detectDomainCategory(query) {
  for (const [category, pattern] of Object.entries(DOMAIN_CATEGORIES)) {
    if (pattern.test(query)) {
      return category;
    }
  }
  return "any";
}

/**
 * Detect content type from query
 */
function detectContentType(query) {
  for (const [type, pattern] of Object.entries(CONTENT_TYPE_MAP)) {
    if (pattern.test(query)) {
      return type;
    }
  }
  return "any";
}

/**
 * Detect difficulty from section header
 */
function detectDifficulty(categoryName) {
  for (const [indicator, level] of Object.entries(DIFFICULTY_INDICATORS)) {
    if (categoryName.includes(indicator)) {
      return level;
    }
  }
  return "intermediate"; // Default
}

/**
 * Extract tags from query content
 */
function extractTags(query, title, category) {
  const tags = [];

  // Add category-based tags
  if (/alert|warning|notification/i.test(query + title)) tags.push("alerts");
  if (/pdf|document|report/i.test(query + title)) tags.push("documents");
  if (/peer|lived experience|consumer/i.test(query + title)) tags.push("peer");
  if (/research|study|evidence/i.test(query + title)) tags.push("research");
  if (/policy|strategy|framework/i.test(query + title)) tags.push("policy");
  if (/service|program|clinic/i.test(query + title)) tags.push("services");
  if (/training|workforce|education/i.test(query + title)) tags.push("training");
  if (/data|statistics|mortality/i.test(query + title)) tags.push("data");
  if (/international|global|who\./i.test(query)) tags.push("international");
  if (/australia|\.au\b/i.test(query)) tags.push("australia");

  return [...new Set(tags)];
}

/**
 * Clean text by removing blockquote prefixes and trimming
 */
function cleanText(text) {
  return text ? text.replace(/^>\s*/, "").trim() : "";
}

/**
 * Clean category name by removing emojis and extra whitespace
 */
function cleanCategory(category) {
  return category
    .replace(/[🟢🟡🔴⚡📊🔬🏛️🎓💊📍🔗🌏🏘️🔔]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Detect source type from file path
 */
function detectSourceType(filePath) {
  for (const [pathPart, type] of Object.entries(SOURCE_TYPE_MAP)) {
    if (filePath.includes(pathPart)) {
      return type;
    }
  }
  return "documentation";
}

/**
 * Check if a code block contains a valid dork query
 */
function isValidDorkQuery(query) {
  if (!query || query.length < 5) return false;

  // Skip markdown tables
  if (query.includes("| ") && query.includes(" |")) return false;

  // Skip JavaScript/code
  if (/^(const|let|var|function|import|export|class|if|for|while)\b/.test(query)) return false;

  // Skip JSON
  if (/^\s*[{[]/.test(query)) return false;

  // Skip shell commands (but allow dorks that happen to start with these)
  if (/^(npm|yarn|git|cd|mkdir|rm|cp|mv)\s/.test(query)) return false;

  // Should contain at least one dork-like pattern
  const dorkPatterns = [
    /site:/i,
    /filetype:/i,
    /intitle:/i,
    /inurl:/i,
    /intext:/i,
    /after:/i,
    /before:/i,
    /\bOR\b/,
    /AROUND\s*\(/i,
    /"[^"]+"/,
    /\*.gov/i,
    /\*.edu/i,
  ];

  return dorkPatterns.some((pattern) => pattern.test(query));
}

// =============================================================================
// MARKDOWN PARSING
// =============================================================================

/**
 * Parse markdown content and extract dorks
 */
function parseMarkdownContent(content, filePath) {
  const lines = content.split("\n");
  const relativePath = path.relative(DOCS_DIR, filePath).replace(/\\/g, "/");
  const sourceType = detectSourceType(relativePath);
  const packId = path.basename(filePath, ".md");

  const result = {
    id: packId,
    title: "",
    description: "",
    dorks: [],
    sourceFile: relativePath,
    sourceType,
  };

  let currentCategory = "General";
  let currentDifficulty = "intermediate";
  let currentDork = null;
  let captureCode = false;
  let codeBuffer = [];
  let captureExplanation = false;
  let explanationBuffer = [];
  let lineNumber = 0;

  for (let i = 0; i < lines.length; i++) {
    lineNumber = i + 1;
    const rawLine = lines[i];
    const line = rawLine.trim();

    // 1. Pack Title (H1)
    if (line.startsWith("# ") && !result.title) {
      result.title = line.replace("# ", "").trim();

      // Look for description (blockquote after title)
      let nextIdx = i + 1;
      while (nextIdx < lines.length && lines[nextIdx].trim() === "") nextIdx++;
      if (nextIdx < lines.length && lines[nextIdx].startsWith("> ")) {
        result.description = cleanText(lines[nextIdx]);
      }
      continue;
    }

    // 2. Category (H2)
    if (line.startsWith("## ") && !line.startsWith("### ")) {
      // Save previous dork if exists
      if (currentDork) {
        if (explanationBuffer.length > 0) {
          currentDork.explanation = explanationBuffer.join("\n").trim();
        }
        if (isValidDorkQuery(currentDork.query)) {
          result.dorks.push(enrichDork(currentDork, packId));
        }
        currentDork = null;
        explanationBuffer = [];
      }

      const rawCategory = line.replace("## ", "").trim();
      currentCategory = cleanCategory(rawCategory);
      currentDifficulty = detectDifficulty(rawCategory);
      captureExplanation = false;
      continue;
    }

    // 3. Dork Title (H3)
    if (line.startsWith("### ")) {
      // Save previous dork
      if (currentDork) {
        if (explanationBuffer.length > 0) {
          currentDork.explanation = explanationBuffer.join("\n").trim();
        }
        if (isValidDorkQuery(currentDork.query)) {
          result.dorks.push(enrichDork(currentDork, packId));
        }
        explanationBuffer = [];
      }

      currentDork = {
        title: line.replace("### ", "").trim(),
        category: currentCategory,
        query: "",
        explanation: "",
        difficulty: currentDifficulty,
        sourceFile: relativePath,
        sourceType,
        sourceLine: lineNumber,
      };
      captureExplanation = false;
      continue;
    }

    // 4. Code Block
    if (line.startsWith("```")) {
      if (!captureCode) {
        // Starting code block
        captureCode = true;
        codeBuffer = [];
      } else {
        // Ending code block
        captureCode = false;
        const query = codeBuffer.join("\n").trim();

        if (currentDork) {
          // Attach to current dork
          currentDork.query = query;
          captureExplanation = true;
        } else if (isValidDorkQuery(query)) {
          // Standalone code block - create anonymous dork
          const standaloneTitle = generateStandaloneTitle(query, result.dorks.length + 1);
          currentDork = {
            title: standaloneTitle,
            category: currentCategory,
            query: query,
            explanation: "",
            difficulty: currentDifficulty,
            sourceFile: relativePath,
            sourceType,
            sourceLine: lineNumber - codeBuffer.length,
          };
          captureExplanation = true;
        }
      }
      continue;
    }

    if (captureCode) {
      codeBuffer.push(rawLine);
      continue;
    }

    // 5. Explanation text
    if (captureExplanation && currentDork) {
      // Stop at next header or horizontal rule
      if (line.startsWith("#") || line.startsWith("---")) {
        captureExplanation = false;
        i--; // Re-process this line
        continue;
      }

      // Skip empty lines at start
      if (explanationBuffer.length === 0 && line === "") continue;

      // Skip navigation links
      if (line.includes("[← Back to")) continue;
      if (/\[.*Run.*Search.*\]\(/.test(line)) continue;

      explanationBuffer.push(line);
    }
  }

  // Push last dork
  if (currentDork) {
    if (explanationBuffer.length > 0) {
      currentDork.explanation = explanationBuffer.join("\n").trim();
    }
    if (isValidDorkQuery(currentDork.query)) {
      result.dorks.push(enrichDork(currentDork, packId));
    }
  }

  return result;
}

/**
 * Parse a markdown file and extract dorks
 */
function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  return parseMarkdownContent(content, filePath);
}

/**
 * Generate a title for standalone code blocks without headers
 */
function generateStandaloneTitle(query, index) {
  // Try to generate a meaningful title from the query
  const siteMatch = query.match(/site:([^\s]+)/i);
  const filetypeMatch = query.match(/filetype:(\w+)/i);

  if (siteMatch) {
    const domain = siteMatch[1].replace(/^\*\.?/, "");
    return `Search ${domain}`;
  }
  if (filetypeMatch) {
    return `Find ${filetypeMatch[1].toUpperCase()} files`;
  }
  return `Query ${index}`;
}

/**
 * Enrich a dork with extracted metadata
 */
function enrichDork(dork, packId) {
  const query = dork.query;

  return {
    id: generateId(packId, dork.title),
    ...dork,
    operators: extractOperators(query),
    targetDomains: extractDomains(query),
    domainCategory: detectDomainCategory(query),
    contentType: detectContentType(query),
    tags: extractTags(query, dork.title, dork.category),
  };
}

// =============================================================================
// MARKDOWN TABLE PARSING
// =============================================================================

/**
 * Extract dorks from markdown tables
 */
function extractDorksFromTables(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const relativePath = path.relative(DOCS_DIR, filePath).replace(/\\/g, "/");
  const packId = path.basename(filePath, ".md");
  const dorks = [];

  let inTable = false;
  let headerRow = null;
  let queryColumnIndex = -1;
  let descColumnIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detect table header
    if (line.startsWith("|") && line.endsWith("|")) {
      const cells = line
        .split("|")
        .map((c) => c.trim())
        .filter((c) => c);

      if (!inTable) {
        // Check if this is a header row with Query column
        const lowerCells = cells.map((c) => c.toLowerCase());
        queryColumnIndex = lowerCells.findIndex(
          (c) => c.includes("query") || c.includes("dork") || c.includes("search")
        );
        descColumnIndex = lowerCells.findIndex(
          (c) => c.includes("description") || c.includes("purpose") || c.includes("what")
        );

        if (queryColumnIndex !== -1) {
          inTable = true;
          headerRow = cells;
        }
      } else {
        // Skip separator row
        if (line.includes("---")) continue;

        // Extract query from data row
        if (queryColumnIndex !== -1 && cells[queryColumnIndex]) {
          let query = cells[queryColumnIndex];
          // Remove inline code formatting
          query = query.replace(/`/g, "").trim();

          if (isValidDorkQuery(query)) {
            const title =
              descColumnIndex !== -1 && cells[descColumnIndex]
                ? cells[descColumnIndex].replace(/`/g, "").trim()
                : generateStandaloneTitle(query, dorks.length + 1);

            dorks.push(
              enrichDork(
                {
                  title,
                  category: "Reference Table",
                  query,
                  explanation: "",
                  difficulty: "intermediate",
                  sourceFile: relativePath,
                  sourceType: detectSourceType(relativePath),
                  sourceLine: i + 1,
                },
                packId
              )
            );
          }
        }
      }
    } else {
      // End of table
      inTable = false;
      queryColumnIndex = -1;
    }
  }

  return dorks;
}

// =============================================================================
// MAIN PROCESSING
// =============================================================================

async function processFiles() {
  console.log("🔍 Scanning for markdown files...\n");

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Find all markdown files
  const files = await fg("**/*.md", {
    cwd: DOCS_DIR,
    ignore: ["**/README.md", "**/node_modules/**"],
    absolute: true,
  });

  // Also include dork-packs README
  const packReadme = path.join(DOCS_DIR, "dork-packs/README.md");
  if (fs.existsSync(packReadme) && !files.includes(packReadme)) {
    files.push(packReadme);
  }

  console.log(`📁 Found ${files.length} markdown files\n`);

  const database = {
    packs: [],
    documentationDorks: [],
    meta: {
      buildDate: new Date().toISOString(),
      version: "2.0.0",
      totalDorks: 0,
      sourceFiles: [],
    },
  };

  // Track stats
  const stats = {
    bySourceType: {},
    byDifficulty: {},
    byOperator: {},
  };

  for (const file of files) {
    const relativePath = path.relative(DOCS_DIR, file).replace(/\\/g, "/");

    // Parse the file
    const result = parseMarkdownFile(file);

    // Also extract from tables
    const tableDorks = extractDorksFromTables(file);
    result.dorks.push(...tableDorks);

    if (result.dorks.length === 0) continue;

    database.meta.sourceFiles.push(relativePath);

    // Categorize by source type
    if (relativePath.startsWith("dork-packs/")) {
      database.packs.push({
        id: result.id,
        title: result.title || result.id,
        description: result.description,
        dorks: result.dorks,
        sourceFile: relativePath,
      });
    } else {
      // Documentation dorks
      database.documentationDorks.push(...result.dorks);
    }

    // Update stats
    for (const dork of result.dorks) {
      stats.bySourceType[dork.sourceType] = (stats.bySourceType[dork.sourceType] || 0) + 1;
      stats.byDifficulty[dork.difficulty] = (stats.byDifficulty[dork.difficulty] || 0) + 1;
      for (const op of dork.operators || []) {
        stats.byOperator[op] = (stats.byOperator[op] || 0) + 1;
      }
    }
  }

  // Calculate totals
  const packDorkCount = database.packs.reduce((sum, p) => sum + p.dorks.length, 0);
  const docDorkCount = database.documentationDorks.length;
  database.meta.totalDorks = packDorkCount + docDorkCount;

  // ==========================================================================
  // OUTPUT: JavaScript (for browser)
  // ==========================================================================

  // Legacy format for backwards compatibility
  const legacyFormat = database.packs.map((pack) => ({
    id: pack.id,
    title: pack.title,
    description: pack.description,
    dorks: pack.dorks.map((d) => ({
      title: d.title,
      category: d.category,
      query: d.query,
      explanation: d.explanation,
      // Enhanced fields
      id: d.id,
      difficulty: d.difficulty,
      operators: d.operators,
      targetDomains: d.targetDomains,
      domainCategory: d.domainCategory,
      contentType: d.contentType,
      tags: d.tags,
      sourceFile: d.sourceFile,
      sourceType: d.sourceType,
    })),
  }));

  const jsOutput = `// Auto-generated dork database
// Built: ${database.meta.buildDate}
// Version: ${database.meta.version}
// Total Dorks: ${database.meta.totalDorks}

window.DORK_DATA = ${JSON.stringify(legacyFormat, null, 2)};

window.DORK_DOCUMENTATION = ${JSON.stringify(database.documentationDorks, null, 2)};

window.DORK_META = ${JSON.stringify(database.meta, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, jsOutput);

  // ==========================================================================
  // OUTPUT: Integrity Hash (for SRI validation)
  // ==========================================================================

  const hash = crypto.createHash("sha384").update(jsOutput).digest("base64");
  const integrityValue = `sha384-${hash}`;
  const integrityData = {
    integrity: integrityValue,
    buildDate: database.meta.buildDate,
    version: database.meta.version,
  };
  fs.writeFileSync(OUTPUT_INTEGRITY, JSON.stringify(integrityData, null, 2));

  // ==========================================================================
  // OUTPUT: JSON (for tooling)
  // ==========================================================================

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(database, null, 2));

  // ==========================================================================
  // SUMMARY
  // ==========================================================================

  console.log("✅ Dork extraction complete!\n");
  console.log("📊 STATISTICS:");
  console.log("─".repeat(50));
  console.log(`   Total Dorks:        ${database.meta.totalDorks}`);
  console.log(`   From Dork Packs:    ${packDorkCount} (${database.packs.length} packs)`);
  console.log(`   From Documentation: ${docDorkCount}`);
  console.log("");
  console.log("   By Source Type:");
  for (const [type, count] of Object.entries(stats.bySourceType)) {
    console.log(`     - ${type}: ${count}`);
  }
  console.log("");
  console.log("   By Difficulty:");
  for (const [diff, count] of Object.entries(stats.byDifficulty)) {
    console.log(`     - ${diff}: ${count}`);
  }
  console.log("");
  console.log("   Top Operators:");
  const sortedOps = Object.entries(stats.byOperator)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  for (const [op, count] of sortedOps) {
    console.log(`     - ${op}: ${count}`);
  }
  console.log("");
  console.log("📁 Output Files:");
  console.log(`   ${OUTPUT_FILE}`);
  console.log(`   ${OUTPUT_JSON}`);
}

if (require.main === module) {
  processFiles().catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
}

module.exports = {
  cleanText,
  cleanCategory,
  generateId,
  generateStandaloneTitle,
  extractOperators,
  extractDomains,
  detectDomainCategory,
  detectContentType,
  detectDifficulty,
  extractTags,
  isValidDorkQuery,
  parseMarkdownContent,
  parseMarkdownFile,
  extractDorksFromTables,
};
