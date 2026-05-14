<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { VFileInput, VImg, VBtn, VIcon } from "vuetify/components";
import MediaViewer from "@/components/media/MediaViewer.vue";

const props = defineProps<{
  modelValue?: File | string | null;
  label?: string;
  disabled?: boolean;
  errorMessages?: string | string[];
  rules?: any[];
  required?: boolean;
  editing?: boolean;
  value?: string | null;
  data?: Record<string, any>;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: File | null];
}>();

const viewerOpen = ref(false);
const fileInput = ref<InstanceType<typeof VFileInput> | null>(null);
const previewUrl = ref<string | null>(null);

const currentFile = ref<File | null>(null);
const existingPhoto = ref<string | null>(null);

// Sync modelValue to local state
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
  // Use data.photo_url first (from backend API - includes full URL)
  if (props.data && props.data.photo_url && props.data.photo_url !== 'null') {
    return ensureAbsoluteUrl(props.data.photo_url);
  }
  // Fall back to existingPhoto (from v-model string value)
  if (existingPhoto.value && existingPhoto.value !== 'null') {
    return ensureAbsoluteUrl(existingPhoto.value);
  }
  // Fall back to modelValue (from v-model)
  if (props.modelValue && typeof props.modelValue === 'string' && props.modelValue !== 'null') {
    return ensureAbsoluteUrl(props.modelValue);
  }
  return null;
});

function ensureAbsoluteUrl(url: string): string {
  // If already absolute URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return url;
  }
  // Relative to root
  return '/' + url;
}

function getFilename() {
  if (existingPhoto.value && existingPhoto.value !== 'null') {
    const parts = existingPhoto.value.split("/");
    return parts[parts.length - 1];
  }
  if (currentFile.value) {
    return currentFile.value.name;
  }
  if (props.data && props.data.photo_url && props.data.photo_url !== 'null') {
    const parts = props.data.photo_url.split("/");
    return parts[parts.length - 1];
  }
  return null;
}

function viewMedia() {
  viewerOpen.value = true;
}
</script>

<template>
  <!-- Display mode: show photo filename as clickable link -->
  <div v-if="editing !== true">
    <a
      v-if="photoUrl"
      href="#"
      class="photo-link"
      @click.prevent.stop="viewMedia"
    >
      {{ getFilename() }}
    </a>
    <span v-else class="text-grey">—</span>
    <MediaViewer
      v-model="viewerOpen"
      :src="photoUrl"
    />
  </div>

  <!-- Edit mode: show file input for uploading/changing photo -->
  <div v-else>
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
.photo-link {
  color: #1976d2;
  text-decoration: none;
}
.photo-link:hover {
  text-decoration: underline;
}
.photo-preview {
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
