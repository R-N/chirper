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
  form = useForm({
    password: '',
  });

  confirmLogout(){
    this.confirmingLogout = true;
    setTimeout(() => this.passwordInput.focus(), 250);
  };

  async logoutOtherBrowserSessions(){
    try{
      let res = await profileService.logoutOtherBrowserSessions(this.form);
      this.closeModal();
    } catch (error) {
      this.passwordInput.focus();
    } finally {
      this.form.reset();
    }
  };

  closeModal(){
    this.confirmingLogout = false;

    this.form.reset();
  };
}
export default toNative(LogoutOtherBrowserSessionsForm);
</script>

<template>
    <ActionSection>
      <template #title>Browser Sessions</template>
      <template #description>
        Manage and log out your active sessions on other browsers and devices.
      </template>
  
      <template #content>
        <p class="text-body-1">
          If necessary, you may log out of all other browser sessions. Some recent
          sessions are listed below.
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
                <span v-if="session.is_current_device" class="text-green-500 font-semibold">(This device)</span>
                <span v-else>Last active {{ session.last_active }}</span>
              </p>
            </VCol>
          </VRow>
        </div>
  
        <div class="flex items-center mt-5">
          <VBtn color="primary" @click="confirmLogout">Log Out Other Browser Sessions</VBtn>
          <ActionMessage :on="form.recentlySuccessful" class="ms-3">Done.</ActionMessage>
        </div>
  
        <VDialog v-model="confirmingLogout" max-width="500px">
          <VRow class="p-4">
            <VCol>
              <h3>Log Out Other Browser Sessions</h3>
              <p class="mt-2">Please enter your password to confirm.</p>
              <VTextField
                ref="passwordInput"
                v-model="form.password"
                label="Password"
                type="password"
                autocomplete="current-password"
                variant="outlined"
                class="mt-4"
                @keyup.enter="logoutOtherBrowserSessions"
              />
              <p v-if="form.errors.password" class="text-red-500 text-sm mt-2">
                {{ form.errors.password }}
              </p>
              <div class="mt-4 flex justify-end">
                <VBtn variant="text" @click="closeModal">Cancel</VBtn>
                <VBtn color="primary" :loading="form.processing" @click="logoutOtherBrowserSessions" class="ms-3">
                  Log Out
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </VDialog>
      </template>
    </ActionSection>
  </template>
  