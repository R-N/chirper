<script lang="ts">
import { Vue, Component, Prop, Model, Emit, Ref, Watch, Setup } from 'vue-facing-decorator';
import {WorkingComponent} from '@/components/WorkingComponent.vue';
import { useForm } from '@inertiajs/vue3';

import { Constructor } from './Constructor.vue';
import { ref, useTemplateRef, defineExpose } from 'vue'

export const FormMixin = <TBase extends Constructor>(Base: TBase) => {
  @Component({
      name: "FormBase",
      components: {
      },
      emits: ['cancel', 'reset', 'change', 'validate', 'submit']
  })
  class FormBase extends Base {
    @Prop({ type: String, default: 'form' }) name;
    @Prop({ type: Boolean, default: false }) disabled;
    @Prop({ type: Object, default: null }) data;
    @Prop({ type: [Array, Function, Object], default: [] }) rules;

    @Prop({ type: Object }) form;
    formData = useForm({});

    @Setup((props, ctx) => {
      const refName = props.name ? `${props.name}Form` : 'form';
      // const dynamicFormRef = ctx.refs[refName];
      const dynamicFormRef = useTemplateRef(refName);
      defineExpose(dynamicFormRef);
      return dynamicFormRef;
    }) dynamicFormRef;
    @Ref("form") formRef;

    _valid = true;

    get valid(){
      if (this.getForm()?.valid === false){
        return false;
      }
      if (this.getValue()?.valid === false){
        return false;
      }
      return this._valid;
    }
    set valid(value){
      this._valid = value;
    }

    get item(){
      return this.data;
    }

    mounted(){
      super.mounted?.();
      this.prepopulate();
    }

    @Watch("data")
    dataWatcher(newValue, oldValue){
      if (newValue){
        this.prepopulate();
      }
    }
    prepopulate(){
      const form = this.getForm();
      form?.prepopulate?.();
      if (this.data){
        Object.assign(this.formData, this.data);
      }
    }

    @Prop({ type: Function }) onCancel;
    @Prop({ type: Function }) onChange;
    @Prop({ type: Function }) onReset;
    @Prop({ type: Function }) onValidate;
    @Prop({ type: Function }) onSubmit;

    @Emit("cancel")
    emitCancel(value=null){
      return value;
    }
    @Emit("reset")
    emitReset(value=null){
      return value;
    }
    @Emit("change")
    emitChange(value=null){
      return value;
    }
    @Emit('validate')
    emitValidate(value=null){
      return value;
    }
    @Emit("submit")
    emitSubmit(value=null){
        return value;
    }

    getForm(){
      if (this.form)
        return this.form;
      if ('dynamicFormRef' in this && this.dynamicFormRef)
        return this.dynamicFormRef;
      const refName = this.name ? `${this.name}Form` : 'form';
      if (refName in this.$refs && this.$refs[refName])
        return this.$refs[refName];
      if ('dynamicFormRef' in this.$refs && this.$refs.dynamicFormRef)
        return this.$refs.dynamicFormRef;
      if ('formRef' in this.$refs && this.$refs.formRef)
        return this.$refs.formRef;
      if ('form' in this.$refs && this.$refs.form)
        return this.$refs.form;
      return this.formRef;
    }

    getValue(){
        let form = this.getForm();
        form = form?.getForm?.() || form;
        let val = this.formData || form;
        if (!val)
            val = this.$event;
        return val;
    }

    validate(){
      this.resetValidation();
      let form = this.getForm();
      form?.validate?.();
      form = form?.getForm?.() || form;
      if(this.onValidate)
        this.onValidate(form);
      else
        this.emitValidate(form);
      return true;
    }

    resetValidation(){
      this.formData?.clearErrors?.();
      this.getForm()?.resetValidation?.();
      this.valid = true;
    }

    reset(){
      super.reset?.();
      this.resetValidation();
      let form = this.getForm();
      form?.reset?.();
      this.formData?.reset?.();
      form = form?.getForm?.() || form;
      form?.reset?.();
      this.prepopulate();
      if (this.onReset)
        this.onReset(form, this.formData);
      else
        this.$emit('reset', form, this.formData);
    }
    async submit(){
      this.validate();
      if(!this.valid) return;
      await this.waitBusy(
        async () => {
          const form = this.getForm();
          if(this.onSubmit){
              await this.onSubmit(this.getValue());
          }else if (form && form.submit){
              form.submit();
          }else{
              this.emitSubmit(this.getValue());
          }
          this.close();
        }
      );
    }
    close(){}
    get interactable(){
        return !this.disabled && !this.busy;
    }
  }
  return FormBase;
}
</script>
