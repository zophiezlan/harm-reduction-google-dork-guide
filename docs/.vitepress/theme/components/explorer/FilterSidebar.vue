<script setup lang="ts">
import { ref, computed } from "vue";

interface Pack {
  id: string;
  title: string;
  count: number;
}

const props = defineProps<{
  packList: Pack[];
  categories: string[];
  selectedPacks: string[];
  selectedCategories: string[];
}>();

const emit = defineEmits<{
  (e: "toggle-pack", packId: string): void;
  (e: "toggle-category", category: string): void;
}>();

// Local search state
const packSearchQuery = ref("");
const categorySearchQuery = ref("");
const packsExpanded = ref(true);
const categoriesExpanded = ref(true);

// Filtered lists
const filteredPacks = computed(() => {
  if (!packSearchQuery.value) return props.packList;
  const query = packSearchQuery.value.toLowerCase();
  return props.packList.filter((pack) => pack.title.toLowerCase().includes(query));
});

const filteredCategories = computed(() => {
  if (!categorySearchQuery.value) return props.categories;
  const query = categorySearchQuery.value.toLowerCase();
  return props.categories.filter((cat) => cat.toLowerCase().includes(query));
});
</script>

<template>
  <aside class="explorer-sidebar" role="complementary" aria-label="Filters">
    <!-- Packs Filter -->
    <div class="filter-section">
      <button
        class="filter-section-header"
        @click="packsExpanded = !packsExpanded"
        :aria-expanded="packsExpanded"
        aria-controls="packs-content"
      >
        <h4 class="filter-title">
          Packs
          <span v-if="selectedPacks.length > 0" class="filter-badge">{{
            selectedPacks.length
          }}</span>
        </h4>
        <span class="expand-icon" aria-hidden="true">{{ packsExpanded ? "▼" : "▶" }}</span>
      </button>

      <div v-show="packsExpanded" id="packs-content" class="filter-content">
        <div class="filter-search-wrapper">
          <input
            v-model="packSearchQuery"
            type="text"
            class="filter-search"
            placeholder="Search packs..."
            aria-label="Filter packs"
          />
          <button
            v-if="packSearchQuery"
            class="search-clear-small"
            @click="packSearchQuery = ''"
            aria-label="Clear pack search"
          >
            ✕
          </button>
        </div>

        <div class="filter-list" role="listbox" aria-label="Available packs">
          <button
            v-for="pack in filteredPacks"
            :key="pack.id"
            :class="['filter-item', { active: selectedPacks.includes(pack.id) }]"
            @click="emit('toggle-pack', pack.id)"
            role="option"
            :aria-selected="selectedPacks.includes(pack.id)"
          >
            <span class="filter-name">{{ pack.title }}</span>
            <span class="filter-count">{{ pack.count }}</span>
          </button>
          <div v-if="filteredPacks.length === 0" class="filter-empty">
            No packs match "{{ packSearchQuery }}"
          </div>
        </div>
      </div>
    </div>

    <!-- Categories Filter -->
    <div class="filter-section">
      <button
        class="filter-section-header"
        @click="categoriesExpanded = !categoriesExpanded"
        :aria-expanded="categoriesExpanded"
        aria-controls="categories-content"
      >
        <h4 class="filter-title">
          Categories
          <span v-if="selectedCategories.length > 0" class="filter-badge">{{
            selectedCategories.length
          }}</span>
        </h4>
        <span class="expand-icon" aria-hidden="true">{{ categoriesExpanded ? "▼" : "▶" }}</span>
      </button>

      <div v-show="categoriesExpanded" id="categories-content" class="filter-content">
        <div class="filter-search-wrapper">
          <input
            v-model="categorySearchQuery"
            type="text"
            class="filter-search"
            placeholder="Search categories..."
            aria-label="Filter categories"
          />
          <button
            v-if="categorySearchQuery"
            class="search-clear-small"
            @click="categorySearchQuery = ''"
            aria-label="Clear category search"
          >
            ✕
          </button>
        </div>

        <div class="filter-chips" role="listbox" aria-label="Available categories">
          <button
            v-for="cat in filteredCategories"
            :key="cat"
            :class="['chip', { active: selectedCategories.includes(cat) }]"
            @click="emit('toggle-category', cat)"
            role="option"
            :aria-selected="selectedCategories.includes(cat)"
          >
            {{ cat }}
          </button>
          <div v-if="filteredCategories.length === 0" class="filter-empty">
            No categories match "{{ categorySearchQuery }}"
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.explorer-sidebar {
  width: 280px;
  padding: 16px;
  border-right: 1px solid var(--border-subtle);
  background: var(--bg-surface);
  overflow-y: auto;
  flex-shrink: 0;
  max-height: calc(100vh - var(--header-height, 200px));
  position: sticky;
  top: var(--header-height, 200px);
}

.filter-section {
  margin-bottom: 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
}

.filter-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-elevated);
  cursor: pointer;
  transition: background var(--transition-fast);
  user-select: none;
  border: none;
  text-align: left;
}

.filter-section-header:hover {
  background: var(--bg-deep);
}

.filter-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  font-size: 10px;
  font-weight: 700;
  background: var(--accent);
  color: white;
  border-radius: 9px;
}

.expand-icon {
  font-size: 10px;
  color: var(--text-muted);
  transition: transform var(--transition-fast);
}

.filter-content {
  padding: 12px;
  background: var(--bg-surface);
}

.filter-search-wrapper {
  position: relative;
  margin-bottom: 12px;
}

.filter-search {
  width: 100%;
  padding: 8px 32px 8px 12px;
  font-size: 12px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--bg-deep);
  color: var(--text-primary);
  transition: border-color var(--transition-fast);
}

.filter-search:focus {
  outline: none;
  border-color: var(--accent);
}

.search-clear-small {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--text-muted);
  font-size: 14px;
  background: none;
  border: none;
  padding: 2px 4px;
}

.search-clear-small:hover {
  color: var(--text-primary);
}

.filter-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 300px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--accent-subtle) var(--bg-deep);
}

.filter-list::-webkit-scrollbar {
  width: 6px;
}

.filter-list::-webkit-scrollbar-track {
  background: var(--bg-deep);
  border-radius: 3px;
}

.filter-list::-webkit-scrollbar-thumb {
  background: var(--accent-subtle);
  border-radius: 3px;
}

.filter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  border-radius: var(--radius-md);
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
  font-size: 12px;
}

.filter-item:hover {
  background: var(--bg-elevated);
  color: var(--text-primary);
}

.filter-item.active {
  background: var(--accent-subtle);
  color: var(--accent);
  font-weight: 600;
}

.filter-item:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.filter-name {
  flex: 1;
}

.filter-count {
  font-size: 10px;
  background: var(--bg-elevated);
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.filter-item.active .filter-count {
  background: var(--accent);
  color: white;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-height: 250px;
  overflow-y: auto;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 11px;
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

.filter-empty {
  padding: 16px;
  text-align: center;
  color: var(--text-muted);
  font-size: 12px;
}

@media (max-width: 900px) {
  .explorer-sidebar {
    width: 100%;
    max-height: none;
    position: relative;
    top: 0;
    border-right: none;
    border-bottom: 1px solid var(--border-subtle);
  }
}
</style>
