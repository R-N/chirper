<script lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";

import { Component, Prop, Vue, toNative } from "vue-facing-decorator";
import { SettingCrudView } from "../views/Settings.vue";
import { ViewBase } from "@/views/ViewBase.vue";

@Component({
  components: {
    AppLayout,
    SettingCrudView
  }
})
class SettingsPage extends ViewBase {
  @Prop({ type: [Array, Object], default: null }) items;
  @Prop({ type: Array, default: null }) setting_types;
  mounted() {
    this.tabStore.breadcrumbs = [
      { title: this.$t("navigation.system") },
      { title: this.$t("navigation.settings") }
    ];
  }
}
export default toNative(SettingsPage);
</script>

<template>
  <AppLayout :title="$t('settings.title')">
    <VContainer>
      <SettingCrudView :setting-types="setting_types" />
    </VContainer>
  </AppLayout>
</template>
