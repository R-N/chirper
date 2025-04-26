<script lang="ts">
import { emptyArray } from '@/libs/util';

import { Component, Prop, Watch, Model, Ref, toNative, Setup } from 'vue-facing-decorator';
import { DialogBase } from '@/components/dialog/DialogBase.vue';

let defaultBackendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
import { useForm } from '@inertiajs/vue3';


@Component({
    name: "FileUploadDialog",
    components: {
    }
})
class FileUploadDialog extends DialogBase {

  @Prop({ type: Function }) preUpload;
  @Prop({ type: Function }) onUpload;
  @Prop({ type: Function }) postUpload;

  @Prop({ type: String }) title;
  @Prop({ type: String }) text;
  @Prop({ type: String, default: "file" }) name;
  @Prop({ type: String }) dropText;
  @Prop({ type: String }) browseText;
  @Prop({ default: true }) dropUpload;

  @Prop({ default: "" }) acceptedFiles;
  @Prop({ default: [] }) mimeTypes;
  @Prop({ default: null }) errorMessages;
  @Setup((props, ctx) => {
      if (props.name){
          return useForm({
              [props.name]: null,
          });
      }else{
          return useForm({
              value: null,
          });
      }
  }) form;
  // @Prop({ default: true }) emitForm;

  file = null
  files = []
  fromDrop = false
  immediateUpload = false;

  @Ref('myFileUpload') myFileUpload;
  
  get interactable(){
    return this.busy || !this.myDialog;
  }

  reset(){
    super.reset?.();
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
    this.form.clearErrors();
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
      if (error?.response?.data?.errors){
        this.form.setError(error.response.data.errors);
      }
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
          <VCardTitle class="headline">{{ title ?? $t('form.upload_title') }}</VCardTitle>
          <VCardText>
            <p class="text-left">{{ text ?? $t('form.upload_desc') }}</p>
            <VFileUpload
              clearable density="compact" variant="compact"
              ref="myFileUpload"
              v-model="files"
              :browse-text="browseText ?? $t('form.browse')"
              :title="dropText ?? $t('form.drop_here')"
              :accept="accept"
              :multiple="true"
              show-size
              @change="onFilesChanged"
              :error-messages="errorMessages || form?.errors?.[name]"
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
