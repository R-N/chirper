<script lang="ts">
import { Component, Prop } from "vue-facing-decorator";
import { deepAssign } from "@/libs/util";
import { Constructor } from "./Constructor.vue";
import { CrudMixin } from "./Crud.vue";

export const CrudFormMixin = <TBase extends Constructor>(Base: TBase) => {
  Base = CrudMixin(Base);
  @Component({
    name: "CrudFormBase",
    components: {}
  })
  class CrudFormBase extends Base {
    @Prop({ default: "update" }) updateFunction;
    @Prop({ default: "store" }) storeFunction;

    async submit() {
      this.validate?.();
      if (!this.valid) return;

      await this.waitBusy(async () => {
        let res = null;
        let data = null;
        if (this.data) {
          res = await this.client[this.updateFunction](
            this.data,
            this.formData
          );
          data = this.client.getData(res);
          if (data) {
            deepAssign(this.data, data);
          }
        } else {
          res = await this.client[this.storeFunction](this.formData);
          data = this.client.getData(res);
        }
        if (this.onSubmit) {
          await this.onSubmit(data || this.getValue());
        } else {
          this.$emit("submit", data || this.getValue());
        }
        this.close();
        return data;
      });
    }
  }
  return CrudFormBase;
};
export default CrudFormMixin;
</script>
