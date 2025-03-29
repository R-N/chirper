<script lang="ts">
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import { VCard, VCardTitle, VCardText, VCardActions, VBtn, VRow, VCol } from 'vuetify/components';
import authService from '@/services/user/auth.js'; 
import { router } from '@inertiajs/vue3';

@Component({
  components: {
    AuthenticationCardLogo,
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
  @Prop(String) status;
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
    <Head title="Email Verification" />
  
    <VRow justify="center">
      <VCol cols="12" sm="8" md="6" lg="4">
        <VCard class="pa-6" elevation="4">
          <VCardTitle class="text-center">
            <AuthenticationCardLogo />
          </VCardTitle>
  
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
      </VCol>
    </VRow>
  </template>
