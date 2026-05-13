<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import Chirp from "@/modules/chirps/components/Chirp.vue";
import MediaViewer from "@/components/media/MediaViewer.vue";
import { useForm } from "@/plugins/inertia";
import { useViewBase } from "@/composables/useViewBase";
import { t } from "@/plugins/i18n";
import { computed, onMounted, ref } from "vue";
import chirpService from "../services/chirp";
import { findIndex, deleteFromArray } from "@/libs/util";
import { VFileInput } from "vuetify/components";

const props = defineProps<{
  items: any;
}>();
const { tabStore } = useViewBase(props);

const chirps = computed(() => props.items?.data ?? props.items ?? []);

const formData = useForm({
  message: "",
  photo: null as File | null,
});

const viewingMedia = ref<{ src: string; caption: string } | null>(null);

onMounted(() => {
  tabStore.breadcrumbs = [{ title: t("navigation.chirps") }];
});

async function storeChirp() {
  let res = await chirpService.store(formData);
  const list = Array.isArray(props.items) ? props.items : props.items?.data;
  if (list) list.unshift(res.item);
  formData.reset();
  formData.photo = null;
}

function updateChirp(chirp: any) {
  const list = Array.isArray(props.items) ? props.items : props.items?.data;
  const index = findIndex(list, chirp);
  if (index !== -1) {
    list[index] = chirp;
  }
}

function destroyChirp(chirp: any) {
  const list = Array.isArray(props.items) ? props.items : props.items?.data;
  deleteFromArray(list, chirp);
}

function viewMedia(payload: { src: string; caption: string }) {
  viewingMedia.value = payload;
}
</script>

<template>
  <AppLayout :title="$t('chirp.title')">
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
          v-for="chirp in chirps"
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
  </AppLayout>
</template>
