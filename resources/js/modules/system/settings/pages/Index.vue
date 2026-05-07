<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import SettingCrudView from "../views/Settings.vue";
import { useViewBase } from "@/composables/useViewBase";
import { t } from "@/plugins/i18n";
import { onMounted } from "vue";

const props = defineProps<{
  items?: any;
  setting_types?: any[];
}>();
const { tabStore } = useViewBase(props);

onMounted(() => {
  tabStore.breadcrumbs = [
    { title: t("navigation.system") },
    { title: t("navigation.settings") }
  ];
});
</script>

<template>
  <AppLayout :title="$t('settings.title')">
    <VContainer>
      <SettingCrudView :setting-types="setting_types" />
    </VContainer>
  </AppLayout>
</template>
