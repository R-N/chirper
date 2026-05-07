<script setup lang="ts">
import { ref, computed } from "vue";
import FileSaver from "file-saver";

import DeclarativeCrudView from "@/views/DeclarativeCrudView.vue";
import FileUploadDialog from "@/components/dialog/FileUploadDialog.vue";
import SimpleInputDialog from "@/components/dialog/SimpleInputDialog.vue";
import IconButton from "@/components/button/IconButton.vue";
import ConfirmationIconButton from "@/components/button/ConfirmationIconButton.vue";
import FormatSize from "@/components/text/FormatSize.vue";
import FormatDate from "@/components/text/FormatDate.vue";

import backupService from "../services/backup.js";
import rules from "@/validations-gen/backup.json";
import { t } from "@/plugins/i18n";

const client = backupService;
const nameField = "id";

const crud = ref<InstanceType<typeof DeclarativeCrudView> | null>(null);
const uploadDialog = ref(false);

const title = computed(() => t("backup.title"));

const fields = computed(() => [
  {
    type: "text",
    model: "id",
    value: "id",
    title: t("backup.item"),
    table: true,
    detail: true,
    editable: true,
  },
  {
    component: FormatSize,
    value: "size",
    title: t("form.size"),
    table: true,
    detail: true,
  },
  {
    component: FormatDate,
    value: "modified",
    title: t("crud.last_modified"),
    table: true,
    detail: true,
  },
]);

const actions = computed(() => [
  {
    component: IconButton,
    icon: "mdi-download",
    text: t("form.download"),
    event: "download",
    onClick: async (item: any) => {
      const res = await backupService.download(item);
      FileSaver.saveAs(res.data, item.id);
    },
  },
  {
    component: ConfirmationIconButton,
    icon: "mdi-restore",
    text: t("backup.restore"),
    event: "restore",
    confirmTextMaker: (item: any) => t("backup.restore_confirm_text", { name: item.id }),
    onConfirm: async (item: any) => {
      await backupService.put(item);
      crud.value?.fetch();
    },
  },
  { type: "delete", text: t("form.delete") },
]);

async function uploadBackup(file: any) {
  const res = await backupService.put(null, { file });
  crud.value?.items.push(res.backup);
}

const formDialog = computed(() => ({
  component: SimpleInputDialog,
  submit: async (name: string) => {
    await backupService.create({ id: name || "" });
    crud.value?.fetch();
  },
  props: {
    title: t("backup.create_title"),
    label: t("backup.create_label"),
    name: "id",
    noInput: true,
  },
}));
</script>
<template>
  <DeclarativeCrudView
    ref="crud"
    :client="client"
    :name-field="nameField"
    :title="title"
    :fields="fields"
    :actions="actions"
    :form-dialog="formDialog"
    :rules="rules"
    :bulk-actions="[]"
  >
    <template v-slot:toolbar-left="{ busy }">
      <IconButton
        @click.stop="uploadDialog = true"
        :disabled="busy"
        icon="mdi-upload"
        :text="$t('form.upload')"
        size="default"
      />
    </template>
  </DeclarativeCrudView>
  <FileUploadDialog
    v-model="uploadDialog"
    :on-upload="uploadBackup"
    :title="$t('backup.upload_title')"
    :text="$t('backup.upload_desc')"
    :label="$t('backup.upload_label')"
    acceptedFiles=".zip"
    :mimeTypes="['application/zip']"
  />
</template>
