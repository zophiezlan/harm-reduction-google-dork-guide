<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { withBase } from "vitepress";
import { useDorkData } from "../../composables/useDorkData";
import { useFavorites } from "../../composables/useFavorites";
import { useToast } from "../../composables/useToast";
import { useDebouncedRef } from "../../composables/useDebounce";
import { useUrlStateSimple } from "../../composables/useUrlState";
import DorkCard from "./DorkCard.vue";
import FilterSidebar from "./FilterSidebar.vue";
import QuickFiltersBar from "./QuickFiltersBar.vue";
import ActiveFiltersDisplay from "./ActiveFiltersDisplay.vue";
import ShortcutsModal from "./ShortcutsModal.vue";
import ExportMenu from "./ExportMenu.vue";
import type { DorkWithPack } from "../../data/types";

const {
  loadDorks,
  searchDorks,
  allDorks,
  packList,
  categories,
  difficulties,
  domainCategories,
  stats,
  isLoaded,
} = useDorkData();
const { favorites: rawFavorites } = useFavorites();
const { success } = useToast();

// SSR-safe favorites array
const favorites = computed(() => rawFavorites ?? []);

// State (synced with URL for bookmarking/sharing)
const searchQuery = ref("");
const debouncedSearchQuery = useDebouncedRef(searchQuery, 300);
const selectedPacks = useUrlStateSimple<string[]>("packs", []);
const selectedCategories = useUrlStateSimple<string[]>("cats", []);
const selectedDifficulties = useUrlStateSimple<string[]>("diff", []);
const selectedDomainCategories = useUrlStateSimple<string[]>("domain", []);
const showFavoritesOnly = ref(false);
const includeDocumentation = ref(true);
const viewMode = useUrlStateSimple<string>("view", "grid") as ReturnType<
  typeof ref<"grid" | "list">
>;

// Quick filter states
const quickFilters = ref({
  auSites: false,
  pdfs: false,
  government: false,
  recent: false,
  userHosted: false,
});

// UI state
const showScrollTop = ref(false);
const resultsRef = ref<HTMLElement | null>(null);

// Infinite scroll / pagination
const displayLimit = ref(50);
const ITEMS_PER_PAGE = 50;

// Random dork feature
const randomDork = ref<DorkWithPack | null>(null);
const showRandomDork = ref(false);

// Export menu
const showExportMenu = ref(false);

// Keyboard shortcuts modal
const showShortcuts = ref(false);

// Load dorks on mount
onMounted(async () => {
  if (typeof window !== "undefined" && !(window as any).DORK_DATA) {
    const script = document.createElement("script");
    script.src = withBase("/dork-explorer/dork-data.js");
    script.onload = () => loadDorks();
    document.head.appendChild(script);
  } else {
    loadDorks();
  }
});

// Filtered results with quick filters applied (uses debounced search for performance)
const results = computed(() => {
  let filtered = searchDorks(debouncedSearchQuery.value, {
    packs: selectedPacks.value.length > 0 ? selectedPacks.value : undefined,
    categories: selectedCategories.value.length > 0 ? selectedCategories.value : undefined,
    difficulty:
      selectedDifficulties.value.length > 0 ? (selectedDifficulties.value as any) : undefined,
    domainCategory:
      selectedDomainCategories.value.length > 0
        ? (selectedDomainCategories.value as any)
        : undefined,
    includeDocumentation: includeDocumentation.value,
  });

  // Apply quick filters
  if (quickFilters.value.auSites) {
    filtered = filtered.filter((d) => /site:\*?\.?(?:gov\.au|edu\.au|org\.au|au\b)/i.test(d.query));
  }
  if (quickFilters.value.pdfs) {
    filtered = filtered.filter((d) => /filetype:pdf/i.test(d.query));
  }
  if (quickFilters.value.government) {
    filtered = filtered.filter(
      (d) => /site:\*?\.?gov\./i.test(d.query) || /government|policy|legislation/i.test(d.query)
    );
  }
  if (quickFilters.value.recent) {
    filtered = filtered.filter((d) => /after:|before:/i.test(d.query));
  }
  if (quickFilters.value.userHosted) {
    filtered = filtered.filter((d) =>
      /(site:\*?\.?(?:notion\.site|gitbook\.io|wordpress\.com|blogspot\.com|medium\.com|substack\.com|tumblr\.com|reddit\.com|github\.io|github\.com|speakerdeck\.com|slideshare\.net|vercel\.app|netlify\.app|pages\.dev|glitch\.me|drive\.google\.com|docs\.google\.com|dropbox\.com)|"Powered by Discourse"|Powered by Discourse)/i.test(
        d.query
      )
    );
  }

  // Favorites filter
  if (showFavoritesOnly.value) {
    const favIds = new Set(favorites.value.map((f) => f.id));
    filtered = filtered.filter((d) => {
      const id = `${d.packId}-${d.title.toLowerCase().replace(/\s+/g, "-")}`;
      return favIds.has(id);
    });
  }

  return filtered;
});

