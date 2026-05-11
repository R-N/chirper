import { ref, computed, onMounted, getCurrentInstance } from "vue";
import { useForm } from "@/plugins/inertia";
import debounce from "lodash/debounce";
import { VDataTable, VDataTableServer } from "vuetify/components";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  deleteFromArray, findIndex, getField, timestamp,
  isInertiaForm, isObject, deepAssign, deepMerge,
} from "@/libs/util";
import { t } from "@/plugins/i18n";
import { useCrud } from "./useCrud";

export function useCrudView({
  client,
  waitBusy,
  showError,
  nameField = "name",
  __query = {},
  __items = null,
  _query = ref({}),
  _rules = {},
  headers = [],
}) {
  const crud = useCrud({ client, waitBusy, nameField });

  const formDialogShow = ref(false);
  const editing = ref(null);
  const search = ref("");
  const _items = ref([]);
  const selected = ref([]);
  const page = ref(1);
  const itemsPerPage = ref(null);
  const itemCount = ref(0);
  const selecting = ref(false);

  const serverside = computed(() => !!itemsPerPage.value);

  const query = computed(() => ({ ..._query.value, ...(__query || {}) }));

  const items = computed({
    get() {
      if (__items) return __items;
      return _items.value;
    },
    set(value) {
      _items.value = value;
      // Note: parent should handle emit if __items is a prop
    },
  });

  const exportItems = computed(() => {
    const fields = headers.map((h) => h.value);
    return items.value.map((i) =>
      Object.fromEntries(fields.map((f) => [f, getField(i, f)]))
    );
  });

  const exportHeaders = computed(() =>
    headers.map((h) => h.title || h.text || h.label || h.value)
  );

  const dataTableComponent = computed(() =>
    serverside.value ? VDataTableServer : VDataTable
  );

  async function exportXlsx() {
    if (serverside.value) return await downloadExport("xlsx");
    const worksheet = XLSX.utils.json_to_sheet(exportItems.value);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    FileSaver.saveAs(blob, `${crud.itemName.value}_${timestamp()}.xlsx`);
  }

  async function exportCsv() {
    if (serverside.value) return await downloadExport("csv");
    const worksheet = XLSX.utils.json_to_sheet(exportItems.value);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, `${crud.itemName.value}_${timestamp()}.csv`);
  }

  async function exportPdf() {
    if (serverside.value) return await downloadExport("pdf", true);
    const doc = new jsPDF();
    const rows = exportItems.value.map((item) =>
      headers.map((h) => item[h.value])
    );
    autoTable(doc, { head: [exportHeaders.value], body: rows });
    doc.save(`${crud.itemName.value}_${timestamp()}.pdf`);
  }

  async function downloadExport(type = "xlsx", queryFlag = false, endpoint = null, releaseBusyFlag = true) {
    return await waitBusy(async () => {
      const res = await client.export(
        null, type,
        {
          params: {
            ...(serverside.value && queryFlag
              ? { ["filter[search]"]: search.value, ...query.value }
              : {}),
          },
        },
        endpoint
      );
      const data = client.getData(res);
      FileSaver.saveAs(data, res.filename);
      return data;
    }, null, releaseBusyFlag);
  }

  function bulkConfirmText(action) {
    return t("crud.bulk_confirm_text", {
      action,
      count: selected.value.length,
      item: crud.itemName.value.toLowerCase(),
    });
  }

  function storeItem(item) {
    const index = findIndex(items.value, item);
    if (index < 0) {
      items.value.push(item);
    } else {
      deepAssign(items.value[index], item);
      items.value[index] = item;
    }
  }

  function deleteItem(item) {
    deleteFromArray(items.value, item);
  }

  async function delete2(item, releaseBusyFlag = true) {
    return await waitBusy(async () => {
      const ret = await client.delete(item);
      deleteItem(item);
      return ret;
    }, null, releaseBusyFlag);
  }

  async function fetch(releaseBusyFlag = true) {
    return await waitBusy(async () => {
      let options = { params: { ...query.value } };
      if (serverside.value || query.value) {
        options = {
          params: {
            page: page.value,
            ...(serverside.value
              ? { ["filter[search]"]: search.value, per_page: itemsPerPage.value }
              : {}),
            ...query.value,
          },
        };
      }
      let result = await client.fetch(options);
      result = client.getData(result);
      if (Array.isArray(result)) {
        items.value = result;
        itemCount.value = result.length;
      } else if (result.data && Array.isArray(result.data)) {
        items.value = result.data;
        itemCount.value = result.total;
      } else {
        console.log(result);
        showError({ message: t("crud.unknown_fetch_result") });
      }
      return result;
    }, null, releaseBusyFlag);
  }

  async function create(form, releaseBusyFlag = true) {
    return await waitBusy(async () => {
      const res = await client.create(form);
      const obj = client.getData(res);
      if (obj) items.value.push(obj);
      return obj;
    }, null, releaseBusyFlag);
  }

  async function bulkAction(action, form, onSuccess = null, releaseBusyFlag = true) {
    return await crud.action(`bulk_${action}`, form, onSuccess, releaseBusyFlag);
  }

  let debouncedFetch = null;

  async function debouncedFetch2(releaseBusyFlag = true) {
    if (busy?.value) return;
    return await fetch(releaseBusyFlag);
  }

  // created() equivalent — auto-fetch on mount (matches old mixin behavior)
  debouncedFetch = debounce(fetch, 300);
  onMounted(() => {
    fetch();
  });

  return {
    ...crud,
    formDialogShow,
    editing,
    search,
    _items,
    items,
    selected,
    page,
    itemsPerPage,
    itemCount,
    selecting,
    serverside,
    query,
    _query,
    _rules,
    headers,
    exportItems,
    exportHeaders,
    dataTableComponent,
    debouncedFetch,
    storeItem,
    deleteItem,
    delete2,
    fetch,
    create,
    exportXlsx,
    exportCsv,
    exportPdf,
    downloadExport,
    bulkConfirmText,
    bulkAction,
    debouncedFetch2,
  };
}
