<script lang="ts">
import { Component, Prop, Watch, Emit, Setup } from "vue-facing-decorator";
import EditableCell from "@/components/form/EditableCell.vue";
import { useForm } from "@inertiajs/vue3";
import { isObject, getData, isObjectEmpty } from "@/libs/util";

import { Constructor } from "./Constructor.vue";

export const EditableCellMixin = <TBase extends Constructor>(Base: TBase) => {
  @Component({
    name: "EditableCellBase",
    components: {
      EditableCell
    },
    emits: ["update:modelValue", "change", "finish", "reset"]
  })
  class EditableCellBase extends Base {
    @Prop({ default: false }) bypass;
    @Prop({ type: String }) title;
    @Prop({ type: String }) label;
    @Prop({ type: String, default: "value" }) name;
    @Prop() modelValue;
    @Prop({ type: [String, Function] }) confirmTextMaker;
    @Prop({ default: false }) disabled;
    @Prop({ type: Function }) onFinish;
    @Prop({ default: null }) errorMessages;
    @Prop({ default: true }) emitForm;
    @Prop({ type: [String, Object, Array] }) rules;
    @Prop({ default: true }) showTitle;
    valueEdit: any = "";

    get value() {
      return this.modelValue;
    }
    set value(value) {
      this.$emit("update:modelValue", value, this.releaseBusy);
    }

    @Watch("value")
    onValueChanged(newValue) {
      this.reset();
    }

    get _label() {
      if (this.title && !this.bypass) return null;
      return this.label;
    }
    get _rules() {
      if (isObject(this.rules)) {
        return getData(this.rules, this.name);
      }
      return this.rules;
    }

    @Setup((props, ctx) => {
      if (props.name) {
        return useForm({
          [props.name]: null
        });
      } else {
        return useForm({
          value: null
        });
      }
    })
    formData;

    created() {
      if (this.name) {
        if (!this.formData || isObjectEmpty(this.formData)) {
          this.formData = useForm({
            [this.name]: ""
          });
        } else if (!(this.name in this.formData)) {
          this.formData.set({
            ...this.formData.data(),
            [this.name]: ""
          });
        }
      }
      this.reset();
    }

    mounted() {
      this.reset();
    }

    getValue(): any {
      if (this.emitForm) return this.formData;
      return this.valueEdit;
    }

    reset() {
      if (Array.isArray(this.value)) {
        this.valueEdit = [];
      } else {
        this.valueEdit = null;
      }
      this.formData.reset?.();
      this.prepopulate();
    }

    prepopulate() {
      if (this.value) {
        if (Array.isArray(this.value)) {
          this.valueEdit = [...this.value];
        } else if (isObject(this.value)) {
          this.valueEdit = { ...this.value };
        } else {
          this.valueEdit = this.value;
        }
        this.formData[this.name || "value"] = this.valueEdit;
      } else {
      }
    }

    resetValidation() {
      this.formData.clearErrors();
    }

    validate() {
      this.resetValidation();
      const rules = this._rules;
      if (!rules) return;
      for (const rule of rules) {
        const result = rule(this.valueEdit);
        if (result !== true) {
          this.formData.errors[this.name] = result;
          break;
        }
      }
    }

    get valid() {
      return !Object.keys(this.formData.errors).length;
    }

    async finish(getValue = null) {
      this.validate();
      if (!this.valid) return;
      let value = this.valueEdit;
      this.formData[this.name] = getValue ? getValue(value) : value;
      this.value = this.valueEdit; // not getValue because it can return form
      value = this.getValue();
      this.$emit("change", value, this.releaseBusy);
      if (this.onFinish) {
        await this.waitBusy(
          async () => await this.onFinish(value, this.releaseBusy)
          // null, this.releaseBusy
        );
      } else {
        // this.emitFinish({ value: this.valueEdit, releaseBusy: this.releaseBusy });
        this.$emit("finish", value, this.releaseBusy);
      }
    }

    async onUpdate(value) {
      this.valueEdit = value;
      if (this.bypass) {
        this.value = value;
      }
    }

    @Emit("change")
    emitChange(value) {
      return value;
    }
    @Emit("finish")
    emitFinish(value) {
      return value;
    }
  }
  return EditableCellBase;
};
export default EditableCellMixin;
</script>
