

<script lang="ts">
import FileSaver from 'file-saver';
import { filesize } from 'filesize';

import { Component, toNative } from 'vue-facing-decorator';
import { CrudViewBase } from '@/views/CrudViewBase.vue';
import CrudView from '@/views/CrudView.vue';

import FileUploadDialog from '@/components/dialog/FileUploadDialog.vue';
import SimpleInputDialog from '@/components/dialog/SimpleInputDialog.vue';

import backupService from '../services/backup.js';
import { formatDate, isInertiaForm } from '@/libs/util.js';

import EditableCellTextField from '@/components/form/editable_cell/EditableCellTextField.vue';
import { VDataTable } from 'vuetify/components';
import IconButton from '@/components/button/IconButton.vue';
import ConfirmationIconButton from '@/components/button/ConfirmationIconButton.vue';
import rules from '@/validations-gen/backup.json';
import { parseLaravelRules } from '@/libs/validation';

@Component({
    name: "BackupView",
    components: {
      FileUploadDialog,
      SimpleInputDialog,
      CrudView,
      EditableCellTextField,
      VDataTable,
      IconButton,
      ConfirmationIconButton
    },
})
class BackupView extends CrudViewBase {
  nameField = "id";
  client = backupService;
  uploadDialog = false;
  formDialog = false;

  get itemName(){
      return this.$t('backup.item');
  }
  get headers(){
      let headers = [
        { title: this.$t('backup.item'), value: 'id' },
        { title: this.$t('form.size'), value: 'size' },
        { title: this.$t('crud.last_modified'), value: 'modified' },
        { title: this.$t('crud.actions'), value: 'actions', sortable: false },
      ];
      return headers;
  }

  showForm(chirp=null){
    this.editing = chirp;
    this.formDialog = true;
  }
  showUpload(){
    this.uploadDialog = true;
  }
  async createBackup(form){
    if (!isInertiaForm(form))
      form = { id: form };
    await this.waitBusy(
      async () => {
        let res = await backupService.create(form);
        this.fetch();
      }
    );
  }

  restoreText(item){
    return this.$t('backup.restore_confirm_text', { name: item.id });
  }
  async restoreBackup(item){
    await this.waitBusy(
      async () => {
        let res = await backupService.put(item);
      }
    );
  }
  async downloadBackup(item){
    await this.waitBusy(
      async () => {
        let res = await backupService.download(item);
        FileSaver.saveAs(res.data, item.id);
      }
    );
  }
  async uploadBackup(file){
    await this.waitBusy(
      async () => {
        let res = await backupService.put(null, { file: file });
        this.items.push(res.backup);
      }
    );
  }
  formatSize(size){
    return filesize(size);
  }
  formatDate(date){
    return formatDate(date);
  }
  get rules(){
      return parseLaravelRules(rules);
  }
}
export { BackupView };
export default toNative(BackupView);
</script>
<template>
  <CrudView 
    :title="$t('backup.title')"
    :create="() => showForm()"
    :fetch="fetch"
    v-model:search="search"
    :export-csv="exportCsv"
    :export-xlsx="exportXlsx"
    :export-pdf="exportPdf"
  >
    <template v-slot:toolbar-left>
      <IconButton
          @click.stop="uploadDialog = true" 
          :disabled="busy"
          icon="mdi-upload"
          :text="$t('form.upload')"
          size="default"
      />
    </template>
    <template v-slot:default>
      <VDataTable
          class=""
          :headers="headers"
          :items="items"
          item-key="id"
          :search="search"
          :loading="busy"
      >
        <template v-slot:item.id="{ item }">
          <EditableCellTextField
            name="id"
            :confirm-text-maker="(value) => setFieldConfirmText('id', item, value)"
            v-model="item.id"
            :on-finish="(value) => setField('id', item, value)"
            :disabled="busy"
            :rules="rules.id"
          />
        </template>
        <template v-slot:item.size="{ item }">
          <small class="ml-2 text-sm text-gray-600">{{ formatSize(item.size) }}</small>
        </template>
        <template v-slot:item.modified="{ item }">
          <small class="ml-2 text-sm text-gray-600">{{ formatDate(item.modified) }}</small>
        </template>
        <template v-slot:item.actions="{ item }">
          <IconButton
              @click.stop="() => downloadBackup(item)" 
              :disabled="busy"
              icon="mdi-download"
              :text="$t('form.download')"
          />
          <ConfirmationIconButton
              icon="mdi-restore"
              :text="$t('backup.restore')"
              :confirmTextMaker="restoreText(item)"
              :on-confirm="() => restoreBackup(item)"
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
      </VDataTable>
      <FileUploadDialog 
        v-model="uploadDialog" 
        :on-upload="uploadBackup" 
        :title="$t('backup.upload_title')"
        :text="$t('backup.upload_desc')"
        :label="$t('backup.upload_label')"
        acceptedFiles=".zip"
        :mimeTypes="[
          'application/zip',
        ]"
      />
      <SimpleInputDialog 
        v-model="formDialog" 
        :on-submit="createBackup"
        :title="$t('backup.create_title')"
        :label="$t('backup.create_label')"
        noInput="true"
        name="id"
        :rules="rules.id"
      />
    </template>
  </CrudView>
</template>
<style scoped>
</style>
