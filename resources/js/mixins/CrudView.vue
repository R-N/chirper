<script lang="ts">
import { Vue, Component, Prop } from "vue-facing-decorator";
import {
  deleteFromArray,
  findIndex,
  getField,
  timestamp,
  isInertiaForm,
  isObject,
  deepAssign,
  deepMerge
} from "@/libs/util";
import debounce from "lodash/debounce";
import { VDataTable, VDataTableServer } from "vuetify/components";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Constructor } from "./Constructor.vue";
import { CrudMixin } from "./Crud.vue";

export const CrudViewMixin = <TBase extends Constructor>(Base: TBase) => {
  Base = CrudMixin(Base);
  @Component({
    name: "CrudViewBase",
    components: {},
    emits: ["update:items"]
  })
  class CrudViewBase extends Base {
    @Prop({ type: Object, default: {} }) __query;
    @Prop({ type: [Array], default: null }) __items;

    formDialog = false;
    editing = null;
    search = "";
    _items = [];
    selected = [];
    page = 1;
    itemsPerPage = null;
    debouncedFetch = null;
    itemCount = 0;
    selecting = false;

    get serverside() {
      return !!this.itemsPerPage;
    }
    get _query() {
      return {};
    }
    get query() {
      return { ...this._query, ...this.__query };
    }
    get rules() {
      return {};
    }

    get items() {
      if (this.__items) {
        return this.__items;
      } else {
        return this._items;
      }
    }
    set items(value) {
      this._items = value;
      if (this.__items) {
        this.$emit("update:items", value);
      }
    }
    get headers() {
      return [];
    }

    get exportItems() {
      let fields = this.headers.map((h) => h.value);
      let items = this.items.map((i) => {
        return Object.fromEntries(
          fields.map((f) => {
            return [f, getField(i, f)];
          })
        );
      });
      return items;
    }
    get exportHeaders() {
      return this.headers.map((h) => h.title || h.text || h.label || h.value);
    }

    async exportXlsx() {
      if (this.serverside) return await this.downloadExport("xlsx");
      const worksheet = XLSX.utils.json_to_sheet(this.exportItems);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream"
      });
      FileSaver.saveAs(blob, `${this.itemName}_${timestamp()}.xlsx`);
    }

    async exportCsv() {
      if (this.serverside) return await this.downloadExport("csv");
      const worksheet = XLSX.utils.json_to_sheet(this.exportItems);
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      FileSaver.saveAs(blob, `${this.itemName}_${timestamp()}.csv`);
    }

    async exportPdf() {
      if (this.serverside) return await this.downloadExport("pdf", true);
      const doc = new jsPDF();
      const rows = this.exportItems.map((item: any) =>
        this.headers.map((h) => item[h.value])
      );
      autoTable(doc, {
        head: [this.exportHeaders],
        body: rows
      });
      doc.save(`${this.itemName}_${timestamp()}.pdf`);
    }

    async downloadExport(
      type = "xlsx",
      query = false,
      endpoint = null,
      releaseBusy = true
    ) {
      return await this.waitBusy(
        async () => {
          let res = await this.client.export(
            null,
            type,
            {
              params: {
                ...(this.serverside && query
                  ? {
                      ["filter[search]"]: this.search,
                      ...this.query
                    }
                  : {})
              }
            },
            endpoint
          );
          let data = this.client.getData(res);
          FileSaver.saveAs(data, res.filename);
          return data;
        },
        null,
        releaseBusy
      );
    }

    get dataTableComponent() {
      return this.serverside ? VDataTableServer : VDataTable;
    }

    bulkConfirmText(action) {
      return this.$t("crud.bulk_confirm_text", {
        action: action,
        count: this.selected.length,
        item: this.itemName.toLowerCase()
      });
    }

    storeItem(item) {
      let index = findIndex(this.items, item);
      if (index < 0) {
        this.items.push(item);
      } else {
        deepAssign(this.items[index], item);
        this.items[index] = item;
      }
    }

    async created() {
      super.created?.();
      this.debouncedFetch = debounce(this.fetch, 300);
      await this.fetch();
    }

    deleteItem(item) {
      deleteFromArray(this.items, item);
    }

    async delete2(item, releaseBusy = true) {
      return await this.waitBusy(
        async () => {
          const ret = await super.delete2(item, false);
          this.deleteItem(item);
          return ret;
        },
        null,
        releaseBusy
      );
    }

    async fetch(releaseBusy = true) {
      return await this.waitBusy(
        async () => {
          let query = this.query;
          let options = {
            params: {
              ...this.query
            }
          };
          if (this.serverside || this.query) {
            options = {
              params: {
                page: this.page,
                ...(this.serverside
                  ? {
                      ["filter[search]"]: this.search,
                      per_page: this.itemsPerPage
                    }
                  : {}),
                ...this.query
              }
            };
          }
          let items = await super.fetch(options, false);
          if (Array.isArray(items)) {
            this.items = items;
            this.itemCount = items.length;
          } else if (items.data && Array.isArray(items.data)) {
            this.items = items.data;
            this.itemCount = items.total;
          } else {
            console.log(items);
            this.showError({ message: this.$t("crud.unknown_fetch_result") });
          }
          return items;
        },
        null,
        releaseBusy
      );
    }

    async create(form, releaseBusy = true) {
      return await this.waitBusy(
        async () => {
          let obj = await super.create(form, false);
          if (obj) {
            this.items.push(obj);
          }
          return obj;
        },
        null,
        releaseBusy
      );
    }

    async bulkAction(action, form, onSuccess = null, releaseBusy = true) {
      return await this.action(`bulk_${action}`, form, onSuccess, releaseBusy);
    }

    async debouncedFetch2(releaseBusy = true) {
      if (this.busy) return;
      return await this.fetch(releaseBusy);
    }
  }
  return CrudViewBase;
};
</script>
