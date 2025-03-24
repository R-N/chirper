var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as AuthenticationCard } from "./AuthenticationCard-CS2KeZEJ.js";
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BCaUMAMf.js";
import { _ as _sfc_main$2 } from "./Checkbox-W7YGesSt.js";
import { _ as _sfc_main$3 } from "./InputError-BRdBLb-x.js";
import { _ as _sfc_main$4 } from "./InputLabel-Cnda-O0w.js";
import { _ as _sfc_main$5 } from "./PrimaryButton-CtpSN9QQ.js";
import { _ as _sfc_main$6 } from "./TextInput-2NFZntg2.js";
import { useForm, router, Head, Link } from "@inertiajs/vue3";
import { toNative, Vue, Prop, Component } from "vue-facing-decorator";
import { a as api } from "./axios-DQioN9B6.js";
import { u as useAuthStore } from "./auth-DrKxFB6F.js";
import { resolveComponent, withCtx, createVNode, createTextVNode, openBlock, createBlock, toDisplayString, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "axios";
import "js-cookie";
import "pinia";
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
let LoginPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "canResetPassword");
    __publicField(this, "status");
    __publicField(this, "form", useForm({
      email: "",
      password: "",
      remember: false
    }));
  }
  async login() {
    const authStore = useAuthStore();
    let form = this.form.transform((data) => ({
      ...data,
      remember: this.form.remember ? "on" : ""
    }));
    let res = await api.post("/login", form);
    this.form.reset("password");
    authStore.updateUser(res.data.user);
    authStore.setAuthToken(res.data.auth_token);
    router.visit(res.data.redirect || "/dashboard");
  }
};
__decorateClass([
  Prop(Boolean)
], LoginPage.prototype, "canResetPassword", 2);
__decorateClass([
  Prop(String)
], LoginPage.prototype, "status", 2);
LoginPage = __decorateClass([
  Component({
    components: {
      AuthenticationCard,
      AuthenticationCardLogo: _sfc_main$1,
      Checkbox: _sfc_main$2,
      //GuestLayout,
      InputError: _sfc_main$3,
      InputLabel: _sfc_main$4,
      PrimaryButton: _sfc_main$5,
      TextInput: _sfc_main$6,
      Head,
      Link
    }
  })
], LoginPage);
const _sfc_main = toNative(LoginPage);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_AuthenticationCard = resolveComponent("AuthenticationCard");
  const _component_AuthenticationCardLogo = resolveComponent("AuthenticationCardLogo");
  const _component_InputLabel = resolveComponent("InputLabel");
  const _component_TextInput = resolveComponent("TextInput");
  const _component_InputError = resolveComponent("InputError");
  const _component_Checkbox = resolveComponent("Checkbox");
  const _component_Link = resolveComponent("Link");
  const _component_PrimaryButton = resolveComponent("PrimaryButton");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Log in" }, null, _parent));
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
        if (_ctx.status) {
          _push2(`<div class="mb-4 font-medium text-sm text-green-600 dark:text-green-400"${_scopeId}>${ssrInterpolate(_ctx.status)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<form${_scopeId}><div${_scopeId}>`);
        _push2(ssrRenderComponent(_component_InputLabel, {
          for: "email",
          value: "Email"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_TextInput, {
          id: "email",
          modelValue: _ctx.form.email,
          "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
          type: "email",
          class: "mt-1 block w-full",
          required: "",
          autofocus: "",
          autocomplete: "username"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_InputError, {
          class: "mt-2",
          message: _ctx.form.errors.email
        }, null, _parent2, _scopeId));
        _push2(`</div><div class="mt-4"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_InputLabel, {
          for: "password",
          value: "Password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_TextInput, {
          id: "password",
          modelValue: _ctx.form.password,
          "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
          type: "password",
          class: "mt-1 block w-full",
          required: "",
          autocomplete: "current-password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_InputError, {
          class: "mt-2",
          message: _ctx.form.errors.password
        }, null, _parent2, _scopeId));
        _push2(`</div><div class="block mt-4"${_scopeId}><label class="flex items-center"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Checkbox, {
          checked: _ctx.form.remember,
          "onUpdate:checked": ($event) => _ctx.form.remember = $event,
          name: "remember"
        }, null, _parent2, _scopeId));
        _push2(`<span class="ms-2 text-sm text-gray-600 dark:text-gray-400"${_scopeId}>Remember me</span></label></div><div class="flex items-center justify-end mt-4"${_scopeId}>`);
        if (_ctx.canResetPassword) {
          _push2(ssrRenderComponent(_component_Link, {
            href: _ctx.route("password.request"),
            class: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(` Forgot your password? `);
              } else {
                return [
                  createTextVNode(" Forgot your password? ")
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
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
          _ctx.status ? (openBlock(), createBlock("div", {
            key: 0,
            class: "mb-4 font-medium text-sm text-green-600 dark:text-green-400"
          }, toDisplayString(_ctx.status), 1)) : createCommentVNode("", true),
          createVNode("form", {
            onSubmit: withModifiers(_ctx.login, ["prevent"])
          }, [
            createVNode("div", null, [
              createVNode(_component_InputLabel, {
                for: "email",
                value: "Email"
              }),
              createVNode(_component_TextInput, {
                id: "email",
                modelValue: _ctx.form.email,
                "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                type: "email",
                class: "mt-1 block w-full",
                required: "",
                autofocus: "",
                autocomplete: "username"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_InputError, {
                class: "mt-2",
                message: _ctx.form.errors.email
              }, null, 8, ["message"])
            ]),
            createVNode("div", { class: "mt-4" }, [
              createVNode(_component_InputLabel, {
                for: "password",
                value: "Password"
              }),
              createVNode(_component_TextInput, {
                id: "password",
                modelValue: _ctx.form.password,
                "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                type: "password",
                class: "mt-1 block w-full",
                required: "",
                autocomplete: "current-password"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_InputError, {
                class: "mt-2",
                message: _ctx.form.errors.password
              }, null, 8, ["message"])
            ]),
            createVNode("div", { class: "block mt-4" }, [
              createVNode("label", { class: "flex items-center" }, [
                createVNode(_component_Checkbox, {
                  checked: _ctx.form.remember,
                  "onUpdate:checked": ($event) => _ctx.form.remember = $event,
                  name: "remember"
                }, null, 8, ["checked", "onUpdate:checked"]),
                createVNode("span", { class: "ms-2 text-sm text-gray-600 dark:text-gray-400" }, "Remember me")
              ])
            ]),
            createVNode("div", { class: "flex items-center justify-end mt-4" }, [
              _ctx.canResetPassword ? (openBlock(), createBlock(_component_Link, {
                key: 0,
                href: _ctx.route("password.request"),
                class: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Forgot your password? ")
                ]),
                _: 1
              }, 8, ["href"])) : createCommentVNode("", true),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Login = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Login as default
};
