<script lang="ts">
import { Component, Vue, Ref, toNative, Prop } from 'vue-facing-decorator';
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VTextField, VBtn } from 'vuetify/components';
import axios from '@/boot/axios';
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
  }
})
class ConfirmPassword extends Vue {
  @Prop({ type: String, default: 'Confirm Password' }) title;
  @Prop({ type: String, default: 'For your security, please confirm your password to continue.' }) content;
  @Prop({ type: String, default: 'Confirm' }) button;

  confirmingPassword = false;
  form = useForm({ 
    password: '', 
    error: '', 
    processing: false 
  });
  @Ref('passwordInput') passwordInput;

  async startConfirmingPassword() {
    const response = await axios.get(route('password.confirmation'));
    if (response.data.confirmed) {
      this.$emit('confirmed');
    } else {
      this.confirmingPassword = true;
      setTimeout(() => this.passwordInput?.focus(), 250);
    }
  }

  async confirmPassword() {
    this.form.processing = true;
    try {
      await axios.post(route('password.confirm'), { 
        password: this.form.password 
      });
      this.form.processing = false;
      this.closeModal();
      this.$nextTick(() => this.$emit('confirmed'));
    } catch (error) {
      this.form.processing = false;
      this.form.error = error.response.data.errors.password[0];
      this.passwordInput.focus();
    }
  }

  closeModal() {
    this.confirmingPassword = false;
    this.form.password = '';
    this.form.error = '';
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
        <VCardTitle>{{ title }}</VCardTitle>
        <VCardText>
          {{ content }}
          <VTextField
            ref="passwordInput"
            v-model="form.password"
            type="password"
            class="mt-4"
            placeholder="Password"
            autocomplete="current-password"
            @keyup.enter="confirmPassword"
            variant="outlined"
          />
          <p class="text-error mt-2" v-if="form.error">{{ form.error }}</p>
        </VCardText>
        <VCardActions>
          <VBtn variant="text" @click="closeModal">Cancel</VBtn>
          <VBtn color="primary" variant="elevated" :loading="form.processing" @click="confirmPassword">
            {{ button }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </span>
</template>
