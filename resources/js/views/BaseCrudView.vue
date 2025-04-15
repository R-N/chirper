<script lang="ts">

import { Component, Prop, Watch, Model, Emit, toNative } from 'vue-facing-decorator';
import { BaseView } from '@/views/BaseView.vue';

import MainCard from '@/components/card/MainCard.vue';
import IconButton from '@/components/button/IconButton.vue';

let modelEvent = "update:modelValue"

@Component({
    name: "BaseCrudView",
    components: {
      MainCard,
      IconButton
    },
    emits: [modelEvent]
})
class BaseCrudView extends BaseView {
  @Prop({ default: 'Crud' }) title;
  @Prop({ default: 'Buat' }) createText;
  @Prop({ default: 'Refresh' }) refreshText;
  @Prop({ type: Function }) create;
  @Prop({ type: Function }) fetch;
  @Model({ type: [String, Object] }) mySearch;

  @Emit(modelEvent)
  emitModel(value){
    return value;
  }
}
export { BaseCrudView };
export default toNative(BaseCrudView);
</script>
<template>
  <MainCard :title="title">
    <template v-slot:toolbar-left>
      <IconButton
        @click="create"
        :disabled="busy"
        icon="mdi-plus"
        :text="createText"
        :small="false"
      />
      <IconButton
        @click="fetch"
        :disabled="busy"
        icon="mdi-refresh"
        :text="refreshText"
        :small="false"
      />
      <slot name="toolbar-left" :busy="busy"></slot>
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