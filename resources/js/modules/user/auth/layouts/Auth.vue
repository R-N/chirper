<script lang="ts">
import AuthenticationCardLogo from "@/components/auth/AuthenticationCardLogo.vue";
import { Component, Prop, toNative } from "vue-facing-decorator";
import { ViewBase } from "@/views/ViewBase.vue";

import CenterLayout from "@/components/layout/CenterLayout.vue";

@Component({
  name: "AuthLayout",
  components: {
    AuthenticationCardLogo,
    CenterLayout
  }
})
class AuthLayout extends ViewBase {}
export { AuthLayout };
export default toNative(AuthLayout);
</script>
<template>
  <CenterLayout :column="true">
    <AuthenticationCardLogo justify="center" align="center" class="mb-4" />
    <slot></slot>
  </CenterLayout>
</template>
<style scoped></style>
