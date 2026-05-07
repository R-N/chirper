import { useTabStore } from "@/stores/tab";

export function useClearBreadcrumbs() {
  const tabStore = useTabStore();

  function clearBreadcrumbs() {
    tabStore.breadcrumbs = [];
  }

  // Clear immediately (matches created() timing in mixin)
  clearBreadcrumbs();

  return { tabStore, clearBreadcrumbs };
}
