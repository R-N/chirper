<script setup lang="ts">
import CardTitle from "@/components/card/CardTitle.vue";
import CardToolbar from "@/components/card/CardToolbar.vue";
import { useSlots } from "vue";

defineProps({
  title: { default: "Title" },
  noToolbar: { default: false },
});

const slots = useSlots();
</script>
<template>
  <VCard class="fill-width py-2 px-4">
    <CardTitle :title="title" />
    <CardToolbar v-if="!noToolbar" class="d-flex">
      <template v-slot:left>
        <slot name="toolbar-left"></slot>
      </template>
      <template v-slot:right>
        <slot name="toolbar-right"></slot>
      </template>
    </CardToolbar>
    <div v-if="slots.filtersBar" class="filters-bar w-100 px-0 pb-2">
      <slot name="filtersBar"></slot>
    </div>
    <VCardText>
      <slot name="content"></slot>
      <slot name="default"></slot>
    </VCardText>
    <VCardActions v-if="slots.actions">
      <slot name="actions"></slot>
    </VCardActions>
  </VCard>
</template>
