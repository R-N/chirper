<script lang="ts">
import { Vue, Component, Prop, toNative } from "vue-facing-decorator";

@Component({
  name: "CardTitle"
})
class CardTitle extends Vue {
  @Prop({ default: "Title" }) title;
}
export { CardTitle };
export default toNative(CardTitle);
</script>
<template>
  <VCardTitle class="my-0 pb-0" align="start">
    <VRow>
      <VCol align="start" justify="start">
        <slot>
          <h2 class="text-h2">{{ title }}</h2>
        </slot>
      </VCol>
    </VRow>
  </VCardTitle>
</template>
<style scoped></style>
