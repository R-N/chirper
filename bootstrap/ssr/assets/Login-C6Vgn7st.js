var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BCaUMAMf.js";
import { useForm, router, Head, Link } from "@inertiajs/vue3";
import { I as InputError } from "./InputError-BNQz4Gj5.js";
import { VTextField, VCheckbox, VBtn, VCard, VCardTitle, VCardText, VCardActions, VContainer, VRow, VCol, VImg } from "vuetify/components";
import { toNative, Vue, Prop, Component } from "vue-facing-decorator";
import { a as api, _ as _export_sfc } from "./axios-l-eSoL-p.js";
import { u as useAuthStore } from "./auth-DrKxFB6F.js";
import { resolveComponent, withCtx, createTextVNode, openBlock, createBlock, toDisplayString, createCommentVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { VBtn as VBtn$1 } from "vuetify/lib/components/VBtn/index.mjs";
import { VCard as VCard$1, VCardTitle as VCardTitle$1, VCardText as VCardText$1, VCardActions as VCardActions$1 } from "vuetify/lib/components/VCard/index.mjs";
import { VCheckbox as VCheckbox$1 } from "vuetify/lib/components/VCheckbox/index.mjs";
import { VContainer as VContainer$1 } from "vuetify/lib/components/VGrid/index.mjs";
import { VTextField as VTextField$1 } from "vuetify/lib/components/VTextField/index.mjs";
import "vuetify/lib/components/VAlert/index.mjs";
import "vuetify/lib/components/transitions/index.mjs";
import "axios";
import "js-cookie";
import "pinia";
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
let LoginPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "canResetPassword");
    __publicField(this, "status");
    __publicField(this, "form", useForm({
      email: "",
      password: "",
      remember: false
    }));
  }
  async login() {
    const authStore = useAuthStore();
    let form = this.form.transform((data) => ({
      ...data,
      remember: this.form.remember ? "on" : ""
    }));
    let res = await api.post("/login", form);
    this.form.reset("password");
    authStore.updateUser(res.data.user);
    authStore.setAuthToken(res.data.auth_token);
    router.visit(res.data.redirect || "/dashboard");
  }
};
__decorateClass([
  Prop(Boolean)
], LoginPage.prototype, "canResetPassword", 2);
__decorateClass([
  Prop(String)
], LoginPage.prototype, "status", 2);
LoginPage = __decorateClass([
  Component({
    components: {
      AuthenticationCardLogo: _sfc_main$1,
      Head,
      Link,
      VTextField,
      VCheckbox,
      VBtn,
      VCard,
      VCardTitle,
      VCardText,
      VCardActions,
      VContainer,
      VRow,
      VCol,
      VImg,
      InputError
    }
  })
], LoginPage);
const _sfc_main = toNative(LoginPage);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_AuthenticationCardLogo = resolveComponent("AuthenticationCardLogo");
  const _component_InputError = resolveComponent("InputError");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Log in" }, null, _parent));
  _push(ssrRenderComponent(VContainer$1, { class: "fill-height d-flex flex-column justify-center align-center" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_AuthenticationCardLogo, {
          justify: "center",
          align: "center",
          class: "mb-4"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(VCard$1, { class: "d-flex flex-column pa-6" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCardTitle$1, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Login `);
                  } else {
                    return [
                      createTextVNode(" Login ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardText$1, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (_ctx.status) {
                      _push4(`<div class="mb-4 text-green-600"${_scopeId3}>${ssrInterpolate(_ctx.status)}</div>`);
                    } else {
                      _push4(`<!---->`);
                    }
                    _push4(ssrRenderComponent(VTextField$1, {
                      modelValue: _ctx.form.email,
                      "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                      label: "Email",
                      type: "email",
                      name: "email",
                      autocomplete: "email",
                      required: "",
                      autofocus: ""
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_InputError, {
                      class: "mt-2",
                      message: _ctx.form.errors.email
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VTextField$1, {
                      modelValue: _ctx.form.password,
                      "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                      label: "Password",
                      type: "password",
                      name: "password",
                      autocomplete: "current-password",
                      required: ""
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_InputError, {
                      class: "mt-2",
                      message: _ctx.form.errors.password
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VCheckbox$1, {
                      modelValue: _ctx.form.remember,
                      "onUpdate:modelValue": ($event) => _ctx.form.remember = $event,
                      label: "Remember me",
                      density: "compact"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      _ctx.status ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-4 text-green-600"
                      }, toDisplayString(_ctx.status), 1)) : createCommentVNode("", true),
                      createVNode(VTextField$1, {
                        modelValue: _ctx.form.email,
                        "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                        label: "Email",
                        type: "email",
                        name: "email",
                        autocomplete: "email",
                        required: "",
                        autofocus: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_InputError, {
                        class: "mt-2",
                        message: _ctx.form.errors.email
                      }, null, 8, ["message"]),
                      createVNode(VTextField$1, {
                        modelValue: _ctx.form.password,
                        "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                        label: "Password",
                        type: "password",
                        name: "password",
                        autocomplete: "current-password",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_InputError, {
                        class: "mt-2",
                        message: _ctx.form.errors.password
                      }, null, 8, ["message"]),
                      createVNode(VCheckbox$1, {
                        modelValue: _ctx.form.remember,
                        "onUpdate:modelValue": ($event) => _ctx.form.remember = $event,
                        label: "Remember me",
                        density: "compact"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardActions$1, { class: "d-flex justify-space-between" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (_ctx.canResetPassword) {
                      _push4(ssrRenderComponent(_component_Link, {
                        href: _ctx.route("password.request"),
                        class: "text-sm"
                      }, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`Forgot password?`);
                          } else {
                            return [
                              createTextVNode("Forgot password?")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                    } else {
                      _push4(`<!---->`);
                    }
                    _push4(ssrRenderComponent(VBtn$1, {
                      loading: _ctx.form.isSubmitting,
                      onClick: _ctx.login,
                      color: "primary",
                      variant: "elevated"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Log in`);
                        } else {
                          return [
                            createTextVNode("Log in")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      _ctx.canResetPassword ? (openBlock(), createBlock(_component_Link, {
                        key: 0,
                        href: _ctx.route("password.request"),
                        class: "text-sm"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Forgot password?")
                        ]),
                        _: 1
                      }, 8, ["href"])) : createCommentVNode("", true),
                      createVNode(VBtn$1, {
                        loading: _ctx.form.isSubmitting,
                        onClick: _ctx.login,
                        color: "primary",
                        variant: "elevated"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Log in")
                        ]),
                        _: 1
                      }, 8, ["loading", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCardTitle$1, null, {
                  default: withCtx(() => [
                    createTextVNode(" Login ")
                  ]),
                  _: 1
                }),
                createVNode(VCardText$1, null, {
                  default: withCtx(() => [
                    _ctx.status ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-4 text-green-600"
                    }, toDisplayString(_ctx.status), 1)) : createCommentVNode("", true),
                    createVNode(VTextField$1, {
                      modelValue: _ctx.form.email,
                      "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                      label: "Email",
                      type: "email",
                      name: "email",
                      autocomplete: "email",
                      required: "",
                      autofocus: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_InputError, {
                      class: "mt-2",
                      message: _ctx.form.errors.email
                    }, null, 8, ["message"]),
                    createVNode(VTextField$1, {
                      modelValue: _ctx.form.password,
                      "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                      label: "Password",
                      type: "password",
                      name: "password",
                      autocomplete: "current-password",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_InputError, {
                      class: "mt-2",
                      message: _ctx.form.errors.password
                    }, null, 8, ["message"]),
                    createVNode(VCheckbox$1, {
                      modelValue: _ctx.form.remember,
                      "onUpdate:modelValue": ($event) => _ctx.form.remember = $event,
                      label: "Remember me",
                      density: "compact"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(VCardActions$1, { class: "d-flex justify-space-between" }, {
                  default: withCtx(() => [
                    _ctx.canResetPassword ? (openBlock(), createBlock(_component_Link, {
                      key: 0,
                      href: _ctx.route("password.request"),
                      class: "text-sm"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Forgot password?")
                      ]),
                      _: 1
                    }, 8, ["href"])) : createCommentVNode("", true),
                    createVNode(VBtn$1, {
                      loading: _ctx.form.isSubmitting,
                      onClick: _ctx.login,
                      color: "primary",
                      variant: "elevated"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Log in")
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
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_AuthenticationCardLogo, {
            justify: "center",
            align: "center",
            class: "mb-4"
          }),
          createVNode(VCard$1, { class: "d-flex flex-column pa-6" }, {
            default: withCtx(() => [
              createVNode(VCardTitle$1, null, {
                default: withCtx(() => [
                  createTextVNode(" Login ")
                ]),
                _: 1
              }),
              createVNode(VCardText$1, null, {
                default: withCtx(() => [
                  _ctx.status ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-4 text-green-600"
                  }, toDisplayString(_ctx.status), 1)) : createCommentVNode("", true),
                  createVNode(VTextField$1, {
                    modelValue: _ctx.form.email,
                    "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                    label: "Email",
                    type: "email",
                    name: "email",
                    autocomplete: "email",
                    required: "",
                    autofocus: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_InputError, {
                    class: "mt-2",
                    message: _ctx.form.errors.email
                  }, null, 8, ["message"]),
                  createVNode(VTextField$1, {
                    modelValue: _ctx.form.password,
                    "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                    label: "Password",
                    type: "password",
                    name: "password",
                    autocomplete: "current-password",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_InputError, {
                    class: "mt-2",
                    message: _ctx.form.errors.password
                  }, null, 8, ["message"]),
                  createVNode(VCheckbox$1, {
                    modelValue: _ctx.form.remember,
                    "onUpdate:modelValue": ($event) => _ctx.form.remember = $event,
                    label: "Remember me",
                    density: "compact"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(VCardActions$1, { class: "d-flex justify-space-between" }, {
                default: withCtx(() => [
                  _ctx.canResetPassword ? (openBlock(), createBlock(_component_Link, {
                    key: 0,
                    href: _ctx.route("password.request"),
                    class: "text-sm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Forgot password?")
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true),
                  createVNode(VBtn$1, {
                    loading: _ctx.form.isSubmitting,
                    onClick: _ctx.login,
                    color: "primary",
                    variant: "elevated"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Log in")
                    ]),
                    _: 1
                  }, 8, ["loading", "onClick"])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Login = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Login as default
};
