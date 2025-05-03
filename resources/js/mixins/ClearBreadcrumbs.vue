<script lang="ts">
import { Vue, Component } from "vue-facing-decorator";
import { Constructor } from "./Constructor.vue";

export const ClearBreadcrumbsMixin = <TBase extends Constructor>(
  Base: TBase
) => {
  @Component({})
  class ClearBreadcrumbs extends Base {
    created() {
      super.created?.();
      this.clearBreadcrumbs();
    }
    clearBreadcrumbs() {
      this.tabStore.breadcrumbs = [];
    }
  }
  return ClearBreadcrumbs;
};
export default ClearBreadcrumbsMixin;
</script>
