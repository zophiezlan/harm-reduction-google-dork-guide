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

const difficultyLabel = computed(() => {
  const labels: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    expert: "Expert",
  };
  return labels[props.dork.difficulty || ""] || props.dork.difficulty;
});

const domainCategoryLabel = computed(() => {
  const labels: Record<string, string> = {
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
  return labels[props.dork.domainCategory || ""] || props.dork.domainCategory;
});

function copyQuery() {
  navigator.clipboard.writeText(props.dork.query);
  success("Query copied to clipboard");
}

function searchGoogle() {
  const url = `https://www.google.com/search?q=${encodeURIComponent(props.dork.query)}`;
  window.open(url, "_blank", "noopener,noreferrer");
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
      <div class="card-badges">
        <span
          v-if="dork.difficulty"
          :class="['badge', 'badge-difficulty', `badge-${dork.difficulty}`]"
        >
          {{ difficultyLabel }}
        </span>
        <span class="card-category">{{ dork.category }}</span>
      </div>
    </div>

    <div class="card-query">
      <code v-html="highlightedQuery"></code>
    </div>

    <p v-if="dork.explanation" class="card-explanation">
      {{ dork.explanation.slice(0, 150) }}{{ dork.explanation.length > 150 ? "..." : "" }}
    </p>

    <div class="card-meta">
      <span class="card-pack">{{ dork.packTitle }}</span>
      <span v-if="dork.domainCategory && dork.domainCategory !== 'any'" class="card-domain-cat">
        {{ domainCategoryLabel }}
      </span>
      <div v-if="dork.operators && dork.operators.length > 0" class="card-operators">
        <span v-for="op in dork.operators.slice(0, 3)" :key="op" class="op-badge">{{ op }}</span>
        <span v-if="dork.operators.length > 3" class="op-more"
          >+{{ dork.operators.length - 3 }}</span
        >
      </div>
    </div>

    <div v-if="dork.tags && dork.tags.length > 0" class="card-tags">
      <span v-for="tag in dork.tags.slice(0, 4)" :key="tag" class="tag-badge">{{ tag }}</span>
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
  flex: 1;
}

.card-badges {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.badge {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.badge-difficulty.badge-beginner {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.badge-difficulty.badge-intermediate {
  background: rgba(234, 179, 8, 0.15);
  color: #eab308;
  border: 1px solid rgba(234, 179, 8, 0.3);
}

.badge-difficulty.badge-advanced {
  background: rgba(249, 115, 22, 0.15);
  color: #f97316;
  border: 1px solid rgba(249, 115, 22, 0.3);
}

.badge-difficulty.badge-expert {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
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

/* Base operator styling */
.card-query :deep(.dork-operator) {
  color: #14b8a6;
  font-weight: 600;
}

/* Semantic operator classes */
.card-query :deep(.dork-op-site) {
  color: #22c55e;
}

.card-query :deep(.dork-op-file) {
  color: #f59e0b;
}

.card-query :deep(.dork-op-date) {
  color: #60a5fa;
}

.card-query :deep(.dork-op-content) {
  color: #14b8a6;
}

/* Boolean operators with distinct colors */
.card-query :deep(.dork-boolean) {
  font-weight: 700;
}

.card-query :deep(.dork-or) {
  color: #22d3ee;
}

.card-query :deep(.dork-and) {
  color: #a78bfa;
}

.card-query :deep(.dork-exclusion) {
  color: #ef4444;
  font-weight: 700;
}

/* Strings and phrases */
.card-query :deep(.dork-string) {
  color: #84cc16;
}

.card-query :deep(.dork-phrase) {
  color: #a3e635;
  font-style: italic;
}

/* Special elements */
.card-query :deep(.dork-wildcard) {
  color: #f43f5e;
  font-weight: 700;
}

.card-query :deep(.dork-paren) {
  color: #a78bfa;
  font-weight: 600;
}

.card-query :deep(.dork-pipe) {
  color: #94a3b8;
  font-weight: 400;
}

.card-query :deep(.dork-function) {
  color: #38bdf8;
  font-weight: 700;
}

.card-query :deep(.dork-tag) {
  color: #f97316;
  font-weight: 600;
}

/* Value types */
.card-query :deep(.dork-value) {
  color: #e2e8f0;
}

.card-query :deep(.dork-content-value) {
  color: #cbd5e1;
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
  text-decoration: line-through;
  text-decoration-color: rgba(248, 113, 113, 0.5);
}

.card-explanation {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.card-pack {
  font-size: 11px;
  color: var(--text-muted);
}

.card-domain-cat {
  font-size: 10px;
  padding: 2px 6px;
  background: rgba(99, 102, 241, 0.1);
  color: #818cf8;
  border-radius: 4px;
}

.card-operators {
  display: flex;
  gap: 4px;
  align-items: center;
}

.op-badge {
  font-size: 9px;
  padding: 1px 5px;
  background: var(--bg-deep);
  color: var(--text-secondary);
  border-radius: 3px;
  font-family: var(--font-mono);
}

.op-more {
  font-size: 9px;
  color: var(--text-muted);
}

.card-tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.tag-badge {
  font-size: 10px;
  padding: 2px 6px;
  background: rgba(20, 184, 166, 0.1);
  color: #14b8a6;
  border-radius: 4px;
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
