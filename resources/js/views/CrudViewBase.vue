
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
    page = 1;
    itemsPerPage = null;
    debouncedFetch = null;
    itemCount = 0;

    get serverside() {
        return !!this.itemsPerPage;
    }
    get query() { return {}; }
    get nameField() { return "name"; }
    get itemName(){ return 'Item'; }
    get client(){ return null; }
    get headers(){ return []; }
    get filteredErrors() { return []; }

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
    _deleteConfirmText(item){
        return `Apa Anda yakin ingin menghapus ${this.itemName.toLowerCase()} '${item[this.nameField]}'?`;
    }

    storeItem(item){
        let index = findIndex(this.items, item);
        if (index < 0){
            this.items.push(item);
        }else{
            this.items[index] = item;
        }
    }

    async _justAsk(item, ask){
        if (ask)
            ask();
    }

    async _deleteItem(item, releaseBusy=true){
        await this._waitbusy(
            async () => {
                await this.client.delete(item);
                deleteFromArray(this.items, item);
            }, releaseBusy
        );
    }

    async _created(){
        this.debouncedFetch = debounce(this.fetch, 300);
        await this.fetch();
    }

    async _fetch(releaseBusy=true){
        await this._waitbusy(
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

    async _create(form, releaseBusy=true){
        return await this._waitbusy(
            async () => {
                let res = await this.client['create'](form);
                let obj = this.client.getData(res);
                if (obj){
                    this.items.push(obj);
                }
            }, releaseBusy
        );
    }

    _setNameConfirmText(item, newValue){
        return this.setFieldConfirmText(this.nameField, item, newValue);
    }

    async _setName(item, newValue, releaseBusy=true){
        return await this.setField(this.nameField, item, newValue, releaseBusy);
    }

    _setFieldConfirmText(fieldName, item, newValue=null, getText=null){
        let oldValue = item[fieldName];
        // let newValue = item[newField];
        if (getText){
            oldValue = getText(oldValue);
            newValue = getText(newValue);
        }
        return `Apa Anda yakin ingin mengubah ${fieldName} ${this.itemName.toLowerCase()} '${item[this.nameField]}' dari '${oldValue}' menjadi '${newValue}'?`
    }

    async _waitbusy(f, releaseBusy=true){
        const view = this;
        view.busy=true;
        try{
            return await f();
        } catch (error) {
            view.showError(error);
        } finally {
            if (releaseBusy)
                view.busy = false;
        }
    }

    async _setField(fieldName, item, value=null, releaseBusy=true, getValue=null){
        await this._waitbusy(
            async () => {
                await this.client[`set_${fieldName}`](
                    item, 
                    getValue ? getValue(value) : value
                );
                item[fieldName] = value;
            }, releaseBusy
        );
    }

    _setEnabledConfirmText(item){
        return this.toggleFieldConfirmText("enabled", 'menonaktifkan', 'mengaktifkan', item);
    }

    async _setEnabled(item, enabled, releaseBusy=true){
        return await this.toggleField("enabled", item, enabled, releaseBusy);
    }

    _toggleFieldConfirmText(fieldName, disable, enable, item){
        let action = item[fieldName] ? disable : enable;
        return `Apa Anda yakin ingin ${action} ${this.itemName.toLowerCase()} '${item[this.nameField]}'?`;
    }

    async _toggleField(toggleName, item, enabled, releaseBusy=true){
        if (enabled === undefined || enabled === null)
            enabled = !item.enabled;
        return await this.setField(toggleName, item, enabled, releaseBusy);
    }

    _clearFieldConfirmText(fieldName, item){
        return `Apa Anda yakin ingin menghapus ${fieldName} dari ${this.itemName.toLowerCase()} '${item[this.nameField]}'?`;
    }

    async _clearField(fieldName, item, releaseBusy=true){
        await this._waitbusy(
            async () => {
                await this.client[`clear_${fieldName}`](item);
                item[fieldName] = null;
            }, releaseBusy
        );
    }

    _showError(error){
        // if (this.tabStore.showError(error, this.filteredErrors)) 
        //     return;
        throw error;
    }

    
    deleteConfirmText(item){
        return this._deleteConfirmText(item);
    }

    async justAsk(item, ask){
        return await this._justAsk(item, ask);
    }

    async deleteItem(item, releaseBusy=true){
        return await this._deleteItem(item, releaseBusy);
    }

    async created(){
        return await this._created();
    }

    async fetch(releaseBusy=true){
        return await this._fetch(releaseBusy);
    }

    async debouncedFetch2(releaseBusy=true){
        if (this.busy)
            return;
        return await this.fetch(releaseBusy);
    }

    setNameConfirmText(item, newValue){
        return this._setNameConfirmText(item, newValue);
    }

    async setName(item, name, releaseBusy=true){
        return await this._setName(item, name, releaseBusy);
    }

    setFieldConfirmText(fieldName, item, newValue=null, getText=null){
        return this._setFieldConfirmText(fieldName, item, newValue, getText);
    }

    async waitBusy(f, releaseBusy=true){
        return await this._waitbusy(f, releaseBusy);
    }

    async create(form, releaseBusy=true){
        return await this._create(form, releaseBusy);
    }

    async setField(fieldName, item, value=null, releaseBusy=true, getValue=null){
        return await this._setField(fieldName, item, value, releaseBusy, getValue);
    }

    setEnabledConfirmText(item){
        return this._setEnabledConfirmText(item);
    }

    async setEnabled(item, enabled, releaseBusy=true){
        return await this._setEnabled(item, enabled, releaseBusy);
    }

    toggleFieldConfirmText(fieldName, disable, enable, item){
        return this._toggleFieldConfirmText(fieldName, disable, enable, item);
    }

    async toggleField(toggleName, item, enabled, releaseBusy=true){
        return await this._toggleField(toggleName, item, enabled, releaseBusy);
    }

    clearFieldConfirmText(fieldName, item){
        return this._clearFieldConfirmText(fieldName, item);
    }

    async clearField(toggleName, item, releaseBusy=true){
        return await this._clearField(toggleName, item, releaseBusy);
    }

    showError(error){
        return this._showError(error);
    }
}
export { CrudViewBase };
export default toNative(CrudViewBase);
</script>