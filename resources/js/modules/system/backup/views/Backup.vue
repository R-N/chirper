

<script lang="ts">
import FileSaver from 'file-saver';

import { Component, toNative } from 'vue-facing-decorator';
import { BaseCrudViewBase } from '@/views/BaseCrudViewBase.vue';
import BaseCrudView from '@/views/BaseCrudView.vue';

import FileUploadDialog from '@/components/dialog/FileUploadDialog.vue';
import SimpleInputDialog from '@/components/dialog/SimpleInputDialog.vue';

import backupService from '../services/backup.js';
import { deleteFromArray, findIndex } from '@/libs/util.js';

import EditableCellTextField from '@/components/form/editable_cell/EditableCellTextField.vue';
import { VDataTable } from 'vuetify/components';
import IconButton from '@/components/button/IconButton.vue';
import ConfirmationIconButton from '@/components/button/ConfirmationIconButton.vue';

@Component({
    name: "BackupView",
    components: {
      FileUploadDialog,
      SimpleInputDialog,
      BaseCrudView,
      EditableCellTextField,
      VDataTable,
      IconButton,
      ConfirmationIconButton
    },
})
class BackupView extends BaseCrudViewBase {
  uploadDialog = false;
  formDialog = false;

  get nameField(){ return "id"; }
  get itemName(){ return 'Backup'; }
  get client(){ return backupService; }
  get headers(){
      let headers = [
        { title: 'File', value: 'id' },
        { title: 'Size', value: 'size' },
        { title: 'Last Modified', value: 'modified' },
        { title: 'Actions', value: 'actions', sortable: false },
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

  async createBackup(file_name){
    console.log("Create backup " + file_name);
    const view = this;
    view.busy=true;
    try{
      let res = await backupService.create({ id: file_name });
      this.fetch();
    } catch(error){
      view.showError(error);
    } finally {
      view.busy = false;
    }
  }

  async deleteBackup(item){
    const view = this;
    view.busy=true;
    try{
      let res = await backupService.destroy(item);
      deleteFromArray(view.items, item);
    } catch(error){
      view.showError(error);
    } finally {
      view.busy = false;
    }
  }

  restoreText(item){
    return `Apa Anda yakin ingin me-restore backup '${item.id}'?`;
  }
  async restoreBackup(item){
    const view = this;
    view.busy=true;
    try{
      let res = await backupService.put(item);
    } catch(error){
      view.showError(error);
    } finally {
      view.busy = false;
    }
  }
  async downloadBackup(item){
    const view = this;
    view.busy=true;
    try{
      let res = await backupService.get(item, { responseType: 'blob' });
      FileSaver.saveAs(res, item.id);
    } catch(error){
      view.showError(error);
    } finally {
      view.busy = false;
    }
  }
  async uploadBackup(file){
    const view = this;
    view.busy = true;
    try{
      let res = await backupService.put(null, { file: file });
      this.items.push(res.backup);
    } catch(error){
      view.showError(error);
    } finally {
      view.busy = false;
    }
  }
  async setId(backup, id){
      const view = this;
      view.busy=true;
      try{
          let res = await backupService.set_id(backup, id);
          Object.assign(backup, res.backup); 
      } catch (error) {
          view.showError(error);
      } finally {
          view.busy = false;
      }
  }
}
export { BackupView };
export default toNative(BackupView);
</script>
<template>
  <BaseCrudView 
      title="Backup"
      :create="() => showForm()"
      :fetch="fetch"
      create-text="Backup"
      v-model:search="search"
  >
    <template v-slot:toolbar-left>
      <IconButton
          @click.stop="uploadDialog = true" 
          :disabled="busy"
          icon="mdi-upload"
          text="Upload"
      />
    </template>
    <template v-slot:default>
      <VDataTable
          class="backup-table"
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
            :value="item.id"
            :on-finish="(value) => setId(item, value)"
            :disabled="busy"
          />
        </template>
        <template v-slot:item.size="{ item }">
          <small class="ml-2 text-sm text-gray-600">{{ item.size }}</small>
        </template>
        <template v-slot:item.modified="{ item }">
          <small class="ml-2 text-sm text-gray-600">{{ item.modified }}</small>
        </template>
        <template v-slot:item.actions="{ item }">
          <IconButton
              @click.stop="() => downloadBackup(item)" 
              :disabled="busy"
              icon="mdi-download"
              text="Download"
          />
          <ConfirmationIconButton
              icon="mdi-restore"
              text="Restore"
              :confirmTextMaker="restoreText(item)"
              :on-confirm="() => restoreBackup(item)"
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
      <FileUploadDialog 
        v-model="uploadDialog" 
        :on-upload="uploadBackup" 
        title="Upload Backup"
        text="Silahkan pilih file backup untuk diupload"
        label="File backup"
        acceptedFiles=".zip"
        :mimeTypes="[
          'application/zip',
        ]"
      />
      <SimpleInputDialog 
        v-model="formDialog" 
        :on-submit="createBackup"
        title="Buat Backup?"
        label="Nama backup"
        noInput="true"
      />
    </template>
  </BaseCrudView>
</template>
<style scoped>
.backup-table{
  background: #00000000;
}
</style>
