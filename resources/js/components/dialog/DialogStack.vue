<script setup lang="ts">
import {
  VDialog,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VSpacer,
  VBtn
} from "vuetify/components";

import { computed } from "vue";

defineOptions({ name: "DialogStack" });

const props = defineProps<{
  items: any[];
  closeText?: string;
}>();

const emit = defineEmits<{
  dialogstackpop: [item: any];
}>();

const item = computed({
  get() {
    if (props.items.length == 0) return null;
    const it = props.items[props.items.length - 1];
    if (it.log || it.trace || it.showTrace) console.error(it);
    return it;
  },
  set(value) {
    if (!value) {
      if (item.value?.onDismiss) {
        item.value.onDismiss();
      }
      dialogStackPop();
    }
  }
});

const model = computed(() => !!item.value);

function dialogStackPop() {
  emit("dialogstackpop", item.value);
}
</script>
<template>
  <VDialog v-model="model" persistent max-width="290" v-if="item">
    <VCard class="pt-2 pb-2 pl-2 pr-2">
      <VCardTitle class="headline" v-if="item.title">{{
        item.title
      }}</VCardTitle>
      <VCardText v-if="item.text">{{ item.text }}</VCardText>
      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn
          ref="closeButton"
          color="secondary"
          text
          @click="item = null"
          :disabled="!item"
          >{{ closeText ?? $t("form.close") }}</VBtn
        >
      </VCardActions>
    </VCard>
  </VDialog>
</template>
<style scoped></style>
