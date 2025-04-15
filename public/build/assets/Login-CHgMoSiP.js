var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { t as toNative, at as BaseView, C, aA as Wr, a as decorator, b as Component, _ as _export_sfc, r as resolveComponent, c as createBlock, w as withCtx, o as openBlock, e as createVNode } from "./app-CPu3B8nk.js";
import { a as authService } from "./Auth.vue_vue_type_script_lang-DBB4XVKb.js";
import { L as LoginView } from "./Login-B8czODMK.js";
import { G as GuestLayout } from "./GuestLayout-BN0Hy48d.js";
import "./AuthenticationCardLogo-BVaAeieh.js";
import "./GuestLayout.vue_vue_type_script_lang-B04FhGQk.js";
import "./forwardRefs-CUUEJ2GB.js";
import "./VRow-B-PaLeOj.js";
import "./InputError-D2hiOP2i.js";
import "./VTextField-Bj9iITQ7.js";
import "./VCheckbox-ClXUESM1.js";
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp2(target, key, result);
  return result;
};
let LoginPage = class extends BaseView {
  constructor() {
    super(...arguments);
    __publicField(this, "canResetPassword");
    __publicField(this, "status");
    __publicField(this, "form", C({
      email: "",
      password: "",
      remember: false
    }));
  }
  async login() {
    let res = await authService.login(this.form);
    this.form.reset("password");
    Wr.visit(res.redirect || "/dashboard");
  }
};
__decorateClass([
  decorator({ type: Boolean })
], LoginPage.prototype, "canResetPassword", 2);
__decorateClass([
  decorator({ type: String })
], LoginPage.prototype, "status", 2);
LoginPage = __decorateClass([
  Component({
    components: {
      LoginView,
      GuestLayout
    }
  })
], LoginPage);
const _sfc_main = toNative(LoginPage);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_LoginView = resolveComponent("LoginView");
  const _component_GuestLayout = resolveComponent("GuestLayout");
  return openBlock(), createBlock(_component_GuestLayout, { title: "Log in" }, {
    default: withCtx(() => [
      createVNode(_component_LoginView, { appear: "" })
    ]),
    _: 1
  });
}
const Login = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Login as default
};
//# sourceMappingURL=Login-CHgMoSiP.js.map
