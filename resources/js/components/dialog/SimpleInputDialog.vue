<script lang="ts">
import { Component, Prop, Model, Watch, toNative } from 'vue-facing-decorator';
import { FormDialogBase } from '@/components/form/FormDialogBase.vue';
import FormDialog from '@/components/form/FormDialog.vue';

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
  @Prop({ default: false }) password;
  @Prop({ default: false }) noInput;
  @Prop({ type: [Array, Function] }) rules;
  @Prop({ type: [Function, Number] }) counter;
  input = ''
  inputConfirm = ''
  passwordVisible = false;

  get _label(){
    return this.label ?? this.$t('form.input');
  }

  reset(){
    this.input = '';
    this.inputConfirm = ''
  }

  validateConfirm(inputConfirm){
    return this.input === inputConfirm;
  }

  getValue(){
    return this.input;
  }

  get confirmRules(){
    return [
      v => !!v || "Konfirmasi tidak boleh kosong",
      v => this.validateConfirm(v) || "Konfirmasi tidak sama"
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
  >
      <template v-slot:fields="{ interactable, busy }">
      <p class="text-left">{{ text }}</p>
      <VTextField 
        class="bigger-input" 
        v-if="!noInput && !password" 
        :label="_label" 
        v-model="input" 
        :disabled="!interactable" 
        required
        :rules="rules"
        :counter="counter"
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
        :rules="rules"
        :counter="counter"
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
      />
    </template>
  </FormDialog>
</template>
<style scoped>
.backup-table{
  background: #00000000;
}
</style>