// Displayed results (for infinite scroll)
const displayedResults = computed(() => results.value.slice(0, displayLimit.value));
const hasMoreResults = computed(() => results.value.length > displayLimit.value);

// Filter sidebar state
const packSearchQuery = ref("");
const categorySearchQuery = ref("");
const packsExpanded = ref(true);
const categoriesExpanded = ref(true);
const difficultyExpanded = ref(true);
const domainExpanded = ref(false);

// Display labels for difficulty
const difficultyLabels: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

// Display labels for domain categories
const domainLabels: Record<string, string> = {
  government: "Government",
  health: "Health",
  education: "Education",
  research: "Research",
  ngo: "NGO",
  news: "News",
  community: "Community",
  international: "International",
  "user-hosted": "User-hosted",
};

// Filtered packs and categories based on search
const filteredPacks = computed(() => {
  if (!packSearchQuery.value) return packList.value;
  const query = packSearchQuery.value.toLowerCase();
  return packList.value.filter((pack) => pack.title.toLowerCase().includes(query));
});

const filteredCategories = computed(() => {
  if (!categorySearchQuery.value) return categories.value;
  const query = categorySearchQuery.value.toLowerCase();
  return categories.value.filter((cat) => cat.toLowerCase().includes(query));
});

// Active filter count
const activeFilterCount = computed(() => {
  let count = 0;
  if (selectedPacks.value.length > 0) count += selectedPacks.value.length;
  if (selectedCategories.value.length > 0) count += selectedCategories.value.length;
  if (selectedDifficulties.value.length > 0) count += selectedDifficulties.value.length;
  if (selectedDomainCategories.value.length > 0) count += selectedDomainCategories.value.length;
  if (showFavoritesOnly.value) count += 1;
  if (!includeDocumentation.value) count += 1;
  if (quickFilters.value.auSites) count += 1;
  if (quickFilters.value.pdfs) count += 1;
  if (quickFilters.value.government) count += 1;
  if (quickFilters.value.recent) count += 1;
  if (quickFilters.value.userHosted) count += 1;
  return count;
});

// Display statistics (local computed to avoid naming conflict with useDorkData stats)
const displayStats = computed(() => ({
  total: allDorks.value.length,
  displayed: displayedResults.value.length,
  filtered: results.value.length,
  packs: packList.value.length,
  categories: categories.value.length,
  favorites: favorites.value.length,
}));

function togglePack(packId: string) {
  const idx = selectedPacks.value.indexOf(packId);
  if (idx === -1) {
    selectedPacks.value.push(packId);
  } else {
    selectedPacks.value.splice(idx, 1);
  }
  displayLimit.value = ITEMS_PER_PAGE; // Reset pagination
  scrollToResults();
}

function toggleCategory(category: string) {
  const idx = selectedCategories.value.indexOf(category);
  if (idx === -1) {
    selectedCategories.value.push(category);
  } else {
    selectedCategories.value.splice(idx, 1);
  }
  displayLimit.value = ITEMS_PER_PAGE;
  scrollToResults();
}

function toggleDifficulty(difficulty: string) {
  const idx = selectedDifficulties.value.indexOf(difficulty);
  if (idx === -1) {
    selectedDifficulties.value.push(difficulty);
  } else {
    selectedDifficulties.value.splice(idx, 1);
  }
  displayLimit.value = ITEMS_PER_PAGE;
  scrollToResults();
}

function toggleDomainCategory(domain: string) {
  const idx = selectedDomainCategories.value.indexOf(domain);
  if (idx === -1) {
    selectedDomainCategories.value.push(domain);
  } else {
    selectedDomainCategories.value.splice(idx, 1);
  }
  displayLimit.value = ITEMS_PER_PAGE;
  scrollToResults();
}

