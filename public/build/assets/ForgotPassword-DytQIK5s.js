var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { I as InputError, e as VAlert } from "./InputError-ytemAFXd.js";
import { t as toNative, V as Vue, C, aA as Wr, a as decorator, b as Component, _ as _export_sfc, r as resolveComponent, c as createBlock, w as withCtx, o as openBlock, e as createVNode, g as createBaseVNode, h as createTextVNode, M as toDisplayString, N as createCommentVNode, i as withModifiers } from "./app-DDBQLYRK.js";
import { a as authService } from "./Auth.vue_vue_type_script_lang-BqrvBsHH.js";
import { A as AuthLayout } from "./Auth-C7Z5qBru.js";
import { G as GuestLayout } from "./GuestLayout-Cm8GKN8K.js";
import { a as VCard, d as VCardTitle, e as VCardText, f as VCardActions } from "./GuestLayout.vue_vue_type_script_lang-2s0GDYYy.js";
import { V as VTextField } from "./VTextField-vouJgQdh.js";
import { V as VBtn } from "./forwardRefs-B6F8wykm.js";
import "./AuthenticationCardLogo-D6E1IMSQ.js";
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
let ForgotPasswordPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "status");
    __publicField(this, "form", C({
      email: ""
    }));
  }
  async submit() {
    let res = await authService.forgotPassword(this.form);
    this.form.reset();
    Wr.visit(res.redirect || "/login");
  }
};
__decorateClass([
  decorator({ type: String })
], ForgotPasswordPage.prototype, "status", 2);
ForgotPasswordPage = __decorateClass([
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
      VBtn,
      VAlert
    }
  })
], ForgotPasswordPage);
const _sfc_main = toNative(ForgotPasswordPage);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_InputError = resolveComponent("InputError");
  const _component_AuthLayout = resolveComponent("AuthLayout");
  const _component_GuestLayout = resolveComponent("GuestLayout");
  return openBlock(), createBlock(_component_GuestLayout, { title: "Forgot Password" }, {
    default: withCtx(() => [
      createVNode(_component_AuthLayout, null, {
        default: withCtx(() => [
          createVNode(VCard, {
            class: "pa-6",
            elevation: "4",
            "max-width": "400"
          }, {
            default: withCtx(() => [
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  _cache[3] || (_cache[3] = createBaseVNode("p", { class: "text-body-2 mb-4" }, " Forgot your password? No problem. Enter your email address and we will send you a password reset link. ", -1)),
                  _ctx.status ? (openBlock(), createBlock(VAlert, {
                    key: 0,
                    type: "success",
                    dense: "",
                    class: "mb-4"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.status), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createBaseVNode("form", {
                    onSubmit: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.submit && _ctx.submit(...args), ["prevent"]))
                  }, [
                    createVNode(VTextField, {
                      modelValue: _ctx.form.email,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.form.email = $event),
                      label: "Email",
                      type: "email",
                      required: "",
                      autofocus: "",
                      autocomplete: "username"
                    }, null, 8, ["modelValue"]),
                    createVNode(_component_InputError, {
                      class: "mt-2",
                      message: _ctx.form.errors.email
                    }, null, 8, ["message"]),
                    createVNode(VCardActions, { class: "justify-end mt-4" }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          color: "primary",
                          variant: "elevated",
                          loading: _ctx.form.processing,
                          type: "submit"
                        }, {
                          default: withCtx(() => _cache[2] || (_cache[2] = [
                            createTextVNode(" Email Password Reset Link ")
                          ])),
                          _: 1
                        }, 8, ["loading"])
                      ]),
                      _: 1
                    })
                  ], 32)
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
const ForgotPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ForgotPassword as default
};
//# sourceMappingURL=ForgotPassword-DytQIK5s.js.map
