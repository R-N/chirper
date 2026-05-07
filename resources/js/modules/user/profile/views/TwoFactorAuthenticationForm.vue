<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useForm, usePage } from "@inertiajs/vue3";
import ActionSection from "@/components/auth/ActionSection.vue";
import ConfirmsPassword from "@/components/auth/ConfirmsPassword.vue";
import {
  VRow,
  VCol,
  VTextField,
  VBtn,
  VAlert,
  VCard,
  VCardText
} from "vuetify/components";
import twoFactorAuthService from "@/modules/user/auth/services/twofactor.js";

const props = defineProps<{
  requiresConfirmation?: boolean;
}>();

const page = usePage();
const enabling = ref(false);
const confirming = ref(false);
const disabling = ref(false);
const qrCode = ref<string | null>(null);
const setupKey = ref<string | null>(null);
const recoveryCodes = ref<string[]>([]);

const confirmationForm = useForm({
  code: ""
});

const twoFactorEnabled = computed(() => {
  return !enabling.value && page.props.auth.user?.two_factor_enabled;
});

watch(twoFactorEnabled, (newValue) => {
  if (!newValue) {
    confirmationForm.reset();
    confirmationForm.clearErrors();
  }
});

async function enableTwoFactorAuthentication() {
  enabling.value = true;
  try {
    let res = await twoFactorAuthService.enableTwoFactorAuthentication();
    qrCode.value = res.qrCode;
    setupKey.value = res.setupKey;
    recoveryCodes.value = res.recoveryCodes;
  } finally {
    enabling.value = false;
    confirming.value = props.requiresConfirmation ?? false;
  }
}

async function showRecoveryCodes() {
  let res = await twoFactorAuthService.showRecoveryCodes();
  recoveryCodes.value = res;
}

async function confirmTwoFactorAuthentication() {
  try {
    let res = await twoFactorAuthService.confirmTwoFactorAuthentication(
      confirmationForm
    );
    confirming.value = false;
    qrCode.value = null;
    setupKey.value = null;
  } catch (error) {
    if (error.response?.status === 422) {
      confirmationForm.errors = error.response.data.errors;
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

async function regenerateRecoveryCodes() {
  let res = await twoFactorAuthService.regenerateRecoveryCodes();
}

async function disableTwoFactorAuthentication() {
  disabling.value = true;

  let res = await twoFactorAuthService.disableTwoFactorAuthentication();
  disabling.value = false;
  confirming.value = false;
}
</script>

<template>
  <ActionSection>
    <template #title>{{ $t("two_factor.title") }}</template>
    <template #description>{{ $t("two_factor.desc") }}</template>

    <template #content>
      <VAlert
        v-if="twoFactorEnabled && !confirming"
        type="success"
        :title="$t('two_factor.enabled')"
      >
      </VAlert>
      <VAlert
        v-else-if="twoFactorEnabled && confirming"
        type="info"
        :title="$t('two_factor.enabling')"
      ></VAlert>
      <VAlert v-else type="warning" :title="$t('two_factor.disabled')"></VAlert>
      <p class="text-body-1 mt-2 mb-2">
        {{ $t("two_factor.info") }}
      </p>

      <VCard v-if="qrCode" class="mt-4 pa-4">
        <VCardText>
          <p v-if="confirming">
            {{ $t("two_factor.enabling_scan") }}
          </p>
          <p v-else>{{ $t("two_factor.enabled_scan") }}</p>
        </VCardText>
        <div class="text-center" v-html="qrCode"></div>
        <VCardText v-if="setupKey">
          <strong>{{ $t("two_factor.setup_key") }}:</strong> {{ setupKey }}
        </VCardText>
        <VRow v-if="confirming" class="mt-4">
          <VCol cols="12">
            <VTextField
              v-model="confirmationForm.code"
              label="Code"
              autofocus
              @keyup.enter="confirmTwoFactorAuthentication"
              :error-messages="confirmationForm.errors.code"
            />
          </VCol>
        </VRow>
      </VCard>

      <VCard v-if="recoveryCodes.length > 0 && !confirming" class="mt-4 pa-4">
        <VCardText>
          <p>{{ $t("two_factor.recovery_code_info") }}</p>
          <div class="bg-gray-100 dark:bg-gray-900 rounded-lg pa-4">
            <div v-for="code in recoveryCodes" :key="code">{{ code }}</div>
          </div>
        </VCardText>
      </VCard>

      <div class="mt-5">
        <ConfirmsPassword
          @confirmed="enableTwoFactorAuthentication"
          v-if="!twoFactorEnabled"
        >
          <VBtn color="primary" variant="elevated" :disabled="enabling">{{
            $t("crud.enable")
          }}</VBtn>
        </ConfirmsPassword>

        <template v-else>
          <ConfirmsPassword
            @confirmed="confirmTwoFactorAuthentication"
            v-if="confirming"
          >
            <VBtn color="primary" class="me-3" :disabled="enabling">{{
              $t("form.confirm")
            }}</VBtn>
          </ConfirmsPassword>

          <ConfirmsPassword
            @confirmed="regenerateRecoveryCodes"
            v-if="recoveryCodes.length > 0 && !confirming"
          >
            <VBtn class="me-3">{{
              $t("two_factor.regenerate_recovery_code")
            }}</VBtn>
          </ConfirmsPassword>

          <ConfirmsPassword
            @confirmed="showRecoveryCodes"
            v-if="recoveryCodes.length === 0 && !confirming"
          >
            <VBtn class="me-3">{{ $t("two_factor.show_recovery_code") }}</VBtn>
          </ConfirmsPassword>

          <ConfirmsPassword @confirmed="disableTwoFactorAuthentication">
            <VBtn color="error" :disabled="disabling">{{
              $t("crud.disable")
            }}</VBtn>
          </ConfirmsPassword>
        </template>
      </div>
    </template>
  </ActionSection>
</template>
