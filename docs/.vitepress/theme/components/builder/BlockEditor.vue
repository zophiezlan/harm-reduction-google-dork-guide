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

const keywordPresets = [
  { label: "Peer", value: "peer" },
  { label: "X", value: "x" },
  { label: "Harm reduction", value: '"harm reduction"' },
  { label: "Drug checking", value: '"drug checking"' },
  { label: "Naloxone", value: "naloxone" },
  { label: "Needle & syringe", value: '"needle syringe"' },
];

const datePresets = [
  { label: "Last year", value: new Date().getFullYear() - 1 },
  { label: "Last 2 years", value: new Date().getFullYear() - 2 },
  { label: "Last 5 years", value: new Date().getFullYear() - 5 },
];

const aroundPresets = [5, 10, 15];

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

    <!-- Ext Block -->
    <div v-if="selectedBlock.type === 'ext'" class="editor-content">
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
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="File extension"
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- Keyword Block -->
    <div v-if="selectedBlock.type === 'keyword'" class="editor-content">
      <div class="preset-group">
        <button
          v-for="preset in keywordPresets"
          :key="preset.value"
          :class="[
            'preset-btn',
            { active: selectedBlock.value.toLowerCase().includes(preset.value) },
          ]"
          @click="
            updateBlock(selectedBlock.id, {
              value: selectedBlock.value ? `${selectedBlock.value} ${preset.value}` : preset.value,
            })
          "
        >
          {{ preset.label }}
        </button>
      </div>
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

    <!-- In Title -->
    <div v-if="selectedBlock.type === 'intitle'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="Title keywords..."
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- All In Title -->
    <div v-if="selectedBlock.type === 'allintitle'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="All title terms..."
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- In URL -->
    <div v-if="selectedBlock.type === 'inurl'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="URL keywords..."
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- All In URL -->
    <div v-if="selectedBlock.type === 'allinurl'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="All URL terms..."
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- In Text -->
    <div v-if="selectedBlock.type === 'intext'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="Body text keywords..."
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- All In Text -->
    <div v-if="selectedBlock.type === 'allintext'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="All body text terms..."
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- In Anchor -->
    <div v-if="selectedBlock.type === 'inanchor'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="Anchor text..."
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- All In Anchor -->
    <div v-if="selectedBlock.type === 'allinanchor'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="All anchor terms..."
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- Related -->
    <div v-if="selectedBlock.type === 'related'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="related:example.com"
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- Cache -->
    <div v-if="selectedBlock.type === 'cache'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="cache:example.com/page"
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- Source (News) -->
    <div v-if="selectedBlock.type === 'source'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="source:bbc.com"
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- Info -->
    <div v-if="selectedBlock.type === 'info'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="info:example.com"
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- Link -->
    <div v-if="selectedBlock.type === 'link'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="link:example.com"
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- Define -->
    <div v-if="selectedBlock.type === 'define'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="define:term"
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- Weather -->
    <div v-if="selectedBlock.type === 'weather'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="weather:location"
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- Stocks -->
    <div v-if="selectedBlock.type === 'stocks'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="stocks:SYMBOL"
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- Map -->
    <div v-if="selectedBlock.type === 'map'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="map:location"
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- Date Range -->
    <div v-if="selectedBlock.type === 'daterange'" class="editor-content">
      <div class="input-row">
        <input
          :value="selectedBlock.options.start"
          class="input"
          placeholder="Start"
          @input="
            updateBlock(selectedBlock.id, {
              options: {
                ...selectedBlock.options,
                start: ($event.target as HTMLInputElement).value,
              },
            })
          "
        />
        <input
          :value="selectedBlock.options.end"
          class="input"
          placeholder="End"
          @input="
            updateBlock(selectedBlock.id, {
              options: { ...selectedBlock.options, end: ($event.target as HTMLInputElement).value },
            })
          "
        />
      </div>
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="Or enter daterange value"
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- Image Size -->
    <div v-if="selectedBlock.type === 'imagesize'" class="editor-content">
      <div class="input-row">
        <input
          :value="selectedBlock.options.width"
          class="input"
          placeholder="Width"
          type="number"
          @input="
            updateBlock(selectedBlock.id, {
              options: {
                ...selectedBlock.options,
                width: ($event.target as HTMLInputElement).value,
              },
            })
          "
        />
        <input
          :value="selectedBlock.options.height"
          class="input"
          placeholder="Height"
          type="number"
          @input="
            updateBlock(selectedBlock.id, {
              options: {
                ...selectedBlock.options,
                height: ($event.target as HTMLInputElement).value,
              },
            })
          "
        />
      </div>
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="Or enter WIDTHxHEIGHT"
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- Around -->
    <div v-if="selectedBlock.type === 'around'" class="editor-content">
      <div class="input-row">
        <input
          :value="selectedBlock.options.distance"
          class="input"
          placeholder="Distance"
          type="number"
          @input="
            updateBlock(selectedBlock.id, {
              options: {
                ...selectedBlock.options,
                distance: Number(($event.target as HTMLInputElement).value) || 0,
              },
            })
          "
        />
        <input
          :value="selectedBlock.options.termA"
          class="input"
          placeholder="Term A"
          @input="
            updateBlock(selectedBlock.id, {
              options: {
                ...selectedBlock.options,
                termA: ($event.target as HTMLInputElement).value,
              },
            })
          "
        />
        <input
          :value="selectedBlock.options.termB"
          class="input"
          placeholder="Term B"
          @input="
            updateBlock(selectedBlock.id, {
              options: {
                ...selectedBlock.options,
                termB: ($event.target as HTMLInputElement).value,
              },
            })
          "
        />
      </div>
      <div class="preset-group">
        <button
          v-for="preset in aroundPresets"
          :key="preset"
          :class="['preset-btn', { active: selectedBlock.options.distance === preset }]"
          @click="
            updateBlock(selectedBlock.id, {
              options: { ...selectedBlock.options, distance: preset },
            })
          "
        >
          AROUND({{ preset }})
        </button>
      </div>
    </div>

    <!-- Exclude -->
    <div v-if="selectedBlock.type === 'exclude'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="Exclude term or site"
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
    </div>

    <!-- OR Group -->
    <div v-if="selectedBlock.type === 'or'" class="editor-content">
      <div class="input-row">
        <input
          :value="selectedBlock.options.termA"
          class="input"
          placeholder="Term A"
          @input="
            updateBlock(selectedBlock.id, {
              options: {
                ...selectedBlock.options,
                termA: ($event.target as HTMLInputElement).value,
              },
            })
          "
        />
        <input
          :value="selectedBlock.options.termB"
          class="input"
          placeholder="Term B"
          @input="
            updateBlock(selectedBlock.id, {
              options: {
                ...selectedBlock.options,
                termB: ($event.target as HTMLInputElement).value,
              },
            })
          "
        />
      </div>
    </div>

    <!-- Exact Phrase -->
    <div v-if="selectedBlock.type === 'exact'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="Exact phrase"
        @input="updateBlock(selectedBlock.id, { value: ($event.target as HTMLInputElement).value })"
      />
    </div>

    <!-- Wildcard -->
    <div v-if="selectedBlock.type === 'wildcard'" class="editor-content">
      <input
        :value="selectedBlock.value"
        class="input"
        placeholder="Keyword with *"
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

.input-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 8px;
  margin-bottom: 12px;
}
</style>
