<script lang="ts">
import { router, useForm, usePage } from '@inertiajs/vue3';
import ActionSection from '@/components/auth/ActionSection.vue';
import ConfirmsPassword from '@/components/auth/ConfirmsPassword.vue';
import InputError from '@/components/auth/InputError.vue';

import { VRow, VCol, VTextField, VBtn, VAlert, VCard, VCardText } from 'vuetify/components';
import { Component, Prop, Vue, toNative, Ref, Watch } from 'vue-facing-decorator';
import twoFactorAuthService from '@/modules/user/auth/services/twofactor.js';
import profileService from '@/modules/user/profile/services/profile';

@Component({
  components: {
    ActionSection,
    InputError,
    ConfirmsPassword,
    VRow,
    VCol,
    VTextField,
    VBtn,
    VAlert,
    VCard,
    VCardText,
  }
})
class TwoFactorAuthenticationForm extends Vue {
  @Prop({ type: Boolean }) requiresConfirmation;
  page = usePage();
  enabling = false;
  confirming = false;
  disabling = false;
  qrCode = null;
  setupKey = null;
  recoveryCodes = [];
  confirmationForm = useForm({
    code: '',
  });

  get twoFactorEnabled(){
    return !this.enabling && this.page.props.auth.user?.two_factor_enabled;
  };

  @Watch("twoFactorEnabled")
  twoFactorEnabledWatcher(newValue, oldValue) {
    if (!newValue) {
      this.confirmationForm.reset();
      this.confirmationForm.clearErrors();
    }
  }
  async enableTwoFactorAuthentication(){
    this.enabling = true;
    try{
      let res = await twoFactorAuthService.enableTwoFactorAuthentication();
      this.qrCode = res.qrCode;
      this.setupKey = res.setupKey;
      this.recoveryCodes = res.recoveryCodes;
    } finally {
      this.enabling = false;
      this.confirming = this.requiresConfirmation;
    }
  };


  async showRecoveryCodes(){
    let res = await twoFactorAuthService.showRecoveryCodes();
    this.recoveryCodes = res;
  };

  async confirmTwoFactorAuthentication(){
    try{
      let res = await twoFactorAuthService.confirmTwoFactorAuthentication(this.confirmationForm);
      this.confirming = false;
      this.qrCode = null;
      this.setupKey = null;
    } catch (error) {
      if (error.response?.status === 422) {
        this.confirmationForm.errors = error.response.data.errors;
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  async regenerateRecoveryCodes(){
    let res = await twoFactorAuthService.regenerateRecoveryCodes();
  };

  async disableTwoFactorAuthentication(){
    this.disabling = true;

    let res = await twoFactorAuthService.disableTwoFactorAuthentication();
    this.disabling = false;
    this.confirming = false;
  };
}
export default toNative(TwoFactorAuthenticationForm);
</script>

<template>
  <ActionSection>
    <template #title>{{ $t('two_factor.title') }}</template>
    <template #description>{{ $t('two_factor.desc') }}</template>

    <template #content>
      <VAlert 
        v-if="twoFactorEnabled && !confirming" 
        type="success"
        :title="$t('two_factor.enabled')"
      >
      </VAlert>
      <VAlert 
        v-else-if="twoFactorEnabled && confirming" 
        type="info"
        :title="$t('two_factor.enabling')"
      ></VAlert>
      <VAlert 
        v-else 
        type="warning"
        :title="$t('two_factor.disabled')"
      ></VAlert>
      <p class="text-body-1 mt-2 mb-2">
        {{ $t('two_factor.info') }}
      </p>

      <VCard v-if="qrCode" class="mt-4 pa-4">
        <VCardText>
          <p v-if="confirming">
            {{ $t('two_factor.enabling_scan') }}
          </p>
          <p v-else>{{ $t('two_factor.enabled_scan') }}</p>
        </VCardText>
        <div class="text-center" v-html="qrCode"></div>
        <VCardText v-if="setupKey">
          <strong>{{ $t('two_factor.setup_key') }}:</strong> {{ setupKey }}
        </VCardText>
        <VRow v-if="confirming" class="mt-4">
          <VCol cols="12">
            <VTextField v-model="confirmationForm.code" label="Code" autofocus @keyup.enter="confirmTwoFactorAuthentication" />
            <InputError :message="confirmationForm.errors.code" />
          </VCol>
        </VRow>
      </VCard>

      <VCard v-if="recoveryCodes.length > 0 && !confirming" class="mt-4 pa-4">
        <VCardText>
          <p>{{ $t('two_factor.recovery_code_info') }}</p>
          <div class="bg-gray-100 dark:bg-gray-900 rounded-lg pa-4">
            <div v-for="code in recoveryCodes" :key="code">{{ code }}</div>
          </div>
        </VCardText>
      </VCard>

      <div class="mt-5">
        <ConfirmsPassword @confirmed="enableTwoFactorAuthentication" v-if="!twoFactorEnabled">
          <VBtn color="primary" variant="elevated" :disabled="enabling">{{ $t('crud.enable') }}</VBtn>
        </ConfirmsPassword>

        <template v-else>
          <ConfirmsPassword @confirmed="confirmTwoFactorAuthentication" v-if="confirming">
            <VBtn color="primary" class="me-3" :disabled="enabling">{{ $t('form.confirm') }}</VBtn>
          </ConfirmsPassword>
          
          <ConfirmsPassword @confirmed="regenerateRecoveryCodes" v-if="recoveryCodes.length > 0 && !confirming">
            <VBtn class="me-3">{{ $t('two_factor.regenerate_recovery_code') }}</VBtn>
          </ConfirmsPassword>

          <ConfirmsPassword @confirmed="showRecoveryCodes" v-if="recoveryCodes.length === 0 && !confirming">
            <VBtn class="me-3">{{ $t('two_factor.show_recovery_code') }}</VBtn>
          </ConfirmsPassword>

          <ConfirmsPassword @confirmed="disableTwoFactorAuthentication">
            <VBtn color="error" :disabled="disabling">{{ $t('crud.disable') }}</VBtn>
          </ConfirmsPassword>
        </template>
      </div>
    </template>
  </ActionSection>
</template>
