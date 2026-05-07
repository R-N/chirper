<script setup lang="ts">
import { VRow, VCol } from "vuetify/components";
</script>

<template>
  <VRow justify="space-between" align="center">
    <VCol>
      <h3 class="text-h6 font-weight-medium">
        <slot name="title" />
      </h3>
      <p class="text-body-2 text-medium-emphasis mt-1">
        <slot name="description" />
      </p>
    </VCol>

    <VCol class="text-right">
      <slot name="aside" />
    </VCol>
  </VRow>
</template>
