<script setup lang="ts">
import { useViewBase } from "@/composables/useViewBase";

defineProps<{
  InertiaApp?: object;
  props?: object;
  parentBusy?: any;
}>();

useViewBase({});
</script>
<template>
  <component :is="$props.InertiaApp" v-bind="$props.props" />
</template>
