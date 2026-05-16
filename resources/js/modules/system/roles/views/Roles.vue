<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import DeclarativeCrudView from "@/views/DeclarativeCrudView.vue";
import SyncCheckboxField from "@/components/checkbox/SyncCheckboxField.vue";
import { getArrayText } from "@/libs/util";
import { t } from "@/plugins/i18n";
import { useCrud } from "@/composables/useCrud";
import { useWorking } from "@/composables/useWorking";
import roleService from "../services/role";

const client = roleService;
const nameField = "name";

const crud = ref<InstanceType<typeof DeclarativeCrudView> | null>(null);
const availablePermissions = ref<any[]>([]);

const { waitBusy } = useWorking();
const crudHelper = useCrud({ client: roleService, waitBusy, nameField: "name" });

const rules = {
  name: "required|string|max:255",
  level: "required|integer|min:0",
  can_manage_peers: "boolean",
  permissions: "array",
  "permissions.*": "string|max:255|exists:permissions,name",
};

function getPermissionsText(val: any) {
  return getArrayText(val ?? [], (v: any) => v?.name ?? v, false);
}

const fields = computed(() => [
  {
    type: "text",
    name: "name",
    value: "name",
    title: t("role.name"),
    label: t("role.name"),
    table: true,
    editable: true,
    sortable: true,
  },
  {
    type: "number",
    name: "level",
    value: "level",
    title: t("role.level"),
    label: t("role.level"),
    table: true,
    editable: true,
    sortable: true,
  },
  {
    component: SyncCheckboxField,
    name: "can_manage_peers",
    value: "can_manage_peers",
    title: t("role.can_manage_peers"),
    table: true,
    editable: false,
    confirmTextMaker: (data: any, _value: any) =>
      crudHelper.toggleFieldConfirmText("can_manage_peers", t("role.disabling_peer_mgmt"), t("role.enabling_peer_mgmt"), data),
    props: {
      textEnable: t("crud.enable"),
      textDisable: t("crud.disable"),
    },
  },
  {
    type: "multiselect",
    name: "permissions",
    value: "permissions",
    title: t("role.permissions"),
    label: t("role.permissions"),
    table: true,
    editable: true,
    getValue: getPermissionsText,
    props: {
      items: availablePermissions.value,
      itemTitle: "name",
      itemValue: "name",
      returnObject: true,
    },
  },
]);

const actions = computed(() => [
  { type: "edit", text: t("form.edit") },
  { type: "delete", text: t("form.delete") },
]);

const formDialog = computed(() => ({
  title: t("role.item"),
  fields: fields.value.map((field: any) => ({
    ...field,
    table: false,
    form: true,
    required: field.name !== "permissions" && field.name !== "can_manage_peers",
  })),
}));

onMounted(async () => {
  availablePermissions.value = (await roleService.get_permissions()).permissions;
});
</script>

<template>
  <DeclarativeCrudView
    ref="crud"
    :client="client"
    :name-field="nameField"
    :title="t('role.title')"
    :fields="fields"
    :actions="actions"
    :form-dialog="formDialog"
    :rules="rules"
    :bulk-actions="[]"
  />
</template>
