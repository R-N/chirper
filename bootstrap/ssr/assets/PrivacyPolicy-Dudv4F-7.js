import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BCaUMAMf.js";
import { VSheet, VContainer, VCard, VCardText } from "vuetify/components";
const _sfc_main = {
  __name: "PrivacyPolicy",
  __ssrInlineRender: true,
  props: {
    policy: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Privacy Policy" }, null, _parent));
      _push(ssrRenderComponent(unref(VSheet), { class: "d-flex flex-column align-center justify-center min-vh-100 py-6 bg-grey-lighten-3" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(VContainer), { class: "mt-6 d-flex justify-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(VCard), { class: "w-100 sm:w-75 elevation-2 pa-6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(VCardText), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="prose dark:prose-invert"${_scopeId4}>${__props.policy ?? ""}</div>`);
                            } else {
                              return [
                                createVNode("div", {
                                  innerHTML: __props.policy,
                                  class: "prose dark:prose-invert"
                                }, null, 8, ["innerHTML"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(VCardText), null, {
                            default: withCtx(() => [
                              createVNode("div", {
                                innerHTML: __props.policy,
                                class: "prose dark:prose-invert"
                              }, null, 8, ["innerHTML"])
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
                    createVNode(unref(VCard), { class: "w-100 sm:w-75 elevation-2 pa-6" }, {
                      default: withCtx(() => [
                        createVNode(unref(VCardText), null, {
                          default: withCtx(() => [
                            createVNode("div", {
                              innerHTML: __props.policy,
                              class: "prose dark:prose-invert"
                            }, null, 8, ["innerHTML"])
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
              createVNode(_sfc_main$1),
              createVNode(unref(VContainer), { class: "mt-6 d-flex justify-center" }, {
                default: withCtx(() => [
                  createVNode(unref(VCard), { class: "w-100 sm:w-75 elevation-2 pa-6" }, {
                    default: withCtx(() => [
                      createVNode(unref(VCardText), null, {
                        default: withCtx(() => [
                          createVNode("div", {
                            innerHTML: __props.policy,
                            class: "prose dark:prose-invert"
                          }, null, 8, ["innerHTML"])
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
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/PrivacyPolicy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
