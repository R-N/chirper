<script lang="ts">
import { Component, Prop, toNative } from 'vue-facing-decorator';
import { BaseView } from '@/views/BaseView.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import NotFoundView from '../views/NotFound.vue';

@Component({
    name: "NotFoundPage",
    components:{
      AppLayout,
      NotFoundView
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
class NotFoundPage extends BaseView {

}
export { NotFoundPage } ;
export default toNative(NotFoundPage);
</script>
<template>
  <AppLayout title="Dashboard">
      <template #header>
          <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Not Found
          </h2>
      </template>
      <NotFoundView />
  </AppLayout>
</template>
<style scoped>

</style>
