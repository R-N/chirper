<script lang="ts">
import { Vue, Component, Prop, Model, toNative } from 'vue-facing-decorator';
import {WorkingComponent} from '@/components/WorkingComponent.vue';

import ConfirmationSlot from '@/components/dialog/ConfirmationSlot.vue';

@Component({
    name: "EditableCell",
    components: {
      ConfirmationSlot
    }
})
class EditableCell extends WorkingComponent {
  @Prop(String) title;
  @Prop(Function) onFinish;
  @Prop(Function) onReset;
  @Prop([String, Function]) confirmTextMaker; 
  @Prop(Function) changeDetector;
  @Prop({ default: false }) disabled;
  confirmDialog=false;
  valid=true;
  editing=false;
  // @Model("change", {default: false}) edit;

  // get editing(){
  //  return this.edit;
  // }
  // set editing(value){
  //  if(value == this.edit) return;
  //  this.resetValidation();
  //  this.busy = false;
  //  this.$emit('change', value);
  // }
  
  async beginEdit(){
    if(this.onEdit)
      await this.onEdit();
    else
      this.$emit("edit");
    this.editing = true;
    this.reset();
  }
  async cancelEdit(){
    this.editing = false;
    if(this.onCancel)
      await this.onCancel();
    else
      this.$emit("cancel");
    this.reset();
  }

  reset(){
    this.resetValidation();
    if (this.onReset)
      this.onReset(this.getForm());
    else
      this.$emit("reset");
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
    //this.$emit("submit", e);
    let form = this.$refs.myForm.$el;
    let formData = Object.fromEntries(new FormData(form).entries());
    if(this.onFinish)
      await this.onFinish(formData);
    else
      this.$emit("finish", formData);
    this.editing = false;
  }
  getForm(){
    return this.$refs.myForm;
  }
  getValue(){
    let val = this.getForm();
    if (!val)
      val = this.$event;
    return val;
  }
  validate(){
    if(this.getForm()){
      this.getForm().validate();
    }
    if(this.onValidate)
      this.onValidate(this.getForm());
    else
      this.$emit('validate', this.getForm());
    return true;
  }
  async resetValidation(){
    if(this.getForm()){
      this.getForm().resetValidation();
    }
    this.valid = true;
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
              <template v-slot:activator="{ on, attrs }">
                <VBtn 
                  icon 
                  type="submit"  
                  v-bind="attrs" 
                  v-on="on"
                  :disabled="busy"
                >
                  <VIcon size="32" small>mdi-check</VIcon>
                </VBtn>
              </template>
              <span>Simpan</span>
            </VTooltip>
            <VTooltip bottom key="cancel">
              <template v-slot:activator="{ on, attrs }">
                <VBtn 
                  icon 
                  @click.stop="cancelEdit" 
                  v-bind="attrs" 
                  v-on="on"
                  :disabled="busy"
                >
                  <VIcon size="32" small>mdi-cancel</VIcon>
                </VBtn>
              </template>
              <span>Batal</span>
            </VTooltip>
          </span>
          <span v-else>
            <VTooltip bottom key="edit">
              <template v-slot:activator="{ on, attrs }">
                <VBtn 
                  icon 
                  @click.stop="beginEdit" 
                  v-bind="attrs" 
                  v-on="on"
                  :disabled="busy"
                >
                  <VIcon size="32" small>mdi-pencil</VIcon>
                </VBtn>
              </template>
              <span>Ubah</span>
            </VTooltip>
          </span>
        </span>
      </div>
    </VForm>
  </ConfirmationSlot>
</template>
<style scoped>
</style>
