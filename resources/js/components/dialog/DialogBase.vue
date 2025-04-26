
<script lang="ts">

import { Component, Prop, Watch, Model, Emit, Ref, toNative } from 'vue-facing-decorator';
import { FormBase } from '@/components/form/FormBase.vue';

let modelEvent = "update:modelValue"

@Component({
    name: "DialogBase",
    components: {
    },
    emits: [modelEvent, "show"]
})
class DialogBase extends FormBase {
    // @Model({ type: [Boolean, String, Object, Array] }) myDialog;
    @Prop({ type: [Boolean, String, Object, Array] }) modelValue;
    @Prop({ type: Function }) onShow;

    @Watch("modelValue")
    modelWatcher(newValue, oldValue){
      if (newValue){
        if (this.onShow){
            this.onShow();
        }else{
            this.emitShow();
        }
      }
    }

    @Emit("show")
    emitShow(){
        return true;
    }

    get myDialog(){
        return this.modelValue;
    }
    set myDialog(value){
        if(value == this.modelValue) return;
        this.reset();
        this.busy = false;
        this.emitChange(value);
        this.emitModel(value);
    }
    @Emit(modelEvent)
    emitModel(value=null){
        return value;
    }

    async close(){
        if(this.onCancel){
            await this.waitBusy(
                async () => await this.onCancel(this.myDialog, this.releaseBusy),
                // null, this.releaseBusy
            );
        }else{
            // this.emitCancel({ value: this.myDialog, releaseBusy: this.releaseBusy });
            this.$emit("cancel", this.myDialog, this.releaseBusy);
        }
        if (typeof this.myDialog == "boolean" || this.myDialog instanceof Boolean){
            this.myDialog = false;
        }else if (typeof this.myDialog == "string" || this.myDialog instanceof String){
            this.myDialog = '';
        }else if (this.myDialog instanceof Object){
            this.myDialog = null;
        }else if (this.myDialog instanceof Array){
            this.myDialog.pop();
            this.myDialog = this.myDialog;
        }else{
            console.log(this.myDialog);
        }
        if (this.reset)
            this.reset();
        this.busy = false;
    }

    get interactable(){
        return !this.disabled && !this.busy;
    }
}
export { DialogBase };
export default toNative(DialogBase);
</script>
