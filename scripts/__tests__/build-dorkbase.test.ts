import { describe, it, expect } from "vitest";

// We'll test the parsing logic by extracting it into a testable function
// First, let's test the cleanText helper and document parsing

describe("build-dorkbase parsing", () => {
  const cleanText = (text) => (text ? text.replace(/^> /, "").trim() : "");

  describe("cleanText helper", () => {
    it("removes blockquote prefix", () => {
      expect(cleanText("> This is a blockquote")).toBe("This is a blockquote");
    });

    it("trims whitespace", () => {
      expect(cleanText("  text with spaces  ")).toBe("text with spaces");
    });

    it("handles empty string", () => {
      expect(cleanText("")).toBe("");
    });

    it("handles null/undefined", () => {
      expect(cleanText(null)).toBe("");
      expect(cleanText(undefined)).toBe("");
    });
  });

  describe("markdown parsing logic", () => {
    function parseMarkdown(content) {
      const lines = content.split("\n");
      let currentPack = {
        id: "test-pack",
        title: "",
        description: "",
        dorks: [],
      };

      let currentCategory = "General";
      let currentDork = null;
      let captureCode = false;
      let codeBuffer = [];
      let captureExplanation = false;
      let explanationBuffer = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Pack title
        if (line.startsWith("# ") && !currentPack.title) {
          currentPack.title = line.replace("# ", "").trim();
          let nextLineIdx = i + 1;
          while (nextLineIdx < lines.length && lines[nextLineIdx].trim() === "") nextLineIdx++;
          if (nextLineIdx < lines.length && lines[nextLineIdx].startsWith("> ")) {
            currentPack.description = cleanText(lines[nextLineIdx]);
          }
          continue;
        }

        // Categories (H2)
        if (line.startsWith("## ") && !line.startsWith("### ")) {
          if (currentDork) {
            if (explanationBuffer.length > 0)
              currentDork.explanation = explanationBuffer.join("\n").trim();
            currentPack.dorks.push(currentDork);
            currentDork = null;
            captureExplanation = false;
            explanationBuffer = [];
          }
          currentCategory = line
            .replace("## ", "")
            .replace(/🟢|🟡|🔴|⚡|📊|🔬|🏛️|🎓|💊|📍|🔗|🌏|alert/g, "")
            .trim();
          continue;
        }

        // Dork Title (H3)
        if (line.startsWith("### ")) {
          if (currentDork) {
            if (explanationBuffer.length > 0)
              currentDork.explanation = explanationBuffer.join("\n").trim();
            currentPack.dorks.push(currentDork);
            explanationBuffer = [];
          }

          currentDork = {
            title: line.replace("### ", "").trim(),
            category: currentCategory,
            query: "",
            explanation: "",
          };
          captureExplanation = false;
          continue;
        }

        // Code blocks
        if (line.startsWith("```")) {
          if (!captureCode) {
            if (currentDork) {
              captureCode = true;
              codeBuffer = [];
            }
          } else {
            captureCode = false;
            if (currentDork) {
              currentDork.query = codeBuffer.join("\n").trim();
              captureExplanation = true;
            }
          }
          continue;
        }

        if (captureCode) {
          codeBuffer.push(lines[i]);
          continue;
        }

        // Explanation text
        if (captureExplanation && currentDork) {
          if (line.startsWith("#") || line.startsWith("---")) {
            captureExplanation = false;
            i--;
            continue;
          }
          if (explanationBuffer.length === 0 && line === "") continue;
          if (line.includes("[← Back to")) continue;
          explanationBuffer.push(line);
        }
      }

      if (currentDork) {
        if (explanationBuffer.length > 0)
          currentDork.explanation = explanationBuffer.join("\n").trim();
        currentPack.dorks.push(currentDork);
      }

      return currentPack;
    }

    it("extracts pack title and description", () => {
      const content = `# Test Pack Title

> This is the pack description.

## Basic Queries

### First Dork

\`\`\`txt
site:example.com "test"
\`\`\`

This explains the dork.
`;

      const result = parseMarkdown(content);
      expect(result.title).toBe("Test Pack Title");
      expect(result.description).toBe("This is the pack description.");
    });

    it("extracts dorks with categories", () => {
      const content = `# Test Pack

## 🟢 Basic Queries

### First Dork

\`\`\`txt
site:example.com
\`\`\`

## 🔴 Advanced Queries

### Second Dork

\`\`\`txt
site:advanced.com
\`\`\`
`;

      const result = parseMarkdown(content);
      expect(result.dorks).toHaveLength(2);
      expect(result.dorks[0].category).toBe("Basic Queries");
      expect(result.dorks[1].category).toBe("Advanced Queries");
    });

    it("captures multiline code blocks", () => {
      const content = `# Test

## Category

### Multi-line Query

\`\`\`txt
site:example.com
  OR site:other.com
  filetype:pdf
\`\`\`
`;

      const result = parseMarkdown(content);
      expect(result.dorks[0].query).toContain("site:example.com");
      expect(result.dorks[0].query).toContain("OR site:other.com");
    });

    it("captures explanation text after code block", () => {
      const content = `# Test

## Category

### Query With Explanation

\`\`\`txt
site:example.com
\`\`\`

**Why this works:**
- First reason
- Second reason
`;

      const result = parseMarkdown(content);
      expect(result.dorks[0].explanation).toContain("Why this works");
      expect(result.dorks[0].explanation).toContain("First reason");
    });

    it("ignores back-to links in explanation", () => {
      const content = `# Test

## Category

### Query

\`\`\`txt
site:example.com
\`\`\`

This is the explanation.

[← Back to Dork Packs](README.md)
`;

      const result = parseMarkdown(content);
      expect(result.dorks[0].explanation).not.toContain("Back to");
    });

    it("handles empty packs", () => {
      const content = `# Empty Pack

> Description only, no dorks.
`;

      const result = parseMarkdown(content);
      expect(result.title).toBe("Empty Pack");
      expect(result.dorks).toHaveLength(0);
    });
  });
});
