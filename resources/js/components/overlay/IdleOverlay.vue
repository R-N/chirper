<script lang="ts">

import { Vue, Component, Prop, Watch, toNative } from 'vue-facing-decorator';
import SharedIdle from '@/components/general/SharedIdle.vue';
import {MyComponent} from '@/components/MyComponent.vue';
import authService from '@/modules/user/auth/services/auth';
import CenterLayout from '@/components/layout/CenterLayout.vue';
import { router } from '@inertiajs/vue3';

@Component({
  name: "IdleOverlay",
  components: {
    SharedIdle,
    CenterLayout
  }
})
class IdleOverlay extends MyComponent {
  @Prop({ type: Number }) logoutWait;
  @Prop({ type: Number }) idleWait;

  logoutCountdown = 0;
  logoutTimer = null;


  mounted(){
  }

  get logoutCountdownMinutes(){
    return ('0' + parseInt(this.logoutCountdown/60)).slice(-2);
  }
  get logoutCountdownSeconds(){
    return ('0' + parseInt(this.logoutCountdown%60)).slice(-2);
  }
  get idle(){
    return this.appStore.idle;
  }
  set idle(value){
    if (!value) this.stopCountdown();
    else this.appStore.setIdle();
  }

  async logout(){
    this.stopCountdown();
    await authService.logout();
    router.visit("/");
  }

  stopCountdown(){
    if (this.logoutTimer){
      window.clearInterval(this.logoutTimer);
      this.logoutTimer = null;
      this.logoutCountdown = -1;
    }
  }

  startCountdown(){
    this.stopCountdown();
    this.logoutCountdown = this.logoutWait;
    const comp = this;
    this.logoutTimer = window.setInterval(function(){
      comp.logoutCountdown--;
    }, 1000);
  }

  @Watch('idle')
  onIdle(val, oldVal){
    if (val != oldVal){
      if (val && this.isLoggedIn){
        this.startCountdown();
      }else{
        this.stopCountdown();
      }
    }
  }
  @Watch('logoutCountdown')
  onLogoutCountdownTick(val, oldVal){
    if (oldVal > val && val == 0){
      if(this.isLoggedIn) this.logout();
      else this.stopCountdown();
    }
  }
  @Watch('isLoggedIn')
  onAuthChanged(val, oldVal){
    if (val != oldVal && !val){
      this.stopCountdown();
    }
  }
  beforeDestroy(){
    this.stopCountdown();
  }
}
export { IdleOverlay };
export default toNative(IdleOverlay);
</script>
<template>
  <VOverlay v-model="idle" class="full-screen">
    <CenterLayout column="true" class="">
        <h3>Anda akan otomatis logout dalam</h3>
        <h2>{{ logoutCountdownMinutes }}:{{ logoutCountdownSeconds }}</h2>
    </CenterLayout>
  </VOverlay>
  <SharedIdle :idle-wait="idleWait" v-model="idle"/>
</template>
<style scoped>
</style>