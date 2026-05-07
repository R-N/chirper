<script setup lang="ts">
import CenterLayout from "@/components/layout/CenterLayout.vue";
import RefreshButton from "@/components/general/RefreshButton.vue";
import { useViewBase } from "@/composables/useViewBase";

useViewBase();
</script>
<template>
  <CenterLayout column="true">
    <h1>{{ $t("navigation.server_unreachable") }}</h1>
    <RefreshButton icon large />
  </CenterLayout>
</template>
<style scoped></style>
