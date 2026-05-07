<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Head, Link } from "@inertiajs/vue3";
import { VMain, VCol, VRow, VContainer, VApp } from "vuetify/components";
import {
  VFadeTransition,
  VSlideYTransition,
  VSlideXTransition,
  VExpandTransition
} from "vuetify/components";
import { useViewBase } from "@/composables/useViewBase";
import { useBusy } from "@/composables/useBusy";

import TopNavBar from "@/components/main/TopNavBar.vue";
import SideNavDrawer from "@/components/main/SideNavDrawer.vue";
import ImageBackground from "@/components/general/ImageBackground.vue";
import LoadingOverlay from "@/components/overlay/LoadingOverlay.vue";
import DialogStack from "@/components/dialog/DialogStack.vue";
import IdleOverlay from "@/components/overlay/IdleOverlay.vue";

import ServerDownView from "@/modules/general/views/ServerDown.vue";
import MainView from "@/views/MainView.vue";

const props = defineProps<{
  title?: string;
}>();

const busyState = useBusy();
const { serverReachable, tabStore, appStore, isLoggedIn } = useViewBase(props);

const appName = import.meta.env.VITE_APP_NAME || "Chirper";
const drawer = ref(false);

function toggleDrawer(val: boolean) {
  drawer.value = val;
}

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
    <Head :title="title" />
    <VExpandTransition appear mode="out-in">
      <TopNavBar appear v-model="drawer" v-if="isLoggedIn" />
    </VExpandTransition>
    <SideNavDrawer :appname="appName" v-model="drawer" v-if="isLoggedIn" />
    <ImageBackground v-if="showBackground"></ImageBackground>
    <VMain>
      <VExpandTransition appear>
        <ServerDownView appear v-if="!serverReachable" key="down" />
        <MainView v-else key="main">
          <slot appear />
        </MainView>
      </VExpandTransition>
    </VMain>
    <IdleOverlay :idle-wait="300" :logout-wait="300" />
    <LoadingOverlay />
    <DialogStack :items="tabDialogs" @dialogstackpop="popTabDialog" />
  </VApp>
</template>
