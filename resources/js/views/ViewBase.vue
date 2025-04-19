<script lang="ts">
import { Component, toNative } from 'vue-facing-decorator';
import { WorkingComponent } from '@/components/WorkingComponent.vue';

@Component({
  name: "ViewBase"
})
class ViewBase extends WorkingComponent {
  created(){
    this.tabStore.breadcrumbs = [];
  }
}

export { ViewBase };
export default toNative(ViewBase);
</script>