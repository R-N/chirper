<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import AuthLayout from '../layouts/Auth.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';
import ForgotPasswordForm from '../forms/ForgotPassword.vue';
import {BaseView} from '@/views/BaseView.vue';

@Component({
  components: {
    AuthLayout,
    GuestLayout,
    ForgotPasswordForm
  }
})
class ForgotPasswordPage extends BaseView {
  @Prop({ type: String }) status;
}
export default toNative(ForgotPasswordPage);
</script>

<template>
  <GuestLayout title="Forgot Password">
    <AuthLayout>
      <ForgotPasswordForm :status="status" />
    </AuthLayout>
  </GuestLayout>
</template>
