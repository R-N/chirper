<script lang="ts">
import { Component, toNative } from "vue-facing-decorator";

import { WorkingComponent } from "../WorkingComponent.vue";
import { FormMixin } from "@/mixins/Form.vue";
import { DialogMixin } from "@/mixins/Dialog.vue";
import { CrudFormMixin } from "@/mixins/CrudForm.vue";

const BaseClass = CrudFormMixin(DialogMixin(FormMixin(WorkingComponent)));

@Component({
  name: "CrudFormDialogBase",
  components: {}
})
class CrudFormDialogBase extends BaseClass {}
export { CrudFormDialogBase };
export default toNative(CrudFormDialogBase);
</script>
