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
    <v-container>
      <v-row class="d-flex">
        <v-col cols="12" md="4">
          <SectionTitle>
            <template #title>
              <slot name="title" />
            </template>
            <template #description>
              <slot name="description" />
            </template>
          </SectionTitle>
        </v-col>
        <v-col cols="12" md="8">
          <v-card class="pa-5">
            <form @submit.prevent="submitted">
              <v-card-text>
                <slot name="form" />
              </v-card-text>
  
              <v-card-actions v-if="hasActions" class="justify-end">
                <slot name="actions" />
              </v-card-actions>
            </form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
