var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { I as InputError } from "./InputError-CxVZbwKm.js";
import { t as toNative, V as Vue, C, aH as Wr, a as decorator, b as Component, _ as _export_sfc, r as resolveComponent, c as createBlock, w as withCtx, o as openBlock, e as createVNode, h as createTextVNode } from "./app-BV4qnAJ0.js";
import { a as authService } from "./Auth.vue_vue_type_script_lang-BB9WK6Yd.js";
import { A as AuthLayout } from "./Auth-DcA7pqAD.js";
import { G as GuestLayout } from "./GuestLayout-BRSQR84D.js";
import { a as VCard, d as VCardTitle, b as VCardText, c as VCardActions } from "./GuestLayout.vue_vue_type_script_lang-zdB9XH-z.js";
import { V as VTextField } from "./VTextField-DCXUA7Y2.js";
import { V as VBtn } from "./forwardRefs-DKU3reEu.js";
import "./AuthenticationCardLogo-rBZHVFWH.js";
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
let ResetPasswordPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "email");
    __publicField(this, "token");
    __publicField(this, "form", C({
      token: "",
      email: "",
      password: "",
      password_confirmation: ""
    }));
  }
  mounted() {
    this.form.token = this.token;
    this.form.email = this.email;
  }
  async submit() {
    let res = await authService.resetPassword(this.form);
    this.form.reset("password", "password_confirmation");
    Wr.visit(res.redirect || "/login");
  }
};
__decorateClass([
  decorator({ type: String })
], ResetPasswordPage.prototype, "email", 2);
__decorateClass([
  decorator({ type: String })
], ResetPasswordPage.prototype, "token", 2);
ResetPasswordPage = __decorateClass([
  Component({
    components: {
      AuthLayout,
      GuestLayout,
      InputError,
      VCard,
      VCardTitle,
      VCardText,
      VCardActions,
      VTextField,
      VBtn
    }
  })
], ResetPasswordPage);
const _sfc_main = toNative(ResetPasswordPage);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_InputError = resolveComponent("InputError");
  const _component_AuthLayout = resolveComponent("AuthLayout");
  const _component_GuestLayout = resolveComponent("GuestLayout");
  return openBlock(), createBlock(_component_GuestLayout, { title: "Reset Password" }, {
    default: withCtx(() => [
      createVNode(_component_AuthLayout, null, {
        default: withCtx(() => [
          createVNode(VCard, {
            class: "mx-auto my-10",
            "max-width": "400",
            elevation: "10"
          }, {
            default: withCtx(() => [
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode(VTextField, {
                    id: "email",
                    modelValue: _ctx.form.email,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.form.email = $event),
                    label: "Email",
                    type: "email",
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue"]),
                  createVNode(_component_InputError, {
                    message: _ctx.form.errors.email,
                    class: "mt-2"
                  }, null, 8, ["message"]),
                  createVNode(VTextField, {
                    id: "password",
                    modelValue: _ctx.form.password,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.form.password = $event),
                    label: "Password",
                    type: "password",
                    required: "",
                    autocomplete: "new-password",
                    class: "mt-4"
                  }, null, 8, ["modelValue"]),
                  createVNode(_component_InputError, {
                    message: _ctx.form.errors.password,
                    class: "mt-2"
                  }, null, 8, ["message"]),
                  createVNode(VTextField, {
                    id: "password_confirmation",
                    modelValue: _ctx.form.password_confirmation,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.form.password_confirmation = $event),
                    label: "Confirm Password",
                    type: "password",
                    required: "",
                    autocomplete: "new-password",
                    class: "mt-4"
                  }, null, 8, ["modelValue"]),
                  createVNode(_component_InputError, {
                    message: _ctx.form.errors.password_confirmation,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                _: 1
              }),
              createVNode(VCardActions, { class: "justify-end" }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    color: "primary",
                    variant: "elevated",
                    loading: _ctx.form.processing,
                    onClick: _ctx.submit
                  }, {
                    default: withCtx(() => _cache[3] || (_cache[3] = [
                      createTextVNode(" Reset Password ")
                    ])),
                    _: 1
                  }, 8, ["loading", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const ResetPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ResetPassword as default
};
//# sourceMappingURL=ResetPassword-BEAnIxj8.js.map
