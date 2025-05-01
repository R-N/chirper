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
import { UserFormMixin } from '../mixins/UserForm.vue';
import UserForm from '../forms/User.vue';

const BaseClass = UserFormMixin(CrudViewBase);

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
        EditableCellSelect,
        UserForm
    },
})
class UserCrudView extends BaseClass {
    client = userService;
    editing = null;

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
                <template v-slot:item.name="{ item }">
                    <UserForm 
                        :disabled="busy"
                        :bypass-editable-cell="false"
                        :data="item"
                        :rules="rules"
                        select="name"
                    />
                </template>
                <template v-slot:item.email="{ item }">
                    <UserForm 
                        :disabled="busy"
                        :bypass-editable-cell="false"
                        :data="item"
                        :rules="rules"
                        select="email"
                    />
                </template>
                <template v-slot:item.roles="{ item }">
                    <UserForm 
                        :disabled="busy"
                        :bypass-editable-cell="false"
                        :data="item"
                        :rules="rules"
                        select="roles"
                    />
                </template>
                <template v-slot:item.enabled="{ item }">
                    <UserForm 
                        :disabled="busy"
                        :bypass-editable-cell="false"
                        :data="item"
                        :rules="rules"
                        select="enabled"
                    />
                </template>
                <template v-slot:item.verified="{ item }">
                    <UserForm 
                        :disabled="busy"
                        :bypass-editable-cell="false"
                        :data="item"
                        :rules="rules"
                        select="verified"
                    />
                </template>
                <template v-slot:item.actions="{ item }" class="d-flex flex-row">
                    <div class="d-flex flex-row">
                        <IconButton
                            @click.prevent.stop="() => visit('/system/users/' + item.id)" 
                            :disabled="busy"
                            icon="mdi-magnify"
                            :text="$t('form.details')"
                        />
                        <IconButton
                            @click.prevent.stop="() => showForm(item)" 
                            :disabled="busy"
                            icon="mdi-pencil"
                            :text="$t('form.edit')"
                        />
                        <UserForm 
                            :disabled="busy"
                            :bypass-editable-cell="false"
                            :data="item"
                            :rules="rules"
                            select="clear_password"
                        />
                        <UserForm 
                            :disabled="busy"
                            :bypass-editable-cell="false"
                            :data="item"
                            :rules="rules"
                            select="delete"
                        />
                    </div>
                </template>
            </component>
            <UserFormDialog
                :data="editing"
                v-model="formDialog"
                @submit.prevent.stop="storeItem"
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
