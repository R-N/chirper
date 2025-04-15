<script lang="ts">
import vueDropzone from 'vue3-dropzone';

import { emptyArray } from '@/libs/util';

import { Component, Prop, Watch, Model, Ref, toNative } from 'vue-facing-decorator';
import { DialogBase } from '@/components/dialog/DialogBase.vue';

let defaultBackendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

@Component({
    name: "FileUploadDialog",
    components: {
      vueDropzone
    }
})
class FileUploadDialog extends DialogBase {
  @Prop({ type: Function }) preUpload;
  @Prop({ type: Function }) onUpload;
  @Prop({ type: Function }) postUpload;

  @Prop({ default: "Upload File" }) title;
  @Prop({ default: "Silahkan pilih file untuk diupload" }) text;
  @Prop({ default: "File" }) label;
  @Prop({ default: true }) dropUpload;

  file = null
  files = []
  fromDrop = false
  immediateUpload = false;

  @Ref('myDialogDropzone') myDialogDropzone;

  get interactable(){
    return this.busy || !this.dialog;
  }

  reset(){
    this.file = null;
    emptyArray(this.files);
  }
  async close(){
    if (typeof this.myDialog == "boolean" || this.myDialog instanceof Boolean){
      this.myDialog = false;
    }else if (typeof this.myDialog == "string" || this.myDialog instanceof String){
      this.myDialog = '';
    }else if (this.myDialog instanceof Object){
      this.myDialog = null;
    }else if (this.myDialog instanceof Array){
      this.myDialog.pop();
    }
  }

  get dropzoneOptions() {
    return {
      url: defaultBackendUrl + "/upload/",
      params: this.dropzoneParams,
      maxFilesize: 1,
      clickable: false,
      uploadMultiple: false,
      autoProcessQueue: false,
      acceptedFiles: ".xlsx",
      mimeTypes: ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    }
  }
  dropzoneParams(files, xhr, chunk=null){
    return {
      "upload_token": "asdasd"
    }
  }
  onFileDropped(file){    
    if(!this.file)
      this.file = file;
    else
      this.files.push(file);
    this.fromDrop = true;
  }
  onDialogFileDropped(file){
    this.myDialogDropzone.removeFile(file);
    this.immediateUpload = this.dropUpload;
    this.onFileDropped(file);
  }
  @Watch("file")
  async onFileChanged(file, old){
    if(this.fromDrop){
      if(file){
        if (!file.accepted){
          if (this.files.length == 0){
            this.fromDrop = false;
            this.file = old;
          }else{
            this.file = this.files.shift();
          }
          this.appStore.showError("File invalid");
        }else if (this.immediateUpload){
          await this.uploadFile();
          this.immediateUpload = false;
        }
      }
    }
  }

  async uploadFile(){
    const comp = this;
    comp.busy=true;
    if (comp.preUpload) comp.preUpload();
    try{
      if(!comp.file && comp.files.length) comp.file = comp.files.shift();
      while(comp.file || comp.files.length){
        await comp.onUpload(comp.file);
        if (comp.files.length){
          comp.file = comp.files.shift();
        }else{
          comp.file = null;
        }
      }
      comp.close();
    } catch (error) {
      comp.files.unshift(comp.file);
      comp.file = null;
      // if (stores.helper.error.showFilteredError(error, [TFileError, TUploadError])) return;
      throw error;
    } finally {
      if (comp.postUpload) comp.postUpload();
      comp.busy = false;
    }
  }
}
export { FileUploadDialog };
export default toNative(FileUploadDialog);
</script>
<template>
  <VDialog
    v-model="myDialog"
    max-width="290"
    :persistent="busy"
  >
    <VCard>
      <VForm @submit.prevent.stop="uploadFile">
        <VueDropzone ref="myDialogDropzone" id="dropzone" :options="dropzoneOptions" useCustomSlot @vdropzone-file-added="onDialogFileDropped" class="text-left">
          <VCardTitle class="headline">{{ title }}</VCardTitle>
          <VCardText>
            <p class="text-left">{{ text }}</p>
              <v-file-input multiple ref="myFileInput" :label="label" v-model="files" @click.stop="" accept=".xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" show-size></v-file-input>
          </VCardText>
          <VCardActions>
            <VSpacer></VSpacer>
            <VBtn
              color="green darken-1"
              text
              @click.stop="close()"
              :disabled="interactable"
            >
              Batal
            </VBtn>
            <VBtn
              color="green darken-1"
              text
              type="submit"
              :disabled="interactable"
              :loading="busy"
            >
              Upload
            </VBtn>
          </VCardActions>
        </VueDropzone>
      </VForm>
    </VCard>
  </VDialog>
</template>
<style scoped>
</style>
