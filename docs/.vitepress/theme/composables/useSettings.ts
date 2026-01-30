import { reactive, watch } from "vue";
import { getStorageItem, setStorageItem } from "../utils/storage";

export type ThemeColor =
  | "violet"
  | "blue"
  | "teal"
  | "green"
  | "amber"
  | "orange"
  | "rose"
  | "gray";
export type ThemeMode = "dark" | "light" | "system";
export type ExperienceMode = "beginner" | "practitioner" | "expert";

export interface Settings {
  experienceMode: ExperienceMode;
  theme: {
    color: ThemeColor;
    mode: ThemeMode;
  };
  defaults: {
    synonyms: boolean;
    dateRange: "1y" | "2y" | "5y" | "none";
    auOnly: boolean;
  };
}

const defaultSettings: Settings = {
  experienceMode: "practitioner",
  theme: {
    color: "violet",
    mode: "dark",
  },
  defaults: {
    synonyms: true,
    dateRange: "2y",
    auOnly: false,
  },
};

// Singleton state
let settingsState: Settings | null = null;

export function useSettings() {
  if (!settingsState) {
    settingsState = reactive<Settings>({ ...defaultSettings });
  }

  const settings = settingsState;

  // Apply theme color to CSS
  function applyThemeColor(color: ThemeColor) {
    if (typeof document === "undefined") return;
    document.documentElement.style.setProperty("--accent", `var(--color-${color})`);
  }

  // Apply theme mode
  function applyThemeMode(mode: ThemeMode) {
    if (typeof document === "undefined") return;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = mode === "dark" || (mode === "system" && prefersDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }

  // Initialize on mount
  function initialize() {
    const saved = getStorageItem<Settings>("settings", defaultSettings);
    Object.assign(settings, saved);
    applyThemeColor(settings.theme.color);
    applyThemeMode(settings.theme.mode);
  }

  // Watch for changes and persist
  watch(
    settings,
    (newSettings) => {
      setStorageItem("settings", newSettings);
      applyThemeColor(newSettings.theme.color);
      applyThemeMode(newSettings.theme.mode);
    },
    { deep: true }
  );

  // Setters
  function setThemeColor(color: ThemeColor) {
    settings.theme.color = color;
  }

  function setThemeMode(mode: ThemeMode) {
    settings.theme.mode = mode;
  }

  function setExperienceMode(mode: ExperienceMode) {
    settings.experienceMode = mode;
  }

  function resetSettings() {
    Object.assign(settings, defaultSettings);
  }

  return {
    settings,
    initialize,
    setThemeColor,
    setThemeMode,
    setExperienceMode,
    resetSettings,
  };
}
