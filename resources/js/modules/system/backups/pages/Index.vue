<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import BackupView from "../views/Backups.vue";
import { useViewBase } from "@/composables/useViewBase";
import { t } from "@/plugins/i18n";
import { onMounted } from "vue";

const props = defineProps<{
  items?: any;
}>();
const { tabStore } = useViewBase(props);

onMounted(async () => {
  tabStore.breadcrumbs = [
    { title: t("navigation.system") },
    { title: t("navigation.backup") }
  ];
});
</script>

<template>
  <AppLayout :title="$t('backup.title')">
    <VContainer>
      <BackupView />
    </VContainer>
  </AppLayout>
</template>
