<script setup lang="ts">
</script>
<template>
  <VCardTitle class="my-0 pb-0" align="start">
    <VRow>
      <VCol
        cols="12"
        md
        align="start"
        class="d-flex flex-wrap"
      >
        <slot name="left"></slot>
      </VCol>
      <VCol
        cols="12"
        md="auto"
        align="end"
        class="d-flex justify-end"
      >
        <slot name="right"></slot>
      </VCol>
    </VRow>
  </VCardTitle>
</template>
