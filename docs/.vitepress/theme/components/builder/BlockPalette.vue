<script setup lang="ts">
import { useQueryBuilder, type BlockType } from "../../composables/useQueryBuilder";

const { addBlock } = useQueryBuilder();

const blockTypes: { type: BlockType; icon: string; label: string; color: string }[] = [
  { type: "site", icon: "🌐", label: "Site", color: "var(--block-site)" },
  { type: "filetype", icon: "📄", label: "File", color: "var(--block-filetype)" },
  { type: "keyword", icon: "💬", label: "Keywords", color: "var(--block-keyword)" },
  { type: "date", icon: "📅", label: "Date", color: "var(--block-date)" },
  { type: "trick", icon: "⚡", label: "Tricks", color: "var(--block-trick)" },
];

const quickOperators = [
  { label: "intitle:", value: "intitle:" },
  { label: "inurl:", value: "inurl:" },
  { label: "intext:", value: "intext:" },
  { label: "related:", value: "related:" },
  { label: "cache:", value: "cache:" },
  { label: "source:", value: "source:" },
  { label: "imagesize:", value: "imagesize:" },
  { label: "AROUND(5)", value: "AROUND(5)" },
  { label: "OR group", value: "(term1 OR term2)" },
  { label: "Exclude (-)", value: "-" },
  { label: "Wildcard *", value: "*" },
  { label: "Exact phrase", value: '"exact phrase"' },
];

function handleAdd(type: BlockType) {
  addBlock(type);
}

function handleQuickOperator(value: string) {
  addBlock("trick", value);
}
</script>

<template>
  <div class="block-palette">
    <span class="palette-label">+ Add Block</span>
    <div class="palette-buttons">
      <button
        v-for="bt in blockTypes"
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
      <span class="palette-label">Quick Operators</span>
      <div class="palette-quick">
        <button
          v-for="op in quickOperators"
          :key="op.label"
          class="quick-btn"
          @click="handleQuickOperator(op.value)"
        >
          {{ op.label }}
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

.palette-section {
  margin-top: 16px;
}

.palette-quick {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
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

.quick-btn {
  padding: 6px 10px;
  border-radius: var(--radius-md);
  border: 1px dashed var(--border-subtle);
  background: var(--bg-surface);
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.quick-btn:hover {
  border-color: var(--accent);
  color: var(--text-primary);
}
</style>
