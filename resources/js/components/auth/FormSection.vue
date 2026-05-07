<script setup lang="ts">
import { computed, useSlots } from "vue";
import SectionTitle from "./SectionTitle.vue";
import {
  VContainer,
  VRow,
  VCol,
  VCard,
  VCardText,
  VCardActions
} from "vuetify/components";

const emit = defineEmits<{
  submitted: [];
}>();

const slots = useSlots();

const hasActions = computed(() => !!slots.actions);

function submitted() {
  emit("submitted");
}
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
          <form @submit.prevent.stop="submitted">
            <VCardText>
              <slot name="form" />
            </VCardText>

            <VCardActions v-if="hasActions" class="justify-end">
              <slot name="actions" />
            </VCardActions>
          </form>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
