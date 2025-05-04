<script lang="ts">
import { Component, Prop, toNative } from "vue-facing-decorator";
import EditableCellTextField from "@/components/form/editable_cell/EditableCellTextField.vue";
import EditableCellSelect from "@/components/form/editable_cell/EditableCellSelect.vue";
import SyncCheckbox from "@/components/checkbox/SyncCheckbox.vue";
import ConfirmationIconButton from "@/components/button/ConfirmationIconButton.vue";
import { WorkingComponent } from "../WorkingComponent.vue";
import { selectFilled } from "@/libs/util";

@Component({
  name: "CrudForm",
  components: {
    EditableCellTextField,
    EditableCellSelect,
    SyncCheckbox,
    ConfirmationIconButton
  },
  emits: ["submit"]
})
class CrudForm extends WorkingComponent {
  @Prop({ type: Function, default: null }) setFieldConfirmText;
  @Prop({ type: Function, default: null }) setField;
  @Prop({ default: null }) data;
  @Prop({ default: true }) bypassEditableCell;
  @Prop({ default: [] }) fields;
  @Prop({ default: {} }) rules;
  @Prop({ default: true }) interactable;
  @Prop({ default: false }) disabled;
  @Prop({ default: {} }) formData;
  @Prop({ type: String, default: null }) select;

  get _interactable(){
    return this.interactable && !this.busy && !this.disabled;
  }

  selectFilled(obj){
    return selectFilled(obj);
  }
}
export { CrudForm };
export default toNative(CrudForm);
</script>
<template>
  <div v-for="field in fields">
    <EditableCellTextField
      v-if="field.type=='text' && (!select || select == field.name)"
      :name="field.name"
      class="bigger-input"
      :label="field.label"
      :title="field.label"
      :showTitle="!select"
      v-model="formData[field.name]"
      :disabled="!_interactable"
      :required="field.required"
      :error-messages="formData.errors[field.name]"
      :rules="rules[field.name]"
      :bypass="bypassEditableCell"
      :value="formData[field.name]"
      :confirm-text-maker="(value) => setFieldConfirmText(field.name, data, value, field.getValue)"
      :on-finish="(value) => setField(field.name, data, value)"
      v-bind="field.props"
    />
    <EditableCellSelect
      v-if="field.type=='select' && (!select || select == field.name) && (selectFilled(data?.[field.name]) || (field.values || field.items)?.length)"
      class="bigger-input"
      :name="field.name"
      :label="field.label"
      :title="field.label"
      :showTitle="!select"
      :items="field.values || field.items"
      v-model="formData[field.name]"
      :disabled="!_interactable"
      :required="field.required"
      :error-messages="formData.errors[field.name]"
      :bypass="bypassEditableCell"
      :confirm-text-maker="(value) => setFieldConfirmText(field.name, data, value)"
      :on-finish="(value) => setField(field.name, data, value)"
      v-bind="field.props"
    />
  </div>
</template>
<style scoped></style>
