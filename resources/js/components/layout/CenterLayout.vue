<script lang="ts">
import { Vue, Component, Prop, toNative } from "vue-facing-decorator";

@Component({
  name: "CenterLayout"
})
class CenterLayout extends Vue {
  @Prop({ default: "" }) class;
  @Prop({ default: true }) fillHeight;
  @Prop({ default: false }) column;
  baseClass = "d-flex justify-center align-center flex-grow-1";

  get myClass() {
    let _class = `${this.baseClass} ${this.class} flex-column`;
    if (this.column) _class = `${_class} flex-column`;
    if (this.fillHeight) _class = `${_class} fill-height`;
    return _class;
  }
}
export { CenterLayout };
export default toNative(CenterLayout);
</script>
<template>
  <VContainer align="center" justify="center" :class="myClass" fluid>
    <slot></slot>
  </VContainer>
</template>
<style scoped></style>
