<script lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';

import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import BackupView from '../views/Backup.vue';
import { BaseView } from '@/views/BaseView.vue';

@Component({
  components: {
    AppLayout,
    BackupView
  }
})
class BackupsPage extends BaseView {
  async mounted(){
    this.appStore.breadcrumbs = [
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
