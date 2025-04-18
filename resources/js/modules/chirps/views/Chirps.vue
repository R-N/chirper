<script lang="ts">
import { Component, toNative } from 'vue-facing-decorator';

import dayjs from 'dayjs';

import ChirpFormDialog from '@/modules/chirps/views/FormDialog.vue';
import CrudView from '@/views/CrudView.vue';
import { CrudViewBase } from '@/views/CrudViewBase.vue';
import EditableCellTextField from '@/components/form/editable_cell/EditableCellTextField.vue';

import chirpService from '../services/chirp';
import { VDataTable } from 'vuetify/components';
import IconButton from '@/components/button/IconButton.vue';
import ConfirmationIconButton from '@/components/button/ConfirmationIconButton.vue';

@Component({
    name: "ChirpCrudView",
    components: {
        ChirpFormDialog,
        CrudView,
        EditableCellTextField,
        VDataTable,
        IconButton,
        ConfirmationIconButton
    },
})
class ChirpCrudView extends CrudViewBase {
    editing = null;

    get nameField(){ return "created_at"; }
    get itemName(){ return 'Chirp'; }
    get client(){ return chirpService; }
    get headers(){
        let headers = [
            { title: 'User', value: 'user' },
            { title: 'Meessage', value: 'message' },
            { title: 'Created At', value: 'created_at' },
            { title: 'Actions', value: 'actions' }
        ];
        return headers;
    }
    duration(time){
        return dayjs(time).fromNow();
    }
    
    async setMessage(chirp, message){
        const view = this;
        view.busy=true;
        try{
            let res = await chirpService.set_message(chirp, message);
            Object.assign(chirp, res.chirp); 
        } catch (error) {
            view.showError(error);
        } finally {
            view.busy = false;
        }
    }

    showForm(chirp=null){
        this.editing = chirp;
        this.formDialog = true;
    }
}
export { ChirpCrudView };
export default toNative(ChirpCrudView);
</script>
<template>
    <CrudView 
        title="Chirps"
        :create="() => showForm()"
        :fetch="fetch"
        create-text="Chirp"
        v-model:search="search"
    >
        <template v-slot:default>
            <VDataTable
                class="backup-table"
                :headers="headers"
                :items="items"
                item-key="id"
                :search="search"
                :loading="busy"
            >
                <template v-slot:item.message="{ item }">
                    <EditableCellTextField
                        name="message"
                        :confirm-text-maker="(value) => setFieldConfirmText('message', item, value)"
                        :value="item.message" 
                        :on-finish="(value) => setMessage(item, value)"
                        :disabled="busy"
                    />
                </template>
                <template v-slot:item.created_at="{ item }">
                    <small class="ml-2 text-sm text-gray-600">{{ duration(item.created_at) }}</small>
                    <small v-if="item.created_at !== item.updated_at" class="text-sm text-gray-600"> &middot; edited</small>
                </template>
                <template v-slot:item.user="{ item }">
                    <span class="text-gray-800">{{ item.user.name }}</span>
                </template>
                <template v-slot:item.actions="{ item }">
                    <IconButton
                        @click.stop="() => showForm(item)" 
                        :disabled="busy"
                        icon="mdi-pencil"
                        text="Edit"
                    />
                    <ConfirmationIconButton
                        icon="mdi-delete"
                        text="Delete"
                        :confirmTextMaker="deleteConfirmText(item)"
                        :on-confirm="() => deleteItem(item)"
                        :ask="(ask) => justAsk(item, ask)" 
                        :disabled="busy"
                    />
                </template>
            </VDataTable>
            <ChirpFormDialog
                :data="editing"
                v-model="formDialog"
                @submit="storeItem"
                :parent-busy="busy"
            />
        </template>
    </CrudView>
</template>
<style scoped>
</style>
