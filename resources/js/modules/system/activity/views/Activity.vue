<script setup lang="ts">
import { computed, ref } from "vue";
import DeclarativeCrudView from "@/views/DeclarativeCrudView.vue";
import IconButton from "@/components/button/IconButton.vue";
import ActivityEventBadge from "@/components/activity/ActivityEventBadge.vue";
import ActivityDetailModal from "@/components/activity/ActivityDetailModal.vue";
import activityService from "@/services/activity";
import { t } from "@/plugins/i18n";

const client = activityService;
const nameField = "description";

const detailOpen = ref(false);
const detailItem = ref<any>(null);

const title = computed(() => t("activity.title"));

const fields = computed(() => [
  {
    type: "text",
    name: "id",
    value: "id",
    title: "ID",
    table: true,
    editable: false,
    form: false,
  },
  {
    type: "text",
    name: "causer_name",
    value: "causer_name",
    title: t("activity.causer"),
    table: true,
    editable: false,
    form: false,
  },
  {
    component: ActivityEventBadge,
    name: "description",
    value: "description",
    title: t("activity.event"),
    table: true,
    editable: false,
    form: false,
  },
  {
    type: "text",
    name: "subject_label",
    value: "subject_label",
    title: t("activity.subject"),
    table: true,
    editable: false,
    form: false,
  },
  {
    type: "datetime",
    name: "created_at",
    value: "created_at",
    title: t("activity.when"),
    table: true,
    editable: false,
    form: false,
  },
]);

function showDetail(item: any) {
  detailItem.value = item;
  detailOpen.value = true;
}

const filterFields = [
  {
    name: "description",
    label: t("activity.event"),
    values: [
      { title: "Created", value: "created" },
      { title: "Updated", value: "updated" },
      { title: "Deleted", value: "deleted" },
      { title: "Backup Created", value: "backup_created" },
      { title: "Backup Deleted", value: "backup_deleted" },
      { title: "Backup Restored", value: "backup_restored" },
      { title: "Backup Uploaded", value: "backup_uploaded" },
      { title: "Backup Renamed", value: "backup_renamed" },
    ],
  },
  {
    name: "subject_type",
    label: t("activity.subject"),
    values: [
      { title: "Chirp", value: "App\\Models\\Chirp" },
      { title: "User", value: "App\\Models\\User" },
      { title: "Setting", value: "App\\Models\\Setting" },
    ],
  },
  {
    name: "causer_id",
    label: t("activity.causer"),
    type: "autocomplete",
    endpoint: "/api/system/users",
    itemTitle: "name",
    itemValue: "id",
  },
  {
    name: "date_from",
    label: t("activity.date_from"),
    type: "date",
  },
  {
    name: "date_to",
    label: t("activity.date_to"),
    type: "date",
  },
];

const actions = computed(() => [
  {
    component: IconButton,
    icon: "mdi-magnify",
    text: t("form.details"),
    event: "details",
    onClick: showDetail,
  },
]);
</script>
<template>
  <div>
    <DeclarativeCrudView
      :client="client"
      :name-field="nameField"
      :title="title"
      :fields="fields"
      :actions="actions"
      :form-dialog="null"
      :rules="{}"
      :no-create="true"
      :filter-fields="filterFields"
    />

    <ActivityDetailModal
      v-model="detailOpen"
      :item="detailItem"
    />
  </div>
</template>
