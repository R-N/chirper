<script lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';

import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import { UserCrudView } from '../views/Users.vue';
import {BaseView} from '@/views/BaseView.vue';

@Component({
  components: {
    AppLayout,
    UserCrudView
  }
})
class UsersPage extends BaseView {
  mounted(){
    this.appStore.breadcrumbs = [
      { title: "System" },
      { title: "Users" },
    ];
  }
}
export default toNative(UsersPage);
</script>
 
<template>
  <AppLayout title="Users">
    <VContainer>
      <UserCrudView />
    </VContainer>
  </AppLayout>
</template>
