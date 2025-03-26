import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BCaUMAMf.js";
import { VContainer, VCard, VCardText } from "vuetify/components";
const _sfc_main = {
  __name: "TermsOfService",
  __ssrInlineRender: true,
  props: {
    terms: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Terms of Service" }, null, _parent));
      _push(ssrRenderComponent(unref(VContainer), { class: "d-flex flex-column align-center justify-center min-vh-100" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(VCard), {
              class: "mt-6 pa-6 w-100 w-sm-75 w-md-50",
              elevation: "3"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(VCardText), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(VCardText), { innerHTML: __props.terms }, null, 8, ["innerHTML"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1),
              createVNode(unref(VCard), {
                class: "mt-6 pa-6 w-100 w-sm-75 w-md-50",
                elevation: "3"
              }, {
                default: withCtx(() => [
                  createVNode(unref(VCardText), { innerHTML: __props.terms }, null, 8, ["innerHTML"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TermsOfService.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
