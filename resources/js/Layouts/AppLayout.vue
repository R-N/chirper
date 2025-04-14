<script lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { VMain, VCol, VRow, VContainer, VApp  } from 'vuetify/components';
import { VFadeTransition, VSlideYTransition, VSlideXTransition, VExpandTransition } from 'vuetify/components';
import { Component, Prop, Vue, toNative, Watch } from 'vue-facing-decorator';
import {GuestLayout} from '@/layouts/GuestLayout.vue';

import TopNavBar from "@/components/main/TopNavBar.vue";
import SideNavDrawer from "@/components/main/SideNavDrawer.vue";
import ImageBackground from '@/components/general/ImageBackground.vue'
import LoadingOverlay from '@/components/overlay/LoadingOverlay.vue';
import DialogStack from '@/components/dialog/DialogStack.vue';
import IdleOverlay from '@/components/overlay/IdleOverlay.vue';

import ServerDownView from '@/modules/general/views/ServerDown.vue';
import MainView from '@/views/MainView.vue'

@Component({
  components: {
    TopNavBar,
    SideNavDrawer,
    ImageBackground,
    LoadingOverlay,
    DialogStack,
    IdleOverlay,
    ServerDownView,
    MainView,
    Head,
  }
})
class AppLayout extends GuestLayout {
  appName = import.meta.env.VITE_APP_NAME || 'Chirper';
  drawer = false;
  toggleDrawer(drawer){
    this.drawer = drawer;
  }
  get globalRefresh(){
    return this.appStore.globalRefresh;
  }
  get globalLogout(){
    return this.appStore.globalLogout;
  }
  @Watch('globalRefresh')
  onGlobalRefreshFlagSet(val, oldVal){
    if(val){
      this.appStore.routerBusy = true;
      this.appStore.globalRefresh = false;
      window.location.reload();
    }
  }

  @Watch('globalLogout')
  onGlobalLogoutFlagSet(val, oldVal){
    if(val){
      this.appStore.globalLogout = false;
      // router.safePush({ name: "beranda" });
    }
  }
}
export default toNative(AppLayout);
</script>
<template>
  <VApp>
    <Head :title="title" />
    <VExpandTransition appear mode="out-in">
      <TopNavBar appear :drawer="drawer" @update:drawer="toggleDrawer" v-if="isLoggedIn"/>
    </VExpandTransition>
    <SideNavDrawer :appname="appName" :drawer="drawer" @update:drawer="toggleDrawer" v-if="isLoggedIn"/>
    <ImageBackground v-if="showBackground"></ImageBackground>
    <VMain>
      <VExpandTransition appear >
        <ServerDownView appear v-if="!serverReachable" key="down"/>
        <MainView v-else key="main">
          <slot appear />
        </MainView>
      </VExpandTransition>
    </VMain>
    <IdleOverlay :idle-wait="300" :logout-wait="300"/>
    <LoadingOverlay/>
    <DialogStack :items="tabDialogs" @dialogstackpop="popTabDialog"/>
  </VApp>
</template>
