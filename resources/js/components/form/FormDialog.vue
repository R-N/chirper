<script lang="ts">

import { Component, Prop, Watch, Model, toNative } from 'vue-facing-decorator';
import { WorkingComponent } from '@/components/WorkingComponent.vue';
import { ViewBase } from '@/views/ViewBase.vue';
import { DialogBase } from '@/components/dialog/DialogBase.vue';
import { FormDialogBase } from '@/components/form/FormDialogBase.vue';

@Component({
  name: "FormDialog",
  components: {
  }
})
class FormDialog extends FormDialogBase {
  @Prop({ type: String }) cancelText;
  @Prop({ type: String }) confirmText;
  @Prop({ default: 400 }) maxWidth;
  @Prop({ type: String }) title;
}
export { FormDialog };
export default toNative(FormDialog);
</script>
<template>
  <VDialog
    v-model="myDialog"
    :max-width="maxWidth"
    :persistent="busy"
  >
    <VCard class="pa-2">
      <VCardTitle class="pb-1">{{ title ?? $t('form.form') }}</VCardTitle>
      <VCardText>
        <slot name="fields" :interactable="interactable" :busy="busy" :disabled="disabled" :data="data"></slot>
      </VCardText>
      <VCardActions>
        <slot name="buttons-left" :interactable="interactable" :busy="busy" :disabled="disabled"></slot>
        <VSpacer></VSpacer>
        <slot name="buttons" :interactable="interactable" :busy="busy" :disabled="disabled"></slot>
        <slot name="buttons-right" :interactable="interactable" :busy="busy" :disabled="disabled"></slot>
        <VBtn
          color="green darken-1"
          text
          @click.stop="close()"
          :disabled="!interactable"
          v-if="cancelText ?? $t('form.cancel')"
        >
          {{ $t('form.cancel') }}
        </VBtn>
        <VBtn
          @click.prevent.stop="submit"
          color="green darken-1"
          text
          :disabled="!interactable"
          :loading="busy"
          v-if="confirmText ?? $t('form.confirm')"
        >
          {{ $t('form.confirm') }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
<style scoped>
</style>
