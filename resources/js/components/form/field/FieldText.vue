<script setup lang="ts">
defineProps<{
  modelValue?: any;
  label?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  rules?: any;
  errorMessages?: any;
  type?: string;
  counter?: number;
}>();
defineEmits<{
  "update:modelValue": [value: any];
}>();
</script>
<template>
  <VTextField
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :label="label"
    :name="name"
    :disabled="disabled"
    :required="required"
    :rules="rules"
    :error-messages="errorMessages"
    :type="type"
    :counter="counter"
    class="bigger-input"
    hide-details="auto"
    density="compact"
    variant="underlined"
  />
</template>
