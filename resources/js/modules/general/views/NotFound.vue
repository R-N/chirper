<script lang="ts">
import { Component, Prop, toNative } from 'vue-facing-decorator';
import { BaseView } from '@/views/BaseView.vue';

import CenterLayout from '@/components/layout/CenterLayout.vue';

@Component({
    name: "NotFoundView",
    components:{
      CenterLayout
    },
  // beforeRouteLeave: function (to, from, next) {
  //   // stores.app.setRouteValid(true);
  //   next();
  // },
  // beforeRouteEnter: function (to, from, next) {
  //   // stores.app.setRouteValid(false);
  //   next();
  // }
})
class NotFoundView extends BaseView {

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
