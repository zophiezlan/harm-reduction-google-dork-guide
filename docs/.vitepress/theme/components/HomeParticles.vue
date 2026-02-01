<script setup lang="ts">
import { useData } from 'vitepress';
import { computed } from 'vue';

const { isDark } = useData();

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
      value: isDark.value ? "#ffffff" : "#3eaf7c"
    },
    links: {
      color: isDark.value ? "#ffffff" : "#3eaf7c",
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
      :options="particlesOptions"
    />
  </ClientOnly>
</template>
