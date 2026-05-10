import { markRaw } from "vue";
import FieldText from "@/components/form/field/FieldText.vue";
import FieldTextArea from "@/components/form/field/FieldTextArea.vue";
import FieldSelect from "@/components/form/field/FieldSelect.vue";

const registry = {
  text: { cell: markRaw(FieldText) },
  textarea: { cell: markRaw(FieldTextArea) },
  select: { cell: markRaw(FieldSelect) },
  currency: { cell: markRaw(FieldText) },
};

export function resolveCellComponent(type) {
  return registry[type]?.cell ?? registry.text.cell;
}

export function registerFieldType(type, components) {
  registry[type] = { ...registry[type], ...components };
}
