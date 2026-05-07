<script setup lang="ts">
import { computed } from "vue";
import { useForm } from "@inertiajs/vue3";

import FormDialog from "@/components/form/FormDialog.vue";
import chirpService from "../services/chirp";
import { VTextField } from "vuetify/components";

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

const formData = useForm({
  message: "",
});

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
  client: chirpService,
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
</script>
<template>
  <FormDialog
    max-width="400"
    :parent-busy="busy"
    :on-submit="submit"
    :title="$t('chirp.item')"
    :disabled="disabled"
    :on-reset="reset"
    v-model="myDialog"
  >
    <template v-slot:fields="{ interactable, busy }">
      <VForm
        v-model="valid"
        :disabled="!interactable"
        @click.prevent.stop="() => null"
        @submit.prevent.stop="submit"
        :class="select ? '' : 'd-flex flex-column ga-3'"
        ref="form"
      >
        <VTextField
          name="message"
          class="bigger-input"
          :label="$t('chirp.message')"
          v-model="formData.message"
          :disabled="!interactable"
          required
          :error-messages="formData.errors.message"
          :rules="rules?.message"
        />
      </VForm>
    </template>
  </FormDialog>
</template>
<style scoped></style>
