<script setup lang="ts">
import { useRouter } from "vitepress";

const router = useRouter();

function goToSettings() {
  router.go('/settings');
}
</script>

<template>
  <div class="nav-controls">
    <!-- Settings Button -->
    <button
      class="nav-btn settings-btn"
      @click="goToSettings"
      title="Open Settings"
      aria-label="Settings"
    >
      <span class="icon">⚙️</span>
    </button>
  </div>
</template>

<style scoped>
.nav-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 150ms ease;
  color: var(--vp-c-text-2);
}

.nav-btn:hover {
  border-color: var(--accent);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.icon {
  font-size: 16px;
  line-height: 1;
}

</style>
