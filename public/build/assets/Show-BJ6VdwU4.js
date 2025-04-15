var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as AppLayout } from "./AppLayout-B13Wv00U.js";
import { p as profileService, D as DeleteUserForm, U as UpdatePasswordForm, a as UpdateProfileInformationForm } from "./UpdateProfileInformationForm-D6csNTIs.js";
import { b as Component, t as toNative, V as Vue, C, a as decorator, ar as decorator$1, _ as _export_sfc, r as resolveComponent, o as openBlock, c as createBlock, w as withCtx, h as createTextVNode, g as createBaseVNode, j as createElementBlock, F as Fragment, k as renderList, e as createVNode, M as toDisplayString, N as createCommentVNode, aC as withKeys, av as api, L as decorator$2, ap as renderSlot, aD as ne, aE as decorator$3 } from "./app-CPu3B8nk.js";
import { A as ActionMessage, a as ActionSection } from "./FormSection-B8IgUaOS.js";
import { f as VDialog, a as VCard, c as VCardTitle, d as VCardText, e as VCardActions } from "./GuestLayout.vue_vue_type_script_lang-B04FhGQk.js";
import { V as VTextField } from "./VTextField-Bj9iITQ7.js";
import { V as VBtn, a as VIcon, N as VExpandTransition } from "./forwardRefs-CUUEJ2GB.js";
import { V as VRow, a as VCol } from "./VRow-B-PaLeOj.js";
import { c as VDivider } from "./VMenu-DKNR31gj.js";
import { I as InputError, e as VAlert } from "./InputError-D2hiOP2i.js";
import "./Auth.vue_vue_type_script_lang-DBB4XVKb.js";
import "./AuthenticationCardLogo-BVaAeieh.js";
import "./Login-B8czODMK.js";
import "./VCheckbox-ClXUESM1.js";
import "./VChip-CJeNE27-.js";
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$4(target, key, result);
  return result;
};
let LogoutOtherBrowserSessionsForm$1 = class LogoutOtherBrowserSessionsForm extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "sessions");
    __publicField(this, "confirmingLogout", false);
    __publicField(this, "passwordInput");
    __publicField(this, "form", C({
      password: ""
    }));
  }
  confirmLogout() {
    this.confirmingLogout = true;
    setTimeout(() => this.passwordInput.focus(), 250);
  }
  async logoutOtherBrowserSessions() {
    try {
      let res = await profileService.logoutOtherBrowserSessions(this.form);
      this.closeModal();
    } catch (error) {
      this.passwordInput.focus();
    } finally {
      this.form.reset();
    }
  }
  closeModal() {
    this.confirmingLogout = false;
    this.form.reset();
  }
};
__decorateClass$4([
  decorator({ type: Array })
], LogoutOtherBrowserSessionsForm$1.prototype, "sessions", 2);
__decorateClass$4([
  decorator$1("passwordInput")
], LogoutOtherBrowserSessionsForm$1.prototype, "passwordInput", 2);
LogoutOtherBrowserSessionsForm$1 = __decorateClass$4([
  Component({
    components: {
      ActionMessage,
      ActionSection,
      VDialog,
      VTextField,
      VBtn,
      VRow,
      VCol
    }
  })
], LogoutOtherBrowserSessionsForm$1);
const _sfc_main$4 = toNative(LogoutOtherBrowserSessionsForm$1);
const _hoisted_1$4 = {
  key: 0,
  class: "mt-5 space-y-4"
};
const _hoisted_2$3 = { class: "text-body-1 text-sm" };
const _hoisted_3$2 = {
  key: 0,
  class: "text-green-500 font-semibold"
};
const _hoisted_4$2 = { key: 1 };
const _hoisted_5$1 = { class: "flex items-center mt-5" };
const _hoisted_6 = {
  key: 0,
  class: "text-red-500 text-sm mt-2"
};
const _hoisted_7 = { class: "mt-4 flex justify-end" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ActionMessage = resolveComponent("ActionMessage");
  const _component_ActionSection = resolveComponent("ActionSection");
  return openBlock(), createBlock(_component_ActionSection, null, {
    title: withCtx(() => _cache[2] || (_cache[2] = [
      createTextVNode("Browser Sessions")
    ])),
    description: withCtx(() => _cache[3] || (_cache[3] = [
      createTextVNode(" Manage and log out your active sessions on other browsers and devices. ")
    ])),
    content: withCtx(() => [
      _cache[10] || (_cache[10] = createBaseVNode("p", { class: "text-body-1" }, " If necessary, you may log out of all other browser sessions. Some recent sessions are listed below. ", -1)),
      _ctx.sessions.length ? (openBlock(), createElementBlock("div", _hoisted_1$4, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.sessions, (session, i) => {
          return openBlock(), createBlock(VRow, {
            key: i,
            class: "items-center"
          }, {
            default: withCtx(() => [
              createVNode(VCol, { cols: "1" }, {
                default: withCtx(() => [
                  createVNode(VIcon, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(session.agent.is_desktop ? "mdi-monitor" : "mdi-cellphone"), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024),
              createVNode(VCol, { cols: "11" }, {
                default: withCtx(() => [
                  createBaseVNode("p", null, toDisplayString(session.agent.platform || "Unknown") + " - " + toDisplayString(session.agent.browser || "Unknown"), 1),
                  createBaseVNode("p", _hoisted_2$3, [
                    createTextVNode(toDisplayString(session.ip_address) + " ", 1),
                    session.is_current_device ? (openBlock(), createElementBlock("span", _hoisted_3$2, "(This device)")) : (openBlock(), createElementBlock("span", _hoisted_4$2, "Last active " + toDisplayString(session.last_active), 1))
                  ])
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1024);
        }), 128))
      ])) : createCommentVNode("", true),
      createBaseVNode("div", _hoisted_5$1, [
        createVNode(VBtn, {
          color: "primary",
          onClick: _ctx.confirmLogout
        }, {
          default: withCtx(() => _cache[4] || (_cache[4] = [
            createTextVNode("Log Out Other Browser Sessions")
          ])),
          _: 1
        }, 8, ["onClick"]),
        createVNode(_component_ActionMessage, {
          on: _ctx.form.recentlySuccessful,
          class: "ms-3"
        }, {
          default: withCtx(() => _cache[5] || (_cache[5] = [
            createTextVNode("Done.")
          ])),
          _: 1
        }, 8, ["on"])
      ]),
      createVNode(VDialog, {
        modelValue: _ctx.confirmingLogout,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.confirmingLogout = $event),
        "max-width": "500px"
      }, {
        default: withCtx(() => [
          createVNode(VRow, { class: "p-4" }, {
            default: withCtx(() => [
              createVNode(VCol, null, {
                default: withCtx(() => [
                  _cache[8] || (_cache[8] = createBaseVNode("h3", null, "Log Out Other Browser Sessions", -1)),
                  _cache[9] || (_cache[9] = createBaseVNode("p", { class: "mt-2" }, "Please enter your password to confirm.", -1)),
                  createVNode(VTextField, {
                    ref: "passwordInput",
                    modelValue: _ctx.form.password,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.form.password = $event),
                    label: "Password",
                    type: "password",
                    autocomplete: "current-password",
                    variant: "outlined",
                    class: "mt-4",
                    onKeyup: withKeys(_ctx.logoutOtherBrowserSessions, ["enter"])
                  }, null, 8, ["modelValue", "onKeyup"]),
                  _ctx.form.errors.password ? (openBlock(), createElementBlock("p", _hoisted_6, toDisplayString(_ctx.form.errors.password), 1)) : createCommentVNode("", true),
                  createBaseVNode("div", _hoisted_7, [
                    createVNode(VBtn, {
                      variant: "text",
                      onClick: _ctx.closeModal
                    }, {
                      default: withCtx(() => _cache[6] || (_cache[6] = [
                        createTextVNode("Cancel")
                      ])),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(VBtn, {
                      color: "primary",
                      loading: _ctx.form.processing,
                      onClick: _ctx.logoutOtherBrowserSessions,
                      class: "ms-3"
                    }, {
                      default: withCtx(() => _cache[7] || (_cache[7] = [
                        createTextVNode(" Log Out ")
                      ])),
                      _: 1
                    }, 8, ["loading", "onClick"])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  });
}
const LogoutOtherBrowserSessionsForm2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$3(target, key, result);
  return result;
};
let SectionBorder$1 = class SectionBorder extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "on");
  }
};
__decorateClass$3([
  decorator({ type: Boolean, required: true })
], SectionBorder$1.prototype, "on", 2);
SectionBorder$1 = __decorateClass$3([
  Component({
    components: {
      VDivider,
      VExpandTransition
    }
  })
], SectionBorder$1);
const _sfc_main$3 = toNative(SectionBorder$1);
const _hoisted_1$3 = { class: "d-none d-sm-block" };
const _hoisted_2$2 = { class: "py-8" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    createBaseVNode("div", _hoisted_2$2, [
      createVNode(VDivider)
    ])
  ]);
}
const SectionBorder2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
  return result;
};
let ConfirmPassword = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "title");
    __publicField(this, "content");
    __publicField(this, "button");
    __publicField(this, "confirmingPassword", false);
    __publicField(this, "form", C({
      password: "",
      error: "",
      processing: false
    }));
    __publicField(this, "passwordInput");
  }
  async startConfirmingPassword() {
    const response = await api.get(route("password.confirmation"));
    if (response.data.confirmed) {
      this.emitConfirmed();
    } else {
      this.confirmingPassword = true;
      setTimeout(() => {
        var _a;
        return (_a = this.passwordInput) == null ? void 0 : _a.focus();
      }, 250);
    }
  }
  emitConfirmed() {
    return true;
  }
  async confirmPassword() {
    this.form.processing = true;
    try {
      await api.post(route("password.confirm"), {
        password: this.form.password
      });
      this.form.processing = false;
      this.closeModal();
      this.$nextTick(this.emitConfirmed);
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
__decorateClass$2([
  decorator({ type: String, default: "Confirm Password" })
], ConfirmPassword.prototype, "title", 2);
__decorateClass$2([
  decorator({ type: String, default: "For your security, please confirm your password to continue." })
], ConfirmPassword.prototype, "content", 2);
__decorateClass$2([
  decorator({ type: String, default: "Confirm" })
], ConfirmPassword.prototype, "button", 2);
__decorateClass$2([
  decorator$1("passwordInput")
], ConfirmPassword.prototype, "passwordInput", 2);
__decorateClass$2([
  decorator$2("confirmed")
], ConfirmPassword.prototype, "emitConfirmed", 1);
ConfirmPassword = __decorateClass$2([
  Component({
    components: {
      VDialog,
      VCard,
      VCardTitle,
      VCardText,
      VCardActions,
      VTextField,
      VBtn
    },
    emits: ["confirmed"]
  })
], ConfirmPassword);
const _sfc_main$2 = toNative(ConfirmPassword);
const _hoisted_1$2 = {
  key: 0,
  class: "text-error mt-2"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", null, [
    createBaseVNode("span", {
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.startConfirmingPassword && _ctx.startConfirmingPassword(...args))
    }, [
      renderSlot(_ctx.$slots, "default")
    ]),
    createVNode(VDialog, {
      modelValue: _ctx.confirmingPassword,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.confirmingPassword = $event),
      persistent: "",
      "max-width": "400px"
    }, {
      default: withCtx(() => [
        createVNode(VCard, null, {
          default: withCtx(() => [
            createVNode(VCardTitle, null, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.title), 1)
              ]),
              _: 1
            }),
            createVNode(VCardText, null, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.content) + " ", 1),
                createVNode(VTextField, {
                  ref: "passwordInput",
                  modelValue: _ctx.form.password,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.form.password = $event),
                  type: "password",
                  class: "mt-4",
                  placeholder: "Password",
                  autocomplete: "current-password",
                  onKeyup: withKeys(_ctx.confirmPassword, ["enter"]),
                  variant: "outlined"
                }, null, 8, ["modelValue", "onKeyup"]),
                _ctx.form.error ? (openBlock(), createElementBlock("p", _hoisted_1$2, toDisplayString(_ctx.form.error), 1)) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            createVNode(VCardActions, null, {
              default: withCtx(() => [
                createVNode(VBtn, {
                  variant: "text",
                  onClick: _ctx.closeModal
                }, {
                  default: withCtx(() => _cache[3] || (_cache[3] = [
                    createTextVNode("Cancel")
                  ])),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(VBtn, {
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
      ]),
      _: 1
    }, 8, ["modelValue"])
  ]);
}
const ConfirmsPassword = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
class TwoFactorAuthService {
  constructor(axios) {
    this.axios = axios || api;
  }
  async enableTwoFactorAuthentication() {
    let res = await this.axios.post(route("two-factor.enable"));
    let qrCode = await this.showQrCode();
    let setupKey = await this.showSetupKey();
    let recoveryCodes = await this.showRecoveryCodes();
    return {
      ...res.data,
      qrCode,
      setupKey,
      recoveryCodes
    };
  }
  async showQrCode() {
    let res = await this.axios.get(route("two-factor.qr-code"));
    return res.data.svg;
  }
  async showSetupKey() {
    let res = await this.axios.get(route("two-factor.secret-key"));
    return res.data.secretKey;
  }
  async showRecoveryCodes() {
    let res = await this.axios.get(route("two-factor.recovery-codes"));
    return res.data;
  }
  async confirmTwoFactorAuthentication(form) {
    let res = await this.axios.post(route("two-factor.confirm"), form);
    return res.data;
  }
  async regenerateRecoveryCodes() {
    await this.axios.post(route("two-factor.confirm"));
    return this.showRecoveryCodes();
  }
  async disableTwoFactorAuthentication() {
    let res = await this.axios.delete(route("two-factor.disable"));
    return res.data;
  }
}
const twoFactorAuthService = new TwoFactorAuthService();
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let TwoFactorAuthenticationForm$1 = class TwoFactorAuthenticationForm extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "requiresConfirmation");
    __publicField(this, "page", ne());
    __publicField(this, "enabling", false);
    __publicField(this, "confirming", false);
    __publicField(this, "disabling", false);
    __publicField(this, "qrCode", null);
    __publicField(this, "setupKey", null);
    __publicField(this, "recoveryCodes", []);
    __publicField(this, "confirmationForm", C({
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
    this.enabling = true;
    try {
      let res = await twoFactorAuthService.enableTwoFactorAuthentication();
      this.qrCode = res.qrCode;
      this.setupKey = res.setupKey;
      this.recoveryCodes = res.recoveryCodes;
    } finally {
      this.enabling = false;
      this.confirming = this.requiresConfirmation;
    }
  }
  async showRecoveryCodes() {
    let res = await profileService.showRecoveryCodes();
    this.recoveryCodes = res.data;
  }
  async confirmTwoFactorAuthentication() {
    var _a;
    try {
      let res = await twoFactorAuthService.confirmTwoFactorAuthentication(this.confirmationForm);
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
    await twoFactorAuthService.regenerateRecoveryCodes();
  }
  async disableTwoFactorAuthentication() {
    this.disabling = true;
    await twoFactorAuthService.disableTwoFactorAuthentication();
    this.disabling = false;
    this.confirming = false;
  }
};
__decorateClass$1([
  decorator({ type: Boolean })
], TwoFactorAuthenticationForm$1.prototype, "requiresConfirmation", 2);
__decorateClass$1([
  decorator$3("twoFactorEnabled")
], TwoFactorAuthenticationForm$1.prototype, "twoFactorEnabledWatcher", 1);
TwoFactorAuthenticationForm$1 = __decorateClass$1([
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
const _sfc_main$1 = toNative(TwoFactorAuthenticationForm$1);
const _hoisted_1$1 = { key: 0 };
const _hoisted_2$1 = { key: 1 };
const _hoisted_3$1 = ["innerHTML"];
const _hoisted_4$1 = { class: "bg-gray-100 dark:bg-gray-900 rounded-lg pa-4" };
const _hoisted_5 = { class: "mt-5" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_InputError = resolveComponent("InputError");
  const _component_ConfirmsPassword = resolveComponent("ConfirmsPassword");
  const _component_ActionSection = resolveComponent("ActionSection");
  return openBlock(), createBlock(_component_ActionSection, null, {
    title: withCtx(() => _cache[1] || (_cache[1] = [
      createTextVNode("Two Factor Authentication")
    ])),
    description: withCtx(() => _cache[2] || (_cache[2] = [
      createTextVNode("Add additional security to your account.")
    ])),
    content: withCtx(() => [
      _ctx.twoFactorEnabled && !_ctx.confirming ? (openBlock(), createBlock(VAlert, {
        key: 0,
        type: "success",
        title: "You have enabled two-factor authentication."
      })) : _ctx.twoFactorEnabled && _ctx.confirming ? (openBlock(), createBlock(VAlert, {
        key: 1,
        type: "info",
        title: "Finish enabling two-factor authentication."
      })) : (openBlock(), createBlock(VAlert, {
        key: 2,
        type: "warning",
        title: "You have not enabled two-factor authentication."
      })),
      _cache[10] || (_cache[10] = createBaseVNode("p", { class: "text-body-1 mt-2 mb-2" }, " When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application. ", -1)),
      _ctx.qrCode ? (openBlock(), createBlock(VCard, {
        key: 3,
        class: "mt-4 pa-4"
      }, {
        default: withCtx(() => [
          createVNode(VCardText, null, {
            default: withCtx(() => [
              _ctx.confirming ? (openBlock(), createElementBlock("p", _hoisted_1$1, " To finish enabling two-factor authentication, scan the QR code using your authenticator app or enter the setup key. ")) : (openBlock(), createElementBlock("p", _hoisted_2$1, "Two-factor authentication is now enabled. Scan the QR code or enter the setup key."))
            ]),
            _: 1
          }),
          createBaseVNode("div", {
            class: "text-center",
            innerHTML: _ctx.qrCode
          }, null, 8, _hoisted_3$1),
          _ctx.setupKey ? (openBlock(), createBlock(VCardText, { key: 0 }, {
            default: withCtx(() => [
              _cache[3] || (_cache[3] = createBaseVNode("strong", null, "Setup Key:", -1)),
              createTextVNode(" " + toDisplayString(_ctx.setupKey), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          _ctx.confirming ? (openBlock(), createBlock(VRow, {
            key: 1,
            class: "mt-4"
          }, {
            default: withCtx(() => [
              createVNode(VCol, { cols: "12" }, {
                default: withCtx(() => [
                  createVNode(VTextField, {
                    modelValue: _ctx.confirmationForm.code,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.confirmationForm.code = $event),
                    label: "Code",
                    autofocus: "",
                    onKeyup: withKeys(_ctx.confirmTwoFactorAuthentication, ["enter"])
                  }, null, 8, ["modelValue", "onKeyup"]),
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
      _ctx.recoveryCodes.length > 0 && !_ctx.confirming ? (openBlock(), createBlock(VCard, {
        key: 4,
        class: "mt-4 pa-4"
      }, {
        default: withCtx(() => [
          createVNode(VCardText, null, {
            default: withCtx(() => [
              _cache[4] || (_cache[4] = createBaseVNode("p", null, "Store these recovery codes safely. They help regain access if you lose your authentication device.", -1)),
              createBaseVNode("div", _hoisted_4$1, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.recoveryCodes, (code) => {
                  return openBlock(), createElementBlock("div", { key: code }, toDisplayString(code), 1);
                }), 128))
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      })) : createCommentVNode("", true),
      createBaseVNode("div", _hoisted_5, [
        !_ctx.twoFactorEnabled ? (openBlock(), createBlock(_component_ConfirmsPassword, {
          key: 0,
          onConfirmed: _ctx.enableTwoFactorAuthentication
        }, {
          default: withCtx(() => [
            createVNode(VBtn, {
              color: "primary",
              variant: "elevated",
              disabled: _ctx.enabling
            }, {
              default: withCtx(() => _cache[5] || (_cache[5] = [
                createTextVNode("Enable")
              ])),
              _: 1
            }, 8, ["disabled"])
          ]),
          _: 1
        }, 8, ["onConfirmed"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _ctx.confirming ? (openBlock(), createBlock(_component_ConfirmsPassword, {
            key: 0,
            onConfirmed: _ctx.confirmTwoFactorAuthentication
          }, {
            default: withCtx(() => [
              createVNode(VBtn, {
                color: "primary",
                class: "me-3",
                disabled: _ctx.enabling
              }, {
                default: withCtx(() => _cache[6] || (_cache[6] = [
                  createTextVNode("Confirm")
                ])),
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
              createVNode(VBtn, { class: "me-3" }, {
                default: withCtx(() => _cache[7] || (_cache[7] = [
                  createTextVNode("Regenerate Recovery Codes")
                ])),
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
              createVNode(VBtn, { class: "me-3" }, {
                default: withCtx(() => _cache[8] || (_cache[8] = [
                  createTextVNode("Show Recovery Codes")
                ])),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["onConfirmed"])) : createCommentVNode("", true),
          createVNode(_component_ConfirmsPassword, { onConfirmed: _ctx.disableTwoFactorAuthentication }, {
            default: withCtx(() => [
              createVNode(VBtn, {
                color: "error",
                disabled: _ctx.disabling
              }, {
                default: withCtx(() => _cache[9] || (_cache[9] = [
                  createTextVNode("Disable")
                ])),
                _: 1
              }, 8, ["disabled"])
            ]),
            _: 1
          }, 8, ["onConfirmed"])
        ], 64))
      ])
    ]),
    _: 1
  });
}
const TwoFactorAuthenticationForm2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
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
let ProfileShowPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "confirmsTwoFactorAuthentication");
    __publicField(this, "sessions");
  }
};
__decorateClass([
  decorator({ type: Boolean })
], ProfileShowPage.prototype, "confirmsTwoFactorAuthentication", 2);
__decorateClass([
  decorator({ type: Array })
], ProfileShowPage.prototype, "sessions", 2);
ProfileShowPage = __decorateClass([
  Component({
    components: {
      AppLayout,
      DeleteUserForm,
      LogoutOtherBrowserSessionsForm: LogoutOtherBrowserSessionsForm2,
      SectionBorder: SectionBorder2,
      TwoFactorAuthenticationForm: TwoFactorAuthenticationForm2,
      UpdatePasswordForm,
      UpdateProfileInformationForm
    }
  })
], ProfileShowPage);
const _sfc_main = toNative(ProfileShowPage);
const _hoisted_1 = { class: "max-w-7xl mx-auto py-10 sm:px-6 lg:px-8" };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { key: 1 };
const _hoisted_4 = { key: 2 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_UpdateProfileInformationForm = resolveComponent("UpdateProfileInformationForm");
  const _component_SectionBorder = resolveComponent("SectionBorder");
  const _component_UpdatePasswordForm = resolveComponent("UpdatePasswordForm");
  const _component_TwoFactorAuthenticationForm = resolveComponent("TwoFactorAuthenticationForm");
  const _component_LogoutOtherBrowserSessionsForm = resolveComponent("LogoutOtherBrowserSessionsForm");
  const _component_DeleteUserForm = resolveComponent("DeleteUserForm");
  const _component_AppLayout = resolveComponent("AppLayout");
  return openBlock(), createBlock(_component_AppLayout, { title: "Profile" }, {
    header: withCtx(() => _cache[0] || (_cache[0] = [
      createBaseVNode("h2", { class: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight" }, " Profile ", -1)
    ])),
    default: withCtx(() => [
      createBaseVNode("div", null, [
        createBaseVNode("div", _hoisted_1, [
          _ctx.$page.props.jetstream.canUpdateProfileInformation ? (openBlock(), createElementBlock("div", _hoisted_2, [
            createVNode(_component_UpdateProfileInformationForm, {
              user: _ctx.$page.props.auth.user
            }, null, 8, ["user"]),
            createVNode(_component_SectionBorder)
          ])) : createCommentVNode("", true),
          _ctx.$page.props.jetstream.canUpdatePassword ? (openBlock(), createElementBlock("div", _hoisted_3, [
            createVNode(_component_UpdatePasswordForm, { class: "mt-10 sm:mt-0" }),
            createVNode(_component_SectionBorder)
          ])) : createCommentVNode("", true),
          _ctx.$page.props.jetstream.canManageTwoFactorAuthentication ? (openBlock(), createElementBlock("div", _hoisted_4, [
            createVNode(_component_TwoFactorAuthenticationForm, {
              "requires-confirmation": _ctx.confirmsTwoFactorAuthentication,
              class: "mt-10 sm:mt-0"
            }, null, 8, ["requires-confirmation"]),
            createVNode(_component_SectionBorder)
          ])) : createCommentVNode("", true),
          createVNode(_component_LogoutOtherBrowserSessionsForm, {
            sessions: _ctx.sessions,
            class: "mt-10 sm:mt-0"
          }, null, 8, ["sessions"]),
          _ctx.$page.props.jetstream.hasAccountDeletionFeatures ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
            createVNode(_component_SectionBorder),
            createVNode(_component_DeleteUserForm, { class: "mt-10 sm:mt-0" })
          ], 64)) : createCommentVNode("", true)
        ])
      ])
    ]),
    _: 1
  });
}
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Show as default
};
//# sourceMappingURL=Show-BJ6VdwU4.js.map
