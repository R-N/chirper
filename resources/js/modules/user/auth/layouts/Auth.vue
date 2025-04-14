
<script lang="ts">
import AuthenticationCardLogo from '@/components/auth/AuthenticationCardLogo.vue';
import { Component, Prop, toNative } from 'vue-facing-decorator';
import { BaseView } from '@/views/BaseView.vue';

import CenterLayout from '@/components/layout/CenterLayout.vue';

@Component({
  name: "AuthLayout",
  // beforeRouteEnter: authRouter.routeRequireLogoutDialog,
  components: {
    AuthenticationCardLogo,
    CenterLayout,
  }
})
class AuthLayout extends BaseView {
}
export { AuthLayout };
export default toNative(AuthLayout);
</script>
<template>
  <CenterLayout :column="true">
    <AuthenticationCardLogo justify="center" align="center" class="mb-4" />
    <slot></slot>
  </CenterLayout>
</template>
<style scoped>

</style>
