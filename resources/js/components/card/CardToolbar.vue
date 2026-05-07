<script setup lang="ts">
</script>
<template>
  <VCardTitle class="my-0 pb-0 d-flex" align="start">
    <VRow>
      <VCol align="start" justify="start" class="d-flex">
        <slot name="left"></slot>
      </VCol>
      <VCol align="end" justify="end" class="d-flex">
        <slot name="right"></slot>
      </VCol>
    </VRow>
  </VCardTitle>
</template>
