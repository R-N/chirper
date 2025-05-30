<script lang="ts">
import { Head, useForm } from "@inertiajs/vue3";

import {
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VTextField,
  VBtn
} from "vuetify/components";
import { Component, Prop, Vue, toNative } from "vue-facing-decorator";
import authService from "@/modules/user/auth/services/auth.js";
import { router } from "@inertiajs/vue3";
import AuthLayout from "../layouts/Auth.vue";
import GuestLayout from "@/layouts/GuestLayout.vue";
import { ViewBase } from "@/views/ViewBase.vue";

@Component({
  components: {
    AuthLayout,
    GuestLayout,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VTextField,
    VBtn
  }
})
class ResetPasswordPage extends ViewBase {
  @Prop({ type: String }) email;
  @Prop({ type: String }) token;

  formData = useForm({
    token: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  mounted() {
    this.formData.token = this.token;
    this.formData.email = this.email;
  }

  async submit() {
    let res = await authService.resetPassword(this.formData);
    this.formData.reset("password", "password_confirmation");
    router.visit(res.redirect || "/login");
  }
}
export default toNative(ResetPasswordPage);
</script>

<template>
  <GuestLayout :title="$t('password_reset.title')">
    <AuthLayout>
      <VCard class="mx-auto my-10" max-width="400" elevation="10">
        <VCardText>
          <p class="text-body-2 mb-4">
            This also verifies your email, if you haven't.
          </p>
          <VTextField
            id="email"
            v-model="formData.email"
            :label="$t('user.email')"
            type="email"
            required
            autofocus
            autocomplete="username"
            :error-messages="formData.errors.email"
          />

          <VTextField
            id="password"
            v-model="formData.password"
            :label="$t('auth.password')"
            type="password"
            required
            autocomplete="new-password"
            class="mt-4"
            :error-messages="formData.errors.password"
          />

          <VTextField
            id="password_confirmation"
            v-model="formData.password_confirmation"
            :label="$t('register.confirm_password')"
            type="password"
            required
            autocomplete="new-password"
            class="mt-4"
            :error-messages="formData.errors.password_confirmation"
          />
        </VCardText>
        <VCardActions class="justify-end">
          <VBtn
            color="primary"
            variant="elevated"
            :loading="formData.processing"
            @click="submit"
          >
            {{ $t("password_reset.submit") }}
          </VBtn>
        </VCardActions>
      </VCard>
    </AuthLayout>
  </GuestLayout>
</template>
