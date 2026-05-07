<script setup lang="ts">
import { ref } from "vue";
import { useForm, router } from "@inertiajs/vue3";
import ActionMessage from "@/components/auth/ActionMessage.vue";
import FormSection from "@/components/auth/FormSection.vue";
import { VTextField, VBtn, VRow, VCol } from "vuetify/components";
import profileService from "@/modules/user/profile/services/profile.js";

const passwordInput = ref<any>(null);
const currentPasswordInput = ref<any>(null);

const formData = useForm({
  current_password: "",
  password: "",
  password_confirmation: ""
});

async function updatePassword() {
  try {
    let res = await profileService.updatePassword(formData);
    formData.reset();
    router.visit(res.redirect || "/login");
  } catch (error) {
    if (error.response?.status === 422) {
      formData.errors = error.response.data.errors;
    } else {
      console.error("Unexpected error:", error);
    }
    if (formData.errors.password) {
      formData.reset("password", "password_confirmation");
      passwordInput.value?.focus();
    }
    if (formData.errors.current_password) {
      formData.reset("current_password");
      currentPasswordInput.value?.focus();
    }
  }
}
</script>

<template>
  <FormSection @submitted="updatePassword">
    <template #title>
      {{ $t("profile.update_password") }}
    </template>

    <template #description>
      {{ $t("profile.password_note") }}
    </template>

    <template #form>
      <!-- Current Password -->
      <VRow>
        <VCol cols="12">
          <VTextField
            id="current_password"
            ref="currentPasswordInput"
            v-model="formData.current_password"
            :label="$t('profile.current_password')"
            type="password"
            autocomplete="current-password"
            :error-messages="formData.errors.current_password"
          />
        </VCol>
      </VRow>

      <!-- New Password -->
      <VRow>
        <VCol cols="12">
          <VTextField
            id="password"
            ref="passwordInput"
            v-model="formData.password"
            :label="$t('password_reset.new_password')"
            type="password"
            autocomplete="new-password"
            :error-messages="formData.errors.password"
          />
        </VCol>
      </VRow>

      <!-- Confirm Password -->
      <VRow>
        <VCol cols="12">
          <VTextField
            id="password_confirmation"
            v-model="formData.password_confirmation"
            :label="$t('register.confirm_password')"
            type="password"
            autocomplete="new-password"
            :error-messages="formData.errors.password_confirmation"
          />
        </VCol>
      </VRow>
    </template>

    <template #actions>
      <ActionMessage :on="formData.recentlySuccessful" class="me-3">
        {{ $t("form.saved") }}
      </ActionMessage>

      <VBtn
        color="primary"
        variant="elevated"
        type="submit"
        :disabled="formData.processing"
      >
        {{ $t("form.save") }}
      </VBtn>
    </template>
  </FormSection>
</template>
