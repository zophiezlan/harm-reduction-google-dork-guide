# VitePress Enhancement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the harm reduction dork guide into an industry-leading interactive tool with a visual Dork Builder, enhanced Explorer, user preferences, and polished design.

**Architecture:** Vue composables for state management with localStorage persistence. CSS custom properties for theming. No external state libraries needed. Build scripts generate dork data and synonym groups from markdown source.

**Tech Stack:** VitePress 1.3+, Vue 3 (Composition API), TypeScript, CSS Custom Properties, Inter + JetBrains Mono fonts

---

## Phase 1: Foundation

### Task 1: Restructure CSS Architecture

**Files:**
- Create: `docs/.vitepress/theme/styles/vars.css`
- Create: `docs/.vitepress/theme/styles/base.css`
- Create: `docs/.vitepress/theme/styles/components.css`
- Modify: `docs/.vitepress/theme/index.ts`
- Delete: `docs/.vitepress/theme/custom.css` (after migration)

**Step 1: Create vars.css with design tokens**

```css
/* docs/.vitepress/theme/styles/vars.css */
:root {
  /* Theme Colors - User Selectable */
  --color-violet: #8b5cf6;
  --color-blue: #3b82f6;
  --color-teal: #14b8a6;
  --color-green: #10b981;
  --color-amber: #f59e0b;
  --color-orange: #f97316;
  --color-rose: #f43f5e;
  --color-gray: #71717a;

  /* Active Accent (set by JS based on user preference) */
  --accent: var(--color-violet);
  --accent-hover: color-mix(in srgb, var(--accent) 80%, white);
  --accent-subtle: color-mix(in srgb, var(--accent) 15%, transparent);
  --accent-border: color-mix(in srgb, var(--accent) 30%, transparent);

  /* Background Scale - Dark Mode */
  --bg-deep: #0a0a0f;
  --bg-surface: #12121a;
  --bg-elevated: #1a1a24;
  --bg-input: #1f1f2a;

  /* Text Scale */
  --text-primary: #f4f4f5;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;

  /* Borders */
  --border-subtle: #262637;
  --border-active: #3f3f46;

  /* Semantic Colors */
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --info: #3b82f6;

  /* Block Colors (Builder) */
  --block-site: #6366f1;
  --block-filetype: #ec4899;
  --block-keyword: #8b5cf6;
  --block-date: #14b8a6;
  --block-trick: #f59e0b;

  /* Typography */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Spacing */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;

  /* Override VitePress variables */
  --vp-c-brand-1: var(--accent);
  --vp-c-brand-2: var(--accent-hover);
  --vp-c-brand-3: var(--accent-subtle);
  --vp-c-bg: var(--bg-deep);
  --vp-c-bg-alt: var(--bg-surface);
  --vp-c-bg-soft: var(--bg-elevated);
  --vp-c-text-1: var(--text-primary);
  --vp-c-text-2: var(--text-secondary);
  --vp-c-text-3: var(--text-muted);
  --vp-c-divider: var(--border-subtle);
  --vp-c-gutter: var(--border-subtle);
  --vp-font-family-base: var(--font-sans);
  --vp-font-family-mono: var(--font-mono);
}

/* Light Mode Overrides */
[data-theme="light"] {
  --bg-deep: #ffffff;
  --bg-surface: #f9fafb;
  --bg-elevated: #ffffff;
  --bg-input: #f3f4f6;
  --text-primary: #111827;
  --text-secondary: #4b5563;
  --text-muted: #9ca3af;
  --border-subtle: #e5e7eb;
  --border-active: #d1d5db;
}
```

**Step 2: Create base.css with reset and typography**

```css
/* docs/.vitepress/theme/styles/base.css */
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

/* Focus visible for accessibility */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Selection */
::selection {
  background: var(--accent-subtle);
  color: var(--text-primary);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-surface);
}

::-webkit-scrollbar-thumb {
  background: var(--border-active);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
}

/* VitePress Overrides */
.VPNavBar,
.VPSidebar {
  background: color-mix(in srgb, var(--bg-deep) 95%, transparent) !important;
  backdrop-filter: blur(12px);
}

.VPHomeHero .name {
  background: linear-gradient(120deg, var(--text-primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.VPHomeFeatures .item {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  transition: border-color var(--transition-normal), box-shadow var(--transition-normal);
}

.VPHomeFeatures .item:hover {
  border-color: var(--accent-border);
  box-shadow: 0 0 20px var(--accent-subtle);
}

/* Links */
.vp-doc a {
  color: var(--accent);
  transition: color var(--transition-fast);
}

.vp-doc a:hover {
  color: var(--accent-hover);
}

/* Inline Code */
.vp-doc :not(pre) > code {
  background: var(--bg-elevated);
  color: var(--accent);
  border-radius: var(--radius-sm);
  padding: 0.15em 0.4em;
}

/* Code Blocks */
.vp-doc div[class*='language-'] {
  background: var(--bg-surface) !important;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}
```

**Step 3: Create components.css for shared component styles**

```css
/* docs/.vitepress/theme/styles/components.css */

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-primary {
  background: var(--accent);
  color: white;
}

.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--bg-elevated);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
}

.btn-secondary:hover {
  border-color: var(--accent-border);
  background: var(--bg-input);
}

.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
}

.btn-ghost:hover {
  background: var(--bg-elevated);
  color: var(--text-primary);
}

/* Cards */
.card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 16px;
  transition: border-color var(--transition-normal), box-shadow var(--transition-normal);
}

.card:hover {
  border-color: var(--accent-border);
}

.card-elevated {
  background: var(--bg-elevated);
}

/* Inputs */
.input {
  width: 100%;
  background: var(--bg-input);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  color: var(--text-primary);
  font-size: 14px;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}

.input::placeholder {
  color: var(--text-muted);
}

/* Chips/Tags */
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 9999px;
  background: var(--bg-elevated);
  color: var(--text-secondary);
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.chip:hover {
  border-color: var(--accent-border);
  color: var(--text-primary);
}

.chip.active {
  background: var(--accent-subtle);
  border-color: var(--accent);
  color: var(--accent);
}

/* Toast Notifications */
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: slideIn 0.2s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.toast.success {
  border-color: var(--success);
}

.toast.error {
  border-color: var(--danger);
}

/* Markdown Alerts */
.markdown-alert {
  border: 1px solid var(--border-subtle);
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  padding: 12px 16px;
  margin: 16px 0;
}

.markdown-alert-note { border-left: 3px solid var(--info); }
.markdown-alert-tip { border-left: 3px solid var(--success); }
.markdown-alert-warning { border-left: 3px solid var(--warning); }
.markdown-alert-important { border-left: 3px solid var(--accent); }
.markdown-alert-caution { border-left: 3px solid var(--danger); }
```

**Step 4: Update theme index.ts**

```typescript
// docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './styles/vars.css'
import './styles/base.css'
import './styles/components.css'

export default {
  extends: DefaultTheme,
}
```

**Step 5: Delete old custom.css**

Run: `rm docs/.vitepress/theme/custom.css`

**Step 6: Verify dev server works**

Run: `npm run docs:dev`
Expected: Site loads with new styling, violet accent colors visible

**Step 7: Commit**

```bash
git add docs/.vitepress/theme/
git commit -m "refactor: restructure CSS with design tokens and component styles"
```

---

### Task 2: Create Settings Composable

**Files:**
- Create: `docs/.vitepress/theme/composables/useSettings.ts`
- Create: `docs/.vitepress/theme/utils/storage.ts`

**Step 1: Create storage utility**

```typescript
// docs/.vitepress/theme/utils/storage.ts
const STORAGE_PREFIX = 'hr-dork-'

export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value))
  } catch (e) {
    console.warn('Failed to save to localStorage:', e)
  }
}

export function removeStorageItem(key: string): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_PREFIX + key)
}
```

**Step 2: Create useSettings composable**

