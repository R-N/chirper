<script lang="ts">
import { Vue, Component, Prop, Model, Emit, Ref, toNative } from 'vue-facing-decorator';
import { FormBase } from '@/components/form/FormBase.vue';

import ConfirmationSlot from '@/components/dialog/ConfirmationSlot.vue';

@Component({
    name: "EditableCell",
    components: {
      ConfirmationSlot
    },
    emits: ['edit', 'finish']
})
class EditableCell extends FormBase {
  @Prop({ type: String }) title;
  @Prop({ type: String, default: "Ubah" }) editText;
  @Prop({ type: String, default: "Batal" }) cancelText;
  @Prop({ type: String, default: "Simpan" }) saveText;

  @Prop({ type: [String, Function] }) confirmTextMaker; 
  @Prop({ type: Function }) changeDetector;
  confirmDialog = false;

  editing = false;
  @Model({name: "change", default: false}) edit;

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
            <VTooltip bottom key="submit">
              <template #activator="{ props }">
                <VBtn 
                  icon 
                  type="submit"  
                  v-bind="props" 
                  :disabled="busy"
                >
                  <VIcon size="32" small>mdi-check</VIcon>
                </VBtn>
              </template>
              <span>{{saveText}}</span>
            </VTooltip>
            <VTooltip bottom key="cancel">
              <template #activator="{ props }">
                <VBtn 
                  icon 
                  @click.stop="cancelEdit" 
                  v-bind="props" 
                  :disabled="busy"
                >
                  <VIcon size="32" small>mdi-cancel</VIcon>
                </VBtn>
              </template>
              <span>{{cancelText}}</span>
            </VTooltip>
          </span>
          <span v-else>
            <VTooltip bottom key="edit">
              <template #activator="{ props }">
                <VBtn 
                  icon 
                  @click.stop="beginEdit" 
                  v-bind="props" 
                  :disabled="busy"
                >
                  <VIcon size="32" small>mdi-pencil</VIcon>
                </VBtn>
              </template>
              <span>{{editText}}</span>
            </VTooltip>
          </span>
        </span>
      </div>
    </VForm>
  </ConfirmationSlot>
</template>
<style scoped>
</style>
