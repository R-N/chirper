<script setup lang="ts">
import SectionTitle from "./SectionTitle.vue";
import { VContainer, VRow, VCol, VCard, VCardText } from "vuetify/components";
</script>

<template>
  <VContainer>
    <VRow class="d-flex">
      <VCol cols="12" md="4">
        <SectionTitle>
          <template #title>
            <slot name="title" />
          </template>
          <template #description>
            <slot name="description" />
          </template>
        </SectionTitle>
      </VCol>
      <VCol cols="12" md="8">
        <VCard class="pa-5">
          <VCardText>
            <slot name="content" />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
