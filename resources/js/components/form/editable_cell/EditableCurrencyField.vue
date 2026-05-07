<script setup lang="ts">
import { useWorking } from "@/composables/useWorking";
import { useEditableCell } from "@/composables/useEditableCell";
import EditableCell from "@/components/form/EditableCell.vue";

const props = defineProps<{
  type?: string;
  counter?: number;
  required?: boolean;
  bypass?: boolean;
  title?: string;
  label?: string;
  name?: string;
  modelValue?: any;
  confirmTextMaker?: string | Function;
  disabled?: boolean;
  onFinish?: Function;
  errorMessages?: any;
  emitForm?: boolean;
  rules?: string | object | any[];
  showTitle?: boolean;
  parentBusy?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: any, releaseBusy?: Function): void;
  (e: "change", value: any, releaseBusy?: Function): void;
  (e: "finish", value: any, releaseBusy?: Function): void;
  (e: "reset"): void;
}>();

const { busy, releaseBusy, waitBusy, showError } = useWorking(props);

const {
  valueEdit,
  value,
  formData,
  _label,
  _rules,
  valid,
  getValue,
  reset,
  resetValidation,
  validate,
  prepopulate,
  finish,
  onUpdate,
} = useEditableCell(props, emit, { waitBusy, releaseBusy });

defineExpose({
  valueEdit,
  value,
  formData,
  _label,
  _rules,
  valid,
  getValue,
  reset,
  resetValidation,
  validate,
  prepopulate,
  finish,
  onUpdate,
  busy,
  waitBusy,
  releaseBusy,
  showError,
});
</script>
<template>
  <EditableCell
    :on-reset="() => (valueEdit = value)"
    :on-finish="finish"
    :change-detector="() => value != valueEdit"
    :confirm-text-maker="() => confirmTextMaker(valueEdit)"
    :parent-busy="busy"
    :disabled="disabled"
    :title="title"
    :name="name"
    :bypass="bypass"
  >
    <template v-slot:editing>
      <VCurrencyField
        class="bigger-input"
        :name="name"
        :model-value="valueEdit"
        @update:model-value="onUpdate"
        :rules="_rules"
        :counter="counter"
        :type="type"
        :disabled="busy || disabled"
        :required="required"
        :label="_label"
        :error-messages="errorMessages || formData?.errors?.[name]"
        @blur="validate"
      />
    </template>
    <template v-slot:default>
      <span class="bigger-input">{{ value }}</span>
    </template>
  </EditableCell>
</template>
<style scoped></style>
