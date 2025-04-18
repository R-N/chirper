import { _ as _sfc_main, h as VMain, i as VApp } from "./GuestLayout.vue_vue_type_script_lang-zdB9XH-z.js";
import { _ as _export_sfc, r as resolveComponent, o as openBlock, c as createBlock, w as withCtx, e as createVNode, O as createCommentVNode, aA as renderSlot } from "./app-BV4qnAJ0.js";
import { O as VExpandTransition } from "./forwardRefs-DKU3reEu.js";
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_ImageBackground = resolveComponent("ImageBackground");
  const _component_ServerDownView = resolveComponent("ServerDownView");
  const _component_LoadingOverlay = resolveComponent("LoadingOverlay");
  const _component_DialogStack = resolveComponent("DialogStack");
  return openBlock(), createBlock(VApp, null, {
    default: withCtx(() => [
      createVNode(_component_Head, { title: _ctx.title }, null, 8, ["title"]),
      _ctx.showBackground ? (openBlock(), createBlock(_component_ImageBackground, { key: 0 })) : createCommentVNode("", true),
      createVNode(VMain, null, {
        default: withCtx(() => [
          createVNode(VExpandTransition, { appear: "" }, {
            default: withCtx(() => [
              !_ctx.serverReachable ? (openBlock(), createBlock(_component_ServerDownView, {
                appear: "",
                key: "down"
              })) : renderSlot(_ctx.$slots, "default", { key: "main" })
            ]),
            _: 3
          })
        ]),
        _: 3
      }),
      createVNode(_component_LoadingOverlay),
      createVNode(_component_DialogStack, {
        items: _ctx.tabDialogs,
        onDialogstackpop: _ctx.popTabDialog
      }, null, 8, ["items", "onDialogstackpop"])
    ]),
    _: 3
  });
}
const GuestLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  GuestLayout as G
};
//# sourceMappingURL=GuestLayout-BRSQR84D.js.map
