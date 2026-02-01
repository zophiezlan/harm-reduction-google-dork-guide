<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useQueryBuilder } from "../../composables/useQueryBuilder";
import {
  useQueryHistory,
  DORK_TEMPLATES,
  getTemplatesByCategory,
  type DorkTemplate,
} from "../../composables/useQueryHistory";
import { useToast } from "../../composables/useToast";
import QueryDisplay from "./QueryDisplay.vue";
import BlockPalette from "./BlockPalette.vue";
import BlockEditor from "./BlockEditor.vue";

const { clearBlocks, loadFromQuery, queryString } = useQueryBuilder();
const {
  history,
  initialize: initHistory,
  addToHistory,
  removeFromHistory,
  clearHistory,
  updateLabel,
} = useQueryHistory();
const { success } = useToast();

// UI State
const showHistory = ref(false);
const showTemplates = ref(false);
const showShortcuts = ref(false);
const editingHistoryId = ref<string | null>(null);
const editingLabel = ref("");
const activeTemplateCategory = ref<string>("Research");

// Computed
const templatesByCategory = computed(() => getTemplatesByCategory());
const templateCategories = computed(() => Object.keys(templatesByCategory.value));

// Load query from URL params
onMounted(() => {
  initHistory();

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

function handleSaveToHistory() {
  if (!queryString.value) return;
  addToHistory(queryString.value);
  success("Query saved to history");
}

function handleSearchGoogle() {
  if (!queryString.value) return;
  addToHistory(queryString.value);
  const url = `https://www.google.com/search?q=${encodeURIComponent(queryString.value)}`;
  window.open(url, "_blank");
}

function loadFromHistoryItem(query: string) {
  loadFromQuery(query);
  showHistory.value = false;
  success("Query loaded from history");
}

function loadTemplate(template: DorkTemplate) {
  loadFromQuery(template.query);
  showTemplates.value = false;
  success(`Loaded template: ${template.name}`);
}

function startEditLabel(id: string, currentLabel?: string) {
  editingHistoryId.value = id;
  editingLabel.value = currentLabel || "";
}

function saveLabel() {
  if (editingHistoryId.value) {
    updateLabel(editingHistoryId.value, editingLabel.value);
    editingHistoryId.value = null;
    editingLabel.value = "";
  }
}

function cancelEditLabel() {
  editingHistoryId.value = null;
  editingLabel.value = "";
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

function truncateQuery(query: string, maxLen = 60): string {
  if (query.length <= maxLen) return query;
  return query.substring(0, maxLen) + "...";
}

function copyQuery(query: string) {
  navigator.clipboard.writeText(query);
  success("Copied!");
}

// Keyboard shortcuts
function handleKeydown(e: KeyboardEvent) {
  const target = e.target as HTMLElement;
  if (["INPUT", "TEXTAREA"].includes(target.tagName)) return;

  switch (e.key) {
    case "?":
      e.preventDefault();
      showShortcuts.value = !showShortcuts.value;
      break;
    case "h":
      e.preventDefault();
      showHistory.value = !showHistory.value;
      showTemplates.value = false;
      break;
    case "t":
      e.preventDefault();
      showTemplates.value = !showTemplates.value;
      showHistory.value = false;
      break;
    case "Escape":
      showHistory.value = false;
      showTemplates.value = false;
      showShortcuts.value = false;
      break;
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div class="dork-builder" role="main" aria-label="Dork Builder">
    <header class="builder-header">
      <div class="header-left">
        <h1 class="builder-title">🔧 Dork Builder</h1>
        <p class="builder-subtitle">Build powerful Google search queries visually</p>
      </div>
      <div class="builder-actions">
        <button class="btn btn-ghost" @click="showTemplates = !showTemplates" title="Templates (T)">
          📋 Templates
        </button>
        <button class="btn btn-ghost" @click="showHistory = !showHistory" title="History (H)">
          🕐 History ({{ history.length }})
        </button>
        <button class="btn btn-ghost" @click="handleReset">🗑️ Reset</button>
        <button class="btn btn-secondary" :disabled="!queryString" @click="handleSaveToHistory">
          💾 Save
        </button>
        <button class="btn btn-secondary" :disabled="!queryString" @click="handleShare">
          🔗 Share
        </button>
        <button class="btn btn-primary" :disabled="!queryString" @click="handleSearchGoogle">
          🔍 Search
        </button>
      </div>
    </header>

    <div class="builder-body">
      <QueryDisplay />
      <BlockEditor />
      <BlockPalette />
    </div>

    <aside class="builder-help">
      <div class="help-columns">
        <div class="help-column">
          <h3>Getting Started</h3>
          <ul>
            <li>Click blocks below to add search operators</li>
            <li>Click blocks in the query to edit them</li>
            <li>Use presets for common values</li>
            <li>Enable synonym expansion for better coverage</li>
          </ul>
        </div>
        <div class="help-column">
          <h3>Keyboard Shortcuts</h3>
          <div class="shortcuts-inline">
            <span><kbd>?</kbd> Help</span>
            <span><kbd>H</kbd> History</span>
            <span><kbd>T</kbd> Templates</span>
            <span><kbd>Esc</kbd> Close</span>
          </div>
        </div>
        <div class="help-column">
          <h3>Tips</h3>
          <ul>
            <li>Combine multiple operators for precise results</li>
            <li>Use date filters to find recent content</li>
            <li>Save frequently used queries to history</li>
          </ul>
        </div>
      </div>
    </aside>

    <!-- Templates Panel -->
    <Transition name="slide">
      <div v-if="showTemplates" class="panel templates-panel">
        <div class="panel-header">
          <h2>📋 Quick Templates</h2>
          <button class="panel-close" @click="showTemplates = false" aria-label="Close">×</button>
        </div>
        <div class="panel-body">
          <div class="template-categories">
            <button
              v-for="cat in templateCategories"
              :key="cat"
              :class="['category-tab', { active: activeTemplateCategory === cat }]"
              @click="activeTemplateCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
          <div class="template-list">
            <button
              v-for="template in templatesByCategory[activeTemplateCategory]"
              :key="template.id"
              class="template-item"
              @click="loadTemplate(template)"
            >
              <span class="template-icon">{{ template.icon }}</span>
              <div class="template-info">
                <span class="template-name">{{ template.name }}</span>
                <span class="template-desc">{{ template.description }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- History Panel -->
    <Transition name="slide">
      <div v-if="showHistory" class="panel history-panel">
        <div class="panel-header">
          <h2>🕐 Query History</h2>
          <div class="panel-actions">
            <button v-if="history.length > 0" class="text-btn danger" @click="clearHistory">
              Clear All
            </button>
            <button class="panel-close" @click="showHistory = false" aria-label="Close">×</button>
          </div>
        </div>
        <div class="panel-body">
          <div v-if="history.length === 0" class="empty-state">
            <span class="empty-icon">📝</span>
            <p>No queries saved yet.</p>
            <p class="empty-hint">Your search history will appear here.</p>
          </div>
          <div v-else class="history-list">
            <div v-for="item in history" :key="item.id" class="history-item">
              <div class="history-main" @click="loadFromHistoryItem(item.query)">
                <div class="history-label-row">
                  <span v-if="item.label" class="history-label">{{ item.label }}</span>
                  <span class="history-time">{{ formatDate(item.timestamp) }}</span>
                </div>
                <code class="history-query">{{ truncateQuery(item.query) }}</code>
              </div>
              <div class="history-actions">
                <button
                  class="history-action"
                  @click.stop="startEditLabel(item.id, item.label)"
                  title="Add label"
                >
                  🏷️
                </button>
                <button
                  class="history-action"
                  @click.stop="copyQuery(item.query)"
                  title="Copy query"
                >
                  📋
                </button>
                <button
                  class="history-action danger"
                  @click.stop="removeFromHistory(item.id)"
                  title="Remove"
                >
                  🗑️
                </button>
              </div>

              <!-- Label Editor -->
              <div v-if="editingHistoryId === item.id" class="label-editor">
                <input
                  v-model="editingLabel"
                  type="text"
                  class="input"
                  placeholder="Enter a label..."
                  @keyup.enter="saveLabel"
                  @keyup.escape="cancelEditLabel"
                />
                <button class="btn btn-primary btn-sm" @click="saveLabel">Save</button>
                <button class="btn btn-ghost btn-sm" @click="cancelEditLabel">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Shortcuts Modal -->
    <Transition name="modal">
      <div v-if="showShortcuts" class="modal-overlay" @click.self="showShortcuts = false">
        <div
          class="modal shortcuts-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcuts-title"
        >
          <div class="modal-header">
            <h2 id="shortcuts-title">⌨️ Keyboard Shortcuts</h2>
            <button class="modal-close" @click="showShortcuts = false" aria-label="Close">×</button>
          </div>
          <div class="modal-body">
            <div class="shortcuts-grid">
              <div class="shortcut"><kbd>?</kbd><span>Show this help</span></div>
              <div class="shortcut"><kbd>H</kbd><span>Toggle history</span></div>
              <div class="shortcut"><kbd>T</kbd><span>Toggle templates</span></div>
              <div class="shortcut"><kbd>Esc</kbd><span>Close panels</span></div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dork-builder {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.builder-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-subtle);
  background: var(--bg-deep);
  flex-wrap: wrap;
  gap: 16px;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.builder-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.builder-subtitle {
  font-size: 13px;
  color: var(--text-muted);
  margin: 0;
}

.builder-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.builder-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.builder-help {
  padding: 20px 24px;
  background: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
}

.help-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.help-column h3 {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 12px;
}

.help-column ul {
  margin: 0;
  padding-left: 18px;
}

.help-column li {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.shortcuts-inline {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.shortcuts-inline span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-secondary);
}

.shortcuts-inline kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 22px;
  padding: 0 6px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  color: var(--text-primary);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-primary {
  background: var(--accent);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--bg-elevated);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
}

.btn-secondary:hover:not(:disabled) {
  border-color: var(--accent-border);
}

.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
}

.btn-ghost:hover {
  background: var(--bg-elevated);
  color: var(--text-primary);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-sm {
  padding: 6px 10px;
  font-size: 12px;
}

.text-btn {
  background: none;
  border: none;
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.text-btn.danger {
  color: var(--danger);
}

.text-btn:hover {
  background: var(--bg-elevated);
}

/* Panels */
.panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  max-width: 90vw;
  height: 100vh;
  background: var(--bg-surface);
  border-left: 1px solid var(--border-subtle);
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
}

.panel-header h2 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.panel-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.panel-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: var(--bg-surface);
  color: var(--text-secondary);
  font-size: 18px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.panel-close:hover {
  background: var(--accent-subtle);
  color: var(--accent);
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

/* Templates */
.template-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-subtle);
}

.category-tab {
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 9999px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.category-tab:hover {
  border-color: var(--accent-border);
  color: var(--text-primary);
}

.category-tab.active {
  background: var(--accent-subtle);
  border-color: var(--accent);
  color: var(--accent);
}

.template-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.template-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
}

.template-item:hover {
  border-color: var(--accent-border);
  box-shadow: 0 0 12px var(--accent-subtle);
}

.template-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.template-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.template-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.template-desc {
  font-size: 12px;
  color: var(--text-muted);
}

/* History */
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  display: block;
}

.empty-state p {
  margin: 0 0 8px;
}

.empty-hint {
  font-size: 12px;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.history-item {
  padding: 12px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  transition: all var(--transition-fast);
}

.history-item:hover {
  border-color: var(--accent-border);
}

.history-main {
  cursor: pointer;
  margin-bottom: 8px;
}

.history-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.history-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-subtle);
  padding: 2px 8px;
  border-radius: 4px;
}

.history-time {
  font-size: 11px;
  color: var(--text-muted);
}

.history-query {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-secondary);
  display: block;
  word-break: break-all;
}

.history-actions {
  display: flex;
  gap: 4px;
  padding-top: 8px;
  border-top: 1px solid var(--border-subtle);
}

.history-action {
  padding: 6px 8px;
  font-size: 14px;
  border: none;
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.history-action:hover {
  background: var(--accent-subtle);
}

.history-action.danger:hover {
  background: color-mix(in srgb, var(--danger) 15%, transparent);
}

.label-editor {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-subtle);
}

.label-editor .input {
  flex: 1;
  padding: 8px 12px;
  font-size: 13px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  max-width: 400px;
  width: 100%;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-subtle);
}

.modal-header h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: var(--bg-elevated);
  color: var(--text-secondary);
  font-size: 20px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.modal-close:hover {
  background: var(--accent-subtle);
  color: var(--accent);
}

.modal-body {
  padding: 20px;
}

.shortcuts-grid {
  display: grid;
  gap: 12px;
}

.shortcut {
  display: flex;
  align-items: center;
  gap: 12px;
}

.shortcut kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 28px;
  padding: 0 8px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
}

.shortcut span {
  font-size: 13px;
  color: var(--text-secondary);
}

/* Input */
.input {
  width: 100%;
  background: var(--bg-input);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  color: var(--text-primary);
  font-size: 14px;
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-subtle);
  outline: none;
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Responsive */
@media (max-width: 768px) {
  .builder-header {
    flex-direction: column;
    align-items: stretch;
  }

  .builder-actions {
    justify-content: center;
  }

  .panel {
    width: 100%;
  }
}
</style>
