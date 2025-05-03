<script lang="ts">
import ActionSection from "@/components/auth/ActionSection.vue";
import { useForm } from "@inertiajs/vue3";
import { nextTick, ref } from "vue";

import { VDialog, VTextField, VBtn } from "vuetify/components";
import { Component, Prop, Vue, toNative, Ref } from "vue-facing-decorator";
import profileService from "@/modules/user/profile/services/profile.js";
import { router } from "@inertiajs/vue3";

@Component({
  components: {
    ActionSection,
    VDialog,
    VTextField,
    VBtn
  }
})
class DeleteUserForm extends Vue {
  confirmingUserDeletion = false;
  @Ref("passwordInput") passwordInput;

  formData = useForm({
    password: ""
  });

  confirmUserDeletion() {
    this.confirmingUserDeletion = true;
    nextTick(() => this.passwordInput.focus());
  }

  closeModal() {
    this.confirmingUserDeletion = false;

    this.formData.clearErrors();
    this.formData.reset();
  }

  async deleteUser() {
    try {
      let res = await profileService.deleteUser(this.formData);
      this.closeModal();
      router.visit(res.redirect || "/");
    } catch (error) {
      this.passwordInput.focus();
    } finally {
      this.formData.reset();
    }
  }
}
export default toNative(DeleteUserForm);
</script>

<template>
  <ActionSection>
    <template #title>
      {{ $t("profile.delete") }}
    </template>

    <template #description>
      {{ $t("profile.delete_desc") }}
    </template>

    <template #content>
      <p class="text-sm text-body-1">
        {{ $t("profile.delete_note") }}
      </p>

      <div class="mt-5">
        <VBtn color="error" variant="elevated" @click="confirmUserDeletion">
          {{ $t("profile.delete") }}
        </VBtn>
      </div>

      <VDialog v-model="confirmingUserDeletion" max-width="500">
        <template #default>
          <div class="p-5">
            <h2 class="text-lg font-bold">Delete Account</h2>
            <p class="mt-2">{{ $t("profile.delete_confirm_text") }}</p>

            <VTextField
              ref="passwordInput"
              v-model="formData.password"
              :label="$t('auth.password')"
              type="password"
              variant="outlined"
              class="mt-4"
              autocomplete="current-password"
              @keyup.enter="deleteUser"
              :error-messages="formData.errors.password"
            />

            <div class="mt-4 d-flex justify-end">
              <VBtn variant="text" @click="closeModal">{{
                $t("form.cancel")
              }}</VBtn>
              <VBtn
                color="error"
                variant="elevated"
                class="ms-3"
                :loading="formData.processing"
                @click="deleteUser"
              >
                {{ $t("profile.delete") }}
              </VBtn>
            </div>
          </div>
        </template>
      </VDialog>
    </template>
  </ActionSection>
</template>
