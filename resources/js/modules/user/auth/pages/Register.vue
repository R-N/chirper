<script setup lang="ts">
import { Link, useForm, router } from "@inertiajs/vue3";

import authService from "@/modules/user/auth/services/auth.js";
import AuthLayout from "../layouts/Auth.vue";
import GuestLayout from "@/layouts/GuestLayout.vue";
import { useViewBase } from "@/composables/useViewBase";

const props = defineProps({});
const {} = useViewBase(props);

const formData = useForm({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  terms: false
});

async function register() {
  let res = await authService.register(formData);
  formData.reset("password", "password_confirmation");
  router.visit(res.redirect || "/dashboard");
}
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
