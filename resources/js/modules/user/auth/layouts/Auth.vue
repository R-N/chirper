<script setup lang="ts">
import AuthenticationCardLogo from "@/components/auth/AuthenticationCardLogo.vue";
import CenterLayout from "@/components/layout/CenterLayout.vue";
import { useViewBase } from "@/composables/useViewBase";

const props = defineProps({});
const {} = useViewBase(props);
</script>
<template>
  <CenterLayout :column="true">
    <AuthenticationCardLogo justify="center" align="center" class="mb-4" />
    <slot></slot>
  </CenterLayout>
</template>
<style scoped></style>
