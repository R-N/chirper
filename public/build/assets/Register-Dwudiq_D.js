var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { t as toNative, V as Vue, C, aH as Wr, b as Component, Q as Pe, _ as _export_sfc, r as resolveComponent, c as createBlock, w as withCtx, o as openBlock, e as createVNode, h as createTextVNode, O as createCommentVNode } from "./app-BV4qnAJ0.js";
import { I as InputError } from "./InputError-CxVZbwKm.js";
import { a as authService } from "./Auth.vue_vue_type_script_lang-BB9WK6Yd.js";
import { A as AuthLayout } from "./Auth-DcA7pqAD.js";
import { G as GuestLayout } from "./GuestLayout-BRSQR84D.js";
import { V as VTextField } from "./VTextField-DCXUA7Y2.js";
import { a as VCheckbox } from "./VCheckbox-DbAD9kDN.js";
import { V as VBtn, N as VImg } from "./forwardRefs-DKU3reEu.js";
import { a as VCard, d as VCardTitle, b as VCardText, c as VCardActions, V as VContainer } from "./GuestLayout.vue_vue_type_script_lang-zdB9XH-z.js";
import { V as VRow, a as VCol } from "./VRow-CmhFhHM-.js";
import "./AuthenticationCardLogo-rBZHVFWH.js";
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
    __publicField(this, "form", C({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      terms: false
    }));
  }
  async register() {
    let res = await authService.register(this.form);
    this.form.reset("password", "password_confirmation");
    Wr.visit(res.redirect || "/dashboard");
  }
};
RegisterPage = __decorateClass([
  Component({
    components: {
      AuthLayout,
      GuestLayout,
      Link: Pe,
      VTextField,
      VCheckbox,
      VBtn,
      VCard,
      VCardTitle,
      VCardText,
      VCardActions,
      VContainer,
      VRow,
      VCol,
      VImg,
      InputError
    }
  })
], RegisterPage);
const _sfc_main = toNative(RegisterPage);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_InputError = resolveComponent("InputError");
  const _component_Link = resolveComponent("Link");
  const _component_AuthLayout = resolveComponent("AuthLayout");
  const _component_GuestLayout = resolveComponent("GuestLayout");
  return openBlock(), createBlock(_component_GuestLayout, { title: "Register" }, {
    default: withCtx(() => [
      createVNode(_component_AuthLayout, null, {
        default: withCtx(() => [
          createVNode(VCard, { class: "d-flex flex-column pa-6" }, {
            default: withCtx(() => [
              createVNode(VCardTitle, null, {
                default: withCtx(() => _cache[5] || (_cache[5] = [
                  createTextVNode(" Register ")
                ])),
                _: 1
              }),
              createVNode(VCardText, { class: "d-flex flex-column pa-0 ga-2" }, {
                default: withCtx(() => [
                  createVNode(VTextField, {
                    modelValue: _ctx.form.name,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.form.name = $event),
                    label: "Name",
                    type: "text",
                    name: "name",
                    autocomplete: "name",
                    required: "",
                    autofocus: ""
                  }, null, 8, ["modelValue"]),
                  createVNode(_component_InputError, {
                    class: "mt-2",
                    message: _ctx.form.errors.name
                  }, null, 8, ["message"]),
                  createVNode(VTextField, {
                    modelValue: _ctx.form.email,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.form.email = $event),
                    label: "Email",
                    type: "email",
                    name: "email",
                    autocomplete: "email",
                    required: ""
                  }, null, 8, ["modelValue"]),
                  createVNode(_component_InputError, {
                    class: "mt-2",
                    message: _ctx.form.errors.email
                  }, null, 8, ["message"]),
                  createVNode(VTextField, {
                    modelValue: _ctx.form.password,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.form.password = $event),
                    label: "Password",
                    type: "password",
                    name: "password",
                    autocomplete: "new-password",
                    required: ""
                  }, null, 8, ["modelValue"]),
                  createVNode(_component_InputError, {
                    class: "mt-2",
                    message: _ctx.form.errors.password
                  }, null, 8, ["message"]),
                  createVNode(VTextField, {
                    modelValue: _ctx.form.password_confirmation,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.form.password_confirmation = $event),
                    label: "Confirm Password",
                    type: "password",
                    required: ""
                  }, null, 8, ["modelValue"]),
                  createVNode(_component_InputError, {
                    class: "mt-2",
                    message: _ctx.form.errors.password_confirmation
                  }, null, 8, ["message"]),
                  _ctx.$page.props.jetstream.hasTermsAndPrivacyPolicyFeature ? (openBlock(), createBlock(VCheckbox, {
                    key: 0,
                    modelValue: _ctx.form.terms,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.form.terms = $event)
                  }, {
                    label: withCtx(() => [
                      _cache[8] || (_cache[8] = createTextVNode(" I agree to the ")),
                      createVNode(_component_Link, {
                        target: "_blank",
                        href: _ctx.route("terms.show"),
                        class: "text-primary"
                      }, {
                        default: withCtx(() => _cache[6] || (_cache[6] = [
                          createTextVNode("Terms of Service")
                        ])),
                        _: 1
                      }, 8, ["href"]),
                      _cache[9] || (_cache[9] = createTextVNode(" and ")),
                      createVNode(_component_Link, {
                        target: "_blank",
                        href: _ctx.route("policy.show"),
                        class: "text-primary"
                      }, {
                        default: withCtx(() => _cache[7] || (_cache[7] = [
                          createTextVNode("Privacy Policy")
                        ])),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    _: 1
                  }, 8, ["modelValue"])) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(VCardActions, { class: "d-flex justify-space-between" }, {
                default: withCtx(() => [
                  createVNode(_component_Link, {
                    href: _ctx.route("login"),
                    class: "text-sm"
                  }, {
                    default: withCtx(() => _cache[10] || (_cache[10] = [
                      createTextVNode("Already registered?")
                    ])),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(VBtn, {
                    loading: _ctx.form.processing,
                    onClick: _ctx.register,
                    color: "primary",
                    variant: "elevated"
                  }, {
                    default: withCtx(() => _cache[11] || (_cache[11] = [
                      createTextVNode("Register")
                    ])),
                    _: 1
                  }, 8, ["loading", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const Register = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Register as default
};
//# sourceMappingURL=Register-Dwudiq_D.js.map
