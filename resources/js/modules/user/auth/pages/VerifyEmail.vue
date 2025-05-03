<script lang="ts">
import { Component, Prop, Vue, toNative } from "vue-facing-decorator";
import AuthLayout from "../layouts/Auth.vue";
import GuestLayout from "@/layouts/GuestLayout.vue";
import { ViewBase } from "@/views/ViewBase.vue";
import VerifyEmailForm from "../forms/VerifyEmail.vue";

@Component({
  components: {
    AuthLayout,
    GuestLayout,
    VerifyEmailForm
  }
})
class VerifyEmailPage extends ViewBase {
  @Prop({ type: String }) status;
}
export default toNative(VerifyEmailPage);
</script>

<template>
  <GuestLayout :title="$t('verify_email.title')">
    <AuthLayout>
      <VerifyEmailForm :status="status" />
    </AuthLayout>
  </GuestLayout>
</template>
