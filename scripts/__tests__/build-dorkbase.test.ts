import { describe, it, expect } from "vitest";
import path from "node:path";

const { cleanText, parseMarkdownContent } = require("../build-dorkbase.js");

describe("build-dorkbase parsing", () => {
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
    function parseMarkdown(content: string) {
      const filePath = path.join(
        process.cwd(),
        "docs",
        "dork-packs",
        "test-pack.md",
      );
      return parseMarkdownContent(content, filePath);
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
