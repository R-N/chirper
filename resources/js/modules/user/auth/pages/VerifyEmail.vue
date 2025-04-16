<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import AuthLayout from '../layouts/Auth.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';
import {BaseView} from '@/views/BaseView.vue';
import VerifyEmailForm from '../forms/VerifyEmail.vue';

@Component({
  components: {
    AuthLayout,
    GuestLayout,
    VerifyEmailForm
  }
})
class VerifyEmailPage extends BaseView {
  @Prop({ type: String }) status;
}
export default toNative(VerifyEmailPage);
</script>

<template>
  <GuestLayout title="Email Verification">
    <AuthLayout>
      <VerifyEmailForm :status="status" />
    </AuthLayout>
  </GuestLayout>
</template>
