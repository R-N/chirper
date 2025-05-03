<script lang="ts">
import { Component, Prop, Ref, toNative } from 'vue-facing-decorator';
import FormDialog from '@/components/form/FormDialog.vue';
import { CrudFormDialogBase } from '@/components/form/CrudFormDialogBase.vue';
import { useForm } from '@inertiajs/vue3';
import settingService from '../services/setting';
import { VTextField } from 'vuetify/components';
import SettingForm from '../forms/Setting.vue';
import { SettingFormMixin } from '../mixins/SettingForm.vue';

const BaseClass = SettingFormMixin(CrudFormDialogBase);

@Component({
  name: "SettingFormDialog",
  components: {
    FormDialog,
    VTextField,
    SettingForm
  },
  emits: ['submit']
})
class SettingFormDialog extends BaseClass {
  client = settingService;
  @Prop({ default: [] }) availableRoles;
  @Prop({ default: [] }) availablePermissions;

  get title(){
    if (this.item)
      return `${this.$t('settings.item')}: ${this.item.key}`;
    return this.$t('settings.item');
  }
}
export { SettingFormDialog }
export default toNative(SettingFormDialog);
</script>
<template>
  <FormDialog
    max-width="400"
    :parent-busy="busy"
    :title="title"
    :disabled="disabled"
    :on-reset="reset"
    v-model="myDialog"
    :data="data"
    :form="getForm"
  >
    <template v-slot:fields="{ interactable, busy }">
      <SettingForm 
        :disabled="!interactable"
        :bypass-editable-cell="true"
        :setting-types="settingTypes"
        :data="data"
        ref="form"
        @submit="(...args) => $emit('submit', ...args)"
        :rules="rules"
      />
    </template>
  </FormDialog>
</template>
<style scoped>
</style>
