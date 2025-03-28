var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BCaUMAMf.js";
import { I as InputError } from "./InputError-BNQz4Gj5.js";
import { useForm, router, Head } from "@inertiajs/vue3";
import { VCard, VCardText, VCardTitle, VTextField, VBtn } from "vuetify/components";
import { toNative, Vue, Component } from "vue-facing-decorator";
import { a as api, _ as _export_sfc } from "./axios-l-eSoL-p.js";
import { resolveComponent, withCtx, createVNode, createTextVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { VBtn as VBtn$1 } from "vuetify/lib/components/VBtn/index.mjs";
import { VCard as VCard$1, VCardTitle as VCardTitle$1, VCardText as VCardText$1 } from "vuetify/lib/components/VCard/index.mjs";
import { VTextField as VTextField$1 } from "vuetify/lib/components/VTextField/index.mjs";
import "vuetify/lib/components/VAlert/index.mjs";
import "vuetify/lib/components/transitions/index.mjs";
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
      AuthenticationCardLogo: _sfc_main$1,
      Head,
      VCard,
      VCardText,
      VCardTitle,
      VTextField,
      VBtn,
      InputError
    }
  })
], ConfirmPasswordPage);
const _sfc_main = toNative(ConfirmPasswordPage);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_AuthenticationCardLogo = resolveComponent("AuthenticationCardLogo");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Secure Area" }, null, _parent));
  _push(`<div class="d-flex justify-center align-center min-h-screen">`);
  _push(ssrRenderComponent(VCard$1, {
    elevation: "4",
    class: "pa-6",
    "max-width": "400"
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
              _push3(`<p class="mb-4 text-grey-darken-1"${_scopeId2}> This is a secure area of the application. Please confirm your password before continuing. </p><form${_scopeId2}>`);
              _push3(ssrRenderComponent(VTextField$1, {
                id: "password",
                ref: "passwordInput",
                modelValue: _ctx.form.password,
                "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                label: "Password",
                type: "password",
                variant: "outlined",
                required: "",
                autocomplete: "current-password",
                "error-messages": _ctx.form.errors.password
              }, null, _parent3, _scopeId2));
              _push3(`<div class="d-flex justify-end mt-4"${_scopeId2}>`);
              _push3(ssrRenderComponent(VBtn$1, {
                color: "primary",
                variant: "elevated",
                type: "submit",
                loading: _ctx.form.processing
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Confirm `);
                  } else {
                    return [
                      createTextVNode(" Confirm ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</div></form>`);
            } else {
              return [
                createVNode("p", { class: "mb-4 text-grey-darken-1" }, " This is a secure area of the application. Please confirm your password before continuing. "),
                createVNode("form", {
                  onSubmit: withModifiers(_ctx.submit, ["prevent"])
                }, [
                  createVNode(VTextField$1, {
                    id: "password",
                    ref: "passwordInput",
                    modelValue: _ctx.form.password,
                    "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                    label: "Password",
                    type: "password",
                    variant: "outlined",
                    required: "",
                    autocomplete: "current-password",
                    "error-messages": _ctx.form.errors.password
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                  createVNode("div", { class: "d-flex justify-end mt-4" }, [
                    createVNode(VBtn$1, {
                      color: "primary",
                      variant: "elevated",
                      type: "submit",
                      loading: _ctx.form.processing
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Confirm ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ])
                ], 40, ["onSubmit"])
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
              createVNode("p", { class: "mb-4 text-grey-darken-1" }, " This is a secure area of the application. Please confirm your password before continuing. "),
              createVNode("form", {
                onSubmit: withModifiers(_ctx.submit, ["prevent"])
              }, [
                createVNode(VTextField$1, {
                  id: "password",
                  ref: "passwordInput",
                  modelValue: _ctx.form.password,
                  "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                  label: "Password",
                  type: "password",
                  variant: "outlined",
                  required: "",
                  autocomplete: "current-password",
                  "error-messages": _ctx.form.errors.password
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                createVNode("div", { class: "d-flex justify-end mt-4" }, [
                  createVNode(VBtn$1, {
                    color: "primary",
                    variant: "elevated",
                    type: "submit",
                    loading: _ctx.form.processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Confirm ")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ])
              ], 40, ["onSubmit"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><!--]-->`);
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
