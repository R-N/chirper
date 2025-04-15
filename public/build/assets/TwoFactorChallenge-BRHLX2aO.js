var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { t as toNative, V as Vue, C, z as nextTick, aA as Wr, ar as decorator, b as Component, aB as me, _ as _export_sfc, r as resolveComponent, c as createBlock, w as withCtx, o as openBlock, e as createVNode, j as createElementBlock, h as createTextVNode, F as Fragment, g as createBaseVNode, i as withModifiers } from "./app-DDBQLYRK.js";
import { I as InputError, f as VLabel } from "./InputError-ytemAFXd.js";
import { a as authService } from "./Auth.vue_vue_type_script_lang-BqrvBsHH.js";
import { A as AuthLayout } from "./Auth-C7Z5qBru.js";
import { G as GuestLayout } from "./GuestLayout-Cm8GKN8K.js";
import { a as VCard, e as VCardText, d as VCardTitle, f as VCardActions, c as VSpacer } from "./GuestLayout.vue_vue_type_script_lang-2s0GDYYy.js";
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
let TwoFactorChallengePage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "recovery", false);
    __publicField(this, "form", C({
      code: "",
      recovery_code: ""
    }));
    __publicField(this, "recoveryCodeInput");
    __publicField(this, "codeInput");
  }
  async toggleRecovery() {
    this.recovery = !this.recovery;
    await nextTick();
    if (this.recovery) {
      this.recoveryCodeInput.value.focus();
      this.form.code = "";
    } else {
      this.codeInput.value.focus();
      this.form.recovery_code = "";
    }
  }
  async submit() {
    let res = await authService.twoFactorLogin(this.form);
    Wr.visit(res.redirect || "/dashboard");
  }
};
__decorateClass([
  decorator("recoveryCodeInput")
], TwoFactorChallengePage.prototype, "recoveryCodeInput", 2);
__decorateClass([
  decorator("codeInput")
], TwoFactorChallengePage.prototype, "codeInput", 2);
TwoFactorChallengePage = __decorateClass([
  Component({
    components: {
      AuthLayout,
      GuestLayout,
      InputError,
      VCard,
      VCardText,
      VCardTitle,
      VCardActions,
      VTextField,
      VLabel,
      VBtn,
      VSpacer,
      Head: me
    }
  })
], TwoFactorChallengePage);
const _sfc_main = toNative(TwoFactorChallengePage);
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_InputError = resolveComponent("InputError");
  const _component_AuthLayout = resolveComponent("AuthLayout");
  const _component_GuestLayout = resolveComponent("GuestLayout");
  return openBlock(), createBlock(_component_GuestLayout, { title: "Two-factor Confirmation" }, {
    default: withCtx(() => [
      createVNode(_component_AuthLayout, null, {
        default: withCtx(() => [
          createVNode(VCard, {
            class: "mx-auto",
            "max-width": "400",
            variant: "elevated",
            elevation: "6"
          }, {
            default: withCtx(() => [
              createVNode(VCardText, { class: "text-gray-600 dark:text-gray-400" }, {
                default: withCtx(() => [
                  !_ctx.recovery ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createTextVNode(" Please confirm access to your account by entering the authentication code provided by your authenticator application. ")
                  ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(" Please confirm access to your account by entering one of your emergency recovery codes. ")
                  ], 64))
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createBaseVNode("form", {
                    onSubmit: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.submit && _ctx.submit(...args), ["prevent"]))
                  }, [
                    !_ctx.recovery ? (openBlock(), createElementBlock("div", _hoisted_1, [
                      createVNode(VLabel, { for: "code" }, {
                        default: withCtx(() => _cache[3] || (_cache[3] = [
                          createTextVNode("Code")
                        ])),
                        _: 1
                      }),
                      createVNode(VTextField, {
                        id: "code",
                        ref: "codeInput",
                        modelValue: _ctx.form.code,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.form.code = $event),
                        type: "text",
                        inputmode: "numeric",
                        variant: "outlined",
                        autocomplete: "one-time-code",
                        autofocus: ""
                      }, null, 8, ["modelValue"]),
                      createVNode(_component_InputError, {
                        class: "mt-2",
                        message: _ctx.form.errors.code
                      }, null, 8, ["message"])
                    ])) : (openBlock(), createElementBlock("div", _hoisted_2, [
                      createVNode(VLabel, { for: "recovery_code" }, {
                        default: withCtx(() => _cache[4] || (_cache[4] = [
                          createTextVNode("Recovery Code")
                        ])),
                        _: 1
                      }),
                      createVNode(VTextField, {
                        id: "recovery_code",
                        ref: "recoveryCodeInput",
                        modelValue: _ctx.form.recovery_code,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.form.recovery_code = $event),
                        type: "text",
                        variant: "outlined",
                        autocomplete: "one-time-code"
                      }, null, 8, ["modelValue"]),
                      createVNode(_component_InputError, {
                        class: "mt-2",
                        message: _ctx.form.errors.recovery_code
                      }, null, 8, ["message"])
                    ]))
                  ], 32)
                ]),
                _: 1
              }),
              createVNode(VCardActions, { class: "d-flex justify-end" }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    variant: "text",
                    onClick: withModifiers(_ctx.toggleRecovery, ["prevent"])
                  }, {
                    default: withCtx(() => [
                      !_ctx.recovery ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                        createTextVNode("Use a recovery code")
                      ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        createTextVNode("Use an authentication code")
                      ], 64))
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(VSpacer),
                  createVNode(VBtn, {
                    color: "primary",
                    variant: "elevated",
                    loading: _ctx.form.processing,
                    onClick: _ctx.submit
                  }, {
                    default: withCtx(() => _cache[5] || (_cache[5] = [
                      createTextVNode(" Log in ")
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
const TwoFactorChallenge = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  TwoFactorChallenge as default
};
//# sourceMappingURL=TwoFactorChallenge-BRHLX2aO.js.map
