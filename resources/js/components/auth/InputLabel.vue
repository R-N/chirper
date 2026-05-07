<script setup lang="ts">
defineProps<{
  value?: string;
}>();
</script>

<template>
  <label class="text-sm font-weight-medium text-grey-darken-3">
    <span v-if="value">{{ value }}</span>
    <span v-else><slot /></span>
  </label>
</template>
