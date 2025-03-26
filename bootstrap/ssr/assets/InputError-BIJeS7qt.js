var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { Prop, Component, toNative, Vue } from "vue-facing-decorator";
import { VAlert } from "vuetify/components";
import { useSSRContext, mergeProps, withCtx, createTextVNode, toDisplayString } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { VAlert as VAlert$1 } from "vuetify/lib/components/VAlert/index.mjs";
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
let InputError$1 = class InputError extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "message");
  }
};
__decorateClass([
  Prop({ type: String, default: "" })
], InputError$1.prototype, "message", 2);
InputError$1 = __decorateClass([
  Component({
    components: {
      VAlert
    }
  })
], InputError$1);
const _sfc_main = toNative(InputError$1);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if (_ctx.message) {
    _push(ssrRenderComponent(VAlert$1, mergeProps({
      type: "error",
      variant: "tonal",
      density: "compact"
    }, _attrs), {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(_ctx.message)}`);
        } else {
          return [
            createTextVNode(toDisplayString(_ctx.message), 1)
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InputError.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const InputError2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  InputError2 as I
};
