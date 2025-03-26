var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BCaUMAMf.js";
import { I as InputError } from "./InputError-BIJeS7qt.js";
import { useForm, router, Head } from "@inertiajs/vue3";
import { VCard, VCardTitle, VCardText, VCardActions, VTextField, VBtn } from "vuetify/components";
import { toNative, Vue, Prop, Component } from "vue-facing-decorator";
import { a as api } from "./axios-DQioN9B6.js";
import { resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { VBtn as VBtn$1 } from "vuetify/lib/components/VBtn/index.mjs";
import { VCard as VCard$1, VCardTitle as VCardTitle$1, VCardText as VCardText$1, VCardActions as VCardActions$1 } from "vuetify/lib/components/VCard/index.mjs";
import { VTextField as VTextField$1 } from "vuetify/lib/components/VTextField/index.mjs";
import "vuetify/lib/components/VAlert/index.mjs";
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
let ResetPasswordPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "email");
    __publicField(this, "token");
    __publicField(this, "form", useForm({
      token: "",
      email: "",
      password: "",
      password_confirmation: ""
    }));
  }
  mounted() {
    this.form.token = this.token;
    this.form.email = this.email;
  }
  async submit() {
    let target = route("password.update");
    let res = await api.post(target, this.form);
    this.form.reset("password", "password_confirmation");
    router.visit(res.data.redirect || "/login");
  }
};
__decorateClass([
  Prop(String)
], ResetPasswordPage.prototype, "email", 2);
__decorateClass([
  Prop(String)
], ResetPasswordPage.prototype, "token", 2);
ResetPasswordPage = __decorateClass([
  Component({
    components: {
      AuthenticationCardLogo: _sfc_main$1,
      InputError,
      Head,
      VCard,
      VCardTitle,
      VCardText,
      VCardActions,
      VTextField,
      VBtn
    }
  })
], ResetPasswordPage);
const _sfc_main = toNative(ResetPasswordPage);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_AuthenticationCardLogo = resolveComponent("AuthenticationCardLogo");
  const _component_InputError = resolveComponent("InputError");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Reset Password" }, null, _parent));
  _push(ssrRenderComponent(VCard$1, {
    class: "mx-auto my-10",
    "max-width": "400",
    elevation: "10"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCardTitle$1, { class: "text-center" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_AuthenticationCardLogo, null, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_AuthenticationCardLogo)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VCardText$1, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VTextField$1, {
                id: "email",
                modelValue: _ctx.form.email,
                "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                label: "Email",
                type: "email",
                required: "",
                autofocus: "",
                autocomplete: "username"
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_InputError, {
                message: _ctx.form.errors.email,
                class: "mt-2"
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField$1, {
                id: "password",
                modelValue: _ctx.form.password,
                "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                label: "Password",
                type: "password",
                required: "",
                autocomplete: "new-password",
                class: "mt-4"
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_InputError, {
                message: _ctx.form.errors.password,
                class: "mt-2"
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField$1, {
                id: "password_confirmation",
                modelValue: _ctx.form.password_confirmation,
                "onUpdate:modelValue": ($event) => _ctx.form.password_confirmation = $event,
                label: "Confirm Password",
                type: "password",
                required: "",
                autocomplete: "new-password",
                class: "mt-4"
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_InputError, {
                message: _ctx.form.errors.password_confirmation,
                class: "mt-2"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VTextField$1, {
                  id: "email",
                  modelValue: _ctx.form.email,
                  "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                  label: "Email",
                  type: "email",
                  required: "",
                  autofocus: "",
                  autocomplete: "username"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_InputError, {
                  message: _ctx.form.errors.email,
                  class: "mt-2"
                }, null, 8, ["message"]),
                createVNode(VTextField$1, {
                  id: "password",
                  modelValue: _ctx.form.password,
                  "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                  label: "Password",
                  type: "password",
                  required: "",
                  autocomplete: "new-password",
                  class: "mt-4"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_InputError, {
                  message: _ctx.form.errors.password,
                  class: "mt-2"
                }, null, 8, ["message"]),
                createVNode(VTextField$1, {
                  id: "password_confirmation",
                  modelValue: _ctx.form.password_confirmation,
                  "onUpdate:modelValue": ($event) => _ctx.form.password_confirmation = $event,
                  label: "Confirm Password",
                  type: "password",
                  required: "",
                  autocomplete: "new-password",
                  class: "mt-4"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_InputError, {
                  message: _ctx.form.errors.password_confirmation,
                  class: "mt-2"
                }, null, 8, ["message"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VCardActions$1, { class: "justify-end" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VBtn$1, {
                color: "primary",
                variant: "elevated",
                loading: _ctx.form.processing,
                onClick: _ctx.submit
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Reset Password `);
                  } else {
                    return [
                      createTextVNode(" Reset Password ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VBtn$1, {
                  color: "primary",
                  variant: "elevated",
                  loading: _ctx.form.processing,
                  onClick: _ctx.submit
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Reset Password ")
                  ]),
                  _: 1
                }, 8, ["loading", "onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VCardTitle$1, { class: "text-center" }, {
            default: withCtx(() => [
              createVNode(_component_AuthenticationCardLogo)
            ]),
            _: 1
          }),
          createVNode(VCardText$1, null, {
            default: withCtx(() => [
              createVNode(VTextField$1, {
                id: "email",
                modelValue: _ctx.form.email,
                "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                label: "Email",
                type: "email",
                required: "",
                autofocus: "",
                autocomplete: "username"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_InputError, {
                message: _ctx.form.errors.email,
                class: "mt-2"
              }, null, 8, ["message"]),
              createVNode(VTextField$1, {
                id: "password",
                modelValue: _ctx.form.password,
                "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                label: "Password",
                type: "password",
                required: "",
                autocomplete: "new-password",
                class: "mt-4"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_InputError, {
                message: _ctx.form.errors.password,
                class: "mt-2"
              }, null, 8, ["message"]),
              createVNode(VTextField$1, {
                id: "password_confirmation",
                modelValue: _ctx.form.password_confirmation,
                "onUpdate:modelValue": ($event) => _ctx.form.password_confirmation = $event,
                label: "Confirm Password",
                type: "password",
                required: "",
                autocomplete: "new-password",
                class: "mt-4"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_InputError, {
                message: _ctx.form.errors.password_confirmation,
                class: "mt-2"
              }, null, 8, ["message"])
            ]),
            _: 1
          }),
          createVNode(VCardActions$1, { class: "justify-end" }, {
            default: withCtx(() => [
              createVNode(VBtn$1, {
                color: "primary",
                variant: "elevated",
                loading: _ctx.form.processing,
                onClick: _ctx.submit
              }, {
                default: withCtx(() => [
                  createTextVNode(" Reset Password ")
                ]),
                _: 1
              }, 8, ["loading", "onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ResetPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ResetPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  ResetPassword as default
};
