<script lang="ts">
import { Component, Prop, Emit, Watch, toNative } from 'vue-facing-decorator';
import FormDialog from '@/components/form/FormDialog.vue';
import { CrudFormDialogBase } from '@/components/form/CrudFormDialogBase.vue';
import { useForm } from '@inertiajs/vue3';
import userService from '../services/user';
import { VTextField } from 'vuetify/components';

@Component({
  name: "UserFormDialog",
  components: {
    FormDialog,
    VTextField
  },
  emits: ['submit']
})
class UserFormDialog extends CrudFormDialogBase {
  @Prop({ default: [] }) availableRoles;
  @Prop({ default: [] }) availablePermissions;
  form = useForm({
    email: '',
    name: '',
    roles: [],
    permissions: [],
  });

  get hasAvailableRoles(){
    return this.availableRoles && this.availableRoles.length > 0;
  }

  get hasAvailablePermissions(){
    return this.availablePermissions && this.availablePermissions.length > 0;
  }

  get client(){
    return userService;
  }
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
  >
    <template v-slot:fields="{ interactable, busy }">
      <VTextField 
        name="email"
        class="bigger-input" 
        :label="$t('user.email')" 
        v-model="form.email" 
        :disabled="!interactable" 
        required
        type="email"
        :error-messages="form.errors.email"
        :rules="rules.email"
      />
      <VTextField 
        name="name"
        class="bigger-input" 
        :label="$t('user.name')" 
        v-model="form.name" 
        :disabled="!interactable" 
        required
        :error-messages="form.errors.name"
        :rules="rules.name"
      />
      <VSelect
        class="bigger-input" 
        name="roles"
        :label="$t('user.roles')" 
        :items="availableRoles"
        item-value="name"
        item-title="name"
        v-model="form.roles"
        multiple
        v-if="hasAvailableRoles"
        :error-messages="form.errors.roles"
      />
      <VSelect
        class="bigger-input" 
        name="permissions"
        :label="$t('user.permissions')" 
        :items="availablePermissions"
        item-value="name"
        item-title="name"
        v-model="form.permissions"
        multiple
        v-if="hasAvailablePermissions"
        :error-messages="form.errors.permissions"
      />
    </template>
  </FormDialog>
</template>
<style scoped>
</style>
