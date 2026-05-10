<script setup lang="ts">
defineProps<{
  modelValue?: any;
  label?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  rules?: any;
  errorMessages?: any;
  items?: any[];
  itemTitle?: string;
  itemValue?: string;
  multiple?: boolean;
  returnObject?: boolean;
}>();
defineEmits<{
  "update:modelValue": [value: any];
}>();
</script>
<template>
  <VSelect
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :label="label"
    :name="name"
    :disabled="disabled"
    :required="required"
    :rules="rules"
    :error-messages="errorMessages"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    :multiple="multiple"
    :return-object="returnObject"
    class="bigger-input"
    hide-details="auto"
    density="compact"
  />
</template>
