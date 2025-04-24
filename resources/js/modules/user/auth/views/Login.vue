
<script lang="ts">
import AuthenticationCardLogo from '@/components/auth/AuthenticationCardLogo.vue';
import { Component, Prop, toNative } from 'vue-facing-decorator';
import { ViewBase } from '@/views/ViewBase.vue';

import { VSlideXTransition, VSlideXReverseTransition } from 'vuetify/components';

import LoginForm from '@/modules/user/auth/forms/Login.vue'
import ForgotPasswordForm from '@/modules/user/auth/forms/ForgotPassword.vue'
import ResendVerificationForm from '@/modules/user/auth/forms/VerifyEmail.vue'
import { AuthLayout } from '../layouts/Auth.vue';

@Component({
  name: "LoginView",
  components: {
    AuthenticationCardLogo,
    LoginForm,
    VSlideXTransition,
    ForgotPasswordForm,
    ResendVerificationForm,
    AuthLayout,
  }
})
class LoginView extends ViewBase {
  slide = 0;

  transitionDuration = {
    enter: 300,
    leave: 300
  }
  transitionDelay = {
    enter: 300,
    leave: 0
  }
}
export { LoginView };
export default toNative(LoginView);
</script>
<template>
  <AuthLayout>
    <VSlideXTransition
      :duration="transitionDuration"
    >
      <div v-if="slide==0" :key="0">
        <VCard class="d-flex flex-column pa-6">
          <LoginForm/>
          <VCardText class="pt-0" >
            <div class="d-flex justify-end px-2 pb-2">
              <a href="#" @click.stop.prevent="slide = 1">{{ $t('password_reset.forgot') }}</a>
            </div>
            <div class="d-flex justify-end px-2 pb-2">
              <a href="#" @click.stop.prevent="slide = 2">{{ $t('verify_email.title') }}</a>
            </div>
          </VCardText>
        </VCard>
      </div>
    </VSlideXTransition>
    <VSlideXTransition
      :duration="transitionDuration"
    >
      <div v-if="slide==1" :key="1">
        <VCard>
          <ForgotPasswordForm />
          <VCardText class="pt-0">
            <div class="d-flex justify-start px-2 pb-2">
              <a href="#" @click.stop.prevent="slide = 0">{{ $t('navigation.return') }}</a>
            </div>
          </VCardText>
        </VCard>
      </div>
    </VSlideXTransition>
    <VSlideXTransition
      :duration="transitionDuration"
    >
      <div v-if="slide==2" :key="2">
        <VCard>
          <ResendVerificationForm />
          <VCardText class="pt-0">
            <div class="d-flex justify-start px-2 pb-2">
              <a href="#" @click.stop.prevent="slide = 0">{{ $t('navigation.return') }}</a>
            </div>
          </VCardText>
        </VCard>
      </div>
    </VSlideXTransition>
  </AuthLayout>
</template>
<style scoped>

</style>
