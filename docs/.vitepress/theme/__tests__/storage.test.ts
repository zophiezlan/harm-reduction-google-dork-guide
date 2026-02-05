import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getStorageItem,
  getStorageItemSimple,
  setStorageItem,
  removeStorageItem,
} from "../utils/storage";

describe("storage utilities", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe("getStorageItem", () => {
    it("returns default value when item does not exist", () => {
      const defaultValue = { theme: { color: "blue", mode: "dark" } };
      const result = getStorageItem("nonexistent", defaultValue);
      expect(result).toEqual(defaultValue);
    });

    it("returns stored value when item exists and is valid", () => {
      const stored = { theme: { color: "green", mode: "light" } };
      localStorage.setItem("hr-dork-test", JSON.stringify(stored));

      const defaultValue = { theme: { color: "blue", mode: "dark" } };
      const result = getStorageItem("test", defaultValue);
      expect(result).toEqual(stored);
    });

    it("merges stored value with defaults for schema migration", () => {
      // Stored value is missing a new property
      const stored = { theme: { color: "green" } };
      localStorage.setItem("hr-dork-test", JSON.stringify(stored));

      const defaultValue = { theme: { color: "blue", mode: "dark" }, newProp: true };
      const result = getStorageItem("test", defaultValue);
      expect(result).toEqual({
        theme: { color: "green", mode: "dark" },
        newProp: true,
      });
    });

    it("returns default value for invalid JSON", () => {
      localStorage.setItem("hr-dork-test", "not valid json");
      const defaultValue = { theme: { color: "blue" } };
      const result = getStorageItem("test", defaultValue);
      expect(result).toEqual(defaultValue);
    });

    it("returns default value for wrong type (array instead of object)", () => {
      localStorage.setItem("hr-dork-test", JSON.stringify([1, 2, 3]));
      const defaultValue = { theme: { color: "blue" } };
      const result = getStorageItem("test", defaultValue);
      expect(result).toEqual(defaultValue);
    });

    it("returns default value for wrong nested type", () => {
      localStorage.setItem("hr-dork-test", JSON.stringify({ theme: "not an object" }));
      const defaultValue = { theme: { color: "blue" } };
      const result = getStorageItem("test", defaultValue);
      expect(result).toEqual(defaultValue);
    });
  });

  describe("getStorageItemSimple", () => {
    it("returns default value when item does not exist", () => {
      const result = getStorageItemSimple("nonexistent", []);
      expect(result).toEqual([]);
    });

    it("returns stored array when valid", () => {
      const stored = [{ id: "1" }, { id: "2" }];
      localStorage.setItem("hr-dork-test", JSON.stringify(stored));
      const result = getStorageItemSimple("test", []);
      expect(result).toEqual(stored);
    });

    it("returns default for wrong type", () => {
      localStorage.setItem("hr-dork-test", JSON.stringify({ not: "array" }));
      const result = getStorageItemSimple("test", []);
      expect(result).toEqual([]);
    });

    it("returns stored string", () => {
      localStorage.setItem("hr-dork-test", JSON.stringify("stored string"));
      const result = getStorageItemSimple("test", "default");
      expect(result).toBe("stored string");
    });
  });

  describe("setStorageItem", () => {
    it("stores value with prefix and returns success", () => {
      const result = setStorageItem("test", { value: 123 });
      const stored = localStorage.getItem("hr-dork-test");
      expect(stored).toBe(JSON.stringify({ value: 123 }));
      expect(result.success).toBe(true);
    });

    it("handles storage errors gracefully and returns error type", () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      // Create a mock storage that throws on setItem
      const mockStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(() => {
          throw new Error("QuotaExceeded");
        }),
        removeItem: vi.fn(),
        clear: vi.fn(),
        key: vi.fn(),
        length: 0,
      };
      vi.stubGlobal("localStorage", mockStorage);

      const result = setStorageItem("test", { value: 123 });
      expect(result.success).toBe(false);
      expect(result.error).toBe("unknown");
      expect(consoleSpy).toHaveBeenCalled();

      vi.unstubAllGlobals();
      consoleSpy.mockRestore();
    });

    it("detects quota exceeded error", () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const quotaError = new DOMException("Quota exceeded", "QuotaExceededError");
      const mockStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(() => {
          throw quotaError;
        }),
        removeItem: vi.fn(),
        clear: vi.fn(),
        key: vi.fn(),
        length: 0,
      };
      vi.stubGlobal("localStorage", mockStorage);

      const result = setStorageItem("test", { value: 123 });
      expect(result.success).toBe(false);
      expect(result.error).toBe("quota_exceeded");

      vi.unstubAllGlobals();
      consoleSpy.mockRestore();
    });
  });

  describe("removeStorageItem", () => {
    it("removes item with prefix", () => {
      localStorage.setItem("hr-dork-test", "value");
      removeStorageItem("test");
      expect(localStorage.getItem("hr-dork-test")).toBeNull();
    });
  });
});
