<script setup lang="ts">
import Chirp from "@/modules/chirps/components/Chirp.vue";
import MediaViewer from "@/components/media/MediaViewer.vue";
import { useForm } from "@/plugins/inertia";
import { ref } from "vue";
import chirpService from "../services/chirp";
import { findIndex, deleteFromArray } from "@/libs/util";
import { VFileInput, VImg, VBtn, VIcon } from "vuetify/components";

const items = ref<any[]>([]);

const formData = useForm({
  message: "",
  photo: null as File | null,
});

const viewingMedia = ref<{ src: string; caption: string } | null>(null);

async function loadChirps() {
  try {
    const res = await chirpService.get();
    items.value = res.items?.data ?? res.items ?? res.data ?? [];
  } catch (e) {
    console.error("Failed to load chirps:", e);
  }
}
loadChirps();

async function storeChirp() {
  let res = await chirpService.store(formData);
  if (res.item) items.value.unshift(res.item);
  formData.reset();
  formData.photo = null;
}

function updateChirp(chirp: any) {
  const index = findIndex(items.value, chirp);
  if (index !== -1) items.value[index] = chirp;
}

function destroyChirp(chirp: any) {
  deleteFromArray(items.value, chirp);
}

function viewMedia(payload: { src: string; caption: string }) {
  viewingMedia.value = payload;
}
</script>
<template>
  <VContainer class="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
    <form @submit.prevent.stop="storeChirp">
      <VTextarea
        v-model="formData.message"
        :label="$t('chirp.placeholder')"
        variant="outlined"
      />
      <VFileInput
        :model-value="formData.photo ? [formData.photo] : []"
        @update:model-value="(files: any) => formData.photo = files?.[0] ?? null"
        accept="image/*"
        :label="$t('chirp.photo')"
        density="compact"
        variant="underlined"
        prepend-inner-icon="mdi-camera"
        clearable
        class="mt-2"
      />
      <VBtn class="mt-4" color="primary" type="submit">{{
        $t("chirp.submit")
      }}</VBtn>
    </form>
    <VCard class="mt-6">
      <Chirp
        v-for="chirp in items"
        :key="chirp.id"
        :chirp="chirp"
        @destroy="destroyChirp"
        @update="updateChirp"
        @view-media="viewMedia"
      />
    </VCard>
    <MediaViewer
      :model-value="viewingMedia !== null"
      @update:model-value="viewingMedia = null"
      :src="viewingMedia?.src ?? null"
      :caption="viewingMedia?.caption ?? null"
    />
  </VContainer>
</template>
