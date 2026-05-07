<script setup lang="ts">
import CenterLayout from "@/components/layout/CenterLayout.vue";
import { useViewBase } from "@/composables/useViewBase";

defineProps<{ pathMatch?: string }>();

useViewBase();
</script>
<template>
  <CenterLayout>
    <h1>
      404 {{ $t("navigation.not_found") }}: {{ $route.params.pathMatch }}
    </h1>
  </CenterLayout>
</template>
<style scoped></style>
