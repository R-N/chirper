import { markRaw } from "vue";
import FieldText from "@/components/form/field/FieldText.vue";
import FieldTextArea from "@/components/form/field/FieldTextArea.vue";
import FieldSelect from "@/components/form/field/FieldSelect.vue";
import FieldNumber from "@/components/form/field/FieldNumber.vue";
import FieldCheckbox from "@/components/form/field/FieldCheckbox.vue";
import FieldDate from "@/components/form/field/FieldDate.vue";

const registry = {
  text: { cell: markRaw(FieldText) },
  string: { cell: markRaw(FieldText) },
  textarea: { cell: markRaw(FieldTextArea) },
  select: { cell: markRaw(FieldSelect) },
  currency: { cell: markRaw(FieldText) },
  number: { cell: markRaw(FieldNumber) },
  integer: { cell: markRaw(FieldNumber) },
  bool: { cell: markRaw(FieldCheckbox) },
  boolean: { cell: markRaw(FieldCheckbox) },
  date: { cell: markRaw(FieldDate) },
  datetime: { cell: markRaw(FieldDate) },
  json: { cell: markRaw(FieldTextArea) },
  relational: { cell: markRaw(FieldText) },
};

export function resolveCellComponent(type) {
  return registry[type]?.cell ?? registry.text.cell;
}

export function registerFieldType(type, components) {
  registry[type] = { ...registry[type], ...components };
}
