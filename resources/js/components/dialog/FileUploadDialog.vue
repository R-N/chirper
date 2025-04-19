<script lang="ts">
import { emptyArray } from '@/libs/util';

import { Component, Prop, Watch, Model, Ref, toNative } from 'vue-facing-decorator';
import { DialogBase } from '@/components/dialog/DialogBase.vue';

let defaultBackendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';


@Component({
    name: "FileUploadDialog",
    components: {
    }
})
class FileUploadDialog extends DialogBase {

  @Prop({ type: Function }) preUpload;
  @Prop({ type: Function }) onUpload;
  @Prop({ type: Function }) postUpload;

  @Prop({ default: "Upload File" }) title;
  @Prop({ default: "Choose backup file to upload" }) text;
  @Prop({ default: "Drop here" }) dropText;
  @Prop({ default: "Browse" }) browseText;
  @Prop({ default: "File" }) label;
  @Prop({ default: true }) dropUpload;

  @Prop({ default: "" }) acceptedFiles;
  @Prop({ default: [] }) mimeTypes;

  file = null
  files = []
  fromDrop = false
  immediateUpload = false;

  @Ref('myFileUpload') myFileUpload;
  
  get interactable(){
    return this.busy || !this.myDialog;
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
  get accept(){
    return `${this.acceptedFiles},${this.mimeTypes.join(',')}`;
  }
  get dropzoneOptions() {
    return {
      url: defaultBackendUrl + "/upload/",
      // params: this.dropzoneParams,
      maxFilesize: 1,
      clickable: false,
      uploadMultiple: false,
      autoProcessQueue: false,
      acceptedFiles: this.acceptedFiles,
      mimeTypes: this.mimeTypes
    }
  }
  
  
  @Watch("files")
  async onFilesChanged(newFiles, oldFiles){
    if (newFiles.length > 0 && this.immediateUpload) {
      this.onFileDropped(newFiles.shift());
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
    this.myFileUpload.removeFile(file);
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
          this.tabStore.showError("File invalid");
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
    <VCard class="pt-3 pb-3 pl-3 pr-3">
      <VForm @submit.prevent.stop="uploadFile">
          <VCardTitle class="headline">{{ title }}</VCardTitle>
          <VCardText>
            <p class="text-left">{{ text }}</p>
            <VFileUpload
              clearable density="compact" variant="compact"
              ref="myFileUpload"
              v-model="files"
              :browse-text="browseText"
              :title="dropText"
              :accept="accept"
              :multiple="true"
              show-size
              @change="onFilesChanged"
            />
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
      </VForm>
    </VCard>
  </VDialog>
</template>
<style scoped>
</style>