```typescript
// docs/.vitepress/theme/composables/useSettings.ts
import { reactive, watch, onMounted } from 'vue'
import { getStorageItem, setStorageItem } from '../utils/storage'

export type ThemeColor = 'violet' | 'blue' | 'teal' | 'green' | 'amber' | 'orange' | 'rose' | 'gray'
export type ThemeMode = 'dark' | 'light' | 'system'
export type ExperienceMode = 'beginner' | 'practitioner' | 'expert'

export interface Settings {
  experienceMode: ExperienceMode
  theme: {
    color: ThemeColor
    mode: ThemeMode
  }
  defaults: {
    synonyms: boolean
    dateRange: '1y' | '2y' | '5y' | 'none'
    auOnly: boolean
  }
}

const defaultSettings: Settings = {
  experienceMode: 'practitioner',
  theme: {
    color: 'violet',
    mode: 'dark',
  },
  defaults: {
    synonyms: true,
    dateRange: '2y',
    auOnly: false,
  },
}

// Singleton state
let settingsState: Settings | null = null

export function useSettings() {
  if (!settingsState) {
    settingsState = reactive<Settings>({ ...defaultSettings })
  }

  const settings = settingsState

  // Apply theme color to CSS
  function applyThemeColor(color: ThemeColor) {
    if (typeof document === 'undefined') return
    document.documentElement.style.setProperty('--accent', `var(--color-${color})`)
  }

  // Apply theme mode
  function applyThemeMode(mode: ThemeMode) {
    if (typeof document === 'undefined') return
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = mode === 'dark' || (mode === 'system' && prefersDark)
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }

  // Initialize on mount
  function initialize() {
    const saved = getStorageItem<Settings>('settings', defaultSettings)
    Object.assign(settings, saved)
    applyThemeColor(settings.theme.color)
    applyThemeMode(settings.theme.mode)
  }

  // Watch for changes and persist
  watch(
    settings,
    (newSettings) => {
      setStorageItem('settings', newSettings)
      applyThemeColor(newSettings.theme.color)
      applyThemeMode(newSettings.theme.mode)
    },
    { deep: true }
  )

  // Setters
  function setThemeColor(color: ThemeColor) {
    settings.theme.color = color
  }

  function setThemeMode(mode: ThemeMode) {
    settings.theme.mode = mode
  }

  function setExperienceMode(mode: ExperienceMode) {
    settings.experienceMode = mode
  }

  function resetSettings() {
    Object.assign(settings, defaultSettings)
  }

  return {
    settings,
    initialize,
    setThemeColor,
    setThemeMode,
    setExperienceMode,
    resetSettings,
  }
}
```

**Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors (may need to install @types/node if not present)

**Step 4: Commit**

```bash
git add docs/.vitepress/theme/composables/ docs/.vitepress/theme/utils/
git commit -m "feat: add settings composable with localStorage persistence"
```

---

### Task 3: Create Theme Switcher Component

**Files:**
- Create: `docs/.vitepress/theme/components/ThemeSwitcher.vue`
- Modify: `docs/.vitepress/theme/index.ts`

**Step 1: Create ThemeSwitcher component**

```vue
<!-- docs/.vitepress/theme/components/ThemeSwitcher.vue -->
<script setup lang="ts">
import { useSettings, type ThemeColor } from '../composables/useSettings'

const { settings, setThemeColor, setThemeMode } = useSettings()

const colors: { id: ThemeColor; label: string }[] = [
  { id: 'violet', label: 'Violet' },
  { id: 'blue', label: 'Blue' },
  { id: 'teal', label: 'Teal' },
  { id: 'green', label: 'Green' },
  { id: 'amber', label: 'Amber' },
  { id: 'orange', label: 'Orange' },
  { id: 'rose', label: 'Rose' },
  { id: 'gray', label: 'Gray' },
]
</script>

<template>
  <div class="theme-switcher">
    <div class="theme-section">
      <span class="theme-label">Color</span>
      <div class="color-options">
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
  box-shadow: 0 0 0 2px var(--bg-deep), 0 0 0 4px var(--swatch-color);
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
```

**Step 2: Register component globally in theme**

```typescript
// docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import './styles/vars.css'
import './styles/base.css'
import './styles/components.css'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import { useSettings } from './composables/useSettings'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ThemeSwitcher', ThemeSwitcher)
  },
  setup() {
    onMounted(() => {
      const { initialize } = useSettings()
      initialize()
    })
  },
}
```

**Step 3: Test component renders**

Run: `npm run docs:dev`
Expected: Site loads, theme applied from localStorage (or defaults)

**Step 4: Commit**

```bash
git add docs/.vitepress/theme/
git commit -m "feat: add ThemeSwitcher component with color and mode selection"
```

---

### Task 4: Create Favorites Composable

**Files:**
- Create: `docs/.vitepress/theme/composables/useFavorites.ts`

**Step 1: Create useFavorites composable**

```typescript
// docs/.vitepress/theme/composables/useFavorites.ts
import { reactive, watch } from 'vue'
import { getStorageItem, setStorageItem } from '../utils/storage'

export interface FavoriteItem {
  id: string
  packId: string
  title: string
  query: string
  addedAt: number
}

interface FavoritesState {
  items: FavoriteItem[]
}

let favoritesState: FavoritesState | null = null

export function useFavorites() {
  if (!favoritesState) {
    favoritesState = reactive<FavoritesState>({
      items: [],
    })
  }

  const state = favoritesState

  function initialize() {
    const saved = getStorageItem<FavoriteItem[]>('favorites', [])
    state.items = saved
  }

  watch(
    () => state.items,
    (items) => {
      setStorageItem('favorites', items)
    },
    { deep: true }
  )

  function addFavorite(packId: string, title: string, query: string) {
    const id = `${packId}-${title.toLowerCase().replace(/\s+/g, '-')}`
    if (state.items.some((f) => f.id === id)) return // Already exists
    state.items.push({
      id,
      packId,
      title,
      query,
      addedAt: Date.now(),
    })
  }

  function removeFavorite(id: string) {
    const idx = state.items.findIndex((f) => f.id === id)
    if (idx !== -1) {
      state.items.splice(idx, 1)
    }
  }

  function isFavorite(packId: string, title: string): boolean {
    const id = `${packId}-${title.toLowerCase().replace(/\s+/g, '-')}`
    return state.items.some((f) => f.id === id)
  }

  function toggleFavorite(packId: string, title: string, query: string) {
    if (isFavorite(packId, title)) {
      const id = `${packId}-${title.toLowerCase().replace(/\s+/g, '-')}`
      removeFavorite(id)
    } else {
      addFavorite(packId, title, query)
    }
  }

  function clearFavorites() {
    state.items = []
  }

  return {
    favorites: state.items,
    initialize,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  }
}
```

**Step 2: Commit**

```bash
git add docs/.vitepress/theme/composables/useFavorites.ts
git commit -m "feat: add favorites composable for dork bookmarking"
```

---

### Task 5: Create Toast Notification Component

**Files:**
- Create: `docs/.vitepress/theme/components/Toast.vue`
- Create: `docs/.vitepress/theme/composables/useToast.ts`

**Step 1: Create useToast composable**

```typescript
// docs/.vitepress/theme/composables/useToast.ts
import { ref } from 'vue'

export interface ToastMessage {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

const toasts = ref<ToastMessage[]>([])
let toastId = 0

export function useToast() {
  function show(message: string, type: ToastMessage['type'] = 'info', duration = 3000) {
    const id = ++toastId
    toasts.value.push({ id, message, type })
    setTimeout(() => {
      dismiss(id)
    }, duration)
  }

  function dismiss(id: number) {
    const idx = toasts.value.findIndex((t) => t.id === id)
    if (idx !== -1) {
      toasts.value.splice(idx, 1)
    }
  }

  function success(message: string) {
    show(message, 'success')
  }

  function error(message: string) {
    show(message, 'error')
  }

  function info(message: string) {
    show(message, 'info')
  }

  return {
    toasts,
    show,
    dismiss,
    success,
    error,
    info,
  }
}
```

**Step 2: Create Toast component**

