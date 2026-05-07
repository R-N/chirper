<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useForm } from "@inertiajs/vue3";

import FormDialog from "@/components/form/FormDialog.vue";
import settingService from "../services/setting";
import { VTextField } from "vuetify/components";
import SettingForm from "../forms/Setting.vue";
import { t } from "@/plugins/i18n";
import { formatDate } from "@/libs/util.js";

import { useWorking } from "@/composables/useWorking";
import { useFormBase } from "@/composables/useFormBase";
import { useDialog } from "@/composables/useDialog";
import { useCrudForm } from "@/composables/useCrudForm";

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
  waitBusy,
  releaseBusy,
  showError,
} = useWorking(props);

const formData = useForm({});

const formBase = useFormBase(props, emit);

const {
  valid,
  getForm,
  getValue,
  validate,
  resetValidation,
  reset,
  prepopulate,
  interactable,
  dynamicFormRef,
} = formBase;

const dialog = useDialog(props, emit, { busy, reset, waitBusy, releaseBusy });
const { myDialog, close } = dialog;

const crudForm = useCrudForm({
  client: settingService,
  formData,
  data: computed(() => props.data),
});

async function submit() {
  validate();
  if (!valid.value) return;
  await crudForm.submit({
    validate,
    valid,
    waitBusy,
    getValue,
    onSubmit: props.onSubmit,
    emit,
    close,
  });
}

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
