<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  class: { default: "" },
  fillHeight: { default: true },
  column: { default: false },
});

const baseClass = "d-flex justify-center align-center flex-grow-1";

const myClass = computed(() => {
  let _class = `${baseClass} ${props.class} flex-column`;
  if (props.column) _class = `${_class} flex-column`;
  if (props.fillHeight) _class = `${_class} fill-height`;
  return _class;
});
</script>
<template>
  <VContainer align="center" justify="center" :class="myClass" fluid>
    <slot></slot>
  </VContainer>
</template>
