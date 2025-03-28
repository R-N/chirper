import { unref, withCtx, createVNode, createTextVNode, useSSRContext, mergeProps } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { a as ApplicationLogo, A as AppLayout } from "./AppLayout-CJzwvG5j.js";
import { VContainer, VCard, VCardText, VRow, VCol, VIcon, VCardTitle, VBtn } from "vuetify/components";
import "./axios-l-eSoL-p.js";
import "axios";
import "js-cookie";
import "@inertiajs/vue3";
import "vue-facing-decorator";
import "./auth-DrKxFB6F.js";
import "pinia";
import "vuetify/lib/components/VApp/index.mjs";
import "vuetify/lib/components/VAppBar/index.mjs";
import "vuetify/lib/components/VAvatar/index.mjs";
import "vuetify/lib/components/VBtn/index.mjs";
import "vuetify/lib/components/VGrid/index.mjs";
import "vuetify/lib/components/VIcon/index.mjs";
import "vuetify/lib/components/VImg/index.mjs";
import "vuetify/lib/components/VList/index.mjs";
import "vuetify/lib/components/VMain/index.mjs";
import "vuetify/lib/components/VMenu/index.mjs";
import "vuetify/lib/components/VNavigationDrawer/index.mjs";
import "vuetify/lib/components/VToolbar/index.mjs";
const _sfc_main$1 = {
  __name: "Welcome",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(VContainer), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(VCard), { class: "pa-6 lg:pa-8" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(VCardText), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(ApplicationLogo, {
                          class: "d-block",
                          height: "48",
                          contain: ""
                        }, null, _parent4, _scopeId3));
                        _push4(`<h1 class="mt-8 text-h5 font-weight-medium"${_scopeId3}> Welcome to your Jetstream application! </h1><p class="mt-6 text-body-2"${_scopeId3}> Laravel Jetstream provides a beautiful, robust starting point for your next Laravel application... </p>`);
                      } else {
                        return [
                          createVNode(ApplicationLogo, {
                            class: "d-block",
                            height: "48",
                            contain: ""
                          }),
                          createVNode("h1", { class: "mt-8 text-h5 font-weight-medium" }, " Welcome to your Jetstream application! "),
                          createVNode("p", { class: "mt-6 text-body-2" }, " Laravel Jetstream provides a beautiful, robust starting point for your next Laravel application... ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(VCardText), null, {
                      default: withCtx(() => [
                        createVNode(ApplicationLogo, {
                          class: "d-block",
                          height: "48",
                          contain: ""
                        }),
                        createVNode("h1", { class: "mt-8 text-h5 font-weight-medium" }, " Welcome to your Jetstream application! "),
                        createVNode("p", { class: "mt-6 text-body-2" }, " Laravel Jetstream provides a beautiful, robust starting point for your next Laravel application... ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(VRow), { class: "mt-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(VCol), {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(VCard), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(VCardText), { class: "d-flex align-center" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(VIcon), { class: "me-3" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`mdi-book-open`);
                                        } else {
                                          return [
                                            createTextVNode("mdi-book-open")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(VCardTitle), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<a href="https://laravel.com/docs" class="text-decoration-none"${_scopeId6}>Documentation</a>`);
                                        } else {
                                          return [
                                            createVNode("a", {
                                              href: "https://laravel.com/docs",
                                              class: "text-decoration-none"
                                            }, "Documentation")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(VIcon), { class: "me-3" }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-book-open")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(VCardTitle), null, {
                                        default: withCtx(() => [
                                          createVNode("a", {
                                            href: "https://laravel.com/docs",
                                            class: "text-decoration-none"
                                          }, "Documentation")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(VCardText), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Laravel has wonderful documentation covering every aspect of the framework... `);
                                  } else {
                                    return [
                                      createTextVNode(" Laravel has wonderful documentation covering every aspect of the framework... ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(VCardText), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(VBtn), {
                                      variant: "text",
                                      color: "indigo",
                                      href: "https://laravel.com/docs"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Explore the documentation `);
                                          _push7(ssrRenderComponent(unref(VIcon), { end: "" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`mdi-arrow-right`);
                                              } else {
                                                return [
                                                  createTextVNode("mdi-arrow-right")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createTextVNode(" Explore the documentation "),
                                            createVNode(unref(VIcon), { end: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-arrow-right")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(VBtn), {
                                        variant: "text",
                                        color: "indigo",
                                        href: "https://laravel.com/docs"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Explore the documentation "),
                                          createVNode(unref(VIcon), { end: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-arrow-right")
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(VCardText), { class: "d-flex align-center" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(VIcon), { class: "me-3" }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-book-open")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(VCardTitle), null, {
                                      default: withCtx(() => [
                                        createVNode("a", {
                                          href: "https://laravel.com/docs",
                                          class: "text-decoration-none"
                                        }, "Documentation")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(VCardText), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Laravel has wonderful documentation covering every aspect of the framework... ")
                                  ]),
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
                                        createTextVNode(" Explore the documentation "),
                                        createVNode(unref(VIcon), { end: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-arrow-right")
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(VCard), null, {
                            default: withCtx(() => [
                              createVNode(unref(VCardText), { class: "d-flex align-center" }, {
                                default: withCtx(() => [
                                  createVNode(unref(VIcon), { class: "me-3" }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-book-open")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(VCardTitle), null, {
                                    default: withCtx(() => [
                                      createVNode("a", {
                                        href: "https://laravel.com/docs",
                                        class: "text-decoration-none"
                                      }, "Documentation")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(VCardText), null, {
                                default: withCtx(() => [
                                  createTextVNode(" Laravel has wonderful documentation covering every aspect of the framework... ")
                                ]),
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
                                      createTextVNode(" Explore the documentation "),
                                      createVNode(unref(VIcon), { end: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-arrow-right")
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
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(VCol), {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(VCard), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(VCardText), { class: "d-flex align-center" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(VIcon), { class: "me-3" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`mdi-play-circle-outline`);
                                        } else {
                                          return [
                                            createTextVNode("mdi-play-circle-outline")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(VCardTitle), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<a href="https://laracasts.com" class="text-decoration-none"${_scopeId6}>Laracasts</a>`);
                                        } else {
                                          return [
                                            createVNode("a", {
                                              href: "https://laracasts.com",
                                              class: "text-decoration-none"
                                            }, "Laracasts")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(VIcon), { class: "me-3" }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-play-circle-outline")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(VCardTitle), null, {
                                        default: withCtx(() => [
                                          createVNode("a", {
                                            href: "https://laracasts.com",
                                            class: "text-decoration-none"
                                          }, "Laracasts")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(VCardText), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development... `);
                                  } else {
                                    return [
                                      createTextVNode(" Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development... ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(VCardText), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(VBtn), {
                                      variant: "text",
                                      color: "indigo",
                                      href: "https://laracasts.com"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Start watching Laracasts `);
                                          _push7(ssrRenderComponent(unref(VIcon), { end: "" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`mdi-arrow-right`);
                                              } else {
                                                return [
                                                  createTextVNode("mdi-arrow-right")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createTextVNode(" Start watching Laracasts "),
                                            createVNode(unref(VIcon), { end: "" }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-arrow-right")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(VBtn), {
                                        variant: "text",
                                        color: "indigo",
                                        href: "https://laracasts.com"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Start watching Laracasts "),
                                          createVNode(unref(VIcon), { end: "" }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-arrow-right")
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(VCardText), { class: "d-flex align-center" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(VIcon), { class: "me-3" }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-play-circle-outline")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(VCardTitle), null, {
                                      default: withCtx(() => [
                                        createVNode("a", {
                                          href: "https://laracasts.com",
                                          class: "text-decoration-none"
                                        }, "Laracasts")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(VCardText), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development... ")
                                  ]),
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
                                        createTextVNode(" Start watching Laracasts "),
                                        createVNode(unref(VIcon), { end: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-arrow-right")
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(VCard), null, {
                            default: withCtx(() => [
                              createVNode(unref(VCardText), { class: "d-flex align-center" }, {
                                default: withCtx(() => [
                                  createVNode(unref(VIcon), { class: "me-3" }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-play-circle-outline")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(VCardTitle), null, {
                                    default: withCtx(() => [
                                      createVNode("a", {
                                        href: "https://laracasts.com",
                                        class: "text-decoration-none"
                                      }, "Laracasts")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(VCardText), null, {
                                default: withCtx(() => [
                                  createTextVNode(" Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development... ")
                                ]),
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
                                      createTextVNode(" Start watching Laracasts "),
                                      createVNode(unref(VIcon), { end: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-arrow-right")
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
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
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
                                  default: withCtx(() => [
                                    createTextVNode("mdi-book-open")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(VCardTitle), null, {
                                  default: withCtx(() => [
                                    createVNode("a", {
                                      href: "https://laravel.com/docs",
                                      class: "text-decoration-none"
                                    }, "Documentation")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(VCardText), null, {
                              default: withCtx(() => [
                                createTextVNode(" Laravel has wonderful documentation covering every aspect of the framework... ")
                              ]),
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
                                    createTextVNode(" Explore the documentation "),
                                    createVNode(unref(VIcon), { end: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-arrow-right")
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
                                  default: withCtx(() => [
                                    createTextVNode("mdi-play-circle-outline")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(VCardTitle), null, {
                                  default: withCtx(() => [
                                    createVNode("a", {
                                      href: "https://laracasts.com",
                                      class: "text-decoration-none"
                                    }, "Laracasts")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(VCardText), null, {
                              default: withCtx(() => [
                                createTextVNode(" Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development... ")
                              ]),
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
                                    createTextVNode(" Start watching Laracasts "),
                                    createVNode(unref(VIcon), { end: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-arrow-right")
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
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(VCard), { class: "pa-6 lg:pa-8" }, {
                default: withCtx(() => [
                  createVNode(unref(VCardText), null, {
                    default: withCtx(() => [
                      createVNode(ApplicationLogo, {
                        class: "d-block",
                        height: "48",
                        contain: ""
                      }),
                      createVNode("h1", { class: "mt-8 text-h5 font-weight-medium" }, " Welcome to your Jetstream application! "),
                      createVNode("p", { class: "mt-6 text-body-2" }, " Laravel Jetstream provides a beautiful, robust starting point for your next Laravel application... ")
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
                                default: withCtx(() => [
                                  createTextVNode("mdi-book-open")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(VCardTitle), null, {
                                default: withCtx(() => [
                                  createVNode("a", {
                                    href: "https://laravel.com/docs",
                                    class: "text-decoration-none"
                                  }, "Documentation")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(VCardText), null, {
                            default: withCtx(() => [
                              createTextVNode(" Laravel has wonderful documentation covering every aspect of the framework... ")
                            ]),
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
                                  createTextVNode(" Explore the documentation "),
                                  createVNode(unref(VIcon), { end: "" }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-arrow-right")
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
                                default: withCtx(() => [
                                  createTextVNode("mdi-play-circle-outline")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(VCardTitle), null, {
                                default: withCtx(() => [
                                  createVNode("a", {
                                    href: "https://laracasts.com",
                                    class: "text-decoration-none"
                                  }, "Laracasts")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(VCardText), null, {
                            default: withCtx(() => [
                              createTextVNode(" Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development... ")
                            ]),
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
                                  createTextVNode(" Start watching Laracasts "),
                                  createVNode(unref(VIcon), { end: "" }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-arrow-right")
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
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Welcome.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AppLayout, mergeProps({ title: "Dashboard" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"${_scopeId}> Dashboard </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight" }, " Dashboard ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
