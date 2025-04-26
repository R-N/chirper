<script lang="ts">
import { Head, useForm } from '@inertiajs/vue3';

import { VCard, VCardText, VCardTitle, VTextField, VBtn } from 'vuetify/components';
import { Component, Prop, Vue, Ref, toNative } from 'vue-facing-decorator';
import authService from '@/modules/user/auth/services/auth.js';
import { router } from '@inertiajs/vue3';
import AuthLayout from '../layouts/Auth.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';
import {ViewBase} from '@/views/ViewBase.vue';

@Component({
  components: {
    AuthLayout,
    GuestLayout,
    VCard,
    VCardText,
    VCardTitle,
    VTextField,
    VBtn,
  }
})
class ConfirmPasswordPage extends ViewBase {
  form = useForm({
    password: '',
  });

  @Ref('passwordInput') passwordInput;

  async submit() {
    let res = await authService.confirmPassword(this.form);
    this.form.reset();
    this.passwordInput.value.focus();
    router.visit(res.redirect || "/login");
  }
}
export default toNative(ConfirmPasswordPage);
</script>

<template>
  <GuestLayout title="Secure Area">
    <AuthLayout>
      <VCard elevation="4" class="pa-6" max-width="400">
        <VCardText>
          <p class="mb-4 text-grey-darken-1">
            {{ $t('auth.password_checkpoint') }}
          </p>
          
          <form @submit.prevent="submit">
            <VTextField
              id="password"
              ref="passwordInput"
              v-model="form.password"
              :label="$t('auth.password')"
              type="password"
              variant="outlined"
              required
              autocomplete="current-password"
              :error-messages="form.errors.password"
            />
            
            <div class="d-flex justify-end mt-4">
              <VBtn color="primary" variant="elevated" type="submit" :loading="form.processing">
                {{ $t('form.confirm') }}
              </VBtn>
            </div>
          </form>
        </VCardText>
      </VCard>
    </AuthLayout>
  </GuestLayout>
</template>
