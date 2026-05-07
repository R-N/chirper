<script setup lang="ts">
import { computed } from "vue";
import ApplicationLogo from "@/components/general/ApplicationLogo.vue";
import { Head, Link } from "@inertiajs/vue3";
import { VApp, VMain, VContainer, VCard, VBtn } from "vuetify/components";
import {
  VFadeTransition,
  VSlideYTransition,
  VSlideXTransition,
  VExpandTransition
} from "vuetify/components";
import { useViewBase } from "@/composables/useViewBase";
import ImageBackground from "@/components/general/ImageBackground.vue";
import LoadingOverlay from "@/components/overlay/LoadingOverlay.vue";
import DialogStack from "@/components/dialog/DialogStack.vue";
import ServerDownView from "@/modules/general/views/ServerDown.vue";

const props = defineProps<{
  title?: string;
  parentBusy?: any;
}>();

const { busy, serverReachable, tabStore } = useViewBase(props);

const breadcrumbs = computed(() => tabStore.breadcrumbs);
const showBackground = computed(() => serverReachable.value);
const tabDialogs = computed(() => tabStore.tabDialogs);

async function popTabDialog() {
  await tabStore.tabDialogs.pop();
}
</script>

<template>
  <VApp>
    <Head :title="title" />
    <ImageBackground v-if="showBackground"></ImageBackground>
    <VMain>
      <VExpandTransition appear>
        <ServerDownView appear v-if="!serverReachable" key="down" />
        <slot appear v-else key="main" />
      </VExpandTransition>
    </VMain>
    <LoadingOverlay />
    <DialogStack :items="tabDialogs" @dialogstackpop="popTabDialog" />
  </VApp>
</template>
