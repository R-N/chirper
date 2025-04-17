<script lang="ts">

import { Component, Prop, Watch, Model, Emit, toNative } from 'vue-facing-decorator';
import { DialogBase } from '@/components/dialog/DialogBase.vue';

@Component({
  name: "FormDialogBase",
  components: {
  }
})
class FormDialogBase extends DialogBase {
  @Watch("modelValue")
  dataWatcher(newValue, oldValue){
    if (newValue){
      this.prepopulate();
    }
  }
}
export { FormDialogBase };
export default toNative(FormDialogBase);
</script>
