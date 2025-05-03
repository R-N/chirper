<script lang="ts">
import { useAppStore } from "@/stores/app";
import { Vue, Component, Prop, toNative } from "vue-facing-decorator";
import { MyComponent } from "@/components/MyComponent.vue";
import authService from "@/modules/user/auth/services/auth";

import { Constructor } from "./Constructor.vue";

export const WorkingMixin = <TBase extends Constructor>(Base: TBase) => {
  @Component({
    name: "WorkingComponent"
  })
  class WorkingComponent extends MyComponent {
    @Prop({ default: false }) parentBusy;
    selfBusy = false;

    get busy() {
      return (
        this.selfBusy ||
        this.parentBusy ||
        this.tabStore.routerBusy ||
        this.tabStore.tabBusy ||
        this.appStore.authBusy ||
        this.appStore.globalBusy
      );
    }

    set busy(busy) {
      this.selfBusy = busy;
    }

    releaseBusy(busy) {
      this.busy = false;
    }

    get globalBusy() {
      return this.appStore.globalBusy;
    }

    set globalBusy(busy) {
      this.appStore.globalBusy = busy;
    }

    get authBusy() {
      return this.appStore.authBusy;
    }

    set authBusy(busy) {
      this.appStore.authBusy = busy;
    }

    get tabBusy() {
      return this.tabStore.tabBusy;
    }

    set tabBusy(busy) {
      this.tabStore.tabBusy = busy;
    }
    showError(error) {
      this.tabStore.showError(error);
      // throw error;
    }
    async waitBusy(f, busy = "busy", releaseBusy = true) {
      const view = this;
      busy = busy || "busy";
      view[busy] = true;
      try {
        return await f();
      } catch (e) {
        if (e?.message?.toLowerCase().includes("csrf")) {
          await authService.getCsrfToken();
        } else {
          throw e;
          view.showError(e);
        }
      } finally {
        if (releaseBusy) view[busy] = false;
      }
    }
  }
  return WorkingComponent;
};
export default WorkingMixin;
</script>
