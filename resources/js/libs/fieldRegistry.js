import { markRaw } from "vue";
import EditableCellTextField from "@/components/form/editable_cell/EditableCellTextField.vue";
import EditableCellTextArea from "@/components/form/editable_cell/EditableCellTextArea.vue";
import EditableCellSelect from "@/components/form/editable_cell/EditableCellSelect.vue";
import EditableCurrencyField from "@/components/form/editable_cell/EditableCurrencyField.vue";

const registry = {
  text: { cell: markRaw(EditableCellTextField) },
  textarea: { cell: markRaw(EditableCellTextArea) },
  select: { cell: markRaw(EditableCellSelect) },
  currency: { cell: markRaw(EditableCurrencyField) },
};

export function resolveCellComponent(type) {
  return registry[type]?.cell ?? registry.text.cell;
}

export function registerFieldType(type, components) {
  registry[type] = { ...registry[type], ...components };
}
