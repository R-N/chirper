<script setup lang="ts">
defineProps({
  modelValue: { type: String },
  text: { type: String },
});
</script>
<template>
  <span class="text-gray-800">{{ text || modelValue }}</span>
</template>
