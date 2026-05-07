<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import UserCrudView from "../views/Users.vue";
import { useViewBase } from "@/composables/useViewBase";
import { t } from "@/plugins/i18n";
import { onMounted } from "vue";

const props = defineProps<{
  items?: any;
}>();
const { tabStore } = useViewBase(props);

onMounted(() => {
  tabStore.breadcrumbs = [
    { title: t("navigation.system") },
    { title: t("navigation.users") }
  ];
});
</script>

<template>
  <AppLayout :title="$t('user.title')">
    <VContainer>
      <UserCrudView />
    </VContainer>
  </AppLayout>
</template>
