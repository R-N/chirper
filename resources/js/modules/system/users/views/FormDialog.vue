<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useForm } from "@inertiajs/vue3";

import FormDialog from "@/components/form/FormDialog.vue";
import userService from "../services/user";
import UserForm from "../forms/User.vue";
import { t } from "@/plugins/i18n";

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
  client: userService,
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

const title = computed(() => {
  if (props.data) return `${t("user.item")}: ${props.data.key}`;
  return t("user.item");
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
      <UserForm
        :disabled="!interactable"
        :bypass-editable-cell="true"
        :available-roles="availableRoles"
        :available-permissions="availablePermissions"
        :data="data"
        ref="form"
        @submit="(...args) => emit('submit', ...args)"
      />
    </template>
  </FormDialog>
</template>
<style scoped></style>
