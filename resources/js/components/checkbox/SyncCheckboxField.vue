<script setup lang="ts">
import SyncCheckbox from "@/components/checkbox/SyncCheckbox.vue";

defineProps<{
  value?: boolean;
  onFinish?: Function;
  confirmTextMaker?: Function;
  disabled?: boolean;
  name?: string;
  label?: string;
  title?: string;
  errorMessages?: any;
  textEnable?: string;
  textDisable?: string;
  parentBusy?: any;
}>();
</script>
<template>
  <SyncCheckbox
    :model-value="value"
    :on-change="(val: boolean) => onFinish?.(val)"
    :confirm-text-maker="confirmTextMaker"
    :disabled="disabled"
    :name="name"
    :label="label ?? title"
    :show-label="false"
    :error-messages="errorMessages"
    :text-enable="textEnable"
    :text-disable="textDisable"
  />
</template>
