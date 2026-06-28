// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import FieldText from "@/components/form/field/FieldText.vue";

// Stub VTextField with a real <input> so we can drive v-model and inspect props.
const VTextField = {
  props: ["modelValue", "label", "disabled", "rules", "errorMessages", "type"],
  emits: ["update:modelValue"],
  template:
    "<input :value='modelValue' :disabled='disabled' @input=\"$emit('update:modelValue', $event.target.value)\" />",
};

const mountField = (props = {}) =>
  shallowMount(FieldText, { props, global: { stubs: { VTextField } } });

describe("FieldText", () => {
  it("forwards modelValue and label to the input", () => {
    const wrapper = mountField({ modelValue: "hello", label: "Name" });
    const input = wrapper.getComponent(VTextField);
    expect(input.props("modelValue")).toBe("hello");
    expect(input.props("label")).toBe("Name");
  });

  it("emits update:modelValue when the input changes", async () => {
    const wrapper = mountField({ modelValue: "" });
    await wrapper.find("input").setValue("typed");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["typed"]);
  });

  it("passes through disabled state", () => {
    const wrapper = mountField({ disabled: true });
    expect(wrapper.getComponent(VTextField).props("disabled")).toBe(true);
  });

  it("forwards validation rules", () => {
    const rule = () => true;
    const wrapper = mountField({ rules: [rule] });
    expect(wrapper.getComponent(VTextField).props("rules")).toEqual([rule]);
  });
});
