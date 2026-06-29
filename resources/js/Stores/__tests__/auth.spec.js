// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useAuthStore } from "@/stores/auth";

describe("authStore", () => {
  beforeEach(() => setActivePinia(createPinia()));

  it("starts logged out with an empty user", () => {
    const s = useAuthStore();
    expect(s.isLoggedIn).toBe(false);
    expect(s.isAuthenticated).toBe(false);
    expect(s.user.id).toBe(0);
    expect(s.user.roles).toEqual([]);
  });

  it("isLoggedIn flips once a token is set", () => {
    const s = useAuthStore();
    s.auth_token = "tok";
    expect(s.isLoggedIn).toBe(true);
    expect(s.isAuthenticated).toBe(true);
  });

  it("updateUser merges without dropping unspecified fields", () => {
    const s = useAuthStore();
    s.updateUser({ id: 7, name: "Bob", permissions: [{ name: "chirp.create" }] });
    expect(s.user.id).toBe(7);
    expect(s.user.name).toBe("Bob");
    expect(s.user.permissions).toEqual([{ name: "chirp.create" }]);
    // untouched default preserved
    expect(s.user.locale).toBe("en");
  });

  it("logout clears token and resets the user", () => {
    const s = useAuthStore();
    s.auth_token = "tok";
    s.updateUser({ id: 7, name: "Bob", roles: [{ name: "admin" }] });
    s.logout();
    expect(s.auth_token).toBeNull();
    expect(s.isLoggedIn).toBe(false);
    expect(s.user.id).toBe(0);
    expect(s.user.name).toBe("");
    expect(s.user.roles).toEqual([]);
  });
});
