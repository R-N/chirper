<script lang="ts">
import { Vue, Component, Prop, Emit, toNative } from 'vue-facing-decorator';

import SimpleInputDialog from '@/components/dialog/SimpleInputDialog.vue';
import { WorkingComponent } from '@/components/WorkingComponent.vue';

@Component({
    name: "ConfirmationSlot",
    components: {
      SimpleInputDialog
    },
    emits: ['confirm', 'cancel']
})
class ConfirmationSlot extends WorkingComponent {
  @Prop({ type: [String, Function] }) confirmTextMaker; 
  @Prop({ type: Function }) onConfirm;
  @Prop({ type: Function }) onCancel; 
  confirmText : String | Function = '';
  confirmDialog = false;

  @Emit('confirm')
  emitConfirm() {
    return true;
  }
  @Emit('cancel')
  emitCancel() {
    return true;
  }

  confirm(){
    if(this.onConfirm){
      this.busy = true;
      this.onConfirm();
    }else{
      this.emitConfirm();
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
