<script lang="ts">
import AuthenticationCardLogo from '@/components/auth/AuthenticationCardLogo.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

import InputError from '@/components/auth/InputError.vue';
import { VTextField, VCheckbox, VBtn, VCard, VCardText, VCardActions, VContainer, VRow, VCol, VImg, VCardTitle } from 'vuetify/components';
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import authService from '@/modules/user/auth/services/auth.js';
import { router } from '@inertiajs/vue3';
import LoginView from '@/modules/user/auth/views/login.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';
import {ViewBase} from '@/views/ViewBase.vue';

@Component({
  components: {
    LoginView,
    GuestLayout
  }
})
class LoginPage extends ViewBase {
  @Prop({ type: Boolean }) canResetPassword;
  @Prop({ type: String }) status;

  form = useForm({
      email: '',
      password: '',
      remember: false,
  });

  async login() {
    let res = await authService.login(this.form);
    this.form.reset('password');
    router.visit(res.redirect || "/dashboard");
  }
}
export default toNative(LoginPage);
</script>

<template>
  <GuestLayout :title="$t('auth.login')">
      <LoginView appear />
  </GuestLayout>
</template>
  