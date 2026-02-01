<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useSettings } from "../composables/useSettings";

const { settings } = useSettings();

const systemDark = ref(false);
let mediaQuery: MediaQueryList | null = null;
let mediaListener: ((e: MediaQueryListEvent) => void) | null = null;
const accent = ref("#3eaf7c");

const isDark = computed(() => {
  if (settings.theme.mode === "system") return systemDark.value;
  return settings.theme.mode === "dark";
});

function syncAccent() {
  if (typeof window === "undefined") return;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent")
    .trim();
  if (value) accent.value = value;
}

onMounted(() => {
  if (typeof window === "undefined") return;
  mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  systemDark.value = mediaQuery.matches;
  mediaListener = (e) => {
    systemDark.value = e.matches;
  };
  mediaQuery.addEventListener("change", mediaListener);
  syncAccent();
});

onUnmounted(() => {
  if (!mediaQuery || !mediaListener) return;
  mediaQuery.removeEventListener("change", mediaListener);
});

watch(
  () => [settings.theme.color, settings.theme.mode, systemDark.value],
  () => {
    syncAccent();
  }
);

const particleColor = computed(() => (isDark.value ? "#ffffff" : accent.value));

const particlesOptions = computed(() => ({
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  background: {
    color: {
      value: "transparent"
    }
  },
  particles: {
    color: {
      value: particleColor.value
    },
    stroke: {
      width: 1,
      color: particleColor.value
    },
    links: {
      color: particleColor.value,
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: "none",
      random: false,
      straight: false,
      outModes: {
        default: "bounce"
      }
    },
    number: {
      density: {
        enable: true,
      },
      value: 60
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: "circle"
    },
    size: {
      value: { min: 1, max: 3 }
    }
  },
  detectRetina: true
}));
</script>

<template>
  <ClientOnly>
    <vue-particles
      id="tsparticles"
      :key="`${isDark ? 'dark' : 'light'}-${accent}`"
      :options="particlesOptions"
    />
  </ClientOnly>
</template>
