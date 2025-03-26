<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import SectionTitle from './SectionTitle.vue';
import { VContainer, VRow, VCol, VCard, VCardText } from 'vuetify/components';

@Component({
  components: {
    SectionTitle,
    VContainer,
    VRow,
    VCol,
    VCard,
    VCardText,
  }
})
class ActionSection extends Vue {}

export default toNative(ActionSection);
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
          <v-card-text>
            <slot name="content" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
