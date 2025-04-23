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
import { bulkDeleteFromArray } from '@/libs/util';

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
    nameField = "created_at";
    itemName = "Chirp";
    client = chirpService;

    get headers(){
        let headers = [
            { title: 'User', value: 'user.name' },
            { title: 'Meessage', value: 'message' },
            { title: 'Created At', value: 'created_at' },
            { title: 'Actions', value: 'actions' }
        ];
        return headers;
    }
    duration(time){
        return dayjs(time).fromNow();
    }

    showForm(chirp=null){
        this.editing = chirp;
        this.formDialog = true;
    }

    async bulkDelete(){
        await this.waitBusy(
            async () => {
                let res = await chirpService.bulk_destroy({ ids: this.selected });
                bulkDeleteFromArray(this.items, this.selected);
                this.selected.splice(0);
            }
        );
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
        :export-csv="exportCsv"
        :export-xlsx="exportXlsx"
        :export-pdf="exportPdf"
        :selectable="true"
        v-model:selecting="selecting"
        :selected="selected.length"
    >
        <template v-slot:bulk-actions>
            <ConfirmationIconButton
                class="fill-height d-inline-flex" 
                icon="mdi-delete"
                text="Delete selected"
                :disabled="busy"
                :confirmTextMaker="bulkConfirmText('delete')"
                :on-confirm="bulkDelete"
            />
        </template>
        <template v-slot:default>
            <component
                :is="dataTableComponent"
                class="backup-table"
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
                <template v-slot:item.message="{ item }">
                    <EditableCellTextField
                        name="message"
                        :confirm-text-maker="(value) => setFieldConfirmText('message', item, value)"
                        :value="item.message" 
                        :on-finish="(value) => setField('message', item, value)"
                        :disabled="busy"
                    />
                </template>
                <template v-slot:item.created_at="{ item }">
                    <small class="ml-2 text-sm text-gray-600">{{ duration(item.created_at) }}</small>
                    <small v-if="item.created_at !== item.updated_at" class="text-sm text-gray-600"> &middot; edited</small>
                </template>
                <template v-slot:item.user.name="{ item }">
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
            </component>
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
