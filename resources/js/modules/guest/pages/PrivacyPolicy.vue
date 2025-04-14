<script setup>
import { Head } from '@inertiajs/vue3';
import AuthenticationCardLogo from '@/components/auth/AuthenticationCardLogo.vue';
import { VContainer, VCard, VCardText, VSheet } from 'vuetify/components';
import GuestLayout from '@/layouts/GuestLayout.vue';

defineProps({
  policy: String,
});
</script>

<template>
  <GuestLayout title="Privacy Policy">
    <VSheet class="d-flex flex-column align-center justify-center min-vh-100 py-6 bg-grey-lighten-3">
      <AuthenticationCardLogo />

      <VContainer class="mt-6 d-flex justify-center">
        <VCard class="w-100 sm:w-75 elevation-2 pa-6">
          <VCardText>
            <div v-html="policy" class="prose dark:prose-invert" />
          </VCardText>
        </VCard>
      </VContainer>
    </VSheet>
  </GuestLayout>
</template>