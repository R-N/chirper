<script lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';

import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import { ChirpCrudView } from '../views/Chirp.vue';

@Component({
  components: {
    AppLayout,
    ChirpCrudView
  }
})
class ChirpsPage extends Vue {
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
