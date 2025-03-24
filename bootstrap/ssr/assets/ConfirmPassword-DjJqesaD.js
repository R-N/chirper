var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as AuthenticationCard } from "./AuthenticationCard-CS2KeZEJ.js";
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BCaUMAMf.js";
import { _ as _sfc_main$2 } from "./InputError-BRdBLb-x.js";
import { _ as _sfc_main$3 } from "./InputLabel-Cnda-O0w.js";
import { _ as _sfc_main$4 } from "./PrimaryButton-CtpSN9QQ.js";
import { _ as _sfc_main$5 } from "./TextInput-2NFZntg2.js";
import { useForm, router, Head } from "@inertiajs/vue3";
import { toNative, Vue, Component } from "vue-facing-decorator";
import { a as api } from "./axios-DQioN9B6.js";
import { resolveComponent, withCtx, createVNode, createTextVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
let ConfirmPasswordPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "form", useForm({
      password: ""
    }));
    __publicField(this, "passwordInput");
  }
  async submit() {
    let res = await api.post(route("password.confirm"), this.form);
    this.form.reset();
    this.passwordInput.value.focus();
    router.visit(res.data.redirect || "/login");
  }
};
__decorateClass([
  Ref("passwordInput")
], ConfirmPasswordPage.prototype, "passwordInput", 2);
ConfirmPasswordPage = __decorateClass([
  Component({
    components: {
      AuthenticationCard,
      AuthenticationCardLogo: _sfc_main$1,
      InputError: _sfc_main$2,
      InputLabel: _sfc_main$3,
      PrimaryButton: _sfc_main$4,
      TextInput: _sfc_main$5,
      Head
    }
  })
], ConfirmPasswordPage);
const _sfc_main = toNative(ConfirmPasswordPage);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_AuthenticationCard = resolveComponent("AuthenticationCard");
  const _component_AuthenticationCardLogo = resolveComponent("AuthenticationCardLogo");
  const _component_InputLabel = resolveComponent("InputLabel");
  const _component_TextInput = resolveComponent("TextInput");
  const _component_InputError = resolveComponent("InputError");
  const _component_PrimaryButton = resolveComponent("PrimaryButton");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Secure Area" }, null, _parent));
  _push(ssrRenderComponent(_component_AuthenticationCard, null, {
    logo: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_AuthenticationCardLogo, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_AuthenticationCardLogo)
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="mb-4 text-sm text-gray-600 dark:text-gray-400"${_scopeId}> This is a secure area of the application. Please confirm your password before continuing. </div><form${_scopeId}><div${_scopeId}>`);
        _push2(ssrRenderComponent(_component_InputLabel, {
          for: "password",
          value: "Password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_TextInput, {
          id: "password",
          ref: "passwordInput",
          modelValue: _ctx.form.password,
          "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
          type: "password",
          class: "mt-1 block w-full",
          required: "",
          autocomplete: "current-password",
          autofocus: ""
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_InputError, {
          class: "mt-2",
          message: _ctx.form.errors.password
        }, null, _parent2, _scopeId));
        _push2(`</div><div class="flex justify-end mt-4"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_PrimaryButton, {
          class: ["ms-4", { "opacity-25": _ctx.form.processing }],
          disabled: _ctx.form.processing
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Confirm `);
            } else {
              return [
                createTextVNode(" Confirm ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div></form>`);
      } else {
        return [
          createVNode("div", { class: "mb-4 text-sm text-gray-600 dark:text-gray-400" }, " This is a secure area of the application. Please confirm your password before continuing. "),
          createVNode("form", {
            onSubmit: withModifiers(_ctx.submit, ["prevent"])
          }, [
            createVNode("div", null, [
              createVNode(_component_InputLabel, {
                for: "password",
                value: "Password"
              }),
              createVNode(_component_TextInput, {
                id: "password",
                ref: "passwordInput",
                modelValue: _ctx.form.password,
                "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                type: "password",
                class: "mt-1 block w-full",
                required: "",
                autocomplete: "current-password",
                autofocus: ""
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_InputError, {
                class: "mt-2",
                message: _ctx.form.errors.password
              }, null, 8, ["message"])
            ]),
            createVNode("div", { class: "flex justify-end mt-4" }, [
              createVNode(_component_PrimaryButton, {
                class: ["ms-4", { "opacity-25": _ctx.form.processing }],
                disabled: _ctx.form.processing
              }, {
                default: withCtx(() => [
                  createTextVNode(" Confirm ")
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ])
          ], 40, ["onSubmit"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ConfirmPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ConfirmPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  ConfirmPassword as default
};
