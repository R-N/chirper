var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { b as Component, t as toNative, V as Vue, a as decorator, _ as _export_sfc, o as openBlock, j as createElementBlock, e as createVNode, w as withCtx, E as withDirectives, g as createBaseVNode, ap as renderSlot, aG as vShow, c as createBlock, r as resolveComponent, L as decorator$1, i as withModifiers, N as createCommentVNode } from "./app-DDBQLYRK.js";
import { e as VAlert } from "./InputError-ytemAFXd.js";
import { N as VExpandTransition } from "./forwardRefs-B6F8wykm.js";
import { b as VRow, V as VContainer, a as VCard, e as VCardText, f as VCardActions } from "./GuestLayout.vue_vue_type_script_lang-2s0GDYYy.js";
import { V as VCol } from "./VCol-BlRM1PkL.js";
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$3(target, key, result);
  return result;
};
let ActionMessage$1 = class ActionMessage extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "on");
  }
};
__decorateClass$3([
  decorator({ type: Boolean, required: true })
], ActionMessage$1.prototype, "on", 2);
ActionMessage$1 = __decorateClass$3([
  Component({
    components: {
      VAlert,
      VExpandTransition
    }
  })
], ActionMessage$1);
const _sfc_main$3 = toNative(ActionMessage$1);
const _hoisted_1$1 = { class: "text-sm font-weight-medium" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createVNode(VExpandTransition, null, {
      default: withCtx(() => [
        withDirectives(createBaseVNode("div", _hoisted_1$1, [
          renderSlot(_ctx.$slots, "default")
        ], 512), [
          [vShow, _ctx.on]
        ])
      ]),
      _: 3
    })
  ]);
}
const ActionMessage2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
  return result;
};
let SectionTitle$1 = class SectionTitle extends Vue {
};
SectionTitle$1 = __decorateClass$2([
  Component({
    components: {
      VRow,
      VCol
    }
  })
], SectionTitle$1);
const _sfc_main$2 = toNative(SectionTitle$1);
const _hoisted_1 = { class: "text-h6 font-weight-medium" };
const _hoisted_2 = { class: "text-body-2 text-medium-emphasis mt-1" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VRow, {
    justify: "space-between",
    align: "center"
  }, {
    default: withCtx(() => [
      createVNode(VCol, null, {
        default: withCtx(() => [
          createBaseVNode("h3", _hoisted_1, [
            renderSlot(_ctx.$slots, "title")
          ]),
          createBaseVNode("p", _hoisted_2, [
            renderSlot(_ctx.$slots, "description")
          ])
        ]),
        _: 3
      }),
      createVNode(VCol, { class: "text-right" }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "aside")
        ]),
        _: 3
      })
    ]),
    _: 3
  });
}
const SectionTitle2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let ActionSection$1 = class ActionSection extends Vue {
};
ActionSection$1 = __decorateClass$1([
  Component({
    components: {
      SectionTitle: SectionTitle2,
      VContainer,
      VRow,
      VCol,
      VCard,
      VCardText
    }
  })
], ActionSection$1);
const _sfc_main$1 = toNative(ActionSection$1);
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_SectionTitle = resolveComponent("SectionTitle");
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VRow, { class: "d-flex" }, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            md: "4"
          }, {
            default: withCtx(() => [
              createVNode(_component_SectionTitle, null, {
                title: withCtx(() => [
                  renderSlot(_ctx.$slots, "title")
                ]),
                description: withCtx(() => [
                  renderSlot(_ctx.$slots, "description")
                ]),
                _: 3
              })
            ]),
            _: 3
          }),
          createVNode(VCol, {
            cols: "12",
            md: "8"
          }, {
            default: withCtx(() => [
              createVNode(VCard, { class: "pa-5" }, {
                default: withCtx(() => [
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "content")
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              })
            ]),
            _: 3
          })
        ]),
        _: 3
      })
    ]),
    _: 3
  });
}
const ActionSection2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp2(target, key, result);
  return result;
};
let FormSection$1 = class FormSection extends Vue {
  submitted() {
  }
  get hasActions() {
    return !!this.$slots.actions;
  }
};
__decorateClass([
  decorator$1("submitted")
], FormSection$1.prototype, "submitted", 1);
FormSection$1 = __decorateClass([
  Component({
    components: {
      SectionTitle: SectionTitle2,
      VContainer,
      VRow,
      VCol,
      VCard,
      VCardText,
      VCardActions
    },
    emits: ["submitted"]
  })
], FormSection$1);
const _sfc_main = toNative(FormSection$1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_SectionTitle = resolveComponent("SectionTitle");
  return openBlock(), createBlock(VContainer, null, {
    default: withCtx(() => [
      createVNode(VRow, { class: "d-flex" }, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            md: "4"
          }, {
            default: withCtx(() => [
              createVNode(_component_SectionTitle, null, {
                title: withCtx(() => [
                  renderSlot(_ctx.$slots, "title")
                ]),
                description: withCtx(() => [
                  renderSlot(_ctx.$slots, "description")
                ]),
                _: 3
              })
            ]),
            _: 3
          }),
          createVNode(VCol, {
            cols: "12",
            md: "8"
          }, {
            default: withCtx(() => [
              createVNode(VCard, { class: "pa-5" }, {
                default: withCtx(() => [
                  createBaseVNode("form", {
                    onSubmit: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.submitted && _ctx.submitted(...args), ["prevent"]))
                  }, [
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "form")
                      ]),
                      _: 3
                    }),
                    _ctx.hasActions ? (openBlock(), createBlock(VCardActions, {
                      key: 0,
                      class: "justify-end"
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "actions")
                      ]),
                      _: 3
                    })) : createCommentVNode("", true)
                  ], 32)
                ]),
                _: 3
              })
            ]),
            _: 3
          })
        ]),
        _: 3
      })
    ]),
    _: 3
  });
}
const FormSection2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ActionMessage2 as A,
  FormSection2 as F,
  ActionSection2 as a
};
//# sourceMappingURL=FormSection-CZo-bzAv.js.map
