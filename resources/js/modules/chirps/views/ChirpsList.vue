<script setup lang="ts">
import Chirp from "@/modules/chirps/components/Chirp.vue";
import { useForm } from "@/plugins/inertia";
import { computed, ref } from "vue";
import chirpService from "../services/chirp";
import { findIndex, deleteFromArray } from "@/libs/util";

const items = ref<any[]>([]);

const formData = useForm({
  message: ""
});

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
}

function updateChirp(chirp: any) {
  const index = findIndex(items.value, chirp);
  if (index !== -1) items.value[index] = chirp;
}

function destroyChirp(chirp: any) {
  deleteFromArray(items.value, chirp);
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
      />
    </VCard>
  </VContainer>
</template>
