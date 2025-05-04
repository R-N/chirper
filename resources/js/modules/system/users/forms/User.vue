<script lang="ts">
import { Component, Prop, Emit, Watch, toNative } from "vue-facing-decorator";
import { useForm } from "@inertiajs/vue3";
import userService from "../services/user";
import { CrudFormBase } from "@/components/form/CrudFormBase.vue";
import EditableCellTextField from "@/components/form/editable_cell/EditableCellTextField.vue";
import EditableCellSelect from "@/components/form/editable_cell/EditableCellSelect.vue";
import SyncCheckbox from "@/components/checkbox/SyncCheckbox.vue";
import { getArrayText } from "@/libs/util.js";
import ConfirmationIconButton from "@/components/button/ConfirmationIconButton.vue";
import CrudForm from "@/components/form/CrudForm.vue";

@Component({
  name: "UserForm",
  components: {
    EditableCellTextField,
    EditableCellSelect,
    SyncCheckbox,
    ConfirmationIconButton,
    CrudForm
  },
  emits: ["submit"]
})
class UserForm extends CrudFormBase {
  @Prop({ default: [] }) availableRoles;
  @Prop({ default: [] }) availablePermissions;
  @Prop({ default: true }) bypassEditableCell;

  client = userService;
  formData = useForm({
    email: "",
    name: "",
    roles: ["chirper"],
    permissions: [],
    enabled: true,
    verified: false
  });

  get hasAvailableRoles() {
    return this.availableRoles && this.availableRoles.length > 0;
  }

  get hasAvailablePermissions() {
    return this.availablePermissions && this.availablePermissions.length > 0;
  }

  getRolesText(val) {
    return getArrayText(val, (v) => v.name, false);
  }
  get fields() {
    return [
      {
        name: "name",
        label: this.$t('user.name'),
        type: "text",
        required: true,
      },
      {
        name: "email",
        label: this.$t('user.email'),
        type: "text",
        required: true,
        props: {
          type: 'email'
        }
      },
      {
        name: "roles",
        label: this.$t('user.roles'),
        type: "select",
        required: true,
        items: this.availableRoles,
        props: {
          multiple: true,
          itemTitle: "name",
          itemValue: "name",
          returnObject: true
        },
        getValue: this.getRolesText
      },
      {
        name: "permissions",
        label: this.$t('user.permissions'),
        type: "select",
        required: true,
        items: this.availablePermissions,
        props: {
          multiple: true,
          itemTitle: "name",
          itemValue: "name",
          returnObject: true
        },
        getValue: this.getRolesText
      },
    ];
  }
}
export { UserForm };
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
        v-if="(!select || select == 'clear_password') && data"
        icon="mdi-key-variant"
        :text="$t('user.clear_password')"
        :confirmTextMaker="clearFieldConfirmText('password', data)"
        :on-confirm="() => clearField('password', data)"
        :ask="(ask) => justAsk(data, ask)"
        :disabled="busy"
        :size="select ? 'small' : 'default'"
      />
      <ConfirmationIconButton
        v-if="(!select || select == 'delete') && data"
        icon="mdi-delete"
        :text="$t('form.delete')"
        :confirmTextMaker="deleteConfirmText(data)"
        :on-confirm="() => delete2(data)"
        :ask="(ask) => justAsk(data, ask)"
        :disabled="busy"
        :size="select ? 'small' : 'default'"
      />
      <SyncCheckbox
        v-if="(!select || select == 'enabled') && data"
        name="enabled"
        :label="$t('user.enabled')"
        :showLabel="!select"
        :text="$t('user.enabled')"
        v-model="formData.enabled"
        :on-change="(value) => setEnabled(data, value)"
        :confirm-text-maker="() => setEnabledConfirmText(data)"
        :disabled="busy"
        :text-enable="$t('crud.enable')"
        :text-disable="$t('crud.disable')"
      />
      <SyncCheckbox
        v-if="(!select || select == 'verified') && data"
        name="verified"
        :label="$t('user.verified')"
        :showLabel="!select"
        :text="$t('user.verified')"
        v-model="formData.verified"
        :on-change="(value) => setField('verified', data, value)"
        :confirm-text-maker="
          () =>
            toggleFieldConfirmText(
              'verified',
              $t('user.unverifying'),
              $t('user.force_verify'),
              item
            )
        "
        readonly
        :disabled="busy"
        :text-disable="$t('user.unverify')"
        :text-enable="$t('user.force_verify')"
      />
    </div>
    <CrudForm
      :setFieldConfirmText="setFieldConfirmText"
      :setField="setField"
      :data="data"
      :bypassEditableCell="bypassEditableCell"
      :fields="fields"
      :rules="rules"
      :interactable="interactable"
      :formData="formData"
      :select="select"
    />
  </VForm>
</template>
<style scoped></style>
