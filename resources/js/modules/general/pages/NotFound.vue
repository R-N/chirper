<script lang="ts">
import { Component, Prop, toNative } from "vue-facing-decorator";
import { ViewBase } from "@/views/ViewBase.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import NotFoundView from "../views/NotFound.vue";

@Component({
  name: "NotFoundPage",
  components: {
    AppLayout,
    NotFoundView
  }
})
class NotFoundPage extends ViewBase {}
export { NotFoundPage };
export default toNative(NotFoundPage);
</script>
<template>
  <AppLayout title="Dashboard">
    <template #header>
      <h2
        class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
      >
        {{ $t("navigation.not_found") }}
      </h2>
    </template>
    <NotFoundView />
  </AppLayout>
</template>
<style scoped></style>
