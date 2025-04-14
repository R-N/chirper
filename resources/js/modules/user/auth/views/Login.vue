
<script lang="ts">
import AuthenticationCardLogo from '@/components/auth/AuthenticationCardLogo.vue';
import { Component, Prop, toNative } from 'vue-facing-decorator';
import { BaseView } from '@/views/BaseView.vue';

import { VSlideXTransition, VSlideXReverseTransition } from 'vuetify/components';

import LoginForm from '@/modules/user/auth/forms/Login.vue'
import ForgotPasswordForm from '@/modules/user/auth/forms/forgot_password.vue'
import ResendVerificationForm from '@/modules/user/auth/forms/resend_verification.vue'
import { AuthLayout } from '../layouts/Auth.vue';

@Component({
  name: "LoginView",
  // beforeRouteEnter: authRouter.routeRequireLogoutDialog,
  components: {
    AuthenticationCardLogo,
    LoginForm,
    VSlideXTransition,
    ForgotPasswordForm,
    ResendVerificationForm,
    AuthLayout,
  }
})
class LoginView extends BaseView {
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
          <VCardText class="pt-0" v-if="false">
            <div class="d-flex justify-end px-2 pb-2">
              <a href="#" @click.stop.prevent="slide = 1">Lupa password</a>
            </div>
            <div class="d-flex justify-end px-2 pb-2">
              <a href="#" @click.stop.prevent="slide = 2">Verifikasi email</a>
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
          <forgot-password-form />
          <VCardText class="pt-0">
            <div class="d-flex justify-start px-2 pb-2">
              <a href="#" @click.stop.prevent="slide = 0">Kembali</a>
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
          <resend-verification-form />
          <VCardText class="pt-0">
            <div class="d-flex justify-start px-2 pb-2">
              <a href="#" @click.stop.prevent="slide = 0">Kembali</a>
            </div>
          </VCardText>
        </VCard>
      </div>
    </VSlideXTransition>
  </AuthLayout>
</template>
<style scoped>

</style>
