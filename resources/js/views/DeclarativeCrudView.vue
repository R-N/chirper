<script lang="ts">
import { Vue, Component, toNative, Prop } from "vue-facing-decorator";

import CrudView from "@/views/CrudView.vue";
import { CrudViewBase } from "@/views/CrudViewBase.vue";
import EditableCellTextArea from "@/components/form/editable_cell/EditableCellTextArea.vue";

import { VDataTable } from "vuetify/components";
import IconButton from "@/components/button/IconButton.vue";
import ConfirmationIconButton from "@/components/button/ConfirmationIconButton.vue";
import { getByPath, setByPath, combineCollection } from "@/libs/util";
import { parseLaravelRules } from "@/libs/validation";

import { BaseMixin } from "@/mixins/Component.vue";
import { WorkingMixin } from "@/mixins/Working.vue";
import { CrudViewMixin } from "@/mixins/CrudView.vue";
import { filterObject } from "@/libs/util";

const BaseClass = CrudViewMixin(WorkingMixin(BaseMixin(Vue)));
const emptyFunction = (x) => x;

@Component({
  name: "DeclarativeCrudView",
  components: {
    CrudView,
    VDataTable,
    IconButton,
    ConfirmationIconButton
  }
})
class DeclarativeCrudView extends BaseClass {
  @Prop({ type: Object, default: null }) client;
  @Prop({ type: String, default: "name" }) nameField;
  @Prop({ type: Object, default: null }) formDialog;
  @Prop({ type: String, default: "CRUD" }) title;
  @Prop({ type: Array, default: [] }) fields;
  @Prop({ type: Array, default: [] }) actions;
  @Prop({ type: Array, default: [] }) bulkActions;
  @Prop({ type: Object, default: {} }) rules;

  combineCollection = combineCollection;

  get headers() {
    let headers = this.fields.map((f) => filterObject(f, ["title", "value"]));
    let actions = this.actions;
    if (actions){
      headers = [
        ...headers,
        { title: this.$t("crud.actions"), value: "actions" }
        // filterObject(actions, ["title", "value"])
      ];
    }
    return headers;
  }

  showForm(data = null) {
    this.editing = data;
    this.formDialogShow = true;
  }

  async bulkAction(action) {
    await this.waitBusy(async () => {
      await action(this.selected, this.items);
    });
  }

  get _rules() {
    return parseLaravelRules(this.rules);
  }

  makeBindings(f, item) {
    const bindings = {}

    Object.assign(bindings, f.props ?? {})

    // Handle v-model separately
    if (f.model) {
      bindings["modelValue"] = getByPath(item, f.model)
      bindings["onUpdate:modelValue"] = (val: any) => {
        setByPath(item, f.model, val)
      }
    }

    // Map item attributes to arbitrary prop names
    if (f.propsMap) {
      for (const [propName, attrName] of Object.entries(f.propsMap)) {
        bindings[propName] = getByPath(item, attrName as string)
      }
    }

    return bindings;
  }
}
export { DeclarativeCrudView };
export default toNative(DeclarativeCrudView);
</script>
<template>
  <CrudView
    :title="title"
    :create="() => showForm()"
    :fetch="fetch"
    v-model:search="search"
    :export-csv="exportCsv"
    :export-xlsx="exportXlsx"
    :export-pdf="exportPdf"
    :selectable="true"
    v-model:selecting="selecting"
    :selected="selected.length"
    :rules="_rules"
  >
    <template v-slot:bulk-actions>
      <component
        v-for="(ba, i) in bulkActions"
        :key="i"
        :is="ba.component"
        :icon="ba.icon"
        :text="ba.text"
        :confirmTextMaker="ba.confirmText ?? bulkConfirmText(ba.name)"
        :on-confirm="() => ba.onConfirm ? bulkAction(ba.onConfirm) : null"
        @click.stop="() => ba.onClick ? bulkAction(ba.onClick) : null"
        class="fill-height d-inline-flex"
        size="default"
        :disabled="busy"
        v-bind="ba.props"
        :parent-busy="busy"
      />
    </template>
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
        :parent-busy="busy"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td v-for="(f, i) in fields" :key="f.value">
              <component
                :key="i"
                :is="f.component"
                :disabled="busy"
                :bypass-editable-cell="false"
                :data="item"
                :rules="combineCollection(_rules, _rules[f.name ?? f.value])"
                :select="f.value ?? f.name"
                @store="storeItem"
                v-model="item[f.value]"
                v-bind="makeBindings(f, item)"
                :confirmTextMaker="
                  f.confirmTextMaker ? 
                  (value) => f.confirmTextMaker(item, value) :
                  (value) => setFieldConfirmText(f.value ?? f.name, item, value)
                "
                :parent-busy="busy"
              />
            </td>
            <td key="actions">
              <component
                v-for="(a, i) in actions"
                :key="i"
                :is="a.component"
                :icon="a.icon"
                :text="a.text"
                :ask="a.ask ? (ask) => justAsk(item, ask) : null"
                :on-confirm="() => a.onConfirm ? a.onConfirm(item) : null"
                @click.stop="() => a.onClick ? a.onClick(item) : null"
                :confirmTextMaker="
                  a.confirmTextMaker ? 
                  (value) => a.confirmTextMaker(item, value) :
                  (value) => setFieldConfirmText(a.name, item, value)
                "
                :disabled="busy || a.disabled"
                v-bind="makeBindings(a, item)"
                :bypass-editable-cell="false"
                :data="item"
                :rules="combineCollection(_rules, _rules[a.name])"
                :select="a.name"
                @store="storeItem"
                :parent-busy="busy"
              />
            </td>
          </tr>
        </template>
      </component>
      <component
        v-if="formDialog"
        :is="formDialog.component"
        :component="formDialog.component"
        :data="editing"
        v-model="formDialogShow"
        @submit="formDialog.submit"
        :parent-busy="busy"
        :rules="_rules"
        v-bind="formDialog.props"
      />
    </template>
  </CrudView>
</template>
<style scoped></style>
