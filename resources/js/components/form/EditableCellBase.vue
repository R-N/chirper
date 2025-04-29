<script lang="ts">
import { Vue, Component, toNative } from 'vue-facing-decorator';
import EditableCell from '@/components/form/EditableCell.vue';
import {WorkingComponent} from '@/components/WorkingComponent.vue';

import { EditableCellMixin } from '@/mixins/EditableCell.vue';

const BaseClass = EditableCellMixin(WorkingComponent);

@Component({
    name: "EditableCellBase",
    components: {
        EditableCell
    }
})
class EditableCellBase extends BaseClass {
    
}
export { EditableCellBase } 
export default toNative(EditableCellBase);
</script>
