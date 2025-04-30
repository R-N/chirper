<script lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';

import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import UserCrudView from '../views/Users.vue';
import { ViewBase } from '@/views/ViewBase.vue';

@Component({
  components: {
    AppLayout,
    UserCrudView
  }
})
class UsersPage extends ViewBase {
  @Prop({ type: [Array, Object], default: null }) items;
  mounted(){
    this.tabStore.breadcrumbs = [
      { title: this.$t('navigation.system') },
      { title: this.$t('navigation.users') },
    ];
  }
}
export default toNative(UsersPage);
</script>
 
<template>
  <AppLayout :title="$t('user.title')">
    <VContainer>
      <UserCrudView />
    </VContainer>
  </AppLayout>
</template>
