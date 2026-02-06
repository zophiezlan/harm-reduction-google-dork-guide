<!-- docs/.vitepress/theme/components/NavThemeSwitcher.vue -->
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useSettings, type ThemeColor } from "../composables/useSettings";

const { settings, setThemeColor, setThemeMode } = useSettings();

const isOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);
const systemDark = ref(false);

const colors: { id: ThemeColor; label: string }[] = [
  { id: "violet", label: "Violet" },
  { id: "blue", label: "Blue" },
  { id: "teal", label: "Teal" },
  { id: "green", label: "Green" },
  { id: "amber", label: "Amber" },
  { id: "orange", label: "Orange" },
  { id: "rose", label: "Rose" },
  { id: "gray", label: "Gray" },
];

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function handleClickOutside(e: MouseEvent) {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
}

// Mode Toggle Logic
const isDark = computed(() => {
  if (settings.theme.mode === "system") return systemDark.value;
  return settings.theme.mode === "dark";
});

function toggleMode() {
  setThemeMode(isDark.value ? "light" : "dark");
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);

  if (typeof window !== "undefined") {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    systemDark.value = mq.matches;

    // Listen for system changes
    mq.addEventListener("change", (e) => {
      systemDark.value = e.matches;
    });
  }
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="nav-theme-switcher" ref="menuRef">
    <!-- Mode Toggle (Left) -->
    <button
      class="theme-toggle-btn mode-toggle"
      @click="toggleMode"
      :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    >
      <span class="icon">{{ isDark ? "🌙" : "☀️" }}</span>
    </button>

    <!-- Color Select (Right) -->
    <button
      class="theme-toggle-btn color-toggle"
      @click="toggleDropdown"
      title="Change theme color"
    >
      <span
        class="current-color"
        :style="{ background: `var(--color-${settings.theme.color})` }"
      ></span>
    </button>

    <!-- Dropdown (Colors Only) -->
    <Transition name="dropdown">
      <div v-if="isOpen" class="theme-dropdown">
        <div class="color-grid">
          <button
            v-for="color in colors"
            :key="color.id"
            :class="[
              'color-swatch',
              { active: settings.theme.color === color.id },
            ]"
            :style="{ '--swatch-color': `var(--color-${color.id})` }"
            :title="color.label"
            @click="setThemeColor(color.id)"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.nav-theme-switcher {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  margin-left: 8px;
}

.theme-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 150ms ease;
  color: var(--vp-c-text-2);
}

.theme-toggle-btn:hover {
  border-color: var(--accent);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.current-color {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-divider);
  transition: transform 150ms ease;
}

.theme-toggle-btn:hover .current-color {
  transform: scale(1.1);
  border-color: var(--vp-c-text-1);
}

.icon {
  font-size: 16px;
  line-height: 1;
}

.theme-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 160px;
  padding: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 100;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.color-swatch {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: var(--swatch-color);
  cursor: pointer;
  transition: all 150ms ease;
}

.color-swatch:hover {
  transform: scale(1.1);
}

.color-swatch.active {
  border-color: var(--vp-c-text-1);
  box-shadow:
    0 0 0 2px var(--vp-c-bg),
    0 0 0 4px var(--swatch-color);
}

/* Transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 150ms ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
