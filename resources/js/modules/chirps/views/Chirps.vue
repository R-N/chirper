<script lang="ts">
import { Vue, Component, toNative } from 'vue-facing-decorator';

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
import rules from '@/validations-gen/chirps.json';
import { parseLaravelRules } from '@/libs/validation';

import { BaseMixin } from '@/mixins/Component.vue';
import { WorkingMixin } from '@/mixins/Working.vue';
import { CrudViewMixin } from '@/mixins/CrudView.vue';
import {WorkingComponent} from '@/components/WorkingComponent.vue';
import {MyComponent} from '@/components/MyComponent.vue';

const BaseClass = CrudViewMixin(WorkingMixin(BaseMixin(Vue)));

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
class ChirpCrudView extends BaseClass  {
    nameField = "created_at";
    client = chirpService;

    get itemName(){
        return this.$t('chirp.item');
    }
    get headers(){
        let headers = [
            { title: this.$t('crud.user'), value: 'user.name' },
            { title: this.$t('chirp.message'), value: 'message' },
            { title: this.$t('crud.created_at'), value: 'created_at' },
            { title: this.$t('crud.actions'), value: 'actions' }
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

    get rules(){
        return parseLaravelRules(rules);
    }
}
export { ChirpCrudView };
export default toNative( ChirpCrudView );
</script>
<template>
    <CrudView 
        :title="$t('chirp.title')"
        :create="() => showForm()"
        :fetch="fetch"
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
                :text="$t('crud.delete_selected')"
                :disabled="busy"
                :confirmTextMaker="bulkConfirmText('delete')"
                :on-confirm="bulkDelete"
                size="default"
            />
        </template>
        <template v-slot:default>
            <component
                :is="dataTableComponent"
                class=""
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
                        :rules="rules.message"
                    />
                </template>
                <template v-slot:item.created_at="{ item }">
                    <small class="ml-2 text-sm text-gray-600">{{ duration(item.created_at) }}</small>
                    <small v-if="item.created_at !== item.updated_at" class="text-sm text-gray-600"> &middot; {{ $t('crud.edited') }}</small>
                </template>
                <template v-slot:item.user.name="{ item }">
                    <span class="text-gray-800">{{ item.user.name }}</span>
                </template>
                <template v-slot:item.actions="{ item }">
                    <IconButton
                        @click.stop="() => showForm(item)" 
                        :disabled="busy"
                        icon="mdi-pencil"
                        :text="$t('form.edit')"
                    />
                    <ConfirmationIconButton
                        icon="mdi-delete"
                        :text="$t('form.delete')"
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
                :rules="rules"
            />
        </template>
    </CrudView>
</template>
<style scoped>
</style>
