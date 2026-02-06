const STORAGE_PREFIX = "needle-";

export type Validator<T> = (value: unknown) => value is T;

/**
 * Deep merge two objects, preferring values from source.
 * Only merges plain objects, not arrays or other types.
 */
function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>,
): T {
  const result = { ...target };
  for (const key in source) {
    const sourceVal = source[key];
    const targetVal = target[key];
    if (
      sourceVal !== null &&
      typeof sourceVal === "object" &&
      !Array.isArray(sourceVal) &&
      targetVal !== null &&
      typeof targetVal === "object" &&
      !Array.isArray(targetVal)
    ) {
      (result as Record<string, unknown>)[key] = deepMerge(
        targetVal as Record<string, unknown>,
        sourceVal as Record<string, unknown>,
      );
    } else if (sourceVal !== undefined) {
      (result as Record<string, unknown>)[key] = sourceVal;
    }
  }
  return result;
}

/**
 * Validates that a value has the same shape as the default value.
 * Checks that all keys exist and have the same type (shallow check).
 */
function validateShape<T extends Record<string, unknown>>(
  value: unknown,
  defaultValue: T,
): value is Partial<T> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const obj = value as Record<string, unknown>;
  for (const key in obj) {
    if (!(key in defaultValue)) {
      // Extra keys are ignored but allowed
      continue;
    }
    const expectedType = typeof defaultValue[key];
    const actualType = typeof obj[key];
    // Allow nested objects to be validated recursively
    if (expectedType === "object" && actualType === "object") {
      if (
        !validateShape(
          obj[key] as Record<string, unknown>,
          defaultValue[key] as Record<string, unknown>,
        )
      ) {
        return false;
      }
    } else if (actualType !== expectedType && obj[key] !== null) {
      return false;
    }
  }
  return true;
}

/**
 * Get an item from localStorage with validation.
 * If the stored value doesn't match the expected shape, returns defaultValue.
 * Merges stored values with defaults to handle schema migrations.
 */
export function getStorageItem<T extends Record<string, unknown>>(
  key: string,
  defaultValue: T,
): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    if (!item) return defaultValue;

    const parsed = JSON.parse(item);
    if (!validateShape(parsed, defaultValue)) {
      console.warn(`Invalid localStorage data for "${key}", using defaults`);
      return defaultValue;
    }
    // Merge with defaults to handle schema migrations
    return deepMerge(defaultValue, parsed as Partial<T>);
  } catch {
    return defaultValue;
  }
}

/**
 * Get a simple value from localStorage (strings, numbers, arrays).
 */
export function getStorageItemSimple<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    if (!item) return defaultValue;
    const parsed = JSON.parse(item);
    // Check array type specifically
    if (Array.isArray(defaultValue) && !Array.isArray(parsed)) {
      return defaultValue;
    }
    // Check other types
    if (!Array.isArray(defaultValue) && typeof parsed !== typeof defaultValue) {
      return defaultValue;
    }
    return parsed as T;
  } catch {
    return defaultValue;
  }
}

export interface StorageResult {
  success: boolean;
  error?: "quota_exceeded" | "serialization_error" | "unknown";
}

export function setStorageItem<T>(key: string, value: T): StorageResult {
  if (typeof window === "undefined")
    return { success: false, error: "unknown" };
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    return { success: true };
  } catch (e) {
    // Check for quota exceeded error
    const isQuotaError =
      e instanceof DOMException &&
      (e.code === 22 || // Legacy Chrome/Safari
        e.code === 1014 || // Firefox
        e.name === "QuotaExceededError" ||
        e.name === "NS_ERROR_DOM_QUOTA_REACHED");

    if (isQuotaError) {
      console.warn("localStorage quota exceeded for key:", key);
      return { success: false, error: "quota_exceeded" };
    }

    console.warn("Failed to save to localStorage:", e);
    return { success: false, error: "unknown" };
  }
}

export function removeStorageItem(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_PREFIX + key);
}
