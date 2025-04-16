<script lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';

import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import { ChirpCrudView } from '../views/Chirp.vue';
import {BaseView} from '@/views/BaseView.vue';

@Component({
  components: {
    AppLayout,
    ChirpCrudView
  }
})
class ChirpsPage extends BaseView {
  mounted(){
    this.appStore.breadcrumbs = [
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
