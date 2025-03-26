<script lang="ts">
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

import { VTextField, VCheckbox, VBtn, VCard, VCardText, VCardActions, VContainer, VRow, VCol, VImg, VCardTitle } from 'vuetify/components';
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import axios from '@/boot/axios'; 
import { router } from '@inertiajs/vue3';
import { useAuthStore } from '@/Stores/auth';

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
    const authStore = useAuthStore();
    //await this.form.post(route('register'));
    let res = await axios.post("/register", this.form);
    this.form.reset('password', 'password_confirmation');
    authStore.updateUser(res.data.user);
    authStore.setAuthToken(res.data.auth_token);
    router.visit(res.data.redirect || "/dashboard");
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
          <VTextField v-model="form.email" label="Email" type="email" name="email"  autocomplete="email" required />
          <VTextField v-model="form.password" label="Password" type="password" name="password" autocomplete="new-password" required />
          <VTextField v-model="form.password_confirmation" label="Confirm Password" type="password" required />
  
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
  