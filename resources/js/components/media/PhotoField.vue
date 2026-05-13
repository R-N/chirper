<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { VFileInput, VImg, VBtn, VIcon } from "vuetify/components";

const props = defineProps<{
  modelValue?: File | string | null;
  label?: string;
  disabled?: boolean;
  errorMessages?: string | string[];
  rules?: any[];
  required?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: File | null];
}>();

const fileInput = ref<InstanceType<typeof VFileInput> | null>(null);
const previewUrl = ref<string | null>(null);

const currentFile = ref<File | null>(null);
const existingPhoto = ref<string | null>(null);

watch(
  () => props.modelValue,
  (val) => {
    if (val instanceof File) {
      currentFile.value = val;
      existingPhoto.value = null;
      if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
      previewUrl.value = URL.createObjectURL(val);
    } else if (typeof val === "string" && val.length > 0) {
      existingPhoto.value = val;
      currentFile.value = null;
      previewUrl.value = null;
    } else {
      existingPhoto.value = null;
      currentFile.value = null;
      previewUrl.value = null;
    }
  },
  { immediate: true }
);

function onFileChange(files: File | File[] | null) {
  const fileList = Array.isArray(files) ? files : files ? [files] : [];
  const file = fileList[0] ?? null;
  if (file) {
    currentFile.value = file;
    existingPhoto.value = null;
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = URL.createObjectURL(file);
    emit("update:modelValue", file);
  }
}

function removePhoto() {
  currentFile.value = null;
  existingPhoto.value = null;
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = null;
  emit("update:modelValue", null);
}

const photoUrl = computed(() => {
  if (previewUrl.value) return previewUrl.value;
  if (existingPhoto.value) return existingPhoto.value;
  return null;
});
</script>

<template>
  <div>
    <div v-if="photoUrl" class="d-flex align-center ga-2 mb-2">
      <VImg :src="photoUrl" max-width="120" max-height="120" cover rounded class="photo-preview" />
      <VBtn
        variant="text"
        size="small"
        color="error"
        icon="mdi-delete"
        :disabled="disabled"
        @click="removePhoto"
      />
    </div>
    <VFileInput
      ref="fileInput"
      :label="label ?? 'Photo'"
      accept="image/*"
      prepend-icon=""
      prepend-inner-icon="mdi-camera"
      :disabled="disabled"
      :error-messages="errorMessages"
      :rules="rules"
      :required="required"
      density="compact"
      variant="underlined"
      clearable
      @update:model-value="onFileChange"
    />
  </div>
</template>

<style scoped>
.photo-preview {
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
