<script setup lang="ts">
import { useWorking } from "@/composables/useWorking";
import { useEditableCell } from "@/composables/useEditableCell";
import EditableCell from "@/components/form/EditableCell.vue";
import { arraysEqualUnordered, getArrayText, isObject } from "@/libs/util.js";

const props = defineProps<{
  items?: any[];
  itemValue?: string;
  itemTitle?: string;
  multiple?: boolean;
  returnObject?: boolean;
  modelValue?: any;
  bypass?: boolean;
  title?: string;
  label?: string;
  name?: string;
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
  finish: baseFinish,
  onUpdate,
} = useEditableCell(props, emit, { waitBusy, releaseBusy });

function getValue2(val) {
  if (!props.itemValue || !(isObject(val) || Array.isArray(val))) return val;
  if (Array.isArray(val)) {
    return val.map(getValue2);
  } else {
    return val[props.itemValue];
  }
}

function getText(val, array = true, separator = ", ") {
  if (!props.itemTitle || !(isObject(val) || Array.isArray(val))) return val;
  if (!Array.isArray(val)) return val[props.itemTitle];
  return getArrayText(val, (v) => v[props.itemTitle], array, separator);
}

function changed() {
  if (Array.isArray(value.value)) {
    return !arraysEqualUnordered(
      getValue2(value.value),
      getValue2(valueEdit.value)
    );
  } else {
    return getValue2(value.value) != getValue2(valueEdit.value);
  }
}

async function finish(getValueFn = null) {
  return await baseFinish(getValueFn ?? getValue2);
}

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
  getValue2,
  getText,
  changed,
});
</script>
<template>
  <EditableCell
    :on-reset="reset"
    :on-finish="finish"
    :change-detector="changed"
    :confirm-text-maker="() => confirmTextMaker(valueEdit)"
    :parent-busy="busy"
    :disabled="disabled"
    :title="title"
    :name="name"
    :showTitle="showTitle"
    :bypass="bypass"
  >
    <template v-slot:editing>
      <VSelect
        class="bigger-input"
        :label="_label"
        :name="name"
        :items="items"
        :item-title="itemTitle"
        :item-value="itemValue"
        :model-value="valueEdit"
        @update:model-value="onUpdate"
        :on-change="(value) => (valueEdit = value)"
        :disabled="busy || disabled"
        :return-object="returnObject"
        :multiple="multiple"
        :error-messages="errorMessages || formData?.errors?.[name]"
        :rules="_rules"
        @blur="validate"
      />
    </template>
    <template v-slot:default>
      <span class="bigger-input">{{ getText(value, false) }}</span>
    </template>
  </EditableCell>
</template>
<style scoped></style>
