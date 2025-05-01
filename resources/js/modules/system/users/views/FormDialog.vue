<script lang="ts">
import { Component, Prop, Ref, toNative } from 'vue-facing-decorator';
import FormDialog from '@/components/form/FormDialog.vue';
import { CrudFormDialogBase } from '@/components/form/CrudFormDialogBase.vue';
import { useForm } from '@inertiajs/vue3';
import userService from '../services/user';
import { VTextField } from 'vuetify/components';
import { UserForm } from '../forms/User.vue';

@Component({
  name: "UserFormDialog",
  components: {
    FormDialog,
    VTextField,
    UserForm
  },
  emits: ['submit']
})
class UserFormDialog extends CrudFormDialogBase {
  @Prop({ default: [] }) availableRoles;
  @Prop({ default: [] }) availablePermissions;
}
export { UserFormDialog }
export default toNative(UserFormDialog);
</script>
<template>
  <FormDialog
    max-width="400"
    :parent-busy="busy"
    :on-submit="submit"
    :title="$t('user.item')"
    :disabled="disabled"
    :on-reset="reset"
    v-model="myDialog"
    :data="data"
    :form="formRef"
  >
    <template v-slot:fields="{ interactable, busy }">
      <UserForm 
        :disabled="!interactable"
        :bypass-editable-cell="true"
        :available-roles="availableRoles"
        :available-permissions="availablePermissions"
        :data="data"
        ref="form"
      />
    </template>
  </FormDialog>
</template>
<style scoped>
</style>
