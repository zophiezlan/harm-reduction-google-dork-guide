<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useData, withBase } from "vitepress";
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

// New filter UI state
const packSearchQuery = ref("");
const categorySearchQuery = ref("");
const packsExpanded = ref(true);
const categoriesExpanded = ref(true);
const showScrollTop = ref(false);
const resultsRef = ref<HTMLElement | null>(null);

// Load dorks on mount
onMounted(async () => {
  // Load dork-data.js script
  if (typeof window !== "undefined" && !(window as any).DORK_DATA) {
    const script = document.createElement("script");
    script.src = withBase("/dork-explorer/dork-data.js");
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

// Filtered packs and categories based on search
const filteredPacks = computed(() => {
  if (!packSearchQuery.value) return packList.value;
  const query = packSearchQuery.value.toLowerCase();
  return packList.value.filter(pack => 
    pack.title.toLowerCase().includes(query)
  );
});

const filteredCategories = computed(() => {
  if (!categorySearchQuery.value) return categories.value;
  const query = categorySearchQuery.value.toLowerCase();
  return categories.value.filter(cat => 
    cat.toLowerCase().includes(query)
  );
});

// Active filter count
const activeFilterCount = computed(() => {
  let count = 0;
  if (selectedPacks.value.length > 0) count += selectedPacks.value.length;
  if (selectedCategories.value.length > 0) count += selectedCategories.value.length;
  if (showFavoritesOnly.value) count += 1;
  return count;
});

function togglePack(packId: string) {
  const idx = selectedPacks.value.indexOf(packId);
  if (idx === -1) {
    selectedPacks.value.push(packId);
  } else {
    selectedPacks.value.splice(idx, 1);
  }
  scrollToResults();
}

function toggleCategory(category: string) {
  const idx = selectedCategories.value.indexOf(category);
  if (idx === -1) {
    selectedCategories.value.push(category);
  } else {
    selectedCategories.value.splice(idx, 1);
  }
  scrollToResults();
}

function clearFilters() {
  searchQuery.value = "";
  selectedPacks.value = [];
  selectedCategories.value = [];
  showFavoritesOnly.value = false;
  packSearchQuery.value = "";
  categorySearchQuery.value = "";
}

function removeFilter(type: 'pack' | 'category' | 'favorites', value?: string) {
  if (type === 'pack' && value) {
    const idx = selectedPacks.value.indexOf(value);
    if (idx !== -1) selectedPacks.value.splice(idx, 1);
  } else if (type === 'category' && value) {
    const idx = selectedCategories.value.indexOf(value);
    if (idx !== -1) selectedCategories.value.splice(idx, 1);
  } else if (type === 'favorites') {
    showFavoritesOnly.value = false;
  }
}

function scrollToResults() {
  nextTick(() => {
    if (resultsRef.value) {
      resultsRef.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
  
  // Scroll to top button
  const handleScroll = () => {
    showScrollTop.value = window.scrollY > 300;
  };
  window.addEventListener("scroll", handleScroll);
  
  // Cleanup
  return () => {
    window.removeEventListener("keydown", handleKeydown);
    window.removeEventListener("scroll", handleScroll);
  };
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
          @click="showFavoritesOnly = !showFavoritesOnly; scrollToResults()"
        >
          ★ Favorites ({{ favorites.length }})
        </button>
        <button v-if="activeFilterCount > 0" class="chip chip-clear" @click="clearFilters">
          Clear {{ activeFilterCount }} filter{{ activeFilterCount > 1 ? 's' : '' }}
        </button>
      </div>
      
      <!-- Active Filters Summary -->
      <div v-if="activeFilterCount > 0" class="active-filters">
        <span class="active-filters-label">Active filters:</span>
        <div class="active-filters-chips">
          <button
            v-if="showFavoritesOnly"
            class="filter-chip"
            @click="removeFilter('favorites')"
          >
            ★ Favorites
            <span class="chip-remove">×</span>
          </button>
          <button
            v-for="packId in selectedPacks"
            :key="`pack-${packId}`"
            class="filter-chip"
            @click="removeFilter('pack', packId)"
          >
            {{ packList.find(p => p.id === packId)?.title }}
            <span class="chip-remove">×</span>
          </button>
          <button
            v-for="cat in selectedCategories"
            :key="`cat-${cat}`"
            class="filter-chip"
            @click="removeFilter('category', cat)"
          >
            {{ cat }}
            <span class="chip-remove">×</span>
          </button>
        </div>
      </div>
    </header>

    <div class="explorer-body">
      <!-- Sidebar -->
      <aside class="explorer-sidebar">
        <!-- Packs Filter -->
        <div class="filter-section">
          <div class="filter-section-header" @click="packsExpanded = !packsExpanded">
            <h4 class="filter-title">
              Packs
              <span v-if="selectedPacks.length > 0" class="filter-badge">{{ selectedPacks.length }}</span>
            </h4>
            <span class="expand-icon">{{ packsExpanded ? '▼' : '▶' }}</span>
          </div>
          
          <div v-show="packsExpanded" class="filter-content">
            <div class="filter-search-wrapper">
              <input
                v-model="packSearchQuery"
                type="text"
                class="filter-search"
                placeholder="Search packs..."
              />
              <span v-if="packSearchQuery" class="search-clear-small" @click="packSearchQuery = ''">✕</span>
            </div>
            
            <div class="filter-list">
              <button
                v-for="pack in filteredPacks"
                :key="pack.id"
                :class="['filter-item', { active: selectedPacks.includes(pack.id) }]"
                @click="togglePack(pack.id)"
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
          <div class="filter-section-header" @click="categoriesExpanded = !categoriesExpanded">
            <h4 class="filter-title">
              Categories
              <span v-if="selectedCategories.length > 0" class="filter-badge">{{ selectedCategories.length }}</span>
            </h4>
            <span class="expand-icon">{{ categoriesExpanded ? '▼' : '▶' }}</span>
          </div>
          
          <div v-show="categoriesExpanded" class="filter-content">
            <div class="filter-search-wrapper">
              <input
                v-model="categorySearchQuery"
                type="text"
                class="filter-search"
                placeholder="Search categories..."
              />
              <span v-if="categorySearchQuery" class="search-clear-small" @click="categorySearchQuery = ''">✕</span>
            </div>
            
            <div class="filter-chips">
              <button
                v-for="cat in filteredCategories"
                :key="cat"
                :class="['chip', { active: selectedCategories.includes(cat) }]"
                @click="toggleCategory(cat)"
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

      <!-- Main content -->
      <main class="explorer-main">
        <div ref="resultsRef" class="results-header">
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
    
    <!-- Scroll to Top Button -->
    <button
      v-if="showScrollTop"
      class="scroll-to-top"
      @click="scrollToTop"
      title="Scroll to top"
    >
      ↑
    </button>
  </div>
</template>

<style scoped>
:root {
  --header-height: 140px;
}

.dork-explorer {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.explorer-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  font-size: 18px;
}

.search-clear:hover {
  color: var(--text-primary);
}

.header-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip-clear {
  background: var(--accent-subtle);
  color: var(--accent);
  border-color: var(--accent);
}

/* Active Filters Summary */
.active-filters {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--bg-elevated);
  border-radius: var(--radius-md);
  flex-wrap: wrap;
}

.active-filters-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.active-filters-chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  flex: 1;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: var(--radius-md);
  border: 1px solid var(--accent-border);
  background: var(--accent-subtle);
  color: var(--accent);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-chip:hover {
  background: var(--accent);
  color: white;
}

.chip-remove {
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
}

.explorer-body {
  display: flex;
  flex: 1;
}

.explorer-sidebar {
  width: 300px;
  padding: 16px;
  border-right: 1px solid var(--border-subtle);
  background: var(--bg-surface);
  overflow-y: auto;
  flex-shrink: 0;
  max-height: calc(100vh - var(--header-height));
  position: sticky;
  top: var(--header-height);
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
  padding: 12px 16px;
  background: var(--bg-elevated);
  cursor: pointer;
  transition: background var(--transition-fast);
  user-select: none;
}

.filter-section-header:hover {
  background: var(--bg-deep);
}

.filter-title {
  font-size: 13px;
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
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  font-size: 11px;
  font-weight: 700;
  background: var(--accent);
  color: white;
  border-radius: 10px;
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
  font-size: 13px;
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
}

.search-clear-small:hover {
  color: var(--text-primary);
}

.filter-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--accent-subtle) var(--bg-deep);
}

.filter-list::-webkit-scrollbar {
  width: 8px;
}

.filter-list::-webkit-scrollbar-track {
  background: var(--bg-deep);
  border-radius: 4px;
}

.filter-list::-webkit-scrollbar-thumb {
  background: var(--accent-subtle);
  border-radius: 4px;
}

.filter-list::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
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
  font-weight: 600;
}

.filter-item:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.filter-name {
  flex: 1;
  font-size: 13px;
}

.filter-count {
  font-size: 11px;
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
  max-height: 300px;
  overflow-y: auto;
}

.filter-empty {
  padding: 20px;
  text-align: center;
  color: var(--text-muted);
  font-size: 12px;
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
  scroll-margin-top: var(--header-height);
}

.results-count {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 600;
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
  transition: all var(--transition-fast);
}

.view-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.view-btn.active {
  background: var(--accent-subtle);
  border-color: var(--accent);
  color: var(--accent);
  font-weight: 600;
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

/* Scroll to Top Button */
.scroll-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all var(--transition-fast);
  z-index: 100;
}

.scroll-to-top:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.scroll-to-top:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .explorer-body {
    flex-direction: column;
  }

  .explorer-sidebar {
    width: 100%;
    max-height: none;
    position: relative;
    top: 0;
    border-right: none;
    border-bottom: 1px solid var(--border-subtle);
  }

  .results-grid.grid {
    grid-template-columns: 1fr;
  }
  
  .active-filters {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
