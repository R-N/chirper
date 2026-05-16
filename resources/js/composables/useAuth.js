import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useBase } from "./useBase";

export function useAuth() {
  const { appStore, tabStore, serverReachable, settings, user: pageUser, auth_token: pageAuthToken, visit } = useBase();
  const authStore = useAuthStore();

  // Sync page props to authStore (Inertia mode)
  if (pageUser.value) {
    authStore.updateUser(pageUser.value);
  }
  if (pageAuthToken.value) {
    authStore.auth_token = pageAuthToken.value;
  }

  const isLoggedIn = computed(() => authStore.isLoggedIn);
  const auth_token = computed(() => authStore.auth_token ?? pageAuthToken.value);
  const user = computed(() => authStore.user ?? pageUser.value);

  const userRoles = computed(() => {
    if (isLoggedIn.value && user.value) {
      return user.value.roles ?? [];
    }
    return [];
  });

  const userPermissions = computed(() => {
    if (isLoggedIn.value && user.value) {
      return user.value.permissions ?? [];
    }
    return [];
  });

  const userPermissionNames = computed(() => new Set(userPermissions.value.map((p) => p.name)));

  function hasPermission(permission) {
    return userPermissionNames.value.has(permission);
  }

  function hasAnyPermission(permissions) {
    return permissions.some((p) => userPermissionNames.value.has(p));
  }

  const userRolesText = computed(() =>
    userRoles.value.map((r) => r.name).join(", ")
  );

  const userName = computed(() => {
    if (isLoggedIn.value && user.value) return user.value.name;
    return "";
  });

  return {
    appStore,
    tabStore,
    serverReachable,
    settings,
    visit,
    authStore,
    isLoggedIn,
    auth_token,
    user,
    userRoles,
    userPermissions,
    userPermissionNames,
    hasPermission,
    hasAnyPermission,
    userRolesText,
    userName,
  };
}
