<script lang="ts">
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import InputError from '@/Components/InputError.vue';
import { Head, useForm } from '@inertiajs/vue3';

import { VCard, VCardText, VCardTitle, VTextField, VBtn } from 'vuetify/components';
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import axios from '@/boot/axios'; 
import { router } from '@inertiajs/vue3';

@Component({
  components: {
    AuthenticationCardLogo,
    Head,
    VCard,
    VCardText,
    VCardTitle,
    VTextField,
    VBtn,
    InputError,
  }
})
class ConfirmPasswordPage extends Vue {
  form = useForm({
    password: '',
  });

  @Ref('passwordInput') passwordInput;

  async submit() {
    //await this.form.post(route('password.confirm'));
    let res = await axios.post(route('password.confirm'), this.form);
    this.form.reset();
    this.passwordInput.value.focus();
    router.visit(res.data.redirect || "/login");
  }
}
export default toNative(ConfirmPasswordPage);
</script>

<template>
  <Head title="Secure Area" />

  <div class="d-flex justify-center align-center min-h-screen">
    <VCard elevation="4" class="pa-6" max-width="400">
      <VCardTitle class="text-center">
        <AuthenticationCardLogo />
      </VCardTitle>
      <VCardText>
        <p class="mb-4 text-grey-darken-1">
          This is a secure area of the application. Please confirm your password before continuing.
        </p>
        
        <form @submit.prevent="submit">
          <VTextField
            id="password"
            ref="passwordInput"
            v-model="form.password"
            label="Password"
            type="password"
            variant="outlined"
            required
            autocomplete="current-password"
            :error-messages="form.errors.password"
          />
          
          <div class="d-flex justify-end mt-4">
            <VBtn color="primary" variant="elevated" type="submit" :loading="form.processing">
              Confirm
            </VBtn>
          </div>
        </form>
      </VCardText>
    </VCard>
  </div>
</template>
