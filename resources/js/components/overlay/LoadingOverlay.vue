<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useBusy } from "@/composables/useBusy";
import { useAuth } from "@/composables/useAuth";
import RefreshButton from "@/components/general/RefreshButton.vue";
import CenterLayout from "@/components/layout/CenterLayout.vue";
import authService from "@/modules/user/auth/services/auth";

const props = defineProps({
  circleSizeRefresh: { default: 96 },
  circleSizeNormal: { default: 64 },
  mayRefreshWait: { default: 5 },
  sessionExpiredWait: { default: 30 },
});

const { busy } = useBusy();
const { isLoggedIn } = useAuth();

const mayRefresh = ref(false);
const mayRefreshTimer = ref(null);
const sessionExpired = ref(false);
const sessionExpiredTimer = ref(null);

const mayRefreshWaitMillis = computed(() => props.mayRefreshWait * 1000);
const sessionExpiredWaitMillis = computed(() => props.sessionExpiredWait * 1000);
const circleSize = computed(() => mayRefresh.value ? props.circleSizeRefresh : props.circleSizeNormal);

function clearTimers() {
  if (mayRefreshTimer.value) window.clearTimeout(mayRefreshTimer.value);
  if (sessionExpiredTimer.value) window.clearTimeout(sessionExpiredTimer.value);
  mayRefreshTimer.value = null;
  sessionExpiredTimer.value = null;
}

function setTimers(busyVal) {
  clearTimers();
  mayRefresh.value = false;
  sessionExpired.value = false;
  if (busyVal) {
    mayRefreshTimer.value = window.setTimeout(() => {
      mayRefresh.value = true;
    }, mayRefreshWaitMillis.value);
    sessionExpiredTimer.value = window.setTimeout(() => {
      sessionExpired.value = true;
    }, sessionExpiredWaitMillis.value);
  }
}

async function handleLogout() {
  try { await authService.logout(); } catch {}
  window.location.href = "/login";
}

onMounted(() => {
  setTimers(busy.value);
});

watch(() => busy.value, (val) => {
  setTimers(val);
});
</script>
<template>
  <VOverlay v-model="busy" class="full-screen">
    <CenterLayout column="true">
      <VProgressCircular indeterminate :size="circleSize">
        <RefreshButton icon large v-if="mayRefresh && !sessionExpired" />
        <VBtn
          v-if="sessionExpired"
          icon="mdi-logout"
          size="large"
          variant="plain"
          @click="handleLogout"
        />
      </VProgressCircular>
      <div v-if="sessionExpired" class="text-center mt-4">
        <p class="text-body-1 mb-2">Session may have expired</p>
        <VBtn
          color="primary"
          variant="outlined"
          @click="handleLogout"
        >
          Return to login
        </VBtn>
      </div>
    </CenterLayout>
  </VOverlay>
</template>
<style scoped></style>
