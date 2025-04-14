<script lang="ts">
import { Component, Prop, toNative } from 'vue-facing-decorator';
import { BaseView } from '@/views/BaseView.vue';

import CenterLayout from '@/components/layout/CenterLayout.vue';
import RefreshButton from '@/components/general/RefreshButton.vue';

@Component({
    name: "ServerDownView",
    components: {
      RefreshButton,
      CenterLayout
    }
})
class ServerDownView extends BaseView {
}
export { ServerDownView } ;
export default toNative(ServerDownView);
</script>
<template>
  <CenterLayout column="true">
    <h1>Server is down</h1>
    <RefreshButton icon large/>
  </CenterLayout>
</template>
<style scoped>
</style>
