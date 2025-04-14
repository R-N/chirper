<script lang="ts">
import { Vue, Component, Prop, toNative } from 'vue-facing-decorator';

import SimpleInputDialog from '@/components/dialog/SimpleInputDialog.vue';
import { WorkingComponent } from '@/components/WorkingComponent.vue';

@Component({
    name: "ConfirmationSlot",
    components: {
      SimpleInputDialog
    }
})
class ConfirmationSlot extends WorkingComponent {
  @Prop([String, Function]) confirmTextMaker; 
  @Prop(Function) onConfirm;
  @Prop(Function) onCancel; 
  confirmText = '';
  confirmDialog = false;

  confirm(){
    if(this.onConfirm){
      this.busy = true;
      this.onConfirm();
    }else{
      this.$emit('confirm');
    }
    this.confirmDialog = false;
    this.busy = false;
  }
  ask(){
    if(!this.confirmTextMaker){
      this.confirm();
    }else{
      if (this.confirmTextMaker instanceof Function){
        this.confirmText = this.confirmTextMaker();
      }else if (typeof this.confirmTextMaker === 'string' || this.confirmTextMaker instanceof String){
        this.confirmText = this.confirmTextMaker;
      }else{
        this.confirmText = '';
      }
      this.confirmDialog = true;
    }
  }
}
export { ConfirmationSlot } 
export default toNative(ConfirmationSlot);
</script>
<template>
  <span>
    <slot :ask="ask"></slot>
    <SimpleInputDialog 
      v-if="confirmTextMaker && confirmDialog"
      v-model="confirmDialog" 
      :on-submit="confirm"
      :on-cancel="onCancel"
      title="Konfirmasi"
      :text="confirmText"
      no-input="true"
      :parent-busy="busy"
    />
  </span>
</template>
<style scoped>
</style>
