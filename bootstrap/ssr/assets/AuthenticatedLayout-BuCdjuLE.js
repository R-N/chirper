var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as ApplicationLogo } from "./ApplicationLogo-B2173abF.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-1M0-kqPy.js";
import { _ as _sfc_main$3, a as _sfc_main$4 } from "./ResponsiveNavLink-DiZnMeqJ.js";
import { Link, router } from "@inertiajs/vue3";
import { Component, toNative, Vue } from "vue-facing-decorator";
import { u as useAuthStore } from "./auth-DrKxFB6F.js";
import { a as api } from "./axios-DQioN9B6.js";
import { useSSRContext, resolveComponent, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
let AuthenticatedLayout$1 = class AuthenticatedLayout extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "showingNavigationDropdown");
  }
  async logout() {
    const authStore = useAuthStore();
    let res = await api.post("/logout");
    authStore.logout();
    router.visit(res.data.redirect || "/");
  }
};
AuthenticatedLayout$1 = __decorateClass([
  Component({
    components: {
      ApplicationLogo,
      Dropdown: _sfc_main$1,
      DropdownLink: _sfc_main$2,
      NavLink: _sfc_main$3,
      ResponsiveNavLink: _sfc_main$4,
      Link
    }
  })
], AuthenticatedLayout$1);
const _sfc_main = toNative(AuthenticatedLayout$1);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Link = resolveComponent("Link");
  const _component_ApplicationLogo = resolveComponent("ApplicationLogo");
  const _component_NavLink = resolveComponent("NavLink");
  const _component_Dropdown = resolveComponent("Dropdown");
  const _component_DropdownLink = resolveComponent("DropdownLink");
  const _component_ResponsiveNavLink = resolveComponent("ResponsiveNavLink");
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="min-h-screen bg-gray-100"><nav class="border-b border-gray-100 bg-white"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="flex h-16 justify-between"><div class="flex"><div class="flex shrink-0 items-center">`);
  _push(ssrRenderComponent(_component_Link, {
    href: _ctx.route("dashboard")
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_ApplicationLogo, { class: "block h-9 w-auto fill-current text-gray-800" }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_ApplicationLogo, { class: "block h-9 w-auto fill-current text-gray-800" })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">`);
  _push(ssrRenderComponent(_component_NavLink, {
    href: _ctx.route("dashboard"),
    active: _ctx.route().current("dashboard")
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Dashboard `);
      } else {
        return [
          createTextVNode(" Dashboard ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NavLink, {
    href: _ctx.route("chirps.index"),
    active: _ctx.route().current("chirps.index")
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Chirps `);
      } else {
        return [
          createTextVNode(" Chirps ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div><div class="hidden sm:ms-6 sm:flex sm:items-center"><div class="relative ms-3">`);
  _push(ssrRenderComponent(_component_Dropdown, {
    align: "right",
    width: "48"
  }, {
    trigger: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.name)} <svg class="-me-0.5 ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button></span>`);
      } else {
        return [
          createVNode("span", { class: "inline-flex rounded-md" }, [
            createVNode("button", {
              type: "button",
              class: "inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
            }, [
              createTextVNode(toDisplayString(_ctx.$page.props.auth.user.name) + " ", 1),
              (openBlock(), createBlock("svg", {
                class: "-me-0.5 ms-2 h-4 w-4",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                  "clip-rule": "evenodd"
                })
              ]))
            ])
          ])
        ];
      }
    }),
    content: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_DropdownLink, {
          href: _ctx.route("profile.edit")
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Profile `);
            } else {
              return [
                createTextVNode(" Profile ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_DropdownLink, {
          onClick: _ctx.logout,
          as: "button"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Log Out `);
            } else {
              return [
                createTextVNode(" Log Out ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_DropdownLink, {
            href: _ctx.route("profile.edit")
          }, {
            default: withCtx(() => [
              createTextVNode(" Profile ")
            ]),
            _: 1
          }, 8, ["href"]),
          createVNode(_component_DropdownLink, {
            onClick: _ctx.logout,
            as: "button"
          }, {
            default: withCtx(() => [
              createTextVNode(" Log Out ")
            ]),
            _: 1
          }, 8, ["onClick"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div><div class="-me-2 flex items-center sm:hidden"><button class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"><svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path class="${ssrRenderClass({
    hidden: _ctx.showingNavigationDropdown,
    "inline-flex": !_ctx.showingNavigationDropdown
  })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="${ssrRenderClass({
    hidden: !_ctx.showingNavigationDropdown,
    "inline-flex": _ctx.showingNavigationDropdown
  })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div class="${ssrRenderClass([{
    block: _ctx.showingNavigationDropdown,
    hidden: !_ctx.showingNavigationDropdown
  }, "sm:hidden"])}"><div class="space-y-1 pb-3 pt-2">`);
  _push(ssrRenderComponent(_component_ResponsiveNavLink, {
    href: _ctx.route("dashboard"),
    active: _ctx.route().current("dashboard")
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Dashboard `);
      } else {
        return [
          createTextVNode(" Dashboard ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_ResponsiveNavLink, {
    href: _ctx.route("chirps.index"),
    active: _ctx.route().current("chirps.index")
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Chirps `);
      } else {
        return [
          createTextVNode(" Chirps ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="border-t border-gray-200 pb-1 pt-4"><div class="px-4"><div class="text-base font-medium text-gray-800">${ssrInterpolate(_ctx.$page.props.auth.user.name)}</div><div class="text-sm font-medium text-gray-500">${ssrInterpolate(_ctx.$page.props.auth.user.email)}</div></div><div class="mt-3 space-y-1">`);
  _push(ssrRenderComponent(_component_ResponsiveNavLink, {
    href: _ctx.route("profile.edit")
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Profile `);
      } else {
        return [
          createTextVNode(" Profile ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_ResponsiveNavLink, {
    onClick: _ctx.logout,
    as: "button"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Log Out `);
      } else {
        return [
          createTextVNode(" Log Out ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></nav>`);
  if (_ctx.$slots.header) {
    _push(`<header class="bg-white shadow"><div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">`);
    ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
    _push(`</div></header>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<main>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AuthenticatedLayout2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  AuthenticatedLayout2 as A
};
