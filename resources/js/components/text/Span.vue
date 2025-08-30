<script lang="ts">
import { Vue, Component, Prop, toNative } from "vue-facing-decorator"

@Component({
  name: "Span",
  components: {
  }
})
class Span extends Vue {
  @Prop({ type: String }) modelValue;
  @Prop({ type: String }) text;
}
export { Span };
export default toNative(Span);
</script>
<template>
  <span class="text-gray-800">{{ text || modelValue }}</span>
</template>
