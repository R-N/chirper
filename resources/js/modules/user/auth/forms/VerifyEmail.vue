<script setup lang="ts">
import { ref, computed } from "vue";
import { useForm, router } from "@/plugins/inertia";
import { VTextField, VBtn, VCardText, VCardActions } from "vuetify/components";
import authService from "@/modules/user/auth/services/auth.js";
import CardTitle from "@/components/card/CardTitle.vue";
import { useWorking } from "@/composables/useWorking";
import { t } from "@/plugins/i18n";

const props = defineProps<{
  status?: string;
}>();

const { tabStore, busy, waitBusy, globalBusy, isLoggedIn } = useWorking(props);

const valid = ref(true);
const formRef = ref<any>(null);

const formData = useForm({
  email: ""
});

const verificationLinkSent = computed(() => props.status === "verification-link-sent");

async function submit() {
  let res = await authService.verifyEmail(formData);
  router.visit(res.redirect || "/login");
}

async function send() {
  formData?.clearErrors?.();
  formRef.value?.validate();
  if (!valid.value) return;
  await waitBusy(async () => {
    let res = await authService.verifyEmail(formData);
    tabStore.tabDialogs.push({
      title: t("auth.check_email"),
      text: t("verify_email.sent")
    });
  }, globalBusy);
}
</script>
<template>
  <VForm
    ref="form"
    v-model="valid"
    @submit.prevent.stop="send"
    class="p-2"
    :disabled="busy"
  >
    <CardTitle>
      <h2 class="text-center">{{ $t("verify_email.title") }}</h2>
    </CardTitle>
    <VCardText>
      <VAlert v-if="status" type="success" dense class="mb-4">
        {{ status }}
      </VAlert>
      <p class="text-body-2 mb-4">
        {{ $t("verify_email.intro") }}
      </p>
      <VTextField
        v-if="!isLoggedIn"
        v-model="formData.email"
        class="bigger-input"
        :label="$t('user.email')"
        type="email"
        name="email"
        autocomplete="email"
        :disabled="busy"
        required
        :rules="[(v) => !!v || $t('auth.email_required')]"
        :error-messages="formData.errors.email"
      />
      <VBtn
        raised
        @click="send"
        color="primary"
        variant="elevated"
        type="submit"
        class="text-center w-100 mx-0"
        :disabled="busy"
        :loading="busy || formData.isSubmitting"
      >
        {{ $t("form.send") }}
      </VBtn>
    </VCardText>
  </VForm>
</template>

<style scoped></style>
