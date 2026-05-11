<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { VCard, VCardTitle, VCardText, VChip, VDivider } from "vuetify/components";
import JsonDiffView from "@/components/activity/JsonDiffView.vue";
import ActivityEventBadge from "@/components/activity/ActivityEventBadge.vue";
import activityService from "@/services/activity";

const route = useRoute();
const item = ref<any>({});
const loading = ref(true);

onMounted(async () => {
  try {
    const id = route.params.id;
    const res = await activityService.get(String(id));
    item.value = res.data?.data ?? res.data ?? res;
  } catch (e) {
    console.error("Failed to load activity:", e);
  } finally {
    loading.value = false;
  }
});

const createdAt = computed(() => {
  const d = item.value.created_at;
  return d ? new Date(d).toLocaleString() : "-";
});
</script>

<template>
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
</template>
