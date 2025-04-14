import { a as ApplicationLogo, A as AppLayout } from "./AppLayout-BTUHKS5A.js";
import { a as VCard, b as VCardText, c as VRow, d as VCardTitle, V as VContainer } from "./GuestLayout.vue_vue_type_script_lang-D4vr3XMc.js";
import { o as openBlock, j as createBlock, w as withCtx, e as createVNode, M as unref, f as createBaseVNode, g as createTextVNode } from "./app-CJfxbgbM.js";
import { V as VCol } from "./VCol-DKYWie_M.js";
import { a as VIcon, V as VBtn } from "./forwardRefs-Db-_QBrT.js";
import "./Auth.vue_vue_type_script_lang-DhBczGcz.js";
import "./AuthenticationCardLogo-BRpu58oV.js";
import "./VMenu-B78fScza.js";
import "./Login-Bam6njN5.js";
import "./InputError-DG5XJAZt.js";
import "./VTextField-CsT5nxqZ.js";
import "./VCheckbox-Bv2SmIYc.js";
const _sfc_main$1 = {
  __name: "Welcome",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VContainer), null, {
        default: withCtx(() => [
          createVNode(unref(VCard), { class: "pa-6 lg:pa-8" }, {
            default: withCtx(() => [
              createVNode(unref(VCardText), null, {
                default: withCtx(() => [
                  createVNode(ApplicationLogo, {
                    class: "d-block",
                    height: "48",
                    contain: ""
                  }),
                  _cache[0] || (_cache[0] = createBaseVNode("h1", { class: "mt-8 text-h5 font-weight-medium" }, " Welcome to your Jetstream application! ", -1)),
                  _cache[1] || (_cache[1] = createBaseVNode("p", { class: "mt-6 text-body-2" }, " Laravel Jetstream provides a beautiful, robust starting point for your next Laravel application... ", -1))
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(unref(VRow), { class: "mt-6" }, {
            default: withCtx(() => [
              createVNode(unref(VCol), {
                cols: "12",
                md: "6"
              }, {
                default: withCtx(() => [
                  createVNode(unref(VCard), null, {
                    default: withCtx(() => [
                      createVNode(unref(VCardText), { class: "d-flex align-center" }, {
                        default: withCtx(() => [
                          createVNode(unref(VIcon), { class: "me-3" }, {
                            default: withCtx(() => _cache[2] || (_cache[2] = [
                              createTextVNode("mdi-book-open")
                            ])),
                            _: 1
                          }),
                          createVNode(unref(VCardTitle), null, {
                            default: withCtx(() => _cache[3] || (_cache[3] = [
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
                      createVNode(unref(VCardText), null, {
                        default: withCtx(() => _cache[4] || (_cache[4] = [
                          createTextVNode(" Laravel has wonderful documentation covering every aspect of the framework... ")
                        ])),
                        _: 1
                      }),
                      createVNode(unref(VCardText), null, {
                        default: withCtx(() => [
                          createVNode(unref(VBtn), {
                            variant: "text",
                            color: "indigo",
                            href: "https://laravel.com/docs"
                          }, {
                            default: withCtx(() => [
                              _cache[6] || (_cache[6] = createTextVNode(" Explore the documentation ")),
                              createVNode(unref(VIcon), { end: "" }, {
                                default: withCtx(() => _cache[5] || (_cache[5] = [
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
              createVNode(unref(VCol), {
                cols: "12",
                md: "6"
              }, {
                default: withCtx(() => [
                  createVNode(unref(VCard), null, {
                    default: withCtx(() => [
                      createVNode(unref(VCardText), { class: "d-flex align-center" }, {
                        default: withCtx(() => [
                          createVNode(unref(VIcon), { class: "me-3" }, {
                            default: withCtx(() => _cache[7] || (_cache[7] = [
                              createTextVNode("mdi-play-circle-outline")
                            ])),
                            _: 1
                          }),
                          createVNode(unref(VCardTitle), null, {
                            default: withCtx(() => _cache[8] || (_cache[8] = [
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
                      createVNode(unref(VCardText), null, {
                        default: withCtx(() => _cache[9] || (_cache[9] = [
                          createTextVNode(" Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development... ")
                        ])),
                        _: 1
                      }),
                      createVNode(unref(VCardText), null, {
                        default: withCtx(() => [
                          createVNode(unref(VBtn), {
                            variant: "text",
                            color: "indigo",
                            href: "https://laracasts.com"
                          }, {
                            default: withCtx(() => [
                              _cache[11] || (_cache[11] = createTextVNode(" Start watching Laracasts ")),
                              createVNode(unref(VIcon), { end: "" }, {
                                default: withCtx(() => _cache[10] || (_cache[10] = [
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
    };
  }
};
const _sfc_main = {
  __name: "Dashboard",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(AppLayout, { title: "Dashboard" }, {
        header: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("h2", { class: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight" }, " Dashboard ", -1)
        ])),
        default: withCtx(() => [
          createVNode(_sfc_main$1)
        ]),
        _: 1
      });
    };
  }
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Dashboard-BfPeWGZN.js.map
