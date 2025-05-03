<script lang="ts">
import ApplicationLogo from "@/components/general/ApplicationLogo.vue";
import { Head, Link } from "@inertiajs/vue3";
import { Component, Prop, toNative } from "vue-facing-decorator";
import { VApp, VMain, VContainer, VCard, VBtn } from "vuetify/components";
import {
  VFadeTransition,
  VSlideYTransition,
  VSlideXTransition,
  VExpandTransition
} from "vuetify/components";
import { ViewBase } from "@/views/ViewBase.vue";
import ImageBackground from "@/components/general/ImageBackground.vue";
import LoadingOverlay from "@/components/overlay/LoadingOverlay.vue";
import DialogStack from "@/components/dialog/DialogStack.vue";
import ServerDownView from "@/modules/general/views/ServerDown.vue";

@Component({
  components: {
    Head,
    ImageBackground,
    LoadingOverlay,
    DialogStack,
    ServerDownView
  }
})
class GuestLayout extends ViewBase {
  @Prop({ type: String }) title;
  get breadcrumbs() {
    return this.tabStore.breadcrumbs;
  }
  get showBackground() {
    return this.serverReachable;
  }
  get tabDialogs() {
    return this.tabStore.tabDialogs;
  }
  async popTabDialog() {
    await this.tabStore.tabDialogs.pop();
  }
}
export { GuestLayout };
export default toNative(GuestLayout);
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
