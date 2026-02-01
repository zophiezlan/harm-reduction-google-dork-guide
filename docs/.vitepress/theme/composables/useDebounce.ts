import { ref, watch, type Ref } from "vue";

/**
 * Creates a debounced ref that updates after the specified delay.
 * @param source - The source ref to debounce
 * @param delay - Delay in milliseconds (default: 300)
 * @returns A ref that updates after the delay
 */
export function useDebouncedRef<T>(source: Ref<T>, delay = 300): Ref<T> {
  const debounced = ref(source.value) as Ref<T>;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  watch(source, (newValue) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      debounced.value = newValue;
    }, delay);
  });

  return debounced;
}

/**
 * Creates a debounced function that delays invoking func until after delay ms.
 * @param func - The function to debounce
 * @param delay - Delay in milliseconds (default: 300)
 * @returns A debounced version of the function
 */
export function useDebounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay = 300
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
