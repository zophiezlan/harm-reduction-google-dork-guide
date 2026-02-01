<script setup lang="ts">
interface QuickFilters {
  auSites: boolean;
  pdfs: boolean;
  government: boolean;
  recent: boolean;
  userHosted: boolean;
}

const props = defineProps<{
  quickFilters: QuickFilters;
  showFavoritesOnly: boolean;
  favoritesCount: number;
  activeFilterCount: number;
}>();

const emit = defineEmits<{
  (e: "toggle-quick-filter", filter: keyof QuickFilters): void;
  (e: "toggle-favorites"): void;
  (e: "clear-filters"): void;
}>();
</script>

<template>
  <div class="quick-filters-bar">
    <span class="quick-filters-label">Quick filters:</span>
    <button
      :class="['quick-filter', { active: quickFilters.auSites }]"
      @click="emit('toggle-quick-filter', 'auSites')"
      :aria-pressed="quickFilters.auSites.toString()"
    >
      <span aria-hidden="true">🇦🇺</span>
      <span class="filter-text">Australian Sites</span>
    </button>
    <button
      :class="['quick-filter', { active: quickFilters.pdfs }]"
      @click="emit('toggle-quick-filter', 'pdfs')"
      :aria-pressed="quickFilters.pdfs.toString()"
    >
      <span aria-hidden="true">📄</span>
      <span class="filter-text">PDFs Only</span>
    </button>
    <button
      :class="['quick-filter', { active: quickFilters.government }]"
      @click="emit('toggle-quick-filter', 'government')"
      :aria-pressed="quickFilters.government.toString()"
    >
      <span aria-hidden="true">🏛️</span>
      <span class="filter-text">Government</span>
    </button>
    <button
      :class="['quick-filter', { active: quickFilters.recent }]"
      @click="emit('toggle-quick-filter', 'recent')"
      :aria-pressed="quickFilters.recent.toString()"
    >
      <span aria-hidden="true">📅</span>
      <span class="filter-text">Date Filtered</span>
    </button>
    <button
      :class="['quick-filter', { active: quickFilters.userHosted }]"
      @click="emit('toggle-quick-filter', 'userHosted')"
      :aria-pressed="quickFilters.userHosted.toString()"
    >
      <span aria-hidden="true">🌐</span>
      <span class="filter-text">User Platforms</span>
    </button>
    <button
      :class="['quick-filter favorites-filter', { active: showFavoritesOnly }]"
      @click="emit('toggle-favorites')"
      :aria-pressed="showFavoritesOnly.toString()"
    >
      <span aria-hidden="true">★</span>
      <span class="filter-text">Favorites ({{ favoritesCount }})</span>
    </button>
    <button
      v-if="activeFilterCount > 0"
      class="quick-filter clear-filter"
      @click="emit('clear-filters')"
      aria-label="Clear all filters"
    >
      <span aria-hidden="true">✕</span>
      <span class="filter-text">Clear All</span>
    </button>
  </div>
</template>

<style scoped>
.quick-filters-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 8px 0;
}

.quick-filters-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.quick-filter {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 9999px;
  background: var(--bg-elevated);
  color: var(--text-secondary);
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.quick-filter:hover {
  border-color: var(--accent-border);
  color: var(--text-primary);
}

.quick-filter.active {
  background: var(--accent-subtle);
  border-color: var(--accent);
  color: var(--accent);
}

.quick-filter.favorites-filter.active {
  background: #fef3c7;
  border-color: #f59e0b;
  color: #d97706;
}

.quick-filter.clear-filter {
  background: transparent;
  border-color: var(--danger);
  color: var(--danger);
}

.quick-filter.clear-filter:hover {
  background: var(--danger);
  color: white;
}

@media (max-width: 480px) {
  .quick-filters-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .quick-filter {
    justify-content: center;
  }
}
</style>
