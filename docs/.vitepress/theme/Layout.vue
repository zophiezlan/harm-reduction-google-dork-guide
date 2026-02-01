<!-- docs/.vitepress/theme/Layout.vue -->
<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import NavThemeSwitcher from "./components/NavThemeSwitcher.vue";
import DorkCodeEnhancer from "./components/DorkCodeEnhancer.vue";
import DorkSyntaxHighlighter from "./components/DorkSyntaxHighlighter.vue";
import OnboardingTutorial from "./components/OnboardingTutorial.vue";
import HomeParticles from "./components/HomeParticles.vue";
import HomeActionGrid from "./components/HomeActionGrid.vue";

const { Layout } = DefaultTheme;
const { frontmatter } = useData();
</script>

<template>
  <Layout>
    <template #layout-top>
      <HomeParticles v-if="frontmatter.layout === 'home'" />
    </template>
    <template #home-hero-info-after>
      <HomeActionGrid />
    </template>
    <template #nav-bar-content-after>
      <NavThemeSwitcher />
    </template>
    <template #doc-after>
      <DorkCodeEnhancer />
      <DorkSyntaxHighlighter />
    </template>
    <template #layout-bottom>
      <OnboardingTutorial />
    </template>
  </Layout>
</template>
