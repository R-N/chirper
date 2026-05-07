<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useForm } from "@inertiajs/vue3";
import { isObject, getData } from "@/libs/util";
import { t } from "@/plugins/i18n";
import FormDialog from "@/components/form/FormDialog.vue";
import { useWorking } from "@/composables/useWorking";
import { useFormBase } from "@/composables/useFormBase";
import { useDialog } from "@/composables/useDialog";

const props = defineProps<{
  name?: string;
  disabled?: boolean;
  data?: object | null;
  rules?: any[] | Function | object;
  select?: string | null;
  form?: object | Function;
  onCancel?: Function;
  onChange?: Function;
  onReset?: Function;
  onValidate?: Function;
  onSubmit?: Function;
  parentBusy?: boolean;
  modelValue?: boolean | string | object | any[];
  onShow?: Function;
  maxWidth?: number;
  title?: string;
  text?: string;
  type?: string;
  label?: string;
  password?: boolean;
  noInput?: boolean;
  counter?: Function | number;
  errorMessages?: any;
  confirmErrorMessages?: any;
  emitForm?: boolean;
}>();

const emit = defineEmits<{
  (e: "cancel", value?: any, releaseBusy?: Function): void;
  (e: "reset", value?: any): void;
  (e: "change", value?: any): void;
  (e: "validate", value?: any): void;
  (e: "submit", value?: any): void;
  (e: "update:modelValue", value?: any): void;
  (e: "show", value?: any): void;
}>();

const { busy, releaseBusy, waitBusy, showError } = useWorking(props);

const {
  dynamicFormRef,
  valid,
  _valid,
  item,
  interactable: formInteractable,
  getForm,
  prepopulate,
  validate,
  resetValidation,
} = useFormBase(props, emit);

const formData = props.name ? useForm({ [props.name]: null }) : useForm({ value: null });

const input = ref("");
const inputConfirm = ref("");
const passwordVisible = ref(false);

const _rules = computed(() => {
  if (isObject(props.rules)) {
    return getData(props.rules, props.name ?? "value");
  }
  return props.rules;
});

const _label = computed(() => props.label ?? t("form.input"));

const confirmRules = computed(() => [
  (v: any) => !!v || "Konfirmasi tidak boleh kosong",
  (v: any) => input.value === v || "Konfirmasi tidak sama",
  ...(_rules.value || []),
]);

const interactable = computed(() => formInteractable.value);

function reset() {
  resetValidation();
  input.value = "";
  inputConfirm.value = "";
  prepopulate();
}

const { myDialog, close } = useDialog(props, emit, { busy, reset, waitBusy, releaseBusy });

function validateConfirm(val: string) {
  return input.value === val;
}

function getValue() {
  if (props.emitForm) return formData;
  return input.value;
}

async function submit() {
  validate();
  if (!valid.value) return;
  return await waitBusy(async () => {
    const form = getForm();
    let ret = null;
    if (props.onSubmit) {
      ret = await props.onSubmit(getValue());
    } else if (form && form.submit) {
      ret = await form.submit();
    } else {
      ret = emit("submit", getValue());
    }
    close();
    return ret;
  });
}

defineExpose({
  formData,
  dynamicFormRef,
  valid,
  _valid,
  item,
  interactable,
  getForm,
  getValue,
  prepopulate,
  validate,
  resetValidation,
  reset,
  submit,
  close,
  busy,
  waitBusy,
  releaseBusy,
  showError,
  myDialog,
  input,
  inputConfirm,
  _rules,
  _label,
  confirmRules,
  passwordVisible,
});
</script>
<template>
  <FormDialog
    max-width="290"
    :parent-busy="busy"
    :title="title"
    :disabled="disabled"
    v-model="myDialog"
    :on-reset="reset"
    :on-cancel="onCancel"
    :on-submit="submit"
    :form="dynamicFormRef"
  >
    <template v-slot:fields="{ interactable, busy }">
      <VForm
        v-model="valid"
        ref="form"
        :disabled="!interactable"
        @submit.prevent.stop="submit"
        class="d-flex flex-column ga-3"
      >
        <p class="text-left">{{ text }}</p>
        <VTextField
          class="bigger-input"
          v-if="!noInput && !password"
          :label="_label"
          v-model="input"
          :disabled="!interactable"
          required
          :rules="_rules"
          :counter="counter"
          :name="name"
          :error-messages="errorMessages || formData?.errors?.[name]"
        />
        <VTextField
          class="bigger-input"
          v-if="!noInput && password"
          :label="_label"
          v-model="input"
          :disabled="!interactable"
          :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="
            () => {
              passwordVisible = !passwordVisible;
            }
          "
          :type="passwordVisible ? 'text' : 'password'"
          required
          :rules="_rules"
          :counter="counter"
          :name="name"
          :error-messages="errorMessages || formData?.errors?.[name]"
        />
        <VTextField
          class="bigger-input"
          v-if="!noInput && password"
          :label="'Konfirmasi ' + _label"
          v-model="inputConfirm"
          :disabled="!interactable"
          type="password"
          required
          :counter="counter"
          :rules="confirmRules"
          :name="name + '_confirm'"
          :error-messages="confirmErrorMessages"
        />
      </VForm>
    </template>
  </FormDialog>
</template>
<style scoped>
.backup-table {
  background: #00000000;
}
</style>
