<script lang="ts">
import ActionSection from '@/components/auth/ActionSection.vue';
import InputError from '@/components/auth/InputError.vue';
import { useForm } from '@inertiajs/vue3';
import { nextTick, ref } from 'vue';

import { VDialog, VTextField, VBtn } from 'vuetify/components';
import { Component, Prop, Vue, toNative, Ref } from 'vue-facing-decorator';
import profileService from '@/modules/user/profile/services/profile.js';
import { router } from '@inertiajs/vue3';

@Component({
  components: {
    ActionSection,
    VDialog,
    VTextField,
    VBtn,
    InputError,
  }
})
class DeleteUserForm extends Vue {
  confirmingUserDeletion = false;
  @Ref('passwordInput') passwordInput;

  form = useForm({
    password: '',
  });

  confirmUserDeletion(){
      this.confirmingUserDeletion = true;
      nextTick(() => this.passwordInput.focus());
  };

  closeModal(){
    this.confirmingUserDeletion = false;

    this.form.clearErrors();
    this.form.reset();
  };

  async deleteUser() {
    try{
        let res = await profileService.deleteUser(this.form);
        this.closeModal();
        router.visit(res.redirect || "/");
    } catch (error) {
        this.passwordInput.focus();
    } finally {
        this.form.reset();
    }
  }
}
export default toNative(DeleteUserForm);
</script>

<template>
    <ActionSection>
      <template #title>
        {{ $t('profile.delete') }}
      </template>
  
      <template #description>
        {{  $t('profile.delete_desc') }}
      </template>
  
      <template #content>
        <p class="text-sm text-body-1">
          {{ $t('profile.delete_note') }}
        </p>
  
        <div class="mt-5">
          <VBtn color="error" variant="elevated" @click="confirmUserDeletion">
            {{ $t('profile.delete') }}
          </VBtn>
        </div>
  
        <VDialog v-model="confirmingUserDeletion" max-width="500">
          <template #default>
            <div class="p-5">
              <h2 class="text-lg font-bold">Delete Account</h2>
              <p class="mt-2">{{ $t('profile.delete_confirm_text') }}</p>
              
              <VTextField
                ref="passwordInput"
                v-model="form.password"
                :label="$t('auth.password')"
                type="password"
                variant="outlined"
                class="mt-4"
                autocomplete="current-password"
                @keyup.enter="deleteUser"
              />
              <InputError :message="form.errors.password" class="mt-2" />
              
              <div class="mt-4 d-flex justify-end">
                <VBtn variant="text" @click="closeModal">{{ $t('form.cancel') }}</VBtn>
                <VBtn color="error" variant="elevated" class="ms-3" :loading="loading" @click="deleteUser">
                  {{ $t('profile.delete') }}
                </VBtn>
              </div>
            </div>
          </template>
        </VDialog>
      </template>
    </ActionSection>
  </template>
  