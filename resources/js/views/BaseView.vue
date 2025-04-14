<script lang="ts">
import { Component, toNative } from 'vue-facing-decorator';
import { WorkingComponent } from '@/components/WorkingComponent.vue';

@Component({
  name: "BaseView"
})
class BaseView extends WorkingComponent {

}

export { BaseView };
export default toNative(BaseView);
</script>