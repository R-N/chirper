<script lang="ts">
import { Component, Prop, toNative } from "vue-facing-decorator";
import { ViewBase } from "@/views/ViewBase.vue";
import CenterLayout from "@/components/layout/CenterLayout.vue";

@Component({
  name: "NotFoundView",
  components: {
    CenterLayout
  }
})
class NotFoundView extends ViewBase {}
export { NotFoundView };
export default toNative(NotFoundView);
</script>
<template>
  <CenterLayout>
    <h1>
      404 {{ $t("navigation.not_found") }}: {{ this.$route.params.pathMatch }}
    </h1>
  </CenterLayout>
</template>
<style scoped></style>
