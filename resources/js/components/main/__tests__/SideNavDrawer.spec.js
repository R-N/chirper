// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";

// Controllable permission set for the mocked useAuth.
let perms = new Set();
vi.mock("@/composables/useAuth", () => ({
  useAuth: () => ({ hasPermission: (p) => perms.has(p) }),
}));
vi.mock("@/plugins/i18n", () => ({ t: (k) => k }));
vi.mock("@/plugins/inertia", () => ({ router: { visit: vi.fn() } }));

// Stub Vuetify component imports so we avoid pulling their .css and just
// render slots — enough to inspect which nav labels appear. Factory is
// hoisted, so the helper must be defined inline here.
vi.mock("vuetify/components", () => {
  const pt = (cls) => ({ template: `<div class="${cls}"><slot /></div>` });
  return {
    VNavigationDrawer: pt("v-nav"),
    VList: pt("v-list"),
    VListItem: pt("v-list-item"),
    VListItemTitle: pt("v-list-item-title"),
    VListItemAction: pt("vlia"),
    VListSubheader: pt("vlsh"),
    VIcon: pt("v-icon"),
    VRow: pt("v-row"),
    VCol: pt("v-col"),
    VListGroup: {
      template: `<div class="v-list-group"><slot name="activator" :props="{}" /><slot /></div>`,
    },
  };
});

import SideNavDrawer from "@/components/main/SideNavDrawer.vue";

const mountNav = () =>
  mount(SideNavDrawer, { props: { modelValue: true } });

describe("SideNavDrawer permission gating", () => {
  beforeEach(() => {
    perms = new Set();
    globalThis.route = (name) => name;
  });
  afterEach(() => {
    delete globalThis.route;
  });

  it("hides the System group entirely with no system permissions", () => {
    const w = mountNav();
    expect(w.text()).not.toContain("navigation.system");
    expect(w.text()).not.toContain("navigation.users");
  });

  it("shows only the entries the user is permitted to see", () => {
    perms = new Set(["user.view"]);
    const w = mountNav();
    expect(w.text()).toContain("navigation.system");
    expect(w.text()).toContain("navigation.users");
    expect(w.text()).not.toContain("navigation.roles");
    expect(w.text()).not.toContain("navigation.backup");
  });

  it("gates backup on backup.manage, settings on setting.view, activity on activity.view", () => {
    perms = new Set(["backup.manage", "setting.view", "activity.view"]);
    const w = mountNav();
    expect(w.text()).toContain("navigation.backup");
    expect(w.text()).toContain("navigation.settings");
    expect(w.text()).toContain("navigation.activity_log");
    // not granted user/role
    expect(w.text()).not.toContain("navigation.users");
    expect(w.text()).not.toContain("navigation.roles");
  });

  it("always shows the non-gated chirper nav", () => {
    const w = mountNav();
    expect(w.text()).toContain("navigation.chirps");
  });
});
