<script lang="ts">
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import InputError from '@/Components/InputError.vue';
import { Head, useForm } from '@inertiajs/vue3';

import { VCard, VCardTitle, VCardText, VCardActions, VTextField, VBtn } from 'vuetify/components';
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
  }
})
class ResetPasswordPage extends Vue {
  @Prop(String) email;
  @Prop(String) token;

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
  <Head title="Reset Password" />

  <VCard class="mx-auto my-10" max-width="400" elevation="10">
    <VCardTitle class="text-center">
      <AuthenticationCardLogo />
    </VCardTitle>
    <VCardText>
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
</template>
