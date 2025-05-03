<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Model,
  Emit,
  Ref,
  Watch,
  Setup
} from "vue-facing-decorator";
import { WorkingComponent } from "@/components/WorkingComponent.vue";
import { useForm } from "@inertiajs/vue3";

import { Constructor } from "./Constructor.vue";
import { ref, useTemplateRef, defineExpose } from "vue";
import { isFunction } from "@/libs/util.js";

export const FormMixin = <TBase extends Constructor>(Base: TBase) => {
  @Component({
    name: "FormBase",
    components: {},
    emits: ["cancel", "reset", "change", "validate", "submit"]
  })
  class FormBase extends Base {
    @Prop({ type: String, default: "form" }) name;
    @Prop({ type: Boolean, default: false }) disabled;
    @Prop({ type: Object, default: null }) data;
    @Prop({ type: [Array, Function, Object], default: [] }) rules;
    @Prop({ type: String, default: null }) select;

    @Prop({ type: [Object, Function] }) form;
    formData = useForm({});

    @Setup((props, ctx) => {
      const refName = props.name ? `${props.name}Form` : "form";
      // const dynamicFormRef = ctx.refs[refName];
      const dynamicFormRef = useTemplateRef(refName);
      defineExpose(dynamicFormRef);
      return dynamicFormRef;
    })
    dynamicFormRef;
    @Ref("form") formRef;

    _valid = true;

    get valid() {
      if (this.getForm()?.valid === false) {
        return false;
      }
      if (this.getValue()?.valid === false) {
        return false;
      }
      return this._valid;
    }
    set valid(value) {
      this._valid = value;
    }

    get item() {
      return this.data;
    }

    mounted() {
      super.mounted?.();
      this.prepopulate();
    }

    @Watch("data")
    dataWatcher(newValue, oldValue) {
      if (newValue) {
        this.prepopulate();
      }
    }
    prepopulate() {
      const form = this.getForm();
      form?.prepopulate?.();
      if (this.data) {
        Object.assign(this.formData, this.data);
      }
    }

    @Prop({ type: Function }) onCancel;
    @Prop({ type: Function }) onChange;
    @Prop({ type: Function }) onReset;
    @Prop({ type: Function }) onValidate;
    @Prop({ type: Function }) onSubmit;

    @Emit("cancel")
    emitCancel(value = null) {
      return value;
    }
    @Emit("reset")
    emitReset(value = null) {
      return value;
    }
    @Emit("change")
    emitChange(value = null) {
      return value;
    }
    @Emit("validate")
    emitValidate(value = null) {
      return value;
    }
    @Emit("submit")
    emitSubmit(value = null) {
      return value;
    }

    getForm() {
      let form = null;
      const refName = this.name ? `${this.name}Form` : "form";
      if (this.form) form = this.form;
      else if ("dynamicFormRef" in this && this.dynamicFormRef)
        form = this.dynamicFormRef;
      else if (refName in this.$refs && this.$refs[refName])
        form = this.$refs[refName];
      else if ("dynamicFormRef" in this.$refs && this.$refs.dynamicFormRef)
        form = this.$refs.dynamicFormRef;
      else if ("formRef" in this.$refs && this.$refs.formRef)
        form = this.$refs.formRef;
      else if ("form" in this.$refs && this.$refs.form) form = this.$refs.form;
      else form = this.formRef;
      if (isFunction(form)) form = form();
      return form;
    }

    getValue() {
      let form = this.getForm();
      form = form?.getForm?.() || form;
      let val = this.formData || form;
      if (!val) val = this.$event;
      return val;
    }

    validate() {
      this.resetValidation();
      let form = this.getForm();
      form?.validate?.();
      form = form?.getForm?.() || form;
      if (this.onValidate) this.onValidate(form);
      else this.emitValidate(form);
      return true;
    }

    resetValidation() {
      this.formData?.clearErrors?.();
      this.getForm()?.resetValidation?.();
      this.valid = true;
    }

    reset() {
      super.reset?.();
      this.resetValidation();
      let form = this.getForm();
      form?.reset?.();
      this.formData?.reset?.();
      form = form?.getForm?.() || form;
      form?.reset?.();
      this.prepopulate();
      if (this.onReset) this.onReset(form, this.formData);
      else this.$emit("reset", form, this.formData);
    }
    async submit() {
      this.validate();
      if (!this.valid) return;
      return await this.waitBusy(async () => {
        const form = this.getForm();
        let ret = null;
        if (this.onSubmit) {
          ret = await this.onSubmit(this.getValue());
        } else if (form && form.submit) {
          ret = await form.submit();
        } else {
          ret = this.emitSubmit(this.getValue());
        }
        this.close();
        return ret;
      });
    }
    close() {}
    get interactable() {
      return !this.disabled && !this.busy;
    }
  }
  return FormBase;
};
export default FormMixin;
</script>
