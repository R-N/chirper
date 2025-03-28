var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BCaUMAMf.js";
import { useForm, router, Head, Link } from "@inertiajs/vue3";
import { I as InputError } from "./InputError-BNQz4Gj5.js";
import { VTextField, VCheckbox, VBtn, VCard, VCardTitle, VCardText, VCardActions, VContainer, VRow, VCol, VImg } from "vuetify/components";
import { toNative, Vue, Component } from "vue-facing-decorator";
import { a as api, _ as _export_sfc } from "./axios-l-eSoL-p.js";
import { u as useAuthStore } from "./auth-DrKxFB6F.js";
import { resolveComponent, withCtx, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
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
let RegisterPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "form", useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      terms: false
    }));
  }
  async register() {
    const authStore = useAuthStore();
    let res = await api.post("/register", this.form);
    this.form.reset("password", "password_confirmation");
    authStore.updateUser(res.data.user);
    authStore.setAuthToken(res.data.auth_token);
    router.visit(res.data.redirect || "/dashboard");
  }
};
RegisterPage = __decorateClass([
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
], RegisterPage);
const _sfc_main = toNative(RegisterPage);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_AuthenticationCardLogo = resolveComponent("AuthenticationCardLogo");
  const _component_InputError = resolveComponent("InputError");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Register" }, null, _parent));
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
                    _push4(` Register `);
                  } else {
                    return [
                      createTextVNode(" Register ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardText$1, { class: "d-flex flex-column pa-0 ga-2" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField$1, {
                      modelValue: _ctx.form.name,
                      "onUpdate:modelValue": ($event) => _ctx.form.name = $event,
                      label: "Name",
                      type: "text",
                      name: "name",
                      autocomplete: "name",
                      required: "",
                      autofocus: ""
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_InputError, {
                      class: "mt-2",
                      message: _ctx.form.errors.name
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VTextField$1, {
                      modelValue: _ctx.form.email,
                      "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                      label: "Email",
                      type: "email",
                      name: "email",
                      autocomplete: "email",
                      required: ""
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
                      autocomplete: "new-password",
                      required: ""
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_InputError, {
                      class: "mt-2",
                      message: _ctx.form.errors.password
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VTextField$1, {
                      modelValue: _ctx.form.password_confirmation,
                      "onUpdate:modelValue": ($event) => _ctx.form.password_confirmation = $event,
                      label: "Confirm Password",
                      type: "password",
                      required: ""
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_InputError, {
                      class: "mt-2",
                      message: _ctx.form.errors.password_confirmation
                    }, null, _parent4, _scopeId3));
                    if (_ctx.$page.props.jetstream.hasTermsAndPrivacyPolicyFeature) {
                      _push4(ssrRenderComponent(VCheckbox$1, {
                        modelValue: _ctx.form.terms,
                        "onUpdate:modelValue": ($event) => _ctx.form.terms = $event
                      }, {
                        label: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(` I agree to the `);
                            _push5(ssrRenderComponent(_component_Link, {
                              target: "_blank",
                              href: _ctx.route("terms.show"),
                              class: "text-primary"
                            }, {
                              default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(`Terms of Service`);
                                } else {
                                  return [
                                    createTextVNode("Terms of Service")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent5, _scopeId4));
                            _push5(` and `);
                            _push5(ssrRenderComponent(_component_Link, {
                              target: "_blank",
                              href: _ctx.route("policy.show"),
                              class: "text-primary"
                            }, {
                              default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(`Privacy Policy`);
                                } else {
                                  return [
                                    createTextVNode("Privacy Policy")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent5, _scopeId4));
                          } else {
                            return [
                              createTextVNode(" I agree to the "),
                              createVNode(_component_Link, {
                                target: "_blank",
                                href: _ctx.route("terms.show"),
                                class: "text-primary"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Terms of Service")
                                ]),
                                _: 1
                              }, 8, ["href"]),
                              createTextVNode(" and "),
                              createVNode(_component_Link, {
                                target: "_blank",
                                href: _ctx.route("policy.show"),
                                class: "text-primary"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Privacy Policy")
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                    } else {
                      _push4(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode(VTextField$1, {
                        modelValue: _ctx.form.name,
                        "onUpdate:modelValue": ($event) => _ctx.form.name = $event,
                        label: "Name",
                        type: "text",
                        name: "name",
                        autocomplete: "name",
                        required: "",
                        autofocus: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_InputError, {
                        class: "mt-2",
                        message: _ctx.form.errors.name
                      }, null, 8, ["message"]),
                      createVNode(VTextField$1, {
                        modelValue: _ctx.form.email,
                        "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                        label: "Email",
                        type: "email",
                        name: "email",
                        autocomplete: "email",
                        required: ""
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
                        autocomplete: "new-password",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_InputError, {
                        class: "mt-2",
                        message: _ctx.form.errors.password
                      }, null, 8, ["message"]),
                      createVNode(VTextField$1, {
                        modelValue: _ctx.form.password_confirmation,
                        "onUpdate:modelValue": ($event) => _ctx.form.password_confirmation = $event,
                        label: "Confirm Password",
                        type: "password",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_InputError, {
                        class: "mt-2",
                        message: _ctx.form.errors.password_confirmation
                      }, null, 8, ["message"]),
                      _ctx.$page.props.jetstream.hasTermsAndPrivacyPolicyFeature ? (openBlock(), createBlock(VCheckbox$1, {
                        key: 0,
                        modelValue: _ctx.form.terms,
                        "onUpdate:modelValue": ($event) => _ctx.form.terms = $event
                      }, {
                        label: withCtx(() => [
                          createTextVNode(" I agree to the "),
                          createVNode(_component_Link, {
                            target: "_blank",
                            href: _ctx.route("terms.show"),
                            class: "text-primary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Terms of Service")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createTextVNode(" and "),
                          createVNode(_component_Link, {
                            target: "_blank",
                            href: _ctx.route("policy.show"),
                            class: "text-primary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Privacy Policy")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardActions$1, { class: "d-flex justify-space-between" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_Link, {
                      href: _ctx.route("login"),
                      class: "text-sm"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Already registered?`);
                        } else {
                          return [
                            createTextVNode("Already registered?")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VBtn$1, {
                      loading: _ctx.form.processing,
                      onClick: _ctx.register,
                      color: "primary",
                      variant: "elevated"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Register`);
                        } else {
                          return [
                            createTextVNode("Register")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_Link, {
                        href: _ctx.route("login"),
                        class: "text-sm"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Already registered?")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(VBtn$1, {
                        loading: _ctx.form.processing,
                        onClick: _ctx.register,
                        color: "primary",
                        variant: "elevated"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Register")
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
                    createTextVNode(" Register ")
                  ]),
                  _: 1
                }),
                createVNode(VCardText$1, { class: "d-flex flex-column pa-0 ga-2" }, {
                  default: withCtx(() => [
                    createVNode(VTextField$1, {
                      modelValue: _ctx.form.name,
                      "onUpdate:modelValue": ($event) => _ctx.form.name = $event,
                      label: "Name",
                      type: "text",
                      name: "name",
                      autocomplete: "name",
                      required: "",
                      autofocus: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_InputError, {
                      class: "mt-2",
                      message: _ctx.form.errors.name
                    }, null, 8, ["message"]),
                    createVNode(VTextField$1, {
                      modelValue: _ctx.form.email,
                      "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                      label: "Email",
                      type: "email",
                      name: "email",
                      autocomplete: "email",
                      required: ""
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
                      autocomplete: "new-password",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_InputError, {
                      class: "mt-2",
                      message: _ctx.form.errors.password
                    }, null, 8, ["message"]),
                    createVNode(VTextField$1, {
                      modelValue: _ctx.form.password_confirmation,
                      "onUpdate:modelValue": ($event) => _ctx.form.password_confirmation = $event,
                      label: "Confirm Password",
                      type: "password",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_InputError, {
                      class: "mt-2",
                      message: _ctx.form.errors.password_confirmation
                    }, null, 8, ["message"]),
                    _ctx.$page.props.jetstream.hasTermsAndPrivacyPolicyFeature ? (openBlock(), createBlock(VCheckbox$1, {
                      key: 0,
                      modelValue: _ctx.form.terms,
                      "onUpdate:modelValue": ($event) => _ctx.form.terms = $event
                    }, {
                      label: withCtx(() => [
                        createTextVNode(" I agree to the "),
                        createVNode(_component_Link, {
                          target: "_blank",
                          href: _ctx.route("terms.show"),
                          class: "text-primary"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Terms of Service")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createTextVNode(" and "),
                        createVNode(_component_Link, {
                          target: "_blank",
                          href: _ctx.route("policy.show"),
                          class: "text-primary"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Privacy Policy")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode(VCardActions$1, { class: "d-flex justify-space-between" }, {
                  default: withCtx(() => [
                    createVNode(_component_Link, {
                      href: _ctx.route("login"),
                      class: "text-sm"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Already registered?")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(VBtn$1, {
                      loading: _ctx.form.processing,
                      onClick: _ctx.register,
                      color: "primary",
                      variant: "elevated"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Register")
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
                  createTextVNode(" Register ")
                ]),
                _: 1
              }),
              createVNode(VCardText$1, { class: "d-flex flex-column pa-0 ga-2" }, {
                default: withCtx(() => [
                  createVNode(VTextField$1, {
                    modelValue: _ctx.form.name,
                    "onUpdate:modelValue": ($event) => _ctx.form.name = $event,
                    label: "Name",
                    type: "text",
                    name: "name",
                    autocomplete: "name",
                    required: "",
                    autofocus: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_InputError, {
                    class: "mt-2",
                    message: _ctx.form.errors.name
                  }, null, 8, ["message"]),
                  createVNode(VTextField$1, {
                    modelValue: _ctx.form.email,
                    "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                    label: "Email",
                    type: "email",
                    name: "email",
                    autocomplete: "email",
                    required: ""
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
                    autocomplete: "new-password",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_InputError, {
                    class: "mt-2",
                    message: _ctx.form.errors.password
                  }, null, 8, ["message"]),
                  createVNode(VTextField$1, {
                    modelValue: _ctx.form.password_confirmation,
                    "onUpdate:modelValue": ($event) => _ctx.form.password_confirmation = $event,
                    label: "Confirm Password",
                    type: "password",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_InputError, {
                    class: "mt-2",
                    message: _ctx.form.errors.password_confirmation
                  }, null, 8, ["message"]),
                  _ctx.$page.props.jetstream.hasTermsAndPrivacyPolicyFeature ? (openBlock(), createBlock(VCheckbox$1, {
                    key: 0,
                    modelValue: _ctx.form.terms,
                    "onUpdate:modelValue": ($event) => _ctx.form.terms = $event
                  }, {
                    label: withCtx(() => [
                      createTextVNode(" I agree to the "),
                      createVNode(_component_Link, {
                        target: "_blank",
                        href: _ctx.route("terms.show"),
                        class: "text-primary"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Terms of Service")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createTextVNode(" and "),
                      createVNode(_component_Link, {
                        target: "_blank",
                        href: _ctx.route("policy.show"),
                        class: "text-primary"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Privacy Policy")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(VCardActions$1, { class: "d-flex justify-space-between" }, {
                default: withCtx(() => [
                  createVNode(_component_Link, {
                    href: _ctx.route("login"),
                    class: "text-sm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Already registered?")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(VBtn$1, {
                    loading: _ctx.form.processing,
                    onClick: _ctx.register,
                    color: "primary",
                    variant: "elevated"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Register")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Register = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Register as default
};
