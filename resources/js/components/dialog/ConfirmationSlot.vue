<script setup lang="ts">
import { ref } from "vue";
import { useWorking } from "@/composables/useWorking";
import SimpleInputDialog from "@/components/dialog/SimpleInputDialog.vue";

const props = defineProps({
  confirmTextMaker: { type: [String, Function] },
  onConfirm: { type: Function },
  onCancel: { type: Function },
  parentBusy: { default: false },
});

const emit = defineEmits(["confirm", "cancel"]);

const { busy, waitBusy } = useWorking(props);

const confirmText = ref("");
const confirmDialog = ref(false);

async function confirm() {
  if (props.onConfirm) {
    await waitBusy(
      async () => await props.onConfirm()
    );
  } else {
    emit("confirm", true);
  }
  confirmDialog.value = false;
}

function ask() {
  if (!props.confirmTextMaker) {
    confirm();
  } else {
    if (props.confirmTextMaker instanceof Function) {
      confirmText.value = props.confirmTextMaker();
    } else if (
      typeof props.confirmTextMaker === "string" ||
      props.confirmTextMaker instanceof String
    ) {
      confirmText.value = props.confirmTextMaker;
    } else {
      confirmText.value = "";
    }
    confirmDialog.value = true;
  }
}
</script>
<template>
  <span>
    <slot :ask="ask"></slot>
    <SimpleInputDialog
      v-if="confirmTextMaker && confirmDialog"
      v-model="confirmDialog"
      :on-submit="confirm"
      :on-cancel="onCancel"
      :title="$t('form.confirmation')"
      :text="confirmText"
      no-input="true"
      :parent-busy="busy"
    />
  </span>
</template>
<style scoped></style>
