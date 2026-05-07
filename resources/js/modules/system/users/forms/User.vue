<script setup lang="ts">
import { computed, toRef } from "vue";
import { useForm } from "@inertiajs/vue3";
import userService from "../services/user";
import { useWorking } from "@/composables/useWorking";
import { useFormBase } from "@/composables/useFormBase";
import { useCrudForm } from "@/composables/useCrudForm";
import { useCrud } from "@/composables/useCrud";
import SyncCheckbox from "@/components/checkbox/SyncCheckbox.vue";
import { getArrayText } from "@/libs/util.js";
import ConfirmationIconButton from "@/components/button/ConfirmationIconButton.vue";
import CrudForm from "@/components/form/CrudForm.vue";
import { t } from "@/plugins/i18n";

const props = defineProps<{
  availableRoles?: any[];
  availablePermissions?: any[];
  bypassEditableCell?: boolean;
  disabled?: boolean;
  data?: any;
  rules?: any;
  select?: string;
  form?: any;
  onCancel?: Function;
  onChange?: Function;
  onReset?: Function;
  onValidate?: Function;
  onSubmit?: Function;
  parentBusy?: boolean;
}>();

const emit = defineEmits<{
  submit: [value: any];
}>();

const { busy, waitBusy, showError, releaseBusy } = useWorking(props);
const formBase = useFormBase(props, emit);
const { formData, valid, interactable, validate, getValue, reset, prepopulate, getForm } = formBase;

const dataRef = toRef(props, "data");
const crud = useCrud({ client: userService, waitBusy, nameField: "name" });

const { submit: crudFormSubmit } = useCrudForm({
  client: userService,
  formData,
  data: dataRef,
});

function close() {}

async function submit() {
  return await crudFormSubmit({
    validate,
    valid,
    waitBusy,
    getValue,
    onSubmit: props.onSubmit,
    emit,
    close,
  });
}

const hasAvailableRoles = computed(() => props.availableRoles && props.availableRoles.length > 0);
const hasAvailablePermissions = computed(() => props.availablePermissions && props.availablePermissions.length > 0);

function getRolesText(val: any[]) {
  return getArrayText(val, (v) => v.name, false);
}

const fields = computed(() => [
  {
    name: "name",
    label: t("user.name"),
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: t("user.email"),
    type: "text",
    required: true,
    props: { type: "email" },
  },
  {
    name: "roles",
    label: t("user.roles"),
    type: "select",
    required: true,
    items: props.availableRoles,
    props: {
      multiple: true,
      itemTitle: "name",
      itemValue: "name",
      returnObject: true,
    },
    getValue: getRolesText,
  },
  {
    name: "permissions",
    label: t("user.permissions"),
    type: "select",
    required: true,
    items: props.availablePermissions,
    props: {
      multiple: true,
      itemTitle: "name",
      itemValue: "name",
      returnObject: true,
    },
    getValue: getRolesText,
  },
]);
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
        :confirmTextMaker="crud.clearFieldConfirmText('password', data)"
        :on-confirm="() => crud.clearField('password', data)"
        :ask="(ask) => crud.justAsk(data, ask)"
        :disabled="busy"
        :size="select ? 'small' : 'default'"
      />
      <ConfirmationIconButton
        v-if="(!select || select == 'delete') && data"
        icon="mdi-delete"
        :text="$t('form.delete')"
        :confirmTextMaker="crud.deleteConfirmText(data)"
        :on-confirm="() => crud.delete2(data)"
        :ask="(ask) => crud.justAsk(data, ask)"
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
        :on-change="(value) => crud.setEnabled(data, value)"
        :confirm-text-maker="() => crud.setEnabledConfirmText(data)"
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
        :on-change="(value) => crud.setField('verified', data, value)"
        :confirm-text-maker="
          () =>
            crud.toggleFieldConfirmText(
              'verified',
              $t('user.unverifying'),
              $t('user.force_verify'),
              data
            )
        "
        readonly
        :disabled="busy"
        :text-disable="$t('user.unverify')"
        :text-enable="$t('user.force_verify')"
      />
    </div>
    <CrudForm
      :setFieldConfirmText="crud.setFieldConfirmText"
      :setField="crud.setField"
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
