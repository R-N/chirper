<script setup lang="ts">
import { computed } from "vue";
import { VChip } from "vuetify/components";

const props = defineProps<{
  value?: string;
}>();

const color = computed(() => {
  const desc = (props.value ?? "").toLowerCase();
  if (desc.includes("created") || desc.includes("uploaded")) return "success";
  if (desc.includes("updated") || desc.includes("renamed") || desc.includes("restored")) return "warning";
  if (desc.includes("deleted")) return "error";
  return "info";
});
</script>
<template>
  <VChip :color="color" size="small" label>
    {{ value }}
  </VChip>
</template>
