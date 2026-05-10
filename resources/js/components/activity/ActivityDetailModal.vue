<script setup lang="ts">
import { computed } from "vue";
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VBtn, VDivider, VChip } from "vuetify/components";
import ActivityEventBadge from "./ActivityEventBadge.vue";
import JsonDiffView from "./JsonDiffView.vue";
import { t } from "@/plugins/i18n";

const props = defineProps<{
  modelValue?: boolean;
  item?: Record<string, any> | null;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const show = computed({
  get: () => props.modelValue ?? false,
  set: (v) => emit("update:modelValue", v),
});

const item = computed(() => props.item ?? {});

const createdAt = computed(() => {
  const d = item.value.created_at;
  return d ? new Date(d).toLocaleString() : "-";
});

const hasChangedAttributes = computed(() => {
  const props_ = item.value.properties ?? {};
  const attrs = props_.attributes ?? {};
  return Object.keys(attrs).length > 0;
});

const hasOldValues = computed(() => {
  const props_ = item.value.properties ?? {};
  const old = props_.old ?? {};
  return Object.keys(old).length > 0;
});
</script>
<template>
  <VDialog v-model="show" max-width="700px">
    <VCard :title="$t('activity.detail') + ' #' + item.id">
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

        <template v-if="hasChangedAttributes || hasOldValues">
          <VDivider class="my-4" />
          <JsonDiffView :properties="item.properties" />
        </template>
      </VCardText>
      <VCardActions>
        <VBtn @click="show = false">{{ $t("form.close") }}</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
