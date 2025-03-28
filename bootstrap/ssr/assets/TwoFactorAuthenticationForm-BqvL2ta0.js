var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { useForm, usePage } from "@inertiajs/vue3";
import { A as ActionSection } from "./ActionSection-VPAMaknK.js";
import { Prop, Ref, Component, toNative, Vue, Watch } from "vue-facing-decorator";
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VTextField, VBtn, VRow, VCol, VAlert } from "vuetify/components";
import { a as api, _ as _export_sfc } from "./axios-l-eSoL-p.js";
import { useSSRContext, withCtx, createTextVNode, toDisplayString, createVNode, withKeys, openBlock, createBlock, createCommentVNode, resolveComponent, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { VBtn as VBtn$1 } from "vuetify/lib/components/VBtn/index.mjs";
import { VCard as VCard$1, VCardTitle as VCardTitle$1, VCardText as VCardText$1, VCardActions as VCardActions$1 } from "vuetify/lib/components/VCard/index.mjs";
import { VDialog as VDialog$1 } from "vuetify/lib/components/VDialog/index.mjs";
import { VTextField as VTextField$1 } from "vuetify/lib/components/VTextField/index.mjs";
import { I as InputError } from "./InputError-BNQz4Gj5.js";
import { VAlert as VAlert$1 } from "vuetify/lib/components/VAlert/index.mjs";
import { VRow as VRow$1, VCol as VCol$1 } from "vuetify/lib/components/VGrid/index.mjs";
import "./SectionTitle-DOkVpph5.js";
import "axios";
import "js-cookie";
import "vuetify/lib/components/transitions/index.mjs";
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let ConfirmPassword = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "title");
    __publicField(this, "content");
    __publicField(this, "button");
    __publicField(this, "confirmingPassword", false);
    __publicField(this, "form", useForm({
      password: "",
      error: "",
      processing: false
    }));
    __publicField(this, "passwordInput");
  }
  async startConfirmingPassword() {
    const response = await api.get(route("password.confirmation"));
    if (response.data.confirmed) {
      this.$emit("confirmed");
    } else {
      this.confirmingPassword = true;
      setTimeout(() => {
        var _a;
        return (_a = this.passwordInput) == null ? void 0 : _a.focus();
      }, 250);
    }
  }
  async confirmPassword() {
    this.form.processing = true;
    try {
      await api.post(route("password.confirm"), {
        password: this.form.password
      });
      this.form.processing = false;
      this.closeModal();
      this.$nextTick(() => this.$emit("confirmed"));
    } catch (error) {
      this.form.processing = false;
      this.form.error = error.response.data.errors.password[0];
      this.passwordInput.focus();
    }
  }
  closeModal() {
    this.confirmingPassword = false;
    this.form.password = "";
    this.form.error = "";
  }
};
__decorateClass$1([
  Prop({ type: String, default: "Confirm Password" })
], ConfirmPassword.prototype, "title", 2);
__decorateClass$1([
  Prop({ type: String, default: "For your security, please confirm your password to continue." })
], ConfirmPassword.prototype, "content", 2);
__decorateClass$1([
  Prop({ type: String, default: "Confirm" })
], ConfirmPassword.prototype, "button", 2);
__decorateClass$1([
  Ref("passwordInput")
], ConfirmPassword.prototype, "passwordInput", 2);
ConfirmPassword = __decorateClass$1([
  Component({
    components: {
      VDialog,
      VCard,
      VCardTitle,
      VCardText,
      VCardActions,
      VTextField,
      VBtn
    }
  })
], ConfirmPassword);
const _sfc_main$1 = toNative(ConfirmPassword);
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<span${ssrRenderAttrs(_attrs)}><span>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</span>`);
  _push(ssrRenderComponent(VDialog$1, {
    modelValue: _ctx.confirmingPassword,
    "onUpdate:modelValue": ($event) => _ctx.confirmingPassword = $event,
    persistent: "",
    "max-width": "400px"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCard$1, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCardTitle$1, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate(_ctx.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.title), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardText$1, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate(_ctx.content)} `);
                    _push4(ssrRenderComponent(VTextField$1, {
                      ref: "passwordInput",
                      modelValue: _ctx.form.password,
                      "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                      type: "password",
                      class: "mt-4",
                      placeholder: "Password",
                      autocomplete: "current-password",
                      onKeyup: _ctx.confirmPassword,
                      variant: "outlined"
                    }, null, _parent4, _scopeId3));
                    if (_ctx.form.error) {
                      _push4(`<p class="text-error mt-2"${_scopeId3}>${ssrInterpolate(_ctx.form.error)}</p>`);
                    } else {
                      _push4(`<!---->`);
                    }
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.content) + " ", 1),
                      createVNode(VTextField$1, {
                        ref: "passwordInput",
                        modelValue: _ctx.form.password,
                        "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                        type: "password",
                        class: "mt-4",
                        placeholder: "Password",
                        autocomplete: "current-password",
                        onKeyup: withKeys(_ctx.confirmPassword, ["enter"]),
                        variant: "outlined"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                      _ctx.form.error ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-error mt-2"
                      }, toDisplayString(_ctx.form.error), 1)) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardActions$1, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VBtn$1, {
                      variant: "text",
                      onClick: _ctx.closeModal
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Cancel`);
                        } else {
                          return [
                            createTextVNode("Cancel")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VBtn$1, {
                      color: "primary",
                      variant: "elevated",
                      loading: _ctx.form.processing,
                      onClick: _ctx.confirmPassword
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`${ssrInterpolate(_ctx.button)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(_ctx.button), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VBtn$1, {
                        variant: "text",
                        onClick: _ctx.closeModal
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancel")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VBtn$1, {
                        color: "primary",
                        variant: "elevated",
                        loading: _ctx.form.processing,
                        onClick: _ctx.confirmPassword
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.button), 1)
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
                    createTextVNode(toDisplayString(_ctx.title), 1)
                  ]),
                  _: 1
                }),
                createVNode(VCardText$1, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.content) + " ", 1),
                    createVNode(VTextField$1, {
                      ref: "passwordInput",
                      modelValue: _ctx.form.password,
                      "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                      type: "password",
                      class: "mt-4",
                      placeholder: "Password",
                      autocomplete: "current-password",
                      onKeyup: withKeys(_ctx.confirmPassword, ["enter"]),
                      variant: "outlined"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                    _ctx.form.error ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-error mt-2"
                    }, toDisplayString(_ctx.form.error), 1)) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode(VCardActions$1, null, {
                  default: withCtx(() => [
                    createVNode(VBtn$1, {
                      variant: "text",
                      onClick: _ctx.closeModal
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Cancel")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(VBtn$1, {
                      color: "primary",
                      variant: "elevated",
                      loading: _ctx.form.processing,
                      onClick: _ctx.confirmPassword
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.button), 1)
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
          createVNode(VCard$1, null, {
            default: withCtx(() => [
              createVNode(VCardTitle$1, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.title), 1)
                ]),
                _: 1
              }),
              createVNode(VCardText$1, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.content) + " ", 1),
                  createVNode(VTextField$1, {
                    ref: "passwordInput",
                    modelValue: _ctx.form.password,
                    "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                    type: "password",
                    class: "mt-4",
                    placeholder: "Password",
                    autocomplete: "current-password",
                    onKeyup: withKeys(_ctx.confirmPassword, ["enter"]),
                    variant: "outlined"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                  _ctx.form.error ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-error mt-2"
                  }, toDisplayString(_ctx.form.error), 1)) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(VCardActions$1, null, {
                default: withCtx(() => [
                  createVNode(VBtn$1, {
                    variant: "text",
                    onClick: _ctx.closeModal
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Cancel")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(VBtn$1, {
                    color: "primary",
                    variant: "elevated",
                    loading: _ctx.form.processing,
                    onClick: _ctx.confirmPassword
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.button), 1)
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
  _push(`</span>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ConfirmsPassword.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ConfirmsPassword = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
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
let TwoFactorAuthenticationForm$1 = class TwoFactorAuthenticationForm extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "requiresConfirmation");
    __publicField(this, "page", usePage());
    __publicField(this, "enabling", false);
    __publicField(this, "confirming", false);
    __publicField(this, "disabling", false);
    __publicField(this, "qrCode", null);
    __publicField(this, "setupKey", null);
    __publicField(this, "recoveryCodes", []);
    __publicField(this, "confirmationForm", useForm({
      code: ""
    }));
  }
  get twoFactorEnabled() {
    var _a;
    return !this.enabling && ((_a = this.page.props.auth.user) == null ? void 0 : _a.two_factor_enabled);
  }
  twoFactorEnabledWatcher(newValue, oldValue) {
    if (!newValue) {
      this.confirmationForm.reset();
      this.confirmationForm.clearErrors();
    }
  }
  async enableTwoFactorAuthentication() {
    this.enabling.value = true;
    try {
      let res = await api.post(route("two-factor.enable"));
      await this.showQrCode();
      await this.showSetupKey();
      await this.showRecoveryCodes();
    } finally {
      this.enabling = false;
      this.confirming = this.requiresConfirmation;
    }
  }
  async showQrCode() {
    return await api.get(route("two-factor.qr-code")).then((response) => {
      this.qrCode = response.data.svg;
    });
  }
  async showSetupKey() {
    return await api.get(route("two-factor.secret-key")).then((response) => {
      this.setupKey = response.data.secretKey;
    });
  }
  async showRecoveryCodes() {
    return await api.get(route("two-factor.recovery-codes")).then((response) => {
      this.recoveryCodes = response.data;
    });
  }
  async confirmTwoFactorAuthentication() {
    var _a;
    try {
      let res = await api.post(route("two-factor.confirm"), this.confirmationForm);
      this.confirming = false;
      this.qrCode = null;
      this.setupKey = null;
    } catch (error) {
      if (((_a = error.response) == null ? void 0 : _a.status) === 422) {
        this.confirmationForm.errors = error.response.data.errors;
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }
  async regenerateRecoveryCodes() {
    await api.post(route("two-factor.confirm"));
    this.showRecoveryCodes();
  }
  async disableTwoFactorAuthentication() {
    this.disabling = true;
    await api.delete(route("two-factor.disable"));
    this.disabling = false;
    this.confirming = false;
  }
};
__decorateClass([
  Prop(Boolean)
], TwoFactorAuthenticationForm$1.prototype, "requiresConfirmation", 2);
__decorateClass([
  Watch("twoFactorEnabled")
], TwoFactorAuthenticationForm$1.prototype, "twoFactorEnabledWatcher", 1);
TwoFactorAuthenticationForm$1 = __decorateClass([
  Component({
    components: {
      ActionSection,
      InputError,
      ConfirmsPassword,
      VRow,
      VCol,
      VTextField,
      VBtn,
      VAlert,
      VCard,
      VCardText
    }
  })
], TwoFactorAuthenticationForm$1);
const _sfc_main = toNative(TwoFactorAuthenticationForm$1);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ActionSection = resolveComponent("ActionSection");
  const _component_InputError = resolveComponent("InputError");
  const _component_ConfirmsPassword = resolveComponent("ConfirmsPassword");
  _push(ssrRenderComponent(_component_ActionSection, _attrs, {
    title: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Two Factor Authentication`);
      } else {
        return [
          createTextVNode("Two Factor Authentication")
        ];
      }
    }),
    description: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Add additional security to your account.`);
      } else {
        return [
          createTextVNode("Add additional security to your account.")
        ];
      }
    }),
    content: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (_ctx.twoFactorEnabled && !_ctx.confirming) {
          _push2(ssrRenderComponent(VAlert$1, {
            type: "success",
            title: "You have enabled two-factor authentication."
          }, null, _parent2, _scopeId));
        } else if (_ctx.twoFactorEnabled && _ctx.confirming) {
          _push2(ssrRenderComponent(VAlert$1, {
            type: "info",
            title: "Finish enabling two-factor authentication."
          }, null, _parent2, _scopeId));
        } else {
          _push2(ssrRenderComponent(VAlert$1, {
            type: "warning",
            title: "You have not enabled two-factor authentication."
          }, null, _parent2, _scopeId));
        }
        _push2(`<p class="text-body-1 mt-2 mb-2"${_scopeId}> When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone&#39;s Google Authenticator application. </p>`);
        if (_ctx.qrCode) {
          _push2(ssrRenderComponent(VCard$1, { class: "mt-4 pa-4" }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(VCardText$1, null, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      if (_ctx.confirming) {
                        _push4(`<p${_scopeId3}> To finish enabling two-factor authentication, scan the QR code using your authenticator app or enter the setup key. </p>`);
                      } else {
                        _push4(`<p${_scopeId3}>Two-factor authentication is now enabled. Scan the QR code or enter the setup key.</p>`);
                      }
                    } else {
                      return [
                        _ctx.confirming ? (openBlock(), createBlock("p", { key: 0 }, " To finish enabling two-factor authentication, scan the QR code using your authenticator app or enter the setup key. ")) : (openBlock(), createBlock("p", { key: 1 }, "Two-factor authentication is now enabled. Scan the QR code or enter the setup key."))
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
                _push3(`<div class="text-center"${_scopeId2}>${_ctx.qrCode ?? ""}</div>`);
                if (_ctx.setupKey) {
                  _push3(ssrRenderComponent(VCardText$1, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<strong${_scopeId3}>Setup Key:</strong> ${ssrInterpolate(_ctx.setupKey)}`);
                      } else {
                        return [
                          createVNode("strong", null, "Setup Key:"),
                          createTextVNode(" " + toDisplayString(_ctx.setupKey), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  _push3(`<!---->`);
                }
                if (_ctx.confirming) {
                  _push3(ssrRenderComponent(VRow$1, { class: "mt-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol$1, { cols: "12" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField$1, {
                                modelValue: _ctx.confirmationForm.code,
                                "onUpdate:modelValue": ($event) => _ctx.confirmationForm.code = $event,
                                label: "Code",
                                autofocus: "",
                                onKeyup: _ctx.confirmTwoFactorAuthentication
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_InputError, {
                                message: _ctx.confirmationForm.errors.code
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField$1, {
                                  modelValue: _ctx.confirmationForm.code,
                                  "onUpdate:modelValue": ($event) => _ctx.confirmationForm.code = $event,
                                  label: "Code",
                                  autofocus: "",
                                  onKeyup: withKeys(_ctx.confirmTwoFactorAuthentication, ["enter"])
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                                createVNode(_component_InputError, {
                                  message: _ctx.confirmationForm.errors.code
                                }, null, 8, ["message"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol$1, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode(VTextField$1, {
                                modelValue: _ctx.confirmationForm.code,
                                "onUpdate:modelValue": ($event) => _ctx.confirmationForm.code = $event,
                                label: "Code",
                                autofocus: "",
                                onKeyup: withKeys(_ctx.confirmTwoFactorAuthentication, ["enter"])
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                              createVNode(_component_InputError, {
                                message: _ctx.confirmationForm.errors.code
                              }, null, 8, ["message"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  _push3(`<!---->`);
                }
              } else {
                return [
                  createVNode(VCardText$1, null, {
                    default: withCtx(() => [
                      _ctx.confirming ? (openBlock(), createBlock("p", { key: 0 }, " To finish enabling two-factor authentication, scan the QR code using your authenticator app or enter the setup key. ")) : (openBlock(), createBlock("p", { key: 1 }, "Two-factor authentication is now enabled. Scan the QR code or enter the setup key."))
                    ]),
                    _: 1
                  }),
                  createVNode("div", {
                    class: "text-center",
                    innerHTML: _ctx.qrCode
                  }, null, 8, ["innerHTML"]),
                  _ctx.setupKey ? (openBlock(), createBlock(VCardText$1, { key: 0 }, {
                    default: withCtx(() => [
                      createVNode("strong", null, "Setup Key:"),
                      createTextVNode(" " + toDisplayString(_ctx.setupKey), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  _ctx.confirming ? (openBlock(), createBlock(VRow$1, {
                    key: 1,
                    class: "mt-4"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCol$1, { cols: "12" }, {
                        default: withCtx(() => [
                          createVNode(VTextField$1, {
                            modelValue: _ctx.confirmationForm.code,
                            "onUpdate:modelValue": ($event) => _ctx.confirmationForm.code = $event,
                            label: "Code",
                            autofocus: "",
                            onKeyup: withKeys(_ctx.confirmTwoFactorAuthentication, ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                          createVNode(_component_InputError, {
                            message: _ctx.confirmationForm.errors.code
                          }, null, 8, ["message"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
        if (_ctx.recoveryCodes.length > 0 && !_ctx.confirming) {
          _push2(ssrRenderComponent(VCard$1, { class: "mt-4 pa-4" }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(VCardText$1, null, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`<p${_scopeId3}>Store these recovery codes safely. They help regain access if you lose your authentication device.</p><div class="bg-gray-100 dark:bg-gray-900 rounded-lg pa-4"${_scopeId3}><!--[-->`);
                      ssrRenderList(_ctx.recoveryCodes, (code) => {
                        _push4(`<div${_scopeId3}>${ssrInterpolate(code)}</div>`);
                      });
                      _push4(`<!--]--></div>`);
                    } else {
                      return [
                        createVNode("p", null, "Store these recovery codes safely. They help regain access if you lose your authentication device."),
                        createVNode("div", { class: "bg-gray-100 dark:bg-gray-900 rounded-lg pa-4" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.recoveryCodes, (code) => {
                            return openBlock(), createBlock("div", { key: code }, toDisplayString(code), 1);
                          }), 128))
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                return [
                  createVNode(VCardText$1, null, {
                    default: withCtx(() => [
                      createVNode("p", null, "Store these recovery codes safely. They help regain access if you lose your authentication device."),
                      createVNode("div", { class: "bg-gray-100 dark:bg-gray-900 rounded-lg pa-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.recoveryCodes, (code) => {
                          return openBlock(), createBlock("div", { key: code }, toDisplayString(code), 1);
                        }), 128))
                      ])
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="mt-5"${_scopeId}>`);
        if (!_ctx.twoFactorEnabled) {
          _push2(ssrRenderComponent(_component_ConfirmsPassword, { onConfirmed: _ctx.enableTwoFactorAuthentication }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(VBtn$1, {
                  color: "primary",
                  variant: "elevated",
                  disabled: _ctx.enabling
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`Enable`);
                    } else {
                      return [
                        createTextVNode("Enable")
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                return [
                  createVNode(VBtn$1, {
                    color: "primary",
                    variant: "elevated",
                    disabled: _ctx.enabling
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Enable")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
        } else {
          _push2(`<!--[-->`);
          if (_ctx.confirming) {
            _push2(ssrRenderComponent(_component_ConfirmsPassword, { onConfirmed: _ctx.confirmTwoFactorAuthentication }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn$1, {
                    color: "primary",
                    class: "me-3",
                    disabled: _ctx.enabling
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Confirm`);
                      } else {
                        return [
                          createTextVNode("Confirm")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn$1, {
                      color: "primary",
                      class: "me-3",
                      disabled: _ctx.enabling
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Confirm")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            _push2(`<!---->`);
          }
          if (_ctx.recoveryCodes.length > 0 && !_ctx.confirming) {
            _push2(ssrRenderComponent(_component_ConfirmsPassword, { onConfirmed: _ctx.regenerateRecoveryCodes }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn$1, { class: "me-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Regenerate Recovery Codes`);
                      } else {
                        return [
                          createTextVNode("Regenerate Recovery Codes")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn$1, { class: "me-3" }, {
                      default: withCtx(() => [
                        createTextVNode("Regenerate Recovery Codes")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            _push2(`<!---->`);
          }
          if (_ctx.recoveryCodes.length === 0 && !_ctx.confirming) {
            _push2(ssrRenderComponent(_component_ConfirmsPassword, { onConfirmed: _ctx.showRecoveryCodes }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn$1, { class: "me-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Show Recovery Codes`);
                      } else {
                        return [
                          createTextVNode("Show Recovery Codes")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn$1, { class: "me-3" }, {
                      default: withCtx(() => [
                        createTextVNode("Show Recovery Codes")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            _push2(`<!---->`);
          }
          _push2(ssrRenderComponent(_component_ConfirmsPassword, { onConfirmed: _ctx.disableTwoFactorAuthentication }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(VBtn$1, {
                  color: "error",
                  disabled: _ctx.disabling
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`Disable`);
                    } else {
                      return [
                        createTextVNode("Disable")
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                return [
                  createVNode(VBtn$1, {
                    color: "error",
                    disabled: _ctx.disabling
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Disable")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(`<!--]-->`);
        }
        _push2(`</div>`);
      } else {
        return [
          _ctx.twoFactorEnabled && !_ctx.confirming ? (openBlock(), createBlock(VAlert$1, {
            key: 0,
            type: "success",
            title: "You have enabled two-factor authentication."
          })) : _ctx.twoFactorEnabled && _ctx.confirming ? (openBlock(), createBlock(VAlert$1, {
            key: 1,
            type: "info",
            title: "Finish enabling two-factor authentication."
          })) : (openBlock(), createBlock(VAlert$1, {
            key: 2,
            type: "warning",
            title: "You have not enabled two-factor authentication."
          })),
          createVNode("p", { class: "text-body-1 mt-2 mb-2" }, " When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application. "),
          _ctx.qrCode ? (openBlock(), createBlock(VCard$1, {
            key: 3,
            class: "mt-4 pa-4"
          }, {
            default: withCtx(() => [
              createVNode(VCardText$1, null, {
                default: withCtx(() => [
                  _ctx.confirming ? (openBlock(), createBlock("p", { key: 0 }, " To finish enabling two-factor authentication, scan the QR code using your authenticator app or enter the setup key. ")) : (openBlock(), createBlock("p", { key: 1 }, "Two-factor authentication is now enabled. Scan the QR code or enter the setup key."))
                ]),
                _: 1
              }),
              createVNode("div", {
                class: "text-center",
                innerHTML: _ctx.qrCode
              }, null, 8, ["innerHTML"]),
              _ctx.setupKey ? (openBlock(), createBlock(VCardText$1, { key: 0 }, {
                default: withCtx(() => [
                  createVNode("strong", null, "Setup Key:"),
                  createTextVNode(" " + toDisplayString(_ctx.setupKey), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true),
              _ctx.confirming ? (openBlock(), createBlock(VRow$1, {
                key: 1,
                class: "mt-4"
              }, {
                default: withCtx(() => [
                  createVNode(VCol$1, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VTextField$1, {
                        modelValue: _ctx.confirmationForm.code,
                        "onUpdate:modelValue": ($event) => _ctx.confirmationForm.code = $event,
                        label: "Code",
                        autofocus: "",
                        onKeyup: withKeys(_ctx.confirmTwoFactorAuthentication, ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                      createVNode(_component_InputError, {
                        message: _ctx.confirmationForm.errors.code
                      }, null, 8, ["message"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          _ctx.recoveryCodes.length > 0 && !_ctx.confirming ? (openBlock(), createBlock(VCard$1, {
            key: 4,
            class: "mt-4 pa-4"
          }, {
            default: withCtx(() => [
              createVNode(VCardText$1, null, {
                default: withCtx(() => [
                  createVNode("p", null, "Store these recovery codes safely. They help regain access if you lose your authentication device."),
                  createVNode("div", { class: "bg-gray-100 dark:bg-gray-900 rounded-lg pa-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.recoveryCodes, (code) => {
                      return openBlock(), createBlock("div", { key: code }, toDisplayString(code), 1);
                    }), 128))
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : createCommentVNode("", true),
          createVNode("div", { class: "mt-5" }, [
            !_ctx.twoFactorEnabled ? (openBlock(), createBlock(_component_ConfirmsPassword, {
              key: 0,
              onConfirmed: _ctx.enableTwoFactorAuthentication
            }, {
              default: withCtx(() => [
                createVNode(VBtn$1, {
                  color: "primary",
                  variant: "elevated",
                  disabled: _ctx.enabling
                }, {
                  default: withCtx(() => [
                    createTextVNode("Enable")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ]),
              _: 1
            }, 8, ["onConfirmed"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
              _ctx.confirming ? (openBlock(), createBlock(_component_ConfirmsPassword, {
                key: 0,
                onConfirmed: _ctx.confirmTwoFactorAuthentication
              }, {
                default: withCtx(() => [
                  createVNode(VBtn$1, {
                    color: "primary",
                    class: "me-3",
                    disabled: _ctx.enabling
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Confirm")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              }, 8, ["onConfirmed"])) : createCommentVNode("", true),
              _ctx.recoveryCodes.length > 0 && !_ctx.confirming ? (openBlock(), createBlock(_component_ConfirmsPassword, {
                key: 1,
                onConfirmed: _ctx.regenerateRecoveryCodes
              }, {
                default: withCtx(() => [
                  createVNode(VBtn$1, { class: "me-3" }, {
                    default: withCtx(() => [
                      createTextVNode("Regenerate Recovery Codes")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["onConfirmed"])) : createCommentVNode("", true),
              _ctx.recoveryCodes.length === 0 && !_ctx.confirming ? (openBlock(), createBlock(_component_ConfirmsPassword, {
                key: 2,
                onConfirmed: _ctx.showRecoveryCodes
              }, {
                default: withCtx(() => [
                  createVNode(VBtn$1, { class: "me-3" }, {
                    default: withCtx(() => [
                      createTextVNode("Show Recovery Codes")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["onConfirmed"])) : createCommentVNode("", true),
              createVNode(_component_ConfirmsPassword, { onConfirmed: _ctx.disableTwoFactorAuthentication }, {
                default: withCtx(() => [
                  createVNode(VBtn$1, {
                    color: "error",
                    disabled: _ctx.disabling
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Disable")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              }, 8, ["onConfirmed"])
            ], 64))
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/TwoFactorAuthenticationForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TwoFactorAuthenticationForm2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  TwoFactorAuthenticationForm2 as default
};
