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
import EditableCellSelect from '@/components/form/editable_cell/EditableCellSelect.vue';
import { getArrayText } from '@/libs/util.js';
import rules from '@/validations-gen/users.json';
import { parseLaravelRules } from '@/libs/validation';

@Component({
    name: "UserCrudView",
    components: {
        UserFormDialog,
        CrudView,
        EditableCellTextField,
        VDataTable,
        IconButton,
        ConfirmationIconButton,
        SyncCheckbox,
        EditableCellSelect
    },
})
class UserCrudView extends CrudViewBase {
    client = userService;
    editing = null;
    availableRoles = [];
    availablePermissions = [];

    get itemName(){
        return this.$t('user.item');
    }
    get headers(){
        let headers = [
            { title: this.$t('user.name'), value: 'name' },
            { title: this.$t('user.roles'), value: 'roles' },
            { title: this.$t('user.email'), value: 'email' },
            { title: this.$t('user.verified'), value: 'verified' },
            { title: this.$t('user.enabled'), value: 'enabled' },
            { title: this.$t('crud.actions'), value: 'actions' }
        ];
        return headers;
    }

    showForm(user=null){
        this.editing = user;
        this.formDialog = true;
    }

    async created(){
        this.availableRoles = (await userService.get_roles()).roles;
        this.availablePermissions = (await userService.get_permissions()).permissions;
        super.created();
    }

    get hasAvailableRoles(){
        return this.availableRoles && this.availableRoles.length > 0;
    }

    get hasAvailablePermissions(){
        return this.availablePermissions && this.availablePermissions.length > 0;
    }

    setRolesConfirmText(item, value){
        return this.setFieldConfirmText('roles', item, value)
    }
    getRolesText(val){
        return getArrayText(val, (v) => v.name, false);
    }
    get rules(){
        return parseLaravelRules(rules);
    }
}
export { UserCrudView };
export default toNative(UserCrudView);
</script>
<template>
    <CrudView 
        :title="$t('user.title')"
        :create="() => showForm()"
        :fetch="fetch"
        v-model:search="search"
        :export-csv="exportCsv"
        :export-xlsx="exportXlsx"
        :export-pdf="exportPdf"
    >
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
            >
                <template v-slot:item.email="{ item }">
                    <EditableCellTextField
                        name="email" 
                        type="email"
                        :confirm-text-maker="(value) => setFieldConfirmText('email', item, value)"
                        :value="item.email" 
                        :on-finish="(value) => setField('email', item, value)"
                        :disabled="busy"
                        :rules="rules.email"
                    />
                </template>
                <template v-slot:item.roles="{ item }">
                    <EditableCellSelect
                        name="roles" 
                        type="roles"
                        :label="$t('user.roles')" 
                        :confirm-text-maker="(value) => setFieldConfirmText(
                            'roles', item, value,
                            (v) => getRolesText(v)
                        )"
                        :items="availableRoles"
                        :value="item.roles" 
                        item-value="name"
                        item-title="name"
                        :on-finish="(value) => setField(
                            'roles', item, value, true, (v) => v.name
                        )"
                        :disabled="busy  || !hasAvailableRoles"
                        :multiple="true"
                        :return-object="true"
                    />
                </template>
                <template v-slot:item.name="{ item }">
                    <EditableCellTextField
                        name="name"
                        :confirm-text-maker="(value) => setFieldConfirmText('name', item, value)"
                        :value="item.name" 
                        :on-finish="(value) => setName(item, value)"
                        :disabled="busy"
                        :rules="rules.name"
                    />
                </template>
                <template v-slot:item.enabled="{ item }">
                    <SyncCheckbox 
                        v-model="item.enabled" 
                        :on-change="value => setEnabled(item, value)"
                        :confirm-text-maker="() => setEnabledConfirmText(item)"
                        :disabled="busy"
                        :text-enable="$t('crud.enable')"
                        :text-disable="$t('crud.disable')"
                    />
                </template>
                <template v-slot:item.verified="{ item }">
                    <SyncCheckbox 
                        v-model="item.verified" 
                        :on-change="value => setField('verified', item, value)"
                        :confirm-text-maker="() => toggleFieldConfirmText('verified', 'menghilangkan verifikasi', 'memaksa verifikasi', item)"
                        readonly
                        :disabled="busy"
                        :text-disable="$t('user.unverify')"
                        :text-enable="$t('user.force_verify')"
                    />
                </template>
                <template v-slot:item.actions="{ item }">
                    <IconButton
                        @click.stop="() => showForm(item)" 
                        :disabled="busy"
                        icon="mdi-pencil"
                        :text="$t('form.edit')"
                    />
                    <ConfirmationIconButton
                        icon="mdi-key-variant"
                        :text="$t('user.clear_password')"
                        :confirmTextMaker="clearFieldConfirmText('password', item)"
                        :on-confirm="() => clearField('password', item)"
                        :ask="(ask) => justAsk(item, ask)" 
                        :disabled="busy"
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
            <UserFormDialog
                :data="editing"
                v-model="formDialog"
                @submit="storeItem"
                :parent-busy="busy"
                :availableRoles="availableRoles"
                :availablePermissions="availablePermissions"
                :rules="rules"
            />
        </template>
    </CrudView>
</template>
<style scoped>
</style>
