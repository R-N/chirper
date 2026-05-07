<script setup lang="ts">
import { ref, computed } from "vue";
import { useForm } from "@inertiajs/vue3";
import { useWorking } from "@/composables/useWorking";
import { useFormBase } from "@/composables/useFormBase";
import { t } from "@/plugins/i18n";

import ConfirmationSlot from "@/components/dialog/ConfirmationSlot.vue";
import IconButton from "@/components/button/IconButton.vue";

const props = defineProps<{
  bypass?: boolean;
  title?: string;
  editText?: string;
  cancelText?: string;
  saveText?: string;
  showTitle?: boolean;
  confirmTextMaker?: string | Function;
  changeDetector?: Function;
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
  onEdit?: Function;
  onFinish?: Function;
  parentBusy?: boolean;
}>();

const emit = defineEmits<{
  (e: "cancel", value?: any): void;
  (e: "reset", value?: any): void;
  (e: "change", value?: any): void;
  (e: "validate", value?: any): void;
  (e: "submit", value?: any): void;
  (e: "edit"): void;
  (e: "finish", value?: any): void;
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

const editing = ref(false);

async function beginEdit() {
  if (props.onEdit) await props.onEdit();
  else emit("edit");
  editing.value = true;
  reset();
}

async function cancelEdit() {
  editing.value = false;
  if (props.onCancel) await props.onCancel();
  else emit("cancel");
  reset();
}

async function onConfirm() {
  if (props.onFinish) await props.onFinish();
  else emit("finish");
  editing.value = false;
}

async function finishEdit(ask = null) {
  validate();
  if (!valid.value) return;
  if (props.changeDetector && !props.changeDetector()) {
    await cancelEdit();
    return;
  }
  if (!props.confirmTextMaker || !ask) {
    await onConfirm();
    return;
  }
  await ask(onConfirm);
}

function onEnter(e, ask = true) {
  const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
  if (e.key === "Enter" && !e.shiftKey && tag !== "textarea") {
    finishEdit(ask);
  }
}

function close() {}

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
  editing,
  beginEdit,
  cancelEdit,
  onConfirm,
  finishEdit,
  onEnter,
});
</script>
<template>
  <ConfirmationSlot
    :confirmTextMaker="confirmTextMaker"
    v-slot="{ ask }"
    :on-confirm="onConfirm"
    class="d-flex flex-column flex-grow-1"
  >
    <slot
      v-if="bypass"
      name="editing"
      :readonly="false"
      :disabled="false"
      :editing="false"
      :bypass="true"
    ></slot>
    <template v-else>
      <div
        class="d-flex align-left justify-space-between"
        v-if="title && showTitle"
      >
        <span class="font-weight-bold">{{ title }}</span>
      </div>
      <div
        class="d-flex align-center justify-space-between"
        @keydown.enter="(e) => onEnter(e, ask)"
      >
        <span class="flex-grow-1">
          <slot
            v-if="editing && !(disabled || busy)"
            name="editing"
            :readonly="disabled || busy || !editing"
            :disabled="disabled || busy || !editing"
            :editing="editing"
            :bypass="false"
          ></slot>
          <slot v-else name="default"></slot>
        </span>
        <span
          class="flex-grow-0 flex-shrink-0"
          v-if="!(disabled || busy)"
        >
          <span v-if="editing">
            <IconButton
              @click.prevent.stop="() => finishEdit(ask)"
              :disabled="busy"
              icon="mdi-check"
              :text="saveText ?? t('form.save')"
            />
            <IconButton
              @click.prevent.stop="cancelEdit"
              :disabled="busy"
              icon="mdi-cancel"
              :text="cancelText ?? t('form.cancel')"
            />
          </span>
          <span v-else>
            <IconButton
              @click.prevent.stop="beginEdit"
              :disabled="busy"
              icon="mdi-pencil"
              :text="editText ?? t('form.edit')"
            />
          </span>
        </span>
      </div>
    </template>
  </ConfirmationSlot>
</template>
<style scoped></style>
