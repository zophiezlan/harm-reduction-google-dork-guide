<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useDorkData } from "../../composables/useDorkData";
import { useFavorites } from "../../composables/useFavorites";
import DorkCard from "./DorkCard.vue";
import type { DorkWithPack } from "../../data/types";

const { loadDorks, searchDorks, packList, categories, isLoaded } = useDorkData();
const { favorites } = useFavorites();

// State
const searchQuery = ref("");
const selectedPacks = ref<string[]>([]);
const selectedCategories = ref<string[]>([]);
const showFavoritesOnly = ref(false);
const viewMode = ref<"grid" | "list">("grid");

// Load dorks on mount
onMounted(async () => {
  // Load dork-data.js script
  if (typeof window !== "undefined" && !(window as any).DORK_DATA) {
    const script = document.createElement("script");
    script.src = "/dork-explorer/dork-data.js";
    script.onload = () => loadDorks();
    document.head.appendChild(script);
  } else {
    loadDorks();
  }
});

// Filtered results
const results = computed(() => {
  if (showFavoritesOnly.value) {
    const favIds = new Set(favorites.map((f) => f.id));
    return searchDorks(searchQuery.value, {
      packs: selectedPacks.value.length > 0 ? selectedPacks.value : undefined,
      categories: selectedCategories.value.length > 0 ? selectedCategories.value : undefined,
    }).filter((d) => {
      const id = `${d.packId}-${d.title.toLowerCase().replace(/\s+/g, "-")}`;
      return favIds.has(id);
    });
  }

  return searchDorks(searchQuery.value, {
    packs: selectedPacks.value.length > 0 ? selectedPacks.value : undefined,
    categories: selectedCategories.value.length > 0 ? selectedCategories.value : undefined,
  });
});

function togglePack(packId: string) {
  const idx = selectedPacks.value.indexOf(packId);
  if (idx === -1) {
    selectedPacks.value.push(packId);
  } else {
    selectedPacks.value.splice(idx, 1);
  }
}

function toggleCategory(category: string) {
  const idx = selectedCategories.value.indexOf(category);
  if (idx === -1) {
    selectedCategories.value.push(category);
  } else {
    selectedCategories.value.splice(idx, 1);
  }
}

function clearFilters() {
  searchQuery.value = "";
  selectedPacks.value = [];
  selectedCategories.value = [];
  showFavoritesOnly.value = false;
}

function openInBuilder(dork: DorkWithPack) {
  // Navigate to builder with query
  const url = `/builder?q=${encodeURIComponent(dork.query)}`;
  window.location.href = url;
}

// Keyboard shortcuts
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
      e.preventDefault();
      document.querySelector<HTMLInputElement>(".search-input")?.focus();
    }
    if (e.key === "Escape") {
      searchQuery.value = "";
      (document.activeElement as HTMLElement)?.blur();
    }
  };
  window.addEventListener("keydown", handleKeydown);
});
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
