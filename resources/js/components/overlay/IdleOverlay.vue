<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from "vue";
import { useAuth } from "@/composables/useAuth";
import SharedIdle from "@/components/general/SharedIdle.vue";
import authService from "@/modules/user/auth/services/auth";
import CenterLayout from "@/components/layout/CenterLayout.vue";
import { router } from "@/plugins/inertia";
import { route } from "../../../../vendor/tightenco/ziggy/src/js/index.js";

const { appStore, isLoggedIn } = useAuth();

const props = defineProps<{
  logoutWait?: number;
  idleWait?: number;
}>();

const logoutCountdown = ref(0);
const logoutTimer = ref<number | null>(null);

const logoutCountdownMinutes = computed(() =>
  ("0" + parseInt(String(logoutCountdown.value / 60))).slice(-2)
);
const logoutCountdownSeconds = computed(() =>
  ("0" + parseInt(String(logoutCountdown.value % 60))).slice(-2)
);

const idle = computed({
  get: () => appStore.idle,
  set: (value) => {
    if (!value) stopCountdown();
    else appStore.setIdle();
  },
});

async function logout() {
  stopCountdown();
  try {
    await authService.logout();
  } catch {
    const { useAuthStore } = await import("@/stores/auth");
    useAuthStore().logout();
  }
  router.visit(route("login"));
}

function stopCountdown() {
  if (logoutTimer.value) {
    window.clearInterval(logoutTimer.value as unknown as number);
    logoutTimer.value = null;
    logoutCountdown.value = -1;
  }
}

function startCountdown() {
  stopCountdown();
  logoutCountdown.value = props.logoutWait!;
  logoutTimer.value = window.setInterval(() => {
    logoutCountdown.value--;
  }, 1000) as unknown as number;
}

watch(idle, (val, oldVal) => {
  if (val != oldVal) {
    if (val && isLoggedIn.value) {
      startCountdown();
    } else {
      stopCountdown();
    }
  }
});

watch(logoutCountdown, (val, oldVal) => {
  if (oldVal > val && val == 0) {
    if (isLoggedIn.value) logout();
    else stopCountdown();
  }
});

watch(isLoggedIn, (val, oldVal) => {
  if (val != oldVal && !val) {
    stopCountdown();
  }
});

onBeforeUnmount(() => {
  stopCountdown();
});
</script>
<template>
  <VOverlay v-model="idle" class="full-screen">
    <CenterLayout column="true" class="">
      <h3>Anda akan otomatis logout dalam</h3>
      <h2>{{ logoutCountdownMinutes }}:{{ logoutCountdownSeconds }}</h2>
    </CenterLayout>
  </VOverlay>
  <SharedIdle :idle-wait="idleWait" v-model="idle" />
</template>
<style scoped></style>
