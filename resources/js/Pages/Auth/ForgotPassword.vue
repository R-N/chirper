<script lang="ts">
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import InputError from '@/Components/InputError.vue';
import { Head, useForm } from '@inertiajs/vue3';

import { VCard, VCardTitle, VCardText, VCardActions, VTextField, VBtn, VAlert } from 'vuetify/components';

import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import authService from '@/services/user/auth.js'; 
import { router } from '@inertiajs/vue3';

@Component({
  components: {
    AuthenticationCardLogo,
    InputError,
    Head,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VTextField,
    VBtn,
    VAlert
  }
})
class ForgotPasswordPage extends Vue {
  @Prop(String) status;
  form = useForm({
    email: '',
  });

  async submit() {
    let res = await authService.forgotPassword(this.form);
    this.form.reset();
    router.visit(res.redirect || "/login");
  }
}
export default toNative(ForgotPasswordPage);
</script>

<template>
  <Head title="Forgot Password" />

  <div class="d-flex justify-center align-center min-vh-100">
    <VCard class="pa-6" elevation="4" max-width="400">
      <VCardTitle class="text-center">
        <AuthenticationCardLogo />
      </VCardTitle>
      
      <VCardText>
        <p class="text-body-2 mb-4">
          Forgot your password? No problem. Enter your email address and we will send you a password reset link.
        </p>
        <VAlert v-if="status" type="success" dense class="mb-4">
          {{ status }}
        </VAlert>
        <form @submit.prevent="submit">
          <VTextField v-model="form.email" label="Email" type="email" required autofocus autocomplete="username" />
          <InputError class="mt-2" :message="form.errors.email" />
          <VCardActions class="justify-end mt-4">
            <VBtn color="primary" variant="elevated" :loading="form.processing" type="submit">
              Email Password Reset Link
            </VBtn>
          </VCardActions>
        </form>
      </VCardText>
    </VCard>
  </div>
</template>
