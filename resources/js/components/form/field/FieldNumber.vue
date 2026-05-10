<script setup lang="ts">
defineProps<{
  modelValue?: any;
  label?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  rules?: any;
  errorMessages?: any;
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
    type="number"
    class="bigger-input"
    hide-details="auto"
    density="compact"
    variant="underlined"
  />
</template>
