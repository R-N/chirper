var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { m as makeVInputProps, a as makeVFieldProps, u as useFocus, V as VInput, b as VField, c as VCounter, I as InputError } from "./InputError-D2hiOP2i.js";
import { p as propsFactory, l as genericComponent, u as useProxiedModel, m as computed, n as ref, s as shallowRef, q as watchEffect, v as onMounted, x as watch, y as onBeforeUnmount, z as nextTick, A as convertToUnit, B as filterInputAttrs, e as createVNode, D as mergeProps, F as Fragment, E as withDirectives, G as resolveDirective, H as vModelText, I as callEvent, J as clamp, t as toNative, V as Vue, C, K as dayjs, a as decorator, L as decorator$1, b as Component, _ as _export_sfc, r as resolveComponent, j as createElementBlock, w as withCtx, g as createBaseVNode, M as toDisplayString, N as createCommentVNode, c as createBlock, i as withModifiers, o as openBlock, h as createTextVNode } from "./app-CPu3B8nk.js";
import { c as chirpService } from "./chirp-CHRbM8rs.js";
import { V as VMenu, a as VList, b as VListItem } from "./VMenu-DKNR31gj.js";
import { I as Intersect, u as useRender, f as forwardRefs, V as VBtn, a as VIcon } from "./forwardRefs-CUUEJ2GB.js";
const makeVTextareaProps = propsFactory({
  autoGrow: Boolean,
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: Function,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  noResize: Boolean,
  rows: {
    type: [Number, String],
    default: 5,
    validator: (v) => !isNaN(parseFloat(v))
  },
  maxRows: {
    type: [Number, String],
    validator: (v) => !isNaN(parseFloat(v))
  },
  suffix: String,
  modelModifiers: Object,
  ...makeVInputProps(),
  ...makeVFieldProps()
}, "VTextarea");
const VTextarea = genericComponent()({
  name: "VTextarea",
  directives: {
    Intersect
  },
  inheritAttrs: false,
  props: makeVTextareaProps(),
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : (model.value || "").toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength;
      if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string") return void 0;
      return props.counter;
    });
    function onIntersect(isIntersecting, entries) {
      var _a, _b;
      if (!props.autofocus || !isIntersecting) return;
      (_b = (_a = entries[0].target) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    }
    const vInputRef = ref();
    const vFieldRef = ref();
    const controlHeight = shallowRef("");
    const textareaRef = ref();
    const isActive = computed(() => props.persistentPlaceholder || isFocused.value || props.active);
    function onFocus() {
      var _a;
      if (textareaRef.value !== document.activeElement) {
        (_a = textareaRef.value) == null ? void 0 : _a.focus();
      }
      if (!isFocused.value) focus();
    }
    function onControlClick(e) {
      onFocus();
      emit("click:control", e);
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = "";
        callEvent(props["onClick:clear"], e);
      });
    }
    function onInput(e) {
      var _a;
      const el = e.target;
      model.value = el.value;
      if ((_a = props.modelModifiers) == null ? void 0 : _a.trim) {
        const caretPosition = [el.selectionStart, el.selectionEnd];
        nextTick(() => {
          el.selectionStart = caretPosition[0];
          el.selectionEnd = caretPosition[1];
        });
      }
    }
    const sizerRef = ref();
    const rows = ref(Number(props.rows));
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    watchEffect(() => {
      if (!props.autoGrow) rows.value = Number(props.rows);
    });
    function calculateInputHeight() {
      if (!props.autoGrow) return;
      nextTick(() => {
        if (!sizerRef.value || !vFieldRef.value) return;
        const style = getComputedStyle(sizerRef.value);
        const fieldStyle = getComputedStyle(vFieldRef.value.$el);
        const padding = parseFloat(style.getPropertyValue("--v-field-padding-top")) + parseFloat(style.getPropertyValue("--v-input-padding-top")) + parseFloat(style.getPropertyValue("--v-field-padding-bottom"));
        const height = sizerRef.value.scrollHeight;
        const lineHeight = parseFloat(style.lineHeight);
        const minHeight = Math.max(parseFloat(props.rows) * lineHeight + padding, parseFloat(fieldStyle.getPropertyValue("--v-input-control-height")));
        const maxHeight = parseFloat(props.maxRows) * lineHeight + padding || Infinity;
        const newHeight = clamp(height ?? 0, minHeight, maxHeight);
        rows.value = Math.floor((newHeight - padding) / lineHeight);
        controlHeight.value = convertToUnit(newHeight);
      });
    }
    onMounted(calculateInputHeight);
    watch(model, calculateInputHeight);
    watch(() => props.rows, calculateInputHeight);
    watch(() => props.maxRows, calculateInputHeight);
    watch(() => props.density, calculateInputHeight);
    let observer;
    watch(sizerRef, (val) => {
      if (val) {
        observer = new ResizeObserver(calculateInputHeight);
        observer.observe(sizerRef.value);
      } else {
        observer == null ? void 0 : observer.disconnect();
      }
    });
    onBeforeUnmount(() => {
      observer == null ? void 0 : observer.disconnect();
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = VField.filterProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-textarea v-text-field", {
          "v-textarea--prefixed": props.prefix,
          "v-textarea--suffixed": props.suffix,
          "v-text-field--prefixed": props.prefix,
          "v-text-field--suffixed": props.suffix,
          "v-textarea--auto-grow": props.autoGrow,
          "v-textarea--no-resize": props.noResize || props.autoGrow,
          "v-input--plain-underlined": isPlainOrUnderlined.value
        }, props.class],
        "style": props.style
      }, rootAttrs, inputProps, {
        "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "style": {
              "--v-textarea-control-height": controlHeight.value
            },
            "onClick": onControlClick,
            "onMousedown": onControlMousedown,
            "onClick:clear": onClear,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"]
          }, fieldProps, {
            "id": id.value,
            "active": isActive.value || isDirty.value,
            "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref3) => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              return createVNode(Fragment, null, [props.prefix && createVNode("span", {
                "class": "v-text-field__prefix"
              }, [props.prefix]), withDirectives(createVNode("textarea", mergeProps({
                "ref": textareaRef,
                "class": fieldClass,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "placeholder": props.placeholder,
                "rows": props.rows,
                "name": props.name,
                "onFocus": onFocus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), [[resolveDirective("intersect"), {
                handler: onIntersect
              }, null, {
                once: true
              }]]), props.autoGrow && withDirectives(createVNode("textarea", {
                "class": [fieldClass, "v-textarea__sizer"],
                "id": `${slotProps.id}-sizer`,
                "onUpdate:modelValue": ($event) => model.value = $event,
                "ref": sizerRef,
                "readonly": true,
                "aria-hidden": "true"
              }, null), [[vModelText, model.value]]), props.suffix && createVNode("span", {
                "class": "v-text-field__suffix"
              }, [props.suffix])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => {
          var _a;
          return createVNode(Fragment, null, [(_a = slots.details) == null ? void 0 : _a.call(slots, slotProps), hasCounter && createVNode(Fragment, null, [createVNode("span", null, null), createVNode(VCounter, {
            "active": props.persistentCounter || isFocused.value,
            "value": counterValue.value,
            "max": max.value,
            "disabled": props.disabled
          }, slots.counter)])]);
        } : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, textareaRef);
  }
});
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
let Chirp$1 = class Chirp extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "chirp");
    __publicField(this, "editing", false);
    __publicField(this, "form", C({
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
  async updateChirp() {
    let res = await chirpService.update(this.chirp, this.form);
    Object.assign(this.chirp, res.chirp);
    this.emitUpdate(res.chirp);
    this.resetForm();
    this.editing = false;
  }
  emitUpdate(chirp) {
    return chirp;
  }
  async destroyChirp() {
    await chirpService.destroy(this.chirp);
    this.emitDestroy(this.chirp);
  }
  emitDestroy(chirp) {
    return (chirp == null ? void 0 : chirp.id) ?? chirp;
  }
};
__decorateClass([
  decorator({ type: Object })
], Chirp$1.prototype, "chirp", 2);
__decorateClass([
  decorator$1("update")
], Chirp$1.prototype, "emitUpdate", 1);
__decorateClass([
  decorator$1("destroy")
], Chirp$1.prototype, "emitDestroy", 1);
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
    },
    emits: ["update", "destroy"]
  })
], Chirp$1);
const _sfc_main = toNative(Chirp$1);
const _hoisted_1 = { class: "p-6 flex space-x-2" };
const _hoisted_2 = { class: "flex-1" };
const _hoisted_3 = { class: "flex justify-between items-center" };
const _hoisted_4 = { class: "text-gray-800" };
const _hoisted_5 = { class: "ml-2 text-sm text-gray-600" };
const _hoisted_6 = {
  key: 0,
  class: "text-sm text-gray-600"
};
const _hoisted_7 = { class: "mt-4 d-flex gap-2" };
const _hoisted_8 = {
  key: 1,
  class: "mt-4 text-lg text-gray-900"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_InputError = resolveComponent("InputError");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(VIcon, {
      size: "32",
      class: "text-gray-600"
    }, {
      default: withCtx(() => _cache[4] || (_cache[4] = [
        createTextVNode("mdi-message")
      ])),
      _: 1
    }),
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", null, [
          createBaseVNode("span", _hoisted_4, toDisplayString(_ctx.chirp.user.name), 1),
          createBaseVNode("small", _hoisted_5, toDisplayString(_ctx.createdAt), 1),
          _ctx.chirp.created_at !== _ctx.chirp.updated_at ? (openBlock(), createElementBlock("small", _hoisted_6, " · edited")) : createCommentVNode("", true)
        ]),
        _ctx.chirp.user.id === _ctx.$page.props.auth.user.id ? (openBlock(), createBlock(VMenu, { key: 0 }, {
          activator: withCtx(({ props }) => [
            createVNode(VBtn, mergeProps({ icon: "" }, props, { variant: "plain" }), {
              default: withCtx(() => [
                createVNode(VIcon, null, {
                  default: withCtx(() => _cache[5] || (_cache[5] = [
                    createTextVNode("mdi-dots-vertical")
                  ])),
                  _: 1
                })
              ]),
              _: 2
            }, 1040)
          ]),
          default: withCtx(() => [
            createVNode(VList, null, {
              default: withCtx(() => [
                createVNode(VListItem, {
                  onClick: _cache[0] || (_cache[0] = ($event) => _ctx.resetForm(true))
                }, {
                  default: withCtx(() => _cache[6] || (_cache[6] = [
                    createTextVNode("Edit")
                  ])),
                  _: 1
                }),
                createVNode(VListItem, {
                  onClick: withModifiers(_ctx.destroyChirp, ["prevent"])
                }, {
                  default: withCtx(() => _cache[7] || (_cache[7] = [
                    createTextVNode("Delete")
                  ])),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ]),
      _ctx.editing ? (openBlock(), createElementBlock("form", {
        key: 0,
        onSubmit: _cache[3] || (_cache[3] = withModifiers((...args) => _ctx.updateChirp && _ctx.updateChirp(...args), ["prevent"]))
      }, [
        createVNode(VTextarea, {
          modelValue: _ctx.form.message,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.form.message = $event),
          class: "mt-4",
          label: "Edit message",
          "auto-grow": ""
        }, null, 8, ["modelValue"]),
        createVNode(_component_InputError, {
          message: _ctx.form.errors.message,
          class: "mt-2"
        }, null, 8, ["message"]),
        createBaseVNode("div", _hoisted_7, [
          createVNode(VBtn, {
            color: "primary",
            variant: "elevated",
            type: "submit"
          }, {
            default: withCtx(() => _cache[8] || (_cache[8] = [
              createTextVNode("Save")
            ])),
            _: 1
          }),
          createVNode(VBtn, {
            color: "secondary",
            variant: "text",
            onClick: _cache[2] || (_cache[2] = ($event) => _ctx.resetForm(false))
          }, {
            default: withCtx(() => _cache[9] || (_cache[9] = [
              createTextVNode("Cancel")
            ])),
            _: 1
          })
        ])
      ], 32)) : (openBlock(), createElementBlock("p", _hoisted_8, toDisplayString(_ctx.chirp.message), 1))
    ])
  ]);
}
const Chirp2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Chirp2 as C,
  VTextarea as V
};
//# sourceMappingURL=Chirp-L0Faii25.js.map
