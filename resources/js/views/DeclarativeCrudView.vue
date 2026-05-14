<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

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
import DeclarativeFormView from "@/components/form/DeclarativeFormView.vue";
import FormDialog from "@/components/form/FormDialog.vue";
import axios from "axios";

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
  noCreate?: boolean;
  filterFields?: any[];
  defaultSort?: string | string[];
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
    .map((f: any) => ({ ...filterObject(f, ["title", "value"]), sortable: false }));
  if (props.actions?.length) {
    h = [...h, { title: t("crud.actions"), value: "actions", sortable: false }];
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

const declarativeFormRef = ref<InstanceType<typeof DeclarativeFormView> | null>(null);

const isDeclarativeForm = computed(() =>
  props.formDialog && !props.formDialog.component
);

const declarativeFormFields = computed(() =>
  props.formDialog?.fields ?? normalizedFields.value.filter((f: any) => f.form !== false)
);

async function onDeclarativeFormSubmit() {
  const result = await declarativeFormRef.value?.submit();
  if (result !== undefined) fetch();
}

const filterValues = ref<Record<string, any>>({});

/** Filter field keys currently shown (opt-in; empty until user adds). */
const activeFilterNames = ref<string[]>([]);
const selectedFilterToAdd = ref<string | null>(null);

const availableFiltersForSelect = computed(() =>
  (props.filterFields || [])
    .filter(
      (ff: any) =>
        !activeFilterNames.value.includes(String(ff.name))
    )
    .map((ff: any) => ({ title: ff.label, value: String(ff.name) }))
);

const activeFilterDefs = computed(() =>
  activeFilterNames.value
    .map((name) =>
      (props.filterFields || []).find((ff: any) => String(ff.name) === String(name))
    )
    .filter(Boolean) as any[]
);

function addActiveFilter() {
  const raw = selectedFilterToAdd.value;
  const name = raw == null || raw === "" ? "" : String(raw);
  if (!name || activeFilterNames.value.includes(name)) return;
  activeFilterNames.value = [...activeFilterNames.value, name];
  selectedFilterToAdd.value = null;
}

function removeActiveFilter(name: string) {
  activeFilterNames.value = activeFilterNames.value.filter((n) => n !== name);
  delete filterValues.value[name];
  onFilterChange();
}

function clearAllActiveFilters() {
  for (const name of activeFilterNames.value) {
    delete filterValues.value[name];
  }
  activeFilterNames.value = [];
  selectedFilterToAdd.value = null;
  onFilterChange();
}

const autocompleteItems = ref<Record<string, any[]>>({});
const autocompleteLoading = ref<Record<string, boolean>>({});

onMounted(async () => {
  for (const ff of props.filterFields || []) {
    if (ff.type === "autocomplete" && ff.endpoint) {
      autocompleteLoading.value[ff.name] = true;
      try {
        const res = await axios.get(ff.endpoint, { params: { per_page: 100 } });
        let data = res.data?.items?.data ?? res.data?.data ?? res.data?.items ?? res.data;
        if (data && !Array.isArray(data) && data.data) data = data.data;
        autocompleteItems.value[ff.name] = Array.isArray(data) ? data : [];
      } catch {
        autocompleteItems.value[ff.name] = [];
      } finally {
        autocompleteLoading.value[ff.name] = false;
      }
    }
  }
});

function onFilterChange() {
  const params: Record<string, any> = {};
  for (const [key, val] of Object.entries(filterValues.value)) {
    if (val !== undefined && val !== null && val !== "") {
      params[`filter[${key}]`] = val;
    }
  }
  if (sortValues.value && sortValues.value.length) {
    params.sort = sortValues.value.join(",");
  }
  page.value = 1;
  crudView._query.value = params;
  crudView.debouncedFetch();
}

function normalizeDefaultSort(value?: string | string[]) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

const sortValues = ref<string[]>(normalizeDefaultSort(props.defaultSort));
const selectedSortField = ref<string | null>(null);
const selectedSortDirection = ref<"asc" | "desc">("asc");

const sortFields = computed(() =>
  normalizedFields.value
    .filter((f: any) => f.sortable)
    .map((f: any) => ({ title: f.title, value: f.value }))
);

const sortDirections = [
  { title: "Asc", value: "asc", icon: "mdi-sort-ascending" },
  { title: "Desc", value: "desc", icon: "mdi-sort-descending" },
];

function sortFieldName(value: string) {
  return value.startsWith("-") ? value.slice(1) : value;
}

function sortToken(field: string, direction: "asc" | "desc") {
  return direction === "desc" ? `-${field}` : field;
}

function getSortFieldTitle(value: string) {
  const field = sortFields.value.find((f: any) => f.value === sortFieldName(value));
  return field?.title ?? sortFieldName(value);
}

function getSortDirection(value: string) {
  return value.startsWith("-") ? "Desc" : "Asc";
}

function addSort() {
  if (!selectedSortField.value) return;

  const field = selectedSortField.value;
  sortValues.value = [
    ...sortValues.value.filter((value) => sortFieldName(value) !== field),
    sortToken(field, selectedSortDirection.value),
  ];
  selectedSortField.value = null;
  selectedSortDirection.value = "asc";
  onFilterChange();
}

function removeSort(value: string) {
  sortValues.value = sortValues.value.filter((item) => item !== value);
  onFilterChange();
}

function clearSorts() {
  sortValues.value = [];
  onFilterChange();
}

if (sortValues.value.length) {
  crudView._query.value = {
    ...crudView._query.value,
    sort: sortValues.value.join(","),
  };
}

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
    :create="noCreate ? null : () => showForm()"
    :fetch="fetch"
    v-model:search="search"
    :export-csv="exportCsv"
    :export-xlsx="exportXlsx"
    :export-pdf="exportPdf"
    :selectable="!!bulkActions?.length"
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
    <template v-slot:sortBar v-if="sortFields.length">
      <div class="mr-3 sort-builder">
        <div class="sort-builder__controls">
          <VSelect
            v-model="selectedSortField"
            :items="sortFields"
            label="Sort column"
            clearable
            density="compact"
            variant="underlined"
            hide-details
            class="sort-builder__field"
          />
          <VBtnToggle
            v-model="selectedSortDirection"
            mandatory
            divided
            density="compact"
            class="sort-builder__direction"
          >
            <VBtn
              v-for="direction in sortDirections"
              :key="direction.value"
              :value="direction.value"
              :icon="direction.icon"
              :title="direction.title"
              size="small"
            />
          </VBtnToggle>
          <VBtn
            icon="mdi-plus"
            title="Add sorting"
            size="small"
            variant="text"
            :disabled="!selectedSortField"
            @click="addSort"
          />
          <VBtn
            v-if="sortValues.length"
            icon="mdi-close"
            title="Clear sorting"
            size="small"
            variant="text"
            @click="clearSorts"
          />
        </div>
        <div v-if="sortValues.length" class="sort-builder__chips">
          <VChip
            v-for="value in sortValues"
            :key="value"
            closable
            size="small"
            @click:close="removeSort(value)"
          >
            {{ getSortFieldTitle(value) }}: {{ getSortDirection(value) }}
          </VChip>
        </div>
      </div>
    </template>
    <template v-slot:filterControls v-if="filterFields?.length">
      <div class="filter-controls-bar d-flex flex-wrap align-center">
        <VSelect
          :key="activeFilterNames.join('|')"
          v-model="selectedFilterToAdd"
          :items="availableFiltersForSelect"
          item-title="title"
          item-value="value"
          :label="$t('crud.filter_select')"
          clearable
          density="compact"
          variant="underlined"
          hide-details
          class="filter-controls-bar__select"
        />
        <VBtn
          icon="mdi-plus"
          :title="$t('crud.filter_add')"
          size="small"
          variant="text"
          :disabled="!selectedFilterToAdd"
          @click="addActiveFilter"
        />
        <VBtn
          v-if="activeFilterNames.length"
          icon="mdi-close"
          :title="$t('crud.filter_clear_all')"
          size="small"
          variant="text"
          @click="clearAllActiveFilters"
        />
      </div>
    </template>
    <template v-slot:filterFields v-if="activeFilterDefs.length">
      <div class="filter-fields-grid">
        <div
          v-for="ff in activeFilterDefs"
          :key="ff.name"
          class="filter-fields-grid__cell"
        >
          <div class="filter-fields-grid__cell-inner">
            <VAutocomplete
              v-if="ff.type === 'autocomplete'"
              :model-value="filterValues[ff.name]"
              @update:model-value="(v: any) => { filterValues[ff.name] = v; onFilterChange(); }"
              :label="ff.label"
              :items="autocompleteItems[ff.name] ?? ff.values ?? []"
              :item-title="ff.itemTitle ?? 'name'"
              :item-value="ff.itemValue ?? 'id'"
              :clearable="true"
              :loading="autocompleteLoading[ff.name]"
              density="compact"
              variant="underlined"
              hide-details
              class="filter-field"
            />
            <VSelect
              v-else-if="ff.values?.length"
              :model-value="filterValues[ff.name]"
              @update:model-value="(v: any) => { filterValues[ff.name] = v; onFilterChange(); }"
              :label="ff.label"
              :items="ff.values ?? []"
              :clearable="true"
              density="compact"
              variant="underlined"
              hide-details
              class="filter-field"
            />
            <VTextField
              v-else-if="ff.type === 'date'"
              :model-value="filterValues[ff.name]"
              @update:model-value="(v: any) => { filterValues[ff.name] = v; onFilterChange(); }"
              :label="ff.label"
              type="date"
              density="compact"
              variant="underlined"
              hide-details
              class="filter-field filter-date"
            />
            <VTextField
              v-else
              :model-value="filterValues[ff.name]"
              @update:model-value="(v: any) => { filterValues[ff.name] = v; onFilterChange(); }"
              :label="ff.label"
              density="compact"
              variant="underlined"
              hide-details
              class="filter-field"
            />
            <VBtn
              icon="mdi-close"
              :title="$t('crud.filter_remove')"
              size="small"
              variant="text"
              class="filter-fields-grid__remove"
              @click="removeActiveFilter(ff.name)"
            />
          </div>
        </div>
      </div>
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
      <FormDialog
        v-if="isDeclarativeForm"
        :data="editing"
        v-model="formDialogShow"
        :title="formDialog.title ?? title"
        :form="() => declarativeFormRef?.getForm?.()"
        :on-submit="onDeclarativeFormSubmit"
        :rules="_rules"
        v-bind="formDialog.props"
      >
        <template v-slot:fields="{ interactable, data }">
          <DeclarativeFormView
            ref="declarativeFormRef"
            :fields="declarativeFormFields"
            :client="client"
            :rules="_rules"
            :data="data"
            :name-field="nameField"
            :disabled="!interactable"
            embedded
          />
        </template>
      </FormDialog>
      <component
        v-else-if="formDialog"
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
<style scoped>
.filter-controls-bar {
  gap: 0.35rem;
}
.filter-controls-bar__select {
  min-width: 11rem;
}
.filter-fields-grid {
  align-items: end;
  display: grid;
  gap: 0.5rem 0.75rem;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  width: 100%;
}
.filter-fields-grid__cell {
  min-width: 0;
}
.filter-fields-grid__cell-inner {
  align-items: flex-end;
  display: flex;
  gap: 0.25rem;
  min-width: 0;
  width: 100%;
}
.filter-fields-grid__remove {
  flex: 0 0 auto;
  margin-bottom: 0.125rem;
}
.filter-field {
  flex: 1 1 auto;
  min-width: 0;
}
.filter-date {
  min-width: 8rem;
}
.sort-builder {
  min-width: 20rem;
}
.sort-builder__controls {
  align-items: center;
  display: flex;
  gap: 0.35rem;
}
.sort-builder__field {
  min-width: 11rem;
}
.sort-builder__direction {
  flex: 0 0 auto;
}
.sort-builder__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.35rem;
}
</style>
