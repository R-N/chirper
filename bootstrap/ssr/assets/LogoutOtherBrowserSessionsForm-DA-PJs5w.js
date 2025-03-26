var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { useForm } from "@inertiajs/vue3";
import { A as ActionMessage } from "./ActionMessage-k3cMCvSb.js";
import { A as ActionSection } from "./ActionSection-8zbzdLMG.js";
import { VDialog, VTextField, VBtn, VRow, VCol } from "vuetify/components";
import { toNative, Vue, Prop, Ref, Component } from "vue-facing-decorator";
import { a as api } from "./axios-DQioN9B6.js";
import { resolveComponent, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, withKeys, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { VBtn as VBtn$1 } from "vuetify/lib/components/VBtn/index.mjs";
import { VDialog as VDialog$1 } from "vuetify/lib/components/VDialog/index.mjs";
import { VRow as VRow$1, VCol as VCol$1 } from "vuetify/lib/components/VGrid/index.mjs";
import { VIcon } from "vuetify/lib/components/VIcon/index.mjs";
import { VTextField as VTextField$1 } from "vuetify/lib/components/VTextField/index.mjs";
import "vuetify/lib/components/transitions/index.mjs";
import "./SectionTitle-BOMh00mo.js";
import "vuetify/lib/components/VCard/index.mjs";
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
const _sfc_main = toNative(LogoutOtherBrowserSessionsForm$1);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ActionSection = resolveComponent("ActionSection");
  const _component_ActionMessage = resolveComponent("ActionMessage");
  _push(ssrRenderComponent(_component_ActionSection, _attrs, {
    title: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Browser Sessions`);
      } else {
        return [
          createTextVNode("Browser Sessions")
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
        _push2(`<p class="text-body-1"${_scopeId}> If necessary, you may log out of all other browser sessions. Some recent sessions are listed below. </p>`);
        if (_ctx.sessions.length) {
          _push2(`<div class="mt-5 space-y-4"${_scopeId}><!--[-->`);
          ssrRenderList(_ctx.sessions, (session, i) => {
            _push2(ssrRenderComponent(VRow$1, {
              key: i,
              class: "items-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol$1, { cols: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(session.agent.is_desktop ? "mdi-monitor" : "mdi-cellphone")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(session.agent.is_desktop ? "mdi-monitor" : "mdi-cellphone"), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VIcon, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(session.agent.is_desktop ? "mdi-monitor" : "mdi-cellphone"), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol$1, { cols: "11" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p${_scopeId3}>${ssrInterpolate(session.agent.platform || "Unknown")} - ${ssrInterpolate(session.agent.browser || "Unknown")}</p><p class="text-body-1 text-sm"${_scopeId3}>${ssrInterpolate(session.ip_address)} `);
                        if (session.is_current_device) {
                          _push4(`<span class="text-green-500 font-semibold"${_scopeId3}>(This device)</span>`);
                        } else {
                          _push4(`<span${_scopeId3}>Last active ${ssrInterpolate(session.last_active)}</span>`);
                        }
                        _push4(`</p>`);
                      } else {
                        return [
                          createVNode("p", null, toDisplayString(session.agent.platform || "Unknown") + " - " + toDisplayString(session.agent.browser || "Unknown"), 1),
                          createVNode("p", { class: "text-body-1 text-sm" }, [
                            createTextVNode(toDisplayString(session.ip_address) + " ", 1),
                            session.is_current_device ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-green-500 font-semibold"
                            }, "(This device)")) : (openBlock(), createBlock("span", { key: 1 }, "Last active " + toDisplayString(session.last_active), 1))
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol$1, { cols: "1" }, {
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
                    createVNode(VCol$1, { cols: "11" }, {
                      default: withCtx(() => [
                        createVNode("p", null, toDisplayString(session.agent.platform || "Unknown") + " - " + toDisplayString(session.agent.browser || "Unknown"), 1),
                        createVNode("p", { class: "text-body-1 text-sm" }, [
                          createTextVNode(toDisplayString(session.ip_address) + " ", 1),
                          session.is_current_device ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-green-500 font-semibold"
                          }, "(This device)")) : (openBlock(), createBlock("span", { key: 1 }, "Last active " + toDisplayString(session.last_active), 1))
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          });
          _push2(`<!--]--></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="flex items-center mt-5"${_scopeId}>`);
        _push2(ssrRenderComponent(VBtn$1, {
          color: "primary",
          onClick: _ctx.confirmLogout
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Log Out Other Browser Sessions`);
            } else {
              return [
                createTextVNode("Log Out Other Browser Sessions")
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
              _push3(`Done.`);
            } else {
              return [
                createTextVNode("Done.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
        _push2(ssrRenderComponent(VDialog$1, {
          modelValue: _ctx.confirmingLogout,
          "onUpdate:modelValue": ($event) => _ctx.confirmingLogout = $event,
          "max-width": "500px"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VRow$1, { class: "p-4" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VCol$1, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<h3${_scopeId4}>Log Out Other Browser Sessions</h3><p class="mt-2"${_scopeId4}>Please enter your password to confirm.</p>`);
                          _push5(ssrRenderComponent(VTextField$1, {
                            ref: "passwordInput",
                            modelValue: _ctx.form.password,
                            "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                            label: "Password",
                            type: "password",
                            autocomplete: "current-password",
                            variant: "outlined",
                            class: "mt-4",
                            onKeyup: _ctx.logoutOtherBrowserSessions
                          }, null, _parent5, _scopeId4));
                          if (_ctx.form.errors.password) {
                            _push5(`<p class="text-red-500 text-sm mt-2"${_scopeId4}>${ssrInterpolate(_ctx.form.errors.password)}</p>`);
                          } else {
                            _push5(`<!---->`);
                          }
                          _push5(`<div class="mt-4 flex justify-end"${_scopeId4}>`);
                          _push5(ssrRenderComponent(VBtn$1, {
                            variant: "text",
                            onClick: _ctx.closeModal
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`Cancel`);
                              } else {
                                return [
                                  createTextVNode("Cancel")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(VBtn$1, {
                            color: "primary",
                            loading: _ctx.form.processing,
                            onClick: _ctx.logoutOtherBrowserSessions,
                            class: "ms-3"
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(` Log Out `);
                              } else {
                                return [
                                  createTextVNode(" Log Out ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(`</div>`);
                        } else {
                          return [
                            createVNode("h3", null, "Log Out Other Browser Sessions"),
                            createVNode("p", { class: "mt-2" }, "Please enter your password to confirm."),
                            createVNode(VTextField$1, {
                              ref: "passwordInput",
                              modelValue: _ctx.form.password,
                              "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                              label: "Password",
                              type: "password",
                              autocomplete: "current-password",
                              variant: "outlined",
                              class: "mt-4",
                              onKeyup: withKeys(_ctx.logoutOtherBrowserSessions, ["enter"])
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                            _ctx.form.errors.password ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-red-500 text-sm mt-2"
                            }, toDisplayString(_ctx.form.errors.password), 1)) : createCommentVNode("", true),
                            createVNode("div", { class: "mt-4 flex justify-end" }, [
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
                                loading: _ctx.form.processing,
                                onClick: _ctx.logoutOtherBrowserSessions,
                                class: "ms-3"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Log Out ")
                                ]),
                                _: 1
                              }, 8, ["loading", "onClick"])
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VCol$1, null, {
                        default: withCtx(() => [
                          createVNode("h3", null, "Log Out Other Browser Sessions"),
                          createVNode("p", { class: "mt-2" }, "Please enter your password to confirm."),
                          createVNode(VTextField$1, {
                            ref: "passwordInput",
                            modelValue: _ctx.form.password,
                            "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                            label: "Password",
                            type: "password",
                            autocomplete: "current-password",
                            variant: "outlined",
                            class: "mt-4",
                            onKeyup: withKeys(_ctx.logoutOtherBrowserSessions, ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                          _ctx.form.errors.password ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-red-500 text-sm mt-2"
                          }, toDisplayString(_ctx.form.errors.password), 1)) : createCommentVNode("", true),
                          createVNode("div", { class: "mt-4 flex justify-end" }, [
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
                              loading: _ctx.form.processing,
                              onClick: _ctx.logoutOtherBrowserSessions,
                              class: "ms-3"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Log Out ")
                              ]),
                              _: 1
                            }, 8, ["loading", "onClick"])
                          ])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VRow$1, { class: "p-4" }, {
                  default: withCtx(() => [
                    createVNode(VCol$1, null, {
                      default: withCtx(() => [
                        createVNode("h3", null, "Log Out Other Browser Sessions"),
                        createVNode("p", { class: "mt-2" }, "Please enter your password to confirm."),
                        createVNode(VTextField$1, {
                          ref: "passwordInput",
                          modelValue: _ctx.form.password,
                          "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                          label: "Password",
                          type: "password",
                          autocomplete: "current-password",
                          variant: "outlined",
                          class: "mt-4",
                          onKeyup: withKeys(_ctx.logoutOtherBrowserSessions, ["enter"])
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                        _ctx.form.errors.password ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-red-500 text-sm mt-2"
                        }, toDisplayString(_ctx.form.errors.password), 1)) : createCommentVNode("", true),
                        createVNode("div", { class: "mt-4 flex justify-end" }, [
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
                            loading: _ctx.form.processing,
                            onClick: _ctx.logoutOtherBrowserSessions,
                            class: "ms-3"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Log Out ")
                            ]),
                            _: 1
                          }, 8, ["loading", "onClick"])
                        ])
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
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("p", { class: "text-body-1" }, " If necessary, you may log out of all other browser sessions. Some recent sessions are listed below. "),
          _ctx.sessions.length ? (openBlock(), createBlock("div", {
            key: 0,
            class: "mt-5 space-y-4"
          }, [
            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.sessions, (session, i) => {
              return openBlock(), createBlock(VRow$1, {
                key: i,
                class: "items-center"
              }, {
                default: withCtx(() => [
                  createVNode(VCol$1, { cols: "1" }, {
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
                  createVNode(VCol$1, { cols: "11" }, {
                    default: withCtx(() => [
                      createVNode("p", null, toDisplayString(session.agent.platform || "Unknown") + " - " + toDisplayString(session.agent.browser || "Unknown"), 1),
                      createVNode("p", { class: "text-body-1 text-sm" }, [
                        createTextVNode(toDisplayString(session.ip_address) + " ", 1),
                        session.is_current_device ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-green-500 font-semibold"
                        }, "(This device)")) : (openBlock(), createBlock("span", { key: 1 }, "Last active " + toDisplayString(session.last_active), 1))
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024);
            }), 128))
          ])) : createCommentVNode("", true),
          createVNode("div", { class: "flex items-center mt-5" }, [
            createVNode(VBtn$1, {
              color: "primary",
              onClick: _ctx.confirmLogout
            }, {
              default: withCtx(() => [
                createTextVNode("Log Out Other Browser Sessions")
              ]),
              _: 1
            }, 8, ["onClick"]),
            createVNode(_component_ActionMessage, {
              on: _ctx.form.recentlySuccessful,
              class: "ms-3"
            }, {
              default: withCtx(() => [
                createTextVNode("Done.")
              ]),
              _: 1
            }, 8, ["on"])
          ]),
          createVNode(VDialog$1, {
            modelValue: _ctx.confirmingLogout,
            "onUpdate:modelValue": ($event) => _ctx.confirmingLogout = $event,
            "max-width": "500px"
          }, {
            default: withCtx(() => [
              createVNode(VRow$1, { class: "p-4" }, {
                default: withCtx(() => [
                  createVNode(VCol$1, null, {
                    default: withCtx(() => [
                      createVNode("h3", null, "Log Out Other Browser Sessions"),
                      createVNode("p", { class: "mt-2" }, "Please enter your password to confirm."),
                      createVNode(VTextField$1, {
                        ref: "passwordInput",
                        modelValue: _ctx.form.password,
                        "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                        label: "Password",
                        type: "password",
                        autocomplete: "current-password",
                        variant: "outlined",
                        class: "mt-4",
                        onKeyup: withKeys(_ctx.logoutOtherBrowserSessions, ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                      _ctx.form.errors.password ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-red-500 text-sm mt-2"
                      }, toDisplayString(_ctx.form.errors.password), 1)) : createCommentVNode("", true),
                      createVNode("div", { class: "mt-4 flex justify-end" }, [
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
                          loading: _ctx.form.processing,
                          onClick: _ctx.logoutOtherBrowserSessions,
                          class: "ms-3"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Log Out ")
                          ]),
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
          }, 8, ["modelValue", "onUpdate:modelValue"])
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
