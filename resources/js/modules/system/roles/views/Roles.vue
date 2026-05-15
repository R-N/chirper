<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import DeclarativeCrudView from "@/views/DeclarativeCrudView.vue";
import { getArrayText } from "@/libs/util";
import { t } from "@/plugins/i18n";
import roleService from "../services/role";

const client = roleService;
const nameField = "name";

const crud = ref<InstanceType<typeof DeclarativeCrudView> | null>(null);
const availablePermissions = ref<any[]>([]);

const rules = {
  name: "required|string|max:255",
  guard_name: "required|string|max:255",
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
    type: "text",
    name: "guard_name",
    value: "guard_name",
    title: t("role.guard_name"),
    label: t("role.guard_name"),
    table: true,
    editable: true,
    sortable: true,
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
    required: field.name !== "permissions",
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
