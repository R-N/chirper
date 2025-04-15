var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { I as InputError } from "./InputError-ytemAFXd.js";
import { t as toNative, V as Vue, C, aA as Wr, ar as decorator, b as Component, _ as _export_sfc, r as resolveComponent, c as createBlock, w as withCtx, o as openBlock, e as createVNode, g as createBaseVNode, h as createTextVNode, i as withModifiers } from "./app-DDBQLYRK.js";
import { a as authService } from "./Auth.vue_vue_type_script_lang-BqrvBsHH.js";
import { A as AuthLayout } from "./Auth-C7Z5qBru.js";
import { G as GuestLayout } from "./GuestLayout-Cm8GKN8K.js";
import { a as VCard, e as VCardText, d as VCardTitle } from "./GuestLayout.vue_vue_type_script_lang-2s0GDYYy.js";
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
let ConfirmPasswordPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "form", C({
      password: ""
    }));
    __publicField(this, "passwordInput");
  }
  async submit() {
    let res = await authService.confirmPassword(this.form);
    this.form.reset();
    this.passwordInput.value.focus();
    Wr.visit(res.redirect || "/login");
  }
};
__decorateClass([
  decorator("passwordInput")
], ConfirmPasswordPage.prototype, "passwordInput", 2);
ConfirmPasswordPage = __decorateClass([
  Component({
    components: {
      AuthLayout,
      GuestLayout,
      VCard,
      VCardText,
      VCardTitle,
      VTextField,
      VBtn,
      InputError
    }
  })
], ConfirmPasswordPage);
const _sfc_main = toNative(ConfirmPasswordPage);
const _hoisted_1 = { class: "d-flex justify-end mt-4" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AuthLayout = resolveComponent("AuthLayout");
  const _component_GuestLayout = resolveComponent("GuestLayout");
  return openBlock(), createBlock(_component_GuestLayout, { title: "Secure Area" }, {
    default: withCtx(() => [
      createVNode(_component_AuthLayout, null, {
        default: withCtx(() => [
          createVNode(VCard, {
            elevation: "4",
            class: "pa-6",
            "max-width": "400"
          }, {
            default: withCtx(() => [
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  _cache[3] || (_cache[3] = createBaseVNode("p", { class: "mb-4 text-grey-darken-1" }, " This is a secure area of the application. Please confirm your password before continuing. ", -1)),
                  createBaseVNode("form", {
                    onSubmit: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.submit && _ctx.submit(...args), ["prevent"]))
                  }, [
                    createVNode(VTextField, {
                      id: "password",
                      ref: "passwordInput",
                      modelValue: _ctx.form.password,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.form.password = $event),
                      label: "Password",
                      type: "password",
                      variant: "outlined",
                      required: "",
                      autocomplete: "current-password",
                      "error-messages": _ctx.form.errors.password
                    }, null, 8, ["modelValue", "error-messages"]),
                    createBaseVNode("div", _hoisted_1, [
                      createVNode(VBtn, {
                        color: "primary",
                        variant: "elevated",
                        type: "submit",
                        loading: _ctx.form.processing
                      }, {
                        default: withCtx(() => _cache[2] || (_cache[2] = [
                          createTextVNode(" Confirm ")
                        ])),
                        _: 1
                      }, 8, ["loading"])
                    ])
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
const ConfirmPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ConfirmPassword as default
};
//# sourceMappingURL=ConfirmPassword-BYBZTs9h.js.map
