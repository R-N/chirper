import "./bootstrap";

import axios from "@/plugins/axios";
import { createI18n } from "@/plugins/i18n";

import { createInertiaApp, router } from "@inertiajs/vue3";
import { useTabStore } from "@/stores/tab";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createApp, h } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import localizedFormat from "dayjs/plugin/localizedFormat";
import vuetify from "./plugins/vuetify";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
//import 'vue3-dropzone/dist/vue3Dropzone.min.css';
import App from "./App.vue";
import "../css/app.css";
import authService from "@/modules/user/auth/services/auth";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(localizedFormat);

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./modules/${name}.vue`,
      import.meta.glob("./modules/\*\*/pages/\*.vue")
    ),
  async setup({ el, App: InertiaApp, props, plugin }) {
    await axios.init();
    let app = createApp({ render: () => h(App, { InertiaApp, props }) });
    //app.config.devtools = true;
    const pinia = createPinia().use(piniaPersist);
    app = app
      .use(plugin)
      .use(ZiggyVue)
      .use(pinia)
      .use(vuetify)
      .use(await createI18n());
    router.on("before", () => {
      let tabStore = useTabStore();
      tabStore.breadcrumbs = [];
    });
    app.config.errorHandler = (e, vm, info) => {
      if (e?.message?.toLowerCase().includes("csrf")) {
        authService.getCsrfToken();
      }
      if (e?.show || e?.response?.data?.show) {
        let tabStore = useTabStore();
        tabStore.showError(e?.response?.data ?? e);
        return true;
      }
      console.error(e);
      return false;
    };
    return app.mount(el);
  },
  progress: {
    color: "#4B5563"
  }
});
