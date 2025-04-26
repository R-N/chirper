<script lang="ts">
import { nextTick } from 'vue';
import { Head, useForm } from '@inertiajs/vue3';
import { VCard, VCardText, VCardTitle, VCardActions, VTextField, VLabel, VBtn, VSpacer } from 'vuetify/components';
import { Component, Prop, Vue, toNative, Ref } from 'vue-facing-decorator';
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
    VCardActions,
    VTextField,
    VLabel,
    VBtn,
    VSpacer,
    Head,
  }
})
class TwoFactorChallengePage extends ViewBase {
  recovery = false;

  form = useForm({
    code: '',
    recovery_code: '',
  });

  @Ref('recoveryCodeInput') recoveryCodeInput;
  @Ref('codeInput') codeInput;

  async toggleRecovery(){
    this.recovery = !this.recovery;

    await nextTick();

    if (this.recovery) {
      this.recoveryCodeInput.value.focus();
      this.form.code = '';
    } else {
      this.codeInput.value.focus();
      this.form.recovery_code = '';
    }
  };

  async submit() {
    let res = await authService.twoFactorLogin(this.form);
    router.visit(res.redirect || "/dashboard");
  }
}
export default toNative(TwoFactorChallengePage);


</script>

<template>
  <GuestLayout title="Two-factor Confirmation">
    <AuthLayout>
      <VCard class="mx-auto" max-width="400" variant="elevated" elevation="6">
        <VCardText class="text-gray-600 dark:text-gray-400">
          <template v-if="!recovery">
            {{ $t('two_factor.checkpoint') }}
          </template>
          <template v-else>
            {{ $t('two_factor.checkpoint_recovery') }}
          </template>
        </VCardText>
        
        <VCardText>
          <form @submit.prevent="submit">
            <div v-if="!recovery">
              <VLabel for="code">{{ $t('two_factor.code') }}</VLabel>
              <VTextField
                id="code"
                ref="codeInput"
                v-model="form.code"
                type="text"
                inputmode="numeric"
                variant="outlined"
                autocomplete="one-time-code"
                autofocus
                :error-messages="form.errors.code"
              />
            </div>
            
            <div v-else>
              <VLabel for="recovery_code">{{ $t('two_factor.recovery_code') }}</VLabel>
              <VTextField
                id="recovery_code"
                ref="recoveryCodeInput"
                v-model="form.recovery_code"
                type="text"
                variant="outlined"
                autocomplete="one-time-code"
                :error-messages="form.errors.recovery_code"
              />
            </div>
          </form>
        </VCardText>
        
        <VCardActions class="d-flex justify-end">
          <VBtn variant="text" @click.prevent="toggleRecovery">
            <template v-if="!recovery">{{ $t('two_factor.recovery') }}</template>
            <template v-else>{{ $t('two_factor.auth') }}</template>
          </VBtn>
          <VSpacer />
          <VBtn color="primary" variant="elevated" :loading="form.processing" @click="submit">
            {{ $t('auth.login') }}
          </VBtn>
        </VCardActions>
      </VCard>
    </AuthLayout>
  </GuestLayout>
</template>
