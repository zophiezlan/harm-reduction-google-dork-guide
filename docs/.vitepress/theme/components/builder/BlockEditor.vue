<script setup lang="ts">
import { computed } from "vue";
import { useQueryBuilder } from "../../composables/useQueryBuilder";
import { SYNONYM_GROUPS, findSynonyms } from "../../data/synonyms";

const { selectedBlock, updateBlock, removeBlock } = useQueryBuilder();

const sitePresets = [
  { label: "Australian Gov", value: "gov.au" },
  { label: "Health Gov", value: "health.gov.au" },
  { label: "Education", value: "edu.au" },
  { label: "Organisations", value: "org.au" },
];

const filetypePresets = ["pdf", "doc", "docx", "xlsx", "ppt", "pptx"];

const datePresets = [
  { label: "Last year", value: new Date().getFullYear() - 1 },
  { label: "Last 2 years", value: new Date().getFullYear() - 2 },
  { label: "Last 5 years", value: new Date().getFullYear() - 5 },
];

const trickPresets = [
  { label: "In title", value: "intitle:" },
  { label: "In URL", value: "inurl:" },
  { label: "Related", value: "related:" },
  { label: "Exclude", value: "-" },
  { label: "OR group", value: "(term1 OR term2)" },
  { label: "Exact phrase", value: '"exact phrase"' },
  { label: "Wildcard", value: "*" },
];

const synonymSuggestion = computed(() => {
  if (selectedBlock.value?.type !== "keyword") return null;
  return findSynonyms(selectedBlock.value.value);
});
</script>

<template>
  <div v-if="selectedBlock" class="block-editor">
    <div class="editor-header">
      <span class="editor-type">{{ selectedBlock.type.toUpperCase() }}</span>
      <button class="editor-remove" @click="removeBlock(selectedBlock.id)">Remove</button>
    </div>

    <!-- Site Block -->
    <div v-if="selectedBlock.type === 'site'" class="editor-content">
      <div class="preset-group">
        <button
          v-for="preset in sitePresets"
          :key="preset.value"
          :class="['preset-btn', { active: selectedBlock.value === preset.value }]"
          @click="updateBlock(selectedBlock.id, { value: preset.value })"
        >
          {{ preset.label }}
        </button>
      </div>
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="Custom domain..."
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
      <label class="checkbox-label">
        <input
          type="checkbox"
          :checked="selectedBlock.options.wildcard"
          @change="
            updateBlock(selectedBlock.id, {
              options: {
                ...selectedBlock.options,
                wildcard: ($event.target as HTMLInputElement).checked,
              },
            })
          "
        />
        Include subdomains (wildcard)
      </label>
    </div>

    <!-- Filetype Block -->
    <div v-if="selectedBlock.type === 'filetype'" class="editor-content">
      <div class="preset-group">
        <button
          v-for="ft in filetypePresets"
          :key="ft"
          :class="['preset-btn', { active: selectedBlock.value === ft }]"
          @click="updateBlock(selectedBlock.id, { value: ft })"
        >
          {{ ft.toUpperCase() }}
        </button>
      </div>
    </div>

    <!-- Keyword Block -->
    <div v-if="selectedBlock.type === 'keyword'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="Enter keywords..."
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
      <label class="checkbox-label">
        <input
          type="checkbox"
          :checked="selectedBlock.options.exact"
          @change="
            updateBlock(selectedBlock.id, {
              options: {
                ...selectedBlock.options,
                exact: ($event.target as HTMLInputElement).checked,
              },
            })
          "
        />
        Exact phrase
      </label>

      <div v-if="synonymSuggestion" class="synonym-suggestion">
        <div class="synonym-header">
          <span>💡 Synonym expansion available</span>
          <label class="checkbox-label">
            <input
              type="checkbox"
              :checked="selectedBlock.options.useSynonyms"
              @change="
                updateBlock(selectedBlock.id, {
                  options: {
                    ...selectedBlock.options,
                    useSynonyms: ($event.target as HTMLInputElement).checked,
                  },
                })
              "
            />
            Use synonyms
          </label>
        </div>
        <code class="synonym-preview">{{ synonymSuggestion.pattern }}</code>
      </div>
    </div>

    <!-- Date Block -->
    <div v-if="selectedBlock.type === 'date'" class="editor-content">
      <div class="radio-group">
        <label>
          <input
            type="radio"
            :checked="selectedBlock.options.type === 'after'"
            @change="
              updateBlock(selectedBlock.id, {
                options: { ...selectedBlock.options, type: 'after' },
              })
            "
          />
          After
        </label>
        <label>
          <input
            type="radio"
            :checked="selectedBlock.options.type === 'before'"
            @change="
              updateBlock(selectedBlock.id, {
                options: { ...selectedBlock.options, type: 'before' },
              })
            "
          />
          Before
        </label>
      </div>
      <div class="preset-group">
        <button
          v-for="preset in datePresets"
          :key="preset.value"
          :class="['preset-btn', { active: selectedBlock.value === String(preset.value) }]"
          @click="
            updateBlock(selectedBlock.id, {
              value: String(preset.value),
              options: { ...selectedBlock.options, type: selectedBlock.options.type || 'after' },
            })
          "
        >
          {{ preset.label }}
        </button>
      </div>
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="YYYY or YYYY-MM-DD"
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- Trick Block -->
    <div v-if="selectedBlock.type === 'trick'" class="editor-content">
      <div class="preset-group">
        <button
          v-for="trick in trickPresets"
          :key="trick.value"
          class="preset-btn"
          @click="updateBlock(selectedBlock.id, { value: trick.value })"
        >
          {{ trick.label }}
        </button>
      </div>
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="Custom operator..."
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>
  </div>

  <div v-else class="block-editor empty">
    <p>Select a block to edit, or add a new block below</p>
  </div>
</template>

<style scoped>
.block-editor {
  padding: 20px;
  background: var(--bg-elevated);
  border-top: 1px solid var(--border-subtle);
}

.block-editor.empty {
  text-align: center;
  color: var(--text-muted);
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.editor-type {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.editor-remove {
  font-size: 12px;
  color: var(--danger);
  background: none;
  border: none;
  cursor: pointer;
}

.editor-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.preset-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.preset-btn {
  padding: 6px 12px;
  font-size: 12px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  background: var(--bg-surface);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.preset-btn:hover {
  border-color: var(--accent-border);
  color: var(--text-primary);
}

.preset-btn.active {
  background: var(--accent-subtle);
  border-color: var(--accent);
  color: var(--accent);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
}

.radio-group {
  display: flex;
  gap: 16px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
}

.synonym-suggestion {
  background: var(--bg-surface);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-md);
  padding: 12px;
}

.synonym-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  color: var(--accent);
}

.synonym-preview {
  display: block;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-secondary);
  word-break: break-all;
}
</style>
