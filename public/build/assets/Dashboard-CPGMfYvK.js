import { a as ApplicationLogo, A as AppLayout } from "./AppLayout-CCsEuygK.js";
import { b as Component, t as toNative, at as BaseView, _ as _export_sfc, r as resolveComponent, o as openBlock, c as createBlock, w as withCtx, e as createVNode, g as createBaseVNode, i as withModifiers, h as createTextVNode } from "./app-DDBQLYRK.js";
import { a as VCard, e as VCardText, f as VCardActions, b as VRow, d as VCardTitle, V as VContainer } from "./GuestLayout.vue_vue_type_script_lang-2s0GDYYy.js";
import { V as VBtn, a as VIcon } from "./forwardRefs-B6F8wykm.js";
import { V as VCol } from "./VCol-BlRM1PkL.js";
import "./Auth.vue_vue_type_script_lang-BqrvBsHH.js";
import "./AuthenticationCardLogo-D6E1IMSQ.js";
import "./VMenu-BESDRVXS.js";
import "./Login-D98toHKk.js";
import "./InputError-ytemAFXd.js";
import "./VTextField-vouJgQdh.js";
import "./VCheckbox-Igf5GVeL.js";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
let WelcomeView = class extends BaseView {
  tryError() {
    let err = new Error("Unknown error!!!");
    err.show = true;
    throw err;
  }
};
WelcomeView = __decorateClass([
  Component({
    components: {
      ApplicationLogo
    }
  })
], WelcomeView);
const _sfc_main$1 = toNative(WelcomeView);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ApplicationLogo = resolveComponent("ApplicationLogo");
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VCard, { class: "pa-6 lg:pa-8" }, {
        default: withCtx(() => [
          createVNode(VCardText, null, {
            default: withCtx(() => [
              createVNode(_component_ApplicationLogo, {
                class: "d-block",
                height: "48",
                contain: ""
              }),
              _cache[0] || (_cache[0] = createBaseVNode("h1", { class: "mt-8 text-h5 font-weight-medium" }, " Welcome to your Jetstream application! ", -1)),
              _cache[1] || (_cache[1] = createBaseVNode("p", { class: "mt-6 text-body-2" }, " Laravel Jetstream provides a beautiful, robust starting point for your next Laravel application... ", -1))
            ]),
            _: 1
          }),
          createVNode(VCardActions, null, {
            default: withCtx(() => [
              createVNode(VBtn, {
                color: "danger",
                onClick: withModifiers(_ctx.tryError, ["stop", "prevent"])
              }, {
                default: withCtx(() => _cache[2] || (_cache[2] = [
                  createTextVNode("Try Error!")
                ])),
                _: 1
              }, 8, ["onClick"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(VRow, { class: "mt-6" }, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            md: "6"
          }, {
            default: withCtx(() => [
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardText, { class: "d-flex align-center" }, {
                    default: withCtx(() => [
                      createVNode(VIcon, { class: "me-3" }, {
                        default: withCtx(() => _cache[3] || (_cache[3] = [
                          createTextVNode("mdi-book-open")
                        ])),
                        _: 1
                      }),
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => _cache[4] || (_cache[4] = [
                          createBaseVNode("a", {
                            href: "https://laravel.com/docs",
                            class: "text-decoration-none"
                          }, "Documentation", -1)
                        ])),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => _cache[5] || (_cache[5] = [
                      createTextVNode(" Laravel has wonderful documentation covering every aspect of the framework... ")
                    ])),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        variant: "text",
                        color: "indigo",
                        href: "https://laravel.com/docs"
                      }, {
                        default: withCtx(() => [
                          _cache[7] || (_cache[7] = createTextVNode(" Explore the documentation ")),
                          createVNode(VIcon, { end: "" }, {
                            default: withCtx(() => _cache[6] || (_cache[6] = [
                              createTextVNode("mdi-arrow-right")
                            ])),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(VCol, {
            cols: "12",
            md: "6"
          }, {
            default: withCtx(() => [
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardText, { class: "d-flex align-center" }, {
                    default: withCtx(() => [
                      createVNode(VIcon, { class: "me-3" }, {
                        default: withCtx(() => _cache[8] || (_cache[8] = [
                          createTextVNode("mdi-play-circle-outline")
                        ])),
                        _: 1
                      }),
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => _cache[9] || (_cache[9] = [
                          createBaseVNode("a", {
                            href: "https://laracasts.com",
                            class: "text-decoration-none"
                          }, "Laracasts", -1)
                        ])),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => _cache[10] || (_cache[10] = [
                      createTextVNode(" Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development... ")
                    ])),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        variant: "text",
                        color: "indigo",
                        href: "https://laracasts.com"
                      }, {
                        default: withCtx(() => [
                          _cache[12] || (_cache[12] = createTextVNode(" Start watching Laracasts ")),
                          createVNode(VIcon, { end: "" }, {
                            default: withCtx(() => _cache[11] || (_cache[11] = [
                              createTextVNode("mdi-arrow-right")
                            ])),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const Welcome = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
const _sfc_main = {
  __name: "Dashboard",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(AppLayout, { title: "Dashboard" }, {
        header: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("h2", { class: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight" }, " Dashboard ", -1)
        ])),
        default: withCtx(() => [
          createVNode(Welcome)
        ]),
        _: 1
      });
    };
  }
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Dashboard-CPGMfYvK.js.map
