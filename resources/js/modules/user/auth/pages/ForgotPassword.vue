<script lang="ts">
import InputError from '@/components/auth/InputError.vue';
import { Head, useForm } from '@inertiajs/vue3';

import { VCard, VCardTitle, VCardText, VCardActions, VTextField, VBtn, VAlert } from 'vuetify/components';

import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import authService from '@/modules/user/auth/services/auth.js'; 
import { router } from '@inertiajs/vue3';
import AuthLayout from '../layouts/Auth.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

@Component({
  components: {
    AuthLayout,
    GuestLayout,
    InputError,
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
  <GuestLayout title="Forgot Password">
    <AuthLayout>
      <VCard class="pa-6" elevation="4" max-width="400">
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
    </AuthLayout>
  </GuestLayout>
</template>
