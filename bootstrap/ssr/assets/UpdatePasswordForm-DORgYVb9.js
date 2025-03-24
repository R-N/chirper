var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { _ as _sfc_main$1 } from "./ActionMessage-lseuyjgQ.js";
import { _ as _sfc_main$2 } from "./FormSection-D-jZqCN4.js";
import { _ as _sfc_main$3 } from "./InputError-BRdBLb-x.js";
import { _ as _sfc_main$4 } from "./InputLabel-Cnda-O0w.js";
import { _ as _sfc_main$5 } from "./PrimaryButton-CtpSN9QQ.js";
import { _ as _sfc_main$6 } from "./TextInput-2NFZntg2.js";
import { useForm, router } from "@inertiajs/vue3";
import { toNative, Vue, Ref, Component } from "vue-facing-decorator";
import { a as api } from "./axios-DQioN9B6.js";
import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./SectionTitle-4i2p8f-X.js";
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
let UpdatePasswordForm$1 = class UpdatePasswordForm extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "passwordInput");
    __publicField(this, "currentPasswordInput");
    __publicField(this, "form", useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    }));
  }
  async updatePassword() {
    var _a;
    let target = route("user-password.update");
    try {
      let res = await api.put(target, this.form);
      this.form.reset();
      router.visit(res.data.redirect || "/login");
    } catch (error) {
      if (((_a = error.response) == null ? void 0 : _a.status) === 422) {
        this.form.errors = error.response.data.errors;
      } else {
        console.error("Unexpected error:", error);
      }
      if (this.form.errors.password) {
        this.form.reset("password", "password_confirmation");
        this.passwordInput.focus();
      }
      if (this.form.errors.current_password) {
        this.form.reset("current_password");
        this.currentPasswordInput.focus();
      }
    }
  }
};
__decorateClass([
  Ref("passwordInput")
], UpdatePasswordForm$1.prototype, "passwordInput", 2);
__decorateClass([
  Ref("currentPasswordInput")
], UpdatePasswordForm$1.prototype, "currentPasswordInput", 2);
UpdatePasswordForm$1 = __decorateClass([
  Component({
    components: {
      ActionMessage: _sfc_main$1,
      FormSection: _sfc_main$2,
      InputError: _sfc_main$3,
      InputLabel: _sfc_main$4,
      PrimaryButton: _sfc_main$5,
      TextInput: _sfc_main$6
    }
  })
], UpdatePasswordForm$1);
const _sfc_main = toNative(UpdatePasswordForm$1);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_FormSection = resolveComponent("FormSection");
  const _component_InputLabel = resolveComponent("InputLabel");
  const _component_TextInput = resolveComponent("TextInput");
  const _component_InputError = resolveComponent("InputError");
  const _component_ActionMessage = resolveComponent("ActionMessage");
  const _component_PrimaryButton = resolveComponent("PrimaryButton");
  _push(ssrRenderComponent(_component_FormSection, mergeProps({ onSubmitted: _ctx.updatePassword }, _attrs), {
    title: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Update Password `);
      } else {
        return [
          createTextVNode(" Update Password ")
        ];
      }
    }),
    description: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Ensure your account is using a long, random password to stay secure. `);
      } else {
        return [
          createTextVNode(" Ensure your account is using a long, random password to stay secure. ")
        ];
      }
    }),
    form: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="col-span-6 sm:col-span-4"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_InputLabel, {
          for: "current_password",
          value: "Current Password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_TextInput, {
          id: "current_password",
          ref: "currentPasswordInput",
          modelValue: _ctx.form.current_password,
          "onUpdate:modelValue": ($event) => _ctx.form.current_password = $event,
          type: "password",
          class: "mt-1 block w-full",
          autocomplete: "current-password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_InputError, {
          message: _ctx.form.errors.current_password,
          class: "mt-2"
        }, null, _parent2, _scopeId));
        _push2(`</div><div class="col-span-6 sm:col-span-4"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_InputLabel, {
          for: "password",
          value: "New Password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_TextInput, {
          id: "password",
          ref: "passwordInput",
          modelValue: _ctx.form.password,
          "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
          type: "password",
          class: "mt-1 block w-full",
          autocomplete: "new-password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_InputError, {
          message: _ctx.form.errors.password,
          class: "mt-2"
        }, null, _parent2, _scopeId));
        _push2(`</div><div class="col-span-6 sm:col-span-4"${_scopeId}>`);
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
          autocomplete: "new-password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_InputError, {
          message: _ctx.form.errors.password_confirmation,
          class: "mt-2"
        }, null, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "col-span-6 sm:col-span-4" }, [
            createVNode(_component_InputLabel, {
              for: "current_password",
              value: "Current Password"
            }),
            createVNode(_component_TextInput, {
              id: "current_password",
              ref: "currentPasswordInput",
              modelValue: _ctx.form.current_password,
              "onUpdate:modelValue": ($event) => _ctx.form.current_password = $event,
              type: "password",
              class: "mt-1 block w-full",
              autocomplete: "current-password"
            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode(_component_InputError, {
              message: _ctx.form.errors.current_password,
              class: "mt-2"
            }, null, 8, ["message"])
          ]),
          createVNode("div", { class: "col-span-6 sm:col-span-4" }, [
            createVNode(_component_InputLabel, {
              for: "password",
              value: "New Password"
            }),
            createVNode(_component_TextInput, {
              id: "password",
              ref: "passwordInput",
              modelValue: _ctx.form.password,
              "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
              type: "password",
              class: "mt-1 block w-full",
              autocomplete: "new-password"
            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode(_component_InputError, {
              message: _ctx.form.errors.password,
              class: "mt-2"
            }, null, 8, ["message"])
          ]),
          createVNode("div", { class: "col-span-6 sm:col-span-4" }, [
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
              autocomplete: "new-password"
            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode(_component_InputError, {
              message: _ctx.form.errors.password_confirmation,
              class: "mt-2"
            }, null, 8, ["message"])
          ])
        ];
      }
    }),
    actions: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_ActionMessage, {
          on: _ctx.form.recentlySuccessful,
          class: "me-3"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Saved. `);
            } else {
              return [
                createTextVNode(" Saved. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_PrimaryButton, {
          class: { "opacity-25": _ctx.form.processing },
          disabled: _ctx.form.processing
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Save `);
            } else {
              return [
                createTextVNode(" Save ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_ActionMessage, {
            on: _ctx.form.recentlySuccessful,
            class: "me-3"
          }, {
            default: withCtx(() => [
              createTextVNode(" Saved. ")
            ]),
            _: 1
          }, 8, ["on"]),
          createVNode(_component_PrimaryButton, {
            class: { "opacity-25": _ctx.form.processing },
            disabled: _ctx.form.processing
          }, {
            default: withCtx(() => [
              createTextVNode(" Save ")
            ]),
            _: 1
          }, 8, ["class", "disabled"])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdatePasswordForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const UpdatePasswordForm2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  UpdatePasswordForm2 as default
};
