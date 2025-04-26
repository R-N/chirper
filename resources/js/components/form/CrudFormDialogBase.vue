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

  reset(){
    super.reset?.();
    this.form?.reset?.();
  }

  async submit(){
    this.resetValidation();
    this.validate();
    if(!this.valid) return;
    
    await this.waitBusy(
      async () => {
        let res = null;
        if (this.data){
          res = await this.client[this.updateFunction](this.data, this.form);
        }else{
          res = await this.client[this.storeFunction](this.form);
        }
        if(this.onSubmit){
          await this.onSubmit(this.client.getData(res) || this.getValue());
        }else{
          this.emitSubmit(this.client.getData(res) || this.getValue());
        }
        this.close();
      }
    );
  }
}
export { CrudFormDialogBase };
export default toNative(CrudFormDialogBase);
</script>
