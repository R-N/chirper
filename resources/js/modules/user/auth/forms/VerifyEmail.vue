<script lang="ts">
import { Component, Prop, Ref, toNative } from "vue-facing-decorator";
import { WorkingComponent } from "@/components/WorkingComponent.vue";

import { useForm, router } from "@inertiajs/vue3";
import { VTextField, VBtn, VCardText, VCardActions } from "vuetify/components";
import authService from "@/modules/user/auth/services/auth.js";
import CardTitle from "@/components/card/CardTitle.vue";

@Component({
  name: "VerifyEmailForm",
  components: {
    CardTitle
  }
})
class VerifyEmailForm extends WorkingComponent {
  valid = true;
  @Prop({ type: String }) status;
  @Ref("form") formRef;

  formData = useForm({
    email: ""
  });

  get verificationLinkSent() {
    return this.status === "verification-link-sent";
  }

  async submit() {
    let res = await authService.verifyEmail(this.formData);
    router.visit(res.redirect || "/login");
  }
  async send() {
    this.formData?.clearErrors?.();
    this.formRef.validate();
    if (!this.valid) return;
    await this.waitBusy(async () => {
      let res = await authService.verifyEmail(this.formData);
      this.tabStore.tabDialogs.push({
        title: this.$t("auth.check_email"),
        text: this.$t("verify_email.sent")
      });
    }, "globalBusy");
  }
}
export { VerifyEmailForm };
export default toNative(VerifyEmailForm);
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
