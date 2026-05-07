<script setup lang="ts">
import {
  VDialog,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VTextField,
  VBtn
} from "vuetify/components";
import axios from "@/plugins/axios";
import { useForm } from "@inertiajs/vue3";
import { ref, nextTick, useTemplateRef } from "vue";

defineProps<{
  title?: string;
  content?: string;
  button?: string;
}>();

const emit = defineEmits<{
  confirmed: [value: true];
}>();

const confirmingPassword = ref(false);
const formData = useForm({
  password: "",
  error: "",
  processing: false
});
const passwordInput = useTemplateRef("passwordInput");

async function startConfirmingPassword() {
  const response = await axios.get(route("api.password.confirmation"));
  if (response.data.confirmed) {
    emitConfirmed();
  } else {
    confirmingPassword.value = true;
    setTimeout(() => passwordInput.value?.focus(), 250);
  }
}

function emitConfirmed() {
  emit("confirmed", true);
}

async function confirmPassword() {
  formData.processing = true;
  try {
    await axios.post(route("api.password.confirm"), {
      password: formData.password
    });
    formData.processing = false;
    closeModal();
    nextTick(emitConfirmed);
  } catch (error: any) {
    formData.processing = false;
    formData.error = error.response.data.errors.password[0];
    passwordInput.value!.focus();
  }
}

function closeModal() {
  confirmingPassword.value = false;
  formData.password = "";
  formData.error = "";
}
</script>

<template>
  <span>
    <span @click="startConfirmingPassword">
      <slot />
    </span>

    <VDialog v-model="confirmingPassword" persistent max-width="400px">
      <VCard>
        <VCardTitle>{{
          title ?? $t("auth.confirm_password_title")
        }}</VCardTitle>
        <VCardText>
          {{ content ?? $t("auth.confirm_password_text") }}
          <VTextField
            ref="passwordInput"
            v-model="formData.password"
            type="password"
            class="mt-4"
            placeholder="Password"
            autocomplete="current-password"
            @keyup.enter="confirmPassword"
            variant="outlined"
          />
          <p class="text-error mt-2" v-if="formData.error">
            {{ formData.error }}
          </p>
        </VCardText>
        <VCardActions>
          <VBtn variant="text" @click="closeModal">{{
            $t("form.cancel")
          }}</VBtn>
          <VBtn
            color="primary"
            variant="elevated"
            :loading="formData.processing"
            @click="confirmPassword"
          >
            {{ button ?? $t("form.confirm") }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </span>
</template>
