<script lang="ts">
import InputError from '@/components/auth/InputError.vue';
import { Head, useForm } from '@inertiajs/vue3';

import { VCard, VCardTitle, VCardText, VCardActions, VTextField, VBtn } from 'vuetify/components';
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import authService from '@/modules/user/auth/services/auth.js'; 
import { router } from '@inertiajs/vue3';
import AuthLayout from '../layouts/Auth.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';
import {BaseView} from '@/views/BaseView.vue';

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
  }
})
class ResetPasswordPage extends BaseView {
  @Prop({ type: String }) email;
  @Prop({ type: String }) token;

  form = useForm({
    token: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  mounted(){
    this.form.token = this.token;
    this.form.email = this.email;
  }

  async submit() {
    let res = await authService.resetPassword(this.form);
    this.form.reset('password', 'password_confirmation');
    router.visit(res.redirect || "/login");
  }
}
export default toNative(ResetPasswordPage);
</script>

<template>
  <GuestLayout title="Reset Password">
    <AuthLayout>
      <VCard class="mx-auto my-10" max-width="400" elevation="10">
        <VCardText>
          <p class="text-body-2 mb-4">
              This also verifies your email, if you haven't.
          </p>
          <VTextField id="email" v-model="form.email" label="Email" type="email" required autofocus autocomplete="username" />
          <InputError :message="form.errors.email" class="mt-2" />

          <VTextField id="password" v-model="form.password" label="Password" type="password" required autocomplete="new-password" class="mt-4" />
          <InputError :message="form.errors.password" class="mt-2" />

          <VTextField id="password_confirmation" v-model="form.password_confirmation" label="Confirm Password" type="password" required autocomplete="new-password" class="mt-4" />
          <InputError :message="form.errors.password_confirmation" class="mt-2" />
        </VCardText>
        <VCardActions class="justify-end">
          <VBtn color="primary" variant="elevated" :loading="form.processing" @click="submit">
            Reset Password
          </VBtn>
        </VCardActions>
      </VCard>
    </AuthLayout>
  </GuestLayout>
</template>
