<script lang="ts">
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import { VTextField, VCheckbox, VBtn, VCard, VCardText, VCardActions, VContainer, VRow, VCol, VImg, VCardTitle } from 'vuetify/components';
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import authService from '@/services/user/auth.js';
import { router } from '@inertiajs/vue3';

@Component({
  components: {
    AuthenticationCardLogo,
    Head,
    Link,
    VTextField,
    VCheckbox,
    VBtn,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VContainer,
    VRow,
    VCol,
    VImg,
    InputError
  }
})
class LoginPage extends Vue {
  @Prop(Boolean) canResetPassword;
  @Prop(String) status;

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
  <Head title="Log in" />
  <VContainer class="fill-height d-flex flex-column justify-center align-center">
    <AuthenticationCardLogo justify="center" align="center" class="mb-4" />
    <VCard class="d-flex flex-column pa-6">
      <VCardTitle>
        Login
      </VCardTitle>
      <VCardText>
        <div v-if="status" class="mb-4 text-green-600">{{ status }}</div>
        <VTextField v-model="form.email" label="Email" type="email" name="email" autocomplete="email" required autofocus />
        <InputError class="mt-2" :message="form.errors.email" />
        <VTextField v-model="form.password" label="Password" type="password" name="password" autocomplete="current-password" required />
        <InputError class="mt-2" :message="form.errors.password" />
        <VCheckbox v-model="form.remember" label="Remember me" density="compact"/>
      </VCardText>
        
      <VCardActions class="d-flex justify-space-between">
        <Link v-if="canResetPassword" :href="route('password.request')" class="text-sm">Forgot password?</Link>
        <VBtn :loading="form.isSubmitting" @click="login" color="primary" variant="elevated">Log in</VBtn>
      </VCardActions>
    </VCard>
  </VContainer>
</template>
  