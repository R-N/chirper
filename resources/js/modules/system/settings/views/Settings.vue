<script lang="ts">
import { Vue, Component, toNative, Watch } from "vue-facing-decorator";

import dayjs from "dayjs";

import SettingFormDialog from "../views/FormDialog.vue";
import CrudView from "@/views/CrudView.vue";
import { CrudViewBase } from "@/views/CrudViewBase.vue";
import EditableCellTextArea from "@/components/form/editable_cell/EditableCellTextArea.vue";

import settingService from "../services/setting";
import { VDataTable } from "vuetify/components";
import IconButton from "@/components/button/IconButton.vue";
import ConfirmationIconButton from "@/components/button/ConfirmationIconButton.vue";
import { bulkDeleteFromArray, isObject, isObjectEmpty } from "@/libs/util";
import rules from "@/validations-gen/settings.json";
import { parseLaravelRules } from "@/libs/validation";

import { BaseMixin } from "@/mixins/Component.vue";
import { WorkingMixin } from "@/mixins/Working.vue";
import { CrudViewMixin } from "@/mixins/CrudView.vue";

import { SettingFormMixin } from "../mixins/SettingForm.vue";
import { SettingForm } from "../forms/Setting.vue";

const BaseClass = SettingFormMixin(CrudViewMixin(WorkingMixin(BaseMixin(Vue))));

@Component({
  name: "SettingCrudView",
  components: {
    SettingFormDialog,
    CrudView,
    EditableCellTextArea,
    VDataTable,
    IconButton,
    ConfirmationIconButton,
    SettingForm
  }
})
class SettingCrudView extends BaseClass {
  client = settingService;

  get itemName() {
    return this.$t("settings.item");
  }
  get headers() {
    let headers = [
      { title: this.$t("form.key"), value: "key" },
      { title: this.$t("form.type"), value: "type" },
      { title: this.$t("form.value"), value: "value" },
      { title: this.$t("crud.updated_at"), value: "updated_at" },
      { title: this.$t("crud.actions"), value: "actions" }
    ];
    return headers;
  }
  duration(time) {
    return dayjs(time).fromNow();
  }

  showForm(setting = null) {
    this.editing = setting;
    this.formDialog = true;
  }

  async bulkDelete() {
    await this.waitBusy(async () => {
      let res = await settingService.bulk_destroy({ ids: this.selected });
      bulkDeleteFromArray(this.items, this.selected);
      this.selected.splice(0);
    });
  }
  get rules() {
    return parseLaravelRules(rules);
  }

  @Watch("items")
  setSettings(settings) {
    if (settings && isObject(settings) && !isObjectEmpty(settings))
      this.appStore.updateSettings(settings);
  }
}
export { SettingCrudView };
export default toNative(SettingCrudView);
</script>
<template>
  <CrudView
    :title="$t('settings.title')"
    :create="() => showForm()"
    :fetch="fetch"
    v-model:search="search"
    :export-csv="exportCsv"
    :export-xlsx="exportXlsx"
    :export-pdf="exportPdf"
    :selectable="true"
    v-model:selecting="selecting"
    :selected="selected.length"
  >
    <template v-slot:default>
      <component
        :is="dataTableComponent"
        class=""
        :headers="headers"
        :items="items"
        item-key="id"
        :search="search"
        :loading="busy"
        :items-length="itemCount"
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        @update:options="debouncedFetch"
        v-model="selected"
        :show-select="selecting"
      >
        <template v-slot:item.key="{ item }">
          <SettingForm
            :disabled="busy"
            :bypass-editable-cell="false"
            :data="item"
            :rules="rules"
            select="key"
            @store="storeItem"
          />
        </template>
        <template v-slot:item.type="{ item }">
          <SettingForm
            :disabled="busy"
            :bypass-editable-cell="false"
            :data="item"
            :rules="rules"
            select="type"
            @store="storeItem"
            :setting-types="settingTypes"
          />
        </template>
        <template v-slot:item.value="{ item }">
          <SettingForm
            :disabled="busy"
            :bypass-editable-cell="false"
            :data="item"
            :rules="rules"
            select="value"
            @store="storeItem"
          />
        </template>
        <template v-slot:item.updated_at="{ item }">
          <small class="ml-2 text-sm text-gray-600">{{
            formatDate(item.updated_at)
          }}</small>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="d-flex flex-row">
            <IconButton
              @click.prevent.stop="() => showForm(item)"
              :disabled="busy"
              icon="mdi-pencil"
              :text="$t('form.edit')"
            />
            <SettingForm
              :disabled="busy"
              :bypass-editable-cell="false"
              :data="item"
              :rules="rules"
              select="delete"
              @delete="deleteItem"
            />
          </div>
        </template>
      </component>
      <SettingFormDialog
        :data="editing"
        v-model="formDialog"
        @submit="storeItem"
        :parent-busy="busy"
        :rules="rules"
        :setting-types="settingTypes"
      />
    </template>
  </CrudView>
</template>
<style scoped></style>
