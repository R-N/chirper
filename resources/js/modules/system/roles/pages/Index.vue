<script setup lang="ts">
import { onMounted } from "vue";
import AppLayout from "@/layouts/AppLayout.vue";
import { useViewBase } from "@/composables/useViewBase";
import { t } from "@/plugins/i18n";
import RolesCrudView from "../views/Roles.vue";

const props = defineProps<{
  items?: any;
}>();
const { tabStore } = useViewBase(props);

onMounted(() => {
  tabStore.breadcrumbs = [
    { title: t("navigation.system") },
    { title: t("navigation.roles") },
  ];
});
</script>

<template>
  <AppLayout :title="$t('role.title')">
    <VContainer>
      <RolesCrudView />
    </VContainer>
  </AppLayout>
</template>
