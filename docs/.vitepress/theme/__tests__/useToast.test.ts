import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useToast } from "../composables/useToast";

describe("useToast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Clear any existing toasts
    const { toasts } = useToast();
    toasts.value = [];
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows a toast message", () => {
    const { show, toasts } = useToast();
    show("Hello", "info");
    expect(toasts.value).toHaveLength(1);
    expect(toasts.value[0].message).toBe("Hello");
    expect(toasts.value[0].type).toBe("info");
  });

  it("auto-dismisses after duration", () => {
    const { show, toasts } = useToast();
    show("Temporary", "info", 1000);
    expect(toasts.value).toHaveLength(1);

    vi.advanceTimersByTime(1000);
    expect(toasts.value).toHaveLength(0);
  });

  it("defaults to 3000ms duration", () => {
    const { show, toasts } = useToast();
    show("Default duration");
    expect(toasts.value).toHaveLength(1);

    vi.advanceTimersByTime(2999);
    expect(toasts.value).toHaveLength(1);

    vi.advanceTimersByTime(1);
    expect(toasts.value).toHaveLength(0);
  });

  it("provides success/error/info shortcuts", () => {
    const { success, error, info, toasts } = useToast();

    success("Success!");
    expect(toasts.value.at(-1)!.type).toBe("success");

    error("Error!");
    expect(toasts.value.at(-1)!.type).toBe("error");

    info("Info!");
    expect(toasts.value.at(-1)!.type).toBe("info");

    expect(toasts.value).toHaveLength(3);
  });

  it("assigns unique incrementing IDs", () => {
    const { show, toasts } = useToast();
    show("First");
    show("Second");
    expect(toasts.value[0].id).not.toBe(toasts.value[1].id);
    expect(toasts.value[1].id).toBeGreaterThan(toasts.value[0].id);
  });

  it("manually dismisses a toast by ID", () => {
    const { show, dismiss, toasts } = useToast();
    show("Keep");
    show("Remove");
    const removeId = toasts.value[1].id;

    dismiss(removeId);
    expect(toasts.value).toHaveLength(1);
    expect(toasts.value[0].message).toBe("Keep");
  });

  it("does nothing when dismissing non-existent ID", () => {
    const { show, dismiss, toasts } = useToast();
    show("Only");
    dismiss(99999);
    expect(toasts.value).toHaveLength(1);
  });

  it("can show multiple toasts simultaneously", () => {
    const { show, toasts } = useToast();
    show("First", "info", 5000);
    show("Second", "success", 5000);
    show("Third", "error", 5000);
    expect(toasts.value).toHaveLength(3);
  });
});
