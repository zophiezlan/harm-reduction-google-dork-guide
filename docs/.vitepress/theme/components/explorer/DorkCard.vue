<script setup lang="ts">
import { computed } from "vue";
import type { DorkWithPack } from "../../data/types";
import { useFavorites } from "../../composables/useFavorites";
import { useToast } from "../../composables/useToast";
import { highlightDorkText } from "../../utils/dorkscript";

const props = defineProps<{
  dork: DorkWithPack;
}>();

const emit = defineEmits<{
  openInBuilder: [dork: DorkWithPack];
}>();

const { isFavorite, toggleFavorite } = useFavorites();
const { success } = useToast();

const isFav = computed(() => isFavorite(props.dork.packId, props.dork.title));
const highlightedQuery = computed(() => highlightDorkText(props.dork.query));

function copyQuery() {
  navigator.clipboard.writeText(props.dork.query);
  success("Query copied to clipboard");
}

function searchGoogle() {
  const url = `https://www.google.com/search?q=${encodeURIComponent(props.dork.query)}`;
  window.open(url, "_blank");
}

function handleFavorite() {
  toggleFavorite(props.dork.packId, props.dork.title, props.dork.query);
  success(isFav.value ? "Removed from favorites" : "Added to favorites");
}
</script>

<template>
  <div class="dork-card">
    <div class="card-header">
      <h3 class="card-title">{{ dork.title }}</h3>
      <span class="card-category">{{ dork.category }}</span>
    </div>

    <div class="card-query">
      <code v-html="highlightedQuery"></code>
    </div>

    <p v-if="dork.explanation" class="card-explanation">
      {{ dork.explanation.slice(0, 150) }}{{ dork.explanation.length > 150 ? "..." : "" }}
    </p>

    <div class="card-meta">
      <span class="card-pack">{{ dork.packTitle }}</span>
    </div>

    <div class="card-actions">
      <button class="action-btn" title="Copy query" @click="copyQuery"><span>📋</span> Copy</button>
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
        <span>{{ isFav ? "★" : "☆" }}</span>
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
  transition:
    border-color var(--transition-normal),
    box-shadow var(--transition-normal);
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
  color: var(--text-primary);
  white-space: pre-wrap;
  word-break: break-all;
}

.card-query :deep(.dork-operator) {
  color: #14b8a6;
  font-weight: 600;
}

.card-query :deep(.dork-boolean),
.card-query :deep(.dork-exclusion) {
  color: #ef4444;
  font-weight: 700;
}

.card-query :deep(.dork-string) {
  color: #84cc16;
}

.card-query :deep(.dork-wildcard) {
  color: #f43f5e;
  font-weight: 700;
}

.card-query :deep(.dork-paren) {
  color: #a78bfa;
  font-weight: 600;
}

.card-query :deep(.dork-function) {
  color: #38bdf8;
  font-weight: 700;
}

.card-query :deep(.dork-tag) {
  color: #f97316;
  font-weight: 600;
}

.card-query :deep(.dork-value) {
  color: #e2e8f0;
}

.card-query :deep(.dork-domain) {
  color: #22c55e;
  font-weight: 600;
}

.card-query :deep(.dork-filetype) {
  color: #f59e0b;
  font-weight: 700;
}

.card-query :deep(.dork-date) {
  color: #60a5fa;
  font-weight: 600;
}

.card-query :deep(.dork-number) {
  color: #f472b6;
  font-weight: 700;
}

.card-query :deep(.dork-exclusion-term) {
  color: #f87171;
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
