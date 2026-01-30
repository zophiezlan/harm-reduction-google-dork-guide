<!-- docs/.vitepress/theme/components/NavThemeSwitcher.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useSettings, type ThemeColor, type ThemeMode } from "../composables/useSettings";

const { settings, setThemeColor, setThemeMode } = useSettings();

const isOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);

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

const modes: { id: ThemeMode; icon: string; label: string }[] = [
  { id: "light", icon: "☀️", label: "Light" },
  { id: "dark", icon: "🌙", label: "Dark" },
  { id: "system", icon: "💻", label: "System" },
];

function toggle() {
  isOpen.value = !isOpen.value;
}

function handleClickOutside(e: MouseEvent) {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="nav-theme-switcher" ref="menuRef">
    <button class="theme-toggle-btn" @click="toggle" :title="'Theme settings'">
      <span
        class="current-color"
        :style="{ background: `var(--color-${settings.theme.color})` }"
      ></span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="chevron"
        :class="{ open: isOpen }"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="theme-dropdown">
        <div class="dropdown-section">
          <span class="dropdown-label">Color</span>
          <div class="color-grid">
            <button
              v-for="color in colors"
              :key="color.id"
              :class="['color-swatch', { active: settings.theme.color === color.id }]"
              :style="{ '--swatch-color': `var(--color-${color.id})` }"
              :title="color.label"
              @click="setThemeColor(color.id)"
            />
          </div>
        </div>

        <div class="dropdown-section">
          <span class="dropdown-label">Mode</span>
          <div class="mode-buttons">
            <button
              v-for="mode in modes"
              :key="mode.id"
              :class="['mode-btn', { active: settings.theme.mode === mode.id }]"
              :title="mode.label"
              @click="setThemeMode(mode.id)"
            >
              {{ mode.icon }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.nav-theme-switcher {
  position: relative;
  margin-left: 8px;
}

.theme-toggle-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 150ms ease;
}

.theme-toggle-btn:hover {
  border-color: var(--accent);
  background: var(--vp-c-bg-alt);
}

.current-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-divider);
}

.chevron {
  color: var(--vp-c-text-2);
  transition: transform 150ms ease;
}

.chevron.open {
  transform: rotate(180deg);
}

.theme-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 200px;
  padding: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 100;
}

.dropdown-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dropdown-section + .dropdown-section {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
}

.dropdown-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
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

.mode-buttons {
  display: flex;
  gap: 4px;
}

.mode-btn {
  flex: 1;
  padding: 8px;
  font-size: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 150ms ease;
}

.mode-btn:hover {
  border-color: var(--accent);
  background: var(--vp-c-bg-alt);
}

.mode-btn.active {
  background: var(--accent-subtle);
  border-color: var(--accent);
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
