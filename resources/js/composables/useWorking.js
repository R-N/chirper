import { ref } from "vue";
import { useAuth } from "./useAuth";
import { useBusy } from "./useBusy";
import { checkCsrfError } from "@/libs/util";
import authService from "@/modules/user/auth/services/auth";

export function useWorking(_props = {}) {
  const {
    appStore, tabStore, serverReachable, settings, visit,
    authStore, isLoggedIn, auth_token, user, userRoles, userRolesText, userName,
  } = useAuth();

  const busyState = useBusy();

  const selfBusy = ref(false);    // no-op, kept for backward compat
  const globalBusy = ref(false);  // no-op, kept for backward compat
  const authBusy = ref(false);    // no-op, kept for backward compat
  const tabBusy = ref(false);     // no-op, kept for backward compat

  function releaseBusy() {}       // no-op, kept for backward compat

  async function waitBusy(f, _busyRef = null, _releaseBusyFlag = true) {
    return await busyState.run(f);
  }

  function showError(error) {
    tabStore.showError(error);
  }

  return {
    appStore, tabStore, serverReachable, settings, visit,
    authStore, isLoggedIn, auth_token, user, userRoles, userRolesText, userName,
    busy: busyState.busy,
    selfBusy,
    releaseBusy,
    globalBusy,
    authBusy,
    tabBusy,
    showError,
    waitBusy,
  };
}
