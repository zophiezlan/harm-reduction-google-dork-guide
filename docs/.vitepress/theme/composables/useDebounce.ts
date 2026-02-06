import { ref, watch, onScopeDispose, getCurrentScope, type Ref } from "vue";

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

  // Clean up pending timeout when scope is disposed (if in a scope)
  if (getCurrentScope()) {
    onScopeDispose(() => {
      if (timeout) {
        clearTimeout(timeout);
      }
    });
  }

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
  delay = 300,
): { fn: (...args: Parameters<T>) => void; cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  const fn = (...args: Parameters<T>) => {
    cancel();
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };

  // Clean up pending timeout when scope is disposed (if in a scope)
  if (getCurrentScope()) {
    onScopeDispose(cancel);
  }

  return { fn, cancel };
}
