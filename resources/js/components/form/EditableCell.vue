<script lang="ts">
import { Vue, Component, Prop, Model, Emit, Ref, toNative } from 'vue-facing-decorator';
import { FormBase } from '@/components/form/FormBase.vue';

import ConfirmationSlot from '@/components/dialog/ConfirmationSlot.vue';
import IconButton from '../button/IconButton.vue';

@Component({
    name: "EditableCell",
    components: {
      ConfirmationSlot,
      IconButton
    },
    emits: ['edit', 'finish']
})
class EditableCell extends FormBase {
  @Prop({ type: String }) title;
  @Prop({ type: String }) editText;
  @Prop({ type: String }) cancelText;
  @Prop({ type: String }) saveText;

  @Prop({ type: [String, Function] }) confirmTextMaker; 
  @Prop({ type: Function }) changeDetector;
  confirmDialog = false;

  editing = false;
  @Model({ default: false }) edit;

  // get editing(){
  //  return this.edit;
  // }
  // set editing(value){
  //  if(value == this.edit) return;
  //  this.resetValidation();
  //  this.busy = false;
  //  this.emitChange(value);
  // }
  
  @Prop({ type: Function }) onEdit;
  @Prop({ type: Function }) onFinish;

  @Emit("edit")
  emitEdit(){
    return true;
  }
  @Emit("finish")
  emitFinish(value){
      return value;
  }
  
  async beginEdit(){
    if(this.onEdit)
      await this.onEdit();
    else
      this.emitEdit();
    this.editing = true;
    this.reset();
  }

  async cancelEdit(){
    this.editing = false;
    if(this.onCancel)
      await this.onCancel();
    else
      this.emitCancel();
    this.reset();
  }

  async finishEdit(ask=null){
    this.validate();
    if(!this.valid) return;
    if(this.changeDetector && !this.changeDetector()){
      await this.cancelEdit();
      return;
    }
    if(!this.confirmTextMaker || !ask){
      await this.onConfirm();
      return;
    }
    await ask(this.onConfirm);
  }

  async onConfirm(){
    //this.emitSubmit(e);
    let form = this.myForm.$el;
    let formData = Object.fromEntries(new FormData(form).entries());
    if(this.onFinish)
      await this.onFinish(formData);
    else
      this.emitFinish(formData);
    this.editing = false;
  }

}
export { EditableCell };
export default toNative(EditableCell);
</script>
<template>
  <ConfirmationSlot
    :confirmTextMaker="confirmTextMaker"
    v-slot="{ ask }"
    :on-confirm="onConfirm"
    class="d-flex flex-grow-1"
  >
    <VForm 
      class="flex-grow-1" 
      ref="myForm" 
      @submit.native.prevent.stop="finishEdit(ask)"
      v-model="valid"
      :disabled="busy"
    >
      <div class="d-flex align-left justify-space-between" v-if="title">
        <span class="font-weight-bold">{{ title }}</span>
      </div>
      <div class="d-flex align-center justify-space-between">
        <span class="flex-grow-1">
          <slot v-if="editing && !(disabled || busy)" name="editing" :readonly="disabled || busy || !editing" :disabled="disabled || busy || !editing" :editing="editing"></slot>
          <slot v-else name="default"></slot>
        </span>
        <span class="flex-grow-0 flex-shrink-0" v-if="!(disabled || busy)">
          <span v-if="editing">
            <IconButton
                @click.stop="() => finishEdit(ask)" 
                type="submit"  
                :disabled="busy"
                icon="mdi-check"
                :text="saveText ?? $t('form.save')"
            />
            <IconButton
                @click.stop="cancelEdit" 
                :disabled="busy"
                icon="mdi-cancel"
                :text="cancelText ?? $t('form.cancel')"
            />
          </span>
          <span v-else>
            <IconButton
                @click.stop="beginEdit" 
                :disabled="busy"
                icon="mdi-pencil"
                :text="editText ?? $t('form.edit')"
            />
          </span>
        </span>
      </div>
    </VForm>
  </ConfirmationSlot>
</template>
<style scoped>
</style>
