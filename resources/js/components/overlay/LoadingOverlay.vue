<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useBusy } from "@/composables/useBusy";
import RefreshButton from "@/components/general/RefreshButton.vue";
import CenterLayout from "@/components/layout/CenterLayout.vue";

const props = defineProps({
  circleSizeRefresh: { default: 96 },
  circleSizeNormal: { default: 64 },
  mayRefreshWait: { default: 5 },
});

const { busy } = useBusy();

const mayRefresh = ref(false);
const mayRefreshTimer = ref(null);

const mayRefreshWaitMillis = computed(() => props.mayRefreshWait * 1000);
const circleSize = computed(() => mayRefresh.value ? props.circleSizeRefresh : props.circleSizeNormal);

function setTimer(busyVal) {
  if (mayRefreshTimer.value) window.clearTimeout(mayRefreshTimer.value);
  if (busyVal) {
    mayRefreshTimer.value = window.setTimeout(function () {
      mayRefresh.value = true;
    }, mayRefreshWaitMillis.value);
  } else {
    mayRefreshTimer.value = null;
    mayRefresh.value = false;
  }
}

onMounted(() => {
  setTimer(busy.value);
});

watch(() => busy.value, (val, oldVal) => {
  if (val != oldVal) {
    setTimer(val);
  }
});
</script>
<template>
  <VOverlay v-model="busy" class="full-screen">
    <CenterLayout column="true">
      <VProgressCircular indeterminate :size="circleSize">
        <RefreshButton icon large v-if="mayRefresh" />
      </VProgressCircular>
    </CenterLayout>
  </VOverlay>
</template>
<style scoped></style>
