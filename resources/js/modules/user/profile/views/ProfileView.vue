<script setup lang="ts">
import DeleteUserForm from "../views/DeleteUserForm.vue";
import UpdatePasswordForm from "../views/UpdatePasswordForm.vue";
import UpdateProfileInformationForm from "../views/UpdateProfileInformationForm.vue";
import { Head } from "@/plugins/inertia";
import {
  VContainer,
  VCard,
  VCardTitle,
  VCardText
} from "vuetify/components";

defineProps<{
  mustVerifyEmail?: boolean;
  status?: string;
}>();
</script>

<template>
  <Head :title="$t('profile.title')" />
  <VContainer class="d-flex flex-column ga-5" justify="center">
    <VCard :title="$t('profile.update_data')">
      <VCardText>
        <UpdateProfileInformationForm
          :must-verify-email="mustVerifyEmail"
          :status="status"
          :user="$page.props.auth.user"
        />
      </VCardText>
    </VCard>
    <VCard :title="$t('profile.update_password')">
      <VCardText>
        <UpdatePasswordForm />
      </VCardText>
    </VCard>
    <VCard :title="$t('profile.delete')">
      <VCardText>
        <DeleteUserForm />
      </VCardText>
    </VCard>
  </VContainer>
</template>
