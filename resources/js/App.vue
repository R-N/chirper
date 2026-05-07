<script setup lang="ts">
import { useViewBase } from "@/composables/useViewBase";
import { provideBusy } from "@/composables/useBusy";

defineProps<{
  InertiaApp?: object;
  props?: object;
}>();

provideBusy();
useViewBase({});
</script>
<template>
  <component :is="$props.InertiaApp" v-bind="$props.props" />
</template>
