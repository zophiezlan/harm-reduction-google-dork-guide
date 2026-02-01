<!-- docs/.vitepress/theme/Layout.vue -->
<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import NavThemeSwitcher from "./components/NavThemeSwitcher.vue";
import DorkCodeEnhancer from "./components/DorkCodeEnhancer.vue";
import DorkSyntaxHighlighter from "./components/DorkSyntaxHighlighter.vue";
import OnboardingTutorial from "./components/OnboardingTutorial.vue";

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
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
