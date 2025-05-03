<script lang="ts">
import { useAuthStore } from "@/stores/auth";
import { Component } from "vue-facing-decorator";
import { Constructor } from "@/mixins/Constructor.vue";
import userService from "../services/user";
import { getArrayText } from "@/libs/util.js";
import rules from "@/validations-gen/users.json";
import { parseLaravelRules } from "@/libs/validation";

export const UserFormMixin = <TBase extends Constructor>(Base: TBase) => {
  @Component({
    name: "UserFormMixin"
  })
  class UserFormMixin extends Base {
    availableRoles = [];
    availablePermissions = [];

    async created() {
      await super.created?.();
      this.availableRoles = (await userService.get_roles()).roles;
      this.availablePermissions = (
        await userService.get_permissions()
      ).permissions;
    }

    get hasAvailableRoles() {
      return this.availableRoles && this.availableRoles.length > 0;
    }

    get hasAvailablePermissions() {
      return this.availablePermissions && this.availablePermissions.length > 0;
    }
    setRolesConfirmText(item, value) {
      return this.setFieldConfirmText("roles", item, value);
    }
    getRolesText(val) {
      return getArrayText(val, (v) => v.name, false);
    }
    get rules() {
      return parseLaravelRules(rules);
    }
  }
  return UserFormMixin;
};
export default UserFormMixin;
</script>
