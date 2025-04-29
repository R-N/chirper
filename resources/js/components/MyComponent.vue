<script lang="ts">
import { Vue, Component, toNative } from 'vue-facing-decorator';
import { BaseMixin } from '@/mixins/Component.vue';
import { AuthMixin } from '@/mixins/Auth.vue';

const BaseClass = AuthMixin(BaseMixin(Vue));

@Component({
  name: "MyComponent"
})
class MyComponent extends BaseClass {
  
}
export { MyComponent };
export default toNative(MyComponent);
</script>
