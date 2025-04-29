
<script lang="ts">

import { Component, Prop, Watch, Model, Emit, Ref, toNative } from 'vue-facing-decorator';
import { FormBase } from '@/components/form/FormBase.vue';
import { DialogMixin } from '@/mixins/Dialog.vue';

let modelEvent = "update:modelValue"

const BaseClass = DialogMixin(FormBase);

@Component({
    name: "DialogBase",
    components: {
    },
    emits: [modelEvent, "show"]
})
class DialogBase extends BaseClass {
    
}
export { DialogBase };
export default toNative(DialogBase);
</script>
