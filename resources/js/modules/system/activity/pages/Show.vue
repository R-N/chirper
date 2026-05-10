<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useViewBase } from "@/composables/useViewBase";
import { t } from "@/plugins/i18n";
import { onMounted, computed } from "vue";
import { VCard, VCardTitle, VCardText, VChip } from "vuetify/components";
import JsonDiffView from "@/components/activity/JsonDiffView.vue";
import ActivityEventBadge from "@/components/activity/ActivityEventBadge.vue";

const props = defineProps<{
  item?: any;
}>();

const { tabStore } = useViewBase(props);

onMounted(() => {
  tabStore.breadcrumbs = [
    { title: t("navigation.system") },
    { title: t("navigation.activity_log"), href: route("system.activity.index") },
    { title: `#${props.item?.id}` },
  ];
});

const item = computed(() => props.item ?? {});
const createdAt = computed(() => {
  const d = item.value.created_at;
  return d ? new Date(d).toLocaleString() : "-";
});
</script>

<template>
  <AppLayout :title="$t('activity.detail')">
    <VContainer>
      <VCard>
        <VCardTitle>
          {{ $t("activity.detail") }} #{{ item.id }}
        </VCardTitle>
        <VCardText>
          <div class="d-flex flex-column ga-3">
            <div class="d-flex ga-3 align-center">
              <span class="font-weight-bold">{{ $t("activity.event") }}:</span>
              <ActivityEventBadge :value="item.description" />
            </div>
            <div class="d-flex ga-3 align-center">
              <span class="font-weight-bold">{{ $t("activity.causer") }}:</span>
              <span>{{ item.causer_name ?? "-" }}</span>
            </div>
            <div class="d-flex ga-3 align-center">
              <span class="font-weight-bold">{{ $t("activity.subject") }}:</span>
              <span>{{ item.subject_label ?? "-" }}</span>
            </div>
            <div class="d-flex ga-3 align-center">
              <span class="font-weight-bold">{{ $t("activity.when") }}:</span>
              <span>{{ createdAt }}</span>
            </div>
            <div class="d-flex ga-3 align-center">
              <span class="font-weight-bold">Log:</span>
              <VChip size="small">{{ item.log_name }}</VChip>
            </div>
          </div>

          <VDivider class="my-4" />

          <JsonDiffView :properties="item.properties" />
        </VCardText>
      </VCard>
    </VContainer>
  </AppLayout>
</template>
