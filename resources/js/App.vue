<script lang="ts">

import { VApp } from 'vuetify/components'; 

import { Component, Prop, toNative } from 'vue-facing-decorator';
import { BaseView } from '@/views/BaseView.vue';

@Component({
    name: "App",
    components: {
        //'LoginView': () => import('./views/LoginView.vue'),
    }
})
class App extends BaseView{
    @Prop(Object) InertiaApp;
    @Prop(Object) props;
}
export { App }
export default toNative(App);
</script>
<template>
  <component :is="InertiaApp" v-bind="props" />
</template>
