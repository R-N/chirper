
<script lang="ts">

import { Component, Prop, Watch, Model, toNative } from 'vue-facing-decorator';
import { ViewBase } from '@/views/ViewBase.vue';
import { deleteFromArray, findIndex, getField, timestamp } from '@/libs/util';
import debounce from 'lodash/debounce';
import { VDataTable, VDataTableServer } from 'vuetify/components';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
    name: "CrudViewBase",
    components: {
    }
})
class CrudViewBase extends ViewBase {
    formDialog = false;
    editing = null;
    search = '';
    items = [];
    selected = [];
    page = 1;
    itemsPerPage = null;
    debouncedFetch = null;
    itemCount = 0;
    selecting = false;
    nameField = "name";
    itemName = "Item";
    client = null;
    filteredErrors = [];

    get serverside() {
        return !!this.itemsPerPage;
    }
    get query() { return {}; }
    get headers(){ return []; }

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
        if (this.serverside)
            return await this.downloadExport("xlsx");
        const worksheet = XLSX.utils.json_to_sheet(this.exportItems);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        FileSaver.saveAs(blob, `${this.itemName}_${timestamp()}.xlsx`);
    }

    async exportCsv() {
        if (this.serverside)
            return await this.downloadExport("csv");
        const worksheet = XLSX.utils.json_to_sheet(this.exportItems);
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        FileSaver.saveAs(blob, `${this.itemName}_${timestamp()}.csv`);
    }

    async exportPdf() {
        if (this.serverside)
            return await this.downloadExport("pdf", true);
        const doc = new jsPDF();
        const rows = this.exportItems.map((item: any) =>
            this.headers.map((h) => item[h.value])
        );
        autoTable(doc, {
            head: [this.exportHeaders],
            body: rows,
        });
        doc.save(`${this.itemName}_${timestamp()}.pdf`);
    }

    async downloadExport(type="xlsx", query=false, endpoint=null){
        await this.waitBusy(
            async () => {
                let res = await this.client.export(null, type, { 
                    params: {
                        ...(this.serverside && query ? { 
                            ["filter[search]"]: this.search,
                            ...this.query
                        } : {}),
                    }
                }, endpoint);
                FileSaver.saveAs(res.data, res.filename);
            }
        );
    }
    
    get dataTableComponent(){
        return this.serverside ? VDataTableServer : VDataTable;
    }
    deleteConfirmText(item){
        return `Apa Anda yakin ingin menghapus ${this.itemName.toLowerCase()} '${item[this.nameField]}'?`;
    }

    bulkConfirmText(action){
        return `Apa Anda yakin ingin ${action} ${this.selected.length} ${this.itemName.toLowerCase()}?`;
    }


    storeItem(item){
        let index = findIndex(this.items, item);
        if (index < 0){
            this.items.push(item);
        }else{
            this.items[index] = item;
        }
    }

    async justAsk(item, ask){
        if (ask)
            ask();
    }

    async deleteItem(item, releaseBusy=true){
        await this.waitBusy(
            async () => {
                await this.client.delete(item);
                deleteFromArray(this.items, item);
            }, releaseBusy
        );
    }

    async created(){
        this.debouncedFetch = debounce(this.fetch, 300);
        await this.fetch();
    }

    async fetch(releaseBusy=true){
        await this.waitBusy(
            async () => {
                let query = this.query;
                let options = {};
                if (this.itemsPerPage || this.query){
                    options = {
                        params: {
                            page: this.page,
                            ...(this.serverside ? { 
                                ["filter[search]"]: this.search,
                                per_page: this.itemsPerPage 
                            } : {}),
                            ...this.query
                        }
                    }
                }
                let res = await this.client.fetch(options);
                let items = this.client.getData(res);
                if (Array.isArray(items)){
                    this.items = items;
                    this.itemCount = items.length;
                }else if (items.data && Array.isArray(items.data)){
                    this.items = items.data;
                    this.itemCount = items.total;
                }else {
                    console.log(items);
                    this.showError({ message: "Unkown fetch result" });
                }
            }, releaseBusy
        );
    }

    async create(form, releaseBusy=true){
        return await this.waitBusy(
            async () => {
                let res = await this.client['create'](form);
                let obj = this.client.getData(res);
                if (obj){
                    this.items.push(obj);
                }
            }, releaseBusy
        );
    }

    setNameConfirmText(item, newValue){
        return this.setFieldConfirmText(this.nameField, item, newValue);
    }

    async setName(item, newValue, releaseBusy=true){
        return await this.setField(this.nameField, item, newValue, releaseBusy);
    }

    setFieldConfirmText(fieldName, item, newValue=null, getText=null){
        let oldValue = item[fieldName];
        // let newValue = item[newField];
        if (getText){
            oldValue = getText(oldValue);
            newValue = getText(newValue);
        }
        return `Apa Anda yakin ingin mengubah ${fieldName} ${this.itemName.toLowerCase()} '${item[this.nameField]}' dari '${oldValue}' menjadi '${newValue}'?`
    }

    async setField(fieldName, item, value=null, releaseBusy=true, getValue=null){
        await this.waitBusy(
            async () => {
                await this.client[`set_${fieldName}`](
                    item, 
                    getValue ? getValue(value) : value
                );
                item[fieldName] = value;
            }, releaseBusy
        );
    }

    setEnabledConfirmText(item){
        return this.toggleFieldConfirmText("enabled", 'menonaktifkan', 'mengaktifkan', item);
    }

    async setEnabled(item, enabled, releaseBusy=true){
        return await this.toggleField("enabled", item, enabled, releaseBusy);
    }

    toggleFieldConfirmText(fieldName, disable, enable, item){
        let action = item[fieldName] ? disable : enable;
        return `Apa Anda yakin ingin ${action} ${this.itemName.toLowerCase()} '${item[this.nameField]}'?`;
    }

    async toggleField(toggleName, item, enabled, releaseBusy=true){
        if (enabled === undefined || enabled === null)
            enabled = !item.enabled;
        return await this.setField(toggleName, item, enabled, releaseBusy);
    }

    clearFieldConfirmText(fieldName, item){
        return `Apa Anda yakin ingin menghapus ${fieldName} dari ${this.itemName.toLowerCase()} '${item[this.nameField]}'?`;
    }

    async clearField(fieldName, item, releaseBusy=true){
        await this.waitBusy(
            async () => {
                await this.client[`clear_${fieldName}`](item);
                item[fieldName] = null;
            }, releaseBusy
        );
    }

    async bulkAction(action, form, onSuccess=null, releaseBusy=true){
        await this.waitBusy(
            async () => {
                await this.client[`bulk_${action}`](form);
                onSuccess?.();
            }, releaseBusy
        );
    }

    async debouncedFetch2(releaseBusy=true){
        if (this.busy)
            return;
        return await this.fetch(releaseBusy);
    }


}
export { CrudViewBase };
export default toNative(CrudViewBase);
</script>