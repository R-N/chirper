<script lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import Chirp from '@/modules/chirps/components/Chirp.vue';
import { useForm } from '@inertiajs/vue3';

import { VContainer, VTextarea, VBtn, VCard } from 'vuetify/components';
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import chirpService from '../services/chirp';

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
class ChirpsPage extends Vue {
  @Prop(Array) chirps = []; // Adjust the type as necessary for chirps

  // Form data
  form = useForm({
    message: '',
  });

  mounted(){
  }

  async create(){
    let res = await chirpService.store(this.form);
    this.chirps.unshift(res.chirp);

    this.form.reset();
  }
  updateChirp(chirp){
    const index = this.chirps.findIndex(chirp => chirp.id === chirp.id);
    if (index !== -1) {
      this.chirps[index] = chirp; // Replace with updated chirp
    }
  }
  destroyChirp(chirp){
    chirp = chirp?.id ?? chirp;
    const index = this.chirps.findIndex(c => c.id === chirp);
    this.chirps.splice(index, 1);
  }
}
export default toNative(ChirpsPage);
</script>
 
<template>
  <AppLayout title="Chirps">
    <VContainer class="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <form @submit.prevent="create">
        <VTextarea
          v-model="form.message"
          label="What's on your mind?"
          variant="outlined"
        />
        <VBtn class="mt-4" color="primary" type="submit">Chirp</VBtn>
      </form>
      <VCard class="mt-6">
        <Chirp
          v-for="chirp in chirps"
          :key="chirp.id"
          :chirp="chirp"
          @destroy="destroyChirp" 
          @update="updateChirp" 
        />
      </VCard>
    </VContainer>
  </AppLayout>
</template>
