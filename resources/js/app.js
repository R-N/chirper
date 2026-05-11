import "./bootstrap";

import axios from "@/plugins/axios";
import { createI18n } from "@/plugins/i18n";

import { createInertiaApp, router } from "@inertiajs/vue3";
import { useTabStore } from "@/stores/tab";
import { createBusy } from "@/composables/useBusy";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createApp, h, reactive } from "vue";
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
import App from "./App.vue";
import "../css/app.css";
import authService from "@/modules/user/auth/services/auth";
import { checkCsrfError } from "@/libs/util";
import { IS_SPA_MODE, vueRouter, getPageProps } from "@/plugins/inertia";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(localizedFormat);

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

function setupErrorHandlers(app) {
  function handleError(e) {
    if (checkCsrfError(e)) {
      authService.getCsrfToken();
      return true;
    }
    if (e?.show || e?.response?.data?.show) {
      let tabStore = useTabStore();
      tabStore.showError(e?.response?.data ?? e);
      return true;
    }
    console.error(e);
    return false;
  }

  app.config.errorHandler = (e, vm, info) => {
    return handleError(e);
  };

  window.addEventListener("unhandledrejection", (event) => {
    if (handleError(event.reason)) {
      event.preventDefault();
    }
  });

  app.config.warnHandler = (msg, instance, trace) => {
    if (msg.includes('Data property "client" is already defined in Props')) {
      return;
    } else if (
      msg.includes('Data property "nameField" is already defined in Props')
    ) {
      return;
    } else if (
      msg.includes('Invalid prop: type check failed for prop "rules"')
    ) {
      return;
    } else if (
      msg.includes('Invalid prop: type check failed for prop "modelValue"')
    ) {
      return;
    }
    console.warn(msg + trace);
  };
}

function createPlugins() {
  const pinia = createPinia().use(piniaPersist);
  const busy = createBusy();
  return { pinia, busy };
}

async function createPluginsAsync() {
  const i18n = await createI18n();
  return { i18n };
}

// ─── Inertia mode ───
if (!IS_SPA_MODE) {
  createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
      resolvePageComponent(
        `./modules/${name}.vue`,
        import.meta.glob("./modules/**/pages/*.vue", { eager: true })
      ),
    async setup({ el, App: InertiaApp, props, plugin }) {
      await axios.init();
      let app = createApp({ render: () => h(App, { InertiaApp, props }) });
      const { pinia, busy } = createPlugins();
      const { i18n } = await createPluginsAsync();
      app = app
        .use(plugin)
        .use(ZiggyVue)
        .use(pinia)
        .use(vuetify)
        .use(i18n);
      router.on("before", () => {
        let tabStore = useTabStore();
        tabStore.breadcrumbs = [];
      });
      router.on("start", () => {
        let tabStore = useTabStore();
        tabStore.routerBusy = true;
        busy.start();
      });
      router.on("finish", () => {
        let tabStore = useTabStore();
        tabStore.routerBusy = false;
        busy.end();
      });
      setupErrorHandlers(app);
      return app.mount(el);
    },
    progress: {
      color: "#4B5563",
    },
  });
}
// ─── SPA mode ───
else {
  (async () => {
    const { bootstrap } = await import("@/router/bootstrap");
    const AppSpa = (await import("@/AppSpa.vue")).default;

    const app = createApp(AppSpa);
    const { pinia } = createPlugins();

    // Install pinia FIRST — axios interceptors need stores
    app.use(pinia);

    await axios.init();

    const { i18n } = await createPluginsAsync();

    app.use(vuetify).use(i18n).use(ZiggyVue).use(vueRouter);

    // Provide $page global (Inertia plugin normally injects this)
    const $page = reactive({ props: getPageProps() });
    app.config.globalProperties.$page = $page;

    setupErrorHandlers(app);

    await bootstrap();

    app.mount("#app");
  })();
}