function toggleQuickFilter(filter: keyof typeof quickFilters.value) {
  quickFilters.value[filter] = !quickFilters.value[filter];
  displayLimit.value = ITEMS_PER_PAGE;
}

function clearFilters() {
  searchQuery.value = "";
  selectedPacks.value = [];
  selectedCategories.value = [];
  selectedDifficulties.value = [];
  selectedDomainCategories.value = [];
  showFavoritesOnly.value = false;
  includeDocumentation.value = true;
  packSearchQuery.value = "";
  categorySearchQuery.value = "";
  quickFilters.value = {
    auSites: false,
    pdfs: false,
    government: false,
    recent: false,
    userHosted: false,
  };
  displayLimit.value = ITEMS_PER_PAGE;
}

function removeFilter(
  type: "pack" | "category" | "difficulty" | "domain" | "favorites" | "documentation" | "quick",
  value?: string
) {
  if (type === "pack" && value) {
    const idx = selectedPacks.value.indexOf(value);
    if (idx !== -1) selectedPacks.value.splice(idx, 1);
  } else if (type === "category" && value) {
    const idx = selectedCategories.value.indexOf(value);
    if (idx !== -1) selectedCategories.value.splice(idx, 1);
  } else if (type === "difficulty" && value) {
    const idx = selectedDifficulties.value.indexOf(value);
    if (idx !== -1) selectedDifficulties.value.splice(idx, 1);
  } else if (type === "domain" && value) {
    const idx = selectedDomainCategories.value.indexOf(value);
    if (idx !== -1) selectedDomainCategories.value.splice(idx, 1);
  } else if (type === "favorites") {
    showFavoritesOnly.value = false;
  } else if (type === "documentation") {
    includeDocumentation.value = true;
  } else if (type === "quick" && value) {
    quickFilters.value[value as keyof typeof quickFilters.value] = false;
  }
}

