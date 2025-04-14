<script lang="ts">
import { Vue, Component, Prop, toNative } from 'vue-facing-decorator';

@Component({
    name: "CardToolbar"
})
class CardToolbar extends Vue {
}
export { CardToolbar };
export default toNative(CardToolbar);
</script>
<template>
  <VCardTitle class="my-0 pb-0" align="start">
    <VRow>
      <VCol align="start" justify="start">
        <slot name="left"></slot>
      </VCol>
      <VSpacer></VSpacer>
      <VCol align="start" justify="start">
        <slot name="right"></slot>
      </VCol>
    </VRow>
  </VCardTitle>
</template>
<style scoped>
</style>
