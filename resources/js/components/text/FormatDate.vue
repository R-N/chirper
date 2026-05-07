<script setup lang="ts">
import { formatDate } from "@/libs/util.js";
defineProps<{ value?: string }>();
</script>
<template>
  <small class="ml-2 text-sm text-gray-600">{{ value ? formatDate(value) : '' }}</small>
</template>
