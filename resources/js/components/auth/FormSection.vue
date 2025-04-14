<script lang="ts">
import { Component, Vue, toNative, Emit } from 'vue-facing-decorator';
import SectionTitle from './SectionTitle.vue';
import { VContainer, VRow, VCol, VCard, VCardText, VCardActions } from 'vuetify/components';

@Component({
  components: {
    SectionTitle,
    VContainer,
    VRow,
    VCol,
    VCard,
    VCardText,
    VCardActions
  }
})
class FormSection extends Vue {
  @Emit('submitted')
  submitted() {}

  get hasActions() {
    return !!this.$slots.actions;
  }
}

export default toNative(FormSection);
</script>

<template>
    <VContainer>
      <VRow class="d-flex">
        <VCol cols="12" md="4">
          <SectionTitle>
            <template #title>
              <slot name="title" />
            </template>
            <template #description>
              <slot name="description" />
            </template>
          </SectionTitle>
        </VCol>
        <VCol cols="12" md="8">
          <VCard class="pa-5">
            <form @submit.prevent="submitted">
              <VCardText>
                <slot name="form" />
              </VCardText>
  
              <VCardActions v-if="hasActions" class="justify-end">
                <slot name="actions" />
              </VCardActions>
            </form>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </template>
