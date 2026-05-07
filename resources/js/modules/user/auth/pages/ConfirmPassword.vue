<script setup lang="ts">
import { ref } from "vue";
import { useForm, router } from "@inertiajs/vue3";

import {
  VCard,
  VCardText,
  VCardTitle,
  VTextField,
  VBtn
} from "vuetify/components";
import authService from "@/modules/user/auth/services/auth.js";
import AuthLayout from "../layouts/Auth.vue";
import GuestLayout from "@/layouts/GuestLayout.vue";
import { useViewBase } from "@/composables/useViewBase";

const props = defineProps({});
const {} = useViewBase(props);

const formData = useForm({
  password: ""
});

const passwordInput = ref<InstanceType<typeof VTextField> | null>(null);

async function submit() {
  let res = await authService.confirmPassword(formData);
  formData.reset();
  passwordInput.value?.focus();
  router.visit(res.redirect || "/login");
}
</script>

<template>
  <GuestLayout title="Secure Area">
    <AuthLayout>
      <VCard elevation="4" class="pa-6" max-width="400">
        <VCardText>
          <p class="mb-4 text-grey-darken-1">
            {{ $t("auth.password_checkpoint") }}
          </p>

          <form @submit.prevent.stop="submit">
            <VTextField
              id="password"
              ref="passwordInput"
              v-model="formData.password"
              :label="$t('auth.password')"
              type="password"
              variant="outlined"
              required
              autocomplete="current-password"
              :error-messages="formData.errors.password"
            />

            <div class="d-flex justify-end mt-4">
              <VBtn
                color="primary"
                variant="elevated"
                type="submit"
                :loading="formData.processing"
              >
                {{ $t("form.confirm") }}
              </VBtn>
            </div>
          </form>
        </VCardText>
      </VCard>
    </AuthLayout>
  </GuestLayout>
</template>
