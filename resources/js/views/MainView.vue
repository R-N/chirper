<script setup lang="ts">
import { ref, computed } from "vue";
import { useViewBase } from "@/composables/useViewBase";

import {
  VFadeTransition,
  VSlideYTransition,
  VSlideXTransition,
  VExpandTransition
} from "vuetify/components";
import LoginView from "@/modules/user/auth/views/Login.vue";

const props = defineProps<{
  parentBusy?: any;
}>();

const { busy, tabStore, isLoggedIn, serverReachable } = useViewBase(props);

const transitionDuration = {
  enter: 300,
  leave: 300
};
const transitionDelay = {
  enter: 300,
  leave: 0
};

const breadcrumbs = computed(() => tabStore.breadcrumbs);
</script>
<template>
  <VExpandTransition appear class="fill-height">
    <LoginView appear v-if="!isLoggedIn" key="login" />
    <VContainer
      appear
      class="d-flex flex-column"
      align="start"
      justify="start"
      key="main"
      v-else
    >
      <VSlideYTransition appear :duration="transitionDuration">
        <VContainer v-if="serverReachable && breadcrumbs && breadcrumbs.length">
          <VAlert color="bg-secondary" text>
            <VBreadcrumbs class="py-0" :items="breadcrumbs" large>
              <template v-slot:divider>
                <VIcon>mdi-chevron-right</VIcon>
              </template>
            </VBreadcrumbs>
          </VAlert>
        </VContainer>
      </VSlideYTransition>
      <VSlideYTransition group appear :duration="transitionDuration">
        <slot appear key="main" />
      </VSlideYTransition>
      <VSpacer></VSpacer>
    </VContainer>
  </VExpandTransition>
</template>
