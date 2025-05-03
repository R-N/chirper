<script lang="ts">
import { Vue, Component, Prop, Emit, toNative } from "vue-facing-decorator";
import ConfirmationSlot from "@/components/dialog/ConfirmationSlot.vue";
import { MyComponent } from "@/components/MyComponent.vue";

@Component({
  name: "IconButton",
  components: {
    ConfirmationSlot
  },
  emits: ["click"]
})
class IconButton extends MyComponent {
  @Prop({ default: "small" }) size;
  @Prop({ type: String }) icon;
  @Prop({ type: String }) text;
  @Prop({ type: String }) type;
  @Prop({ default: false }) disabled;
  @Emit("click")
  emitClick(event) {
    return event;
  }
}
export { IconButton };
export default toNative(IconButton);
</script>
<template>
  <VTooltip
    location="bottom"
    :disabled="disabled || !text"
    class="fill-height d-inline-flex"
  >
    <template #activator="{ props }">
      <VBtn
        icon
        class="d-inline-flex"
        v-bind="props"
        :disabled="disabled"
        @click.prevent.stop="emitClick($event)"
        :size="size"
        :type="type"
      >
        <VIcon :size="size">{{ icon }}</VIcon>
      </VBtn>
    </template>
    <span>{{ text }}</span>
  </VTooltip>
</template>
<style scoped></style>
