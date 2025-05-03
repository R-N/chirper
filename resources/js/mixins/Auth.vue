<script lang="ts">
import { useAuthStore } from "@/stores/auth";
import { Component } from "vue-facing-decorator";
import { Constructor } from "./Constructor.vue";

export const AuthMixin = <TBase extends Constructor>(Base: TBase) => {
  @Component({
    name: "AuthBase"
  })
  class AuthBase extends Base {
    authStore = useAuthStore();
    get isLoggedIn() {
      return this.authStore.isLoggedIn;
    }
    get auth_token() {
      return this.authStore.auth_token ?? super.auth_token;
    }
    get user() {
      return this.authStore.user ?? super.user;
    }
    get userRoles() {
      if (this.isLoggedIn && this.user) {
        return this.user.roles;
      }
      return [];
    }
    get userRolesText() {
      return this.userRoles.map((r) => r.name).join(", ");
    }
    get userName() {
      if (this.isLoggedIn && this.user) return this.user.name;
      return "";
    }

    created() {
      super.created?.();
      if (super.user) {
        this.authStore.updateUser(super.user);
      }
      if (this.auth_token) {
        this.authStore.auth_token = this.auth_token;
      }
    }
  }
  return AuthBase;
};
</script>
