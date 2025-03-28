import { Component, toNative, Vue } from "vue-facing-decorator";
import { VRow, VCol } from "vuetify/components";
import { useSSRContext, mergeProps, withCtx, createVNode, renderSlot } from "vue";
import { ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "./axios-l-eSoL-p.js";
import { VRow as VRow$1, VCol as VCol$1 } from "vuetify/lib/components/VGrid/index.mjs";
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
let SectionTitle$1 = class SectionTitle extends Vue {
};
SectionTitle$1 = __decorateClass([
  Component({
    components: {
      VRow,
      VCol
    }
  })
], SectionTitle$1);
const _sfc_main = toNative(SectionTitle$1);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent(VRow$1, mergeProps({
    justify: "space-between",
    align: "center"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCol$1, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<h3 class="text-h6 font-weight-medium"${_scopeId2}>`);
              ssrRenderSlot(_ctx.$slots, "title", {}, null, _push3, _parent3, _scopeId2);
              _push3(`</h3><p class="text-body-2 text-medium-emphasis mt-1"${_scopeId2}>`);
              ssrRenderSlot(_ctx.$slots, "description", {}, null, _push3, _parent3, _scopeId2);
              _push3(`</p>`);
            } else {
              return [
                createVNode("h3", { class: "text-h6 font-weight-medium" }, [
                  renderSlot(_ctx.$slots, "title")
                ]),
                createVNode("p", { class: "text-body-2 text-medium-emphasis mt-1" }, [
                  renderSlot(_ctx.$slots, "description")
                ])
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VCol$1, { class: "text-right" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              ssrRenderSlot(_ctx.$slots, "aside", {}, null, _push3, _parent3, _scopeId2);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside")
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VCol$1, null, {
            default: withCtx(() => [
              createVNode("h3", { class: "text-h6 font-weight-medium" }, [
                renderSlot(_ctx.$slots, "title")
              ]),
              createVNode("p", { class: "text-body-2 text-medium-emphasis mt-1" }, [
                renderSlot(_ctx.$slots, "description")
              ])
            ]),
            _: 3
          }),
          createVNode(VCol$1, { class: "text-right" }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "aside")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SectionTitle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SectionTitle2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  SectionTitle2 as S
};
