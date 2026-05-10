<script setup lang="ts">
import { computed, useSlots, Comment, Text } from "vue";
import { useViewBase } from "@/composables/useViewBase";

import MainCard from "@/components/card/MainCard.vue";
import IconButton from "@/components/button/IconButton.vue";

const props = defineProps<{
  title?: string;
  createText?: string;
  refreshText?: string;
  create?: Function;
  fetch?: Function;
  search?: string | object;
  exportCsv?: any;
  exportXlsx?: any;
  exportPdf?: any;
  selecting?: boolean;
  selectable?: boolean;
  selected?: any;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
  (e: "update:search", value: any): void;
  (e: "update:selecting", value: any): void;
}>();

const { busy } = useViewBase(props);

const mySearch = computed({
  get: () => props.search,
  set: (v) => emit("update:search", v),
});

const mySelecting = computed({
  get: () => props.selecting,
  set: (v) => emit("update:selecting", v),
});

import { ref } from "vue";
const _null = ref(null);

function emitModel(value: any) {
  emit("update:modelValue", value);
}

const slots = useSlots();
function slotFilled(name: string) {
  const slot = slots[name];
  if (!slot) return false;

  const nodes = slot();
  return nodes.some(
    (vnode: any) =>
      vnode.type !== Comment &&
      vnode.type !== Text &&
      vnode.type !== undefined
  );
}
</script>
<template>
  <MainCard :title="title ?? $t('crud.title')">
    <template v-slot:toolbar-left>
      <VBtnToggle
        v-model="_null"
        class="fill-height d-inline-flex"
        title="Bulk Actions"
        v-if="slotFilled('bulk-actions')"
      >
        <VCheckbox
          class="fill-height d-inline-flex"
          v-model="mySelecting"
          v-if="selectable"
        />
        <slot
          name="bulk-actions"
          class="fill-height d-inline-flex"
          :busy="busy"
          v-if="mySelecting && selected"
        />
      </VBtnToggle>
      <IconButton
        v-if="create"
        @click="create"
        :disabled="busy"
        icon="mdi-plus"
        :text="createText ?? $t('crud.create')"
        size="default"
      />
      <IconButton
        @click="fetch"
        :disabled="busy"
        icon="mdi-refresh"
        :text="refreshText ?? $t('crud.refresh')"
        size="default"
      />
      <slot name="toolbar-left" :busy="busy"></slot>
      <VBtnToggle
        v-model="_null"
        prepend-icon="mdi-export"
        class="fill-height d-inline-flex"
        title="Export"
      >
        <VBtn
          class="fill-height"
          @click="exportCsv"
          :disabled="busy"
          v-if="!!exportCsv"
          >csv</VBtn
        >
        <VBtn
          class="fill-height"
          @click="exportXlsx"
          :disabled="busy"
          v-if="!!exportXlsx"
          >xlsx</VBtn
        >
        <VBtn
          class="fill-height"
          @click="exportPdf"
          :disabled="busy"
          v-if="!!exportPdf"
          >pdf</VBtn
        >
      </VBtnToggle>
    </template>
    <template v-slot:toolbar-right>
      <slot name="toolbar-right" :busy="busy"></slot>
      <slot name="filters" :busy="busy" :fetch="fetch"></slot>
      <VTextField
        v-if="!(typeof mySearch === 'undefined' || mySearch === null)"
        class="pt-0 mt-0 search-field"
        v-model="mySearch"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        :disabled="busy"
      ></VTextField>
    </template>
    <template v-slot:content>
      <slot name="content" :busy="busy"></slot>
    </template>
    <template v-slot:default>
      <slot name="default" :busy="busy"></slot>
    </template>
  </MainCard>
</template>
<style scoped>
.search-field {
  width: 14rem;
}
</style>
