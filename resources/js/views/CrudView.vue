<script lang="ts">
import {
  Component,
  Prop,
  Watch,
  Model,
  Emit,
  toNative
} from "vue-facing-decorator";
import { ViewBase } from "@/views/ViewBase.vue";

import MainCard from "@/components/card/MainCard.vue";
import IconButton from "@/components/button/IconButton.vue";

let modelEvent = "update:modelValue";

@Component({
  name: "CrudView",
  components: {
    MainCard,
    IconButton
  },
  emits: [modelEvent]
})
class CrudView extends ViewBase {
  @Prop({ type: String }) title;
  @Prop({ type: String }) createText;
  @Prop({ type: String }) refreshText;
  @Prop({ type: Function }) create;
  @Prop({ type: Function }) fetch;
  @Model({ name: "search", type: [String, Object] }) mySearch;
  @Prop({ default: null }) exportCsv;
  @Prop({ default: null }) exportXlsx;
  @Prop({ default: null }) exportPdf;
  @Model({ name: "selecting", default: false }) mySelecting;
  @Prop({ default: false }) selectable;
  @Prop({ default: true }) selected;
  _null = null;

  @Emit(modelEvent)
  emitModel(value) {
    return value;
  }
  slotFilled(name) {
    const slot = this.$slots[name];
    if (!slot) return false;

    const nodes = slot();
    return nodes.some(
      (vnode) =>
        vnode.type !== Comment &&
        vnode.type !== Text &&
        vnode.type !== undefined
    );
  }
}
export { CrudView };
export default toNative(CrudView);
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
      <VTextField
        v-if="!(typeof mySearch === 'undefined' || mySearch === null)"
        class="pt-0 mt-0"
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
