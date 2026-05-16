import { useAuthStore } from "@/stores/auth";
import { useTabStore } from "@/stores/tab";

export function setupGuards(router) {
  router.beforeEach((to) => {
    const authStore = useAuthStore();
    const isLoggedIn = authStore.isLoggedIn;

    if (to.meta.guest && isLoggedIn) {
      return { name: "dashboard" };
    }

    if (!to.meta.guest && !isLoggedIn) {
      return { name: "login", query: { redirect: to.fullPath } };
    }

    if (to.meta.permission && isLoggedIn) {
      const permissions = new Set((authStore.user?.permissions ?? []).map((p) => p.name));
      if (!permissions.has(to.meta.permission)) {
        return { name: "dashboard" };
      }
    }
  });

  router.afterEach((to) => {
    const tabStore = useTabStore();
    const crumbs = to.meta?.breadcrumbs;
    if (crumbs) {
      tabStore.breadcrumbs = crumbs.map((c) => ({
        ...c,
        title: typeof c.title === "function" ? c.title() : c.title,
      }));
    } else {
      tabStore.breadcrumbs = [];
    }
  });

  router.beforeEach(() => {
    const tabStore = useTabStore();
    tabStore.routerBusy = true;
  });

  router.afterEach(() => {
    const tabStore = useTabStore();
    tabStore.routerBusy = false;
  });
}
