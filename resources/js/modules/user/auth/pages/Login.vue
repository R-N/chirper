<script setup lang="ts">
import LoginView from "@/modules/user/auth/views/login.vue";
import GuestLayout from "@/layouts/GuestLayout.vue";
import { useViewBase } from "@/composables/useViewBase";

const props = defineProps<{
  canResetPassword?: boolean;
  status?: string;
}>();
const {} = useViewBase(props);
</script>

<template>
  <GuestLayout :title="$t('auth.login')">
    <LoginView appear />
  </GuestLayout>
</template>
