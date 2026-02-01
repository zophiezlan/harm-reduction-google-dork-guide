<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    target?: string;
    label?: string;
  }>(),
  {
    target: "#main-content",
    label: "Skip to main content",
  }
);
</script>

<template>
  <a :href="target" class="skip-link">
    {{ label }}
  </a>
</template>

<style scoped>
.skip-link {
  position: fixed;
  top: -100%;
  left: 16px;
  z-index: 9999;
  padding: 12px 24px;
  background: var(--accent);
  color: white;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: 16px;
  outline: 2px solid white;
  outline-offset: 2px;
}
</style>
