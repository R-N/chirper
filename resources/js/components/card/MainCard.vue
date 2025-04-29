<script lang="ts">
import { Vue, Component, Prop, toNative } from 'vue-facing-decorator';

import CardTitle from '@/components/card/CardTitle.vue';
import CardToolbar from '@/components/card/CardToolbar.vue';

@Component({
    name: "MainCard",
    components: {
      CardTitle,
      CardToolbar
    }
})
class MainCard extends Vue {
  @Prop({ default: "Title" }) title;
  @Prop({ default: false }) noToolbar;
}
export { MainCard };
export default toNative(MainCard);
</script>
<template>
  <VCard class="fill-width py-2 px-4">
    <CardTitle :title="title" />
    <CardToolbar v-if="!noToolbar" class="d-flex">
      <template v-slot:left>
        <slot name="toolbar-left"></slot>
      </template>
      <template v-slot:right>
        <slot name="toolbar-right"></slot>
      </template>
    </CardToolbar>
    <VCardText>
      <slot name="content"></slot>
      <slot name="default"></slot>
    </VCardText>
  </VCard>
</template>
<style scoped>
</style>
