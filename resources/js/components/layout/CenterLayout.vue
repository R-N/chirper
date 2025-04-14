<script lang="ts">
import { Vue, Component, Prop, toNative } from 'vue-facing-decorator';

@Component({
    name: "CenterLayout",
})
class CenterLayout extends Vue {
  @Prop({ default: false }) column;
  baseClass = "fill-height d-flex justify-center align-center flex-grow-1";

  get myClass(){
    if(this.column)
      return this.baseClass + " flex-column"
    else
      return this.baseClass;
  }
}
export { CenterLayout }
export default toNative(CenterLayout);
</script>
<template>
  <VContainer
    align="center"
    justify="center"
    :class="myClass"
    fluid
  >
    <slot></slot>
  </VContainer>
</template>
<style scoped>
</style>
