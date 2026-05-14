<script setup lang="ts">
import { computed, useSlots, Comment, Text, ref, mergeProps } from "vue";
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

const hasExport = computed(
  () => !!(props.exportCsv || props.exportXlsx || props.exportPdf)
);

const _null = ref(null);

function runExport(fn?: (() => void) | (() => Promise<void>) | null) {
  if (typeof fn === "function") void fn();
}

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
      <VMenu v-if="hasExport" location="bottom">
        <template #activator="{ props: menuProps }">
          <VTooltip
            location="bottom"
            :disabled="busy"
            class="fill-height d-inline-flex"
          >
            <template #activator="{ props: tipProps }">
              <VBtn
                icon
                variant="plain"
                class="d-inline-flex"
                v-bind="mergeProps(menuProps, tipProps)"
                :disabled="busy"
                size="default"
                :aria-label="$t('crud.export')"
              >
                <VIcon size="default">mdi-export</VIcon>
              </VBtn>
            </template>
            <span>{{ $t("crud.export") }}</span>
          </VTooltip>
        </template>
        <VList density="compact">
          <VListItem
            v-if="exportCsv"
            :disabled="busy"
            @click="runExport(exportCsv)"
          >
            <VListItemTitle>{{ $t("crud.export_csv") }}</VListItemTitle>
          </VListItem>
          <VListItem
            v-if="exportXlsx"
            :disabled="busy"
            @click="runExport(exportXlsx)"
          >
            <VListItemTitle>{{ $t("crud.export_xlsx") }}</VListItemTitle>
          </VListItem>
          <VListItem
            v-if="exportPdf"
            :disabled="busy"
            @click="runExport(exportPdf)"
          >
            <VListItemTitle>{{ $t("crud.export_pdf") }}</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </template>
    <template v-slot:toolbar-right>
      <div
        class="toolbar-right-cluster d-flex flex-wrap align-center justify-end"
      >
        <slot name="toolbar-right" :busy="busy"></slot>
        <slot name="sortBar" :busy="busy" :fetch="fetch"></slot>
        <slot name="filterControls" :busy="busy" :fetch="fetch"></slot>
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
      </div>
    </template>
    <template v-slot:filtersBar v-if="slotFilled('filterFields')">
      <slot name="filterFields" :busy="busy" :fetch="fetch"></slot>
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
.toolbar-right-cluster {
  gap: 0.35rem;
}
.search-field {
  width: 14rem;
}
</style>
