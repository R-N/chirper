<script lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import Chirp from "@/modules/chirps/components/Chirp.vue";
import { useForm } from "@inertiajs/vue3";

import { VContainer, VTextarea, VBtn, VCard } from "vuetify/components";
import { Component, Prop, Vue, toNative } from "vue-facing-decorator";
import chirpService from "../services/chirp";
import { findIndex, deleteFromArray } from "@/libs/util";
import { ViewBase } from "@/views/ViewBase.vue";

@Component({
  components: {
    AppLayout,
    Chirp,
    VContainer,
    VTextarea,
    VBtn,
    VCard
  }
})
class ChirpsPage extends ViewBase {
  @Prop({ type: Array }) items = []; // Adjust the type as necessary for chirps

  // Form data
  formData = useForm({
    message: ""
  });

  mounted() {
    this.tabStore.breadcrumbs = [{ title: this.$t("navigation.chirps") }];
  }

  async storeChirp() {
    let res = await chirpService.store(this.formData);
    this.items.unshift(res.chirp);

    this.formData.reset();
  }
  updateChirp(chirp) {
    const index = findIndex(this.items, chirp);
    if (index !== -1) {
      this.items[index] = chirp; // Replace with updated chirp
    }
  }
  destroyChirp(chirp) {
    deleteFromArray(this.items, chirp);
  }
}
export default toNative(ChirpsPage);
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
  </AppLayout>
</template>
