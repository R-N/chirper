<script lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';

import InputError from '@/components/auth/InputError.vue';
import { VTextField, VCheckbox, VBtn, VCard, VCardText, VCardActions, VContainer, VRow, VCol, VImg, VCardTitle } from 'vuetify/components';
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import authService from '@/modules/user/auth/services/auth.js'; 
import { router } from '@inertiajs/vue3';
import AuthLayout from '../layouts/Auth.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

@Component({
  components: {
    AuthLayout,
    GuestLayout,
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
  <GuestLayout title="Register">
    <AuthLayout>
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
    </AuthLayout>
  </GuestLayout>
</template>
  