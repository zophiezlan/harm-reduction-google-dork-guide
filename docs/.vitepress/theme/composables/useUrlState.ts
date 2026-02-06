import { ref, watch, onMounted, type Ref } from "vue";
import { useRouter, useRoute } from "vitepress";

interface UrlStateOptions<T> {
  key: string;
  defaultValue: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
}

const MAX_URL_PARAM_LENGTH = 2000;

/**
 * Syncs a ref value with URL query parameters.
 * Allows users to bookmark and share filtered views.
 */
export function useUrlState<T>(options: UrlStateOptions<T>): Ref<T> {
  const { key, defaultValue, serialize, deserialize } = options;

  const state = ref<T>(defaultValue) as Ref<T>;

  // Default serializers
  const doSerialize = serialize ?? ((v: T) => JSON.stringify(v));
  const doDeserialize = deserialize ?? ((v: string) => JSON.parse(v) as T);

  // Read initial value from URL on mount
  onMounted(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const urlValue = params.get(key);

    if (urlValue && urlValue.length <= MAX_URL_PARAM_LENGTH) {
      try {
        state.value = doDeserialize(urlValue);
      } catch {
        // Invalid URL value, use default
        state.value = defaultValue;
      }
    }
  });

  // Update URL when state changes
  watch(
    state,
    (newValue) => {
      if (typeof window === "undefined") return;

      const params = new URLSearchParams(window.location.search);
      const serialized = doSerialize(newValue);

      // Check if value equals default to decide whether to include in URL
      const isDefault =
        JSON.stringify(newValue) === JSON.stringify(defaultValue);

      if (isDefault) {
        params.delete(key);
      } else {
        params.set(key, serialized);
      }

      // Update URL without triggering navigation
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;

      window.history.replaceState({}, "", newUrl);
    },
    { deep: true },
  );

  return state;
}

/**
 * Sync multiple simple values to URL (strings, booleans, arrays).
 */
export function useUrlStateSimple<T extends string | boolean | string[]>(
  key: string,
  defaultValue: T,
): Ref<T> {
  return useUrlState<T>({
    key,
    defaultValue,
    serialize: (v) => {
      if (Array.isArray(v)) {
        return v.join(",");
      }
      return String(v);
    },
    deserialize: (v) => {
      if (Array.isArray(defaultValue)) {
        return (v ? v.split(",").filter(Boolean) : []) as T;
      }
      if (typeof defaultValue === "boolean") {
        return (v === "true") as T;
      }
      return v as T;
    },
  });
}
