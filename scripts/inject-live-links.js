const fs = require("fs");
const path = require("path");

const DORK_PACKS_DIR = path.join(__dirname, "../docs/dork-packs");

const processFiles = () => {
  const files = fs
    .readdirSync(DORK_PACKS_DIR)
    .filter((file) => file.endsWith(".md") && file !== "README.md");
  let totalInjections = 0;

  console.log(`Scanning ${files.length} files for dork blocks...`);

  files.forEach((file) => {
    const filePath = path.join(DORK_PACKS_DIR, file);
    let content = fs.readFileSync(filePath, "utf-8");
    const originalContent = content;

    // Regex to find code blocks.
    // We look for ```txt ... ``` blocks.
    // We need to capture the content to encode it.
    const codeBlockRegex = /```txt\r?\n([\s\S]*?)\r?\n```/g;

    content = content.replace(codeBlockRegex, (match, code) => {
      // Check if it's a dork (contains site: or intitle: or other operators, or is just a search query)
      // Most in these files are dorks.
      // But we should check if the NEXT line is already a link.
      // Regex replace doesn't easily let us peek ahead in a way that prevents double insertion
      // if we just replace the block.
      // So we will replace the block with "Block + Link".

      // Clean code for URL
      const query = code.trim();

      // If it looks like a table row (contains pipes), skip it
      if (query.includes("|") && query.includes("site:")) return match;

      const encodedQuery = encodeURIComponent(query);
      const linkMarkdown = `\n[🔍 **Run this search**](https://google.com/search?q=${encodedQuery})`;

      // We need to return the match + link.
      // But wait, if we run this script twice, it will add the link twice.
      // So we need a safer approach.
      return match;
    });

    // The regex replace above didn't actually change anything because I returned match.
    // I need to split the file and rebuild it to safely check "next lines".

    const lines = originalContent.split("\n");
    let newLines = [];
    let modified = false;

    for (let i = 0; i < lines.length; i++) {
      newLines.push(lines[i]);

      // If we just pushed the closing of a code block
      if (lines[i].trim() === "```") {
        // Check if it was a ```txt block start earlier
        // Backtrack to find start
        let isTxtBlock = false;
        let codeLines = [];
        for (let j = i - 1; j >= 0; j--) {
          if (lines[j].trim().startsWith("```txt")) {
            isTxtBlock = true;
            break;
          }
          if (lines[j].trim().startsWith("```")) break; // nested or other block
          codeLines.unshift(lines[j]);
        }

        if (isTxtBlock) {
          // It was a txt block.
          const query = codeLines.join("\n").trim();

          // Skip tables or complex multi-line visual structures that aren't pure dorks
          if (query.includes("| State |") || query.includes("-------")) continue;

          // Check if a link already exists in the next few non-empty lines
          let hasExistingLink = false;
          for (let k = i + 1; k < Math.min(lines.length, i + 5); k++) {
            const candidate = (lines[k] || "").trim();
            if (candidate === "") continue;

            if (
              /\[[^\]]*\]\(https?:\/\/(www\.)?google\.[^\s)]+\/search\?q=/i.test(candidate) ||
              /run this search/i.test(candidate) ||
              /google\.com\/search\?q=/i.test(candidate)
            ) {
              hasExistingLink = true;
            }

            break;
          }

          if (hasExistingLink) continue;

          // Inject link
          const encodedQuery = encodeURIComponent(query);
          const link = `[👉 **Run this Search**](https://www.google.com/search?q=${encodedQuery})`;
          newLines.push(link);
          totalInjections++;
          modified = true;
        }
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, newLines.join("\n"));
      console.log(`Updated ${file}`);
    }
  });

  console.log(`\nOperation complete. Injected ${totalInjections} live links.`);
};

processFiles();
