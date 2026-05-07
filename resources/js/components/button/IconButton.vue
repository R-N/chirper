<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import ConfirmationSlot from "@/components/dialog/ConfirmationSlot.vue";

const { } = useAuth();

const props = withDefaults(defineProps<{
  size?: string;
  icon?: string;
  text?: string;
  type?: string;
  disabled?: boolean;
}>(), {
  size: "small",
  disabled: false,
});

const emit = defineEmits<{
  click: [event: Event];
}>();

function emitClick(event: Event) {
  emit("click", event);
}
</script>
<template>
  <VTooltip
    location="bottom"
    :disabled="disabled || !text"
    class="fill-height d-inline-flex"
  >
    <template #activator="{ props }">
      <VBtn
        icon
        variant="plain"
        class="d-inline-flex"
        v-bind="props"
        :disabled="disabled"
        @click.prevent.stop="emitClick($event)"
        :size="size"
        :type="type"
      >
        <VIcon :size="size">{{ icon }}</VIcon>
      </VBtn>
    </template>
    <span>{{ text }}</span>
  </VTooltip>
</template>
<style scoped></style>
