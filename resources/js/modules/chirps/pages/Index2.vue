<script lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';

import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import { ChirpCrudView } from '../views/Chirps.vue';
import {ViewBase} from '@/views/ViewBase.vue';

@Component({
  components: {
    AppLayout,
    ChirpCrudView
  }
})
class ChirpsPage extends ViewBase {
  mounted(){
    this.tabStore.breadcrumbs = [
      { title: "Chirps" },
    ];
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
