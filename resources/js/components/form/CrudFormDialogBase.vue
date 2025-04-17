<script lang="ts">

import { Component, Prop, Watch, Model, Emit, toNative } from 'vue-facing-decorator';
import { FormDialogBase } from '@/components/form/FormDialogBase.vue';

@Component({
  name: "CrudFormDialogBase",
  components: {
  }
})
class CrudFormDialogBase extends FormDialogBase {
  @Prop({ default: "update" }) updateFunction;
  @Prop({ default: "store" }) storeFunction;

  get client(){
    return null;
  }

  _reset(){
    this.form.reset();
  }

  async _submit(){
    if(!this.valid) return;
    const view = this;
    view.busy = true;
    try{
      let res = null;
      if (view.data){
        res = await view.client[view.updateFunction](view.data, view.form);
      }else{
        res = await view.client[view.storeFunction](view.form);
      }
      if(view.onSubmit){
        await view.onSubmit(view.client.getData(res) || view.getValue());
      }else{
        view.emitSubmit(view.client.getData(res) || view.getValue());
      }
      view.close();
    } finally {
      view.busy = false;
    }
  }
}
export { CrudFormDialogBase };
export default toNative(CrudFormDialogBase);
</script>
