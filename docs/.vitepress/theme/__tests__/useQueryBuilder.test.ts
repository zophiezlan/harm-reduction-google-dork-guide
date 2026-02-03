import { describe, it, expect, beforeEach } from "vitest";
import { useQueryBuilder } from "../composables/useQueryBuilder";

describe("useQueryBuilder.loadFromQuery", () => {
  const { blocks, loadFromQuery, clearBlocks, queryString } = useQueryBuilder();

  beforeEach(() => {
    clearBlocks();
  });

  it("parses core operators and keywords", () => {
    const query =
      'site:example.com filetype:pdf after:2023 before:2024 inurl:report "harm reduction" -opioid';

    loadFromQuery(query);

    const blockTypes = blocks.value.map((b) => b.type);
    expect(blockTypes).toContain("site");
    expect(blockTypes).toContain("filetype");
    expect(blockTypes).toContain("date");
    expect(blockTypes).toContain("inurl");
    expect(blockTypes).toContain("exclude");
    expect(blockTypes).toContain("keyword");

    const siteBlock = blocks.value.find((b) => b.type === "site");
    expect(siteBlock?.value).toBe("example.com");

    const filetypeBlock = blocks.value.find((b) => b.type === "filetype");
    expect(filetypeBlock?.value).toBe("pdf");

    const inurlBlock = blocks.value.find((b) => b.type === "inurl");
    expect(inurlBlock?.value).toBe("report");

    const excludeBlock = blocks.value.find((b) => b.type === "exclude");
    expect(excludeBlock?.value).toBe("opioid");

    expect(queryString.value.length).toBeGreaterThan(0);
  });

  it("ignores oversized queries to avoid heavy parsing", () => {
    const smallQuery = "site:example.com";
    loadFromQuery(smallQuery);
    const beforeCount = blocks.value.length;

    const tooLarge = "a".repeat(2001);
    loadFromQuery(tooLarge);

    expect(blocks.value.length).toBe(beforeCount);
  });
});
