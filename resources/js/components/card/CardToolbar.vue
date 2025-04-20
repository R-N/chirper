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
  <VCardTitle class="my-0 pb-0 d-flex" align="start">
    <VRow>
      <VCol align="start" justify="start" class="d-flex">
        <slot name="left"></slot>
      </VCol>
      <VCol align="end" justify="end" class="d-flex">
        <slot name="right"></slot>
      </VCol>
    </VRow>
  </VCardTitle>
</template>
<style scoped>
</style>
