import { ref, watch } from "vue";
import { useRoute } from "vitepress";
import { getStorageItemSimple, setStorageItem } from "../utils/storage";

const isCollapsed = ref(false);

export function useSidebar() {
  const route = useRoute();

  function toggle() {
    isCollapsed.value = !isCollapsed.value;
  }

  function setCollapsed(val: boolean) {
    isCollapsed.value = val;
  }

  // Initialize and persist
  if (typeof window !== "undefined") {
    const stored = getStorageItemSimple<boolean>("sidebar-collapsed", false);
    isCollapsed.value = stored;

    watch(isCollapsed, (val) => {
      setStorageItem("sidebar-collapsed", val);
      updateDom(val);
    });

    // Initial apply
    updateDom(isCollapsed.value);

    watch(
      () => route.path,
      () => {
        updateDom(isCollapsed.value);
      },
    );
  }

  function updateDom(collapsed: boolean) {
    if (typeof document === "undefined") return;
    if (collapsed) {
      document.documentElement.classList.add("sidebar-collapsed");
    } else {
      document.documentElement.classList.remove("sidebar-collapsed");
    }
  }

  return {
    isCollapsed,
    toggle,
    setCollapsed,
  };
}
