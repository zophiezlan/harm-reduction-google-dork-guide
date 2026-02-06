<!-- docs/.vitepress/theme/components/ThemeSwitcher.vue -->
<script setup lang="ts">
import { useSettings, type ThemeColor } from "../composables/useSettings";

const { settings, setThemeColor, setThemeMode } = useSettings();

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
</script>

<template>
  <div class="theme-switcher">
    <div class="theme-section">
      <span class="theme-label">Color</span>
      <div class="color-options">
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

    <div class="theme-section">
      <span class="theme-label">Mode</span>
      <div class="mode-options">
        <button
          :class="['mode-btn', { active: settings.theme.mode === 'dark' }]"
          @click="setThemeMode('dark')"
        >
          Dark
        </button>
        <button
          :class="['mode-btn', { active: settings.theme.mode === 'light' }]"
          @click="setThemeMode('light')"
        >
          Light
        </button>
        <button
          :class="['mode-btn', { active: settings.theme.mode === 'system' }]"
          @click="setThemeMode('system')"
        >
          System
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme-switcher {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.theme-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.theme-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.color-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.color-swatch {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: var(--swatch-color);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.color-swatch:hover {
  transform: scale(1.1);
}

.color-swatch.active {
  border-color: var(--text-primary);
  box-shadow:
    0 0 0 2px var(--bg-deep),
    0 0 0 4px var(--swatch-color);
}

.mode-options {
  display: flex;
  gap: 4px;
}

.mode-btn {
  padding: 6px 12px;
  font-size: 13px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.mode-btn:hover {
  border-color: var(--accent-border);
  color: var(--text-primary);
}

.mode-btn.active {
  background: var(--accent-subtle);
  border-color: var(--accent);
  color: var(--accent);
}
</style>