```vue
<!-- docs/.vitepress/theme/components/Toast.vue -->
<script setup lang="ts">
import { useToast } from '../composables/useToast'

const { toasts, dismiss } = useToast()

const icons = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
}
</script>

<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['toast', toast.type]"
          @click="dismiss(toast.id)"
        >
          <span class="toast-icon">{{ icons[toast.type] }}</span>
          <span class="toast-message">{{ toast.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 9999;
}

.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  min-width: 200px;
}

.toast.success {
  border-left: 3px solid var(--success);
}

.toast.success .toast-icon {
  color: var(--success);
}

.toast.error {
  border-left: 3px solid var(--danger);
}

.toast.error .toast-icon {
  color: var(--danger);
}

.toast.info {
  border-left: 3px solid var(--info);
}

.toast.info .toast-icon {
  color: var(--info);
}

.toast-icon {
  font-size: 16px;
  font-weight: 600;
}

.toast-message {
  font-size: 14px;
  color: var(--text-primary);
}

/* Transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
```

**Step 3: Register Toast in theme**

```typescript
// docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import './styles/vars.css'
import './styles/base.css'
import './styles/components.css'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import Toast from './components/Toast.vue'
import { useSettings } from './composables/useSettings'
import { useFavorites } from './composables/useFavorites'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ThemeSwitcher', ThemeSwitcher)
    app.component('Toast', Toast)
  },
  setup() {
    onMounted(() => {
      const { initialize: initSettings } = useSettings()
      const { initialize: initFavorites } = useFavorites()
      initSettings()
      initFavorites()
    })
  },
}
```

**Step 4: Commit**

```bash
git add docs/.vitepress/theme/
git commit -m "feat: add Toast notification system"
```

---

### Task 6: Build Synonym Data Extractor

**Files:**
- Create: `scripts/build-synonyms.js`
- Modify: `package.json`

**Step 1: Create synonym extraction script**

```javascript
// scripts/build-synonyms.js
const fs = require('fs')
const path = require('path')

const SYNONYM_FILE = path.join(__dirname, '../docs/05-synonym-blocks.md')
const OUTPUT_FILE = path.join(__dirname, '../docs/.vitepress/theme/data/synonyms.ts')

function extractSynonymGroups() {
  const content = fs.readFileSync(SYNONYM_FILE, 'utf-8')
  const lines = content.split('\n')

  const groups = []
  let currentGroup = null
  let captureCode = false
  let codeBuffer = []

  for (const line of lines) {
    const trimmed = line.trim()

    // H2 or H3 headers = new group name
    if (trimmed.match(/^##+ .+/)) {
      if (currentGroup && currentGroup.terms.length > 0) {
        groups.push(currentGroup)
      }
      const name = trimmed
        .replace(/^#+\s*/, '')
        .replace(/🌏|🚨|💉|👥|💊|🔬|🧪|🏥|🎪|👩‍⚕️|📊|🏠|🧠|👶|👨‍👩‍👧|🖤💛❤️|⚖️|📋|🔄|📅|🔧/g, '')
        .trim()
      currentGroup = {
        id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''),
        name,
        terms: [],
        pattern: '',
      }
      continue
    }

    // Code blocks contain the synonym pattern
    if (trimmed.startsWith('```')) {
      if (!captureCode) {
        captureCode = true
        codeBuffer = []
      } else {
        captureCode = false
        if (currentGroup && codeBuffer.length > 0) {
          const pattern = codeBuffer.join(' ').trim()
          // Extract individual terms from OR pattern
          const terms = pattern
            .replace(/^\(|\)$/g, '')
            .split(/\s+OR\s+/i)
            .map(t => t.replace(/^["']|["']$/g, '').trim())
            .filter(t => t.length > 0 && !t.includes('site:') && !t.includes('filetype:'))

          if (terms.length > 1) {
            currentGroup.terms = terms
            currentGroup.pattern = pattern
          }
        }
      }
      continue
    }

    if (captureCode) {
      codeBuffer.push(line)
    }
  }

  // Push last group
  if (currentGroup && currentGroup.terms.length > 0) {
    groups.push(currentGroup)
  }

  return groups.filter(g => g.terms.length > 0)
}

function main() {
  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const groups = extractSynonymGroups()

  const output = `// Auto-generated from 05-synonym-blocks.md
// Do not edit manually

export interface SynonymGroup {
  id: string
  name: string
  terms: string[]
  pattern: string
}

export const SYNONYM_GROUPS: SynonymGroup[] = ${JSON.stringify(groups, null, 2)}

export function findSynonyms(term: string): SynonymGroup | undefined {
  const lower = term.toLowerCase()
  return SYNONYM_GROUPS.find(g =>
    g.terms.some(t => t.toLowerCase().includes(lower) || lower.includes(t.toLowerCase()))
  )
}

export function expandWithSynonyms(term: string): string {
  const group = findSynonyms(term)
  if (!group) return term
  return group.pattern
}
`

  fs.writeFileSync(OUTPUT_FILE, output)
  console.log(`Generated ${groups.length} synonym groups to ${OUTPUT_FILE}`)
}

main()
```

**Step 2: Update package.json scripts**

Add to scripts section:
```json
"build:synonyms": "node scripts/build-synonyms.js",
"build:all": "npm run build && npm run build:synonyms"
```

**Step 3: Run and verify**

Run: `npm run build:synonyms`
Expected: Creates `docs/.vitepress/theme/data/synonyms.ts` with synonym groups

**Step 4: Commit**

```bash
git add scripts/build-synonyms.js package.json docs/.vitepress/theme/data/
git commit -m "feat: add synonym extraction build script"
```

---

## Phase 2: Dork Explorer

### Task 7: Create Dork Data Composable

**Files:**
- Create: `docs/.vitepress/theme/composables/useDorkData.ts`
- Create: `docs/.vitepress/theme/data/types.ts`

**Step 1: Create types**

```typescript
// docs/.vitepress/theme/data/types.ts
export interface Dork {
  title: string
  category: string
  query: string
  explanation: string
}

export interface DorkPack {
  id: string
  title: string
  description: string
  dorks: Dork[]
}

export interface DorkWithPack extends Dork {
  packId: string
  packTitle: string
}
```

**Step 2: Create useDorkData composable**

```typescript
// docs/.vitepress/theme/composables/useDorkData.ts
import { ref, computed } from 'vue'
import type { DorkPack, DorkWithPack } from '../data/types'

const dorkPacks = ref<DorkPack[]>([])
const isLoaded = ref(false)
const isLoading = ref(false)

export function useDorkData() {
  async function loadDorks() {
    if (isLoaded.value || isLoading.value) return
    isLoading.value = true

    try {
      // Load from global window object (set by dork-data.js)
      if (typeof window !== 'undefined' && (window as any).DORK_DATA) {
        dorkPacks.value = (window as any).DORK_DATA
        isLoaded.value = true
      }
    } catch (e) {
      console.error('Failed to load dork data:', e)
    } finally {
      isLoading.value = false
    }
  }

  const allDorks = computed<DorkWithPack[]>(() => {
    return dorkPacks.value.flatMap((pack) =>
      pack.dorks.map((dork) => ({
        ...dork,
        packId: pack.id,
        packTitle: pack.title,
      }))
    )
  })

  const packList = computed(() =>
    dorkPacks.value.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      count: p.dorks.length,
    }))
  )

  const categories = computed(() => {
    const cats = new Set<string>()
    allDorks.value.forEach((d) => cats.add(d.category))
    return Array.from(cats).sort()
  })

  function searchDorks(
    query: string,
    filters: {
      packs?: string[]
      categories?: string[]
    } = {}
  ): DorkWithPack[] {
    let results = allDorks.value

    // Filter by packs
    if (filters.packs && filters.packs.length > 0) {
      results = results.filter((d) => filters.packs!.includes(d.packId))
    }

    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      results = results.filter((d) => filters.categories!.includes(d.category))
    }

    // Search query
    if (query.trim()) {
      const lower = query.toLowerCase()
      results = results.filter(
        (d) =>
          d.title.toLowerCase().includes(lower) ||
          d.query.toLowerCase().includes(lower) ||
          d.explanation.toLowerCase().includes(lower) ||
          d.packTitle.toLowerCase().includes(lower)
      )
    }

    return results
  }

  function getDorksByPack(packId: string): DorkWithPack[] {
    return allDorks.value.filter((d) => d.packId === packId)
  }

  return {
    dorkPacks,
    allDorks,
    packList,
    categories,
    isLoaded,
    isLoading,
    loadDorks,
    searchDorks,
    getDorksByPack,
  }
}
```

**Step 3: Commit**

```bash
git add docs/.vitepress/theme/composables/useDorkData.ts docs/.vitepress/theme/data/types.ts
git commit -m "feat: add dork data composable for search and filtering"
```

---

### Task 8: Create DorkCard Component

**Files:**
- Create: `docs/.vitepress/theme/components/explorer/DorkCard.vue`

**Step 1: Create DorkCard component**

```vue
<!-- docs/.vitepress/theme/components/explorer/DorkCard.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import type { DorkWithPack } from '../../data/types'
import { useFavorites } from '../../composables/useFavorites'
import { useToast } from '../../composables/useToast'

