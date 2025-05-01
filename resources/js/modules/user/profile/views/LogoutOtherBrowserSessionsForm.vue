<script lang="ts">
import { useForm } from '@inertiajs/vue3';
import ActionMessage from '@/components/auth/ActionMessage.vue';
import ActionSection from '@/components/auth/ActionSection.vue';

import { VDialog, VTextField, VBtn, VRow, VCol } from 'vuetify/components';
import { Component, Prop, Vue, toNative, Ref } from 'vue-facing-decorator';
import profileService from '@/modules/user/profile/services/profile.js';
import { router } from '@inertiajs/vue3';

@Component({
  components: {
    ActionMessage,
    ActionSection,
    VDialog,
    VTextField,
    VBtn,
    VRow,
    VCol,
  }
})
class LogoutOtherBrowserSessionsForm extends Vue {
  @Prop({ type: Array }) sessions;
  confirmingLogout = false;
  @Ref('passwordInput') passwordInput;
  formData = useForm({
    password: '',
  });

  confirmLogout(){
    this.confirmingLogout = true;
    setTimeout(() => this.passwordInput.focus(), 250);
  };

  async logoutOtherBrowserSessions(){
    try{
      let res = await profileService.logoutOtherBrowserSessions(this.formData);
      this.closeModal();
    } catch (error) {
      this.passwordInput.focus();
    } finally {
      this.formData.reset();
    }
  };

  closeModal(){
    this.confirmingLogout = false;

    this.formData.reset();
  };
}
export default toNative(LogoutOtherBrowserSessionsForm);
</script>

<template>
    <ActionSection>
      <template #title>{{ $t('other_sessions.title') }}</template>
      <template #description>
        {{ $t('other_sessions.desc') }}
      </template>
  
      <template #content>
        <p class="text-body-1">
          {{ $t('other_sessions.note') }}
        </p>
        <div v-if="sessions.length" class="mt-5 space-y-4">
          <VRow v-for="(session, i) in sessions" :key="i" class="items-center">
            <VCol cols="1">
              <VIcon>{{ session.agent.is_desktop ? 'mdi-monitor' : 'mdi-cellphone' }}</VIcon>
            </VCol>
            <VCol cols="11">
              <p>
                {{ session.agent.platform || 'Unknown' }} - {{ session.agent.browser || 'Unknown' }}
              </p>
              <p class="text-body-1 text-sm">
                {{ session.ip_address }}
                <span v-if="session.is_current_device" class="text-green-500 font-semibold">({{ $t('other_sessions.this_device') }})</span>
                <span v-else>{{ $t('other_sessions.last_active') }} {{ session.last_active }}</span>
              </p>
            </VCol>
          </VRow>
        </div>
  
        <div class="flex items-center mt-5">
          <VBtn color="primary" @click="confirmLogout">{{ $t('other_sessions.logout') }}</VBtn>
          <ActionMessage :on="formData.recentlySuccessful" class="ms-3">{{ $t('form.done') }}</ActionMessage>
        </div>
  
        <VDialog v-model="confirmingLogout" max-width="500px">
          <VRow class="p-4">
            <VCol>
              <h3>{{ $t('other_sessions.logout') }}</h3>
              <p class="mt-2">{{ $t('auth.enter_confirm_password') }}</p>
              <VTextField
                ref="passwordInput"
                v-model="formData.password"
                :label="$t('auth.password')"
                type="password"
                autocomplete="current-password"
                variant="outlined"
                class="mt-4"
                @keyup.enter="logoutOtherBrowserSessions"
                :error-messages="formData.errors.password"
              />
              <div class="mt-4 flex justify-end">
                <VBtn variant="text" @click="closeModal">{{ $t('form.cancel') }}</VBtn>
                <VBtn color="primary" :loading="formData.processing" @click="logoutOtherBrowserSessions" class="ms-3">
                  {{ $t('auth.logout') }}
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </VDialog>
      </template>
    </ActionSection>
  </template>
  