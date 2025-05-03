<script lang="ts">
import { Component, toNative } from "vue-facing-decorator";
import { WorkingComponent } from "@/components/WorkingComponent.vue";
import { ClearBreadcrumbsMixin } from "@/mixins/ClearBreadcrumbs.vue";

const BaseClass = ClearBreadcrumbsMixin(WorkingComponent);

@Component({
  name: "ViewBase"
})
class ViewBase extends BaseClass {}

export { ViewBase };
export default toNative(ViewBase);
</script>
