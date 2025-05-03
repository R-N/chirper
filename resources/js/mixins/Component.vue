<script lang="ts">
import { useAppStore } from "@/stores/app";
import { useTabStore } from "@/stores/tab";

import { Vue, Component, Prop } from "vue-facing-decorator";
import { Constructor } from "./Constructor.vue";
import { router, usePage } from "@inertiajs/vue3";

export const BaseMixin = <TBase extends Constructor>(Base: TBase) => {
  @Component({
    name: "BaseComponent"
  })
  class BaseComponent extends Base {
    appStore = useAppStore();
    tabStore = useTabStore();
    console = console;
    log(x) {
      console.log(x);
    }
    get serverReachable() {
      return this.appStore.serverReachable;
    }
    visit(target) {
      router.visit(target);
    }
    get settings() {
      return usePage().props?.settings ?? this.$page?.props?.settings;
    }
    get user() {
      return usePage().props?.user ?? this.$page?.props?.user;
    }
    get auth_token() {
      return usePage().props?.auth_token ?? this.$page?.props?.auth_token;
    }

    created() {
      super.created?.();
      if (this.settings) {
        this.appStore.settings = this.settings;
      }
    }
  }
  return BaseComponent;
};
export default BaseMixin;
</script>
