<script setup lang="ts">
import { VExpandTransition } from "vuetify/components";

defineProps<{
  on: boolean;
}>();
</script>

<template>
  <div>
    <VExpandTransition>
      <div v-show="on" class="text-sm font-weight-medium">
        <slot />
      </div>
    </VExpandTransition>
  </div>
</template>
