import { computed } from "vue";
import { useAppStore } from "@/stores/app";
import { useTabStore } from "@/stores/tab";
import { router, usePage } from "@inertiajs/vue3";

export function useBase() {
  const appStore = useAppStore();
  const tabStore = useTabStore();

  const serverReachable = computed(() => appStore.serverReachable);
  const settings = computed(() => usePage().props?.settings);
  const user = computed(() => usePage().props?.user);
  const auth_token = computed(() => usePage().props?.auth_token);

  function visit(target) {
    router.visit(target);
  }

  // Sync page props to appStore (was created() in BaseMixin)
  if (settings.value) {
    appStore.settings = settings.value;
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
