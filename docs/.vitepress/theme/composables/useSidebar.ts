import { ref, watch } from "vue";
import { useRoute } from "vitepress";

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
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('vitepress-sidebar-collapsed');
    if (stored) {
      isCollapsed.value = stored === 'true';
    }

    watch(isCollapsed, (val) => {
      localStorage.setItem('vitepress-sidebar-collapsed', String(val));
      updateDom(val);
    });
    
    // Initial apply
    updateDom(isCollapsed.value);

    watch(
      () => route.path,
      () => {
        updateDom(isCollapsed.value);
      }
    );
  }

  function updateDom(collapsed: boolean) {
    if (typeof document === 'undefined') return;
    if (collapsed) {
      document.documentElement.classList.add('sidebar-collapsed');
    } else {
      document.documentElement.classList.remove('sidebar-collapsed');
    }
  }

  return {
    isCollapsed,
    toggle,
    setCollapsed
  };
}
