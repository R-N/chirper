<script lang="ts">
import { Component, Prop, toNative } from 'vue-facing-decorator';
import { ViewBase } from '@/views/ViewBase.vue';
import { Inertia } from '@inertiajs/inertia';
import CenterLayout from '@/components/layout/CenterLayout.vue';

@Component({
    name: "NotFoundView",
    components:{
      CenterLayout
    },
})
class NotFoundView extends ViewBase {

}
export { NotFoundView } ;
export default toNative(NotFoundView);
</script>
<template>
  <CenterLayout>
    <h1>404 Not Found: {{ this.$route.params.pathMatch }}</h1>
  </CenterLayout>
</template>
<style scoped>

</style>
