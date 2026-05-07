<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useAuth } from "@/composables/useAuth";

const { appStore } = useAuth();

const props = defineProps<{
  idleWait?: number;
  modelValue?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "update:idle": [value: boolean];
  change: [value: boolean];
}>();

const syncedIdle = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const idleTimer = ref<number | null>(null);

const idleWaitMillis = computed(() => props.idleWait * 1000);

const sharedUserPresent = computed(() => appStore.userPresent);

watch(sharedUserPresent, (val, oldVal) => {
  if (val != oldVal && val && syncedIdle.value) {
    syncedIdle.value = false;
  }
});

onMounted(() => {
  idleTimer.value = window.setInterval(() => {
    if (
      appStore.getIdleTime() >= idleWaitMillis.value &&
      !syncedIdle.value
    ) {
      syncedIdle.value = true;
    }
  }, 1000) as unknown as number;
});

onBeforeUnmount(() => {
  if (idleTimer.value) {
    window.clearInterval(idleTimer.value as unknown as number);
    idleTimer.value = null;
  }
});
</script>
<template>
  <div></div>
</template>
<style scoped></style>
