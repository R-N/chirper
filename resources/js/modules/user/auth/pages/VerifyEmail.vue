<script setup lang="ts">
import AuthLayout from "../layouts/Auth.vue";
import GuestLayout from "@/layouts/GuestLayout.vue";
import VerifyEmailForm from "../forms/VerifyEmail.vue";
import { useViewBase } from "@/composables/useViewBase";

const props = defineProps<{
  status?: string;
}>();
const {} = useViewBase(props);
</script>

<template>
  <GuestLayout :title="$t('verify_email.title')">
    <AuthLayout>
      <VerifyEmailForm :status="status" />
    </AuthLayout>
  </GuestLayout>
</template>
