<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useDorkData } from "../composables/useDorkData";

const { allDorks, loadDorks, isLoaded } = useDorkData();

onMounted(() => {
  loadDorks();
});

const count = computed(() => allDorks.value.length);
const formatted = computed(() => {
  if (!count.value) return "—";
  return new Intl.NumberFormat().format(count.value);
});
</script>

<template>
  <span class="dork-count" :aria-busy="!isLoaded">{{ formatted }}</span>
</template>

<style scoped>
.dork-count {
  font-variant-numeric: tabular-nums;
}
</style>
