<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import { VRow, VCol } from 'vuetify/components';

@Component({
  components: {
    VRow,
    VCol,
  },
})
class SectionTitle extends Vue {}

export default toNative(SectionTitle);
</script>

<template>
  <VRow justify="space-between" align="center">
    <VCol>
      <h3 class="text-h6 font-weight-medium">
        <slot name="title" />
      </h3>
      <p class="text-body-2 text-medium-emphasis mt-1">
        <slot name="description" />
      </p>
    </VCol>

    <VCol class="text-right">
      <slot name="aside" />
    </VCol>
  </VRow>
</template>
