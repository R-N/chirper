<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useViewBase } from "@/composables/useViewBase";
import { useBusy } from "@/composables/useBusy";

import { VApp, VMain, VContainer } from "vuetify/components";
import { VExpandTransition, VSlideYTransition } from "vuetify/components";

import TopNavBar from "@/components/main/TopNavBar.vue";
import SideNavDrawer from "@/components/main/SideNavDrawer.vue";
import ImageBackground from "@/components/general/ImageBackground.vue";
import LoadingOverlay from "@/components/overlay/LoadingOverlay.vue";
import DialogStack from "@/components/dialog/DialogStack.vue";
import IdleOverlay from "@/components/overlay/IdleOverlay.vue";
import ServerDownView from "@/modules/general/views/ServerDown.vue";
import MainView from "@/views/MainView.vue";

import { RouterView } from "vue-router";

const appName = import.meta.env.VITE_APP_NAME || "Chirper";
const drawer = ref(false);

const busyState = useBusy();
const { serverReachable, tabStore, appStore, isLoggedIn } = useViewBase({});

const globalRefresh = computed(() => appStore.globalRefresh);
const globalLogout = computed(() => appStore.globalLogout);
const showBackground = computed(() => serverReachable.value);
const tabDialogs = computed(() => tabStore.tabDialogs);
const breadcrumbs = computed(() => tabStore.breadcrumbs);

watch(globalRefresh, (val) => {
  if (val) {
    busyState.start();
    appStore.globalRefresh = false;
    window.location.reload();
  }
});

watch(globalLogout, (val) => {
  if (val) {
    appStore.globalLogout = false;
  }
});

async function popTabDialog() {
  await tabStore.tabDialogs.pop();
}
</script>
<template>
  <VApp class="d-flex">
    <VExpandTransition appear mode="out-in">
      <TopNavBar appear v-model="drawer" v-if="isLoggedIn" :app-name="appName" />
    </VExpandTransition>
    <SideNavDrawer :appname="appName" v-model="drawer" v-if="isLoggedIn" />
    <ImageBackground v-if="showBackground"></ImageBackground>
    <VMain>
      <VExpandTransition appear>
        <ServerDownView appear v-if="!serverReachable" key="down" />
        <MainView v-else key="main">
          <VContainer>
            <RouterView />
          </VContainer>
        </MainView>
      </VExpandTransition>
    </VMain>
    <IdleOverlay :idle-wait="300" :logout-wait="300" />
    <LoadingOverlay />
    <DialogStack :items="tabDialogs" @dialogstackpop="popTabDialog" />
  </VApp>
</template>
