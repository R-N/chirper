<script lang="ts">
import { Component, Prop, Emit, Setup } from 'vue-facing-decorator';
import EditableCell from '@/components/form/EditableCell.vue';
import { useForm } from '@inertiajs/vue3';
import { isObject, getData } from '@/libs/util';

import { Constructor } from './Constructor.vue';

export const EditableCellMixin = <TBase extends Constructor>(Base: TBase) => {
  @Component({
      name: "EditableCellBase",
      components: {
          EditableCell
      }
  })
  class EditableCellBase extends Base {
      @Prop({ type: String }) title;
      @Prop({ type: String }) label;
      @Prop({ type: String, default: 'value' }) name;
      @Prop({ type: [String, Object, Array] }) value;
      @Prop({ type: [String, Function] }) confirmTextMaker; 
      @Prop({ default: false }) disabled;
      @Prop({ type: Function }) onFinish;
      @Prop({ default: null }) errorMessages;
      @Prop({ default: true }) emitForm;
      @Prop({ type: [String, Object, Array] }) rules;

      get _label(){
          if (this.title)
              return null;
          return this.label;
      }
      get _rules(){
          if (isObject(this.rules)){
          return getData(this.rules, this.name);
          }
          return this.rules;
      }

      @Setup((props, ctx) => {
          if (props.name){
              return useForm({
                  [props.name]: null,
              });
          }else{
              return useForm({
                  value: null,
              });
          }
      }) form;
      valueEdit : any = '';

      created(){
          this.form = useForm({
              [this.name]: '',
          });
      }

      getValue() : any{
          if (this.emitForm)
              return this.form;
          return this.valueEdit;
      }

      resetValidation(){
          this.form.clearErrors();
      }

      validate(){
          this.resetValidation();
          const rules = this._rules;
          if (!rules)
              return;
          for (const rule of rules) {
              const result = rule(this.valueEdit)
              if (result !== true) {
                  this.form.errors[this.name] = result;
                  break
              }
          }
      }

      get valid(){
          return !Object.keys(this.form.errors).length;
      }

      async finish(){
          this.validate();
          if (!this.valid)
              return;
          this.form[this.name] = this.valueEdit;
          this.$emit("change", this.getValue());
          if (this.onFinish){
              await this.waitBusy(
                  async () => await this.onFinish(this.getValue(), this.releaseBusy),
                  // null, this.releaseBusy
              );
          } else{
              // this.emitFinish({ value: this.valueEdit, releaseBusy: this.releaseBusy });
              this.$emit("finish", this.getValue(), this.releaseBusy);
          }
      }

      @Emit("change")
      emitChange(value){
          return value;
      }
      @Emit("finish")
      emitFinish(value){
          return value;
      }
  }
  return EditableCellBase;
}
</script>
