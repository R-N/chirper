<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import CrudView from "@/views/CrudView.vue";
import EditableCellTextField from "@/components/form/editable_cell/EditableCellTextField.vue";
import { VDataTable } from "vuetify/components";
import IconButton from "@/components/button/IconButton.vue";
import ConfirmationIconButton from "@/components/button/ConfirmationIconButton.vue";
import SyncCheckbox from "@/components/checkbox/SyncCheckbox.vue";
import EditableCellSelect from "@/components/form/editable_cell/EditableCellSelect.vue";
import UserForm from "../forms/User.vue";
import UserFormDialog from "../views/FormDialog.vue";

import userService from "../services/user";
import { getArrayText } from "@/libs/util.js";
import rules from "@/validations-gen/users.json";
import { parseLaravelRules } from "@/libs/validation";
import { t } from "@/plugins/i18n";

import { useWorking } from "@/composables/useWorking";
import { useCrudView } from "@/composables/useCrudView";

const props = defineProps<{
  parentBusy?: any;
}>();

const {
  busy,
  waitBusy,
  showError,
  visit,
} = useWorking(props);

const crudView = useCrudView({
  client: userService,
  waitBusy,
  showError,
  nameField: "name",
});

const {
  formDialogShow,
  editing,
  search,
  items,
  selected,
  page,
  itemsPerPage,
  itemCount,
  selecting,
  dataTableComponent,
  debouncedFetch,
  fetch,
  create,
  delete2,
  deleteItem,
  exportCsv,
  exportXlsx,
  exportPdf,
  bulkConfirmText,
  storeItem,
  setFieldConfirmText,
  setField,
  justAsk,
  deleteConfirmText,
} = crudView;

const availableRoles = ref<any[]>([]);
const availablePermissions = ref<any[]>([]);

const parsedRules = computed(() => parseLaravelRules(rules));

const itemName = computed(() => t("user.item"));
const headers = computed(() => [
  { title: t("user.name"), value: "name" },
  { title: t("user.roles"), value: "roles" },
  { title: t("user.email"), value: "email" },
  { title: t("user.verified"), value: "verified" },
  { title: t("user.enabled"), value: "enabled" },
  { title: t("crud.actions"), value: "actions" },
]);

function showForm(user: any = null) {
  editing.value = user;
  formDialogShow.value = true;
}

const hasAvailableRoles = computed(() => availableRoles.value && availableRoles.value.length > 0);
const hasAvailablePermissions = computed(() => availablePermissions.value && availablePermissions.value.length > 0);

function setRolesConfirmText(item: any, value: any) {
  return setFieldConfirmText("roles", item, value);
}

function getRolesText(val: any) {
  return getArrayText(val, (v: any) => v.name, false);
}

onMounted(async () => {
  availableRoles.value = (await userService.get_roles()).roles;
  availablePermissions.value = (await userService.get_permissions()).permissions;
});
</script>
<template>
  <CrudView
    :title="$t('user.title')"
    :create="() => showForm()"
    :fetch="fetch"
    v-model:search="search"
    :export-csv="exportCsv"
    :export-xlsx="exportXlsx"
    :export-pdf="exportPdf"
  >
    <template v-slot:default>
      <component
        :is="dataTableComponent"
        class=""
        :headers="headers"
        :items="items"
        item-key="id"
        :search="search"
        :loading="busy"
        :items-length="itemCount"
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        @update:options="debouncedFetch"
      >
        <template v-slot:item.name="{ item }">
          <UserForm
            :disabled="busy"
            :bypass-editable-cell="false"
            :data="item"
            :rules="parsedRules"
            select="name"
            @store="storeItem"
          />
        </template>
        <template v-slot:item.email="{ item }">
          <UserForm
            :disabled="busy"
            :bypass-editable-cell="false"
            :data="item"
            :rules="parsedRules"
            select="email"
            @store="storeItem"
          />
        </template>
        <template v-slot:item.roles="{ item }">
          <UserForm
            :disabled="busy"
            :bypass-editable-cell="false"
            :data="item"
            :rules="parsedRules"
            select="roles"
            @store="storeItem"
            :availableRoles="availableRoles"
          />
        </template>
        <template v-slot:item.enabled="{ item }">
          <UserForm
            :disabled="busy"
            :bypass-editable-cell="false"
            :data="item"
            :rules="parsedRules"
            select="enabled"
            @store="storeItem"
          />
        </template>
        <template v-slot:item.verified="{ item }">
          <UserForm
            :disabled="busy"
            :bypass-editable-cell="false"
            :data="item"
            :rules="parsedRules"
            select="verified"
            @store="storeItem"
          />
        </template>
        <template v-slot:item.actions="{ item }" class="d-flex flex-row">
          <div class="d-flex flex-row">
            <IconButton
              @click.prevent.stop="() => visit('/system/users/' + item.id)"
              :disabled="busy"
              icon="mdi-magnify"
              :text="$t('form.details')"
            />
            <IconButton
              @click.prevent.stop="() => showForm(item)"
              :disabled="busy"
              icon="mdi-pencil"
              :text="$t('form.edit')"
            />
            <UserForm
              :disabled="busy"
              :bypass-editable-cell="false"
              :data="item"
              :rules="parsedRules"
              select="clear_password"
              @store="storeItem"
            />
            <UserForm
              :disabled="busy"
              :bypass-editable-cell="false"
              :data="item"
              :rules="parsedRules"
              select="delete"
              @delete="deleteItem"
            />
          </div>
        </template>
      </component>
      <UserFormDialog
        :data="editing"
        v-model="formDialogShow"
        @submit="storeItem"
        :parent-busy="busy"
        :availableRoles="availableRoles"
        :availablePermissions="availablePermissions"
        :rules="parsedRules"
      />
    </template>
  </CrudView>
</template>
<style scoped></style>
