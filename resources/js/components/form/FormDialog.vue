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
  @Prop({ default: "Batal" }) cancelText;
  @Prop({ default: "Ok" }) confirmText;
  @Prop({ default: 400 }) maxWidth;
  @Prop({ default: "Form" }) title;
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
    <VCard class="">
        <VForm ref="myForm" v-model="valid" class="p-2" :disabled="!interactable" @submit.prevent="submit" >
        <VCardTitle class="headline">{{ title }}</VCardTitle>
        <VCardText>
          <slot name="fields" :interactable="interactable" :busy="busy" :disabled="disabled"></slot>
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
              v-if="cancelText"
            >
              Batal
            </VBtn>
            <VBtn
              type="submit"
              color="green darken-1"
              text
              :disabled="!interactable"
              :loading="busy"
              v-if="confirmText"
            >
              Ok
            </VBtn>
          </VCardActions>
        </VCardText>
        </VForm>
    </VCard>
  </VDialog>
</template>
<style scoped>
</style>
