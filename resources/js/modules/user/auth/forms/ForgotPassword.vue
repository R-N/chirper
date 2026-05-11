<script setup lang="ts">
import { ref } from "vue";
import { useForm, router } from "@/plugins/inertia";
import { VTextField, VBtn, VCardText, VCardActions } from "vuetify/components";
import authService from "@/modules/user/auth/services/auth.js";
import CardTitle from "@/components/card/CardTitle.vue";
import { useWorking } from "@/composables/useWorking";
import { t } from "@/plugins/i18n";

const props = defineProps<{
  status?: string;
}>();

const { tabStore, busy, waitBusy, globalBusy } = useWorking(props);

const valid = ref(true);
const formRef = ref<any>(null);

const formData = useForm({
  email: ""
});

async function reset() {
  formData?.clearErrors?.();
  formRef.value?.validate();
  if (!valid.value) return;

  await waitBusy(async () => {
    let res = await authService.forgotPassword(formData);
    tabStore.tabDialogs.push({
      title: t("auth.check_email"),
      text: t("password_reset.sent")
    });
  }, globalBusy);
}
</script>
<template>
  <VForm
    ref="form"
    v-model="valid"
    @submit.prevent.stop="reset"
    class="p-2"
    :disabled="busy"
  >
    <CardTitle>
      <h2 class="text-center">{{ $t("password_reset.title") }}</h2>
    </CardTitle>
    <VCardText>
      <VAlert v-if="status" type="success" dense class="mb-4">
        {{ status }}
      </VAlert>
      <p class="text-body-2 mb-4">
        {{ $t("password_reset.intro") }}
      </p>
      <VTextField
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
        @click="reset"
        color="primary"
        variant="elevated"
        type="submit"
        class="text-center w-100 mx-0"
        :disabled="busy"
        :loading="busy || formData.isSubmitting"
      >
        {{ $t("form.reset") }}
      </VBtn>
    </VCardText>
  </VForm>
</template>
<style scoped></style>
