<script lang="ts">
import { Vue, Component, Prop, Model, Emit, Ref, Watch, toNative } from 'vue-facing-decorator';
import {WorkingComponent} from '@/components/WorkingComponent.vue';
import { useForm } from '@inertiajs/vue3';

import { Constructor } from './Constructor.vue';

export const FormMixin = <TBase extends Constructor>(Base: TBase) => {
  @Component({
      name: "FormBase",
      components: {
      },
      emits: ['cancel', 'reset', 'change', 'validate', 'submit']
  })
  class FormBase extends Base {
    @Ref("myForm") myForm;
    form = useForm({});
    valid = true;
    @Prop({ type: Boolean, default: false }) disabled;
    @Prop({ type: Object, default: null }) data;
    @Prop({ type: [Array, Function, Object], default: [] }) rules;

    @Watch("data")
    dataWatcher(newValue, oldValue){
      if (newValue){
        this.prepopulate();
      }
    }
    prepopulate(){
      Object.assign(this.form, this.data);
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
      return this.myForm;
    }

    getValue(){
        let val = this.form || this.getForm();
        if (!val)
            val = this.$event;
        return val;
    }

    validate(){
      this.resetValidation();
      if(this.getForm()){
        this.getForm().validate();
      }
      if(this.onValidate)
        this.onValidate(this.getForm());
      else
        this.emitValidate(this.getForm());
      return true;
    }

    resetValidation(){
      this.form?.clearErrors?.();
      if(this.getForm()){
        this.getForm().resetValidation();
      }
      this.valid = true;
    }

    reset(){
      this.resetValidation();
      this.form?.reset?.();
      if (this.onReset)
        this.onReset(this.getForm());
      else
        this.emitReset(this.getForm());
    }
    async submit(){
      this.validate();
      if(!this.valid) return;
      await this.waitBusy(
        async () => {
          if(this.onSubmit){
              await this.onSubmit(this.getValue());
          }else{
              this.emitSubmit(this.getValue());
          }
          this.close();
        }
      );
    }
    close(){}
  }
  return FormBase;
}
</script>
