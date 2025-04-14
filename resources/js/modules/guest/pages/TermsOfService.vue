<script setup>
import { Head } from '@inertiajs/vue3';
import AuthenticationCardLogo from '@/components/auth/AuthenticationCardLogo.vue';
import { VContainer, VCard, VCardText } from 'vuetify/components';
import GuestLayout from '@/layouts/GuestLayout.vue';

defineProps({
  terms: String,
});
</script>

<template>
  <GuestLayout title="Terms of Service">
    <VContainer class="d-flex flex-column align-center justify-center min-vh-100">
      <AuthenticationCardLogo />

      <VCard class="mt-6 pa-6 w-100 w-sm-75 w-md-50" elevation="3">
        <VCardText v-html="terms" />
      </VCard>
    </VContainer>
  </GuestLayout>
</template>