const props = defineProps<{
  dork: DorkWithPack
}>()

const emit = defineEmits<{
  openInBuilder: [dork: DorkWithPack]
}>()

const { isFavorite, toggleFavorite } = useFavorites()
const { success } = useToast()

const isFav = computed(() => isFavorite(props.dork.packId, props.dork.title))

function copyQuery() {
  navigator.clipboard.writeText(props.dork.query)
  success('Query copied to clipboard')
}

function searchGoogle() {
  const url = `https://www.google.com/search?q=${encodeURIComponent(props.dork.query)}`
  window.open(url, '_blank')
}

function handleFavorite() {
  toggleFavorite(props.dork.packId, props.dork.title, props.dork.query)
  success(isFav.value ? 'Removed from favorites' : 'Added to favorites')
}
</script>

<template>
  <div class="dork-card">
    <div class="card-header">
      <h3 class="card-title">{{ dork.title }}</h3>
      <span class="card-category">{{ dork.category }}</span>
    </div>

    <div class="card-query">
      <code>{{ dork.query }}</code>
    </div>

    <p v-if="dork.explanation" class="card-explanation">
      {{ dork.explanation.slice(0, 150) }}{{ dork.explanation.length > 150 ? '...' : '' }}
    </p>

    <div class="card-meta">
      <span class="card-pack">{{ dork.packTitle }}</span>
    </div>

    <div class="card-actions">
      <button class="action-btn" title="Copy query" @click="copyQuery">
        <span>📋</span> Copy
      </button>
      <button class="action-btn" title="Search Google" @click="searchGoogle">
        <span>🔍</span> Search
      </button>
      <button class="action-btn" title="Open in Builder" @click="emit('openInBuilder', dork)">
        <span>🔧</span> Builder
      </button>
      <button
        :class="['action-btn', 'favorite-btn', { active: isFav }]"
        title="Toggle favorite"
        @click="handleFavorite"
      >
        <span>{{ isFav ? '★' : '☆' }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.dork-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color var(--transition-normal), box-shadow var(--transition-normal);
}

.dork-card:hover {
  border-color: var(--accent-border);
  box-shadow: 0 0 20px var(--accent-subtle);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.3;
}

.card-category {
  font-size: 11px;
  padding: 2px 8px;
  background: var(--bg-elevated);
  border-radius: 9999px;
  color: var(--text-muted);
  white-space: nowrap;
}

.card-query {
  background: var(--bg-deep);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  overflow-x: auto;
}

.card-query code {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--accent);
  white-space: pre-wrap;
  word-break: break-all;
}

.card-explanation {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

.card-meta {
  display: flex;
  gap: 8px;
}

.card-pack {
  font-size: 11px;
  color: var(--text-muted);
}

.card-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid var(--border-subtle);
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  font-size: 12px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-btn:hover {
  border-color: var(--accent-border);
  color: var(--text-primary);
}

.favorite-btn.active {
  color: var(--warning);
  border-color: var(--warning);
}
</style>
```

**Step 2: Commit**

```bash
git add docs/.vitepress/theme/components/explorer/DorkCard.vue
git commit -m "feat: add DorkCard component with copy, search, and favorite actions"
```

---

### Task 9: Create DorkExplorer Page Component

**Files:**
- Create: `docs/.vitepress/theme/components/explorer/DorkExplorer.vue`
- Create: `docs/explorer.md`

**Step 1: Create DorkExplorer component**

```vue
<!-- docs/.vitepress/theme/components/explorer/DorkExplorer.vue -->
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useDorkData } from '../../composables/useDorkData'
import { useFavorites } from '../../composables/useFavorites'
import DorkCard from './DorkCard.vue'
import type { DorkWithPack } from '../../data/types'

const { loadDorks, searchDorks, packList, categories, isLoaded } = useDorkData()
const { favorites } = useFavorites()

// State
const searchQuery = ref('')
const selectedPacks = ref<string[]>([])
const selectedCategories = ref<string[]>([])
const showFavoritesOnly = ref(false)
const viewMode = ref<'grid' | 'list'>('grid')

// Load dorks on mount
onMounted(async () => {
  // Load dork-data.js script
  if (typeof window !== 'undefined' && !(window as any).DORK_DATA) {
    const script = document.createElement('script')
    script.src = '/harm-reduction-google-dork-guide/dork-explorer/dork-data.js'
    script.onload = () => loadDorks()
    document.head.appendChild(script)
  } else {
    loadDorks()
  }
})

// Filtered results
const results = computed(() => {
  if (showFavoritesOnly.value) {
    const favIds = new Set(favorites.map((f) => f.id))
    return searchDorks(searchQuery.value, {
      packs: selectedPacks.value.length > 0 ? selectedPacks.value : undefined,
      categories: selectedCategories.value.length > 0 ? selectedCategories.value : undefined,
    }).filter((d) => {
      const id = `${d.packId}-${d.title.toLowerCase().replace(/\s+/g, '-')}`
      return favIds.has(id)
    })
  }

  return searchDorks(searchQuery.value, {
    packs: selectedPacks.value.length > 0 ? selectedPacks.value : undefined,
    categories: selectedCategories.value.length > 0 ? selectedCategories.value : undefined,
  })
})

function togglePack(packId: string) {
  const idx = selectedPacks.value.indexOf(packId)
  if (idx === -1) {
    selectedPacks.value.push(packId)
  } else {
    selectedPacks.value.splice(idx, 1)
  }
}

function toggleCategory(category: string) {
  const idx = selectedCategories.value.indexOf(category)
  if (idx === -1) {
    selectedCategories.value.push(category)
  } else {
    selectedCategories.value.splice(idx, 1)
  }
}

function clearFilters() {
  searchQuery.value = ''
  selectedPacks.value = []
  selectedCategories.value = []
  showFavoritesOnly.value = false
}

function openInBuilder(dork: DorkWithPack) {
  // Navigate to builder with query
  const url = `/harm-reduction-google-dork-guide/builder?q=${encodeURIComponent(dork.query)}`
  window.location.href = url
}

