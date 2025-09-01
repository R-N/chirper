<script lang="ts">
import { Component, Prop, toNative } from "vue-facing-decorator";
import EditableCellTextField from "@/components/form/editable_cell/EditableCellTextField.vue";
import EditableCellSelect from "@/components/form/editable_cell/EditableCellSelect.vue";
import SyncCheckbox from "@/components/checkbox/SyncCheckbox.vue";
import ConfirmationIconButton from "@/components/button/ConfirmationIconButton.vue";
import { WorkingComponent } from "../WorkingComponent.vue";
import { selectFilled, makeBindings, combineCollection } from "@/libs/util";
import EditableCellTextArea from "./editable_cell/EditableCellTextArea.vue";

export const COMPONENT_MAP = {
  "text": EditableCellTextField,
  "textarea": EditableCellTextArea,
  "select": EditableCellSelect
}

@Component({
  name: "GenericField",
  components: {
    EditableCellTextField,
    EditableCellSelect,
    SyncCheckbox,
    ConfirmationIconButton,
    EditableCellTextArea
  },
  emits: ["submit"]
})
class GenericField extends WorkingComponent {
  @Prop({ type: Object }) crud;
  @Prop({ type: Object }) field;
  @Prop({ type: Object }) data;
  @Prop({ type: Object }) formData;
  @Prop({ type: [Object, Array] }) rules;
  @Prop({ type: Boolean }) showTitle;
  @Prop({ type: Boolean }) bypassEditableCell;

  makeBindings(f=null, data=null){
    return makeBindings(f ?? this.field, data ?? this.data);
  }

  combineCollection(obj, arr){
    return combineCollection(obj, arr);
  }

  get select(){
    return this.field.select ?? this.field.value ?? this.field.name;
  }
  get _rules(){
    return combineCollection(this.rules, this.rules[this.field.name ?? this.field.value]);
  }
  get model(){
    return this.field.model ?? this.field.value ?? this.field.name;
  }
  get name(){
    return this.field.name ?? this.field.value;
  }
  get disabled(){
    return this.busy;
  }
  get store(){
    return this.field.onStore || this.crud.storeItem;
  }
  get confirmTextMaker(){
    return this.field.confirmTextMaker ? 
      (value) => this.field.confirmTextMaker(this.data, value) :
      (value) => this.crud.setFieldConfirmText(
        this.field.value ?? this.field.name, 
        this.data, value, 
        this.field.getValue
      )
  }
  get value(){
    return this.formData ? this.formData[this.name] : this.data?.[this.name];
  }
  get onFinish(){
    return this.field.onFinish ?? ((value) => this.crud.setField(this.field.name, this.data, value));
  }
  selectFilled(obj){
    return selectFilled(obj);
  }
  get component(){
    if (this.field.component){
      return this.field.component;
    }else {
      return COMPONENT_MAP[this.field.type];
    }
  }
}
export { GenericField };
export default toNative(GenericField);
</script>
<template>
  <component
    :is="component"
    :disabled="disabled"
    :data="data"
    :rules="_rules"
    :select="select"
    @store="store"
    v-bind="makeBindings(field, data || formData)"
    :confirmTextMaker="confirmTextMaker"
    :parent-busy="busy"
    :error-messages="formData?.errors[name]"
    :required="field.required"
    :show-title="field.showTitle ?? showTitle"
    :bypass="bypassEditableCell || field.bypassEditableCell"
    :name="field.name"
    class="bigger-input"
    :label="field.label"
    :title="field.label"
    :value="value"
    :on-finish="onFinish"
  />
</template>
<style scoped></style>
