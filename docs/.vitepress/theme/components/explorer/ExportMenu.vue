<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "export", format: "csv" | "json" | "markdown"): void;
}>();

const menuRef = ref<HTMLElement | null>(null);

function handleClickOutside(event: MouseEvent) {
  if (props.show && menuRef.value && !menuRef.value.contains(event.target as Node)) {
    emit("close");
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (props.show && event.key === "Escape") {
    emit("close");
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside, true);
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside, true);
  document.removeEventListener("keydown", handleKeydown);
});

function handleExport(format: "csv" | "json" | "markdown") {
  emit("export", format);
  emit("close");
}
</script>

<template>
  <div class="export-wrapper" ref="menuRef">
    <slot name="trigger"></slot>
    <Transition name="dropdown">
      <div v-if="show" class="export-menu" role="menu" aria-label="Export options">
        <button class="export-option" @click="handleExport('csv')" role="menuitem">
          <span aria-hidden="true">📊</span> Export to CSV
        </button>
        <button class="export-option" @click="handleExport('json')" role="menuitem">
          <span aria-hidden="true">📋</span> Export to JSON
        </button>
        <button class="export-option" @click="handleExport('markdown')" role="menuitem">
          <span aria-hidden="true">📝</span> Export to Markdown
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.export-wrapper {
  position: relative;
}

.export-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  padding: 8px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 50;
}

.export-option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  font-size: 13px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  text-align: left;
}

.export-option:hover {
  background: var(--accent-subtle);
  color: var(--accent);
}

.export-option:focus {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}

/* Transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
