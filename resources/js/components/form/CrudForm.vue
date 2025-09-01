<script lang="ts">
import { Component, Prop, toNative } from "vue-facing-decorator";
import EditableCellTextField from "@/components/form/editable_cell/EditableCellTextField.vue";
import EditableCellSelect from "@/components/form/editable_cell/EditableCellSelect.vue";
import SyncCheckbox from "@/components/checkbox/SyncCheckbox.vue";
import ConfirmationIconButton from "@/components/button/ConfirmationIconButton.vue";
import { WorkingComponent } from "../WorkingComponent.vue";
import { selectFilled } from "@/libs/util";
import EditableCellTextArea from "./editable_cell/EditableCellTextArea.vue";
import { GenericField } from "./GenericField.vue";

@Component({
  name: "CrudForm",
  components: {
    GenericField,
    EditableCellTextField,
    EditableCellSelect,
    SyncCheckbox,
    ConfirmationIconButton,
    EditableCellTextArea
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

  get self(){
    return this;
  }
}
export { CrudForm };
export default toNative(CrudForm);
</script>
<template>
  <div v-for="field in fields">
    <GenericField
      v-if="(!select || select == field.name)"
      :key="field.name"
      :field="field"
      :data="data"
      :crud="self"
      :rules="rules"
      :bypass-editable-cell="bypassEditableCell && !select"
      :show-title="!select"
      :form-data="formData"
    />
  </div>
</template>
<style scoped></style>
