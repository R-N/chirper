<script setup lang="ts">
defineProps({
  title: { default: "Title" },
});
</script>
<template>
  <VCardTitle class="my-0 pb-0" align="start">
    <VRow>
      <VCol align="start" justify="start">
        <slot>
          <h2 class="text-h2">{{ title }}</h2>
        </slot>
      </VCol>
    </VRow>
  </VCardTitle>
</template>
