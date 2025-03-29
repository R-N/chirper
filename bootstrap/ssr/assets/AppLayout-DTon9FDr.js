var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { mergeProps, useSSRContext, resolveComponent, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, renderSlot } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "./axios-D4gWzKUO.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { VAppBar, VToolbarTitle, VBtn, VMenu, VList, VListItem, VAvatar, VIcon, VContainer, VRow, VCol, VNavigationDrawer, VImg, VMain } from "vuetify/components";
import { Prop, Component, toNative, Vue } from "vue-facing-decorator";
import { a as authService } from "./auth-CGQkd51U.js";
import { VApp } from "vuetify/lib/components/VApp/index.mjs";
import { VAppBar as VAppBar$1 } from "vuetify/lib/components/VAppBar/index.mjs";
import { VAvatar as VAvatar$1 } from "vuetify/lib/components/VAvatar/index.mjs";
import { VBtn as VBtn$1 } from "vuetify/lib/components/VBtn/index.mjs";
import { VSpacer } from "vuetify/lib/components/VGrid/index.mjs";
import { VIcon as VIcon$1 } from "vuetify/lib/components/VIcon/index.mjs";
import { VImg as VImg$1 } from "vuetify/lib/components/VImg/index.mjs";
import { VList as VList$1, VListItem as VListItem$1 } from "vuetify/lib/components/VList/index.mjs";
import { VMain as VMain$1 } from "vuetify/lib/components/VMain/index.mjs";
import { VMenu as VMenu$1 } from "vuetify/lib/components/VMenu/index.mjs";
import { VNavigationDrawer as VNavigationDrawer$1 } from "vuetify/lib/components/VNavigationDrawer/index.mjs";
import { VToolbarTitle as VToolbarTitle$1 } from "vuetify/lib/components/VToolbar/index.mjs";
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    viewBox: "0 0 316 316",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><path d="M305.8 81.125C305.77 80.995 305.69 80.885 305.65 80.755C305.56 80.525 305.49 80.285 305.37 80.075C305.29 79.935 305.17 79.815 305.07 79.685C304.94 79.515 304.83 79.325 304.68 79.175C304.55 79.045 304.39 78.955 304.25 78.845C304.09 78.715 303.95 78.575 303.77 78.475L251.32 48.275C249.97 47.495 248.31 47.495 246.96 48.275L194.51 78.475C194.33 78.575 194.19 78.725 194.03 78.845C193.89 78.955 193.73 79.045 193.6 79.175C193.45 79.325 193.34 79.515 193.21 79.685C193.11 79.815 192.99 79.935 192.91 80.075C192.79 80.285 192.71 80.525 192.63 80.755C192.58 80.875 192.51 80.995 192.48 81.125C192.38 81.495 192.33 81.875 192.33 82.265V139.625L148.62 164.795V52.575C148.62 52.185 148.57 51.805 148.47 51.435C148.44 51.305 148.36 51.195 148.32 51.065C148.23 50.835 148.16 50.595 148.04 50.385C147.96 50.245 147.84 50.125 147.74 49.995C147.61 49.825 147.5 49.635 147.35 49.485C147.22 49.355 147.06 49.265 146.92 49.155C146.76 49.025 146.62 48.885 146.44 48.785L93.99 18.585C92.64 17.805 90.98 17.805 89.63 18.585L37.18 48.785C37 48.885 36.86 49.035 36.7 49.155C36.56 49.265 36.4 49.355 36.27 49.485C36.12 49.635 36.01 49.825 35.88 49.995C35.78 50.125 35.66 50.245 35.58 50.385C35.46 50.595 35.38 50.835 35.3 51.065C35.25 51.185 35.18 51.305 35.15 51.435C35.05 51.805 35 52.185 35 52.575V232.235C35 233.795 35.84 235.245 37.19 236.025L142.1 296.425C142.33 296.555 142.58 296.635 142.82 296.725C142.93 296.765 143.04 296.835 143.16 296.865C143.53 296.965 143.9 297.015 144.28 297.015C144.66 297.015 145.03 296.965 145.4 296.865C145.5 296.835 145.59 296.775 145.69 296.745C145.95 296.655 146.21 296.565 146.45 296.435L251.36 236.035C252.72 235.255 253.55 233.815 253.55 232.245V174.885L303.81 145.945C305.17 145.165 306 143.725 306 142.155V82.265C305.95 81.875 305.89 81.495 305.8 81.125ZM144.2 227.205L100.57 202.515L146.39 176.135L196.66 147.195L240.33 172.335L208.29 190.625L144.2 227.205ZM244.75 114.995V164.795L226.39 154.225L201.03 139.625V89.825L219.39 100.395L244.75 114.995ZM249.12 57.105L292.81 82.265L249.12 107.425L205.43 82.265L249.12 57.105ZM114.49 184.425L96.13 194.995V85.305L121.49 70.705L139.85 60.135V169.815L114.49 184.425ZM91.76 27.425L135.45 52.585L91.76 77.745L48.07 52.585L91.76 27.425ZM43.67 60.135L62.03 70.705L87.39 85.305V202.545V202.555V202.565C87.39 202.735 87.44 202.895 87.46 203.055C87.49 203.265 87.49 203.485 87.55 203.695V203.705C87.6 203.875 87.69 204.035 87.76 204.195C87.84 204.375 87.89 204.575 87.99 204.745C87.99 204.745 87.99 204.755 88 204.755C88.09 204.905 88.22 205.035 88.33 205.175C88.45 205.335 88.55 205.495 88.69 205.635L88.7 205.645C88.82 205.765 88.98 205.855 89.12 205.965C89.28 206.085 89.42 206.225 89.59 206.325C89.6 206.325 89.6 206.325 89.61 206.335C89.62 206.335 89.62 206.345 89.63 206.345L139.87 234.775V285.065L43.67 229.705V60.135ZM244.75 229.705L148.58 285.075V234.775L219.8 194.115L244.75 179.875V229.705ZM297.2 139.625L253.49 164.795V114.995L278.85 100.395L297.21 89.825V139.625H297.2Z"></path></svg>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ApplicationLogo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ApplicationLogo = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
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
let AppLayout$1 = class AppLayout extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "showingNavigationDropdown", false);
    __publicField(this, "title");
    __publicField(this, "appName", "Chirper");
  }
  async logout() {
    let res = await authService.logout();
    router.visit(res.redirect || "/");
  }
  async switchToTeam(team) {
    await authService.switchToTeam(team);
  }
};
__decorateClass([
  Prop(String)
], AppLayout$1.prototype, "title", 2);
AppLayout$1 = __decorateClass([
  Component({
    components: {
      ApplicationLogo,
      Head,
      Link,
      VAppBar,
      VToolbarTitle,
      VBtn,
      VMenu,
      VList,
      VListItem,
      VAvatar,
      VIcon,
      VContainer,
      VRow,
      VCol,
      VNavigationDrawer,
      VImg,
      VMain
    }
  })
], AppLayout$1);
const _sfc_main = toNative(AppLayout$1);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_Link = resolveComponent("Link");
  const _component_ApplicationLogo = resolveComponent("ApplicationLogo");
  _push(ssrRenderComponent(VApp, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_Head, { title: _ctx.title }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(VAppBar$1, {
          color: "primary",
          app: ""
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VBtn$1, {
                icon: "",
                onClick: ($event) => _ctx.showingNavigationDropdown = !_ctx.showingNavigationDropdown
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VIcon$1, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`mdi-menu`);
                        } else {
                          return [
                            createTextVNode("mdi-menu")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VIcon$1, null, {
                        default: withCtx(() => [
                          createTextVNode("mdi-menu")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VToolbarTitle$1, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_Link, {
                      href: _ctx.route("dashboard"),
                      class: "d-flex align-center gap-2 text-decoration-none"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_ApplicationLogo, { class: "h-9 w-auto" }, null, _parent5, _scopeId4));
                          _push5(` ${ssrInterpolate(_ctx.appName)}`);
                        } else {
                          return [
                            createVNode(_component_ApplicationLogo, { class: "h-9 w-auto" }),
                            createTextVNode(" " + toDisplayString(_ctx.appName), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_Link, {
                        href: _ctx.route("dashboard"),
                        class: "d-flex align-center gap-2 text-decoration-none"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_ApplicationLogo, { class: "h-9 w-auto" }),
                          createTextVNode(" " + toDisplayString(_ctx.appName), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VSpacer, null, null, _parent3, _scopeId2));
              if (_ctx.$page.props.jetstream.hasTeamFeatures) {
                _push3(ssrRenderComponent(VMenu$1, null, {
                  activator: withCtx(({ props }, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(VBtn$1, props, {
                        default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`${ssrInterpolate(_ctx.$page.props.auth.user.current_team.name)} `);
                            _push5(ssrRenderComponent(VIcon$1, { end: "" }, {
                              default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(`mdi-chevron-down`);
                                } else {
                                  return [
                                    createTextVNode("mdi-chevron-down")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent5, _scopeId4));
                          } else {
                            return [
                              createTextVNode(toDisplayString(_ctx.$page.props.auth.user.current_team.name) + " ", 1),
                              createVNode(VIcon$1, { end: "" }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-chevron-down")
                                ]),
                                _: 1
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(VBtn$1, props, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$page.props.auth.user.current_team.name) + " ", 1),
                            createVNode(VIcon$1, { end: "" }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-chevron-down")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1040)
                      ];
                    }
                  }),
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(VList$1, null, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<!--[-->`);
                            ssrRenderList(_ctx.$page.props.auth.user.all_teams, (team) => {
                              _push5(ssrRenderComponent(VListItem$1, {
                                key: team.id,
                                onClick: ($event) => _ctx.switchToTeam(team)
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (team.id == _ctx.$page.props.auth.user.current_team_id) {
                                      _push6(ssrRenderComponent(VIcon$1, { color: "success" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`mdi-check`);
                                          } else {
                                            return [
                                              createTextVNode("mdi-check")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(` ${ssrInterpolate(team.name)}`);
                                  } else {
                                    return [
                                      team.id == _ctx.$page.props.auth.user.current_team_id ? (openBlock(), createBlock(VIcon$1, {
                                        key: 0,
                                        color: "success"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-check")
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true),
                                      createTextVNode(" " + toDisplayString(team.name), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            });
                            _push5(`<!--]-->`);
                          } else {
                            return [
                              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.auth.user.all_teams, (team) => {
                                return openBlock(), createBlock(VListItem$1, {
                                  key: team.id,
                                  onClick: ($event) => _ctx.switchToTeam(team)
                                }, {
                                  default: withCtx(() => [
                                    team.id == _ctx.$page.props.auth.user.current_team_id ? (openBlock(), createBlock(VIcon$1, {
                                      key: 0,
                                      color: "success"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-check")
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    createTextVNode(" " + toDisplayString(team.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"]);
                              }), 128))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(VList$1, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.auth.user.all_teams, (team) => {
                              return openBlock(), createBlock(VListItem$1, {
                                key: team.id,
                                onClick: ($event) => _ctx.switchToTeam(team)
                              }, {
                                default: withCtx(() => [
                                  team.id == _ctx.$page.props.auth.user.current_team_id ? (openBlock(), createBlock(VIcon$1, {
                                    key: 0,
                                    color: "success"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-check")
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  createTextVNode(" " + toDisplayString(team.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["onClick"]);
                            }), 128))
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
              _push3(ssrRenderComponent(VMenu$1, null, {
                activator: withCtx(({ props }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VBtn$1, mergeProps(props, { icon: "" }), {
                      default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VAvatar$1, { size: "32" }, {
                            default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(VImg$1, {
                                  src: _ctx.$page.props.auth.user.profile_photo_url,
                                  alt: _ctx.$page.props.auth.user.name,
                                  cover: ""
                                }, null, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(VImg$1, {
                                    src: _ctx.$page.props.auth.user.profile_photo_url,
                                    alt: _ctx.$page.props.auth.user.name,
                                    cover: ""
                                  }, null, 8, ["src", "alt"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VAvatar$1, { size: "32" }, {
                              default: withCtx(() => [
                                createVNode(VImg$1, {
                                  src: _ctx.$page.props.auth.user.profile_photo_url,
                                  alt: _ctx.$page.props.auth.user.name,
                                  cover: ""
                                }, null, 8, ["src", "alt"])
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VBtn$1, mergeProps(props, { icon: "" }), {
                        default: withCtx(() => [
                          createVNode(VAvatar$1, { size: "32" }, {
                            default: withCtx(() => [
                              createVNode(VImg$1, {
                                src: _ctx.$page.props.auth.user.profile_photo_url,
                                alt: _ctx.$page.props.auth.user.name,
                                cover: ""
                              }, null, 8, ["src", "alt"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1040)
                    ];
                  }
                }),
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VList$1, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VListItem$1, {
                            href: _ctx.route("profile.show")
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`Profile`);
                              } else {
                                return [
                                  createTextVNode("Profile")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          if (_ctx.$page.props.jetstream.hasApiFeatures) {
                            _push5(ssrRenderComponent(VListItem$1, {
                              href: _ctx.route("api-tokens.index")
                            }, {
                              default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(`API Tokens`);
                                } else {
                                  return [
                                    createTextVNode("API Tokens")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent5, _scopeId4));
                          } else {
                            _push5(`<!---->`);
                          }
                          _push5(ssrRenderComponent(VListItem$1, { onClick: _ctx.logout }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`Log Out`);
                              } else {
                                return [
                                  createTextVNode("Log Out")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VListItem$1, {
                              href: _ctx.route("profile.show")
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Profile")
                              ]),
                              _: 1
                            }, 8, ["href"]),
                            _ctx.$page.props.jetstream.hasApiFeatures ? (openBlock(), createBlock(VListItem$1, {
                              key: 0,
                              href: _ctx.route("api-tokens.index")
                            }, {
                              default: withCtx(() => [
                                createTextVNode("API Tokens")
                              ]),
                              _: 1
                            }, 8, ["href"])) : createCommentVNode("", true),
                            createVNode(VListItem$1, { onClick: _ctx.logout }, {
                              default: withCtx(() => [
                                createTextVNode("Log Out")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VList$1, null, {
                        default: withCtx(() => [
                          createVNode(VListItem$1, {
                            href: _ctx.route("profile.show")
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Profile")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          _ctx.$page.props.jetstream.hasApiFeatures ? (openBlock(), createBlock(VListItem$1, {
                            key: 0,
                            href: _ctx.route("api-tokens.index")
                          }, {
                            default: withCtx(() => [
                              createTextVNode("API Tokens")
                            ]),
                            _: 1
                          }, 8, ["href"])) : createCommentVNode("", true),
                          createVNode(VListItem$1, { onClick: _ctx.logout }, {
                            default: withCtx(() => [
                              createTextVNode("Log Out")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
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
                createVNode(VBtn$1, {
                  icon: "",
                  onClick: ($event) => _ctx.showingNavigationDropdown = !_ctx.showingNavigationDropdown
                }, {
                  default: withCtx(() => [
                    createVNode(VIcon$1, null, {
                      default: withCtx(() => [
                        createTextVNode("mdi-menu")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(VToolbarTitle$1, null, {
                  default: withCtx(() => [
                    createVNode(_component_Link, {
                      href: _ctx.route("dashboard"),
                      class: "d-flex align-center gap-2 text-decoration-none"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ApplicationLogo, { class: "h-9 w-auto" }),
                        createTextVNode(" " + toDisplayString(_ctx.appName), 1)
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  _: 1
                }),
                createVNode(VSpacer),
                _ctx.$page.props.jetstream.hasTeamFeatures ? (openBlock(), createBlock(VMenu$1, { key: 0 }, {
                  activator: withCtx(({ props }) => [
                    createVNode(VBtn$1, props, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$page.props.auth.user.current_team.name) + " ", 1),
                        createVNode(VIcon$1, { end: "" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-chevron-down")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1040)
                  ]),
                  default: withCtx(() => [
                    createVNode(VList$1, null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.auth.user.all_teams, (team) => {
                          return openBlock(), createBlock(VListItem$1, {
                            key: team.id,
                            onClick: ($event) => _ctx.switchToTeam(team)
                          }, {
                            default: withCtx(() => [
                              team.id == _ctx.$page.props.auth.user.current_team_id ? (openBlock(), createBlock(VIcon$1, {
                                key: 0,
                                color: "success"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-check")
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(team.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                createVNode(VMenu$1, null, {
                  activator: withCtx(({ props }) => [
                    createVNode(VBtn$1, mergeProps(props, { icon: "" }), {
                      default: withCtx(() => [
                        createVNode(VAvatar$1, { size: "32" }, {
                          default: withCtx(() => [
                            createVNode(VImg$1, {
                              src: _ctx.$page.props.auth.user.profile_photo_url,
                              alt: _ctx.$page.props.auth.user.name,
                              cover: ""
                            }, null, 8, ["src", "alt"])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1040)
                  ]),
                  default: withCtx(() => [
                    createVNode(VList$1, null, {
                      default: withCtx(() => [
                        createVNode(VListItem$1, {
                          href: _ctx.route("profile.show")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Profile")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        _ctx.$page.props.jetstream.hasApiFeatures ? (openBlock(), createBlock(VListItem$1, {
                          key: 0,
                          href: _ctx.route("api-tokens.index")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("API Tokens")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true),
                        createVNode(VListItem$1, { onClick: _ctx.logout }, {
                          default: withCtx(() => [
                            createTextVNode("Log Out")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
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
        _push2(ssrRenderComponent(VNavigationDrawer$1, {
          app: "",
          modelValue: _ctx.showingNavigationDropdown,
          "onUpdate:modelValue": ($event) => _ctx.showingNavigationDropdown = $event
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VList$1, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VListItem$1, {
                      href: _ctx.route("dashboard")
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Dashboard`);
                        } else {
                          return [
                            createTextVNode("Dashboard")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VListItem$1, {
                      href: _ctx.route("chirps.index")
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Chirps`);
                        } else {
                          return [
                            createTextVNode("Chirps")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VListItem$1, {
                        href: _ctx.route("dashboard")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Dashboard")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(VListItem$1, {
                        href: _ctx.route("chirps.index")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Chirps")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VList$1, null, {
                  default: withCtx(() => [
                    createVNode(VListItem$1, {
                      href: _ctx.route("dashboard")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Dashboard")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(VListItem$1, {
                      href: _ctx.route("chirps.index")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Chirps")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VMain$1, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_Head, { title: _ctx.title }, null, 8, ["title"]),
          createVNode(VAppBar$1, {
            color: "primary",
            app: ""
          }, {
            default: withCtx(() => [
              createVNode(VBtn$1, {
                icon: "",
                onClick: ($event) => _ctx.showingNavigationDropdown = !_ctx.showingNavigationDropdown
              }, {
                default: withCtx(() => [
                  createVNode(VIcon$1, null, {
                    default: withCtx(() => [
                      createTextVNode("mdi-menu")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(VToolbarTitle$1, null, {
                default: withCtx(() => [
                  createVNode(_component_Link, {
                    href: _ctx.route("dashboard"),
                    class: "d-flex align-center gap-2 text-decoration-none"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ApplicationLogo, { class: "h-9 w-auto" }),
                      createTextVNode(" " + toDisplayString(_ctx.appName), 1)
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                _: 1
              }),
              createVNode(VSpacer),
              _ctx.$page.props.jetstream.hasTeamFeatures ? (openBlock(), createBlock(VMenu$1, { key: 0 }, {
                activator: withCtx(({ props }) => [
                  createVNode(VBtn$1, props, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$page.props.auth.user.current_team.name) + " ", 1),
                      createVNode(VIcon$1, { end: "" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-chevron-down")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, 1040)
                ]),
                default: withCtx(() => [
                  createVNode(VList$1, null, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.auth.user.all_teams, (team) => {
                        return openBlock(), createBlock(VListItem$1, {
                          key: team.id,
                          onClick: ($event) => _ctx.switchToTeam(team)
                        }, {
                          default: withCtx(() => [
                            team.id == _ctx.$page.props.auth.user.current_team_id ? (openBlock(), createBlock(VIcon$1, {
                              key: 0,
                              color: "success"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-check")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(team.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]);
                      }), 128))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(VMenu$1, null, {
                activator: withCtx(({ props }) => [
                  createVNode(VBtn$1, mergeProps(props, { icon: "" }), {
                    default: withCtx(() => [
                      createVNode(VAvatar$1, { size: "32" }, {
                        default: withCtx(() => [
                          createVNode(VImg$1, {
                            src: _ctx.$page.props.auth.user.profile_photo_url,
                            alt: _ctx.$page.props.auth.user.name,
                            cover: ""
                          }, null, 8, ["src", "alt"])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1040)
                ]),
                default: withCtx(() => [
                  createVNode(VList$1, null, {
                    default: withCtx(() => [
                      createVNode(VListItem$1, {
                        href: _ctx.route("profile.show")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Profile")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      _ctx.$page.props.jetstream.hasApiFeatures ? (openBlock(), createBlock(VListItem$1, {
                        key: 0,
                        href: _ctx.route("api-tokens.index")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("API Tokens")
                        ]),
                        _: 1
                      }, 8, ["href"])) : createCommentVNode("", true),
                      createVNode(VListItem$1, { onClick: _ctx.logout }, {
                        default: withCtx(() => [
                          createTextVNode("Log Out")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(VNavigationDrawer$1, {
            app: "",
            modelValue: _ctx.showingNavigationDropdown,
            "onUpdate:modelValue": ($event) => _ctx.showingNavigationDropdown = $event
          }, {
            default: withCtx(() => [
              createVNode(VList$1, null, {
                default: withCtx(() => [
                  createVNode(VListItem$1, {
                    href: _ctx.route("dashboard")
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Dashboard")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(VListItem$1, {
                    href: _ctx.route("chirps.index")
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Chirps")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue", "onUpdate:modelValue"]),
          createVNode(VMain$1, null, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          })
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AppLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppLayout2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  AppLayout2 as A,
  ApplicationLogo as a
};
