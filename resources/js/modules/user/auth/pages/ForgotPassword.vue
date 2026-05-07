<script setup lang="ts">
import AuthLayout from "../layouts/Auth.vue";
import GuestLayout from "@/layouts/GuestLayout.vue";
import ForgotPasswordForm from "../forms/ForgotPassword.vue";
import { useViewBase } from "@/composables/useViewBase";

const props = defineProps<{
  status?: string;
}>();
const {} = useViewBase(props);
</script>

<template>
  <GuestLayout :title="$t('password_reset.title')">
    <AuthLayout>
      <ForgotPasswordForm :status="status" />
    </AuthLayout>
  </GuestLayout>
</template>
