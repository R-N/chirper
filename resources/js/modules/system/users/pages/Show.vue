<script lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';

import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import UserDetailView from '../views/User.vue';
import ChirpCrudView from '@/modules/chirps/views/Chirps.vue';
import {ViewBase} from '@/views/ViewBase.vue';

@Component({
  components: {
    AppLayout,
    UserDetailView,
    ChirpCrudView
  }
})
class UserPage extends ViewBase {
  @Prop({ type: Object }) item;
  mounted(){
    this.tabStore.breadcrumbs = [
      { title: this.$t('navigation.system') },
      { title: this.$t('navigation.users') },
      { title: "User" },
    ];
  }
}
export default toNative(UserPage);
</script>
 
<template>
  <AppLayout :title="$t('user.title')">
    <VContainer>
      <UserDetailView :item_id="item.id" />
    </VContainer>
    <VContainer>
      <ChirpCrudView :__query="{ 'filter[user.id]' : item.id }" />
    </VContainer>
  </AppLayout>
</template>
