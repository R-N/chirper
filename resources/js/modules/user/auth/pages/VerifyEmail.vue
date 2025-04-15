<script lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';

import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import { VCard, VCardTitle, VCardText, VCardActions, VBtn, VRow, VCol } from 'vuetify/components';
import authService from '@/modules/user/auth/services/auth.js'; 
import { router } from '@inertiajs/vue3';
import AuthLayout from '../layouts/Auth.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

@Component({
  components: {
    AuthLayout,
    GuestLayout,
    Head,
    Link,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VBtn,
    VRow,
    VCol,
  }
})
class VerifyEmailPage extends Vue {
  @Prop({ type: String }) status;
  form = useForm({
    //email: '',
  });

  get verificationLinkSent(){
    return this.status === 'verification-link-sent';
  }

  async submit() {
    let res = await authService.verifyEmail(this.form);
    router.visit(res.redirect || "/login");
  }
}
export default toNative(VerifyEmailPage);
</script>

<template>
  <GuestLayout title="Email Verification">
    <AuthLayout>
      <VCard class="pa-6" elevation="4">

        <VCardText class="text-secondary text-sm">
          Before continuing, could you verify your email address by clicking on the link we just emailed to you? 
          If you didn't receive the email, we will gladly send you another.
        </VCardText>

        <VCardText v-if="verificationLinkSent" class="font-medium text-green">
          A new verification link has been sent to the email address you provided in your profile settings.
        </VCardText>

        <VCardActions class="mt-4 d-flex justify-space-between">
          <VBtn color="primary" :loading="form.processing" @click.prevent="submit">
            Resend Verification Email
          </VBtn>

          <div>
            <VBtn variant="text" :href="route('profile.show')">
              Edit Profile
            </VBtn>

            <VBtn variant="text" :href="route('logout')" method="post" as="button" class="ms-2">
              Log Out
            </VBtn>
          </div>
        </VCardActions>
      </VCard>
    </AuthLayout>
  </GuestLayout>
</template>
