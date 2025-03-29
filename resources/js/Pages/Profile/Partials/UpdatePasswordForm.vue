<script lang="ts">
import ActionMessage from '@/Components/ActionMessage.vue';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import { useForm } from '@inertiajs/vue3';

import { VTextField, VBtn, VRow, VCol } from 'vuetify/components';
import { Component, Prop, Vue, toNative, Ref } from 'vue-facing-decorator';
import profileService from '@/services/user/profile.js';
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
      Update Password
    </template>

    <template #description>
      Ensure your account is using a long, random password to stay secure.
    </template>

    <template #form>
      <!-- Current Password -->
      <VRow>
        <VCol cols="12">
          <VTextField
            id="current_password"
            ref="currentPasswordInput"
            v-model="form.current_password"
            label="Current Password"
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
            label="New Password"
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
            label="Confirm Password"
            type="password"
            autocomplete="new-password"
          />
          <InputError :message="form.errors.password_confirmation" class="mt-2" />
        </VCol>
      </VRow>
    </template>

    <template #actions>
      <ActionMessage :on="form.recentlySuccessful" class="me-3">
        Saved.
      </ActionMessage>
      
      <VBtn color="primary" variant="elevated" type="submit" :disabled="form.processing">
        Save
      </VBtn>
    </template>
  </FormSection>
</template>
