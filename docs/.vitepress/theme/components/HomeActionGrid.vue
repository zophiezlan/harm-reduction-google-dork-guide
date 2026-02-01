<script setup lang="ts">
import { useRouter } from 'vitepress';

const router = useRouter();

const links = [
  { text: '📖 Guide', link: '/README', theme: 'primary' },
  { text: '🔍 Explorer', link: '/explorer', theme: 'brand' },
  { text: '📦 Packs', link: '/dork-packs/README', theme: 'alt' },
  { text: '🎓 Modes', link: '/modes/beginner', theme: 'alt' },
  { text: '📝 Templates', link: '/templates/README', theme: 'alt' },
];

function navigate(link: string) {
  router.go(link);
}
</script>

<template>
  <div class="quick-links-container">
    <div class="quick-links-grid">
      <button
        v-for="item in links"
        :key="item.link"
        class="quick-link-btn"
        :class="item.theme"
        @click="navigate(item.link)"
      >
        {{ item.text }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.quick-links-container {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  width: 100%;
}

.quick-links-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  max-width: 800px;
}

.quick-link-btn {
  appearance: none;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  background-color: rgba(var(--vp-c-bg-soft-rgb), 0.6); 
  color: var(--vp-c-text-1);
  text-align: center;
  min-width: 100px;
}

.quick-link-btn:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft);
}

.quick-link-btn.brand {
  border-color: var(--vp-c-brand);
  background-color: rgba(var(--vp-c-brand-rgb), 0.1);
  color: var(--vp-c-brand);
}

.quick-link-btn.primary {
    border-color: var(--vp-c-brand-light);
}
</style>
