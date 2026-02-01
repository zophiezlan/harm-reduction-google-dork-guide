<script setup lang="ts">
import { useRouter } from 'vitepress';

const router = useRouter();

const packs = [
  { title: 'Novel Substances', desc: 'Nitazenes, xylazine, and emerging trends.', link: '/dork-packs/novel-substances', icon: '🧪' },
  { title: 'Drug Alerts', desc: 'Government warnings & public health alerts.', link: '/dork-packs/drug-alerts', icon: '🚨' },
  { title: 'Community', desc: 'Reddit, forums, and peer discussions.', link: '/dork-packs/forum-community', icon: '💬' },
  { title: 'Coroners Reports', desc: 'Death data & inquest findings.', link: '/dork-packs/coroners-deaths', icon: '⚖️' },
  { title: 'User Domains', desc: 'Grassroots content on Notion, Medium, etc.', link: '/dork-packs/user-hosted-domains', icon: '🌐' },
  { title: 'Peer Knowledge', desc: 'Lived experience stories & resources.', link: '/dork-packs/peer-knowledge', icon: '👥' },
];

function navigate(link: string) {
  router.go(link);
}
</script>

<template>
  <div class="dork-packs-showcase">
    <h2>Featured Dork Packs</h2>
    <div class="packs-grid">
      <div
        v-for="pack in packs"
        :key="pack.link"
        class="pack-card"
        @click="navigate(pack.link)"
      >
        <div class="pack-icon">{{ pack.icon }}</div>
        <div class="pack-content">
          <h3>{{ pack.title }}</h3>
          <p>{{ pack.desc }}</p>
        </div>
      </div>
    </div>
    <div class="view-all">
        <a href="/dork-packs/README">View All Dork Packs →</a>
    </div>
  </div>
</template>

<style scoped>
.dork-packs-showcase {
  margin: 4rem 0;
  text-align: center;
}

.dork-packs-showcase h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  border: none;
}

.packs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;
}

.pack-card {
  display: flex;
  align-items: flex-start;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  /* Glass effect */
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
}

.pack-card:hover {
  transform: translateY(-5px);
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft);
}

.pack-icon {
  font-size: 2rem;
  margin-right: 1rem;
  line-height: 1;
}

.pack-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.pack-content p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.view-all {
    margin-top: 2rem;
}

.view-all a {
    color: var(--vp-c-brand);
    font-weight: 600;
    text-decoration: none;
}

.view-all a:hover {
    text-decoration: underline;
}
</style>
