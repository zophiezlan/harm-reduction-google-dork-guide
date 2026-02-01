// docs/.vitepress/theme/index.ts
import DefaultTheme from "vitepress/theme";
import { onMounted } from "vue";
import type { Theme } from "vitepress";
import "./styles/vars.css";
import "./styles/base.css";
import "./styles/components.css";
import Layout from "./Layout.vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";
import NavThemeSwitcher from "./components/NavThemeSwitcher.vue";
import Toast from "./components/Toast.vue";
import DorkExplorer from "./components/explorer/DorkExplorer.vue";
import DorkCard from "./components/explorer/DorkCard.vue";
import DorkBuilder from "./components/builder/DorkBuilder.vue";
import SettingsPanel from "./components/settings/SettingsPanel.vue";
import HomeActionGrid from "./components/HomeActionGrid.vue";
import HomeDorkPacks from "./components/HomeDorkPacks.vue";
import DorkCount from "./components/DorkCount.vue";
import SiteMetaStrip from "./components/SiteMetaStrip.vue";
import { useSettings } from "./composables/useSettings";
import { useFavorites } from "./composables/useFavorites";
import { useQueryHistory } from "./composables/useQueryHistory";

export default {
  extends: DefaultTheme,
  Layout,
  async enhanceApp({ app }: { app: any }) {
    if (!import.meta.env.SSR) {
      const Particles = await import("@tsparticles/vue3");
      const { loadSlim } = await import("@tsparticles/slim");
      app.use(Particles.default, {
        init: async (engine: any) => {
          await loadSlim(engine);
        },
      });
    }
    app.component("ThemeSwitcher", ThemeSwitcher);
    app.component("NavThemeSwitcher", NavThemeSwitcher);
    app.component("Toast", Toast);
    app.component("DorkExplorer", DorkExplorer);
    app.component("DorkCard", DorkCard);
    app.component("DorkBuilder", DorkBuilder);
    app.component("SettingsPanel", SettingsPanel);
    app.component("HomeActionGrid", HomeActionGrid);
    app.component("HomeDorkPacks", HomeDorkPacks);
    app.component("DorkCount", DorkCount);
    app.component("SiteMetaStrip", SiteMetaStrip);
  },
  setup() {
    onMounted(() => {
      const { initialize: initSettings } = useSettings();
      const { initialize: initFavorites } = useFavorites();
      const { initialize: initHistory } = useQueryHistory();
      initSettings();
      initFavorites();
      initHistory();
    });
  },
};
