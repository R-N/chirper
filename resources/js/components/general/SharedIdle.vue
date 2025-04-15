<script lang="ts">

import { Vue, Component, Prop, Model, Watch, toNative } from 'vue-facing-decorator';
import {MyComponent} from '@/components/MyComponent.vue';

@Component({
  name: "SharedIdle",
})
class SharedIdle extends MyComponent {
  @Prop({ type: Number }) idleWait;
  @Model({ name: 'idle', type: Boolean }) syncedIdle;
  idleTimer = null;

  get idleWaitMillis(){
    return this.idleWait * 1000;
  }

  get sharedUserPresent(){
    return this.appStore.userPresent;
  }

  @Watch('sharedUserPresent')
  onSharedUserPresent(val, oldVal) {
    if (val != oldVal && val && this.syncedIdle) {
      this.syncedIdle = false;
    }
  }

  mounted(){
    const comp = this;
    this.idleTimer = window.setInterval(() => {
      if (comp.appStore.getIdleTime >= comp.idleWaitMillis && !comp.syncedIdle){
        comp.syncedIdle = true;
      }
    }, 1000);
  }

  beforeDestroy(){
    if(this.idleTimer){
      window.clearInterval(this.idleTimer);
      this.idleTimer = null;
    }
  }
}
export { SharedIdle }
export default toNative(SharedIdle);
</script>
<template>
  <div></div>
</template>
<style scoped>
</style>