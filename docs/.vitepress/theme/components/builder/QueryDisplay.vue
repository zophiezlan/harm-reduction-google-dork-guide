<script setup lang="ts">
import { useQueryBuilder } from "../../composables/useQueryBuilder";
import { useToast } from "../../composables/useToast";

const { blocks, queryString, selectBlock, selectedBlockId, removeBlock } = useQueryBuilder();
const { success } = useToast();

const blockColors: Record<string, string> = {
  site: "var(--block-site)",
  filetype: "var(--block-filetype)",
  keyword: "var(--block-keyword)",
  date: "var(--block-date)",
  trick: "var(--block-trick)",
};

function copyQuery() {
  navigator.clipboard.writeText(queryString.value);
  success("Query copied to clipboard");
}

function searchGoogle() {
  const url = `https://www.google.com/search?q=${encodeURIComponent(queryString.value)}`;
  window.open(url, "_blank");
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
          {{ block.type }}:{{ block.value || "..." }}
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
