
<script lang="ts">

import { Component, Prop, Watch, Model, toNative } from 'vue-facing-decorator';
import { ViewBase } from '@/views/ViewBase.vue';
import { deleteFromArray, findIndex } from '@/libs/util';

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

    get nameField() { return "name"; }
    get itemName(){ return 'Item'; }
    get client(){ return null; }
    get headers(){ return []; }
    get breadcrumbs() { return []; }
    get query(){ return {}; }
    get filteredErrors() { return []; }

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
        // await this.appStore.breadcrumbs = this.breadcrumbs;
        await this.fetch();
    }

    async _fetch(releaseBusy=true){
        await this._waitbusy(
            async () => {
                let query = this.query;
                let res = await this.client.fetch(query);
                this.items = this.client.getData(res);
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

    _setFieldConfirmText(fieldName, item, newValue=null, alias=null){
        let oldValue = item[fieldName];
        // let newValue = item[newField];
        if (alias){
            oldValue = alias[oldValue];
            newValue = alias[newValue];
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

    async _setField(fieldName, item, value=null, releaseBusy=true){
        await this._waitbusy(
            async () => {
                await this.client[`set_${fieldName}`](item, value);
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
        // if (this.appStore.showError(error, this.filteredErrors)) 
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
    setNameConfirmText(item, newValue){
        return this._setNameConfirmText(item, newValue);
    }

    async setName(item, name, releaseBusy=true){
        return await this._setName(item, name, releaseBusy);
    }

    setFieldConfirmText(fieldName, item, newValue=null, alias=null){
        return this._setFieldConfirmText(fieldName, item, newValue, alias);
    }

    async waitBusy(f, releaseBusy=true){
        return await this._waitbusy(f, releaseBusy);
    }

    async create(form, releaseBusy=true){
        return await this._create(form, releaseBusy);
    }

    async setField(fieldName, item, value=null, releaseBusy=true){
        return await this._setField(fieldName, item, value, releaseBusy);
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