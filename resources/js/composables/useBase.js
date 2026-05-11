import { computed } from "vue";
import { useAppStore } from "@/stores/app";
import { useTabStore } from "@/stores/tab";
import { router, usePage, IS_SPA_MODE } from "@/plugins/inertia";
import { useAuthStore } from "@/stores/auth";

export function useBase() {
  const appStore = useAppStore();
  const tabStore = useTabStore();

  const serverReachable = computed(() => appStore.serverReachable);

  const settings = computed(() => {
    if (IS_SPA_MODE) return appStore.settings;
    return usePage().props?.settings;
  });

  const user = computed(() => {
    if (IS_SPA_MODE) {
      const authStore = useAuthStore();
      return authStore.user;
    }
    return usePage().props?.user;
  });

  const auth_token = computed(() => {
    if (IS_SPA_MODE) {
      const authStore = useAuthStore();
      return authStore.auth_token;
    }
    return usePage().props?.auth_token;
  });

  function visit(target) {
    router.visit(target);
  }

  // Sync page props to appStore
  if (!IS_SPA_MODE) {
    if (settings.value) {
      appStore.settings = settings.value;
    }
  }

  return {
    appStore,
    tabStore,
    serverReachable,
    settings,
    user,
    auth_token,
    visit,
  };
}
