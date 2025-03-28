var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as AppLayout } from "./AppLayout-CJzwvG5j.js";
import { C as Chirp } from "./Chirp-CTKjf79B.js";
import { useForm } from "@inertiajs/vue3";
import { a as api, _ as _export_sfc } from "./axios-l-eSoL-p.js";
import { VContainer, VTextarea, VBtn, VCard } from "vuetify/components";
import { toNative, Vue, Prop, Component } from "vue-facing-decorator";
import { resolveComponent, withCtx, createTextVNode, openBlock, createBlock, Fragment, renderList, createVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { VBtn as VBtn$1 } from "vuetify/lib/components/VBtn/index.mjs";
import { VCard as VCard$1 } from "vuetify/lib/components/VCard/index.mjs";
import { VContainer as VContainer$1 } from "vuetify/lib/components/VGrid/index.mjs";
import { VTextarea as VTextarea$1 } from "vuetify/lib/components/VTextarea/index.mjs";
import "./auth-DrKxFB6F.js";
import "pinia";
import "vuetify/lib/components/VApp/index.mjs";
import "vuetify/lib/components/VAppBar/index.mjs";
import "vuetify/lib/components/VAvatar/index.mjs";
import "vuetify/lib/components/VIcon/index.mjs";
import "vuetify/lib/components/VImg/index.mjs";
import "vuetify/lib/components/VList/index.mjs";
import "vuetify/lib/components/VMain/index.mjs";
import "vuetify/lib/components/VMenu/index.mjs";
import "vuetify/lib/components/VNavigationDrawer/index.mjs";
import "vuetify/lib/components/VToolbar/index.mjs";
import "./InputError-BNQz4Gj5.js";
import "vuetify/lib/components/VAlert/index.mjs";
import "vuetify/lib/components/transitions/index.mjs";
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
      AppLayout,
      Chirp,
      VContainer,
      VTextarea,
      VBtn,
      VCard
    }
  })
], ChirpsPage);
const _sfc_main = toNative(ChirpsPage);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_AppLayout = resolveComponent("AppLayout");
  const _component_Chirp = resolveComponent("Chirp");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Chirps" }, null, _parent));
  _push(ssrRenderComponent(_component_AppLayout, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VContainer$1, { class: "max-w-2xl mx-auto p-4 sm:p-6 lg:p-8" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<form${_scopeId2}>`);
              _push3(ssrRenderComponent(VTextarea$1, {
                modelValue: _ctx.form.message,
                "onUpdate:modelValue": ($event) => _ctx.form.message = $event,
                label: "What's on your mind?",
                variant: "outlined"
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VBtn$1, {
                class: "mt-4",
                color: "primary",
                type: "submit"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Chirp`);
                  } else {
                    return [
                      createTextVNode("Chirp")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</form>`);
              _push3(ssrRenderComponent(VCard$1, { class: "mt-6" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<!--[-->`);
                    ssrRenderList(_ctx.chirps, (chirp) => {
                      _push4(ssrRenderComponent(_component_Chirp, {
                        key: chirp.id,
                        chirp,
                        onRemove: _ctx.remove,
                        onUpdate: _ctx.update
                      }, null, _parent4, _scopeId3));
                    });
                    _push4(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.chirps, (chirp) => {
                        return openBlock(), createBlock(_component_Chirp, {
                          key: chirp.id,
                          chirp,
                          onRemove: _ctx.remove,
                          onUpdate: _ctx.update
                        }, null, 8, ["chirp", "onRemove", "onUpdate"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("form", {
                  onSubmit: withModifiers(_ctx.create, ["prevent"])
                }, [
                  createVNode(VTextarea$1, {
                    modelValue: _ctx.form.message,
                    "onUpdate:modelValue": ($event) => _ctx.form.message = $event,
                    label: "What's on your mind?",
                    variant: "outlined"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(VBtn$1, {
                    class: "mt-4",
                    color: "primary",
                    type: "submit"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Chirp")
                    ]),
                    _: 1
                  })
                ], 40, ["onSubmit"]),
                createVNode(VCard$1, { class: "mt-6" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.chirps, (chirp) => {
                      return openBlock(), createBlock(_component_Chirp, {
                        key: chirp.id,
                        chirp,
                        onRemove: _ctx.remove,
                        onUpdate: _ctx.update
                      }, null, 8, ["chirp", "onRemove", "onUpdate"]);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VContainer$1, { class: "max-w-2xl mx-auto p-4 sm:p-6 lg:p-8" }, {
            default: withCtx(() => [
              createVNode("form", {
                onSubmit: withModifiers(_ctx.create, ["prevent"])
              }, [
                createVNode(VTextarea$1, {
                  modelValue: _ctx.form.message,
                  "onUpdate:modelValue": ($event) => _ctx.form.message = $event,
                  label: "What's on your mind?",
                  variant: "outlined"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(VBtn$1, {
                  class: "mt-4",
                  color: "primary",
                  type: "submit"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Chirp")
                  ]),
                  _: 1
                })
              ], 40, ["onSubmit"]),
              createVNode(VCard$1, { class: "mt-6" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.chirps, (chirp) => {
                    return openBlock(), createBlock(_component_Chirp, {
                      key: chirp.id,
                      chirp,
                      onRemove: _ctx.remove,
                      onUpdate: _ctx.update
                    }, null, 8, ["chirp", "onRemove", "onUpdate"]);
                  }), 128))
                ]),
                _: 1
              })
            ]),
            _: 1
          })
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
