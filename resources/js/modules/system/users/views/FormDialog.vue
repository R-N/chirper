<script setup lang="ts">
import { computed } from "vue";
import FormDialog from "@/components/form/FormDialog.vue";
import userService from "../services/user";
import UserForm from "../forms/User.vue";
import { t } from "@/plugins/i18n";
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
} = useCrudFormDialog(props, emit, { client: userService });

const title = computed(() => {
  if (props.data) return `${t("user.item")}: ${props.data.name}`;
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
        :rules="rules"
        ref="form"
        @submit="(...args) => emit('submit', ...args)"
      />
    </template>
  </FormDialog>
</template>
<style scoped></style>
