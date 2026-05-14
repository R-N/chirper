<script setup lang="ts">
import { computed } from "vue";

import ConfirmationIconButton from "@/components/button/ConfirmationIconButton.vue";

import chirpService from "../services/chirp";
import { bulkDeleteFromArray } from "@/libs/util";
import rules from "@/validations-gen/chirps.json";

import DeclarativeCrudView from "@/views/DeclarativeCrudView.vue";
import Span from "@/components/text/Span.vue";
import Duration from "@/components/text/Duration.vue";
import PhotoField from "@/components/media/PhotoField.vue";
import { t } from "@/plugins/i18n";

const client = chirpService;
const nameField = "created_at";

const title = computed(() => t("chirp.title"));

const fields = computed(() => [
  {
    component: Span,
    value: "user.name",
    title: t("crud.user"),
    table: true,
    detail: true,
    propsMap: {
      text: "user.name",
    },
  },
  {
    type: "textarea",
    model: "message",
    value: "message",
    title: t("chirp.message"),
    table: true,
    detail: true,
    editable: true,
    props: {
      editable: true,
      format: null,
    },
  },
  {
    component: PhotoField,
    value: "photo",
    title: t("chirp.photo"),
    table: true,
    detail: true,
    editable: true,
  },
  {
    component: Duration,
    value: "created_at",
    title: t("crud.created_at"),
    table: true,
    detail: true,
    propsMap: {
      time: "created_at",
    },
  },
]);

const actions = computed(() => [
  { type: "edit", text: t("form.edit") },
  { type: "delete", text: t("form.delete") },
]);

const bulkActions = computed(() => [
  {
    component: ConfirmationIconButton,
    name: "delete",
    icon: "mdi-delete",
    text: t("crud.delete_selected"),
    action: async (selected: any[], items: any[]) => {
      await client.bulk_destroy({ ids: selected });
      bulkDeleteFromArray(items, selected);
      selected.splice(0);
    },
  },
]);

const formDialog = computed(() => ({
  title: t("chirp.item"),
  fields: [
    {
      type: "textarea",
      name: "message",
      value: "message",
      label: t("chirp.message"),
      required: true,
      table: false,
      form: true,
    },
    {
      type: "photo",
      name: "photo",
      value: "photo",
      label: t("chirp.photo"),
      table: false,
      form: true,
      rules: [],
    },
  ],
}));
</script>
<template>
  <DeclarativeCrudView
    :client="client"
    :name-field="nameField"
    :title="title"
    :fields="fields"
    :actions="actions"
    :bulk-actions="bulkActions"
    :form-dialog="formDialog"
    :rules="rules"
  />
</template>
