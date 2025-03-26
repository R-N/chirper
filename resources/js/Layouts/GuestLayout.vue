<script lang="ts">
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link } from '@inertiajs/vue3';
import { Component, Vue, toNative } from 'vue-facing-decorator';
import { VApp, VMain, VContainer, VCard, VBtn } from 'vuetify/components';

@Component({
  components: {
    ApplicationLogo,
    Link,
  }
})
class GuestLayout extends Vue {
  appName = import.meta.env.VITE_APP_NAME || 'Chirper';
}
export default toNative(GuestLayout);
</script>

<template>
    <v-app>
      <v-main class="d-flex flex-column align-center justify-center bg-grey-lighten-3">
        <v-container class="text-center">
          <v-btn icon to="/" class="d-flex align-center gap-2 text-decoration-none">
            <ApplicationLogo class="w-20 h-20 text-grey-darken-1" />
            {{ appName }}
          </v-btn>
        </v-container>
  
        <v-card class="mt-6 pa-6 elevation-2" max-width="400">
          <slot />
        </v-card>
      </v-main>
    </v-app>
  </template>