<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  message: { type: String, default: "" },
});

const messageIsArray = computed(() => Array.isArray(props.message));
</script>

<template>
  <VExpandTransition>
    <VAlert v-if="message" type="error" variant="tonal" density="compact">
      <ul v-if="messageIsArray">
        <li v-for="(msg, i) in message">
          {{ msg }}
        </li>
      </ul>
      <p v-else>{{ message }}</p>
    </VAlert>
  </VExpandTransition>
</template>
