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
import { toNative, Vue, Component } from "vue-facing-decorator";
import { a as api } from "./axios-DQioN9B6.js";
import { u as useAuthStore } from "./auth-DrKxFB6F.js";
import { resolveComponent, withCtx, createVNode, createTextVNode, withModifiers, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
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
let RegisterPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "form", useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      terms: false
    }));
  }
  async register() {
    const authStore = useAuthStore();
    let res = await api.post("/register", this.form);
    this.form.reset("password", "password_confirmation");
    authStore.updateUser(res.data.user);
    authStore.setAuthToken(res.data.auth_token);
    router.visit(res.data.redirect || "/dashboard");
  }
};
RegisterPage = __decorateClass([
  Component({
    components: {
      AuthenticationCard,
      AuthenticationCardLogo: _sfc_main$1,
      Checkbox: _sfc_main$2,
      InputError: _sfc_main$3,
      InputLabel: _sfc_main$4,
      PrimaryButton: _sfc_main$5,
      TextInput: _sfc_main$6,
      Head,
      Link
    }
  })
], RegisterPage);
const _sfc_main = toNative(RegisterPage);
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
  _push(ssrRenderComponent(_component_Head, { title: "Register" }, null, _parent));
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
        _push2(`<form${_scopeId}><div${_scopeId}>`);
        _push2(ssrRenderComponent(_component_InputLabel, {
          for: "name",
          value: "Name"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_TextInput, {
          id: "name",
          modelValue: _ctx.form.name,
          "onUpdate:modelValue": ($event) => _ctx.form.name = $event,
          type: "text",
          class: "mt-1 block w-full",
          required: "",
          autofocus: "",
          autocomplete: "name"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_InputError, {
          class: "mt-2",
          message: _ctx.form.errors.name
        }, null, _parent2, _scopeId));
        _push2(`</div><div class="mt-4"${_scopeId}>`);
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
          autocomplete: "new-password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_InputError, {
          class: "mt-2",
          message: _ctx.form.errors.password
        }, null, _parent2, _scopeId));
        _push2(`</div><div class="mt-4"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_InputLabel, {
          for: "password_confirmation",
          value: "Confirm Password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_TextInput, {
          id: "password_confirmation",
          modelValue: _ctx.form.password_confirmation,
          "onUpdate:modelValue": ($event) => _ctx.form.password_confirmation = $event,
          type: "password",
          class: "mt-1 block w-full",
          required: "",
          autocomplete: "new-password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_InputError, {
          class: "mt-2",
          message: _ctx.form.errors.password_confirmation
        }, null, _parent2, _scopeId));
        _push2(`</div>`);
        if (_ctx.$page.props.jetstream.hasTermsAndPrivacyPolicyFeature) {
          _push2(`<div class="mt-4"${_scopeId}>`);
          _push2(ssrRenderComponent(_component_InputLabel, { for: "terms" }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<div class="flex items-center"${_scopeId2}>`);
                _push3(ssrRenderComponent(_component_Checkbox, {
                  id: "terms",
                  checked: _ctx.form.terms,
                  "onUpdate:checked": ($event) => _ctx.form.terms = $event,
                  name: "terms",
                  required: ""
                }, null, _parent3, _scopeId2));
                _push3(`<div class="ms-2"${_scopeId2}> I agree to the <a target="_blank"${ssrRenderAttr("href", _ctx.route("terms.show"))} class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"${_scopeId2}>Terms of Service</a> and <a target="_blank"${ssrRenderAttr("href", _ctx.route("policy.show"))} class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"${_scopeId2}>Privacy Policy</a></div></div>`);
                _push3(ssrRenderComponent(_component_InputError, {
                  class: "mt-2",
                  message: _ctx.form.errors.terms
                }, null, _parent3, _scopeId2));
              } else {
                return [
                  createVNode("div", { class: "flex items-center" }, [
                    createVNode(_component_Checkbox, {
                      id: "terms",
                      checked: _ctx.form.terms,
                      "onUpdate:checked": ($event) => _ctx.form.terms = $event,
                      name: "terms",
                      required: ""
                    }, null, 8, ["checked", "onUpdate:checked"]),
                    createVNode("div", { class: "ms-2" }, [
                      createTextVNode(" I agree to the "),
                      createVNode("a", {
                        target: "_blank",
                        href: _ctx.route("terms.show"),
                        class: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                      }, "Terms of Service", 8, ["href"]),
                      createTextVNode(" and "),
                      createVNode("a", {
                        target: "_blank",
                        href: _ctx.route("policy.show"),
                        class: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                      }, "Privacy Policy", 8, ["href"])
                    ])
                  ]),
                  createVNode(_component_InputError, {
                    class: "mt-2",
                    message: _ctx.form.errors.terms
                  }, null, 8, ["message"])
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="flex items-center justify-end mt-4"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, {
          href: _ctx.route("login"),
          class: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Already registered? `);
            } else {
              return [
                createTextVNode(" Already registered? ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_PrimaryButton, {
          class: ["ms-4", { "opacity-25": _ctx.form.processing }],
          disabled: _ctx.form.processing
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Register `);
            } else {
              return [
                createTextVNode(" Register ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div></form>`);
      } else {
        return [
          createVNode("form", {
            onSubmit: withModifiers(_ctx.register, ["prevent"])
          }, [
            createVNode("div", null, [
              createVNode(_component_InputLabel, {
                for: "name",
                value: "Name"
              }),
              createVNode(_component_TextInput, {
                id: "name",
                modelValue: _ctx.form.name,
                "onUpdate:modelValue": ($event) => _ctx.form.name = $event,
                type: "text",
                class: "mt-1 block w-full",
                required: "",
                autofocus: "",
                autocomplete: "name"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_InputError, {
                class: "mt-2",
                message: _ctx.form.errors.name
              }, null, 8, ["message"])
            ]),
            createVNode("div", { class: "mt-4" }, [
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
                autocomplete: "new-password"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_InputError, {
                class: "mt-2",
                message: _ctx.form.errors.password
              }, null, 8, ["message"])
            ]),
            createVNode("div", { class: "mt-4" }, [
              createVNode(_component_InputLabel, {
                for: "password_confirmation",
                value: "Confirm Password"
              }),
              createVNode(_component_TextInput, {
                id: "password_confirmation",
                modelValue: _ctx.form.password_confirmation,
                "onUpdate:modelValue": ($event) => _ctx.form.password_confirmation = $event,
                type: "password",
                class: "mt-1 block w-full",
                required: "",
                autocomplete: "new-password"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_InputError, {
                class: "mt-2",
                message: _ctx.form.errors.password_confirmation
              }, null, 8, ["message"])
            ]),
            _ctx.$page.props.jetstream.hasTermsAndPrivacyPolicyFeature ? (openBlock(), createBlock("div", {
              key: 0,
              class: "mt-4"
            }, [
              createVNode(_component_InputLabel, { for: "terms" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center" }, [
                    createVNode(_component_Checkbox, {
                      id: "terms",
                      checked: _ctx.form.terms,
                      "onUpdate:checked": ($event) => _ctx.form.terms = $event,
                      name: "terms",
                      required: ""
                    }, null, 8, ["checked", "onUpdate:checked"]),
                    createVNode("div", { class: "ms-2" }, [
                      createTextVNode(" I agree to the "),
                      createVNode("a", {
                        target: "_blank",
                        href: _ctx.route("terms.show"),
                        class: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                      }, "Terms of Service", 8, ["href"]),
                      createTextVNode(" and "),
                      createVNode("a", {
                        target: "_blank",
                        href: _ctx.route("policy.show"),
                        class: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                      }, "Privacy Policy", 8, ["href"])
                    ])
                  ]),
                  createVNode(_component_InputError, {
                    class: "mt-2",
                    message: _ctx.form.errors.terms
                  }, null, 8, ["message"])
                ]),
                _: 1
              })
            ])) : createCommentVNode("", true),
            createVNode("div", { class: "flex items-center justify-end mt-4" }, [
              createVNode(_component_Link, {
                href: _ctx.route("login"),
                class: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Already registered? ")
                ]),
                _: 1
              }, 8, ["href"]),
              createVNode(_component_PrimaryButton, {
                class: ["ms-4", { "opacity-25": _ctx.form.processing }],
                disabled: _ctx.form.processing
              }, {
                default: withCtx(() => [
                  createTextVNode(" Register ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Register = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Register as default
};
