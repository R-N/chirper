<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import ChirpCrudView from "../views/Chirps.vue";
import { useViewBase } from "@/composables/useViewBase";
import { t } from "@/plugins/i18n";
import { onMounted } from "vue";

const props = defineProps<{
  items?: any;
}>();
const { tabStore } = useViewBase(props);

onMounted(() => {
  tabStore.breadcrumbs = [{ title: t("navigation.chirps") }];
});
</script>

<template>
  <AppLayout :title="$t('chirp.title')">
    <VContainer>
      <ChirpCrudView />
    </VContainer>
  </AppLayout>
</template>
