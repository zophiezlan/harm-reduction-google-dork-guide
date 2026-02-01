<!-- docs/.vitepress/theme/Layout.vue -->
<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import { onMounted } from "vue";
import NavThemeSwitcher from "./components/NavThemeSwitcher.vue";
import DorkCodeEnhancer from "./components/DorkCodeEnhancer.vue";
import DorkSyntaxHighlighter from "./components/DorkSyntaxHighlighter.vue";
import OnboardingTutorial from "./components/OnboardingTutorial.vue";
import HomeParticles from "./components/HomeParticles.vue";
import HomeActionGrid from "./components/HomeActionGrid.vue";
import NavBarControls from "./components/NavBarControls.vue";
import SidebarCollapseToggle from "./components/SidebarCollapseToggle.vue";
import SiteMetaStrip from "./components/SiteMetaStrip.vue";
import SkipLink from "./components/SkipLink.vue";
import { useSidebar } from "./composables/useSidebar";

const { Layout } = DefaultTheme;
const { frontmatter } = useData();

// Initialize sidebar state (handles class injection)
useSidebar();

// Add id to VPContent for skip link accessibility
onMounted(() => {
  const vpContent = document.querySelector(".VPContent");
  if (vpContent && !vpContent.id) {
    vpContent.id = "VPContent";
  }
});
</script>

<template>
  <SkipLink target="#VPContent" label="Skip to main content" />
  <Layout>
    <template #layout-top>
      <HomeParticles v-if="frontmatter.layout === 'home'" />
    </template>
    <template #nav-bar-title-before>
      <SidebarCollapseToggle variant="navbar" />
    </template>
    <template #home-hero-info-after>
      <HomeActionGrid />
      <SiteMetaStrip />
    </template>
    <template #nav-bar-content-after>
      <div class="nav-extra-controls">
        <NavBarControls />
        <NavThemeSwitcher />
      </div>
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

<style scoped>
.nav-extra-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 12px;
}
</style>
