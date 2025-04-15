import { av as api, b3 as useAuthStore, b as Component, t as toNative, at as BaseView } from "./app-DDBQLYRK.js";
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-D6E1IMSQ.js";
import { C as CenterLayout } from "./GuestLayout.vue_vue_type_script_lang-2s0GDYYy.js";
class AuthService {
  constructor(axios) {
    this.axios = axios || api;
  }
  async login(form) {
    const authStore = useAuthStore();
    form = form.transform((data) => ({
      ...data,
      remember: data.remember ? "on" : ""
    }));
    let res = await this.axios.post("/login", form);
    console.log(res);
    authStore.updateUser(res.data.user);
    authStore.auth_token = res.data.auth_token;
    return res;
  }
  async logout() {
    const authStore = useAuthStore();
    let res = await this.axios.post("/logout");
    authStore.logout();
    return res;
  }
  async switchToTeam(team) {
    let res = await this.axios.put(route("current-team.update"), {
      team_id: team.id
    });
    return res.data;
  }
  async register(form) {
    const authStore = useAuthStore();
    let res = await this.axios.post("/register", form);
    if (res.data.suer) authStore.updateUser(res.data.user);
    if (res.data.auth_token) authStore.setAuthToken(res.data.auth_token);
    return res.data;
  }
  async twoFactorLogin(form) {
    let res = await this.axios.post(route("two-factor.login"), form);
    return res.data;
  }
  async forgotPassword(form) {
    let res = await this.axios.post(route("password.email"), form);
    return res.data;
  }
  async resetPassword(form) {
    let target = route("password.update");
    let res = await this.axios.post(target, form);
    return res.data;
  }
  async confirmPassword(form) {
    let res = await this.axios.post(route("password.confirm"), form);
    return res.data;
  }
}
const authService = new AuthService();
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
let AuthLayout = class extends BaseView {
};
AuthLayout = __decorateClass([
  Component({
    name: "AuthLayout",
    components: {
      AuthenticationCardLogo: _sfc_main$1,
      CenterLayout
    }
  })
], AuthLayout);
const _sfc_main = toNative(AuthLayout);
export {
  AuthLayout as A,
  _sfc_main as _,
  authService as a
};
//# sourceMappingURL=Auth.vue_vue_type_script_lang-BqrvBsHH.js.map
