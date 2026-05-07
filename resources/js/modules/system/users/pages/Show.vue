<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import UserDetailView from "../views/User.vue";
import ChirpCrudView from "@/modules/chirps/views/Chirps.vue";
import { useViewBase } from "@/composables/useViewBase";
import { t } from "@/plugins/i18n";
import { onMounted } from "vue";

const props = defineProps<{
  item: any;
}>();
const { tabStore } = useViewBase(props);

onMounted(() => {
  tabStore.breadcrumbs = [
    { title: t("navigation.system") },
    { title: t("navigation.users") },
    { title: "User" }
  ];
});
</script>

<template>
  <AppLayout :title="$t('user.title')">
    <VContainer>
      <UserDetailView :item_id="item.id" />
    </VContainer>
    <VContainer>
      <ChirpCrudView :__query="{ 'filter[user.id]': item.id }" />
    </VContainer>
  </AppLayout>
</template>
