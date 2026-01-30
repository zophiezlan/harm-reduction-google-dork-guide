<script setup lang="ts">
import { onMounted } from "vue";
import { useQueryBuilder } from "../../composables/useQueryBuilder";
import { useToast } from "../../composables/useToast";
import QueryDisplay from "./QueryDisplay.vue";
import BlockPalette from "./BlockPalette.vue";
import BlockEditor from "./BlockEditor.vue";

const { clearBlocks, loadFromQuery, queryString } = useQueryBuilder();
const { success } = useToast();

// Load query from URL params
onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");
  if (q) {
    loadFromQuery(decodeURIComponent(q));
  }
});

function handleReset() {
  clearBlocks();
  success("Builder cleared");
}

function handleShare() {
  const url = `${window.location.origin}${window.location.pathname}?q=${encodeURIComponent(queryString.value)}`;
  navigator.clipboard.writeText(url);
  success("Share link copied to clipboard");
}
</script>

<template>
  <div class="dork-builder">
    <header class="builder-header">
      <h1 class="builder-title">Dork Builder</h1>
      <div class="builder-actions">
        <button class="btn btn-ghost" @click="handleReset">Reset</button>
        <button class="btn btn-secondary" :disabled="!queryString" @click="handleShare">
          Share
        </button>
      </div>
    </header>

    <div class="builder-body">
      <QueryDisplay />
      <BlockEditor />
      <BlockPalette />
    </div>

    <aside class="builder-help">
      <h3>Quick Tips</h3>
      <ul>
        <li><strong>Site</strong>: Limit search to specific domains</li>
        <li><strong>File</strong>: Find specific file types (PDF, DOCX)</li>
        <li><strong>Keywords</strong>: Add search terms with optional synonym expansion</li>
        <li><strong>Date</strong>: Filter by publication date</li>
        <li><strong>Tricks</strong>: Advanced operators like intitle:, inurl:</li>
      </ul>
      <p class="help-note">
        Click a block in the query to edit it. Use the palette below to add new blocks.
      </p>
    </aside>
  </div>
</template>

<style scoped>
.dork-builder {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.builder-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid var(--border-subtle);
  background: var(--bg-deep);
}

.builder-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.builder-actions {
  display: flex;
  gap: 8px;
}

.builder-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.builder-help {
  padding: 24px;
  background: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
}

.builder-help h3 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px;
  color: var(--text-secondary);
}

.builder-help ul {
  margin: 0;
  padding-left: 20px;
}

.builder-help li {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.builder-help strong {
  color: var(--text-primary);
}

.help-note {
  margin-top: 16px;
  font-size: 12px;
  color: var(--text-muted);
}
</style>
