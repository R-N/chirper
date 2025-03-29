import { Component, toNative, Vue } from "vue-facing-decorator";
import { S as SectionTitle } from "./SectionTitle-KsAagkYm.js";
import { VContainer, VRow, VCol, VCard, VCardText } from "vuetify/components";
import { useSSRContext, resolveComponent, withCtx, renderSlot, createVNode } from "vue";
import { ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "./axios-D4gWzKUO.js";
import { VCard as VCard$1, VCardText as VCardText$1 } from "vuetify/lib/components/VCard/index.mjs";
import { VContainer as VContainer$1, VRow as VRow$1, VCol as VCol$1 } from "vuetify/lib/components/VGrid/index.mjs";
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
let ActionSection$1 = class ActionSection extends Vue {
};
ActionSection$1 = __decorateClass([
  Component({
    components: {
      SectionTitle,
      VContainer,
      VRow,
      VCol,
      VCard,
      VCardText
    }
  })
], ActionSection$1);
const _sfc_main = toNative(ActionSection$1);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_SectionTitle = resolveComponent("SectionTitle");
  _push(ssrRenderComponent(VContainer$1, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VRow$1, { class: "d-flex" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCol$1, {
                cols: "12",
                md: "4"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_SectionTitle, null, {
                      title: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          ssrRenderSlot(_ctx.$slots, "title", {}, null, _push5, _parent5, _scopeId4);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "title")
                          ];
                        }
                      }),
                      description: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          ssrRenderSlot(_ctx.$slots, "description", {}, null, _push5, _parent5, _scopeId4);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "description")
                          ];
                        }
                      }),
                      _: 3
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_SectionTitle, null, {
                        title: withCtx(() => [
                          renderSlot(_ctx.$slots, "title")
                        ]),
                        description: withCtx(() => [
                          renderSlot(_ctx.$slots, "description")
                        ]),
                        _: 3
                      })
                    ];
                  }
                }),
                _: 3
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCol$1, {
                cols: "12",
                md: "8"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VCard$1, { class: "pa-5" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VCardText$1, null, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                ssrRenderSlot(_ctx.$slots, "content", {}, null, _push6, _parent6, _scopeId5);
                              } else {
                                return [
                                  renderSlot(_ctx.$slots, "content")
                                ];
                              }
                            }),
                            _: 3
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VCardText$1, null, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "content")
                              ]),
                              _: 3
                            })
                          ];
                        }
                      }),
                      _: 3
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VCard$1, { class: "pa-5" }, {
                        default: withCtx(() => [
                          createVNode(VCardText$1, null, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "content")
                            ]),
                            _: 3
                          })
                        ]),
                        _: 3
                      })
                    ];
                  }
                }),
                _: 3
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCol$1, {
                  cols: "12",
                  md: "4"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_SectionTitle, null, {
                      title: withCtx(() => [
                        renderSlot(_ctx.$slots, "title")
                      ]),
                      description: withCtx(() => [
                        renderSlot(_ctx.$slots, "description")
                      ]),
                      _: 3
                    })
                  ]),
                  _: 3
                }),
                createVNode(VCol$1, {
                  cols: "12",
                  md: "8"
                }, {
                  default: withCtx(() => [
                    createVNode(VCard$1, { class: "pa-5" }, {
                      default: withCtx(() => [
                        createVNode(VCardText$1, null, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "content")
                          ]),
                          _: 3
                        })
                      ]),
                      _: 3
                    })
                  ]),
                  _: 3
                })
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VRow$1, { class: "d-flex" }, {
            default: withCtx(() => [
              createVNode(VCol$1, {
                cols: "12",
                md: "4"
              }, {
                default: withCtx(() => [
                  createVNode(_component_SectionTitle, null, {
                    title: withCtx(() => [
                      renderSlot(_ctx.$slots, "title")
                    ]),
                    description: withCtx(() => [
                      renderSlot(_ctx.$slots, "description")
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              }),
              createVNode(VCol$1, {
                cols: "12",
                md: "8"
              }, {
                default: withCtx(() => [
                  createVNode(VCard$1, { class: "pa-5" }, {
                    default: withCtx(() => [
                      createVNode(VCardText$1, null, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "content")
                        ]),
                        _: 3
                      })
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ActionSection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ActionSection2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  ActionSection2 as A
};
