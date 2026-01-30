<script setup lang="ts">
import { useQueryBuilder, type BlockType } from "../../composables/useQueryBuilder";

const { addBlock } = useQueryBuilder();

const coreBlocks: { type: BlockType; icon: string; label: string; color: string }[] = [
  { type: "site", icon: "🌐", label: "Site", color: "var(--block-site)" },
  { type: "filetype", icon: "📄", label: "File", color: "var(--block-filetype)" },
  { type: "keyword", icon: "💬", label: "Keywords", color: "var(--block-keyword)" },
  { type: "date", icon: "📅", label: "Date", color: "var(--block-date)" },
];

const operatorBlocks: { type: BlockType; icon: string; label: string; color: string }[] = [
  { type: "intitle", icon: "🧷", label: "In Title", color: "var(--block-intitle)" },
  { type: "inurl", icon: "🔗", label: "In URL", color: "var(--block-inurl)" },
  { type: "intext", icon: "📝", label: "In Text", color: "var(--block-intext)" },
  { type: "exact", icon: "🎯", label: "Exact", color: "var(--block-exact)" },
  { type: "exclude", icon: "🚫", label: "Exclude", color: "var(--block-exclude)" },
  { type: "or", icon: "➕", label: "OR Group", color: "var(--block-or)" },
  { type: "wildcard", icon: "✳️", label: "Wildcard", color: "var(--block-wildcard)" },
  { type: "around", icon: "📏", label: "Around", color: "var(--block-around)" },
  { type: "imagesize", icon: "🖼️", label: "Image Size", color: "var(--block-imagesize)" },
  { type: "related", icon: "🧭", label: "Related", color: "var(--block-related)" },
  { type: "source", icon: "📰", label: "Source", color: "var(--block-source)" },
  { type: "cache", icon: "🗂️", label: "Cache", color: "var(--block-cache)" },
  { type: "info", icon: "ℹ️", label: "Info", color: "var(--block-info)" },
  { type: "link", icon: "🔍", label: "Link", color: "var(--block-link)" },
  { type: "inanchor", icon: "⚓", label: "In Anchor", color: "var(--block-inanchor)" },
  { type: "allinanchor", icon: "⚓", label: "All In Anchor", color: "var(--block-allinanchor)" },
  { type: "allintitle", icon: "🧷", label: "All In Title", color: "var(--block-allintitle)" },
  { type: "allinurl", icon: "🔗", label: "All In URL", color: "var(--block-allinurl)" },
  { type: "allintext", icon: "📝", label: "All In Text", color: "var(--block-allintext)" },
  { type: "ext", icon: "🧩", label: "Ext", color: "var(--block-ext)" },
  { type: "define", icon: "📖", label: "Define", color: "var(--block-define)" },
  { type: "weather", icon: "🌦️", label: "Weather", color: "var(--block-weather)" },
  { type: "stocks", icon: "📈", label: "Stocks", color: "var(--block-stocks)" },
  { type: "map", icon: "🗺️", label: "Map", color: "var(--block-map)" },
  { type: "daterange", icon: "🗓️", label: "Date Range", color: "var(--block-daterange)" },
];

function handleAdd(type: BlockType) {
  addBlock(type);
}
</script>

<template>
  <div class="block-palette">
    <span class="palette-label">+ Core Operators</span>
    <div class="palette-buttons">
      <button
        v-for="bt in coreBlocks"
        :key="bt.type"
        class="palette-btn"
        :style="{ '--block-color': bt.color }"
        @click="handleAdd(bt.type)"
      >
        <span class="btn-icon">{{ bt.icon }}</span>
        <span class="btn-label">{{ bt.label }}</span>
      </button>
    </div>

    <div class="palette-section">
      <span class="palette-label">+ Advanced Operators</span>
      <div class="palette-buttons">
        <button
          v-for="bt in operatorBlocks"
          :key="bt.type"
          class="palette-btn"
          :style="{ '--block-color': bt.color }"
          @click="handleAdd(bt.type)"
        >
          <span class="btn-icon">{{ bt.icon }}</span>
          <span class="btn-label">{{ bt.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.block-palette {
  padding: 16px;
  border-top: 1px solid var(--border-subtle);
}

.palette-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.palette-buttons {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.palette-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  cursor: pointer;
  transition: all var(--transition-fast);
  min-width: 70px;
}

.palette-btn:hover {
  border-color: var(--block-color);
  box-shadow: 0 0 12px color-mix(in srgb, var(--block-color) 30%, transparent);
}

.btn-icon {
  font-size: 20px;
}

.btn-label {
  font-size: 11px;
  color: var(--text-secondary);
}

.palette-section {
  margin-top: 16px;
}
</style>