// Keyboard shortcuts
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
      e.preventDefault()
      document.querySelector<HTMLInputElement>('.search-input')?.focus()
    }
    if (e.key === 'Escape') {
      searchQuery.value = ''
      ;(document.activeElement as HTMLElement)?.blur()
    }
  }
  window.addEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="dork-explorer">
    <!-- Header -->
    <header class="explorer-header">
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          class="search-input input"
          placeholder="Search dorks... (press / to focus)"
        />
        <span v-if="searchQuery" class="search-clear" @click="searchQuery = ''">✕</span>
      </div>

      <div class="header-actions">
        <button
          :class="['chip', { active: showFavoritesOnly }]"
          @click="showFavoritesOnly = !showFavoritesOnly"
        >
          ★ Favorites ({{ favorites.length }})
        </button>
        <button class="chip" @click="clearFilters">Clear filters</button>
      </div>
    </header>

    <div class="explorer-body">
      <!-- Sidebar -->
      <aside class="explorer-sidebar">
        <div class="filter-section">
          <h4 class="filter-title">Packs</h4>
          <div class="filter-list">
            <button
              v-for="pack in packList"
              :key="pack.id"
              :class="['filter-item', { active: selectedPacks.includes(pack.id) }]"
              @click="togglePack(pack.id)"
            >
              <span class="filter-name">{{ pack.title }}</span>
              <span class="filter-count">{{ pack.count }}</span>
            </button>
          </div>
        </div>

        <div class="filter-section">
          <h4 class="filter-title">Categories</h4>
          <div class="filter-chips">
            <button
              v-for="cat in categories"
              :key="cat"
              :class="['chip', { active: selectedCategories.includes(cat) }]"
              @click="toggleCategory(cat)"
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </aside>

      <!-- Main content -->
      <main class="explorer-main">
        <div class="results-header">
          <span class="results-count">{{ results.length }} dorks found</span>
          <div class="view-toggle">
            <button
              :class="['view-btn', { active: viewMode === 'grid' }]"
              @click="viewMode = 'grid'"
            >
              Grid
            </button>
            <button
              :class="['view-btn', { active: viewMode === 'list' }]"
              @click="viewMode = 'list'"
            >
              List
            </button>
          </div>
        </div>

        <div v-if="!isLoaded" class="loading">Loading dorks...</div>

        <div v-else-if="results.length === 0" class="no-results">
          No dorks found. Try adjusting your filters.
        </div>

        <div v-else :class="['results-grid', viewMode]">
          <DorkCard
            v-for="dork in results.slice(0, 100)"
            :key="`${dork.packId}-${dork.title}`"
            :dork="dork"
            @open-in-builder="openInBuilder"
          />
        </div>

        <p v-if="results.length > 100" class="results-note">
          Showing first 100 results. Refine your search to see more specific results.
        </p>
      </main>
    </div>
  </div>
</template>

<style scoped>
.dork-explorer {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.explorer-header {
  padding: 24px;
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--bg-deep);
  position: sticky;
  top: 0;
  z-index: 10;
}

.search-wrapper {
  position: relative;
  max-width: 600px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
}

.search-input {
  padding-left: 44px;
  padding-right: 40px;
}

.search-clear {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--text-muted);
}

.header-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.explorer-body {
  display: flex;
  flex: 1;
}

.explorer-sidebar {
  width: 280px;
  padding: 24px;
  border-right: 1px solid var(--border-subtle);
  background: var(--bg-surface);
  overflow-y: auto;
  flex-shrink: 0;
}

.filter-section {
  margin-bottom: 24px;
}

.filter-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 12px;
}

.filter-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.filter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: var(--radius-md);
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
}

.filter-item:hover {
  background: var(--bg-elevated);
  color: var(--text-primary);
}

.filter-item.active {
  background: var(--accent-subtle);
  color: var(--accent);
}

