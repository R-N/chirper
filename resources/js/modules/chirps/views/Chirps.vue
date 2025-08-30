<script lang="ts">
import { Vue, Component, toNative, Ref } from "vue-facing-decorator";

import dayjs from "dayjs";

import ChirpFormDialog from "@/modules/chirps/views/FormDialog.vue";
import CrudView from "@/views/CrudView.vue";
import { CrudViewBase } from "@/views/CrudViewBase.vue";
import EditableCellTextArea from "@/components/form/editable_cell/EditableCellTextArea.vue";

import chirpService from "../services/chirp";
import { VDataTable } from "vuetify/components";
import IconButton from "@/components/button/IconButton.vue";
import ConfirmationIconButton from "@/components/button/ConfirmationIconButton.vue";
import { bulkDeleteFromArray } from "@/libs/util";
import rules from "@/validations-gen/chirps.json";
import { parseLaravelRules } from "@/libs/validation";

import { BaseMixin } from "@/mixins/Component.vue";
import { WorkingMixin } from "@/mixins/Working.vue";
import { CrudViewMixin } from "@/mixins/CrudView.vue";
import { DeclarativeCrudView } from "@/views/DeclarativeCrudView.vue";
import { Duration } from "@/components/text/Duration.vue";
import { Span } from "@/components/text/Span.vue";

const BaseClass = WorkingMixin(BaseMixin(Vue));

@Component({
  name: "ChirpCrudView",
  components: {
    Span,
    Duration,
    DeclarativeCrudView,
    ChirpFormDialog,
    CrudView,
    EditableCellTextArea,
    VDataTable,
    IconButton,
    ConfirmationIconButton
  }
})
class ChirpCrudView extends BaseClass {
  @Ref("crud") crud : DeclarativeCrudView;
  nameField = "created_at";
  client = chirpService;
  get formDialog() {
    return {
      component: ChirpFormDialog,
      submit: (item) => this.crud?.storeItem(item),
    };
  };

  get title(){
    return this.$t('chirp.title');
  }
  get itemName() {
    return this.$t("chirp.item");
  }
  duration(time) {
    return dayjs(time).fromNow();
  }
  // get rules() {
  //   return parseLaravelRules(rules);
  // }
  rules=rules;

  get fields(){
    return [
      {
        component: Span,
        value: "user.name",
        title: this.$t("crud.user"),
        table: true,
        detail: true,
        propsMap: {
          text: "user.name"
        }
      },
      {
        component: EditableCellTextArea,
        model: "message",
        value: "message",
        title: this.$t("chirp.message"),
        table: true,
        detail: true,
        confirmTextMaker: (item, value) => this.crud?.setFieldConfirmText('message', item, value),
        props: {
          editable: true,
          format: null,
        }
      },
      {
        component: Duration,
        value: "created_at",
        title: this.$t("crud.created_at"),
        table: true,
        detail: true,
        propsMap: {
          time: "created_at"
        }
      },
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
}
export { ChirpCrudView };
export default toNative(ChirpCrudView);
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
