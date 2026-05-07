<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";

const { appStore } = useAuth();

const props = withDefaults(defineProps<{
  icon?: boolean;
  large?: boolean;
}>(), {
  icon: true,
  large: true,
});

async function refresh() {
  appStore.setRouterBusy(true);
  if (!appStore.globalBusy && !appStore.authBusy) {
    window.location.reload();
  } else {
    appStore.setAuthBusy(false);
    appStore.setGlobalBusy(false);
    appStore.setGlobalRefresh(true);
  }
}
</script>
<template>
	<VBtn :icon="icon" :large="large" @click.stop="refresh">
		<slot><VIcon>fa-redo</VIcon></slot>
	</VBtn>
</template>
