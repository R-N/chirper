<script lang="ts">
import { Component, Prop, toNative, Ref } from "vue-facing-decorator";
import { WorkingComponent } from "@/components/WorkingComponent.vue";
import CardTitle from "@/components/card/CardTitle.vue";
import { Head, Link, useForm, router } from "@inertiajs/vue3";
import {
  VTextField,
  VCheckbox,
  VBtn,
  VCardText,
  VCardActions
} from "vuetify/components";
import authService from "@/modules/user/auth/services/auth.js";

@Component({
  name: "LoginForm",
  components: {
    CardTitle,
    Link,
    VTextField,
    VCheckbox,
    VBtn,
    VCardText,
    VCardActions
  }
})
class LoginForm extends WorkingComponent {
  valid = true;
  passwordVisible = false;
  @Prop({ type: Boolean }) canResetPassword;
  @Prop({ type: String }) status;
  @Ref("form") formRef;

  formData = useForm({
    email: "",
    password: "",
    remember: false
  });

  async login() {
    this.formData.clearErrors();
    this.formRef.validate();
    if (!this.valid) return;
    await this.waitBusy(async () => {
      let res = await authService.login(this.formData);
      router.visit(res.redirect || "/dashboard");
      this.formData.reset("password");
    }, "globalBusy");
  }
}
export { LoginForm };
export default toNative(LoginForm);
</script>
<template>
  <VForm
    v-model="valid"
    ref="form"
    @submit.prevent.stop="login"
    class="p-2"
    :disabled="busy"
  >
    <CardTitle>
      <h2 class="text-center">{{ $t("auth.login") }}</h2>
    </CardTitle>
    <VCardText>
      <div v-if="status" class="mb-4 text-green-600">{{ status }}</div>
      <VTextField
        v-model="formData.email"
        class="bigger-input"
        :label="$t('user.email')"
        type="email"
        name="email"
        autocomplete="email"
        required
        autofocus
        :disabled="busy"
        :rules="[(v) => !!v || $t('auth.email_required')]"
        :error-messages="formData.errors.email"
      />
      <VTextField
        v-model="formData.password"
        class="bigger-input"
        :label="$t('auth.password')"
        name="password"
        autocomplete="current-password"
        required
        :disabled="busy"
        :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="
          () => {
            passwordVisible = !passwordVisible;
          }
        "
        :type="passwordVisible ? 'text' : 'password'"
        :rules="[(v) => !!v || $t('auth.password_required')]"
        :error-messages="formData.errors.password"
      />
      <VCheckbox
        v-model="formData.remember"
        :label="$t('auth.remember')"
        density="compact"
      />
    </VCardText>
    <VCardActions class="d-flex justify-space-between">
      <Link
        v-if="canResetPassword"
        :href="route('password.request')"
        class="text-sm"
      >
        {{ $t("password_reset.forgot") }}
      </Link>
      <VBtn
        @click="login"
        color="primary"
        variant="elevated"
        raised
        type="submit"
        class="text-center w-100 mx-0"
        :disabled="busy"
        :loading="busy || formData.isSubmitting"
      >
        {{ $t("auth.login") }}
      </VBtn>
    </VCardActions>
  </VForm>
</template>

<style scoped></style>
