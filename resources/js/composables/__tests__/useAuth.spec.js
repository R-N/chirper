// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { createPinia, setActivePinia } from "pinia";

// useAuth pulls page props through useBase; stub it so we drive user/token.
const pageUser = ref(null);
const pageToken = ref(null);
vi.mock("@/composables/useBase", () => ({
  useBase: () => ({
    appStore: {},
    tabStore: {},
    serverReachable: ref(true),
    settings: ref({}),
    user: pageUser,
    auth_token: pageToken,
    visit: vi.fn(),
  }),
}));

import { useAuth } from "@/composables/useAuth";

const login = (overrides = {}) => {
  pageToken.value = "tok";
  pageUser.value = {
    name: "Bob",
    roles: [{ name: "admin" }, { name: "chirper" }],
    permissions: [{ name: "user.view" }, { name: "role.view" }],
    ...overrides,
  };
};

describe("useAuth", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    pageUser.value = null;
    pageToken.value = null;
  });

  it("reports empty roles/permissions when logged out", () => {
    const a = useAuth();
    expect(a.isLoggedIn.value).toBe(false);
    expect(a.userRoles.value).toEqual([]);
    expect(a.userPermissions.value).toEqual([]);
    expect(a.hasPermission("user.view")).toBe(false);
    expect(a.userName.value).toBe("");
  });

  it("exposes roles, permission set, and labels when logged in", () => {
    login();
    const a = useAuth();
    expect(a.isLoggedIn.value).toBe(true);
    expect(a.userName.value).toBe("Bob");
    expect([...a.userPermissionNames.value]).toEqual(["user.view", "role.view"]);
    expect(a.userRolesText.value).toBe("admin, chirper");
  });

  it("hasPermission checks a single permission", () => {
    login();
    const a = useAuth();
    expect(a.hasPermission("user.view")).toBe(true);
    expect(a.hasPermission("backup.manage")).toBe(false);
  });

  it("hasAnyPermission is true if any is held", () => {
    login();
    const a = useAuth();
    expect(a.hasAnyPermission(["backup.manage", "role.view"])).toBe(true);
    expect(a.hasAnyPermission(["backup.manage", "setting.edit"])).toBe(false);
  });

  it("tolerates a user without roles/permissions arrays", () => {
    pageToken.value = "tok";
    pageUser.value = { name: "Eve" };
    const a = useAuth();
    expect(a.userRoles.value).toEqual([]);
    expect(a.userPermissions.value).toEqual([]);
    expect(a.hasPermission("anything")).toBe(false);
  });
});
