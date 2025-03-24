var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-1M0-kqPy.js";
import { _ as _sfc_main$3 } from "./InputError-BRdBLb-x.js";
import { _ as _sfc_main$4 } from "./PrimaryButton-CtpSN9QQ.js";
import dayjs from "dayjs";
import { useForm } from "@inertiajs/vue3";
import { toNative, Vue, Prop, Component } from "vue-facing-decorator";
import { a as api } from "./axios-DQioN9B6.js";
import { resolveComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, createTextVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
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
let Chirp$1 = class Chirp extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "chirp");
    __publicField(this, "editing", false);
    __publicField(this, "form", useForm({
      message: ""
    }));
  }
  mounted() {
    this.resetForm();
  }
  get createdAt() {
    return dayjs(this.chirp.created_at).fromNow();
  }
  resetForm(editing = false) {
    this.editing = editing;
    this.form.reset();
    this.form.message = this.chirp.message;
  }
  async update() {
    let res = await api.put(route("chirps.update", this.chirp.id), {
      message: this.form.message
    });
    this.$emit("update", res.data.chirp);
    this.resetForm();
    this.editing = false;
  }
  async remove() {
    let res = await api.delete(route("chirps.destroy", this.chirp.id));
    console.log(res);
    this.$emit("remove", this.chirp.id);
  }
};
__decorateClass([
  Prop(Object)
], Chirp$1.prototype, "chirp", 2);
Chirp$1 = __decorateClass([
  Component({
    components: {
      Dropdown: _sfc_main$1,
      DropdownLink: _sfc_main$2,
      InputError: _sfc_main$3,
      PrimaryButton: _sfc_main$4
    }
  })
], Chirp$1);
const _sfc_main = toNative(Chirp$1);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Dropdown = resolveComponent("Dropdown");
  const _component_DropdownLink = resolveComponent("DropdownLink");
  const _component_InputError = resolveComponent("InputError");
  const _component_PrimaryButton = resolveComponent("PrimaryButton");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 flex space-x-2" }, _attrs))}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 -scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg><div class="flex-1"><div class="flex justify-between items-center"><div><span class="text-gray-800">${ssrInterpolate(_ctx.chirp.user.name)}</span><small class="ml-2 text-sm text-gray-600">${ssrInterpolate(this.createdAt)}</small>`);
  if (_ctx.chirp.created_at !== _ctx.chirp.updated_at) {
    _push(`<small class="text-sm text-gray-600"> · edited</small>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  if (_ctx.chirp.user.id === _ctx.$page.props.auth.user.id) {
    _push(ssrRenderComponent(_component_Dropdown, null, {
      trigger: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<button${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"${_scopeId}></path></svg></button>`);
        } else {
          return [
            createVNode("button", null, [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4 text-gray-400",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                createVNode("path", { d: "M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" })
              ]))
            ])
          ];
        }
      }),
      content: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<button class="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"${_scopeId}> Edit </button>`);
          _push2(ssrRenderComponent(_component_DropdownLink, {
            as: "button",
            onClick: _ctx.remove
          }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(` Delete `);
              } else {
                return [
                  createTextVNode(" Delete ")
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
        } else {
          return [
            createVNode("button", {
              class: "block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out",
              onClick: ($event) => this.resetForm(true)
            }, " Edit ", 8, ["onClick"]),
            createVNode(_component_DropdownLink, {
              as: "button",
              onClick: withModifiers(_ctx.remove, ["prevent"])
            }, {
              default: withCtx(() => [
                createTextVNode(" Delete ")
              ]),
              _: 1
            }, 8, ["onClick"])
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  if (_ctx.editing) {
    _push(`<form><textarea class="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm">${ssrInterpolate(_ctx.form.message)}</textarea>`);
    _push(ssrRenderComponent(_component_InputError, {
      message: _ctx.form.errors.message,
      class: "mt-2"
    }, null, _parent));
    _push(`<div class="space-x-2">`);
    _push(ssrRenderComponent(_component_PrimaryButton, { class: "mt-4" }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`Save`);
        } else {
          return [
            createTextVNode("Save")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`<button class="mt-4">Cancel</button></div></form>`);
  } else {
    _push(`<p class="mt-4 text-lg text-gray-900">${ssrInterpolate(_ctx.chirp.message)}</p>`);
  }
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Chirp.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Chirp2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Chirp2 as C
};
