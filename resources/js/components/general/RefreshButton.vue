<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { useBusy } from "@/composables/useBusy";

const appStore = useAppStore();
const busy = useBusy();

const props = withDefaults(defineProps<{
  icon?: boolean;
  large?: boolean;
}>(), {
  icon: true,
  large: true,
});

function refresh() {
  if (!busy.value) {
    window.location.reload();
  } else {
    appStore.globalRefresh = true;
  }
}
</script>
<template>
	<VBtn :icon="icon" :large="large" @click.stop="refresh">
		<slot><VIcon>fa-redo</VIcon></slot>
	</VBtn>
</template>
