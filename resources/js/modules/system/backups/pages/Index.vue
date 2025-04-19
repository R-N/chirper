<script lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';

import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import BackupView from '../views/Backups.vue';
import { ViewBase } from '@/views/ViewBase.vue';

@Component({
  components: {
    AppLayout,
    BackupView
  }
})
class BackupsPage extends ViewBase {
  async mounted(){
    this.tabStore.breadcrumbs = [
      { title: "System" },
      { title: "Backup" },
    ];
  }
}
export default toNative(BackupsPage);
</script>
 
<template>
  <AppLayout title="Backup">
    <VContainer>
      <BackupView />
    </VContainer>
  </AppLayout>
</template>
