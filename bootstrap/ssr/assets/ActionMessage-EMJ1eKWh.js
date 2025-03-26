var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { Prop, toNative, Vue, Component } from "vue-facing-decorator";
import { useSSRContext, withCtx, withDirectives, createVNode, renderSlot, vShow } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { VExpandTransition } from "vuetify/lib/components/transitions/index.mjs";
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
let ActionMessage$1 = class ActionMessage extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "on");
  }
};
__decorateClass([
  Prop({ type: Boolean, required: true })
], ActionMessage$1.prototype, "on", 2);
ActionMessage$1 = __decorateClass([
  Component
], ActionMessage$1);
const _sfc_main = toNative(ActionMessage$1);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(VExpandTransition, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div style="${ssrRenderStyle(_ctx.on ? null : { display: "none" })}" class="text-sm font-weight-medium"${_scopeId}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
        _push2(`</div>`);
      } else {
        return [
          withDirectives(createVNode("div", { class: "text-sm font-weight-medium" }, [
            renderSlot(_ctx.$slots, "default")
          ], 512), [
            [vShow, _ctx.on]
          ])
        ];
      }
    }),
    _: 3
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ActionMessage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ActionMessage2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  ActionMessage2 as A
};
