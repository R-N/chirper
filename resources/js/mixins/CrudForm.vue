<script lang="ts">

import { Component, Prop } from 'vue-facing-decorator';
import { deepAssign } from '@/libs/util';
import { Constructor } from './Constructor.vue';

export const CrudFormMixin = <TBase extends Constructor>(Base: TBase) => {
  @Component({
    name: "CrudFormBase",
    components: {
    }
  })
  class CrudFormBase extends Base {
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
            const data = this.client.getData(res);
            if (data){
              deepAssign(this.data, data);
            }
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
  };
  return CrudFormBase;
}
</script>
