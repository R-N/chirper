<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useViewBase } from "@/composables/useViewBase";
import { t } from "@/plugins/i18n";
import { onMounted } from "vue";
import ActivityCrudView from "../views/Activity.vue";

const props = defineProps<{
  items?: any;
}>();

const { tabStore } = useViewBase(props);

onMounted(() => {
  tabStore.breadcrumbs = [
    { title: t("navigation.system") },
    { title: t("navigation.activity_log") },
  ];
});
</script>

<template>
  <AppLayout :title="$t('activity.title')">
    <VContainer>
      <ActivityCrudView />
    </VContainer>
  </AppLayout>
</template>
