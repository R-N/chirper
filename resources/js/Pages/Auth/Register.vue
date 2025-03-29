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
class RegisterPage extends Vue {
  form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
  });
  async register() {
    let res = await authService.register(this.form);
    this.form.reset('password', 'password_confirmation');
    router.visit(res.redirect || "/dashboard");
  }
}
export default toNative(RegisterPage);

</script>
<template>
    <Head title="Register" />
    <VContainer class="fill-height d-flex flex-column justify-center align-center">
      <AuthenticationCardLogo justify="center" align="center" class="mb-4" />
      <VCard class="d-flex flex-column pa-6">
        <VCardTitle>
            Register
        </VCardTitle>
        <VCardText class="d-flex flex-column pa-0 ga-2">
          <VTextField v-model="form.name" label="Name" type="text" name="name" autocomplete="name" required autofocus />
          <InputError class="mt-2" :message="form.errors.name" />
          <VTextField v-model="form.email" label="Email" type="email" name="email"  autocomplete="email" required />
          <InputError class="mt-2" :message="form.errors.email" />
          <VTextField v-model="form.password" label="Password" type="password" name="password" autocomplete="new-password" required />
          <InputError class="mt-2" :message="form.errors.password" />
          <VTextField v-model="form.password_confirmation" label="Confirm Password" type="password" required />
          <InputError class="mt-2" :message="form.errors.password_confirmation" />
  
          <VCheckbox 
            v-if="$page.props.jetstream.hasTermsAndPrivacyPolicyFeature"
            v-model="form.terms"
          >
            <template #label>
              I agree to the
              <Link target="_blank" :href="route('terms.show')" class="text-primary">Terms of Service</Link>
              and
              <Link target="_blank" :href="route('policy.show')" class="text-primary">Privacy Policy</Link>
            </template>
          </VCheckbox>
        </VCardText>
  
        <VCardActions class="d-flex justify-space-between">
          <Link :href="route('login')" class="text-sm">Already registered?</Link>
          <VBtn :loading="form.processing" @click="register" color="primary"  variant="elevated">Register</VBtn>
        </VCardActions>
      </VCard>
    </VContainer>
  </template>
  