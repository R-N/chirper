<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import { VContainer, VCard, VSheet } from 'vuetify/components';

@Component({
  components: { VContainer, VCard, VSheet },
})
class AuthenticationCard extends Vue {}

export default toNative(AuthenticationCard);
</script>

<template>
  <VContainer class="d-flex flex-column align-center justify-center min-vh-100 bg-grey-lighten-4 dark:bg-grey-darken-4">
    <VSheet class="mb-4">
      <slot name="logo" />
    </VSheet>
    
    <VCard class="w-100 sm:w-md px-6 py-4 elevation-2 rounded-lg">
      <slot />
    </VCard>
  </VContainer>
</template>