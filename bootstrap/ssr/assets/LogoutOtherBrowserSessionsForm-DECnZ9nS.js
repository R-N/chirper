var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./ActionMessage-lseuyjgQ.js";
import { a as _sfc_main$2, b as _sfc_main$3 } from "./DialogModal-Dl-MOD2C.js";
import { _ as _sfc_main$4 } from "./InputError-BRdBLb-x.js";
import { _ as _sfc_main$5 } from "./PrimaryButton-CtpSN9QQ.js";
import { _ as _sfc_main$6 } from "./SecondaryButton-BgIg9sGF.js";
import { _ as _sfc_main$7 } from "./TextInput-2NFZntg2.js";
import { toNative, Vue, Prop, Ref, Component } from "vue-facing-decorator";
import { a as api } from "./axios-DQioN9B6.js";
import { resolveComponent, withCtx, createTextVNode, createVNode, withKeys, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./SectionTitle-4i2p8f-X.js";
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
let LogoutOtherBrowserSessionsForm$1 = class LogoutOtherBrowserSessionsForm extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "sessions");
    __publicField(this, "confirmingLogout", false);
    __publicField(this, "passwordInput");
    __publicField(this, "form", useForm({
      password: ""
    }));
  }
  confirmLogout() {
    this.confirmingLogout = true;
    setTimeout(() => this.passwordInput.focus(), 250);
  }
  async logoutOtherBrowserSessions() {
    let target = route("other-browser-sessions.destroy");
    try {
      let res = await api.delete(target, { data: this.form });
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
__decorateClass([
  Prop(Array)
], LogoutOtherBrowserSessionsForm$1.prototype, "sessions", 2);
__decorateClass([
  Ref("passwordInput")
], LogoutOtherBrowserSessionsForm$1.prototype, "passwordInput", 2);
LogoutOtherBrowserSessionsForm$1 = __decorateClass([
  Component({
    components: {
      ActionMessage: _sfc_main$1,
      ActionSection: _sfc_main$2,
      DialogModal: _sfc_main$3,
      InputError: _sfc_main$4,
      PrimaryButton: _sfc_main$5,
      SecondaryButton: _sfc_main$6,
      TextInput: _sfc_main$7
    }
  })
], LogoutOtherBrowserSessionsForm$1);
const _sfc_main = toNative(LogoutOtherBrowserSessionsForm$1);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ActionSection = resolveComponent("ActionSection");
  const _component_PrimaryButton = resolveComponent("PrimaryButton");
  const _component_ActionMessage = resolveComponent("ActionMessage");
  const _component_DialogModal = resolveComponent("DialogModal");
  const _component_TextInput = resolveComponent("TextInput");
  const _component_InputError = resolveComponent("InputError");
  const _component_SecondaryButton = resolveComponent("SecondaryButton");
  _push(ssrRenderComponent(_component_ActionSection, _attrs, {
    title: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Browser Sessions `);
      } else {
        return [
          createTextVNode(" Browser Sessions ")
        ];
      }
    }),
    description: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Manage and log out your active sessions on other browsers and devices. `);
      } else {
        return [
          createTextVNode(" Manage and log out your active sessions on other browsers and devices. ")
        ];
      }
    }),
    content: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="max-w-xl text-sm text-gray-600 dark:text-gray-400"${_scopeId}> If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been compromised, you should also update your password. </div>`);
        if (_ctx.sessions.length > 0) {
          _push2(`<div class="mt-5 space-y-6"${_scopeId}><!--[-->`);
          ssrRenderList(_ctx.sessions, (session, i) => {
            _push2(`<div class="flex items-center"${_scopeId}><div${_scopeId}>`);
            if (session.agent.is_desktop) {
              _push2(`<svg class="size-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"${_scopeId}></path></svg>`);
            } else {
              _push2(`<svg class="size-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"${_scopeId}></path></svg>`);
            }
            _push2(`</div><div class="ms-3"${_scopeId}><div class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(session.agent.platform ? session.agent.platform : "Unknown")} - ${ssrInterpolate(session.agent.browser ? session.agent.browser : "Unknown")}</div><div${_scopeId}><div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(session.ip_address)}, `);
            if (session.is_current_device) {
              _push2(`<span class="text-green-500 font-semibold"${_scopeId}>This device</span>`);
            } else {
              _push2(`<span${_scopeId}>Last active ${ssrInterpolate(session.last_active)}</span>`);
            }
            _push2(`</div></div></div></div>`);
          });
          _push2(`<!--]--></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="flex items-center mt-5"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_PrimaryButton, { onClick: _ctx.confirmLogout }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Log Out Other Browser Sessions `);
            } else {
              return [
                createTextVNode(" Log Out Other Browser Sessions ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ActionMessage, {
          on: _ctx.form.recentlySuccessful,
          class: "ms-3"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Done. `);
            } else {
              return [
                createTextVNode(" Done. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
        _push2(ssrRenderComponent(_component_DialogModal, {
          show: _ctx.confirmingLogout,
          onClose: _ctx.closeModal
        }, {
          title: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Log Out Other Browser Sessions `);
            } else {
              return [
                createTextVNode(" Log Out Other Browser Sessions ")
              ];
            }
          }),
          content: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Please enter your password to confirm you would like to log out of your other browser sessions across all of your devices. <div class="mt-4"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_TextInput, {
                ref: "passwordInput",
                modelValue: _ctx.form.password,
                "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                type: "password",
                class: "mt-1 block w-3/4",
                placeholder: "Password",
                autocomplete: "current-password",
                onKeyup: _ctx.logoutOtherBrowserSessions
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_InputError, {
                message: _ctx.form.errors.password,
                class: "mt-2"
              }, null, _parent3, _scopeId2));
              _push3(`</div>`);
            } else {
              return [
                createTextVNode(" Please enter your password to confirm you would like to log out of your other browser sessions across all of your devices. "),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_component_TextInput, {
                    ref: "passwordInput",
                    modelValue: _ctx.form.password,
                    "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                    type: "password",
                    class: "mt-1 block w-3/4",
                    placeholder: "Password",
                    autocomplete: "current-password",
                    onKeyup: withKeys(_ctx.logoutOtherBrowserSessions, ["enter"])
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                  createVNode(_component_InputError, {
                    message: _ctx.form.errors.password,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])
              ];
            }
          }),
          footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_SecondaryButton, { onClick: _ctx.closeModal }, {
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
              _push3(ssrRenderComponent(_component_PrimaryButton, {
                class: ["ms-3", { "opacity-25": _ctx.form.processing }],
                disabled: _ctx.form.processing,
                onClick: _ctx.logoutOtherBrowserSessions
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Log Out Other Browser Sessions `);
                  } else {
                    return [
                      createTextVNode(" Log Out Other Browser Sessions ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_SecondaryButton, { onClick: _ctx.closeModal }, {
                  default: withCtx(() => [
                    createTextVNode(" Cancel ")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_PrimaryButton, {
                  class: ["ms-3", { "opacity-25": _ctx.form.processing }],
                  disabled: _ctx.form.processing,
                  onClick: _ctx.logoutOtherBrowserSessions
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Log Out Other Browser Sessions ")
                  ]),
                  _: 1
                }, 8, ["class", "disabled", "onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("div", { class: "max-w-xl text-sm text-gray-600 dark:text-gray-400" }, " If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been compromised, you should also update your password. "),
          _ctx.sessions.length > 0 ? (openBlock(), createBlock("div", {
            key: 0,
            class: "mt-5 space-y-6"
          }, [
            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.sessions, (session, i) => {
              return openBlock(), createBlock("div", {
                key: i,
                class: "flex items-center"
              }, [
                createVNode("div", null, [
                  session.agent.is_desktop ? (openBlock(), createBlock("svg", {
                    key: 0,
                    class: "size-8 text-gray-500",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                    })
                  ])) : (openBlock(), createBlock("svg", {
                    key: 1,
                    class: "size-8 text-gray-500",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                    })
                  ]))
                ]),
                createVNode("div", { class: "ms-3" }, [
                  createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(session.agent.platform ? session.agent.platform : "Unknown") + " - " + toDisplayString(session.agent.browser ? session.agent.browser : "Unknown"), 1),
                  createVNode("div", null, [
                    createVNode("div", { class: "text-xs text-gray-500" }, [
                      createTextVNode(toDisplayString(session.ip_address) + ", ", 1),
                      session.is_current_device ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "text-green-500 font-semibold"
                      }, "This device")) : (openBlock(), createBlock("span", { key: 1 }, "Last active " + toDisplayString(session.last_active), 1))
                    ])
                  ])
                ])
              ]);
            }), 128))
          ])) : createCommentVNode("", true),
          createVNode("div", { class: "flex items-center mt-5" }, [
            createVNode(_component_PrimaryButton, { onClick: _ctx.confirmLogout }, {
              default: withCtx(() => [
                createTextVNode(" Log Out Other Browser Sessions ")
              ]),
              _: 1
            }, 8, ["onClick"]),
            createVNode(_component_ActionMessage, {
              on: _ctx.form.recentlySuccessful,
              class: "ms-3"
            }, {
              default: withCtx(() => [
                createTextVNode(" Done. ")
              ]),
              _: 1
            }, 8, ["on"])
          ]),
          createVNode(_component_DialogModal, {
            show: _ctx.confirmingLogout,
            onClose: _ctx.closeModal
          }, {
            title: withCtx(() => [
              createTextVNode(" Log Out Other Browser Sessions ")
            ]),
            content: withCtx(() => [
              createTextVNode(" Please enter your password to confirm you would like to log out of your other browser sessions across all of your devices. "),
              createVNode("div", { class: "mt-4" }, [
                createVNode(_component_TextInput, {
                  ref: "passwordInput",
                  modelValue: _ctx.form.password,
                  "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                  type: "password",
                  class: "mt-1 block w-3/4",
                  placeholder: "Password",
                  autocomplete: "current-password",
                  onKeyup: withKeys(_ctx.logoutOtherBrowserSessions, ["enter"])
                }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                createVNode(_component_InputError, {
                  message: _ctx.form.errors.password,
                  class: "mt-2"
                }, null, 8, ["message"])
              ])
            ]),
            footer: withCtx(() => [
              createVNode(_component_SecondaryButton, { onClick: _ctx.closeModal }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_PrimaryButton, {
                class: ["ms-3", { "opacity-25": _ctx.form.processing }],
                disabled: _ctx.form.processing,
                onClick: _ctx.logoutOtherBrowserSessions
              }, {
                default: withCtx(() => [
                  createTextVNode(" Log Out Other Browser Sessions ")
                ]),
                _: 1
              }, 8, ["class", "disabled", "onClick"])
            ]),
            _: 1
          }, 8, ["show", "onClose"])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LogoutOtherBrowserSessionsForm2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  LogoutOtherBrowserSessionsForm2 as default
};
