<script setup lang="ts">
import { computed } from "vue";
import FormDialog from "@/components/form/FormDialog.vue";
import settingService from "../services/setting";
import SettingForm from "../forms/Setting.vue";
import { t } from "@/plugins/i18n";
import { formatDate } from "@/libs/util.js";
import { useCrudFormDialog } from "@/composables/useCrudFormDialog";

const props = defineProps<{
  parentBusy?: any;
  modelValue: any;
  data?: any;
  disabled?: boolean;
  name?: string;
  select?: string;
  rules?: any;
  form?: any;
  onSubmit?: Function;
  onReset?: Function;
  onCancel?: Function;
  onShow?: Function;
  availableRoles?: any[];
  availablePermissions?: any[];
  settingTypes?: string[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
  (e: "submit", ...args: any[]): void;
  (e: "cancel", value: any, releaseBusy: any): void;
  (e: "change", value: any): void;
  (e: "reset", ...args: any[]): void;
  (e: "show", value: any): void;
}>();

const {
  busy,
  formData,
  valid,
  interactable,
  myDialog,
  close,
  getForm,
  getValue,
  validate,
  reset,
  submit,
} = useCrudFormDialog(props, emit, { client: settingService });

const settingTypesVal = computed(() => props.settingTypes ?? ["int", "bool", "decimal", "date", "datetime", "time", "enum", "string", "array", "object"]);

function formatDateVal(date: any) {
  return formatDate(date);
}

const title = computed(() => {
  if (props.data) return `${t("settings.item")}: ${props.data.key}`;
  return t("settings.item");
});

function getForm2() {
  return getForm();
}
</script>
<template>
  <FormDialog
    max-width="400"
    :parent-busy="busy"
    :title="title"
    :disabled="disabled"
    :on-reset="reset"
    v-model="myDialog"
    :data="data"
    :form="getForm2"
  >
    <template v-slot:fields="{ interactable, busy }">
      <SettingForm
        :disabled="!interactable"
        :bypass-editable-cell="true"
        :setting-types="settingTypesVal"
        :data="data"
        ref="form"
        @submit="(...args) => emit('submit', ...args)"
        :rules="rules"
      />
    </template>
  </FormDialog>
</template>
<style scoped></style>
