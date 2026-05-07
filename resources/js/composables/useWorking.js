import { ref, computed } from "vue";
import { useAuth } from "./useAuth";
import { checkCsrfError } from "@/libs/util";
import authService from "@/modules/user/auth/services/auth";

export function useWorking(props = {}) {
  const {
    appStore, tabStore, serverReachable, settings, visit,
    authStore, isLoggedIn, auth_token, user, userRoles, userRolesText, userName,
  } = useAuth();

  const selfBusy = ref(false);

  const busy = computed(() => {
    return (
      selfBusy.value ||
      props.parentBusy ||
      tabStore.routerBusy ||
      tabStore.tabBusy ||
      appStore.authBusy ||
      appStore.globalBusy
    );
  });

  function releaseBusy() {
    selfBusy.value = false;
  }

  const globalBusy = computed({
    get: () => appStore.globalBusy,
    set: (v) => { appStore.globalBusy = v; },
  });

  const authBusy = computed({
    get: () => appStore.authBusy,
    set: (v) => { appStore.authBusy = v; },
  });

  const tabBusy = computed({
    get: () => tabStore.tabBusy,
    set: (v) => { tabStore.tabBusy = v; },
  });

  function showError(error) {
    tabStore.showError(error);
  }

  async function waitBusy(f, busyRef = null, releaseBusyFlag = true) {
    const target = busyRef || selfBusy;
    target.value = true;
    try {
      return await f();
    } catch (e) {
      if (checkCsrfError(e)) {
        await authService.getCsrfToken();
      } else {
        throw e;
      }
    } finally {
      if (releaseBusyFlag) target.value = false;
    }
  }

  return {
    appStore, tabStore, serverReachable, settings, visit,
    authStore, isLoggedIn, auth_token, user, userRoles, userRolesText, userName,
    selfBusy,
    busy,
    releaseBusy,
    globalBusy,
    authBusy,
    tabBusy,
    showError,
    waitBusy,
  };
}
