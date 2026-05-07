<script setup lang="ts">
import { computed } from "vue";
import EditableCellTextField from "@/components/form/editable_cell/EditableCellTextField.vue";
import EditableCellSelect from "@/components/form/editable_cell/EditableCellSelect.vue";
import SyncCheckbox from "@/components/checkbox/SyncCheckbox.vue";
import ConfirmationIconButton from "@/components/button/ConfirmationIconButton.vue";
import { useWorking } from "@/composables/useWorking";
import { selectFilled } from "@/libs/util";
import EditableCellTextArea from "./editable_cell/EditableCellTextArea.vue";
import GenericField from "./GenericField.vue";

const props = defineProps({
  setFieldConfirmText: { type: Function, default: null },
  setField: { type: Function, default: null },
  data: { default: null },
  bypassEditableCell: { default: true },
  fields: { default: () => [] },
  rules: { default: () => ({}) },
  interactable: { default: true },
  disabled: { default: false },
  formData: { default: () => ({}) },
  select: { type: String, default: null },
  parentBusy: { default: false },
});

const emit = defineEmits(["submit"]);

const { busy } = useWorking(props);

const _interactable = computed(() => props.interactable && !busy.value && !props.disabled);

function selectFilledHelper(obj) {
  return selectFilled(obj);
}

// Expose properties that GenericField accesses via crud prop
const crud = computed(() => ({
  storeItem: null,
  setFieldConfirmText: props.setFieldConfirmText,
  setField: props.setField,
}));
</script>
<template>
  <div v-for="field in fields">
    <GenericField
      v-if="(!select || select == field.name)"
      :key="field.name"
      :field="field"
      :data="data"
      :crud="crud"
      :rules="rules"
      :bypass-editable-cell="bypassEditableCell && !select"
      :show-title="!select"
      :form-data="formData"
    />
  </div>
</template>
<style scoped></style>
