var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BCaUMAMf.js";
import { I as InputError } from "./InputError-BGOWAPan.js";
import { useForm, router, Head } from "@inertiajs/vue3";
import { VCard, VCardTitle, VCardText, VCardActions, VTextField, VBtn, VAlert } from "vuetify/components";
import { toNative, Vue, Prop, Component } from "vue-facing-decorator";
import { a as authService } from "./auth-CGQkd51U.js";
import { resolveComponent, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./axios-D4gWzKUO.js";
import { VAlert as VAlert$1 } from "vuetify/lib/components/VAlert/index.mjs";
import { VBtn as VBtn$1 } from "vuetify/lib/components/VBtn/index.mjs";
import { VCard as VCard$1, VCardTitle as VCardTitle$1, VCardText as VCardText$1, VCardActions as VCardActions$1 } from "vuetify/lib/components/VCard/index.mjs";
import { VTextField as VTextField$1 } from "vuetify/lib/components/VTextField/index.mjs";
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
let ForgotPasswordPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "status");
    __publicField(this, "form", useForm({
      email: ""
    }));
  }
  async submit() {
    let res = await authService.forgotPassword(this.form);
    this.form.reset();
    router.visit(res.redirect || "/login");
  }
};
__decorateClass([
  Prop(String)
], ForgotPasswordPage.prototype, "status", 2);
ForgotPasswordPage = __decorateClass([
  Component({
    components: {
      AuthenticationCardLogo: _sfc_main$1,
      InputError,
      Head,
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
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_AuthenticationCardLogo = resolveComponent("AuthenticationCardLogo");
  const _component_InputError = resolveComponent("InputError");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Forgot Password" }, null, _parent));
  _push(`<div class="d-flex justify-center align-center min-vh-100">`);
  _push(ssrRenderComponent(VCard$1, {
    class: "pa-6",
    elevation: "4",
    "max-width": "400"
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
        _push2(ssrRenderComponent(VCardText$1, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p class="text-body-2 mb-4"${_scopeId2}> Forgot your password? No problem. Enter your email address and we will send you a password reset link. </p>`);
              if (_ctx.status) {
                _push3(ssrRenderComponent(VAlert$1, {
                  type: "success",
                  dense: "",
                  class: "mb-4"
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`${ssrInterpolate(_ctx.status)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(_ctx.status), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                _push3(`<!---->`);
              }
              _push3(`<form${_scopeId2}>`);
              _push3(ssrRenderComponent(VTextField$1, {
                modelValue: _ctx.form.email,
                "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                label: "Email",
                type: "email",
                required: "",
                autofocus: "",
                autocomplete: "username"
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_InputError, {
                class: "mt-2",
                message: _ctx.form.errors.email
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardActions$1, { class: "justify-end mt-4" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VBtn$1, {
                      color: "primary",
                      variant: "elevated",
                      loading: _ctx.form.processing,
                      type: "submit"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(` Email Password Reset Link `);
                        } else {
                          return [
                            createTextVNode(" Email Password Reset Link ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VBtn$1, {
                        color: "primary",
                        variant: "elevated",
                        loading: _ctx.form.processing,
                        type: "submit"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Email Password Reset Link ")
                        ]),
                        _: 1
                      }, 8, ["loading"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</form>`);
            } else {
              return [
                createVNode("p", { class: "text-body-2 mb-4" }, " Forgot your password? No problem. Enter your email address and we will send you a password reset link. "),
                _ctx.status ? (openBlock(), createBlock(VAlert$1, {
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
                createVNode("form", {
                  onSubmit: withModifiers(_ctx.submit, ["prevent"])
                }, [
                  createVNode(VTextField$1, {
                    modelValue: _ctx.form.email,
                    "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                    label: "Email",
                    type: "email",
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_InputError, {
                    class: "mt-2",
                    message: _ctx.form.errors.email
                  }, null, 8, ["message"]),
                  createVNode(VCardActions$1, { class: "justify-end mt-4" }, {
                    default: withCtx(() => [
                      createVNode(VBtn$1, {
                        color: "primary",
                        variant: "elevated",
                        loading: _ctx.form.processing,
                        type: "submit"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Email Password Reset Link ")
                        ]),
                        _: 1
                      }, 8, ["loading"])
                    ]),
                    _: 1
                  })
                ], 40, ["onSubmit"])
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
          createVNode(VCardText$1, null, {
            default: withCtx(() => [
              createVNode("p", { class: "text-body-2 mb-4" }, " Forgot your password? No problem. Enter your email address and we will send you a password reset link. "),
              _ctx.status ? (openBlock(), createBlock(VAlert$1, {
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
              createVNode("form", {
                onSubmit: withModifiers(_ctx.submit, ["prevent"])
              }, [
                createVNode(VTextField$1, {
                  modelValue: _ctx.form.email,
                  "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                  label: "Email",
                  type: "email",
                  required: "",
                  autofocus: "",
                  autocomplete: "username"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_InputError, {
                  class: "mt-2",
                  message: _ctx.form.errors.email
                }, null, 8, ["message"]),
                createVNode(VCardActions$1, { class: "justify-end mt-4" }, {
                  default: withCtx(() => [
                    createVNode(VBtn$1, {
                      color: "primary",
                      variant: "elevated",
                      loading: _ctx.form.processing,
                      type: "submit"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Email Password Reset Link ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ]),
                  _: 1
                })
              ], 40, ["onSubmit"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ForgotPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  ForgotPassword as default
};
