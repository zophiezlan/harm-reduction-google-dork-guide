<script setup lang="ts">
import { computed } from "vue";
import { useQueryBuilder } from "../../composables/useQueryBuilder";
import { useToast } from "../../composables/useToast";
import { highlightDorkWithLint, lintDorkScript } from "../../utils/dorkscript";

const { blocks, queryString, selectBlock, selectedBlockId, removeBlock } = useQueryBuilder();
const { success } = useToast();

const blockColors: Record<string, string> = {
  site: "var(--block-site)",
  filetype: "var(--block-filetype)",
  keyword: "var(--block-keyword)",
  date: "var(--block-date)",
  ext: "var(--block-ext)",
  intitle: "var(--block-intitle)",
  allintitle: "var(--block-allintitle)",
  inurl: "var(--block-inurl)",
  allinurl: "var(--block-allinurl)",
  intext: "var(--block-intext)",
  allintext: "var(--block-allintext)",
  inanchor: "var(--block-inanchor)",
  allinanchor: "var(--block-allinanchor)",
  related: "var(--block-related)",
  cache: "var(--block-cache)",
  source: "var(--block-source)",
  imagesize: "var(--block-imagesize)",
  info: "var(--block-info)",
  link: "var(--block-link)",
  define: "var(--block-define)",
  weather: "var(--block-weather)",
  stocks: "var(--block-stocks)",
  map: "var(--block-map)",
  daterange: "var(--block-daterange)",
  around: "var(--block-around)",
  exclude: "var(--block-exclude)",
  or: "var(--block-or)",
  exact: "var(--block-exact)",
  wildcard: "var(--block-wildcard)",
};

function copyQuery() {
  navigator.clipboard.writeText(queryString.value);
  success("Query copied to clipboard");
}

function searchGoogle() {
  const url = `https://www.google.com/search?q=${encodeURIComponent(queryString.value)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

const lintIssues = computed(() => lintDorkScript(queryString.value));
const highlightedQuery = computed(() =>
  queryString.value ? highlightDorkWithLint(queryString.value, lintIssues.value) : ""
);
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
          {{ block.type }}:{{ block.value || "..." }}
          <button class="block-remove" @click.stop="removeBlock(block.id)">×</button>
        </span>
      </div>
    </div>

    <div v-if="queryString" class="query-raw">
      <code v-html="highlightedQuery"></code>
    </div>

    <div v-if="lintIssues.length" class="query-lint">
      <div class="lint-title">DorkScript checks</div>
      <ul>
        <li v-for="(issue, index) in lintIssues" :key="index" :class="issue.severity">
          {{ issue.message }}
        </li>
      </ul>
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

.query-lint {
  margin-top: 12px;
  padding: 12px;
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--danger) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--danger) 30%, transparent);
}

.lint-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.query-lint ul {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 4px;
  color: var(--text-secondary);
  font-size: 12px;
}

.query-lint li.error {
  color: var(--danger);
}

.query-lint li.warning {
  color: #f59e0b;
}

.query-raw :global(.dork-error) {
  box-shadow: inset 0 -2px 0 var(--danger);
  background: color-mix(in srgb, var(--danger) 15%, transparent);
  border-radius: 3px;
}

.query-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}
</style>
