var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BCaUMAMf.js";
import { useForm, router, Head, Link } from "@inertiajs/vue3";
import { toNative, Vue, Prop, Component } from "vue-facing-decorator";
import { VCard, VCardTitle, VCardText, VCardActions, VBtn, VRow, VCol } from "vuetify/components";
import { a as api, _ as _export_sfc } from "./axios-l-eSoL-p.js";
import { resolveComponent, withCtx, createVNode, createTextVNode, withModifiers, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { VBtn as VBtn$1 } from "vuetify/lib/components/VBtn/index.mjs";
import { VCard as VCard$1, VCardTitle as VCardTitle$1, VCardText as VCardText$1, VCardActions as VCardActions$1 } from "vuetify/lib/components/VCard/index.mjs";
import { VRow as VRow$1, VCol as VCol$1 } from "vuetify/lib/components/VGrid/index.mjs";
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
let VerifyEmailPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "status");
    __publicField(this, "form", useForm({
      //email: '',
    }));
  }
  get verificationLinkSent() {
    return this.status === "verification-link-sent";
  }
  async submit() {
    let res = await api.post(route("verification.send"), this.form);
    router.visit(res.data.redirect || "/login");
  }
};
__decorateClass([
  Prop(String)
], VerifyEmailPage.prototype, "status", 2);
VerifyEmailPage = __decorateClass([
  Component({
    components: {
      AuthenticationCardLogo: _sfc_main$1,
      Head,
      Link,
      VCard,
      VCardTitle,
      VCardText,
      VCardActions,
      VBtn,
      VRow,
      VCol
    }
  })
], VerifyEmailPage);
const _sfc_main = toNative(VerifyEmailPage);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_AuthenticationCardLogo = resolveComponent("AuthenticationCardLogo");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Email Verification" }, null, _parent));
  _push(ssrRenderComponent(VRow$1, { justify: "center" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCol$1, {
          cols: "12",
          sm: "8",
          md: "6",
          lg: "4"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCard$1, {
                class: "pa-6",
                elevation: "4"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VCardTitle$1, { class: "text-center" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_AuthenticationCardLogo, null, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_AuthenticationCardLogo)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VCardText$1, { class: "text-secondary text-sm" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(` Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn&#39;t receive the email, we will gladly send you another. `);
                        } else {
                          return [
                            createTextVNode(" Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    if (_ctx.verificationLinkSent) {
                      _push4(ssrRenderComponent(VCardText$1, { class: "font-medium text-green" }, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(` A new verification link has been sent to the email address you provided in your profile settings. `);
                          } else {
                            return [
                              createTextVNode(" A new verification link has been sent to the email address you provided in your profile settings. ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                    } else {
                      _push4(`<!---->`);
                    }
                    _push4(ssrRenderComponent(VCardActions$1, { class: "mt-4 d-flex justify-space-between" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VBtn$1, {
                            color: "primary",
                            loading: _ctx.form.processing,
                            onClick: _ctx.submit
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(` Resend Verification Email `);
                              } else {
                                return [
                                  createTextVNode(" Resend Verification Email ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(`<div${_scopeId4}>`);
                          _push5(ssrRenderComponent(VBtn$1, {
                            variant: "text",
                            href: _ctx.route("profile.show")
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(` Edit Profile `);
                              } else {
                                return [
                                  createTextVNode(" Edit Profile ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(VBtn$1, {
                            variant: "text",
                            href: _ctx.route("logout"),
                            method: "post",
                            as: "button",
                            class: "ms-2"
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
                            createVNode(VBtn$1, {
                              color: "primary",
                              loading: _ctx.form.processing,
                              onClick: withModifiers(_ctx.submit, ["prevent"])
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Resend Verification Email ")
                              ]),
                              _: 1
                            }, 8, ["loading", "onClick"]),
                            createVNode("div", null, [
                              createVNode(VBtn$1, {
                                variant: "text",
                                href: _ctx.route("profile.show")
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Edit Profile ")
                                ]),
                                _: 1
                              }, 8, ["href"]),
                              createVNode(VBtn$1, {
                                variant: "text",
                                href: _ctx.route("logout"),
                                method: "post",
                                as: "button",
                                class: "ms-2"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Log Out ")
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VCardTitle$1, { class: "text-center" }, {
                        default: withCtx(() => [
                          createVNode(_component_AuthenticationCardLogo)
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText$1, { class: "text-secondary text-sm" }, {
                        default: withCtx(() => [
                          createTextVNode(" Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. ")
                        ]),
                        _: 1
                      }),
                      _ctx.verificationLinkSent ? (openBlock(), createBlock(VCardText$1, {
                        key: 0,
                        class: "font-medium text-green"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" A new verification link has been sent to the email address you provided in your profile settings. ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(VCardActions$1, { class: "mt-4 d-flex justify-space-between" }, {
                        default: withCtx(() => [
                          createVNode(VBtn$1, {
                            color: "primary",
                            loading: _ctx.form.processing,
                            onClick: withModifiers(_ctx.submit, ["prevent"])
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Resend Verification Email ")
                            ]),
                            _: 1
                          }, 8, ["loading", "onClick"]),
                          createVNode("div", null, [
                            createVNode(VBtn$1, {
                              variant: "text",
                              href: _ctx.route("profile.show")
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Edit Profile ")
                              ]),
                              _: 1
                            }, 8, ["href"]),
                            createVNode(VBtn$1, {
                              variant: "text",
                              href: _ctx.route("logout"),
                              method: "post",
                              as: "button",
                              class: "ms-2"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Log Out ")
                              ]),
                              _: 1
                            }, 8, ["href"])
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
                createVNode(VCard$1, {
                  class: "pa-6",
                  elevation: "4"
                }, {
                  default: withCtx(() => [
                    createVNode(VCardTitle$1, { class: "text-center" }, {
                      default: withCtx(() => [
                        createVNode(_component_AuthenticationCardLogo)
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText$1, { class: "text-secondary text-sm" }, {
                      default: withCtx(() => [
                        createTextVNode(" Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. ")
                      ]),
                      _: 1
                    }),
                    _ctx.verificationLinkSent ? (openBlock(), createBlock(VCardText$1, {
                      key: 0,
                      class: "font-medium text-green"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" A new verification link has been sent to the email address you provided in your profile settings. ")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(VCardActions$1, { class: "mt-4 d-flex justify-space-between" }, {
                      default: withCtx(() => [
                        createVNode(VBtn$1, {
                          color: "primary",
                          loading: _ctx.form.processing,
                          onClick: withModifiers(_ctx.submit, ["prevent"])
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Resend Verification Email ")
                          ]),
                          _: 1
                        }, 8, ["loading", "onClick"]),
                        createVNode("div", null, [
                          createVNode(VBtn$1, {
                            variant: "text",
                            href: _ctx.route("profile.show")
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Edit Profile ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode(VBtn$1, {
                            variant: "text",
                            href: _ctx.route("logout"),
                            method: "post",
                            as: "button",
                            class: "ms-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Log Out ")
                            ]),
                            _: 1
                          }, 8, ["href"])
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
          createVNode(VCol$1, {
            cols: "12",
            sm: "8",
            md: "6",
            lg: "4"
          }, {
            default: withCtx(() => [
              createVNode(VCard$1, {
                class: "pa-6",
                elevation: "4"
              }, {
                default: withCtx(() => [
                  createVNode(VCardTitle$1, { class: "text-center" }, {
                    default: withCtx(() => [
                      createVNode(_component_AuthenticationCardLogo)
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText$1, { class: "text-secondary text-sm" }, {
                    default: withCtx(() => [
                      createTextVNode(" Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. ")
                    ]),
                    _: 1
                  }),
                  _ctx.verificationLinkSent ? (openBlock(), createBlock(VCardText$1, {
                    key: 0,
                    class: "font-medium text-green"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" A new verification link has been sent to the email address you provided in your profile settings. ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(VCardActions$1, { class: "mt-4 d-flex justify-space-between" }, {
                    default: withCtx(() => [
                      createVNode(VBtn$1, {
                        color: "primary",
                        loading: _ctx.form.processing,
                        onClick: withModifiers(_ctx.submit, ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Resend Verification Email ")
                        ]),
                        _: 1
                      }, 8, ["loading", "onClick"]),
                      createVNode("div", null, [
                        createVNode(VBtn$1, {
                          variant: "text",
                          href: _ctx.route("profile.show")
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Edit Profile ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(VBtn$1, {
                          variant: "text",
                          href: _ctx.route("logout"),
                          method: "post",
                          as: "button",
                          class: "ms-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Log Out ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ]),
                    _: 1
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const VerifyEmail = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  VerifyEmail as default
};
