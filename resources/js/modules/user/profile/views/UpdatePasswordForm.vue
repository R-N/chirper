<script lang="ts">
import ActionMessage from '@/components/auth/ActionMessage.vue';
import FormSection from '@/components/auth/FormSection.vue';
import InputError from '@/components/form/InputError.vue';
import { useForm } from '@inertiajs/vue3';

import { VTextField, VBtn, VRow, VCol } from 'vuetify/components';
import { Component, Prop, Vue, toNative, Ref } from 'vue-facing-decorator';
import profileService from '@/modules/user/profile/services/profile.js';
import { router } from '@inertiajs/vue3';

@Component({
  components: {
    ActionMessage,
    FormSection,
    InputError,
    VTextField,
    VBtn,
    VRow,
    VCol,
  }
})
class UpdatePasswordForm extends Vue {
  @Ref('passwordInput') passwordInput;
  @Ref('currentPasswordInput') currentPasswordInput;

  form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  async updatePassword() {
    try{
      let res = await profileService.updatePassword(this.form);
      this.form.reset();
      router.visit(res.redirect || "/login");
    }catch(error){
      if (error.response?.status === 422) {
        this.form.errors = error.response.data.errors;
      } else {
        console.error("Unexpected error:", error);
      }
      if (this.form.errors.password) {
        this.form.reset('password', 'password_confirmation');
        this.passwordInput.focus();
      }
      if (this.form.errors.current_password) {
        this.form.reset('current_password');
        this.currentPasswordInput.focus();
      }
    }
  }
}
export default toNative(UpdatePasswordForm);
</script>

<template>
  <FormSection @submitted="updatePassword">
    <template #title>
      {{ $t('profile.update_password') }}
    </template>

    <template #description>
      {{ $t('profile.password_note') }}
    </template>

    <template #form>
      <!-- Current Password -->
      <VRow>
        <VCol cols="12">
          <VTextField
            id="current_password"
            ref="currentPasswordInput"
            v-model="form.current_password"
            :label="$t('profile.current_password')"
            type="password"
            autocomplete="current-password"
          />
          <InputError :message="form.errors.current_password" class="mt-2" />
        </VCol>
      </VRow>

      <!-- New Password -->
      <VRow>
        <VCol cols="12">
          <VTextField
            id="password"
            ref="passwordInput"
            v-model="form.password"
            :label="$t('password_reset.new_password')"
            type="password"
            autocomplete="new-password"
          />
          <InputError :message="form.errors.password" class="mt-2" />
        </VCol>
      </VRow>

      <!-- Confirm Password -->
      <VRow>
        <VCol cols="12">
          <VTextField
            id="password_confirmation"
            v-model="form.password_confirmation"
            :label="$t('register.confirm_password')"
            type="password"
            autocomplete="new-password"
          />
          <InputError :message="form.errors.password_confirmation" class="mt-2" />
        </VCol>
      </VRow>
    </template>

    <template #actions>
      <ActionMessage :on="form.recentlySuccessful" class="me-3">
        {{ $t('form.saved') }}
      </ActionMessage>
      
      <VBtn color="primary" variant="elevated" type="submit" :disabled="form.processing">
        {{ $t('form.save') }}
      </VBtn>
    </template>
  </FormSection>
</template>
