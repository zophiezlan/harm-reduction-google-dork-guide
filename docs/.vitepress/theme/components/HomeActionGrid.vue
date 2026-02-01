<script setup lang="ts">
import { useRouter } from 'vitepress';

const router = useRouter();

const links = [
  { text: '📖 Jump into the Guide', link: '/README', theme: 'primary' },
  { text: '🔍 Open Dork Explorer', link: '/explorer', theme: 'brand' },
  { text: '📦 Browse Dork Packs', link: '/dork-packs/README', theme: 'alt' },
  { text: '🎓 Start a Mode', link: '/modes/beginner', theme: 'alt' },
  { text: '📝 Templates', link: '/templates/README', theme: 'alt' },
];

function navigate(link: string) {
  router.go(link);
}
</script>

<template>
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
</template>

<style scoped>
.quick-links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.quick-link-btn {
  appearance: none;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  /* Make background slightly transparent for particles */
  background-color: rgba(var(--vp-c-bg-soft-rgb), 0.8); 
  color: var(--vp-c-text-1);
  text-align: center;
}

.quick-link-btn:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