function scrollToResults() {
  nextTick(() => {
    if (resultsRef.value) {
      resultsRef.value.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openInBuilder(dork: DorkWithPack) {
  const url = `/builder?q=${encodeURIComponent(dork.query)}`;
  window.location.href = url;
}

function loadMore() {
  displayLimit.value += ITEMS_PER_PAGE;
}

// Random dork feature
function showRandomDorkFunc() {
  const source = results.value.length > 0 ? results.value : allDorks.value;
  if (source.length === 0) return;
  const randomIndex = Math.floor(Math.random() * source.length);
  randomDork.value = source[randomIndex];
  showRandomDork.value = true;
}

function closeRandomDork() {
  showRandomDork.value = false;
  randomDork.value = null;
}

// Export functionality
function exportToCSV() {
  const data = results.value;
  const headers = ["Title", "Query", "Category", "Pack", "Explanation"];
  const rows = data.map((d) => [
    `"${d.title.replace(/"/g, '""')}"`,
    `"${d.query.replace(/"/g, '""')}"`,
    `"${d.category}"`,
    `"${d.packTitle}"`,
    `"${(d.explanation || "").replace(/"/g, '""')}"`,
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  downloadFile(csv, "dorks-export.csv", "text/csv");
  success(`Exported ${data.length} dorks to CSV`);
  showExportMenu.value = false;
}

function exportToJSON() {
  const data = results.value.map((d) => ({
    title: d.title,
    query: d.query,
    category: d.category,
    pack: d.packTitle,
    explanation: d.explanation,
  }));

  const json = JSON.stringify(data, null, 2);
  downloadFile(json, "dorks-export.json", "application/json");
  success(`Exported ${data.length} dorks to JSON`);
  showExportMenu.value = false;
}

function exportToMarkdown() {
  const data = results.value;
  let md = "# Exported Dorks\n\n";
  md += `*Exported ${data.length} dorks on ${new Date().toLocaleDateString()}*\n\n`;

  const byPack: Record<string, DorkWithPack[]> = {};
  data.forEach((d) => {
    if (!byPack[d.packTitle]) byPack[d.packTitle] = [];
    byPack[d.packTitle].push(d);
  });

  for (const [pack, dorks] of Object.entries(byPack)) {
    md += `## ${pack}\n\n`;
    dorks.forEach((d) => {
      md += `### ${d.title}\n\n`;
      md += "```txt\n" + d.query + "\n```\n\n";
      if (d.explanation) md += `> ${d.explanation}\n\n`;
    });
  }

  downloadFile(md, "dorks-export.md", "text/markdown");
  success(`Exported ${data.length} dorks to Markdown`);
  showExportMenu.value = false;
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
}

// Keyboard shortcuts
function handleKeydown(e: KeyboardEvent) {
  const target = e.target as HTMLElement;
  if (["INPUT", "TEXTAREA"].includes(target.tagName) || target.isContentEditable) return;

  switch (e.key) {
    case "/":
      e.preventDefault();
      document.querySelector<HTMLInputElement>(".search-input")?.focus();
      break;
    case "Escape":
      searchQuery.value = "";
      target.blur();
      showRandomDork.value = false;
      showExportMenu.value = false;
      showShortcuts.value = false;
      break;
    case "?":
      e.preventDefault();
      showShortcuts.value = !showShortcuts.value;
      break;
    case "r":
      if (!e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        showRandomDorkFunc();
      }
      break;
    case "g":
      e.preventDefault();
      viewMode.value = "grid";
      break;
    case "l":
      e.preventDefault();
      viewMode.value = "list";
      break;
    case "c":
      if (!e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        clearFilters();
      }
      break;
  }
}

function handleScroll() {
  showScrollTop.value = window.scrollY > 300;

  // Infinite scroll: load more when near bottom
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
    hasMoreResults.value
  ) {
    loadMore();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("scroll", handleScroll);
});

// Reset pagination when filters change (use debounced search query to avoid excessive resets)
watch(
  [
    debouncedSearchQuery,
    selectedPacks,
    selectedCategories,
    selectedDifficulties,
    selectedDomainCategories,
    showFavoritesOnly,
    includeDocumentation,
    quickFilters,
  ],
  () => {
    displayLimit.value = ITEMS_PER_PAGE;
  }
);
</script>

<template>
  <div class="dork-explorer" role="main" aria-label="Dork Explorer">
    <!-- Header -->
    <header class="explorer-header">
      <div class="header-top">
        <div class="search-wrapper">
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input
            v-model="searchQuery"
            type="search"
            class="search-input input"
            placeholder="Search dorks... (press / to focus)"
            aria-label="Search dorks"
          />
          <span
            v-if="searchQuery"
            class="search-clear"
            @click="searchQuery = ''"
            role="button"
            aria-label="Clear search"
            >✕</span
          >
        </div>

        <div class="header-tools">
          <button
            class="tool-btn"
            @click="showRandomDorkFunc"
            title="Random Dork (R)"
            aria-label="Get random dork"
          >
            🎲 <span class="tool-label">Random</span>
          </button>

          <div class="export-wrapper">
            <button
              class="tool-btn"
              @click="showExportMenu = !showExportMenu"
              title="Export results"
              aria-label="Export menu"
            >
              📥 <span class="tool-label">Export</span>
            </button>
            <Transition name="dropdown">
              <div v-if="showExportMenu" class="export-menu" role="menu">
                <button class="export-option" @click="exportToCSV" role="menuitem">
                  📊 Export to CSV
                </button>
                <button class="export-option" @click="exportToJSON" role="menuitem">
                  📋 Export to JSON
                </button>
                <button class="export-option" @click="exportToMarkdown" role="menuitem">
                  📝 Export to Markdown
                </button>
              </div>
            </Transition>
          </div>

          <button
            class="tool-btn"
            @click="showShortcuts = true"
            title="Keyboard shortcuts (?)"
            aria-label="Show keyboard shortcuts"
          >
            ⌨️ <span class="tool-label">Shortcuts</span>
          </button>
        </div>
      </div>

      <!-- Quick Filters Bar -->
      <div class="quick-filters-bar">
        <span class="quick-filters-label">Quick filters:</span>
        <button
          :class="['quick-filter', { active: quickFilters.auSites }]"
          @click="toggleQuickFilter('auSites')"
          :aria-pressed="quickFilters.auSites.toString()"
        >
          🇦🇺 Australian Sites
        </button>
        <button
          :class="['quick-filter', { active: quickFilters.pdfs }]"
          @click="toggleQuickFilter('pdfs')"
          :aria-pressed="quickFilters.pdfs.toString()"
        >
          📄 PDFs Only
        </button>
        <button
          :class="['quick-filter', { active: quickFilters.government }]"
          @click="toggleQuickFilter('government')"
          :aria-pressed="quickFilters.government.toString()"
        >
          🏛️ Government
        </button>
        <button
          :class="['quick-filter', { active: quickFilters.recent }]"
          @click="toggleQuickFilter('recent')"
          :aria-pressed="quickFilters.recent.toString()"
        >
          📅 Date Filtered
        </button>
        <button
          :class="['quick-filter', { active: quickFilters.userHosted }]"
          @click="toggleQuickFilter('userHosted')"
          :aria-pressed="quickFilters.userHosted.toString()"
        >
          🌐 User Platforms
        </button>
        <button
          :class="['quick-filter favorites-filter', { active: showFavoritesOnly }]"
          @click="
            showFavoritesOnly = !showFavoritesOnly;
            scrollToResults();
          "
          :aria-pressed="showFavoritesOnly.toString()"
        >
          ★ Favorites ({{ favorites?.length ?? 0 }})
        </button>
        <button
          v-if="activeFilterCount > 0"
          class="quick-filter clear-filter"
          @click="clearFilters"
        >
          ✕ Clear All
        </button>
      </div>

      <!-- Active Filters Summary -->
      <div v-if="activeFilterCount > 0" class="active-filters">
        <span class="active-filters-label">Active:</span>
        <div class="active-filters-chips">
          <button v-if="showFavoritesOnly" class="filter-chip" @click="removeFilter('favorites')">
            ★ Favorites <span class="chip-remove">×</span>
          </button>
          <button
            v-if="quickFilters.auSites"
            class="filter-chip"
            @click="removeFilter('quick', 'auSites')"
          >
            🇦🇺 AU Sites <span class="chip-remove">×</span>
          </button>
          <button
            v-if="quickFilters.pdfs"
            class="filter-chip"
            @click="removeFilter('quick', 'pdfs')"
          >
            📄 PDFs <span class="chip-remove">×</span>
          </button>
          <button
            v-if="quickFilters.government"
            class="filter-chip"
            @click="removeFilter('quick', 'government')"
          >
            🏛️ Gov <span class="chip-remove">×</span>
          </button>
          <button
            v-if="quickFilters.recent"
            class="filter-chip"
            @click="removeFilter('quick', 'recent')"
          >
            📅 Dated <span class="chip-remove">×</span>
          </button>
          <button
            v-if="quickFilters.userHosted"
            class="filter-chip"
            @click="removeFilter('quick', 'userHosted')"
          >
            🌐 User Platforms <span class="chip-remove">×</span>
          </button>
          <button
            v-for="packId in selectedPacks"
            :key="`pack-${packId}`"
            class="filter-chip"
            @click="removeFilter('pack', packId)"
          >
            {{ packList.find((p) => p.id === packId)?.title }}
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
          <button
            v-for="diff in selectedDifficulties"
            :key="`diff-${diff}`"
            :class="['filter-chip', `chip-${diff}`]"
            @click="removeFilter('difficulty', diff)"
          >
            {{ difficultyLabels[diff] }}
            <span class="chip-remove">×</span>
          </button>
          <button
            v-for="domain in selectedDomainCategories"
            :key="`domain-${domain}`"
            class="filter-chip"
            @click="removeFilter('domain', domain)"
          >
            {{ domainLabels[domain] }}
            <span class="chip-remove">×</span>
          </button>
          <button
            v-if="!includeDocumentation"
            class="filter-chip"
            @click="removeFilter('documentation')"
          >
            Packs Only <span class="chip-remove">×</span>
          </button>
        </div>
      </div>

      <!-- Stats Bar -->
      <div class="stats-bar">
        <span class="stat">📊 {{ displayStats.total }} total dorks</span>
        <span class="stat-divider">•</span>
        <span class="stat">📦 {{ displayStats.packs }} packs</span>
        <span class="stat-divider">•</span>
        <span class="stat">🏷️ {{ displayStats.categories }} categories</span>
        <span class="stat-divider">•</span>
        <span class="stat">★ {{ displayStats.favorites }} saved</span>
      </div>
    </header>

    <div class="explorer-body">
      <!-- Sidebar -->
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
              <span v-if="packSearchQuery" class="search-clear-small" @click="packSearchQuery = ''"
                >✕</span
              >
            </div>

            <div class="filter-list" role="listbox" aria-label="Available packs">
              <button
                v-for="pack in filteredPacks"
                :key="pack.id"
                :class="['filter-item', { active: selectedPacks.includes(pack.id) }]"
                @click="togglePack(pack.id)"
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

        <!-- Difficulty Filter -->
        <div v-if="difficulties.length > 0" class="filter-section">
          <button
            class="filter-section-header"
            @click="difficultyExpanded = !difficultyExpanded"
            :aria-expanded="difficultyExpanded"
            aria-controls="difficulty-content"
          >
            <h4 class="filter-title">
              Difficulty
              <span v-if="selectedDifficulties.length > 0" class="filter-badge">{{
                selectedDifficulties.length
              }}</span>
            </h4>
            <span class="expand-icon" aria-hidden="true">{{ difficultyExpanded ? "▼" : "▶" }}</span>
          </button>

          <div v-show="difficultyExpanded" id="difficulty-content" class="filter-content">
            <div
              class="filter-chips difficulty-chips"
              role="listbox"
              aria-label="Difficulty levels"
            >
              <button
                v-for="diff in difficulties"
                :key="diff"
                :class="[
                  'chip',
                  'diff-chip',
                  `diff-${diff}`,
                  { active: selectedDifficulties.includes(diff) },
                ]"
                @click="toggleDifficulty(diff)"
                role="option"
                :aria-selected="selectedDifficulties.includes(diff)"
              >
                {{ difficultyLabels[diff] }}
              </button>
            </div>
          </div>
        </div>

        <!-- Domain Category Filter -->
        <div v-if="domainCategories.length > 0" class="filter-section">
          <button
            class="filter-section-header"
            @click="domainExpanded = !domainExpanded"
            :aria-expanded="domainExpanded"
            aria-controls="domain-content"
          >
            <h4 class="filter-title">
              Domain Type
              <span v-if="selectedDomainCategories.length > 0" class="filter-badge">{{
                selectedDomainCategories.length
              }}</span>
            </h4>
            <span class="expand-icon" aria-hidden="true">{{ domainExpanded ? "▼" : "▶" }}</span>
          </button>

          <div v-show="domainExpanded" id="domain-content" class="filter-content">
            <div class="filter-chips" role="listbox" aria-label="Domain categories">
              <button
                v-for="domain in domainCategories"
                :key="domain"
                :class="['chip', { active: selectedDomainCategories.includes(domain) }]"
                @click="toggleDomainCategory(domain)"
                role="option"
                :aria-selected="selectedDomainCategories.includes(domain)"
              >
                {{ domainLabels[domain] }}
              </button>
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
              <span
                v-if="categorySearchQuery"
                class="search-clear-small"
                @click="categorySearchQuery = ''"
                >✕</span
              >
            </div>

            <div class="filter-chips" role="listbox" aria-label="Available categories">
              <button
                v-for="cat in filteredCategories"
                :key="cat"
                :class="['chip', { active: selectedCategories.includes(cat) }]"
                @click="toggleCategory(cat)"
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

        <!-- Include Documentation Toggle -->
        <div class="filter-section">
          <label class="toggle-row">
            <input
              type="checkbox"
              :checked="includeDocumentation"
              @change="includeDocumentation = !includeDocumentation"
            />
            <span>Include documentation dorks</span>
          </label>
        </div>
      </aside>

      <!-- Main content -->
      <main class="explorer-main">
        <div ref="resultsRef" class="results-header">
          <span class="results-count">
            {{ results.length }} dorks found
            <span v-if="displayedResults.length < results.length" class="results-showing">
              (showing {{ displayedResults.length }})
            </span>
          </span>
          <div class="view-toggle" role="radiogroup" aria-label="View mode">
            <button
              :class="['view-btn', { active: viewMode === 'grid' }]"
              @click="viewMode = 'grid'"
              role="radio"
              :aria-checked="viewMode === 'grid'"
              title="Grid view (G)"
            >
              ▦ Grid
            </button>
            <button
              :class="['view-btn', { active: viewMode === 'list' }]"
              @click="viewMode = 'list'"
              role="radio"
              :aria-checked="viewMode === 'list'"
              title="List view (L)"
            >
              ☰ List
            </button>
          </div>
        </div>

        <!-- Loading skeleton -->
        <div v-if="!isLoaded" class="loading-skeleton">
          <div v-for="i in 6" :key="i" class="skeleton-card">
            <div class="skeleton-header"></div>
            <div class="skeleton-code"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-actions"></div>
          </div>
        </div>

        <div v-else-if="results.length === 0" class="no-results">
          <div class="no-results-icon">🔍</div>
          <h3>No dorks found</h3>
          <p>Try adjusting your filters or search terms.</p>
          <button class="btn btn-primary" @click="clearFilters">Clear all filters</button>
        </div>

        <div v-else :class="['results-grid', viewMode]">
          <DorkCard
            v-for="dork in displayedResults"
            :key="`${dork.packId}-${dork.title}`"
            :dork="dork"
            @open-in-builder="openInBuilder"
          />
        </div>

        <!-- Load more / Infinite scroll indicator -->
        <div v-if="hasMoreResults" class="load-more-section">
          <button class="btn btn-secondary load-more-btn" @click="loadMore">
            Load More ({{ results.length - displayedResults.length }} remaining)
          </button>
          <p class="scroll-hint">Or scroll down to load more automatically</p>
        </div>
      </main>
    </div>

    <!-- Scroll to Top Button -->
    <Transition name="fade">
      <button
        v-if="showScrollTop"
        class="scroll-to-top"
        @click="scrollToTop"
        title="Scroll to top"
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </Transition>

    <!-- Random Dork Modal -->
    <Transition name="modal">
      <div v-if="showRandomDork && randomDork" class="modal-overlay" @click.self="closeRandomDork">
        <div
          class="modal random-dork-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="random-dork-title"
        >
          <div class="modal-header">
            <h2 id="random-dork-title">🎲 Random Dork</h2>
            <button class="modal-close" @click="closeRandomDork" aria-label="Close">×</button>
          </div>
          <div class="modal-body">
            <DorkCard :dork="randomDork" @open-in-builder="openInBuilder" />
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="showRandomDorkFunc">🎲 Another Random</button>
            <button class="btn btn-primary" @click="closeRandomDork">Close</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Keyboard Shortcuts Modal -->
    <Transition name="modal">
      <div v-if="showShortcuts" class="modal-overlay" @click.self="showShortcuts = false">
        <div
          class="modal shortcuts-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcuts-title"
        >
          <div class="modal-header">
            <h2 id="shortcuts-title">⌨️ Keyboard Shortcuts</h2>
            <button class="modal-close" @click="showShortcuts = false" aria-label="Close">×</button>
          </div>
          <div class="modal-body">
            <div class="shortcuts-grid">
              <div class="shortcut">
                <kbd>/</kbd>
                <span>Focus search</span>
              </div>
              <div class="shortcut">
                <kbd>Esc</kbd>
                <span>Clear / Close</span>
              </div>
              <div class="shortcut">
                <kbd>?</kbd>
                <span>Show shortcuts</span>
              </div>
              <div class="shortcut">
                <kbd>R</kbd>
                <span>Random dork</span>
              </div>
              <div class="shortcut">
                <kbd>G</kbd>
                <span>Grid view</span>
              </div>
              <div class="shortcut">
                <kbd>L</kbd>
                <span>List view</span>
              </div>
              <div class="shortcut">
                <kbd>C</kbd>
                <span>Clear filters</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
:root {
  --header-height: 200px;
}

.dork-explorer {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.explorer-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--bg-deep);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-top {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.search-wrapper {
  position: relative;
  flex: 1;
  min-width: 280px;
  max-width: 500px;
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
  background: none;
  border: none;
}

.search-clear:hover {
  color: var(--text-primary);
}

.header-tools {
  display: flex;
  gap: 8px;
  align-items: center;
}

.tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  font-size: 13px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.tool-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.tool-label {
  display: inline;
}

@media (max-width: 600px) {
  .tool-label {
    display: none;
  }
}

.export-wrapper {
  position: relative;
}

.export-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  padding: 8px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 50;
}

.export-option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  font-size: 13px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  text-align: left;
}

.export-option:hover {
  background: var(--accent-subtle);
  color: var(--accent);
}

/* Quick Filters Bar */
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

/* Stats Bar */
.stats-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--bg-elevated);
  border-radius: var(--radius-md);
  font-size: 12px;
  color: var(--text-muted);
  flex-wrap: wrap;
}

.stat {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.stat-divider {
  color: var(--border-subtle);
}

/* Active Filters */
.active-filters {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: var(--bg-elevated);
  border-radius: var(--radius-md);
  flex-wrap: wrap;
}

.active-filters-label {
  font-size: 11px;
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
  font-size: 11px;
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
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
}

.explorer-body {
  display: flex;
  flex: 1;
}

.explorer-sidebar {
  width: 280px;
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

/* Difficulty chips with colors */
.difficulty-chips {
  gap: 8px;
}

.diff-chip {
  font-weight: 600;
}

.diff-chip.diff-beginner {
  border-color: rgba(34, 197, 94, 0.3);
  color: #22c55e;
}

.diff-chip.diff-beginner.active {
  background: rgba(34, 197, 94, 0.15);
  border-color: #22c55e;
}

.diff-chip.diff-intermediate {
  border-color: rgba(234, 179, 8, 0.3);
  color: #eab308;
}

.diff-chip.diff-intermediate.active {
  background: rgba(234, 179, 8, 0.15);
  border-color: #eab308;
}

.diff-chip.diff-advanced {
  border-color: rgba(249, 115, 22, 0.3);
  color: #f97316;
}

.diff-chip.diff-advanced.active {
  background: rgba(249, 115, 22, 0.15);
  border-color: #f97316;
}

.diff-chip.diff-expert {
  border-color: rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

.diff-chip.diff-expert.active {
  background: rgba(239, 68, 68, 0.15);
  border-color: #ef4444;
}

/* Toggle row for checkboxes */
.toggle-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.toggle-row:hover {
  color: var(--text-primary);
}

.toggle-row input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: var(--accent);
  cursor: pointer;
}

.explorer-main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  scroll-margin-top: var(--header-height);
}

.results-count {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 600;
}

.results-showing {
  font-weight: 400;
  color: var(--text-muted);
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.results-grid.list {
  grid-template-columns: 1fr;
}

/* Loading Skeleton */
.loading-skeleton {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.skeleton-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-header,
.skeleton-code,
.skeleton-text,
.skeleton-actions {
  background: linear-gradient(
    90deg,
    var(--bg-elevated) 25%,
    var(--bg-deep) 50%,
    var(--bg-elevated) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: var(--radius-md);
}

.skeleton-header {
  height: 20px;
  width: 70%;
}

.skeleton-code {
  height: 60px;
}

.skeleton-text {
  height: 40px;
}

.skeleton-actions {
  height: 32px;
  width: 60%;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* No Results */
.no-results {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
}

.no-results-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.no-results h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.no-results p {
  margin: 0 0 20px;
}

/* Load More */
.load-more-section {
  text-align: center;
  padding: 32px 20px;
}

.load-more-btn {
  margin-bottom: 8px;
}

.scroll-hint {
  font-size: 12px;
  color: var(--text-muted);
  margin: 0;
}

/* Scroll to Top */
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

/* Modals */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-subtle);
}

.modal-header h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: var(--bg-elevated);
  color: var(--text-secondary);
  font-size: 20px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.modal-close:hover {
  background: var(--accent-subtle);
  color: var(--accent);
}

.modal-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 20px;
  border-top: 1px solid var(--border-subtle);
}

/* Shortcuts Modal */
.shortcuts-grid {
  display: grid;
  gap: 12px;
}

.shortcut {
  display: flex;
  align-items: center;
  gap: 12px;
}

.shortcut kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 28px;
  padding: 0 8px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
}

.shortcut span {
  font-size: 13px;
  color: var(--text-secondary);
}

/* Button styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 13px;
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
  opacity: 0.9;
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

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Responsive */
@media (max-width: 900px) {
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

  .stats-bar {
    justify-content: center;
  }

  .header-top {
    flex-direction: column;
    align-items: stretch;
  }

  .search-wrapper {
    max-width: 100%;
  }

  .header-tools {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .quick-filters-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .quick-filter {
    justify-content: center;
  }

  .modal {
    max-width: 100%;
    margin: 10px;
  }
}
</style>
