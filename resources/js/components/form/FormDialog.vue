<script setup lang="ts">
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
  cancelText?: string;
  confirmText?: string;
  maxWidth?: number;
  title?: string;
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
} = useFormBase(props, emit);

const { myDialog, close } = useDialog(props, emit, { busy, reset, waitBusy, releaseBusy });

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
});
</script>
<template>
  <VDialog v-model="myDialog" :max-width="maxWidth" :persistent="busy">
    <VCard class="pa-2">
      <VCardTitle class="pb-1">{{ title ?? $t("form.form") }}</VCardTitle>
      <VCardText>
        <slot
          name="fields"
          :interactable="interactable"
          :busy="busy"
          :disabled="disabled"
          :data="data"
        ></slot>
      </VCardText>
      <VCardActions>
        <slot
          name="buttons-left"
          :interactable="interactable"
          :busy="busy"
          :disabled="disabled"
        ></slot>
        <VSpacer></VSpacer>
        <slot
          name="buttons"
          :interactable="interactable"
          :busy="busy"
          :disabled="disabled"
        ></slot>
        <slot
          name="buttons-right"
          :interactable="interactable"
          :busy="busy"
          :disabled="disabled"
        ></slot>
        <VBtn
          color="green darken-1"
          text
          @click.stop="close()"
          :disabled="!interactable"
          v-if="cancelText ?? $t('form.cancel')"
        >
          {{ $t("form.cancel") }}
        </VBtn>
        <VBtn
          @click.prevent.stop="submit"
          color="green darken-1"
          text
          :disabled="!interactable"
          :loading="busy"
          v-if="confirmText ?? $t('form.confirm')"
        >
          {{ $t("form.confirm") }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
<style scoped></style>
