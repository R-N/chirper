<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import FileSaver from "file-saver";
import { filesize } from "filesize";

import CrudView from "@/views/CrudView.vue";
import FileUploadDialog from "@/components/dialog/FileUploadDialog.vue";
import SimpleInputDialog from "@/components/dialog/SimpleInputDialog.vue";
import EditableCellTextField from "@/components/form/editable_cell/EditableCellTextField.vue";
import { VDataTable } from "vuetify/components";
import IconButton from "@/components/button/IconButton.vue";
import ConfirmationIconButton from "@/components/button/ConfirmationIconButton.vue";

import backupService from "../services/backup.js";
import { formatDate, isInertiaForm } from "@/libs/util.js";
import rules from "@/validations-gen/backup.json";
import { parseLaravelRules } from "@/libs/validation";
import { t } from "@/plugins/i18n";

import { useWorking } from "@/composables/useWorking";
import { useCrudView } from "@/composables/useCrudView";

const props = defineProps<{
  parentBusy?: any;
}>();

const {
  busy,
  waitBusy,
  showError,
} = useWorking(props);

const crudView = useCrudView({
  client: backupService,
  waitBusy,
  showError,
  nameField: "id",
});

const {
  formDialogShow,
  editing,
  search,
  items,
  selected,
  page,
  itemsPerPage,
  itemCount,
  selecting,
  dataTableComponent,
  debouncedFetch,
  fetch,
  create,
  delete2,
  exportCsv,
  exportXlsx,
  exportPdf,
  bulkConfirmText,
  storeItem,
  deleteItem,
  deleteConfirmText,
  justAsk,
  setFieldConfirmText,
  setField,
} = crudView;

const uploadDialog = ref(false);

const itemName = computed(() => t("backup.item"));
const headers = computed(() => [
  { title: t("backup.item"), value: "id" },
  { title: t("form.size"), value: "size" },
  { title: t("crud.last_modified"), value: "modified" },
  { title: t("crud.actions"), value: "actions", sortable: false },
]);

const parsedRules = computed(() => parseLaravelRules(rules));

function showForm(data = null) {
  editing.value = data;
  formDialogShow.value = true;
}

async function createBackup(form: any) {
  if (!isInertiaForm(form)) form = { id: form };
  await waitBusy(async () => {
    await backupService.create(form);
    fetch();
  });
}

function restoreText(item: any) {
  return t("backup.restore_confirm_text", { name: item.id });
}

async function restoreBackup(item: any) {
  await waitBusy(async () => {
    await backupService.put(item);
  });
}

async function downloadBackup(item: any) {
  await waitBusy(async () => {
    const res = await backupService.download(item);
    FileSaver.saveAs(res.data, item.id);
  });
}

async function uploadBackup(file: any) {
  await waitBusy(async () => {
    const res = await backupService.put(null, { file: file });
    items.value.push(res.backup);
  });
}

function formatSize(size: number) {
  return filesize(size);
}

function formatDateVal(date: any) {
  return formatDate(date);
}
</script>
<template>
  <CrudView
    :title="$t('backup.title')"
    :create="() => showForm()"
    :fetch="fetch"
    v-model:search="search"
    :export-csv="exportCsv"
    :export-xlsx="exportXlsx"
    :export-pdf="exportPdf"
  >
    <template v-slot:toolbar-left>
      <IconButton
        @click.stop="uploadDialog = true"
        :disabled="busy"
        icon="mdi-upload"
        :text="$t('form.upload')"
        size="default"
      />
    </template>
    <template v-slot:default>
      <VDataTable
        class=""
        :headers="headers"
        :items="items"
        item-key="id"
        :search="search"
        :loading="busy"
      >
        <template v-slot:item.id="{ item }">
          <EditableCellTextField
            name="id"
            :confirm-text-maker="
              (value) => setFieldConfirmText('id', item, value)
            "
            v-model="item.id"
            :on-finish="(value) => setField('id', item, value)"
            :disabled="busy"
            :rules="parsedRules.id"
          />
        </template>
        <template v-slot:item.size="{ item }">
          <small class="ml-2 text-sm text-gray-600">{{
            formatSize(item.size)
          }}</small>
        </template>
        <template v-slot:item.modified="{ item }">
          <small class="ml-2 text-sm text-gray-600">{{
            formatDateVal(item.modified)
          }}</small>
        </template>
        <template v-slot:item.actions="{ item }">
          <IconButton
            @click.stop="() => downloadBackup(item)"
            :disabled="busy"
            icon="mdi-download"
            :text="$t('form.download')"
          />
          <ConfirmationIconButton
            icon="mdi-restore"
            :text="$t('backup.restore')"
            :confirmTextMaker="restoreText(item)"
            :on-confirm="() => restoreBackup(item)"
            :disabled="busy"
          />
          <ConfirmationIconButton
            icon="mdi-delete"
            :text="$t('form.delete')"
            :confirmTextMaker="deleteConfirmText(item)"
            :on-confirm="() => delete2(item)"
            :ask="(ask) => justAsk(item, ask)"
            :disabled="busy"
          />
        </template>
      </VDataTable>
      <FileUploadDialog
        v-model="uploadDialog"
        :on-upload="uploadBackup"
        :title="$t('backup.upload_title')"
        :text="$t('backup.upload_desc')"
        :label="$t('backup.upload_label')"
        acceptedFiles=".zip"
        :mimeTypes="['application/zip']"
      />
      <SimpleInputDialog
        v-model="formDialogShow"
        :on-submit="createBackup"
        :title="$t('backup.create_title')"
        :label="$t('backup.create_label')"
        noInput="true"
        name="id"
        :rules="parsedRules.id"
      />
    </template>
  </CrudView>
</template>
<style scoped></style>
