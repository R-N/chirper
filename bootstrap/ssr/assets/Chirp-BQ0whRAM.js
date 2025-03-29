var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { I as InputError } from "./InputError-BGOWAPan.js";
import dayjs from "dayjs";
import { useForm } from "@inertiajs/vue3";
import { VMenu, VTextarea, VBtn, VIcon, VList, VListItem } from "vuetify/components";
import { toNative, Vue, Prop, Component } from "vue-facing-decorator";
import { a as api, _ as _export_sfc } from "./axios-D4gWzKUO.js";
import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { VBtn as VBtn$1 } from "vuetify/lib/components/VBtn/index.mjs";
import { VIcon as VIcon$1 } from "vuetify/lib/components/VIcon/index.mjs";
import { VList as VList$1, VListItem as VListItem$1 } from "vuetify/lib/components/VList/index.mjs";
import { VMenu as VMenu$1 } from "vuetify/lib/components/VMenu/index.mjs";
import { VTextarea as VTextarea$1 } from "vuetify/lib/components/VTextarea/index.mjs";
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
      VMenu,
      VTextarea,
      VBtn,
      VIcon,
      VList,
      VListItem,
      InputError
    }
  })
], Chirp$1);
const _sfc_main = toNative(Chirp$1);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_InputError = resolveComponent("InputError");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 flex space-x-2" }, _attrs))}>`);
  _push(ssrRenderComponent(VIcon$1, {
    size: "32",
    class: "text-gray-600"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`mdi-message`);
      } else {
        return [
          createTextVNode("mdi-message")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="flex-1"><div class="flex justify-between items-center"><div><span class="text-gray-800">${ssrInterpolate(_ctx.chirp.user.name)}</span><small class="ml-2 text-sm text-gray-600">${ssrInterpolate(_ctx.createdAt)}</small>`);
  if (_ctx.chirp.created_at !== _ctx.chirp.updated_at) {
    _push(`<small class="text-sm text-gray-600"> · edited</small>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  if (_ctx.chirp.user.id === _ctx.$page.props.auth.user.id) {
    _push(ssrRenderComponent(VMenu$1, null, {
      activator: withCtx(({ props }, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(ssrRenderComponent(VBtn$1, mergeProps({ icon: "" }, props, { variant: "plain" }), {
            default: withCtx((_, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(VIcon$1, null, {
                  default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`mdi-dots-vertical`);
                    } else {
                      return [
                        createTextVNode("mdi-dots-vertical")
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              } else {
                return [
                  createVNode(VIcon$1, null, {
                    default: withCtx(() => [
                      createTextVNode("mdi-dots-vertical")
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
        } else {
          return [
            createVNode(VBtn$1, mergeProps({ icon: "" }, props, { variant: "plain" }), {
              default: withCtx(() => [
                createVNode(VIcon$1, null, {
                  default: withCtx(() => [
                    createTextVNode("mdi-dots-vertical")
                  ]),
                  _: 1
                })
              ]),
              _: 2
            }, 1040)
          ];
        }
      }),
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(ssrRenderComponent(VList$1, null, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(VListItem$1, {
                  onClick: ($event) => _ctx.resetForm(true)
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`Edit`);
                    } else {
                      return [
                        createTextVNode("Edit")
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
                _push3(ssrRenderComponent(VListItem$1, { onClick: _ctx.remove }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`Delete`);
                    } else {
                      return [
                        createTextVNode("Delete")
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                return [
                  createVNode(VListItem$1, {
                    onClick: ($event) => _ctx.resetForm(true)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Edit")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(VListItem$1, {
                    onClick: withModifiers(_ctx.remove, ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Delete")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
        } else {
          return [
            createVNode(VList$1, null, {
              default: withCtx(() => [
                createVNode(VListItem$1, {
                  onClick: ($event) => _ctx.resetForm(true)
                }, {
                  default: withCtx(() => [
                    createTextVNode("Edit")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(VListItem$1, {
                  onClick: withModifiers(_ctx.remove, ["prevent"])
                }, {
                  default: withCtx(() => [
                    createTextVNode("Delete")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            })
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
    _push(`<form>`);
    _push(ssrRenderComponent(VTextarea$1, {
      modelValue: _ctx.form.message,
      "onUpdate:modelValue": ($event) => _ctx.form.message = $event,
      class: "mt-4",
      label: "Edit message",
      "auto-grow": ""
    }, null, _parent));
    _push(ssrRenderComponent(_component_InputError, {
      message: _ctx.form.errors.message,
      class: "mt-2"
    }, null, _parent));
    _push(`<div class="mt-4 d-flex gap-2">`);
    _push(ssrRenderComponent(VBtn$1, {
      color: "primary",
      variant: "elevated",
      type: "submit"
    }, {
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
    _push(ssrRenderComponent(VBtn$1, {
      color: "secondary",
      variant: "text",
      onClick: ($event) => _ctx.resetForm(false)
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`Cancel`);
        } else {
          return [
            createTextVNode("Cancel")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div></form>`);
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
