<script lang="ts">

import { Component, toNative } from 'vue-facing-decorator';

import { WorkingComponent } from '../WorkingComponent.vue';
import { FormMixin } from '@/mixins/Form.vue';
import { CrudFormMixin } from '@/mixins/CrudForm.vue';

const BaseClass = CrudFormMixin(FormMixin(WorkingComponent));

@Component({
  name: "CrudFormBase",
  components: {
  }
})
class CrudFormBase extends BaseClass {

}
export { CrudFormBase };
export default toNative(CrudFormBase);
</script>