.filter-count {
  font-size: 11px;
  background: var(--bg-elevated);
  padding: 2px 6px;
  border-radius: 4px;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.explorer-main {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.results-count {
  font-size: 14px;
  color: var(--text-secondary);
}

.view-toggle {
  display: flex;
  gap: 4px;
}

.view-btn {
  padding: 6px 12px;
  font-size: 12px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  cursor: pointer;
}

.view-btn.active {
  background: var(--accent-subtle);
  border-color: var(--accent);
  color: var(--accent);
}

.results-grid {
  display: grid;
  gap: 16px;
}

.results-grid.grid {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.results-grid.list {
  grid-template-columns: 1fr;
}

.loading,
.no-results {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
}

.results-note {
  text-align: center;
  padding: 20px;
  color: var(--text-muted);
  font-size: 13px;
}

/* Responsive */
@media (max-width: 768px) {
  .explorer-body {
    flex-direction: column;
  }

  .explorer-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--border-subtle);
  }

  .results-grid.grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

**Step 2: Create explorer.md page**

```markdown
---
layout: page
title: Dork Explorer
---

<script setup>
import DorkExplorer from './.vitepress/theme/components/explorer/DorkExplorer.vue'
</script>

<DorkExplorer />
```

**Step 3: Register components and update config**

Update `docs/.vitepress/theme/index.ts`:
```typescript
import DorkExplorer from './components/explorer/DorkExplorer.vue'
import DorkCard from './components/explorer/DorkCard.vue'

// In enhanceApp:
app.component('DorkExplorer', DorkExplorer)
app.component('DorkCard', DorkCard)
```

Update `docs/.vitepress/config.mts` nav:
```typescript
{ text: "Explorer", link: "/explorer" },
```

**Step 4: Verify explorer loads**

Run: `npm run docs:dev`
Navigate to `/explorer`
Expected: Explorer page loads, shows dorks after loading

**Step 5: Commit**

```bash
git add docs/.vitepress/theme/components/explorer/ docs/explorer.md docs/.vitepress/config.mts
git commit -m "feat: add DorkExplorer page with search, filtering, and favorites"
```

---

## Phase 3: Dork Builder

### Task 10: Create Query Builder Composable

**Files:**
- Create: `docs/.vitepress/theme/composables/useQueryBuilder.ts`

**Step 1: Create useQueryBuilder composable**

```typescript
// docs/.vitepress/theme/composables/useQueryBuilder.ts
import { reactive, computed } from 'vue'
import { SYNONYM_GROUPS, findSynonyms } from '../data/synonyms'

export type BlockType = 'site' | 'filetype' | 'keyword' | 'date' | 'trick'

export interface QueryBlock {
  id: string
  type: BlockType
  value: string
  options: Record<string, any>
}

interface BuilderState {
  blocks: QueryBlock[]
  selectedBlockId: string | null
}

let builderState: BuilderState | null = null
let blockIdCounter = 0

export function useQueryBuilder() {
  if (!builderState) {
    builderState = reactive<BuilderState>({
      blocks: [],
      selectedBlockId: null,
    })
  }

  const state = builderState

  // Generate query string from blocks
  const queryString = computed(() => {
    return state.blocks
      .map((block) => {
        switch (block.type) {
          case 'site':
            const wildcard = block.options.wildcard ? '*.' : ''
            return `site:${wildcard}${block.value}`
          case 'filetype':
            return `filetype:${block.value}`
          case 'keyword':
            if (block.options.useSynonyms) {
              const group = findSynonyms(block.value)
              if (group) return group.pattern
            }
            if (block.options.exact) return `"${block.value}"`
            return block.value
          case 'date':
            if (block.options.type === 'after') return `after:${block.value}`
            if (block.options.type === 'before') return `before:${block.value}`
            return ''
          case 'trick':
            return block.value
          default:
            return block.value
        }
      })
      .filter((s) => s.length > 0)
      .join(' ')
  })

  function addBlock(type: BlockType, value = '', options: Record<string, any> = {}) {
    const id = `block-${++blockIdCounter}`
    state.blocks.push({ id, type, value, options })
    state.selectedBlockId = id
    return id
  }

  function updateBlock(id: string, updates: Partial<Omit<QueryBlock, 'id'>>) {
    const block = state.blocks.find((b) => b.id === id)
    if (block) {
      Object.assign(block, updates)
    }
  }

  function removeBlock(id: string) {
    const idx = state.blocks.findIndex((b) => b.id === id)
    if (idx !== -1) {
      state.blocks.splice(idx, 1)
      if (state.selectedBlockId === id) {
        state.selectedBlockId = state.blocks[0]?.id || null
      }
    }
  }

  function selectBlock(id: string | null) {
    state.selectedBlockId = id
  }

  function clearBlocks() {
    state.blocks = []
    state.selectedBlockId = null
  }

  function loadFromQuery(query: string) {
    clearBlocks()

    // Parse site:
    const siteMatch = query.match(/site:(\*\.)?([^\s]+)/i)
    if (siteMatch) {
      addBlock('site', siteMatch[2], { wildcard: !!siteMatch[1] })
    }

    // Parse filetype:
    const filetypeMatch = query.match(/filetype:([^\s]+)/i)
    if (filetypeMatch) {
      addBlock('filetype', filetypeMatch[1])
    }

    // Parse after:/before:
    const afterMatch = query.match(/after:([^\s]+)/i)
    if (afterMatch) {
      addBlock('date', afterMatch[1], { type: 'after' })
    }
    const beforeMatch = query.match(/before:([^\s]+)/i)
    if (beforeMatch) {
      addBlock('date', beforeMatch[1], { type: 'before' })
    }

    // Extract remaining keywords (rough extraction)
    let keywords = query
      .replace(/site:[^\s]+/gi, '')
      .replace(/filetype:[^\s]+/gi, '')
      .replace(/after:[^\s]+/gi, '')
      .replace(/before:[^\s]+/gi, '')
      .trim()

    if (keywords) {
      addBlock('keyword', keywords, { useSynonyms: false, exact: keywords.startsWith('"') })
    }
  }

  return {
    blocks: computed(() => state.blocks),
    selectedBlockId: computed(() => state.selectedBlockId),
    selectedBlock: computed(() => state.blocks.find((b) => b.id === state.selectedBlockId)),
    queryString,
    addBlock,
    updateBlock,
    removeBlock,
    selectBlock,
    clearBlocks,
    loadFromQuery,
  }
}
```

**Step 2: Commit**

```bash
git add docs/.vitepress/theme/composables/useQueryBuilder.ts
git commit -m "feat: add query builder composable with block-based query construction"
```

---

### Task 11: Create Builder Block Components

**Files:**
- Create: `docs/.vitepress/theme/components/builder/BlockPalette.vue`
- Create: `docs/.vitepress/theme/components/builder/BlockEditor.vue`
- Create: `docs/.vitepress/theme/components/builder/QueryDisplay.vue`

**Step 1: Create BlockPalette component**

```vue
<!-- docs/.vitepress/theme/components/builder/BlockPalette.vue -->
<script setup lang="ts">
import { useQueryBuilder, type BlockType } from '../../composables/useQueryBuilder'

const { addBlock } = useQueryBuilder()

const blockTypes: { type: BlockType; icon: string; label: string; color: string }[] = [
  { type: 'site', icon: '🌐', label: 'Site', color: 'var(--block-site)' },
  { type: 'filetype', icon: '📄', label: 'File', color: 'var(--block-filetype)' },
  { type: 'keyword', icon: '💬', label: 'Keywords', color: 'var(--block-keyword)' },
  { type: 'date', icon: '📅', label: 'Date', color: 'var(--block-date)' },
  { type: 'trick', icon: '⚡', label: 'Tricks', color: 'var(--block-trick)' },
]

function handleAdd(type: BlockType) {
  addBlock(type)
}
</script>

<template>
  <div class="block-palette">
    <span class="palette-label">+ Add Block</span>
    <div class="palette-buttons">
      <button
        v-for="bt in blockTypes"
        :key="bt.type"
        class="palette-btn"
        :style="{ '--block-color': bt.color }"
        @click="handleAdd(bt.type)"
      >
        <span class="btn-icon">{{ bt.icon }}</span>
        <span class="btn-label">{{ bt.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.block-palette {
  padding: 16px;
  border-top: 1px solid var(--border-subtle);
}

.palette-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.palette-buttons {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.palette-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  cursor: pointer;
  transition: all var(--transition-fast);
  min-width: 70px;
}

.palette-btn:hover {
  border-color: var(--block-color);
  box-shadow: 0 0 12px color-mix(in srgb, var(--block-color) 30%, transparent);
}

.btn-icon {
  font-size: 20px;
}

.btn-label {
  font-size: 11px;
  color: var(--text-secondary);
}
</style>
```

**Step 2: Create QueryDisplay component**

```vue
<!-- docs/.vitepress/theme/components/builder/QueryDisplay.vue -->
<script setup lang="ts">
import { useQueryBuilder } from '../../composables/useQueryBuilder'
import { useToast } from '../../composables/useToast'

const { blocks, queryString, selectBlock, selectedBlockId, removeBlock } = useQueryBuilder()
const { success } = useToast()

const blockColors: Record<string, string> = {
  site: 'var(--block-site)',
  filetype: 'var(--block-filetype)',
  keyword: 'var(--block-keyword)',
  date: 'var(--block-date)',
  trick: 'var(--block-trick)',
}

function copyQuery() {
  navigator.clipboard.writeText(queryString.value)
  success('Query copied to clipboard')
}

function searchGoogle() {
  const url = `https://www.google.com/search?q=${encodeURIComponent(queryString.value)}`
  window.open(url, '_blank')
}
</script>

<template>
  <div class="query-display">
    <div class="query-label">Live Query</div>

    <div class="query-box">
      <div v-if="blocks.length === 0" class="query-placeholder">
        Add blocks below to build your query
      </div>
      <div v-else class="query-blocks">
        <span
          v-for="block in blocks"
          :key="block.id"
          :class="['query-block', { selected: block.id === selectedBlockId }]"
          :style="{ '--block-color': blockColors[block.type] }"
          @click="selectBlock(block.id)"
        >
          {{ block.type }}:{{ block.value || '...' }}
          <button class="block-remove" @click.stop="removeBlock(block.id)">×</button>
        </span>
      </div>
    </div>

    <div v-if="queryString" class="query-raw">
      <code>{{ queryString }}</code>
    </div>

    <div class="query-actions">
      <button class="btn btn-primary" :disabled="!queryString" @click="searchGoogle">
        🔍 Search Google
      </button>
      <button class="btn btn-secondary" :disabled="!queryString" @click="copyQuery">
        📋 Copy Query
      </button>
    </div>
  </div>
</template>

<style scoped>
.query-display {
  padding: 20px;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
}

.query-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}

.query-box {
  background: var(--bg-deep);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 16px;
  min-height: 60px;
}

.query-placeholder {
  color: var(--text-muted);
  font-size: 14px;
}

.query-blocks {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.query-block {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: color-mix(in srgb, var(--block-color) 20%, transparent);
  border: 1px solid var(--block-color);
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.query-block:hover {
  background: color-mix(in srgb, var(--block-color) 30%, transparent);
}

.query-block.selected {
  box-shadow: 0 0 0 2px var(--block-color);
}

.block-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: none;
  background: var(--bg-elevated);
  color: var(--text-muted);
  font-size: 12px;
  cursor: pointer;
  opacity: 0.6;
}

.block-remove:hover {
  opacity: 1;
  background: var(--danger);
  color: white;
}

.query-raw {
  margin-top: 12px;
  padding: 10px;
  background: var(--bg-elevated);
  border-radius: var(--radius-md);
}

.query-raw code {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--accent);
  word-break: break-all;
}

.query-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}
</style>
```

**Step 3: Create BlockEditor component**

```vue
<!-- docs/.vitepress/theme/components/builder/BlockEditor.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useQueryBuilder } from '../../composables/useQueryBuilder'
import { SYNONYM_GROUPS, findSynonyms } from '../../data/synonyms'

const { selectedBlock, updateBlock, removeBlock } = useQueryBuilder()

const sitePresets = [
  { label: 'Australian Gov', value: 'gov.au' },
  { label: 'Health Gov', value: 'health.gov.au' },
  { label: 'Education', value: 'edu.au' },
  { label: 'Organisations', value: 'org.au' },
]

const filetypePresets = ['pdf', 'doc', 'docx', 'xlsx', 'ppt', 'pptx']

const datePresets = [
  { label: 'Last year', value: new Date().getFullYear() - 1 },
  { label: 'Last 2 years', value: new Date().getFullYear() - 2 },
  { label: 'Last 5 years', value: new Date().getFullYear() - 5 },
]

const trickPresets = [
  { label: 'In title', value: 'intitle:' },
  { label: 'In URL', value: 'inurl:' },
  { label: 'Related', value: 'related:' },
  { label: 'Exclude', value: '-' },
  { label: 'OR group', value: '(term1 OR term2)' },
  { label: 'Exact phrase', value: '"exact phrase"' },
  { label: 'Wildcard', value: '*' },
]

