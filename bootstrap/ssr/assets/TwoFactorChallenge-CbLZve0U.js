var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { nextTick, resolveComponent, withCtx, createVNode, openBlock, createBlock, Fragment, createTextVNode, withModifiers, useSSRContext } from "vue";
import { useForm, router, Head } from "@inertiajs/vue3";
import { I as InputError } from "./InputError-BGOWAPan.js";
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BCaUMAMf.js";
import { VCard, VCardText, VCardTitle, VCardActions, VTextField, VLabel, VBtn, VSpacer } from "vuetify/components";
import { toNative, Vue, Ref, Component } from "vue-facing-decorator";
import { a as authService } from "./auth-CGQkd51U.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./axios-D4gWzKUO.js";
import { VBtn as VBtn$1 } from "vuetify/lib/components/VBtn/index.mjs";
import { VCard as VCard$1, VCardTitle as VCardTitle$1, VCardText as VCardText$1, VCardActions as VCardActions$1 } from "vuetify/lib/components/VCard/index.mjs";
import { VSpacer as VSpacer$1 } from "vuetify/lib/components/VGrid/index.mjs";
import { VLabel as VLabel$1 } from "vuetify/lib/components/VLabel/index.mjs";
import { VTextField as VTextField$1 } from "vuetify/lib/components/VTextField/index.mjs";
import "vuetify/lib/components/VAlert/index.mjs";
import "vuetify/lib/components/transitions/index.mjs";
import "./auth-DrKxFB6F.js";
import "pinia";
import "axios";
import "js-cookie";
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp2(target, key, result);
  return result;
};
let TwoFactorChallengePage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "recovery", false);
    __publicField(this, "form", useForm({
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
    router.visit(res.redirect || "/dashboard");
  }
};
__decorateClass([
  Ref("recoveryCodeInput")
], TwoFactorChallengePage.prototype, "recoveryCodeInput", 2);
__decorateClass([
  Ref("codeInput")
], TwoFactorChallengePage.prototype, "codeInput", 2);
TwoFactorChallengePage = __decorateClass([
  Component({
    components: {
      AuthenticationCardLogo: _sfc_main$1,
      InputError,
      VCard,
      VCardText,
      VCardTitle,
      VCardActions,
      VTextField,
      VLabel,
      VBtn,
      VSpacer,
      Head
    }
  })
], TwoFactorChallengePage);
const _sfc_main = toNative(TwoFactorChallengePage);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_AuthenticationCardLogo = resolveComponent("AuthenticationCardLogo");
  const _component_InputError = resolveComponent("InputError");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Two-factor Confirmation" }, null, _parent));
  _push(ssrRenderComponent(VCard$1, {
    class: "mx-auto",
    "max-width": "400",
    variant: "elevated",
    elevation: "6"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCardTitle$1, { class: "text-center" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_AuthenticationCardLogo, null, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_AuthenticationCardLogo)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VCardText$1, { class: "text-gray-600 dark:text-gray-400" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              if (!_ctx.recovery) {
                _push3(`<!--[--> Please confirm access to your account by entering the authentication code provided by your authenticator application. <!--]-->`);
              } else {
                _push3(`<!--[--> Please confirm access to your account by entering one of your emergency recovery codes. <!--]-->`);
              }
            } else {
              return [
                !_ctx.recovery ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createTextVNode(" Please confirm access to your account by entering the authentication code provided by your authenticator application. ")
                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createTextVNode(" Please confirm access to your account by entering one of your emergency recovery codes. ")
                ], 64))
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VCardText$1, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<form${_scopeId2}>`);
              if (!_ctx.recovery) {
                _push3(`<div${_scopeId2}>`);
                _push3(ssrRenderComponent(VLabel$1, { for: "code" }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`Code`);
                    } else {
                      return [
                        createTextVNode("Code")
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
                _push3(ssrRenderComponent(VTextField$1, {
                  id: "code",
                  ref: "codeInput",
                  modelValue: _ctx.form.code,
                  "onUpdate:modelValue": ($event) => _ctx.form.code = $event,
                  type: "text",
                  inputmode: "numeric",
                  variant: "outlined",
                  autocomplete: "one-time-code",
                  autofocus: ""
                }, null, _parent3, _scopeId2));
                _push3(ssrRenderComponent(_component_InputError, {
                  class: "mt-2",
                  message: _ctx.form.errors.code
                }, null, _parent3, _scopeId2));
                _push3(`</div>`);
              } else {
                _push3(`<div${_scopeId2}>`);
                _push3(ssrRenderComponent(VLabel$1, { for: "recovery_code" }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`Recovery Code`);
                    } else {
                      return [
                        createTextVNode("Recovery Code")
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
                _push3(ssrRenderComponent(VTextField$1, {
                  id: "recovery_code",
                  ref: "recoveryCodeInput",
                  modelValue: _ctx.form.recovery_code,
                  "onUpdate:modelValue": ($event) => _ctx.form.recovery_code = $event,
                  type: "text",
                  variant: "outlined",
                  autocomplete: "one-time-code"
                }, null, _parent3, _scopeId2));
                _push3(ssrRenderComponent(_component_InputError, {
                  class: "mt-2",
                  message: _ctx.form.errors.recovery_code
                }, null, _parent3, _scopeId2));
                _push3(`</div>`);
              }
              _push3(`</form>`);
            } else {
              return [
                createVNode("form", {
                  onSubmit: withModifiers(_ctx.submit, ["prevent"])
                }, [
                  !_ctx.recovery ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode(VLabel$1, { for: "code" }, {
                      default: withCtx(() => [
                        createTextVNode("Code")
                      ]),
                      _: 1
                    }),
                    createVNode(VTextField$1, {
                      id: "code",
                      ref: "codeInput",
                      modelValue: _ctx.form.code,
                      "onUpdate:modelValue": ($event) => _ctx.form.code = $event,
                      type: "text",
                      inputmode: "numeric",
                      variant: "outlined",
                      autocomplete: "one-time-code",
                      autofocus: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_InputError, {
                      class: "mt-2",
                      message: _ctx.form.errors.code
                    }, null, 8, ["message"])
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode(VLabel$1, { for: "recovery_code" }, {
                      default: withCtx(() => [
                        createTextVNode("Recovery Code")
                      ]),
                      _: 1
                    }),
                    createVNode(VTextField$1, {
                      id: "recovery_code",
                      ref: "recoveryCodeInput",
                      modelValue: _ctx.form.recovery_code,
                      "onUpdate:modelValue": ($event) => _ctx.form.recovery_code = $event,
                      type: "text",
                      variant: "outlined",
                      autocomplete: "one-time-code"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_InputError, {
                      class: "mt-2",
                      message: _ctx.form.errors.recovery_code
                    }, null, 8, ["message"])
                  ]))
                ], 40, ["onSubmit"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VCardActions$1, { class: "d-flex justify-end" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VBtn$1, {
                variant: "text",
                onClick: _ctx.toggleRecovery
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (!_ctx.recovery) {
                      _push4(`<!--[-->Use a recovery code<!--]-->`);
                    } else {
                      _push4(`<!--[-->Use an authentication code<!--]-->`);
                    }
                  } else {
                    return [
                      !_ctx.recovery ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createTextVNode("Use a recovery code")
                      ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                        createTextVNode("Use an authentication code")
                      ], 64))
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VSpacer$1, null, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VBtn$1, {
                color: "primary",
                variant: "elevated",
                loading: _ctx.form.processing,
                onClick: _ctx.submit
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Log in `);
                  } else {
                    return [
                      createTextVNode(" Log in ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VBtn$1, {
                  variant: "text",
                  onClick: withModifiers(_ctx.toggleRecovery, ["prevent"])
                }, {
                  default: withCtx(() => [
                    !_ctx.recovery ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createTextVNode("Use a recovery code")
                    ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createTextVNode("Use an authentication code")
                    ], 64))
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(VSpacer$1),
                createVNode(VBtn$1, {
                  color: "primary",
                  variant: "elevated",
                  loading: _ctx.form.processing,
                  onClick: _ctx.submit
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Log in ")
                  ]),
                  _: 1
                }, 8, ["loading", "onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VCardTitle$1, { class: "text-center" }, {
            default: withCtx(() => [
              createVNode(_component_AuthenticationCardLogo)
            ]),
            _: 1
          }),
          createVNode(VCardText$1, { class: "text-gray-600 dark:text-gray-400" }, {
            default: withCtx(() => [
              !_ctx.recovery ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createTextVNode(" Please confirm access to your account by entering the authentication code provided by your authenticator application. ")
              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                createTextVNode(" Please confirm access to your account by entering one of your emergency recovery codes. ")
              ], 64))
            ]),
            _: 1
          }),
          createVNode(VCardText$1, null, {
            default: withCtx(() => [
              createVNode("form", {
                onSubmit: withModifiers(_ctx.submit, ["prevent"])
              }, [
                !_ctx.recovery ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode(VLabel$1, { for: "code" }, {
                    default: withCtx(() => [
                      createTextVNode("Code")
                    ]),
                    _: 1
                  }),
                  createVNode(VTextField$1, {
                    id: "code",
                    ref: "codeInput",
                    modelValue: _ctx.form.code,
                    "onUpdate:modelValue": ($event) => _ctx.form.code = $event,
                    type: "text",
                    inputmode: "numeric",
                    variant: "outlined",
                    autocomplete: "one-time-code",
                    autofocus: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_InputError, {
                    class: "mt-2",
                    message: _ctx.form.errors.code
                  }, null, 8, ["message"])
                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode(VLabel$1, { for: "recovery_code" }, {
                    default: withCtx(() => [
                      createTextVNode("Recovery Code")
                    ]),
                    _: 1
                  }),
                  createVNode(VTextField$1, {
                    id: "recovery_code",
                    ref: "recoveryCodeInput",
                    modelValue: _ctx.form.recovery_code,
                    "onUpdate:modelValue": ($event) => _ctx.form.recovery_code = $event,
                    type: "text",
                    variant: "outlined",
                    autocomplete: "one-time-code"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_InputError, {
                    class: "mt-2",
                    message: _ctx.form.errors.recovery_code
                  }, null, 8, ["message"])
                ]))
              ], 40, ["onSubmit"])
            ]),
            _: 1
          }),
          createVNode(VCardActions$1, { class: "d-flex justify-end" }, {
            default: withCtx(() => [
              createVNode(VBtn$1, {
                variant: "text",
                onClick: withModifiers(_ctx.toggleRecovery, ["prevent"])
              }, {
                default: withCtx(() => [
                  !_ctx.recovery ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createTextVNode("Use a recovery code")
                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createTextVNode("Use an authentication code")
                  ], 64))
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(VSpacer$1),
              createVNode(VBtn$1, {
                color: "primary",
                variant: "elevated",
                loading: _ctx.form.processing,
                onClick: _ctx.submit
              }, {
                default: withCtx(() => [
                  createTextVNode(" Log in ")
                ]),
                _: 1
              }, 8, ["loading", "onClick"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/TwoFactorChallenge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TwoFactorChallenge = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  TwoFactorChallenge as default
};
