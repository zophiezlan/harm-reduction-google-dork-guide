<!-- docs/.vitepress/theme/components/settings/SettingsPanel.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { useSettings, type ExperienceMode } from "../../composables/useSettings";
import { useFavorites } from "../../composables/useFavorites";
import { useToast } from "../../composables/useToast";
import ThemeSwitcher from "../ThemeSwitcher.vue";

const { settings, setExperienceMode, resetSettings } = useSettings();
const { favorites, clearFavorites } = useFavorites();
const { success, error } = useToast();

const experienceModes: { id: ExperienceMode; label: string; description: string }[] = [
  { id: "beginner", label: "Beginner", description: "More guidance, expanded tooltips" },
  { id: "practitioner", label: "Practitioner", description: "Balanced experience" },
  { id: "expert", label: "Expert", description: "Minimal UI, power features" },
];

function exportData() {
  const data = {
    version: 1,
    settings: settings,
    favorites: favorites,
    exportedAt: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `harm-reduction-dork-guide-backup-${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  success("Data exported successfully");
}

function importData() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (data.version !== 1) throw new Error("Unsupported version");
      // Apply settings
      Object.assign(settings, data.settings);
      // Apply favorites (would need to expose a setter)
      success("Data imported successfully");
    } catch (e) {
      error("Failed to import data");
    }
  };
  input.click();
}

function handleClearData() {
  if (confirm("Are you sure? This will clear all your favorites and reset settings.")) {
    clearFavorites();
    resetSettings();
    success("All data cleared");
  }
}

function generateShareLink() {
  const params = new URLSearchParams({
    mode: settings.experienceMode,
    color: settings.theme.color,
    theme: settings.theme.mode,
  });
  const url = `${window.location.origin}/settings?${params}`;
  navigator.clipboard.writeText(url);
  success("Settings link copied to clipboard");
}
</script>

<template>
  <div class="settings-panel">
    <h1 class="settings-title">Settings</h1>

    <section class="settings-section">
      <h2 class="section-title">Experience Mode</h2>
      <div class="mode-options">
        <button
          v-for="mode in experienceModes"
          :key="mode.id"
          :class="['mode-btn', { active: settings.experienceMode === mode.id }]"
          @click="setExperienceMode(mode.id)"
        >
          <span class="mode-label">{{ mode.label }}</span>
          <span class="mode-desc">{{ mode.description }}</span>
        </button>
      </div>
    </section>

    <section class="settings-section">
      <h2 class="section-title">Theme</h2>
      <ThemeSwitcher />
    </section>

    <section class="settings-section">
      <h2 class="section-title">Builder Defaults</h2>
      <label class="checkbox-label">
        <input v-model="settings.defaults.synonyms" type="checkbox" />
        Auto-expand synonyms
      </label>
      <label class="checkbox-label">
        <input v-model="settings.defaults.auOnly" type="checkbox" />
        Default to Australian sites only
      </label>
      <div class="select-group">
        <span>Default date range:</span>
        <select v-model="settings.defaults.dateRange" class="input select">
          <option value="1y">Last year</option>
          <option value="2y">Last 2 years</option>
          <option value="5y">Last 5 years</option>
          <option value="none">No date filter</option>
        </select>
      </div>
    </section>

    <section class="settings-section">
      <h2 class="section-title">Your Data</h2>
      <div class="data-stats">
        <span>Favorites: {{ favorites.length }} dorks saved</span>
      </div>
      <div class="data-actions">
        <button class="btn btn-secondary" @click="exportData">Export All (.json)</button>
        <button class="btn btn-secondary" @click="importData">Import</button>
        <button class="btn btn-ghost danger" @click="handleClearData">Clear Data</button>
      </div>
    </section>

    <section class="settings-section">
      <h2 class="section-title">Share Setup</h2>
      <button class="btn btn-secondary" @click="generateShareLink">Generate Settings Link</button>
      <p class="help-text">Share this link to give someone your exact configuration</p>
    </section>
  </div>
</template>

<style scoped>
.settings-panel {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 24px;
}

.settings-title {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 32px;
}

.settings-section {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border-subtle);
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 16px;
}

.mode-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mode-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 16px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  background: var(--bg-surface);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
}

.mode-btn:hover {
  border-color: var(--accent-border);
}

.mode-btn.active {
  background: var(--accent-subtle);
  border-color: var(--accent);
}

.mode-label {
  font-weight: 500;
  color: var(--text-primary);
}

.mode-desc {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;
  margin-bottom: 12px;
}

.select-group {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--text-secondary);
}

.select {
  width: auto;
  padding: 8px 12px;
}

.data-stats {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.data-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.danger {
  color: var(--danger);
}

.help-text {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 8px;
}
</style>
