<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import NotFoundView from "../views/NotFound.vue";
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
        {{ $t("navigation.not_found") }}
      </h2>
    </template>
    <NotFoundView />
  </AppLayout>
</template>
<style scoped></style>
