<script setup lang="ts">
import { filesize } from "filesize";
defineProps<{ value?: number }>();
</script>
<template>
  <small class="ml-2 text-sm text-gray-600">{{ filesize(value ?? 0) }}</small>
</template>
