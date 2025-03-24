var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { nextTick, resolveComponent, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, withModifiers, useSSRContext } from "vue";
import { useForm, router, Head } from "@inertiajs/vue3";
import { A as AuthenticationCard } from "./AuthenticationCard-CS2KeZEJ.js";
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BCaUMAMf.js";
import { _ as _sfc_main$2 } from "./InputError-BRdBLb-x.js";
import { _ as _sfc_main$3 } from "./InputLabel-Cnda-O0w.js";
import { _ as _sfc_main$4 } from "./PrimaryButton-CtpSN9QQ.js";
import { _ as _sfc_main$5 } from "./TextInput-2NFZntg2.js";
import { toNative, Vue, Ref, Component } from "vue-facing-decorator";
import { a as api } from "./axios-DQioN9B6.js";
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
let TwoFactorChallengePage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "recovery", false);
    __publicField(this, "form", useForm({
      code: "",
      recovery_code: ""
    }));
    __publicField(this, "recoveryCodeInput");
    __publicField(this, "codeInput");
  }
  async toggleRecovery() {
    this.recovery = !this.recovery;
    await nextTick();
    if (this.recovery) {
      this.recoveryCodeInput.value.focus();
      this.form.code = "";
    } else {
      this.codeInput.value.focus();
      this.form.recovery_code = "";
    }
  }
  async submit() {
    let res = await api.post(route("two-factor.login"), this.form);
    router.visit(res.data.redirect || "/dashboard");
  }
};
__decorateClass([
  Ref("recoveryCodeInput")
], TwoFactorChallengePage.prototype, "recoveryCodeInput", 2);
__decorateClass([
  Ref("codeInput")
], TwoFactorChallengePage.prototype, "codeInput", 2);
TwoFactorChallengePage = __decorateClass([
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
], TwoFactorChallengePage);
const _sfc_main = toNative(TwoFactorChallengePage);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_AuthenticationCard = resolveComponent("AuthenticationCard");
  const _component_AuthenticationCardLogo = resolveComponent("AuthenticationCardLogo");
  const _component_InputLabel = resolveComponent("InputLabel");
  const _component_TextInput = resolveComponent("TextInput");
  const _component_InputError = resolveComponent("InputError");
  const _component_PrimaryButton = resolveComponent("PrimaryButton");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Two-factor Confirmation" }, null, _parent));
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
        _push2(`<div class="mb-4 text-sm text-gray-600 dark:text-gray-400"${_scopeId}>`);
        if (!_ctx.recovery) {
          _push2(`<!--[--> Please confirm access to your account by entering the authentication code provided by your authenticator application. <!--]-->`);
        } else {
          _push2(`<!--[--> Please confirm access to your account by entering one of your emergency recovery codes. <!--]-->`);
        }
        _push2(`</div><form${_scopeId}>`);
        if (!_ctx.recovery) {
          _push2(`<div${_scopeId}>`);
          _push2(ssrRenderComponent(_component_InputLabel, {
            for: "code",
            value: "Code"
          }, null, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_TextInput, {
            id: "code",
            ref: "codeInput",
            modelValue: _ctx.form.code,
            "onUpdate:modelValue": ($event) => _ctx.form.code = $event,
            type: "text",
            inputmode: "numeric",
            class: "mt-1 block w-full",
            autofocus: "",
            autocomplete: "one-time-code"
          }, null, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_InputError, {
            class: "mt-2",
            message: _ctx.form.errors.code
          }, null, _parent2, _scopeId));
          _push2(`</div>`);
        } else {
          _push2(`<div${_scopeId}>`);
          _push2(ssrRenderComponent(_component_InputLabel, {
            for: "recovery_code",
            value: "Recovery Code"
          }, null, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_TextInput, {
            id: "recovery_code",
            ref: "recoveryCodeInput",
            modelValue: _ctx.form.recovery_code,
            "onUpdate:modelValue": ($event) => _ctx.form.recovery_code = $event,
            type: "text",
            class: "mt-1 block w-full",
            autocomplete: "one-time-code"
          }, null, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_InputError, {
            class: "mt-2",
            message: _ctx.form.errors.recovery_code
          }, null, _parent2, _scopeId));
          _push2(`</div>`);
        }
        _push2(`<div class="flex items-center justify-end mt-4"${_scopeId}><button type="button" class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 underline cursor-pointer"${_scopeId}>`);
        if (!_ctx.recovery) {
          _push2(`<!--[--> Use a recovery code <!--]-->`);
        } else {
          _push2(`<!--[--> Use an authentication code <!--]-->`);
        }
        _push2(`</button>`);
        _push2(ssrRenderComponent(_component_PrimaryButton, {
          class: ["ms-4", { "opacity-25": _ctx.form.processing }],
          disabled: _ctx.form.processing
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Log in `);
            } else {
              return [
                createTextVNode(" Log in ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div></form>`);
      } else {
        return [
          createVNode("div", { class: "mb-4 text-sm text-gray-600 dark:text-gray-400" }, [
            !_ctx.recovery ? (openBlock(), createBlock(Fragment, { key: 0 }, [
              createTextVNode(" Please confirm access to your account by entering the authentication code provided by your authenticator application. ")
            ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
              createTextVNode(" Please confirm access to your account by entering one of your emergency recovery codes. ")
            ], 64))
          ]),
          createVNode("form", {
            onSubmit: withModifiers(_ctx.submit, ["prevent"])
          }, [
            !_ctx.recovery ? (openBlock(), createBlock("div", { key: 0 }, [
              createVNode(_component_InputLabel, {
                for: "code",
                value: "Code"
              }),
              createVNode(_component_TextInput, {
                id: "code",
                ref: "codeInput",
                modelValue: _ctx.form.code,
                "onUpdate:modelValue": ($event) => _ctx.form.code = $event,
                type: "text",
                inputmode: "numeric",
                class: "mt-1 block w-full",
                autofocus: "",
                autocomplete: "one-time-code"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_InputError, {
                class: "mt-2",
                message: _ctx.form.errors.code
              }, null, 8, ["message"])
            ])) : (openBlock(), createBlock("div", { key: 1 }, [
              createVNode(_component_InputLabel, {
                for: "recovery_code",
                value: "Recovery Code"
              }),
              createVNode(_component_TextInput, {
                id: "recovery_code",
                ref: "recoveryCodeInput",
                modelValue: _ctx.form.recovery_code,
                "onUpdate:modelValue": ($event) => _ctx.form.recovery_code = $event,
                type: "text",
                class: "mt-1 block w-full",
                autocomplete: "one-time-code"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_InputError, {
                class: "mt-2",
                message: _ctx.form.errors.recovery_code
              }, null, 8, ["message"])
            ])),
            createVNode("div", { class: "flex items-center justify-end mt-4" }, [
              createVNode("button", {
                type: "button",
                class: "text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 underline cursor-pointer",
                onClick: withModifiers(_ctx.toggleRecovery, ["prevent"])
              }, [
                !_ctx.recovery ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createTextVNode(" Use a recovery code ")
                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createTextVNode(" Use an authentication code ")
                ], 64))
              ], 8, ["onClick"]),
              createVNode(_component_PrimaryButton, {
                class: ["ms-4", { "opacity-25": _ctx.form.processing }],
                disabled: _ctx.form.processing
              }, {
                default: withCtx(() => [
                  createTextVNode(" Log in ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/TwoFactorChallenge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TwoFactorChallenge = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  TwoFactorChallenge as default
};
