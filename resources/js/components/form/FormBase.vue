<script lang="ts">
import { Vue, Component, toNative } from 'vue-facing-decorator';
import { WorkingComponent } from '@/components/WorkingComponent.vue';

import { FormMixin } from '@/mixins/Form.vue';

const BaseClass = FormMixin(WorkingComponent);

@Component({
    name: "FormBase",
    components: {
    },
    emits: ['cancel', 'reset', 'change', 'validate', 'submit']
})
class FormBase extends BaseClass {
  
}
export { FormBase };
export default toNative(FormBase);
</script>
