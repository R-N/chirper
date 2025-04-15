<script lang="ts">
import { Component, Prop, Watch, toNative } from 'vue-facing-decorator';
import { WorkingComponent } from '@/components/WorkingComponent.vue';

import RefreshButton from '@/components/general/RefreshButton.vue';
import CenterLayout from '@/components/layout/CenterLayout.vue';

@Component({
  name: "LoadingOverlay",
  components: {
    RefreshButton,
    CenterLayout
  }
})
class LoadingOverlay extends WorkingComponent {
  @Prop({ default: 96 }) circleSizeRefresh
  @Prop({ default: 64 }) circleSizeNormal
  @Prop({ default: 5 }) mayRefreshWait

  mayRefresh = false;
  mayRefreshTimer = null;

  mounted(){
    this.setTimer(this.busy);
  }

  get mayRefreshWaitMillis(){
    return this.mayRefreshWait * 1000;
  }
  get circleSize(){
    return this.mayRefresh ? this.circleSizeRefresh : this.circleSizeNormal;
  }

  @Watch('busy')
  onBusyChanged(val, oldVal){
    if (val != oldVal){
      this.setTimer(val);
    }
  }

  setTimer(busy){
    if (this.mayRefreshTimer) window.clearTimeout(this.mayRefreshTimer);
    if (busy){
      const comp = this;
      this.mayRefreshTimer = window.setTimeout(function(){
        comp.mayRefresh = true;
      }, this.mayRefreshWaitMillis);
    } else {
      this.mayRefreshTimer = null;
      this.mayRefresh = false;
    }
  }

}
export { LoadingOverlay };
export default toNative(LoadingOverlay);
</script>
<template>
  <VOverlay v-model="busy" class="full-screen">
    <CenterLayout column="true">
      <VProgressCircular indeterminate :size="circleSize">
        <RefreshButton icon large v-if="mayRefresh"/>
      </VProgressCircular>
    </CenterLayout>
  </VOverlay>
</template>
<style scoped>
</style>