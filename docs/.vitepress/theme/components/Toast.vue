<script setup lang="ts">
import { useToast } from "../composables/useToast";

const { toasts, dismiss } = useToast();

const icons = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};
</script>

<template>
  <Teleport to="body">
    <div class="toast-container" role="status" aria-live="polite" aria-atomic="false">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['toast', toast.type]"
          @click="dismiss(toast.id)"
          role="alert"
        >
          <span class="toast-icon" aria-hidden="true">{{ icons[toast.type] }}</span>
          <span class="toast-message">{{ toast.message }}</span>
          <button
            class="toast-dismiss"
            @click.stop="dismiss(toast.id)"
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 9999;
}

.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  min-width: 200px;
}

.toast.success {
  border-left: 3px solid var(--success);
}

.toast.success .toast-icon {
  color: var(--success);
}

.toast.error {
  border-left: 3px solid var(--danger);
}

.toast.error .toast-icon {
  color: var(--danger);
}

.toast.info {
  border-left: 3px solid var(--info);
}

.toast.info .toast-icon {
  color: var(--info);
}

.toast-icon {
  font-size: 16px;
  font-weight: 600;
}

.toast-message {
  font-size: 14px;
  color: var(--text-primary);
  flex: 1;
}

.toast-dismiss {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: var(--radius-sm, 4px);
  transition: all 0.15s ease;
  padding: 0;
  line-height: 1;
}

.toast-dismiss:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.1);
}

/* Transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
