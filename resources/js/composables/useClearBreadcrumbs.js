import { useTabStore } from "@/stores/tab";
import { IS_SPA_MODE } from "@/plugins/inertia";

export function useClearBreadcrumbs() {
  const tabStore = useTabStore();

  function clearBreadcrumbs() {
    tabStore.breadcrumbs = [];
  }

  // In SPA mode, route guards manage breadcrumbs — skip auto-clear
  if (!IS_SPA_MODE) {
    clearBreadcrumbs();
  }

  return { tabStore, clearBreadcrumbs };
}
