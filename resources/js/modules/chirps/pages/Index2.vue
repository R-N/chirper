<script lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';

import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import chirpService from '../services/chirp';
import { findIndex, deleteFromArray } from '@/libs/util';
import { ChirpCrudView } from '../views/Chirp.vue';

@Component({
  components: {
    AppLayout,
    ChirpCrudView
  }
})
class ChirpsPage extends Vue {
  @Prop({ type: Array }) chirps = [];

  mounted(){
  }

}
export default toNative(ChirpsPage);
</script>
 
<template>
  <AppLayout title="Chirps">
    <VContainer>
      <ChirpCrudView />
    </VContainer>
  </AppLayout>
</template>
