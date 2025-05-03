<script lang="ts">
import { Vue, Component, toNative } from "vue-facing-decorator";
import { ViewBase } from "@/views/ViewBase.vue";

import { CrudViewMixin } from "@/mixins/CrudView.vue";

const BaseClass = CrudViewMixin(ViewBase);

@Component({
  name: "CrudViewBase",
  components: {},
  emits: ["update:items"]
})
class CrudViewBase extends BaseClass {}
export { CrudViewBase };
export default toNative(CrudViewBase);
</script>
