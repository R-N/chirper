<script setup lang="ts">
import { useWorking } from "@/composables/useWorking";
import ConfirmationSlot from "@/components/dialog/ConfirmationSlot.vue";
import IconButton from "@/components/button/IconButton.vue";

const props = defineProps({
  size: { default: "small" },
  type: { type: String },
  icon: { type: String },
  text: { type: String },
  confirmTextMaker: { type: [String, Function] },
  ask: { type: Function },
  onConfirm: { type: Function },
  disabled: { default: false },
  item: { default: null },
  parentBusy: { default: false },
});

const { busy } = useWorking(props);

function tryAsk(ask) {
  if (props.ask) {
    props.ask(ask);
  } else {
    ask();
  }
}
</script>
<template>
  <ConfirmationSlot
    class="text-center justify-center justify-self-center fill-height"
    :confirmTextMaker="confirmTextMaker"
    :on-confirm="() => onConfirm()"
    :parent-busy="busy"
  >
    <template v-slot="{ ask }">
      <IconButton
        @click.prevent.stop="tryAsk(ask)"
        :disabled="busy || disabled"
        :icon="icon"
        :text="text"
        :size="size"
        :type="type"
      />
    </template>
  </ConfirmationSlot>
</template>
<style scoped></style>
