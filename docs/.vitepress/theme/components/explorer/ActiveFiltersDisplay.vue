<script setup lang="ts">
interface Pack {
  id: string;
  title: string;
  count: number;
}

interface QuickFilters {
  auSites: boolean;
  pdfs: boolean;
  government: boolean;
  recent: boolean;
  userHosted: boolean;
}

const props = defineProps<{
  showFavoritesOnly: boolean;
  quickFilters: QuickFilters;
  selectedPacks: string[];
  selectedCategories: string[];
  packList: Pack[];
  activeFilterCount: number;
}>();

const emit = defineEmits<{
  (e: "remove-filter", type: "pack" | "category" | "favorites" | "quick", value?: string): void;
}>();

const quickFilterLabels: Record<keyof QuickFilters, { icon: string; label: string }> = {
  auSites: { icon: "🇦🇺", label: "AU Sites" },
  pdfs: { icon: "📄", label: "PDFs" },
  government: { icon: "🏛️", label: "Gov" },
  recent: { icon: "📅", label: "Dated" },
  userHosted: { icon: "🌐", label: "User Platforms" },
};
</script>

<template>
  <div
    v-if="activeFilterCount > 0"
    class="active-filters"
    role="region"
    aria-label="Active filters"
  >
    <span class="active-filters-label">Active:</span>
    <div class="active-filters-chips">
      <button
        v-if="showFavoritesOnly"
        class="filter-chip"
        @click="emit('remove-filter', 'favorites')"
        :aria-label="'Remove favorites filter'"
      >
        <span aria-hidden="true">★</span> Favorites
        <span class="chip-remove" aria-hidden="true">×</span>
      </button>

      <button
        v-for="(filter, key) in quickFilters"
        :key="key"
        v-show="filter"
        class="filter-chip"
        @click="emit('remove-filter', 'quick', key)"
        :aria-label="`Remove ${quickFilterLabels[key].label} filter`"
      >
        <span aria-hidden="true">{{ quickFilterLabels[key].icon }}</span>
        {{ quickFilterLabels[key].label }}
        <span class="chip-remove" aria-hidden="true">×</span>
      </button>

      <button
        v-for="packId in selectedPacks"
        :key="`pack-${packId}`"
        class="filter-chip"
        @click="emit('remove-filter', 'pack', packId)"
        :aria-label="`Remove ${packList.find((p) => p.id === packId)?.title} filter`"
      >
        {{ packList.find((p) => p.id === packId)?.title }}
        <span class="chip-remove" aria-hidden="true">×</span>
      </button>

      <button
        v-for="cat in selectedCategories"
        :key="`cat-${cat}`"
        class="filter-chip"
        @click="emit('remove-filter', 'category', cat)"
        :aria-label="`Remove ${cat} filter`"
      >
        {{ cat }}
        <span class="chip-remove" aria-hidden="true">×</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
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

.filter-chip:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.chip-remove {
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
}

@media (max-width: 900px) {
  .active-filters {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
