<script setup lang="ts">
import { computed } from "vue";

import CrudView from "@/views/CrudView.vue";
import { combineCollection, makeBindings, filterObject } from "@/libs/util";
import { parseLaravelRules } from "@/libs/validation";
import { normalizeFields } from "@/libs/fieldSchema";
import { resolveAction } from "@/libs/actionRegistry";
import { provideCrudContext } from "@/composables/useCrudContext";

import { useWorking } from "@/composables/useWorking";
import { useCrudView } from "@/composables/useCrudView";
import { t } from "@/plugins/i18n";
import GenericField from "@/components/form/GenericField.vue";

const props = defineProps<{
  client?: object;
  nameField?: string;
  formDialog?: any;
  title?: string;
  fields?: any[];
  actions?: any[];
  bulkActions?: any[];
  rules?: object;
  query?: any;
}>();

const {
  busy,
  waitBusy,
  showError,
} = useWorking(props);

const crudView = useCrudView({
  client: props.client,
  waitBusy,
  showError,
  nameField: props.nameField,
  __query: props.query,
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
  exportCsv,
  exportXlsx,
  exportPdf,
  bulkConfirmText,
  storeItem,
  fetch,
  justAsk,
  delete2,
  deleteConfirmText,
  setFieldConfirmText,
  setField,
} = crudView;

const normalizedFields = computed(() => normalizeFields(props.fields || []));

const headers = computed(() => {
  let h = normalizedFields.value
    .filter((f: any) => f.table)
    .map((f: any) => filterObject(f, ["title", "value"]));
  if (props.actions?.length) {
    h = [...h, { title: t("crud.actions"), value: "actions" }];
  }
  return h;
});

function showForm(data: any = null) {
  editing.value = data;
  formDialogShow.value = true;
}

async function bulkAction(action: Function) {
  await waitBusy(async () => {
    await action(selected.value, items.value);
  });
}

const _rules = computed(() => parseLaravelRules(props.rules));

const self = {
  storeItem,
  delete2,
  deleteConfirmText,
  setFieldConfirmText,
  setField,
};

provideCrudContext(self);

function handleAction(actionDef: any, item: any) {
  const resolved = resolveAction(actionDef);
  switch (resolved.event) {
    case "edit":
      showForm(item);
      break;
    case "delete":
      delete2(item);
      break;
    default:
      if (actionDef.onClick) actionDef.onClick(item);
      break;
  }
}

function getActionConfirmTextMaker(actionDef: any, item: any) {
  if (actionDef.confirmTextMaker) {
    return (value: any) => actionDef.confirmTextMaker(item, value);
  }
  if (actionDef.event === "delete" || actionDef.type === "delete") {
    return () => deleteConfirmText(item);
  }
  if (actionDef.name) {
    return (value: any) => setFieldConfirmText(actionDef.name, item, value);
  }
  return undefined;
}

defineExpose({
  items,
  fetch,
  storeItem,
  showForm,
  deleteConfirmText,
  delete2,
  setFieldConfirmText,
  setField,
});
</script>
<template>
  <CrudView
    :title="title"
    :create="() => showForm()"
    :fetch="fetch"
    v-model:search="search"
    :export-csv="exportCsv"
    :export-xlsx="exportXlsx"
    :export-pdf="exportPdf"
    :selectable="true"
    v-model:selecting="selecting"
    :selected="selected.length"
    :rules="_rules"
  >
    <template v-slot:bulk-actions>
      <component
        v-for="(ba, i) in bulkActions"
        :key="i"
        :is="ba.component"
        :icon="ba.icon"
        :text="ba.text"
        :confirmTextMaker="ba.confirmText ?? bulkConfirmText(ba.name)"
        :on-confirm="() => ba.onConfirm ? bulkAction(ba.onConfirm) : null"
        @click.stop="() => ba.onClick ? bulkAction(ba.onClick) : null"
        class="fill-height d-inline-flex"
        size="default"
        :disabled="busy"
        v-bind="ba.props"
      />
    </template>
    <template v-slot:toolbar-left>
      <slot name="toolbar-left" :busy="busy" />
    </template>
    <template v-slot:toolbar-right>
      <slot name="toolbar-right" :busy="busy" />
    </template>
    <template v-slot:default>
      <component
        :is="dataTableComponent"
        :headers="headers"
        :items="items"
        item-key="id"
        :search="search"
        :loading="busy"
        :items-length="itemCount"
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        @update:options="debouncedFetch"
        v-model="selected"
        :show-select="selecting"
        
      >
        <template v-slot:item="{ item }">
          <tr>
            <td v-for="(f, i) in normalizedFields" :key="f.value">
              <GenericField
                :field="f"
                :data="item"
                :crud="self"
                :rules="_rules"
              />
            </td>
            <td v-if="actions?.length" key="actions">
              <component
                v-for="(a, i) in actions"
                :key="i"
                :is="resolveAction(a).component"
                :icon="resolveAction(a).icon ?? a.icon"
                :text="a.text"
                :ask="a.ask ? (ask) => justAsk(item, ask) : null"
                :on-confirm="
                  a.onConfirm
                    ? () => a.onConfirm(item)
                    : (resolveAction(a).event === 'delete' ? () => delete2(item) : null)
                "
                @click.stop="handleAction(a, item)"
                :confirmTextMaker="getActionConfirmTextMaker(a, item)"
                :disabled="busy || a.disabled"
                v-bind="makeBindings(a, item)"
                :bypass-editable-cell="false"
                :data="item"
                :rules="combineCollection(_rules, _rules[a.name])"
                :select="a.name"
                @store="a.onStore ?? storeItem"
                
              />
            </td>
          </tr>
        </template>
      </component>
      <component
        v-if="formDialog"
        :is="formDialog.component"
        :component="formDialog.component"
        :data="editing"
        v-model="formDialogShow"
        @submit="formDialog.submit"
        
        :rules="_rules"
        v-bind="formDialog.props"
      />
    </template>
  </CrudView>
</template>
<style scoped></style>
