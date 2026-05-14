<script setup lang="ts">
</script>
<template>
  <VCardTitle class="my-0 pb-0" align="start">
    <VRow align="center">
      <VCol
        cols="12"
        md
        align="start"
        class="toolbar-side toolbar-side--left d-flex flex-wrap"
      >
        <slot name="left"></slot>
      </VCol>
      <VCol
        cols="12"
        md="auto"
        align="end"
        class="toolbar-side toolbar-side--right d-flex flex-wrap justify-end"
      >
        <slot name="right"></slot>
      </VCol>
    </VRow>
  </VCardTitle>
</template>
<style scoped>
.toolbar-side {
  align-items: center;
  gap: 0.25rem;
}

.toolbar-side--right {
  row-gap: 0.5rem;
}
</style>
