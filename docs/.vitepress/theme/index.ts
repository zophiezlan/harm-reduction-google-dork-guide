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
import { useSettings } from "./composables/useSettings";
import { useFavorites } from "./composables/useFavorites";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }: { app: any }) {
    app.component("ThemeSwitcher", ThemeSwitcher);
    app.component("NavThemeSwitcher", NavThemeSwitcher);
    app.component("Toast", Toast);
    app.component("DorkExplorer", DorkExplorer);
    app.component("DorkCard", DorkCard);
    app.component("DorkBuilder", DorkBuilder);
    app.component("SettingsPanel", SettingsPanel);
  },
  setup() {
    onMounted(() => {
      const { initialize: initSettings } = useSettings();
      const { initialize: initFavorites } = useFavorites();
      initSettings();
      initFavorites();
    });
  },
};
