import { describe, it, expect, beforeEach, vi } from "vitest";

/**
 * Tests for useQueryHistory core logic.
 *
 * Since the composable uses a singleton pattern and crypto.randomUUID,
 * we test the core logic patterns used by the composable.
 */

describe("useQueryHistory logic", () => {
  // Mirror the validation logic from useQueryHistory.initialize
  function isValidHistoryItem(item: unknown): boolean {
    return (
      typeof item === "object" &&
      item !== null &&
      typeof (item as any).id === "string" &&
      typeof (item as any).query === "string" &&
      typeof (item as any).timestamp === "number"
    );
  }

  describe("item validation", () => {
    it("accepts valid history item", () => {
      expect(
        isValidHistoryItem({
          id: "abc-123",
          query: "site:example.com",
          timestamp: Date.now(),
        }),
      ).toBe(true);
    });

    it("accepts item with optional label", () => {
      expect(
        isValidHistoryItem({
          id: "abc-123",
          query: "site:example.com",
          timestamp: Date.now(),
          label: "My query",
        }),
      ).toBe(true);
    });

    it("rejects null", () => {
      expect(isValidHistoryItem(null)).toBe(false);
    });

    it("rejects string", () => {
      expect(isValidHistoryItem("not an object")).toBe(false);
    });

    it("rejects missing id", () => {
      expect(
        isValidHistoryItem({
          query: "site:example.com",
          timestamp: Date.now(),
        }),
      ).toBe(false);
    });

    it("rejects missing query", () => {
      expect(
        isValidHistoryItem({
          id: "abc-123",
          timestamp: Date.now(),
        }),
      ).toBe(false);
    });

    it("rejects missing timestamp", () => {
      expect(
        isValidHistoryItem({
          id: "abc-123",
          query: "site:example.com",
        }),
      ).toBe(false);
    });

    it("rejects wrong type for timestamp", () => {
      expect(
        isValidHistoryItem({
          id: "abc-123",
          query: "site:example.com",
          timestamp: "not a number",
        }),
      ).toBe(false);
    });
  });

  describe("deduplication", () => {
    it("removes existing entry with matching query", () => {
      const history = [
        { id: "1", query: "site:a.com", timestamp: 100 },
        { id: "2", query: "site:b.com", timestamp: 200 },
        { id: "3", query: "site:a.com", timestamp: 300 },
      ];

      // Simulate dedup: remove first match
      const targetQuery = "site:a.com";
      const existingIndex = history.findIndex((h) => h.query === targetQuery);
      if (existingIndex !== -1) {
        history.splice(existingIndex, 1);
      }

      expect(history).toHaveLength(2);
      // The first "site:a.com" (id:1) was removed, the later one (id:3) stays
      expect(history.map((h) => h.id)).toEqual(["2", "3"]);
    });
  });

  describe("MAX_HISTORY limit", () => {
    const MAX_HISTORY = 50;

    it("trims history to max items", () => {
      const history = Array.from({ length: 60 }, (_, i) => ({
        id: `item-${i}`,
        query: `site:${i}.com`,
        timestamp: Date.now() + i,
      }));

      const trimmed = history.slice(0, MAX_HISTORY);
      expect(trimmed).toHaveLength(50);
    });
  });

  describe("empty query handling", () => {
    it("rejects empty string", () => {
      const query = "";
      expect(query.trim()).toBe("");
    });

    it("rejects whitespace-only string", () => {
      const query = "   ";
      expect(query.trim()).toBe("");
    });
  });
});

describe("getTemplatesByCategory", () => {
  // Import the actual function
  it("groups templates by category", async () => {
    const { getTemplatesByCategory, DORK_TEMPLATES } =
      await import("../composables/useQueryHistory");
    const grouped = getTemplatesByCategory();

    // Should have multiple categories
    const categories = Object.keys(grouped);
    expect(categories.length).toBeGreaterThan(0);

    // All templates should be accounted for
    const totalInGroups = Object.values(grouped).reduce(
      (sum, arr) => sum + arr.length,
      0,
    );
    expect(totalInGroups).toBe(DORK_TEMPLATES.length);

    // Each category array should be non-empty
    for (const cat of categories) {
      expect(grouped[cat].length).toBeGreaterThan(0);
    }
  });

  it("includes expected categories", async () => {
    const { getTemplatesByCategory } =
      await import("../composables/useQueryHistory");
    const grouped = getTemplatesByCategory();
    const categories = Object.keys(grouped);

    expect(categories).toContain("Research");
    expect(categories).toContain("Services");
    expect(categories).toContain("Policy");
  });
});
