<script lang="ts">

import { Component, Prop, Watch, Model, Emit, toNative } from 'vue-facing-decorator';
import { WorkingComponent } from '../WorkingComponent.vue';

import { FormMixin } from '@/mixins/Form.vue';
import { DialogMixin } from '@/mixins/Dialog.vue';

const BaseClass = DialogMixin(FormMixin(WorkingComponent));

@Component({
  name: "FormDialogBase",
  components: {
  }
})
class FormDialogBase extends BaseClass {
  
}
export { FormDialogBase };
export default toNative(FormDialogBase);
</script>