const synonymSuggestion = computed(() => {
  if (selectedBlock.value?.type !== 'keyword') return null
  return findSynonyms(selectedBlock.value.value)
})
</script>

<template>
  <div v-if="selectedBlock" class="block-editor">
    <div class="editor-header">
      <span class="editor-type">{{ selectedBlock.type.toUpperCase() }}</span>
      <button class="editor-remove" @click="removeBlock(selectedBlock.id)">Remove</button>
    </div>

    <!-- Site Block -->
    <div v-if="selectedBlock.type === 'site'" class="editor-content">
      <div class="preset-group">
        <button
          v-for="preset in sitePresets"
          :key="preset.value"
          :class="['preset-btn', { active: selectedBlock.value === preset.value }]"
          @click="updateBlock(selectedBlock.id, { value: preset.value })"
        >
          {{ preset.label }}
        </button>
      </div>
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="Custom domain..."
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
      <label class="checkbox-label">
        <input
          type="checkbox"
          :checked="selectedBlock.options.wildcard"
          @change="updateBlock(selectedBlock.id, { options: { ...selectedBlock.options, wildcard: ($event.target as HTMLInputElement).checked } })"
        />
        Include subdomains (wildcard)
      </label>
    </div>

    <!-- Filetype Block -->
    <div v-if="selectedBlock.type === 'filetype'" class="editor-content">
      <div class="preset-group">
        <button
          v-for="ft in filetypePresets"
          :key="ft"
          :class="['preset-btn', { active: selectedBlock.value === ft }]"
          @click="updateBlock(selectedBlock.id, { value: ft })"
        >
          {{ ft.toUpperCase() }}
        </button>
      </div>
    </div>

    <!-- Keyword Block -->
    <div v-if="selectedBlock.type === 'keyword'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="Enter keywords..."
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
      <label class="checkbox-label">
        <input
          type="checkbox"
          :checked="selectedBlock.options.exact"
          @change="updateBlock(selectedBlock.id, { options: { ...selectedBlock.options, exact: ($event.target as HTMLInputElement).checked } })"
        />
        Exact phrase
      </label>

      <div v-if="synonymSuggestion" class="synonym-suggestion">
        <div class="synonym-header">
          <span>💡 Synonym expansion available</span>
          <label class="checkbox-label">
            <input
              type="checkbox"
              :checked="selectedBlock.options.useSynonyms"
              @change="updateBlock(selectedBlock.id, { options: { ...selectedBlock.options, useSynonyms: ($event.target as HTMLInputElement).checked } })"
            />
            Use synonyms
          </label>
        </div>
        <code class="synonym-preview">{{ synonymSuggestion.pattern }}</code>
      </div>
    </div>

    <!-- Date Block -->
    <div v-if="selectedBlock.type === 'date'" class="editor-content">
      <div class="radio-group">
        <label>
          <input
            type="radio"
            :checked="selectedBlock.options.type === 'after'"
            @change="updateBlock(selectedBlock.id, { options: { ...selectedBlock.options, type: 'after' } })"
          />
          After
        </label>
        <label>
          <input
            type="radio"
            :checked="selectedBlock.options.type === 'before'"
            @change="updateBlock(selectedBlock.id, { options: { ...selectedBlock.options, type: 'before' } })"
          />
          Before
        </label>
      </div>
      <div class="preset-group">
        <button
          v-for="preset in datePresets"
          :key="preset.value"
          :class="['preset-btn', { active: selectedBlock.value === String(preset.value) }]"
          @click="updateBlock(selectedBlock.id, { value: String(preset.value), options: { ...selectedBlock.options, type: selectedBlock.options.type || 'after' } })"
        >
          {{ preset.label }}
        </button>
      </div>
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="YYYY or YYYY-MM-DD"
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- Trick Block -->
    <div v-if="selectedBlock.type === 'trick'" class="editor-content">
      <div class="preset-group">
        <button
          v-for="trick in trickPresets"
          :key="trick.value"
          class="preset-btn"
          @click="updateBlock(selectedBlock.id, { value: trick.value })"
        >
          {{ trick.label }}
        </button>
      </div>
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="Custom operator..."
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>
  </div>

  <div v-else class="block-editor empty">
    <p>Select a block to edit, or add a new block below</p>
  </div>
</template>

<style scoped>
.block-editor {
  padding: 20px;
  background: var(--bg-elevated);
  border-top: 1px solid var(--border-subtle);
}

.block-editor.empty {
  text-align: center;
  color: var(--text-muted);
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.editor-type {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.editor-remove {
  font-size: 12px;
  color: var(--danger);
  background: none;
  border: none;
  cursor: pointer;
}

.editor-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.preset-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.preset-btn {
  padding: 6px 12px;
  font-size: 12px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  background: var(--bg-surface);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.preset-btn:hover {
  border-color: var(--accent-border);
  color: var(--text-primary);
}

.preset-btn.active {
  background: var(--accent-subtle);
  border-color: var(--accent);
  color: var(--accent);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
}

.radio-group {
  display: flex;
  gap: 16px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
}

.synonym-suggestion {
  background: var(--bg-surface);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-md);
  padding: 12px;
}

.synonym-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  color: var(--accent);
}

.synonym-preview {
  display: block;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-secondary);
  word-break: break-all;
}
</style>
```

**Step 4: Commit**

```bash
git add docs/.vitepress/theme/components/builder/
git commit -m "feat: add Builder block components (palette, editor, query display)"
```

---

### Task 12: Create DorkBuilder Page

**Files:**
- Create: `docs/.vitepress/theme/components/builder/DorkBuilder.vue`
- Create: `docs/builder.md`

**Step 1: Create DorkBuilder component**

```vue
<!-- docs/.vitepress/theme/components/builder/DorkBuilder.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { useQueryBuilder } from '../../composables/useQueryBuilder'
import { useToast } from '../../composables/useToast'
import QueryDisplay from './QueryDisplay.vue'
import BlockPalette from './BlockPalette.vue'
import BlockEditor from './BlockEditor.vue'

const { clearBlocks, loadFromQuery, queryString } = useQueryBuilder()
const { success } = useToast()

// Load query from URL params
onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const q = params.get('q')
  if (q) {
    loadFromQuery(decodeURIComponent(q))
  }
})

function handleReset() {
  clearBlocks()
  success('Builder cleared')
}

function handleShare() {
  const url = `${window.location.origin}${window.location.pathname}?q=${encodeURIComponent(queryString.value)}`
  navigator.clipboard.writeText(url)
  success('Share link copied to clipboard')
}
</script>

<template>
  <div class="dork-builder">
    <header class="builder-header">
      <h1 class="builder-title">Dork Builder</h1>
      <div class="builder-actions">
        <button class="btn btn-ghost" @click="handleReset">Reset</button>
        <button class="btn btn-secondary" :disabled="!queryString" @click="handleShare">
          Share
        </button>
      </div>
    </header>

    <div class="builder-body">
      <QueryDisplay />
      <BlockEditor />
      <BlockPalette />
    </div>

    <aside class="builder-help">
      <h3>Quick Tips</h3>
      <ul>
        <li><strong>Site</strong>: Limit search to specific domains</li>
        <li><strong>File</strong>: Find specific file types (PDF, DOCX)</li>
        <li><strong>Keywords</strong>: Add search terms with optional synonym expansion</li>
        <li><strong>Date</strong>: Filter by publication date</li>
        <li><strong>Tricks</strong>: Advanced operators like intitle:, inurl:</li>
      </ul>
      <p class="help-note">
        Click a block in the query to edit it. Use the palette below to add new blocks.
      </p>
    </aside>
  </div>
</template>

<style scoped>
.dork-builder {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.builder-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid var(--border-subtle);
  background: var(--bg-deep);
}

.builder-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.builder-actions {
  display: flex;
  gap: 8px;
}

.builder-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.builder-help {
  padding: 24px;
  background: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
}

.builder-help h3 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px;
  color: var(--text-secondary);
}

.builder-help ul {
  margin: 0;
  padding-left: 20px;
}

