<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const modalRef = ref<HTMLElement | null>(null);
const previousActiveElement = ref<HTMLElement | null>(null);

// Focus trapping
function handleKeydown(e: KeyboardEvent) {
  if (!props.show) return;

  if (e.key === "Escape") {
    emit("close");
    return;
  }

  if (e.key === "Tab" && modalRef.value) {
    const focusableElements = modalRef.value.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement?.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement?.focus();
    }
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
  if (props.show) {
    previousActiveElement.value = document.activeElement as HTMLElement;
  }
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});

// Focus management when modal opens/closes
function onAfterEnter() {
  previousActiveElement.value = document.activeElement as HTMLElement;
  const closeBtn = modalRef.value?.querySelector<HTMLElement>(".modal-close");
  closeBtn?.focus();
}

function onAfterLeave() {
  previousActiveElement.value?.focus();
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal" @after-enter="onAfterEnter" @after-leave="onAfterLeave">
      <div v-if="show" class="modal-overlay" @click.self="emit('close')" role="presentation">
        <div
          ref="modalRef"
          class="modal shortcuts-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcuts-title"
        >
          <div class="modal-header">
            <h2 id="shortcuts-title"><span aria-hidden="true">⌨️</span> Keyboard Shortcuts</h2>
            <button
              class="modal-close"
              @click="emit('close')"
              aria-label="Close keyboard shortcuts"
            >
              ×
            </button>
          </div>
          <div class="modal-body">
            <div class="shortcuts-grid">
              <div class="shortcut">
                <kbd>/</kbd>
                <span>Focus search</span>
              </div>
              <div class="shortcut">
                <kbd>Esc</kbd>
                <span>Clear / Close</span>
              </div>
              <div class="shortcut">
                <kbd>?</kbd>
                <span>Show shortcuts</span>
              </div>
              <div class="shortcut">
                <kbd>R</kbd>
                <span>Random dork</span>
              </div>
              <div class="shortcut">
                <kbd>G</kbd>
                <span>Grid view</span>
              </div>
              <div class="shortcut">
                <kbd>L</kbd>
                <span>List view</span>
              </div>
              <div class="shortcut">
                <kbd>C</kbd>
                <span>Clear filters</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
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
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
  display: flex;
  align-items: center;
  gap: 8px;
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

.modal-close:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.modal-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
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

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: scale(0.95);
}

@media (max-width: 480px) {
  .modal {
    max-width: 100%;
    margin: 10px;
  }
}
</style>
