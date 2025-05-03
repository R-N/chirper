<script lang="ts">
import { Component, Prop, Watch, toNative } from "vue-facing-decorator";
import { ViewBase } from "@/views/ViewBase.vue";

import MainCard from "@/components/card/MainCard.vue";
import userService from "../services/user";
import UserForm from "../forms/User.vue";
import { UserFormMixin } from "../mixins/UserForm.vue";

const BaseClass = UserFormMixin(ViewBase);

@Component({
  name: "UserDetailView",
  components: {
    MainCard,
    UserForm
  }
})
class UserDetailView extends BaseClass {
  client = userService;
  @Prop({ type: Number }) item_id;
  @Prop({ type: Object, default: null }) __item;
  _item = null;

  get item() {
    if (this.__item) return this.__item;
    else return this._item;
  }
  set item(value) {
    if (this.__item) this.$emit("update:item", value);
    else this._item = value;
  }

  async created() {
    await super.created?.();
    await this.get();
  }

  async get() {
    await this.waitBusy(async () => {
      const ret = await this.client.get({ id: this.item_id });
      const data = this.client.getData(ret);
      this.item = data;
      return data;
    });
  }

  get title() {
    if (this.item) return `${this.$t("user.item")}: ${this.item.name}`;
    return this.$t("user.item");
  }
}
export { UserDetailView };
export default toNative(UserDetailView);
</script>
<template>
  <MainCard :title="title" no-toolbar="true">
    <template v-slot:default>
      <UserForm
        class="my-3"
        :disabled="busy"
        :bypass-editable-cell="false"
        :available-roles="availableRoles"
        :available-permissions="availablePermissions"
        :data="item"
        :rules="rules"
        ref="form"
      />
    </template>
  </MainCard>
</template>
<style scoped></style>
