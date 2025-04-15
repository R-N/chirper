import { b as Component, t as toNative, at as BaseView, _ as _export_sfc, r as resolveComponent, o as openBlock, c as createBlock, w as withCtx, g as createBaseVNode, M as toDisplayString, e as createVNode } from "./app-CPu3B8nk.js";
import { A as AppLayout } from "./AppLayout-B13Wv00U.js";
import { C as CenterLayout } from "./GuestLayout.vue_vue_type_script_lang-B04FhGQk.js";
import "./Auth.vue_vue_type_script_lang-DBB4XVKb.js";
import "./AuthenticationCardLogo-BVaAeieh.js";
import "./forwardRefs-CUUEJ2GB.js";
import "./VMenu-DKNR31gj.js";
import "./VRow-B-PaLeOj.js";
import "./Login-B8czODMK.js";
import "./InputError-D2hiOP2i.js";
import "./VTextField-Bj9iITQ7.js";
import "./VCheckbox-ClXUESM1.js";
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let NotFoundView$1 = class NotFoundView extends BaseView {
};
NotFoundView$1 = __decorateClass$1([
  Component({
    name: "NotFoundView",
    components: {
      CenterLayout
    }
  })
], NotFoundView$1);
const _sfc_main$1 = toNative(NotFoundView$1);
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CenterLayout = resolveComponent("CenterLayout");
  return openBlock(), createBlock(_component_CenterLayout, null, {
    default: withCtx(() => [
      createBaseVNode("h1", null, "404 Not Found: " + toDisplayString(this.$route.params.pathMatch), 1)
    ]),
    _: 1
  });
}
const NotFoundView2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
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
let NotFoundPage = class extends BaseView {
};
NotFoundPage = __decorateClass([
  Component({
    name: "NotFoundPage",
    components: {
      AppLayout,
      NotFoundView: NotFoundView2
    }
  })
], NotFoundPage);
const _sfc_main = toNative(NotFoundPage);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NotFoundView = resolveComponent("NotFoundView");
  const _component_AppLayout = resolveComponent("AppLayout");
  return openBlock(), createBlock(_component_AppLayout, { title: "Dashboard" }, {
    header: withCtx(() => _cache[0] || (_cache[0] = [
      createBaseVNode("h2", { class: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight" }, " Not Found ", -1)
    ])),
    default: withCtx(() => [
      createVNode(_component_NotFoundView)
    ]),
    _: 1
  });
}
const NotFound = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  NotFoundPage,
  NotFound as default
};
//# sourceMappingURL=NotFound-CyFHsJ7m.js.map
