<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import Welcome from "@/modules/general/views/Welcome.vue";
import { useViewBase } from "@/composables/useViewBase";

const props = defineProps({});
const { } = useViewBase(props);
</script>
<template>
  <AppLayout title="Dashboard">
    <template #header>
      <h2
        class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
      >
        {{ $t("navigation.dashboard") }}
      </h2>
    </template>

    <Welcome />
  </AppLayout>
</template>
