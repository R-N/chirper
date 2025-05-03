<script lang="ts">
import { Component, Prop, toNative } from "vue-facing-decorator";
import { ViewBase } from "@/views/ViewBase.vue";

import CenterLayout from "@/components/layout/CenterLayout.vue";
import RefreshButton from "@/components/general/RefreshButton.vue";

@Component({
  name: "ServerDownView",
  components: {
    RefreshButton,
    CenterLayout
  }
})
class ServerDownView extends ViewBase {}
export { ServerDownView };
export default toNative(ServerDownView);
</script>
<template>
  <CenterLayout column="true">
    <h1>{{ $t("navigation.server_unreachable") }}</h1>
    <RefreshButton icon large />
  </CenterLayout>
</template>
<style scoped></style>
