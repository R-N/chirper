// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";

vi.mock("@/plugins/i18n", () => ({ t: (k) => k }));
vi.mock("@/composables/useWorking", () => ({
  useWorking: () => ({ busy: { value: false } }),
}));
// Registry resolves field types to a simple input stub we can drive.
vi.mock("@/libs/fieldRegistry", () => ({
  resolveCellComponent: () => ({
    name: "RegistryStub",
    props: ["modelValue"],
    emits: ["update:modelValue"],
    template:
      "<input class='registry-field' :value='modelValue' @input=\"$emit('update:modelValue', $event.target.value)\" />",
  }),
}));

import GenericField from "@/components/form/GenericField.vue";

const stubs = {
  ConfirmationSlot: {
    template: "<div class='confirmation-slot'><slot :ask=\"() => {}\" /></div>",
  },
  IconButton: { template: "<button class='icon-button'></button>" },
};

const mountField = (props) =>
  mount(GenericField, { props: { rules: {}, ...props }, global: { stubs } });

describe("GenericField", () => {
  it("bypass mode renders the registry field with the current value", () => {
    const wrapper = mountField({
      field: { value: "name" },
      data: { name: "Bob" },
      bypassEditableCell: true,
    });
    const input = wrapper.find(".registry-field");
    expect(input.exists()).toBe(true);
    expect(input.element.value).toBe("Bob");
    expect(wrapper.find(".confirmation-slot").exists()).toBe(false);
  });

  it("bypass mode writes edits back into formData", async () => {
    const formData = { name: "old", errors: {} };
    const wrapper = mountField({
      field: { value: "name" },
      formData,
      bypassEditableCell: true,
    });
    await wrapper.find(".registry-field").setValue("new");
    expect(formData.name).toBe("new");
  });

  it("custom-component field renders that component (not the registry)", () => {
    const Custom = {
      name: "CustomField",
      props: ["value"],
      template: "<div class='custom-field'>{{ value }}</div>",
    };
    const wrapper = mountField({
      field: { value: "role", component: Custom },
      data: { role: "admin" },
    });
    expect(wrapper.find(".custom-field").exists()).toBe(true);
    expect(wrapper.find(".custom-field").text()).toBe("admin");
    expect(wrapper.find(".registry-field").exists()).toBe(false);
  });

  it("editable table field uses the ConfirmationSlot edit chrome", () => {
    const wrapper = mountField({
      field: { value: "title", editable: true },
      data: { title: "hello" },
    });
    expect(wrapper.find(".confirmation-slot").exists()).toBe(true);
    expect(wrapper.text()).toContain("hello");
  });

  it("display value honours field.getValue", () => {
    const wrapper = mountField({
      field: { value: "active", editable: true, getValue: (v) => (v ? "Yes" : "No") },
      data: { active: true },
    });
    expect(wrapper.text()).toContain("Yes");
  });
});
