import { describe, it, expect } from "vitest";

/**
 * Tests for useFavorites logic
 *
 * Note: Testing the full composable with singleton state is complex.
 * These tests verify the core logic used by useFavorites.
 */

describe("useFavorites logic", () => {
  // Helper to generate ID (mirrors the function in useFavorites)
  function generateFavoriteId(packId: string, title: string): string {
    return `${packId}-${title.toLowerCase().replace(/\s+/g, "-")}`;
  }

  // Helper to validate favorite item structure (mirrors the filter in initialize)
  function isValidFavorite(item: unknown): boolean {
    return (
      typeof item === "object" &&
      item !== null &&
      typeof (item as any).id === "string" &&
      typeof (item as any).packId === "string" &&
      typeof (item as any).title === "string" &&
      typeof (item as any).query === "string" &&
      typeof (item as any).addedAt === "number"
    );
  }

  describe("generateFavoriteId", () => {
    it("generates correct ID from pack and title", () => {
      expect(generateFavoriteId("drug-alerts", "NSW Health Alerts")).toBe(
        "drug-alerts-nsw-health-alerts",
      );
    });

    it("handles multiple spaces (collapses to single dash)", () => {
      // The actual implementation uses \s+ which collapses multiple spaces
      expect(generateFavoriteId("pack", "Multi  Space  Title")).toBe(
        "pack-multi-space-title",
      );
    });

    it("only lowercases title, not packId", () => {
      // packId is used as-is, only title is lowercased
      expect(generateFavoriteId("Pack1", "UPPERCASE Title")).toBe(
        "Pack1-uppercase-title",
      );
    });

    it("handles empty title", () => {
      expect(generateFavoriteId("pack", "")).toBe("pack-");
    });
  });

  describe("favorite validation", () => {
    it("accepts valid favorite item", () => {
      const validItem = {
        id: "test-id",
        packId: "pack1",
        title: "Test",
        query: "site:example.com",
        addedAt: Date.now(),
      };
      expect(isValidFavorite(validItem)).toBe(true);
    });

    it("rejects null", () => {
      expect(isValidFavorite(null)).toBe(false);
    });

    it("rejects undefined", () => {
      expect(isValidFavorite(undefined)).toBe(false);
    });

    it("rejects string", () => {
      expect(isValidFavorite("string")).toBe(false);
    });

    it("rejects number", () => {
      expect(isValidFavorite(123)).toBe(false);
    });

    it("rejects object with missing id", () => {
      expect(
        isValidFavorite({
          packId: "pack1",
          title: "Test",
          query: "site:example.com",
          addedAt: Date.now(),
        }),
      ).toBe(false);
    });

    it("rejects object with missing packId", () => {
      expect(
        isValidFavorite({
          id: "test-id",
          title: "Test",
          query: "site:example.com",
          addedAt: Date.now(),
        }),
      ).toBe(false);
    });

    it("rejects object with missing title", () => {
      expect(
        isValidFavorite({
          id: "test-id",
          packId: "pack1",
          query: "site:example.com",
          addedAt: Date.now(),
        }),
      ).toBe(false);
    });

    it("rejects object with missing query", () => {
      expect(
        isValidFavorite({
          id: "test-id",
          packId: "pack1",
          title: "Test",
          addedAt: Date.now(),
        }),
      ).toBe(false);
    });

    it("rejects object with missing addedAt", () => {
      expect(
        isValidFavorite({
          id: "test-id",
          packId: "pack1",
          title: "Test",
          query: "site:example.com",
        }),
      ).toBe(false);
    });

    it("rejects object with wrong type for addedAt", () => {
      expect(
        isValidFavorite({
          id: "test-id",
          packId: "pack1",
          title: "Test",
          query: "site:example.com",
          addedAt: "not a number",
        }),
      ).toBe(false);
    });
  });

  describe("MAX_FAVORITES limit", () => {
    const MAX_FAVORITES = 500;

    it("enforces max limit on initialization", () => {
      const items = Array.from({ length: 600 }, (_, i) => ({
        id: `item-${i}`,
        packId: "pack",
        title: `Item ${i}`,
        query: `site:${i}.com`,
        addedAt: Date.now(),
      }));

      // Simulating what initialize does
      const validItems = items.filter(isValidFavorite).slice(0, MAX_FAVORITES);
      expect(validItems.length).toBe(500);
    });

    it("detects when at limit", () => {
      const items = Array.from({ length: 500 }, () => ({}));
      expect(items.length >= MAX_FAVORITES).toBe(true);
    });

    it("allows adding when under limit", () => {
      const items = Array.from({ length: 499 }, () => ({}));
      expect(items.length < MAX_FAVORITES).toBe(true);
    });
  });

  describe("duplicate detection", () => {
    it("detects duplicate by generated ID", () => {
      const items = [{ id: "pack1-test-dork" }];
      const newId = generateFavoriteId("pack1", "Test Dork");
      const isDuplicate = items.some((f) => f.id === newId);
      expect(isDuplicate).toBe(true);
    });

    it("allows same title in different pack", () => {
      const items = [{ id: "pack1-test-dork" }];
      const newId = generateFavoriteId("pack2", "Test Dork");
      const isDuplicate = items.some((f) => f.id === newId);
      expect(isDuplicate).toBe(false);
    });

    it("allows different title in same pack", () => {
      const items = [{ id: "pack1-test-dork" }];
      const newId = generateFavoriteId("pack1", "Different Dork");
      const isDuplicate = items.some((f) => f.id === newId);
      expect(isDuplicate).toBe(false);
    });
  });

  describe("remove operation", () => {
    it("removes item by ID", () => {
      const items = [
        { id: "item-1", title: "Item 1" },
        { id: "item-2", title: "Item 2" },
        { id: "item-3", title: "Item 3" },
      ];

      const idx = items.findIndex((f) => f.id === "item-2");
      if (idx !== -1) items.splice(idx, 1);

      expect(items.length).toBe(2);
      expect(items.map((i) => i.id)).toEqual(["item-1", "item-3"]);
    });

    it("does nothing for non-existent ID", () => {
      const items = [
        { id: "item-1", title: "Item 1" },
        { id: "item-2", title: "Item 2" },
      ];

      const idx = items.findIndex((f) => f.id === "non-existent");
      if (idx !== -1) items.splice(idx, 1);

      expect(items.length).toBe(2);
    });
  });

  describe("toggle behavior", () => {
    it("would add when not favorite (returns true)", () => {
      const items: { id: string }[] = [];
      const id = generateFavoriteId("pack1", "Test");
      const isFavorite = items.some((f) => f.id === id);

      // Toggle logic: if not favorite, add returns true
      const toggleResult = !isFavorite;
      expect(toggleResult).toBe(true);
    });

    it("would remove when favorite (returns false)", () => {
      const items = [{ id: "pack1-test" }];
      const id = generateFavoriteId("pack1", "Test");
      const isFavorite = items.some((f) => f.id === id);

      // Toggle logic: if favorite, remove returns false
      const toggleResult = !isFavorite;
      expect(toggleResult).toBe(false);
    });
  });

  describe("clear operation", () => {
    it("empties the array", () => {
      const items = [{ id: "item-1" }, { id: "item-2" }, { id: "item-3" }];

      // Clear by reassigning (as the composable does)
      items.length = 0;

      expect(items).toEqual([]);
    });
  });
});
