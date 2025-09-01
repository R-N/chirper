<script lang="ts">
import { Vue, Component, toNative, Watch, Ref } from "vue-facing-decorator";

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
import { DeclarativeCrudView } from "@/views/DeclarativeCrudView.vue";
import { Duration } from "@/components/text/Duration.vue";

const BaseClass = SettingFormMixin(WorkingMixin(BaseMixin(Vue)));

@Component({
  name: "SettingCrudView",
  components: {
    DeclarativeCrudView,
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
  @Ref("crud") crud : DeclarativeCrudView;
  nameField = "created_at";
  rules=rules;
  get formDialog() {
    return {
      component: SettingFormDialog,
      submit: (item) => this.crud?.storeItem(item),
    };
  };

  get title(){
    return this.$t('chirp.title');
  }
  get itemName() {
    return this.$t("chirp.item");
  }

  get fields(){
    return [
      {
        component: SettingForm,
        value: "key",
        title: this.$t("form.key"),
        table: true,
        detail: true
      },
      {
        component: SettingForm,
        value: "type",
        title: this.$t("form.type"),
        table: true,
        detail: true
      },
      {
        component: SettingForm,
        value: "value",
        title: this.$t("form.value"),
        table: true,
        detail: true
      },
      {
        component: Duration,
        value: "updated_at",
        title: this.$t("crud.updated_at"),
        table: true,
        detail: true,
        propsMap: {
          time: "updated_at"
        }
      }
    ];
  }
  get actions(){
    return [
      {
        component: IconButton,
        title: "Edit",
        icon: "mdi-pencil",
        text: this.$t('form.edit'),
        onClick: (item) => this.crud?.showForm(item),
        ask: false,
      },
      {
        component: ConfirmationIconButton,
        title: "Delete",
        icon: "mdi-delete",
        text: this.$t('form.delete'),
        confirmTextMaker: (item) => this.crud?.deleteConfirmText(item),
        onConfirm: (item) => this.crud?.delete2(item),
        ask: true,
      }
    ];
  }

  get bulkActions(){
    return [
      {
        component: ConfirmationIconButton,
        name: "delete",
        icon: "mdi-delete",
        text: this.$t('crud.delete_selected'),
        action: async (selected, items) => {
          let res = await this.client.bulk_destroy({ ids: selected });
          bulkDeleteFromArray(items, selected);
          selected.splice(0);
        }
      }
    ];
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
  <DeclarativeCrudView
    ref="crud"
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
