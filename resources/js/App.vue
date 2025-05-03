<script lang="ts">
import { VApp } from "vuetify/components";

import { Component, Prop, toNative } from "vue-facing-decorator";
import { ViewBase } from "@/views/ViewBase.vue";

@Component({
  name: "App",
  components: {
    //'LoginView': () => import('./views/LoginView.vue'),
  }
})
class App extends ViewBase {
  @Prop(Object) InertiaApp;
  @Prop(Object) props;
}
export { App };
export default toNative(App);
</script>
<template>
  <component :is="InertiaApp" v-bind="props" />
</template>
