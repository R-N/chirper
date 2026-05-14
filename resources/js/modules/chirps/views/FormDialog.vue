<script setup lang="ts">
import FormDialog from "@/components/form/FormDialog.vue";
import chirpService from "../services/chirp";
import { VTextField, VFileInput } from "vuetify/components";
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
} = useCrudFormDialog(props, emit, {
  client: chirpService,
  initialFormData: { message: "", photo: null },
});
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
        <VFileInput
          accept="image/*"
          :label="$t('chirp.photo')"
          v-model="formData.photo"
          :disabled="!interactable"
          density="compact"
          variant="underlined"
          prepend-inner-icon="mdi-camera"
          clearable
          :error-messages="formData.errors.photo"
        />
      </VForm>
    </template>
  </FormDialog>
</template>
<style scoped></style>
