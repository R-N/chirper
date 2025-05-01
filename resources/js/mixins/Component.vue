<script lang="ts">
import { useAppStore } from '@/stores/app';
import { useTabStore } from '@/stores/tab';

import { Vue, Component } from 'vue-facing-decorator'
import { Constructor } from './Constructor.vue';
import { router } from '@inertiajs/vue3';

export const BaseMixin = <TBase extends Constructor>(Base: TBase) => {
  @Component({
    name: "BaseComponent"
  })
  class BaseComponent extends Base {
    appStore = useAppStore();
    tabStore = useTabStore();
    console = console;
    log(x){
      console.log(x);
    }
    get serverReachable(){
      return this.appStore.serverReachable;
    }
    visit(target){
      router.visit(target);
    }
  }
  return BaseComponent;
};
</script>
