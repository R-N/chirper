<script lang="ts">
import { Vue, Component, Prop, Model, Emit, Ref, toNative } from 'vue-facing-decorator';
import {WorkingComponent} from '@/components/WorkingComponent.vue';

@Component({
    name: "FormBase",
    components: {
    },
    emits: ['cancel', 'reset', 'change', 'validate', 'submit']
})
class FormBase extends WorkingComponent {
  @Ref("myForm") myForm;
  valid = true;
  @Prop({ type: Boolean, default: false }) disabled;

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
  _getValue(){
      let val = this.getForm();
      if (!val)
          val = this.$event;
      return val;
  }
  getValue(){
      return this._getValue();
  }

  _validate(){
    if(this.getForm()){
      this.getForm().validate();
    }
    if(this.onValidate)
      this.onValidate(this.getForm());
    else
      this.emitValidate(this.getForm());
    return true;
  }
  validate(){
      return this._validate();
  }

  _resetValidation(){
    if(this.getForm()){
      this.getForm().resetValidation();
    }
    this.valid = true;
  }
  resetValidation(){
      return this._resetValidation();
  }

  _reset(){
    this.resetValidation();
    if (this.onReset)
      this.onReset(this.getForm());
    else
      this.emitReset(this.getForm());
  }
  reset(){
      this._reset();
  }
  async _submit(){
      this.validate();
      if(!this.valid) return;
      if(this.onSubmit){
          this.busy = true;
          await this.onSubmit(this.getValue());
      }else{
          this.emitSubmit(this.getValue());
      }
      this.close();
  }
  async submit(){
      return await this._submit();
  }
  close(){}
}
export { FormBase };
export default toNative(FormBase);
</script>
