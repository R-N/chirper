<script lang="ts">
import { Head, Link, useForm } from "@inertiajs/vue3";

import {
  VTextField,
  VCheckbox,
  VBtn,
  VCard,
  VCardText,
  VCardActions,
  VContainer,
  VRow,
  VCol,
  VImg,
  VCardTitle
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
    Link,
    VTextField,
    VCheckbox,
    VBtn,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VContainer,
    VRow,
    VCol,
    VImg
  }
})
class RegisterPage extends ViewBase {
  formData = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    terms: false
  });
  async register() {
    let res = await authService.register(this.formData);
    this.formData.reset("password", "password_confirmation");
    router.visit(res.redirect || "/dashboard");
  }
}
export default toNative(RegisterPage);
</script>
<template>
  <GuestLayout :title="$t('register.title')">
    <AuthLayout>
      <VCard class="d-flex flex-column pa-6">
        <VCardTitle>
          {{ $t("register.title") }}
        </VCardTitle>
        <VCardText class="d-flex flex-column pa-0 ga-2">
          <VTextField
            v-model="formData.name"
            :label="$t('user.name')"
            type="text"
            name="name"
            autocomplete="name"
            required
            autofocus
            :error-messages="formData.errors.name"
          />
          <VTextField
            v-model="formData.email"
            :label="$t('user.email')"
            type="email"
            name="email"
            autocomplete="email"
            required
            :error-messages="formData.errors.email"
          />
          <VTextField
            v-model="formData.password"
            :label="$t('auth.password')"
            type="password"
            name="password"
            autocomplete="new-password"
            required
            :error-messages="formData.errors.password"
          />
          <VTextField
            v-model="formData.password_confirmation"
            :label="$t('register.confirm_password')"
            type="password"
            required
            :error-messages="formData.errors.password_confirmation"
          />

          <VCheckbox
            v-if="$page.props.jetstream.hasTermsAndPrivacyPolicyFeature"
            v-model="formData.terms"
          >
            <template #label>
              {{ $t("register.i_agree") }}
              <Link
                target="_blank"
                :href="route('terms.show')"
                class="text-primary"
                >{{ $t("register.terms_of_service") }}</Link
              >
              {{ $t("form.and") }}
              <Link
                target="_blank"
                :href="route('policy.show')"
                class="text-primary"
                >{{ $t("register.privacy_policy") }}</Link
              >
            </template>
          </VCheckbox>
        </VCardText>

        <VCardActions class="d-flex justify-space-between">
          <Link :href="route('login')" class="text-sm">{{
            $t("register.already_registered")
          }}</Link>
          <VBtn
            :loading="formData.processing"
            @click="register"
            color="primary"
            variant="elevated"
            >{{ $t("register.submit") }}</VBtn
          >
        </VCardActions>
      </VCard>
    </AuthLayout>
  </GuestLayout>
</template>
