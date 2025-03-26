<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';

@Component
class ActionMessage extends Vue {
  @Prop({ type: Boolean, required: true }) on;
}

export default toNative(ActionMessage);
</script>

<template>
  <div>
    <VExpandTransition>
      <div v-show="on" class="text-sm font-weight-medium">
        <slot />
      </div>
    </VExpandTransition>
  </div>
</template>
