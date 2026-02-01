import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ref, nextTick } from "vue";
import { useDebouncedRef, useDebounce } from "../composables/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("useDebouncedRef", () => {
    it("returns initial value immediately", () => {
      const source = ref("initial");
      const debounced = useDebouncedRef(source, 300);
      expect(debounced.value).toBe("initial");
    });

    it("delays updates by the specified duration", async () => {
      const source = ref("initial");
      const debounced = useDebouncedRef(source, 300);

      source.value = "updated";
      await nextTick();

      // Value should not have changed yet
      expect(debounced.value).toBe("initial");

      // Advance time partially
      vi.advanceTimersByTime(200);
      await nextTick();
      expect(debounced.value).toBe("initial");

      // Advance time to complete delay
      vi.advanceTimersByTime(100);
      await nextTick();
      expect(debounced.value).toBe("updated");
    });

    it("resets timer on subsequent changes", async () => {
      const source = ref("initial");
      const debounced = useDebouncedRef(source, 300);

      source.value = "first";
      await nextTick();
      vi.advanceTimersByTime(200);

      source.value = "second";
      await nextTick();
      vi.advanceTimersByTime(200);

      // Still should be initial (timer was reset)
      expect(debounced.value).toBe("initial");

      vi.advanceTimersByTime(100);
      await nextTick();
      expect(debounced.value).toBe("second");
    });

    it("uses default delay of 300ms", async () => {
      const source = ref("initial");
      const debounced = useDebouncedRef(source);

      source.value = "updated";
      await nextTick();

      vi.advanceTimersByTime(299);
      await nextTick();
      expect(debounced.value).toBe("initial");

      vi.advanceTimersByTime(1);
      await nextTick();
      expect(debounced.value).toBe("updated");
    });
  });

  describe("useDebounce", () => {
    it("delays function execution", () => {
      const fn = vi.fn();
      const debouncedFn = useDebounce(fn, 300);

      debouncedFn();
      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(300);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it("passes arguments to the function", () => {
      const fn = vi.fn();
      const debouncedFn = useDebounce(fn, 300);

      debouncedFn("arg1", "arg2");
      vi.advanceTimersByTime(300);

      expect(fn).toHaveBeenCalledWith("arg1", "arg2");
    });

    it("only calls function once for rapid calls", () => {
      const fn = vi.fn();
      const debouncedFn = useDebounce(fn, 300);

      debouncedFn("first");
      debouncedFn("second");
      debouncedFn("third");

      vi.advanceTimersByTime(300);

      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith("third");
    });
  });
});
