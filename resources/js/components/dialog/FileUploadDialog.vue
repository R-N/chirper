<script setup lang="ts">
import { ref, computed, watch, useTemplateRef } from "vue";
import { useForm } from "@/plugins/inertia";
import { emptyArray } from "@/libs/util";
import { t } from "@/plugins/i18n";
import { useWorking } from "@/composables/useWorking";
import { useFormBase } from "@/composables/useFormBase";
import { useDialog } from "@/composables/useDialog";

let defaultBackendUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

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
  preUpload?: Function;
  onUpload?: Function;
  postUpload?: Function;
  title?: string;
  text?: string;
  dropText?: string;
  browseText?: string;
  dropUpload?: boolean;
  acceptedFiles?: string;
  mimeTypes?: string[];
  errorMessages?: any;
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

const { busy, releaseBusy, waitBusy, showError, tabStore } = useWorking(props);

const {
  valid,
  _valid,
  item,
  getForm,
  getValue,
  prepopulate,
  validate,
  resetValidation,
} = useFormBase(props, emit);

const formData = props.name ? useForm({ [props.name]: null }) : useForm({ value: null });

const file = ref<File | null>(null);
const files = ref<File[]>([]);
const fromDrop = ref(false);
const immediateUpload = ref(false);

const myFileUpload = useTemplateRef("myFileUpload");

function reset() {
  resetValidation();
  file.value = null;
  emptyArray(files.value);
}

const { myDialog, close: dialogClose } = useDialog(props, emit, { busy, reset, waitBusy, releaseBusy });

const interactable = computed(() => busy.value || !myDialog.value);

async function close() {
  if (typeof myDialog.value === "boolean" || myDialog.value instanceof Boolean) {
    myDialog.value = false;
  } else if (typeof myDialog.value === "string" || myDialog.value instanceof String) {
    myDialog.value = "";
  } else if (myDialog.value instanceof Object) {
    myDialog.value = null;
  } else if (myDialog.value instanceof Array) {
    myDialog.value.pop();
  }
}

const accept = computed(() => `${props.acceptedFiles || ""},${(props.mimeTypes || []).join(",")}`);

const dropzoneOptions = computed(() => ({
  url: defaultBackendUrl + "/upload/",
  maxFilesize: 1,
  clickable: false,
  uploadMultiple: false,
  autoProcessQueue: false,
  acceptedFiles: accept.value,
  mimeTypes: props.mimeTypes || [],
}));

watch(files, async (newFiles, oldFiles) => {
  if (newFiles.length > 0 && immediateUpload.value) {
    onFileDropped(newFiles.shift()!);
  }
});

function onFilesChanged(newFiles: File[]) {
  if (newFiles?.length > 0 && immediateUpload.value) {
    onFileDropped(newFiles.shift()!);
  }
}

function onFileDropped(f: File) {
  if (!file.value) file.value = f;
  else files.value.push(f);
  fromDrop.value = true;
}

function onDialogFileDropped(f: File) {
  myFileUpload.value?.removeFile(f);
  immediateUpload.value = props.dropUpload ?? true;
  onFileDropped(f);
}

watch(file, async (newFile, old) => {
  if (fromDrop.value) {
    if (newFile) {
      if (!(newFile as any).accepted) {
        if (files.value.length === 0) {
          fromDrop.value = false;
          file.value = old as File | null;
        } else {
          file.value = files.value.shift()!;
        }
        tabStore.showError("File invalid");
      } else if (immediateUpload.value) {
        await uploadFile();
        immediateUpload.value = false;
      }
    }
  }
});

async function uploadFile() {
  formData.clearErrors();
  busy.value = true;
  if (props.preUpload) props.preUpload();
  try {
    if (!file.value && files.value.length) file.value = files.value.shift()!;
    while (file.value || files.value.length) {
      await props.onUpload!(file.value!);
      if (files.value.length) {
        file.value = files.value.shift()!;
      } else {
        file.value = null;
      }
    }
    close();
  } catch (error: any) {
    files.value.unshift(file.value!);
    file.value = null;
    if (error?.response?.data?.errors) {
      formData.setError(error.response.data.errors);
    }
    throw error;
  } finally {
    if (props.postUpload) props.postUpload();
    busy.value = false;
  }
}

defineExpose({
  formData,
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
  close,
  busy,
  waitBusy,
  releaseBusy,
  showError,
  myDialog,
  file,
  files,
  fromDrop,
  immediateUpload,
  myFileUpload,
  accept,
  dropzoneOptions,
  uploadFile,
  onFileDropped,
  onFilesChanged,
  onDialogFileDropped,
});
</script>
<template>
  <VDialog v-model="myDialog" max-width="290" :persistent="busy">
    <VCard class="pt-3 pb-3 pl-3 pr-3">
      <VForm @submit.prevent.stop="uploadFile">
        <VCardTitle class="headline">{{
          title ?? $t("form.upload_title")
        }}</VCardTitle>
        <VCardText>
          <p class="text-left">{{ text ?? $t("form.upload_desc") }}</p>
          <VFileUpload
            clearable
            density="compact"
            variant="compact"
            ref="myFileUpload"
            v-model="files"
            :browse-text="browseText ?? $t('form.browse')"
            :title="dropText ?? $t('form.drop_here')"
            :accept="accept"
            :multiple="true"
            show-size
            @change="onFilesChanged"
            :error-messages="errorMessages || formData?.errors?.[name]"
          />
        </VCardText>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn
            color="green darken-1"
            text
            @click.stop="close()"
            :disabled="interactable"
          >
            {{ $t("form.cancel") }}
          </VBtn>
          <VBtn
            color="green darken-1"
            text
            type="submit"
            :disabled="interactable"
            :loading="busy"
          >
            {{ $t("form.upload") }}
          </VBtn>
        </VCardActions>
      </VForm>
    </VCard>
  </VDialog>
</template>
<style scoped></style>
