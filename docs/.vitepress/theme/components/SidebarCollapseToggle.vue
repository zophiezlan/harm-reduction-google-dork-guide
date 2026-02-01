<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
import { useSidebar as useVitePressSidebar } from "vitepress/theme";
import { useSidebar as useLocalSidebar } from "../composables/useSidebar";

const props = defineProps<{
  variant: "navbar" | "inline";
}>();

const { isCollapsed, toggle } = useLocalSidebar();
const { frontmatter } = useData();
const { hasSidebar } = useVitePressSidebar();

const showOnPage = computed(() => {
  if (frontmatter.value.layout === "home") return false;
  if (frontmatter.value.sidebar === false) return false;
  if (hasSidebar?.value === false) return false;
  return true;
});

const shouldShow = computed(() => {
  if (!showOnPage.value) return false;
  if (props.variant === "inline") return !isCollapsed.value;
  return true;
});

const label = computed(() => (isCollapsed.value ? "Expand sidebar" : "Collapse sidebar"));
</script>

<template>
  <div
    v-if="shouldShow"
    class="sidebar-toggle"
    :class="{
      'sidebar-toggle-inline': variant === 'inline',
      'sidebar-toggle-navbar': variant === 'navbar',
      'is-collapsed': isCollapsed,
    }"
    @click.stop
  >
    <span v-if="variant === 'inline'" class="sidebar-toggle-label">Navigation</span>
    <button
      class="sidebar-toggle-btn"
      type="button"
      :title="label"
      :aria-label="label"
      @click.stop.prevent="toggle"
      @pointerdown.stop
    >
      <span class="sidebar-toggle-icon" aria-hidden="true">
        <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true">
          <path
            d="M12.5 4.5l-5 5 5 5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>
  </div>
</template>

<style scoped>
.sidebar-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-toggle-inline {
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.sidebar-toggle-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.sidebar-toggle-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition:
    border-color 150ms ease,
    background 150ms ease,
    color 150ms ease,
    transform 150ms ease;
}

.sidebar-toggle-btn:hover {
  border-color: var(--accent);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  transform: translateY(-1px);
}

.sidebar-toggle-icon {
  display: inline-flex;
  width: 18px;
  height: 18px;
  transform: rotate(0deg);
  transition: transform 150ms ease;
}

.sidebar-toggle-navbar {
  align-items: center;
  margin-right: 8px;
}

.sidebar-toggle-navbar .sidebar-toggle-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
}

.sidebar-toggle-navbar .sidebar-toggle-btn:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.is-collapsed .sidebar-toggle-icon {
  transform: rotate(180deg);
}

@media (max-width: 959px) {
  .sidebar-toggle {
    display: none;
  }
}
</style>