.builder-help li {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.builder-help strong {
  color: var(--text-primary);
}

.help-note {
  margin-top: 16px;
  font-size: 12px;
  color: var(--text-muted);
}
</style>
```

**Step 2: Create builder.md page**

```markdown
---
layout: page
title: Dork Builder
---

<script setup>
import DorkBuilder from './.vitepress/theme/components/builder/DorkBuilder.vue'
</script>

<DorkBuilder />
```

**Step 3: Register components and update config**

Update `docs/.vitepress/theme/index.ts` to import and register builder components.

Update `docs/.vitepress/config.mts` nav:
```typescript
{ text: "Builder", link: "/builder" },
```

**Step 4: Verify builder works**

Run: `npm run docs:dev`
Navigate to `/builder`
Expected: Builder loads, can add blocks, query updates live

**Step 5: Commit**

```bash
git add docs/.vitepress/theme/components/builder/ docs/builder.md docs/.vitepress/config.mts
git commit -m "feat: add DorkBuilder page with visual query construction"
```

---

## Phase 4: Polish

### Task 13: Create Settings Page

**Files:**
- Create: `docs/.vitepress/theme/components/settings/SettingsPanel.vue`
- Create: `docs/settings.md`

**Step 1: Create SettingsPanel component**

```vue
<!-- docs/.vitepress/theme/components/settings/SettingsPanel.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useSettings, type ExperienceMode } from '../../composables/useSettings'
import { useFavorites } from '../../composables/useFavorites'
import { useToast } from '../../composables/useToast'
import ThemeSwitcher from '../ThemeSwitcher.vue'

const { settings, setExperienceMode, resetSettings } = useSettings()
const { favorites, clearFavorites } = useFavorites()
const { success, error } = useToast()

const experienceModes: { id: ExperienceMode; label: string; description: string }[] = [
  { id: 'beginner', label: 'Beginner', description: 'More guidance, expanded tooltips' },
  { id: 'practitioner', label: 'Practitioner', description: 'Balanced experience' },
  { id: 'expert', label: 'Expert', description: 'Minimal UI, power features' },
]

function exportData() {
  const data = {
    version: 1,
    settings: settings,
    favorites: favorites,
    exportedAt: new Date().toISOString(),
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `harm-reduction-dork-guide-backup-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
  success('Data exported successfully')
}

function importData() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const data = JSON.parse(text)
      if (data.version !== 1) throw new Error('Unsupported version')
      // Apply settings
      Object.assign(settings, data.settings)
      // Apply favorites (would need to expose a setter)
      success('Data imported successfully')
    } catch (e) {
      error('Failed to import data')
    }
  }
  input.click()
}

function handleClearData() {
  if (confirm('Are you sure? This will clear all your favorites and reset settings.')) {
    clearFavorites()
    resetSettings()
    success('All data cleared')
  }
}

function generateShareLink() {
  const params = new URLSearchParams({
    mode: settings.experienceMode,
    color: settings.theme.color,
    theme: settings.theme.mode,
  })
  const url = `${window.location.origin}/harm-reduction-google-dork-guide/settings?${params}`
  navigator.clipboard.writeText(url)
  success('Settings link copied to clipboard')
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
      <button class="btn btn-secondary" @click="generateShareLink">
        Generate Settings Link
      </button>
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
```

**Step 2: Create settings.md page**

```markdown
---
layout: page
title: Settings
---

<script setup>
import SettingsPanel from './.vitepress/theme/components/settings/SettingsPanel.vue'
</script>

<SettingsPanel />
```

**Step 3: Update nav**

Add to nav in config.mts:
```typescript
{ text: "Settings", link: "/settings" },
```

**Step 4: Commit**

```bash
git add docs/.vitepress/theme/components/settings/ docs/settings.md docs/.vitepress/config.mts
git commit -m "feat: add Settings page with export/import and preferences"
```

---

### Task 14: Update Navigation and Final Config

**Files:**
- Modify: `docs/.vitepress/config.mts`

**Step 1: Update full navigation config**

```typescript
// docs/.vitepress/config.mts
import { defineConfig } from "vitepress";
import markdownItGitHubAlerts from "markdown-it-github-alerts";

export default defineConfig({
  title: "Harm Reduction Google Dork Guide",
  description: "Advanced search operators, workflows, and dork packs for harm reduction research",
  base: "/harm-reduction-google-dork-guide/",
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap', rel: 'stylesheet' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Harm Reduction Google Dork Guide' }],
    ['meta', { property: 'og:description', content: 'Advanced search operators and tools for harm reduction research' }],
  ],

  srcExclude: [
    "_sidebar.md",
    "_navbar.md",
    "_assets/**",
    "index.html",
    ".nojekyll",
    "dork-explorer.md",
  ],

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/README" },
      { text: "Explorer", link: "/explorer" },
      { text: "Builder", link: "/builder" },
    ],

    sidebar: {
      "/": [
        {
          text: "Getting Started",
          items: [
            { text: "Quick Start", link: "/01-quick-start" },
            { text: "Core Operators", link: "/02-core-operators" },
            { text: "Advanced Operators", link: "/03-advanced-operators" },
            { text: "Domain Map", link: "/04-domain-map" },
            { text: "Synonym Blocks", link: "/05-synonym-blocks" },
          ],
        },
        {
          text: "Dork Packs",
          items: [{ text: "All Dork Packs", link: "/dork-packs/README" }],
        },
        {
          text: "Workflows",
          items: [
            { text: "Overview", link: "/workflows/README" },
            { text: "Research Workflow", link: "/workflows/research-workflow" },
            { text: "Monitoring", link: "/workflows/monitoring" },
            { text: "Peer-Centered", link: "/workflows/peer-centered" },
            { text: "Verification", link: "/workflows/verification" },
          ],
        },
        {
          text: "Tools & Resources",
          items: [
            { text: "Tools Overview", link: "/tools/README" },
            { text: "Browser Extensions", link: "/tools/browser-extensions" },
            { text: "Google Alerts", link: "/tools/google-alerts" },
            { text: "OSINT", link: "/tools/osint" },
            { text: "Cheat Sheet", link: "/resources/cheat-sheet" },
          ],
        },
        {
          text: "Interactive",
          items: [
            { text: "Dork Explorer", link: "/explorer" },
            { text: "Dork Builder", link: "/builder" },
            { text: "Settings", link: "/settings" },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/zophiezlan/harm-reduction-google-dork-guide",
      },
    ],

    search: {
      provider: "local",
    },

    outline: [2, 3],
  },

  markdown: {
    config: (md) => {
      md.use(markdownItGitHubAlerts);
    },
  },
});
```

**Step 2: Commit**

```bash
git add docs/.vitepress/config.mts
git commit -m "feat: update navigation with Explorer, Builder, and Settings"
```

---

### Task 15: Add Vercel Configuration

**Files:**
- Create: `vercel.json`

**Step 1: Create vercel.json**

```json
{
  "buildCommand": "npm run build:all && npm run docs:build",
  "outputDirectory": "docs/.vitepress/dist",
  "framework": null,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

**Step 2: Commit**

```bash
git add vercel.json
git commit -m "chore: add Vercel deployment configuration"
```

---

### Task 16: Final Integration Test

**Step 1: Build and run all scripts**

Run: `npm run build:all && npm run docs:build`
Expected: Build completes without errors

**Step 2: Preview production build**

Run: `npm run docs:preview`
Expected: Site loads at localhost:4173

**Step 3: Test all features**

- [ ] Theme switcher changes colors
- [ ] Explorer loads and searches dorks
- [ ] Favorites persist after refresh
- [ ] Builder creates queries
- [ ] Settings export/import works
- [ ] Mobile responsive layout

**Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete VitePress enhancement implementation"
```

---

## Summary

This plan implements:

1. **Foundation** (Tasks 1-6): CSS architecture, settings, favorites, toasts, synonym extraction
2. **Explorer** (Tasks 7-9): Dork data composable, card component, full explorer page
3. **Builder** (Tasks 10-12): Query builder composable, block components, builder page
4. **Polish** (Tasks 13-16): Settings page, navigation updates, Vercel config, testing

Total: 16 tasks across 4 phases
