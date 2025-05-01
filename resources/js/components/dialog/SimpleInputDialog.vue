<script lang="ts">
import { Component, Prop, Model, Watch, toNative, Setup } from 'vue-facing-decorator';
import { FormDialogBase } from '@/components/form/FormDialogBase.vue';
import FormDialog from '@/components/form/FormDialog.vue';
import { useForm } from '@inertiajs/vue3';
import { isObject, getData } from '@/libs/util';

@Component({
    name: "SimpleInputDialog",
  components:{
    FormDialog
  }
})
class SimpleInputDialog extends FormDialogBase {
  @Prop({ default: 400 }) maxWidth;
  @Prop({ type: String }) title;

  @Prop({ default: "" }) text;
  @Prop({ default: "" }) type;
  @Prop({ type: String }) label;
  @Prop({ type: String, default: "value" }) name;
  @Prop({ default: false }) password;
  @Prop({ default: false }) noInput;
  @Prop({ type: [Function, Number] }) counter;
  @Prop({ default: null }) errorMessages;
  @Prop({ default: null }) confirmErrorMessages;
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
  }) formData;
  @Prop({ default: true }) emitForm;
  valueEdit = '';
  input = ''
  inputConfirm = ''
  passwordVisible = false;

  get _rules(){
    if (isObject(this.rules)){
      return getData(this.rules, this.name);
    }
    return this.rules;
  }

  get _label(){
    return this.label ?? this.$t('form.input');
  }

  reset(){
    super.reset?.();
    this.input = '';
    this.inputConfirm = '';
    this.prepopulate?.();
  }

  validateConfirm(inputConfirm){
    return this.input === inputConfirm;
  }

  getValue(){
    if (this.emitForm)
      return this.formData;
    return this.input;
  }

  get confirmRules(){
    return [
      v => !!v || "Konfirmasi tidak boleh kosong",
      v => this.validateConfirm(v) || "Konfirmasi tidak sama",
      ...this._rules
    ];
  }
}
export { SimpleInputDialog };
export default toNative(SimpleInputDialog);
</script>
<template>
  <FormDialog
    max-width="290"
    :parent-busy="busy"
    :title="title"
    :disabled="disabled"
    v-model="myDialog"
    :on-reset="reset"
    :on-cancel="onCancel"
    :on-submit="submit"
    :form="formRef"
  >
    <template v-slot:fields="{ interactable, busy }">
      <VForm 
        v-model="valid" 
        ref="form" 
        :disabled="!interactable" 
        @submit.prevent.stop="submit" 
        class="d-flex flex-column ga-3" 
      >
      <p class="text-left">{{ text }}</p>
      <VTextField 
        class="bigger-input" 
        v-if="!noInput && !password" 
        :label="_label" 
        v-model="input" 
        :disabled="!interactable" 
        required
        :rules="_rules"
        :counter="counter"
        :name="name"
        :error-messages="errorMessages || formData?.errors?.[name]"
      />
      <VTextField 
        class="bigger-input" 
        v-if="!noInput && password" 
        :label="_label" 
        v-model="input" 
        :disabled="!interactable" 
        :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="() => { passwordVisible = !passwordVisible }"
        :type="passwordVisible ? 'text' : 'password'"
        required
        :rules="_rules"
        :counter="counter"
        :name="name"
        :error-messages="errorMessages || formData?.errors?.[name]"
      />
      <VTextField 
        class="bigger-input" 
        v-if="!noInput && password" 
        :label="'Konfirmasi ' + _label" 
        v-model="inputConfirm" 
        :disabled="!interactable" 
        type="password"
        required
        :counter="counter"
        :rules="confirmRules"
        :name="name+'_confirm'"
        :error-messages="confirmErrorMessages"
      />
      </VForm>
    </template>
  </FormDialog>
</template>
<style scoped>
.backup-table{
  background: #00000000;
}
</style>
