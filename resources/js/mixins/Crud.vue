<script lang="ts">
import { Vue, Component, Prop } from "vue-facing-decorator";
import { deleteFromArray, isInertiaForm, isObject } from "@/libs/util";
import { Constructor } from "./Constructor.vue";

export const CrudMixin = <TBase extends Constructor>(Base: TBase) => {
  @Component({
    name: "CrudBase",
    components: {},
    emits: ["store", "delete"]
  })
  class CrudBase extends Base {
    nameField = "name";
    client = null;
    filteredErrors = [];

    get itemName() {
      return this.$t("crud.item");
    }
    get serverside() {
      return false;
    }
    storeItem(item) {
      this.$emit("store", item);
    }
    deleteItem(item) {
      this.$emit("delete", item);
    }

    deleteConfirmText(item) {
      return this.$t("crud.delete_confirm_text", {
        item: this.itemName.toLowerCase(),
        name: item[this.nameField]
      });
    }

    async justAsk(item, ask) {
      if (ask) ask();
    }

    async delete2(item, releaseBusy = true) {
      return await this.waitBusy(
        async () => {
          const ret = await this.client.delete(item);
          this.deleteItem(item);
          return ret;
        },
        null,
        releaseBusy
      );
    }

    async fetch(options = {}, releaseBusy = true) {
      return await this.waitBusy(
        async () => {
          let res = await this.client.fetch(options);
          return this.client.getData(res);
        },
        null,
        releaseBusy
      );
    }

    async create(form, releaseBusy = true) {
      return await this.waitBusy(
        async () => {
          let res = await this.client.create(form);
          const data = this.client.getData(res);
          this.storeItem(data);
          return data;
        },
        null,
        releaseBusy
      );
    }

    setNameConfirmText(item, newValue) {
      return this.setFieldConfirmText(this.nameField, item, newValue);
    }

    async setName(item, newValue, releaseBusy = true) {
      return await this.setField(this.nameField, item, newValue, releaseBusy);
    }

    setFieldConfirmText(fieldName, item, newValue = null, getText = null) {
      let oldValue = item[fieldName];
      // let newValue = item[newField];
      if (getText) {
        oldValue = getText(oldValue);
        newValue = getText(newValue);
      }
      return this.$t("crud.set_field_confirm_text", {
        field: fieldName,
        item: this.itemName.toLowerCase(),
        name: item[this.nameField],
        oldValue: oldValue,
        newValue: newValue
      });
    }

    async setField(
      fieldName,
      item,
      value = null,
      releaseBusy = true,
      getValue = null
    ) {
      return await this.waitBusy(
        async () => {
          const ret = await this.client[`set_${fieldName}`](
            item,
            getValue ? getValue(value) : value
          );
          const data = this.client.getData(ret);
          if (isObject(data)) {
            item[fieldName] = data[fieldName];
            this.storeItem(data);
          } else if (isInertiaForm(value)) {
            item[fieldName] = value[fieldName];
          } else {
            item[fieldName] = value;
          }
          return data;
        },
        null,
        releaseBusy
      );
    }

    setEnabledConfirmText(item) {
      return this.toggleFieldConfirmText(
        "enabled",
        this.$t("user.disabling"),
        this.$t("user.enabling"),
        item
      );
    }

    async setEnabled(item, enabled, releaseBusy = true) {
      return await this.toggleField("enabled", item, enabled, releaseBusy);
    }

    toggleFieldConfirmText(fieldName, disable, enable, item) {
      let action = item[fieldName] ? disable : enable;
      return this.$t("crud.toggle_field_confirm_text", {
        action: action,
        field: fieldName,
        item: this.itemName.toLowerCase(),
        name: item[this.nameField]
      });
    }

    async toggleField(toggleName, item, enabled, releaseBusy = true) {
      if (enabled === undefined || enabled === null) enabled = !item.enabled;
      return await this.setField(toggleName, item, enabled, releaseBusy);
    }

    clearFieldConfirmText(fieldName, item) {
      return this.$t("crud.clear_field_confirm_text", {
        field: fieldName,
        item: this.itemName.toLowerCase(),
        name: item[this.nameField]
      });
    }

    async clearField(fieldName, item, releaseBusy = true) {
      return await this.waitBusy(
        async () => {
          const ret = await this.client[`clear_${fieldName}`](item);
          const data = this.client.getData(ret);
          if (isObject(data)) {
            item[fieldName] = data[fieldName];
            this.storeItem(data);
          } else {
            item[fieldName] = null;
          }
          return data;
        },
        null,
        releaseBusy
      );
    }

    async action(action, form, onSuccess = null, releaseBusy = true) {
      return await this.waitBusy(
        async () => {
          const ret = await this.client[action](form);
          onSuccess?.();
          return ret;
        },
        null,
        releaseBusy
      );
    }

    async get(item_id, releaseBusy = true) {
      return await this.waitBusy(
        async () => {
          const ret = await this.client.get({ id: item_id });
          return this.client.getData(ret);
        },
        null,
        releaseBusy
      );
    }
  }
  return CrudBase;
};
export default CrudMixin;
</script>
