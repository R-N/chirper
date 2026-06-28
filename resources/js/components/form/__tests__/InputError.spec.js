// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import InputError from "@/components/form/InputError.vue";

// Stub Vuetify wrappers so we test InputError's own logic, not Vuetify.
const global = {
  stubs: {
    VExpandTransition: { template: "<div><slot /></div>" },
    VAlert: { template: "<div class='v-alert'><slot /></div>" },
  },
};

describe("InputError", () => {
  it("renders nothing when there is no message", () => {
    const wrapper = shallowMount(InputError, { props: { message: "" }, global });
    expect(wrapper.find(".v-alert").exists()).toBe(false);
  });

  it("renders a single message in a <p>", () => {
    const wrapper = shallowMount(InputError, {
      props: { message: "Required" },
      global,
    });
    expect(wrapper.find(".v-alert").exists()).toBe(true);
    expect(wrapper.find("p").text()).toBe("Required");
    expect(wrapper.find("ul").exists()).toBe(false);
  });

  it("renders an array of messages as list items", () => {
    const wrapper = shallowMount(InputError, {
      props: { message: ["Too short", "Required"] },
      global,
    });
    const items = wrapper.findAll("li");
    expect(items).toHaveLength(2);
    expect(items[0].text()).toBe("Too short");
    expect(items[1].text()).toBe("Required");
    expect(wrapper.find("p").exists()).toBe(false);
  });
});
