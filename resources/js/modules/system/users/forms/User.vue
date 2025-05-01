<script lang="ts">
import { Component, Prop, Emit, Watch, toNative } from 'vue-facing-decorator';
import { useForm } from '@inertiajs/vue3';
import userService from '../services/user';
import { CrudFormBase } from '@/components/form/CrudFormBase.vue';
import EditableCellTextField from '@/components/form/editable_cell/EditableCellTextField.vue';
import EditableCellSelect from '@/components/form/editable_cell/EditableCellSelect.vue';
import SyncCheckbox from '@/components/checkbox/SyncCheckbox.vue';
import { getArrayText } from '@/libs/util.js';
import ConfirmationIconButton from '@/components/button/ConfirmationIconButton.vue';

@Component({
  name: "UserForm",
  components: {
    EditableCellTextField,
    EditableCellSelect,
    SyncCheckbox,
    ConfirmationIconButton
  },
  emits: ['submit']
})
class UserForm extends CrudFormBase {
  @Prop({ default: [] }) availableRoles;
  @Prop({ default: [] }) availablePermissions;
  @Prop({ default: true }) bypassEditableCell;
  @Prop({ type: String, default: null }) select;

  client = userService;
  formData = useForm({
    email: '',
    name: '',
    roles: [],
    permissions: [],
    enabled: true,
    verified: false,
  });

  get hasAvailableRoles(){
    return this.availableRoles && this.availableRoles.length > 0;
  }

  get hasAvailablePermissions(){
    return this.availablePermissions && this.availablePermissions.length > 0;
  }

  getRolesText(val){
      return getArrayText(val, (v) => v.name, false);
  }
}
export { UserForm }
export default toNative(UserForm);
</script>
<template>
  <VForm 
    v-model="valid" 
    :disabled="!interactable" 
    @click.prevent.stop="() => null"
    @submit.prevent.stop="submit" 
    :class="select ? '' : 'd-flex flex-column ga-3'" 
  >
    <div class="d-flex flex-row ga-3">
      <ConfirmationIconButton
          v-if="(!select || select=='clear_password') && data"
          icon="mdi-key-variant"
          :text="$t('user.clear_password')"
          :confirmTextMaker="clearFieldConfirmText('password', data)"
          :on-confirm="() => clearField('password', data)"
          :ask="(ask) => justAsk(data, ask)" 
          :disabled="busy"
          :size="select ? 'small' : 'default'"
      />
      <ConfirmationIconButton
          v-if="(!select || select=='delete') && data"
          icon="mdi-delete"
          :text="$t('form.delete')"
          :confirmTextMaker="deleteConfirmText(data)"
          :on-confirm="() => deleteItem(data)"
          :ask="(ask) => justAsk(data, ask)" 
          :disabled="busy"
          :size="select ? 'small' : 'default'"
      />
      <SyncCheckbox 
          v-if="(!select || select=='enabled') && data"
          name="enabled"
          :label="$t('user.enabled')" 
          :showLabel="!select"
          :text="$t('user.enabled')"
          v-model="formData.enabled" 
          :on-change="value => setEnabled(data, value)"
          :confirm-text-maker="() => setEnabledConfirmText(data)"
          :disabled="busy"
          :text-enable="$t('crud.enable')"
          :text-disable="$t('crud.disable')"
      />
      <SyncCheckbox 
          v-if="(!select || select=='verified') && data"
          name="verified"
          :label="$t('user.verified')" 
          :showLabel="!select"
          :text="$t('user.verified')"
          v-model="formData.verified" 
          :on-change="value => setField('verified', data, value)"
          :confirm-text-maker="() => toggleFieldConfirmText('verified', $t('user.unverifying'), $t('user.force_verify'), item)"
          readonly
          :disabled="busy"
          :text-disable="$t('user.unverify')"
          :text-enable="$t('user.force_verify')"
      />
    </div>
    <EditableCellTextField 
      v-if="!select || select=='name'"
      name="name"
      class="bigger-input" 
      :label="$t('user.name')" 
      :title="$t('user.name')" 
      :showTitle="!select"
      v-model="formData.name" 
      :disabled="!interactable" 
      required
      :error-messages="formData.errors.name"
      :rules="rules.name"
      :bypass="bypassEditableCell"
      :value="formData.name" 
      :confirm-text-maker="(value) => setFieldConfirmText('name', data, value)"
      :on-finish="(value) => setName(data, value)"
    />
    <EditableCellTextField 
      v-if="!select || select=='email'"
      name="email"
      class="bigger-input" 
      :label="$t('user.email')" 
      :title="$t('user.email')" 
      :showTitle="!select"
      v-model="formData.email" 
      :disabled="!interactable" 
      required
      type="email"
      :error-messages="formData.errors.email"
      :rules="rules.email"
      :bypass="bypassEditableCell"
      :confirm-text-maker="(value) => setFieldConfirmText('email', data, value)"
      :on-finish="(value) => setField('email', data, value)"
    />
    <EditableCellSelect
      v-if="(!select || select=='roles') && (data?.roles?.length || hasAvailableRoles)"
      class="bigger-input" 
      name="roles"
      type="roles"
      :label="$t('user.roles')" 
      :title="$t('user.roles')" 
      :showTitle="!select"
      :items="availableRoles"
      item-value="name"
      item-title="name"
      v-model="formData.roles"
      :disabled="!interactable" 
      multiple
      :error-messages="formData.errors.roles"
      :bypass="bypassEditableCell"
      :confirm-text-maker="(value) => setFieldConfirmText(
          'roles', data, value,
          (v) => getRolesText(v)
      )"
      :on-finish="(value) => setField(
          'roles', data, value, true, (v) => v.name
      )"
      :return-object="true"
    />
    <EditableCellSelect
      v-if="(!select || select=='permissions') && (data?.permissions?.length || hasAvailablePermissions)"
      class="bigger-input" 
      name="permissions"
      :label="$t('user.permissions')" 
      :title="$t('user.permissions')" 
      :showTitle="!select"
      :items="availablePermissions"
      item-value="name"
      item-title="name"
      v-model="formData.permissions"
      :disabled="!interactable" 
      multiple
      :error-messages="formData.errors.permissions"
      :bypass="bypassEditableCell"
      :confirm-text-maker="(value) => setFieldConfirmText(
          'permissions', data, value,
          (v) => getRolesText(v)
      )"
      :on-finish="(value) => setField(
          'permissions', data, value, true, (v) => v.name
      )"
      :return-object="true"
    />
  </VForm>
</template>
<style scoped>
</style>
