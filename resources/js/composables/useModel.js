import { ref, computed } from "vue";

export function useModel(name, props, emit) {
  const hidden = ref(null);
  const prop = name ?? "modelValue";
  const model = computed({
    get() {
      if (props[prop] !== undefined) {
        return props[prop];
      }
      return hidden.value;
    },
    set(value) {
      hidden.value = value;
      if (props[prop] !== undefined) {
        emit(`update:${prop}`, value);
      }
    },
  });
  return model;
}
