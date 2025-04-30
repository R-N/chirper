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
  @Prop({ type: [Array, Object], default: null }) items;
  mounted(){
    this.tabStore.breadcrumbs = [
      { title: this.$t('navigation.chirps') },
    ];
  }
}
export default toNative(ChirpsPage);
</script>
 
<template>
  <AppLayout :title="$t('chirp.title')">
    <VContainer>
      <ChirpCrudView />
    </VContainer>
  </AppLayout>
</template>
