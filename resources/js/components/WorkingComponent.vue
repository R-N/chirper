<script lang="ts">
import { Component, toNative } from 'vue-facing-decorator'
import { MyComponent } from '@/components/MyComponent.vue';
import { WorkingMixin } from '@/mixins/Working.vue';

const BaseClass = WorkingMixin(MyComponent);

@Component({
    name: "WorkingComponent"
})
class WorkingComponent extends BaseClass {

}
export { WorkingComponent };
export default toNative(WorkingComponent);
</script>
