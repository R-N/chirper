var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { usePage, useForm } from "@inertiajs/vue3";
import { b as _sfc_main$2, a as _sfc_main$7 } from "./DialogModal-Dl-MOD2C.js";
import { ref, reactive, withCtx, createTextVNode, toDisplayString, createVNode, withKeys, useSSRContext, nextTick, resolveComponent, openBlock, createBlock, createCommentVNode, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./InputError-BRdBLb-x.js";
import { _ as _sfc_main$6 } from "./PrimaryButton-CtpSN9QQ.js";
import { _ as _sfc_main$5 } from "./SecondaryButton-BgIg9sGF.js";
import { _ as _sfc_main$3 } from "./TextInput-2NFZntg2.js";
import { _ as _sfc_main$8 } from "./DangerButton-BsxM2vkF.js";
import { _ as _sfc_main$9 } from "./InputLabel-Cnda-O0w.js";
import { toNative, Vue, Prop, Watch, Component } from "vue-facing-decorator";
import { a as api } from "./axios-DQioN9B6.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./SectionTitle-4i2p8f-X.js";
import "axios";
import "js-cookie";
const _sfc_main$1 = {
  __name: "ConfirmsPassword",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: "Confirm Password"
    },
    content: {
      type: String,
      default: "For your security, please confirm your password to continue."
    },
    button: {
      type: String,
      default: "Confirm"
    }
  },
  emits: ["confirmed"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const confirmingPassword = ref(false);
    const form = reactive({
      password: "",
      error: "",
      processing: false
    });
    const passwordInput = ref(null);
    const confirmPassword = () => {
      form.processing = true;
      axios.post(route("password.confirm"), {
        password: form.password
      }).then(() => {
        form.processing = false;
        closeModal();
        nextTick().then(() => emit("confirmed"));
      }).catch((error) => {
        form.processing = false;
        form.error = error.response.data.errors.password[0];
        passwordInput.value.focus();
      });
    };
    const closeModal = () => {
      confirmingPassword.value = false;
      form.password = "";
      form.error = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(_attrs)}><span>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        show: confirmingPassword.value,
        onClose: closeModal
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.title)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.title), 1)
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.content)} <div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              ref_key: "passwordInput",
              ref: passwordInput,
              modelValue: form.password,
              "onUpdate:modelValue": ($event) => form.password = $event,
              type: "password",
              class: "mt-1 block w-3/4",
              placeholder: "Password",
              autocomplete: "current-password",
              onKeyup: confirmPassword
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: form.error,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.content) + " ", 1),
              createVNode("div", { class: "mt-4" }, [
                createVNode(_sfc_main$3, {
                  ref_key: "passwordInput",
                  ref: passwordInput,
                  modelValue: form.password,
                  "onUpdate:modelValue": ($event) => form.password = $event,
                  type: "password",
                  class: "mt-1 block w-3/4",
                  placeholder: "Password",
                  autocomplete: "current-password",
                  onKeyup: withKeys(confirmPassword, ["enter"])
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$4, {
                  message: form.error,
                  class: "mt-2"
                }, null, 8, ["message"])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$5, { onClick: closeModal }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, {
              class: ["ms-3", { "opacity-25": form.processing }],
              disabled: form.processing,
              onClick: confirmPassword
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.button)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.button), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$5, { onClick: closeModal }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }),
              createVNode(_sfc_main$6, {
                class: ["ms-3", { "opacity-25": form.processing }],
                disabled: form.processing,
                onClick: confirmPassword
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.button), 1)
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ConfirmsPassword.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
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
      ActionSection: _sfc_main$7,
      ConfirmsPassword: _sfc_main$1,
      DangerButton: _sfc_main$8,
      InputError: _sfc_main$4,
      InputLabel: _sfc_main$9,
      PrimaryButton: _sfc_main$6,
      SecondaryButton: _sfc_main$5,
      TextInput: _sfc_main$3
    }
  })
], TwoFactorAuthenticationForm$1);
const _sfc_main = toNative(TwoFactorAuthenticationForm$1);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ActionSection = resolveComponent("ActionSection");
  const _component_InputLabel = resolveComponent("InputLabel");
  const _component_TextInput = resolveComponent("TextInput");
  const _component_InputError = resolveComponent("InputError");
  const _component_ConfirmsPassword = resolveComponent("ConfirmsPassword");
  const _component_PrimaryButton = resolveComponent("PrimaryButton");
  const _component_SecondaryButton = resolveComponent("SecondaryButton");
  const _component_DangerButton = resolveComponent("DangerButton");
  _push(ssrRenderComponent(_component_ActionSection, _attrs, {
    title: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Two Factor Authentication `);
      } else {
        return [
          createTextVNode(" Two Factor Authentication ")
        ];
      }
    }),
    description: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Add additional security to your account using two factor authentication. `);
      } else {
        return [
          createTextVNode(" Add additional security to your account using two factor authentication. ")
        ];
      }
    }),
    content: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (_ctx.twoFactorEnabled && !_ctx.confirming) {
          _push2(`<h3 class="text-lg font-medium text-gray-900 dark:text-gray-100"${_scopeId}> You have enabled two factor authentication. </h3>`);
        } else if (_ctx.twoFactorEnabled && _ctx.confirming) {
          _push2(`<h3 class="text-lg font-medium text-gray-900 dark:text-gray-100"${_scopeId}> Finish enabling two factor authentication. </h3>`);
        } else {
          _push2(`<h3 class="text-lg font-medium text-gray-900 dark:text-gray-100"${_scopeId}> You have not enabled two factor authentication. </h3>`);
        }
        _push2(`<div class="mt-3 max-w-xl text-sm text-gray-600 dark:text-gray-400"${_scopeId}><p${_scopeId}> When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone&#39;s Google Authenticator application. </p></div>`);
        if (_ctx.twoFactorEnabled) {
          _push2(`<div${_scopeId}>`);
          if (_ctx.qrCode) {
            _push2(`<div${_scopeId}><div class="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400"${_scopeId}>`);
            if (_ctx.confirming) {
              _push2(`<p class="font-semibold"${_scopeId}> To finish enabling two factor authentication, scan the following QR code using your phone&#39;s authenticator application or enter the setup key and provide the generated OTP code. </p>`);
            } else {
              _push2(`<p${_scopeId}> Two factor authentication is now enabled. Scan the following QR code using your phone&#39;s authenticator application or enter the setup key. </p>`);
            }
            _push2(`</div><div class="mt-4 p-2 inline-block bg-white"${_scopeId}>${_ctx.qrCode ?? ""}</div>`);
            if (_ctx.setupKey) {
              _push2(`<div class="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400"${_scopeId}><p class="font-semibold"${_scopeId}> Setup Key: <span${_scopeId}>${_ctx.setupKey ?? ""}</span></p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.confirming) {
              _push2(`<div class="mt-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_InputLabel, {
                for: "code",
                value: "Code"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_TextInput, {
                id: "code",
                modelValue: _ctx.confirmationForm.code,
                "onUpdate:modelValue": ($event) => _ctx.confirmationForm.code = $event,
                type: "text",
                name: "code",
                class: "block mt-1 w-1/2",
                inputmode: "numeric",
                autofocus: "",
                autocomplete: "one-time-code",
                onKeyup: _ctx.confirmTwoFactorAuthentication
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_InputError, {
                message: _ctx.confirmationForm.errors.code,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (_ctx.recoveryCodes.length > 0 && !_ctx.confirming) {
            _push2(`<div${_scopeId}><div class="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400"${_scopeId}><p class="font-semibold"${_scopeId}> Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost. </p></div><div class="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 dark:bg-gray-900 dark:text-gray-100 rounded-lg"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.recoveryCodes, (code) => {
              _push2(`<div${_scopeId}>${ssrInterpolate(code)}</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="mt-5"${_scopeId}>`);
        if (!_ctx.twoFactorEnabled) {
          _push2(`<div${_scopeId}>`);
          _push2(ssrRenderComponent(_component_ConfirmsPassword, { onConfirmed: _ctx.enableTwoFactorAuthentication }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(_component_PrimaryButton, {
                  type: "button",
                  class: { "opacity-25": _ctx.enabling },
                  disabled: _ctx.enabling
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(` Enable `);
                    } else {
                      return [
                        createTextVNode(" Enable ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                return [
                  createVNode(_component_PrimaryButton, {
                    type: "button",
                    class: { "opacity-25": _ctx.enabling },
                    disabled: _ctx.enabling
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Enable ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(`</div>`);
        } else {
          _push2(`<div${_scopeId}>`);
          _push2(ssrRenderComponent(_component_ConfirmsPassword, { onConfirmed: _ctx.confirmTwoFactorAuthentication }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                if (_ctx.confirming) {
                  _push3(ssrRenderComponent(_component_PrimaryButton, {
                    type: "button",
                    class: ["me-3", { "opacity-25": _ctx.enabling }],
                    disabled: _ctx.enabling
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Confirm `);
                      } else {
                        return [
                          createTextVNode(" Confirm ")
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
                  _ctx.confirming ? (openBlock(), createBlock(_component_PrimaryButton, {
                    key: 0,
                    type: "button",
                    class: ["me-3", { "opacity-25": _ctx.enabling }],
                    disabled: _ctx.enabling
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Confirm ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])) : createCommentVNode("", true)
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_ConfirmsPassword, { onConfirmed: _ctx.regenerateRecoveryCodes }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                if (_ctx.recoveryCodes.length > 0 && !_ctx.confirming) {
                  _push3(ssrRenderComponent(_component_SecondaryButton, { class: "me-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Regenerate Recovery Codes `);
                      } else {
                        return [
                          createTextVNode(" Regenerate Recovery Codes ")
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
                  _ctx.recoveryCodes.length > 0 && !_ctx.confirming ? (openBlock(), createBlock(_component_SecondaryButton, {
                    key: 0,
                    class: "me-3"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Regenerate Recovery Codes ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_ConfirmsPassword, { onConfirmed: _ctx.showRecoveryCodes }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                if (_ctx.recoveryCodes.length === 0 && !_ctx.confirming) {
                  _push3(ssrRenderComponent(_component_SecondaryButton, { class: "me-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Show Recovery Codes `);
                      } else {
                        return [
                          createTextVNode(" Show Recovery Codes ")
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
                  _ctx.recoveryCodes.length === 0 && !_ctx.confirming ? (openBlock(), createBlock(_component_SecondaryButton, {
                    key: 0,
                    class: "me-3"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Show Recovery Codes ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_ConfirmsPassword, { onConfirmed: _ctx.disableTwoFactorAuthentication }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                if (_ctx.confirming) {
                  _push3(ssrRenderComponent(_component_SecondaryButton, {
                    class: { "opacity-25": _ctx.disabling },
                    disabled: _ctx.disabling
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Cancel `);
                      } else {
                        return [
                          createTextVNode(" Cancel ")
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
                  _ctx.confirming ? (openBlock(), createBlock(_component_SecondaryButton, {
                    key: 0,
                    class: { "opacity-25": _ctx.disabling },
                    disabled: _ctx.disabling
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Cancel ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])) : createCommentVNode("", true)
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_ConfirmsPassword, { onConfirmed: _ctx.disableTwoFactorAuthentication }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                if (!_ctx.confirming) {
                  _push3(ssrRenderComponent(_component_DangerButton, {
                    class: { "opacity-25": _ctx.disabling },
                    disabled: _ctx.disabling
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Disable `);
                      } else {
                        return [
                          createTextVNode(" Disable ")
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
                  !_ctx.confirming ? (openBlock(), createBlock(_component_DangerButton, {
                    key: 0,
                    class: { "opacity-25": _ctx.disabling },
                    disabled: _ctx.disabling
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Disable ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])) : createCommentVNode("", true)
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(`</div>`);
        }
        _push2(`</div>`);
      } else {
        return [
          _ctx.twoFactorEnabled && !_ctx.confirming ? (openBlock(), createBlock("h3", {
            key: 0,
            class: "text-lg font-medium text-gray-900 dark:text-gray-100"
          }, " You have enabled two factor authentication. ")) : _ctx.twoFactorEnabled && _ctx.confirming ? (openBlock(), createBlock("h3", {
            key: 1,
            class: "text-lg font-medium text-gray-900 dark:text-gray-100"
          }, " Finish enabling two factor authentication. ")) : (openBlock(), createBlock("h3", {
            key: 2,
            class: "text-lg font-medium text-gray-900 dark:text-gray-100"
          }, " You have not enabled two factor authentication. ")),
          createVNode("div", { class: "mt-3 max-w-xl text-sm text-gray-600 dark:text-gray-400" }, [
            createVNode("p", null, " When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application. ")
          ]),
          _ctx.twoFactorEnabled ? (openBlock(), createBlock("div", { key: 3 }, [
            _ctx.qrCode ? (openBlock(), createBlock("div", { key: 0 }, [
              createVNode("div", { class: "mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400" }, [
                _ctx.confirming ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "font-semibold"
                }, " To finish enabling two factor authentication, scan the following QR code using your phone's authenticator application or enter the setup key and provide the generated OTP code. ")) : (openBlock(), createBlock("p", { key: 1 }, " Two factor authentication is now enabled. Scan the following QR code using your phone's authenticator application or enter the setup key. "))
              ]),
              createVNode("div", {
                class: "mt-4 p-2 inline-block bg-white",
                innerHTML: _ctx.qrCode
              }, null, 8, ["innerHTML"]),
              _ctx.setupKey ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400"
              }, [
                createVNode("p", { class: "font-semibold" }, [
                  createTextVNode(" Setup Key: "),
                  createVNode("span", { innerHTML: _ctx.setupKey }, null, 8, ["innerHTML"])
                ])
              ])) : createCommentVNode("", true),
              _ctx.confirming ? (openBlock(), createBlock("div", {
                key: 1,
                class: "mt-4"
              }, [
                createVNode(_component_InputLabel, {
                  for: "code",
                  value: "Code"
                }),
                createVNode(_component_TextInput, {
                  id: "code",
                  modelValue: _ctx.confirmationForm.code,
                  "onUpdate:modelValue": ($event) => _ctx.confirmationForm.code = $event,
                  type: "text",
                  name: "code",
                  class: "block mt-1 w-1/2",
                  inputmode: "numeric",
                  autofocus: "",
                  autocomplete: "one-time-code",
                  onKeyup: withKeys(_ctx.confirmTwoFactorAuthentication, ["enter"])
                }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                createVNode(_component_InputError, {
                  message: _ctx.confirmationForm.errors.code,
                  class: "mt-2"
                }, null, 8, ["message"])
              ])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            _ctx.recoveryCodes.length > 0 && !_ctx.confirming ? (openBlock(), createBlock("div", { key: 1 }, [
              createVNode("div", { class: "mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400" }, [
                createVNode("p", { class: "font-semibold" }, " Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost. ")
              ]),
              createVNode("div", { class: "grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 dark:bg-gray-900 dark:text-gray-100 rounded-lg" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(_ctx.recoveryCodes, (code) => {
                  return openBlock(), createBlock("div", { key: code }, toDisplayString(code), 1);
                }), 128))
              ])
            ])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          createVNode("div", { class: "mt-5" }, [
            !_ctx.twoFactorEnabled ? (openBlock(), createBlock("div", { key: 0 }, [
              createVNode(_component_ConfirmsPassword, { onConfirmed: _ctx.enableTwoFactorAuthentication }, {
                default: withCtx(() => [
                  createVNode(_component_PrimaryButton, {
                    type: "button",
                    class: { "opacity-25": _ctx.enabling },
                    disabled: _ctx.enabling
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Enable ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ]),
                _: 1
              }, 8, ["onConfirmed"])
            ])) : (openBlock(), createBlock("div", { key: 1 }, [
              createVNode(_component_ConfirmsPassword, { onConfirmed: _ctx.confirmTwoFactorAuthentication }, {
                default: withCtx(() => [
                  _ctx.confirming ? (openBlock(), createBlock(_component_PrimaryButton, {
                    key: 0,
                    type: "button",
                    class: ["me-3", { "opacity-25": _ctx.enabling }],
                    disabled: _ctx.enabling
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Confirm ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["onConfirmed"]),
              createVNode(_component_ConfirmsPassword, { onConfirmed: _ctx.regenerateRecoveryCodes }, {
                default: withCtx(() => [
                  _ctx.recoveryCodes.length > 0 && !_ctx.confirming ? (openBlock(), createBlock(_component_SecondaryButton, {
                    key: 0,
                    class: "me-3"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Regenerate Recovery Codes ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["onConfirmed"]),
              createVNode(_component_ConfirmsPassword, { onConfirmed: _ctx.showRecoveryCodes }, {
                default: withCtx(() => [
                  _ctx.recoveryCodes.length === 0 && !_ctx.confirming ? (openBlock(), createBlock(_component_SecondaryButton, {
                    key: 0,
                    class: "me-3"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Show Recovery Codes ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["onConfirmed"]),
              createVNode(_component_ConfirmsPassword, { onConfirmed: _ctx.disableTwoFactorAuthentication }, {
                default: withCtx(() => [
                  _ctx.confirming ? (openBlock(), createBlock(_component_SecondaryButton, {
                    key: 0,
                    class: { "opacity-25": _ctx.disabling },
                    disabled: _ctx.disabling
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Cancel ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["onConfirmed"]),
              createVNode(_component_ConfirmsPassword, { onConfirmed: _ctx.disableTwoFactorAuthentication }, {
                default: withCtx(() => [
                  !_ctx.confirming ? (openBlock(), createBlock(_component_DangerButton, {
                    key: 0,
                    class: { "opacity-25": _ctx.disabling },
                    disabled: _ctx.disabling
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Disable ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["onConfirmed"])
            ]))
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
