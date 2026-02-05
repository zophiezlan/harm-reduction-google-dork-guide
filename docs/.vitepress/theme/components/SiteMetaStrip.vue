<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useData } from "vitepress";
import { useDorkData } from "../composables/useDorkData";

const { page } = useData();
const { dorkPacks, loadDorks } = useDorkData();

onMounted(() => {
  loadDorks();
});

const packCount = computed(() => dorkPacks.value.length);

const lastUpdated = computed(() => {
  const ts = page.value.lastUpdated;
  if (!ts) return "";
  const isMs = ts > 1_000_000_000_000;
  const date = new Date(isMs ? ts : ts * 1000);
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
});

const buildDate = computed(() => {
  const metaDate = typeof window !== "undefined" ? window.DORK_META?.buildDate || "" : "";
  const rawDate = typeof __BUILD_DATE__ === "undefined" ? metaDate : __BUILD_DATE__;
  if (!rawDate) return "";
  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
});

const appVersion = computed(() => {
  if (typeof __APP_VERSION__ !== "undefined") return __APP_VERSION__;
  if (typeof window !== "undefined" && window.DORK_META?.version) return window.DORK_META.version;
  return "";
});
</script>

<template>
  <div class="site-meta-strip">
    <div class="meta-pill">
      <span class="meta-label">Dorks</span>
      <span class="meta-value"><DorkCount /></span>
    </div>
    <div class="meta-pill">
      <span class="meta-label">Packs</span>
      <span class="meta-value">{{ packCount || "—" }}</span>
    </div>
    <div class="meta-pill">
      <span class="meta-label">Version</span>
      <span class="meta-value">{{ appVersion || "—" }}</span>
    </div>
    <div class="meta-pill" v-if="lastUpdated || buildDate">
      <span class="meta-label">{{ lastUpdated ? "Updated" : "Built" }}</span>
      <span class="meta-value">{{ lastUpdated || buildDate }}</span>
    </div>
  </div>
</template>

<style scoped>
.site-meta-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 18px;
}

.meta-pill {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--border-subtle) 70%, transparent);
  background: color-mix(in srgb, var(--bg-surface) 70%, transparent);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
}

.meta-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.meta-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}
</style>
