<script lang="ts">
import { Component, toNative } from 'vue-facing-decorator';

import dayjs from 'dayjs';

import UserFormDialog from '../views/FormDialog.vue';
import CrudView from '@/views/CrudView.vue';
import { CrudViewBase } from '@/views/CrudViewBase.vue';
import EditableCellTextField from '@/components/form/editable_cell/EditableCellTextField.vue';

import userService from '../services/user';
import { VDataTable } from 'vuetify/components';
import IconButton from '@/components/button/IconButton.vue';
import ConfirmationIconButton from '@/components/button/ConfirmationIconButton.vue';
import SyncCheckbox from '@/components/checkbox/SyncCheckbox.vue';

@Component({
    name: "UserCrudView",
    components: {
        UserFormDialog,
        CrudView,
        EditableCellTextField,
        VDataTable,
        IconButton,
        ConfirmationIconButton,
        SyncCheckbox
    },
})
class UserCrudView extends CrudViewBase {
    editing = null;

    get nameField(){ return "name"; }
    get itemName(){ return 'User'; }
    get client(){ return userService; }
    get headers(){
        let headers = [
            { title: 'Name', value: 'name' },
            { title: 'Email', value: 'email' },
            { title: 'Verified', value: 'verified' },
            { title: 'Enabled', value: 'enabled' },
            { title: 'Actions', value: 'actions' }
        ];
        return headers;
    }

    showForm(user=null){
        this.editing = user;
        this.formDialog = true;
    }
}
export { UserCrudView };
export default toNative(UserCrudView);
</script>
<template>
    <CrudView 
        title="Users"
        :create="() => showForm()"
        :fetch="fetch"
        create-text="User"
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
                <template v-slot:item.email="{ item }">
                    <EditableCellTextField
                        name="email" 
                        type="email"
                        :confirm-text-maker="(value) => setFieldConfirmText('email', item, value)"
                        :value="item.email" 
                        :on-finish="(value) => setField('email', item, value)"
                        :disabled="busy"
                    />
                </template>
                <template v-slot:item.name="{ item }">
                    <EditableCellTextField
                        name="name"
                        :confirm-text-maker="(value) => setFieldConfirmText('name', item, value)"
                        :value="item.name" 
                        :on-finish="(value) => setName(item, value)"
                        :disabled="busy"
                    />
                </template>
                <template v-slot:item.enabled="{ item }">
                    <SyncCheckbox 
                        v-model="item.enabled" 
                        :on-change="value => setEnabled(item, value)"
                        :confirm-text-maker="() => setEnabledConfirmText(item)"
                        :disabled="busy"
                        text-disable="Nonaktifkan"
                        text-enable="Aktifkan"
                    />
                </template>
                <template v-slot:item.verified="{ item }">
                    <SyncCheckbox 
                        v-model="item.verified" 
                        :on-change="value => setField('verified', item, value)"
                        :confirm-text-maker="() => toggleFieldConfirmText('verified', 'menghilangkan verifikasi', 'memaksa verifikasi', item)"
                        readonly
                        :disabled="busy"
                        text-disable="Batalkan verifikasi"
                        text-enable="Paksa verifikasi"
                    />
                </template>
                <template v-slot:item.actions="{ item }">
                    <IconButton
                        @click.stop="() => showForm(item)" 
                        :disabled="busy"
                        icon="mdi-pencil"
                        text="Edit"
                    />
                    <ConfirmationIconButton
                        icon="mdi-key-variant"
                        text="Clear password"
                        :confirmTextMaker="clearFieldConfirmText('password', item)"
                        :on-confirm="() => clearField('password', item)"
                        :ask="(ask) => justAsk(item, ask)" 
                        :disabled="busy"
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
            <UserFormDialog
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
