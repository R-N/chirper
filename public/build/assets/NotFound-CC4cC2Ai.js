import { b as Component, t as toNative, N as BaseView, _ as _export_sfc, r as resolveComponent, o as openBlock, j as createBlock, w as withCtx, f as createBaseVNode, K as toDisplayString, e as createVNode } from "./app-CJfxbgbM.js";
import { A as AppLayout } from "./AppLayout-BTUHKS5A.js";
import { C as CenterLayout } from "./GuestLayout.vue_vue_type_script_lang-D4vr3XMc.js";
import "./Auth.vue_vue_type_script_lang-DhBczGcz.js";
import "./AuthenticationCardLogo-BRpu58oV.js";
import "./forwardRefs-Db-_QBrT.js";
import "./VMenu-B78fScza.js";
import "./VCol-DKYWie_M.js";
import "./Login-Bam6njN5.js";
import "./InputError-DG5XJAZt.js";
import "./VTextField-CsT5nxqZ.js";
import "./VCheckbox-Bv2SmIYc.js";
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
    // beforeRouteLeave: function (to, from, next) {
    //   // stores.app.setRouteValid(true);
    //   next();
    // },
    // beforeRouteEnter: function (to, from, next) {
    //   // stores.app.setRouteValid(false);
    //   next();
    // }
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
    // beforeRouteLeave: function (to, from, next) {
    //   // stores.app.setRouteValid(true);
    //   next();
    // },
    // beforeRouteEnter: function (to, from, next) {
    //   // stores.app.setRouteValid(false);
    //   next();
    // }
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
//# sourceMappingURL=NotFound-CC4cC2Ai.js.map
