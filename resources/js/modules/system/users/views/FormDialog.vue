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
  form = useForm({
    email: '',
    name: '',
    roles: [],
    permissions: [],
  });
  availableRoles = [];
  availablePermissions = [];

  async created(){
    this.availableRoles = (await userService.get_roles()).roles;
    this.availablePermissions = (await userService.get_permissions()).permissions;
  }

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
    title="User"
    :disabled="disabled"
    :on-reset="reset"
    v-model="myDialog"
  >
    <template v-slot:fields="{ interactable, busy }">
      <VTextField 
        name="email"
        class="bigger-input" 
        label="Email" 
        v-model="form.email" 
        :disabled="!interactable" 
        required
        type="email"
      />
      <VTextField 
        name="name"
        class="bigger-input" 
        label="Nama" 
        v-model="form.name" 
        :disabled="!interactable" 
        required
      />
      <VSelect
        class="bigger-input" 
        name="roles"
        :items="availableRoles"
        item-value="id"
        item-title="name"
        v-model="form.roles"
        :return-object="true"
        multiple
        v-if="hasAvailableRoles"
      />
      <VSelect
        class="bigger-input" 
        name="permissions"
        :items="availablePermissions"
        item-value="id"
        item-title="name"
        v-model="form.permissions"
        :return-object="true"
        multiple
        v-if="hasAvailablePermissions"
      />
    </template>
  </FormDialog>
</template>
<style scoped>
</style>
