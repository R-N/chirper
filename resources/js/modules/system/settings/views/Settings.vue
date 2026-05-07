<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";

import SettingFormDialog from "../views/FormDialog.vue";
import EditableCellTextArea from "@/components/form/editable_cell/EditableCellTextArea.vue";

import settingService from "../services/setting";
import IconButton from "@/components/button/IconButton.vue";
import ConfirmationIconButton from "@/components/button/ConfirmationIconButton.vue";
import { bulkDeleteFromArray, isObject, isObjectEmpty } from "@/libs/util";
import rules from "@/validations-gen/settings.json";
import { parseLaravelRules } from "@/libs/validation";

import SettingForm from "../forms/Setting.vue";
import DeclarativeCrudView from "@/views/DeclarativeCrudView.vue";
import Duration from "@/components/text/Duration.vue";
import { t } from "@/plugins/i18n";

import { useWorking } from "@/composables/useWorking";

const props = defineProps<{
  parentBusy?: any;
}>();

const {
  appStore,
  busy,
  waitBusy,
  showError,
} = useWorking(props);

const client = settingService;
const nameField = "key";

const crud = ref<InstanceType<typeof DeclarativeCrudView> | null>(null);

const title = computed(() => t("settings.title"));
const itemName = computed(() => t("settings.item"));

const fields = computed(() => [
  {
    component: SettingForm,
    value: "key",
    title: t("form.key"),
    table: true,
    detail: true,
    props: {
      showTitle: false,
    },
  },
  {
    component: SettingForm,
    value: "type",
    title: t("form.type"),
    table: true,
    detail: true,
    props: {
      showTitle: false,
    },
  },
  {
    component: SettingForm,
    value: "value",
    title: t("form.value"),
    table: true,
    detail: true,
    props: {
      showTitle: false,
    },
  },
  {
    component: Duration,
    value: "updated_at",
    title: t("crud.updated_at"),
    table: true,
    detail: true,
    propsMap: {
      time: "updated_at",
    },
  },
]);

const actions = computed(() => [
  {
    component: IconButton,
    title: "Edit",
    icon: "mdi-pencil",
    text: t("form.edit"),
    onClick: (item: any) => crud.value?.showForm(item),
    ask: false,
  },
  {
    component: ConfirmationIconButton,
    title: "Delete",
    icon: "mdi-delete",
    text: t("form.delete"),
    confirmTextMaker: (item: any) => crud.value?.deleteConfirmText(item),
    onConfirm: (item: any) => crud.value?.delete2(item),
    ask: true,
  },
]);

const bulkActions = computed(() => [
  {
    component: ConfirmationIconButton,
    name: "delete",
    icon: "mdi-delete",
    text: t("crud.delete_selected"),
    action: async (selected: any[], items: any[]) => {
      await client.bulk_destroy({ ids: selected });
      bulkDeleteFromArray(items, selected);
      selected.splice(0);
    },
  },
]);

const formDialog = computed(() => ({
  component: SettingFormDialog,
  submit: (item: any) => crud.value?.storeItem(item),
}));

// Sync fetched settings to app store (replaces @Watch("items") from mixin)
watch(
  () => crud.value?.items,
  (settings: any) => {
    if (settings && isObject(settings) && !isObjectEmpty(settings)) {
      appStore.updateSettings(settings);
    }
  },
  { deep: true },
);
</script>
<template>
  <DeclarativeCrudView
    ref="crud"
    :client="client"
    :name-field="nameField"
    :title="title"
    :fields="fields"
    :actions="actions"
    :bulk-actions="bulkActions"
    :form-dialog="formDialog"
    :rules="rules"
  />
</template>
