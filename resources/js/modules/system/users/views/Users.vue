<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { router } from "@/plugins/inertia";

import DeclarativeCrudView from "@/views/DeclarativeCrudView.vue";
import IconButton from "@/components/button/IconButton.vue";
import ConfirmationIconButton from "@/components/button/ConfirmationIconButton.vue";
import SyncCheckboxField from "@/components/checkbox/SyncCheckboxField.vue";
import UserFormDialog from "../views/FormDialog.vue";

import userService from "../services/user";
import { getArrayText } from "@/libs/util.js";
import rules from "@/validations-gen/users.json";
import { t } from "@/plugins/i18n";

import { useWorking } from "@/composables/useWorking";
import { useCrud } from "@/composables/useCrud";

const client = userService;
const nameField = "name";

const crudView = ref<InstanceType<typeof DeclarativeCrudView> | null>(null);

const { waitBusy } = useWorking();
const crud = useCrud({ client: userService, waitBusy, nameField: "name" });

const availableRoles = ref<any[]>([]);
const availablePermissions = ref<any[]>([]);

const title = computed(() => t("user.title"));

function getRolesText(val: any) {
  return getArrayText(val, (v: any) => v.name, false);
}

const fields = computed(() => [
  {
    type: "text",
    name: "name",
    value: "name",
    title: t("user.name"),
    table: true,
    editable: true,
  },
  {
    type: "text",
    name: "email",
    value: "email",
    title: t("user.email"),
    table: true,
    editable: true,
    props: { type: "email" },
  },
  {
    type: "select",
    name: "roles",
    value: "roles",
    title: t("user.roles"),
    table: true,
    editable: true,
    getValue: getRolesText,
    props: {
      multiple: true,
      itemTitle: "name",
      itemValue: "name",
      returnObject: true,
      items: availableRoles.value,
    },
  },
  {
    component: SyncCheckboxField,
    value: "enabled",
    name: "enabled",
    title: t("user.enabled"),
    table: true,
    editable: false,
    confirmTextMaker: (data: any, _value: any) =>
      crud.toggleFieldConfirmText("enabled", t("user.disabling"), t("user.enabling"), data),
    props: {
      textEnable: t("crud.enable"),
      textDisable: t("crud.disable"),
    },
  },
  {
    component: SyncCheckboxField,
    value: "verified",
    name: "verified",
    title: t("user.verified"),
    table: true,
    editable: false,
    confirmTextMaker: (data: any, _value: any) =>
      crud.toggleFieldConfirmText("verified", t("user.unverifying"), t("user.force_verify"), data),
    props: {
      textEnable: t("user.force_verify"),
      textDisable: t("user.unverify"),
    },
  },
]);

const actions = computed(() => [
  {
    component: IconButton,
    icon: "mdi-magnify",
    text: t("form.details"),
    event: "details",
    onClick: (item: any) => router.visit(route("system.users.show", item.id)),
  },
  { type: "edit", text: t("form.edit") },
  {
    component: ConfirmationIconButton,
    icon: "mdi-key-variant",
    text: t("user.clear_password"),
    event: "clear-password",
    confirmTextMaker: (item: any) => crud.clearFieldConfirmText("password", item),
    onConfirm: async (item: any) => {
      await crud.clearField("password", item);
    },
    ask: true,
  },
  { type: "delete", text: t("form.delete") },
]);

const formDialog = computed(() => ({
  component: UserFormDialog,
  submit: async () => {
    crudView.value?.fetch();
  },
  props: {
    availableRoles: availableRoles.value,
    availablePermissions: availablePermissions.value,
  },
}));

onMounted(async () => {
  availableRoles.value = (await userService.get_roles()).roles;
  availablePermissions.value = (await userService.get_permissions()).permissions;
});
</script>
<template>
  <DeclarativeCrudView
    ref="crudView"
    :client="client"
    :name-field="nameField"
    :title="title"
    :fields="fields"
    :actions="actions"
    :form-dialog="formDialog"
    :rules="rules"
    :bulk-actions="[]"
  />
</template>
