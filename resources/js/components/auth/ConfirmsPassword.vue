<script lang="ts">
import { Component, Vue, Ref, toNative, Prop, Emit } from 'vue-facing-decorator';
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VTextField, VBtn } from 'vuetify/components';
import axios from '@/plugins/axios';
import { useForm } from "@inertiajs/vue3";

@Component({
  components: {
    VDialog,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VTextField,
    VBtn,
  },
  emits: ['confirmed']
})
class ConfirmPassword extends Vue {
  @Prop({ type: String }) title;
  @Prop({ type: String }) content;
  @Prop({ type: String }) button;

  confirmingPassword = false;
  formData = useForm({ 
    password: '', 
    error: '', 
    processing: false 
  });
  @Ref('passwordInput') passwordInput;

  async startConfirmingPassword() {
    const response = await axios.get(route('api.password.confirmation'));
    if (response.data.confirmed) {
      this.emitConfirmed();
    } else {
      this.confirmingPassword = true;
      setTimeout(() => this.passwordInput?.focus(), 250);
    }
  }

  @Emit('confirmed')
  emitConfirmed(){ 
    return true;
  }

  async confirmPassword() {
    this.formData.processing = true;
    try {
      await axios.post(route('api.password.confirm'), { 
        password: this.formData.password 
      });
      this.formData.processing = false;
      this.closeModal();
      this.$nextTick(this.emitConfirmed);
    } catch (error) {
      this.formData.processing = false;
      this.formData.error = error.response.data.errors.password[0];
      this.passwordInput.focus();
    }
  }

  closeModal() {
    this.confirmingPassword = false;
    this.formData.password = '';
    this.formData.error = '';
  }
}

export default toNative(ConfirmPassword);
</script>

<template>
  <span>
    <span @click="startConfirmingPassword">
      <slot />
    </span>

    <VDialog v-model="confirmingPassword" persistent max-width="400px">
      <VCard>
        <VCardTitle>{{ title ?? $t('auth.confirm_password_title') }}</VCardTitle>
        <VCardText>
          {{ content ?? $t('auth.confirm_password_text') }}
          <VTextField
            ref="passwordInput"
            v-model="formData.password"
            type="password"
            class="mt-4"
            placeholder="Password"
            autocomplete="current-password"
            @keyup.enter="confirmPassword"
            variant="outlined"
          />
          <p class="text-error mt-2" v-if="formData.error">{{ formData.error }}</p>
        </VCardText>
        <VCardActions>
          <VBtn variant="text" @click="closeModal">{{ $t('form.cancel') }}</VBtn>
          <VBtn color="primary" variant="elevated" :loading="formData.processing" @click="confirmPassword">
            {{ button ?? $t('form.confirm') }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </span>
</template>
