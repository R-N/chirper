var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BuCdjuLE.js";
import { C as Chirp } from "./Chirp-BpoGXSEW.js";
import { _ as _sfc_main$1 } from "./InputError-BRdBLb-x.js";
import { _ as _sfc_main$2 } from "./PrimaryButton-CtpSN9QQ.js";
import { useForm } from "@inertiajs/vue3";
import { a as api } from "./axios-DQioN9B6.js";
import { toNative, Vue, Prop, Component } from "vue-facing-decorator";
import { resolveComponent, withCtx, createTextVNode, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-B2173abF.js";
import "./DropdownLink-1M0-kqPy.js";
import "./ResponsiveNavLink-DiZnMeqJ.js";
import "./auth-DrKxFB6F.js";
import "pinia";
import "dayjs";
import "axios";
import "js-cookie";
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
let ChirpsPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "chirps", []);
    // Adjust the type as necessary for chirps
    // Form data
    __publicField(this, "form", useForm({
      message: ""
    }));
  }
  mounted() {
  }
  async create() {
    let res = await api.post(route("chirps.store"), this.form);
    this.chirps.unshift(res.data.chirp);
    this.form.reset();
  }
  update(chirp) {
    const index = this.chirps.findIndex((chirp2) => chirp2.id === chirp2.id);
    if (index !== -1) {
      this.chirps[index] = chirp;
    }
  }
  remove(id) {
    const index = this.chirps.findIndex((chirp) => chirp.id === id);
    this.chirps.splice(index, 1);
  }
};
__decorateClass([
  Prop(Array)
], ChirpsPage.prototype, "chirps", 2);
ChirpsPage = __decorateClass([
  Component({
    components: {
      AuthenticatedLayout,
      Chirp,
      InputError: _sfc_main$1,
      PrimaryButton: _sfc_main$2
    }
  })
], ChirpsPage);
const _sfc_main = toNative(ChirpsPage);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_AuthenticatedLayout = resolveComponent("AuthenticatedLayout");
  const _component_InputError = resolveComponent("InputError");
  const _component_PrimaryButton = resolveComponent("PrimaryButton");
  const _component_Chirp = resolveComponent("Chirp");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Chirps" }, null, _parent));
  _push(ssrRenderComponent(_component_AuthenticatedLayout, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8"${_scopeId}><form${_scopeId}><textarea placeholder="What&#39;s on your mind?" class="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"${_scopeId}>${ssrInterpolate(_ctx.form.message)}</textarea>`);
        _push2(ssrRenderComponent(_component_InputError, {
          message: _ctx.form.errors.message,
          class: "mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_PrimaryButton, { class: "mt-4" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Chirp`);
            } else {
              return [
                createTextVNode("Chirp")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</form><div class="mt-6 bg-white shadow-sm rounded-lg divide-y"${_scopeId}><!--[-->`);
        ssrRenderList(_ctx.chirps, (chirp) => {
          _push2(ssrRenderComponent(_component_Chirp, {
            key: chirp.id,
            chirp,
            onRemove: _ctx.remove,
            onUpdate: _ctx.update
          }, null, _parent2, _scopeId));
        });
        _push2(`<!--]--></div></div>`);
      } else {
        return [
          createVNode("div", { class: "max-w-2xl mx-auto p-4 sm:p-6 lg:p-8" }, [
            createVNode("form", {
              onSubmit: withModifiers(_ctx.create, ["prevent"])
            }, [
              withDirectives(createVNode("textarea", {
                "onUpdate:modelValue": ($event) => _ctx.form.message = $event,
                placeholder: "What's on your mind?",
                class: "block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
              }, null, 8, ["onUpdate:modelValue"]), [
                [vModelText, _ctx.form.message]
              ]),
              createVNode(_component_InputError, {
                message: _ctx.form.errors.message,
                class: "mt-2"
              }, null, 8, ["message"]),
              createVNode(_component_PrimaryButton, { class: "mt-4" }, {
                default: withCtx(() => [
                  createTextVNode("Chirp")
                ]),
                _: 1
              })
            ], 40, ["onSubmit"]),
            createVNode("div", { class: "mt-6 bg-white shadow-sm rounded-lg divide-y" }, [
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.chirps, (chirp) => {
                return openBlock(), createBlock(_component_Chirp, {
                  key: chirp.id,
                  chirp,
                  onRemove: _ctx.remove,
                  onUpdate: _ctx.update
                }, null, 8, ["chirp", "onRemove", "onUpdate"]);
              }), 128))
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Chirps/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Index as default
};
