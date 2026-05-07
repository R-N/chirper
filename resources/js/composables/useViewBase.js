import { useWorking } from "./useWorking";
import { useClearBreadcrumbs } from "./useClearBreadcrumbs";

export function useViewBase(props = {}) {
  const working = useWorking(props);
  const { clearBreadcrumbs } = useClearBreadcrumbs();

  return {
    ...working,
    clearBreadcrumbs,
  };
}
