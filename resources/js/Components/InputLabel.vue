<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';

@Component
class InputLabel extends Vue {
  @Prop({ type: String }) value;
}

export default toNative(InputLabel);
</script>

<template>
  <label class="text-sm font-weight-medium text-grey-darken-3">
    <span v-if="value">{{ value }}</span>
    <span v-else><slot /></span>
  </label>
</template>
