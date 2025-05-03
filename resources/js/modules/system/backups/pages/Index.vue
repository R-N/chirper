<script lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";

import { Component, Prop, Vue, toNative } from "vue-facing-decorator";
import BackupView from "../views/Backups.vue";
import { ViewBase } from "@/views/ViewBase.vue";

@Component({
  components: {
    AppLayout,
    BackupView
  }
})
class BackupsPage extends ViewBase {
  @Prop({ type: [Array, Object], default: null }) items;
  async mounted() {
    this.tabStore.breadcrumbs = [
      { title: this.$t("navigation.system") },
      { title: this.$t("navigation.backup") }
    ];
  }
}
export default toNative(BackupsPage);
</script>

<template>
  <AppLayout :title="$t('backup.title')">
    <VContainer>
      <BackupView />
    </VContainer>
  </AppLayout>
</template>
