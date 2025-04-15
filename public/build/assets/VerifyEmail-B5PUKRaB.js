var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { t as toNative, V as Vue, C, aA as Wr, a as decorator, b as Component, aB as me, ay as Pe, _ as _export_sfc, r as resolveComponent, c as createBlock, w as withCtx, o as openBlock, e as createVNode, h as createTextVNode, N as createCommentVNode, i as withModifiers, g as createBaseVNode } from "./app-CPu3B8nk.js";
import { a as authService } from "./Auth.vue_vue_type_script_lang-DBB4XVKb.js";
import { A as AuthLayout } from "./Auth-DL9Yr347.js";
import { G as GuestLayout } from "./GuestLayout-BN0Hy48d.js";
import { a as VCard, c as VCardTitle, d as VCardText, e as VCardActions } from "./GuestLayout.vue_vue_type_script_lang-B04FhGQk.js";
import { V as VBtn } from "./forwardRefs-CUUEJ2GB.js";
import { V as VRow, a as VCol } from "./VRow-B-PaLeOj.js";
import "./AuthenticationCardLogo-BVaAeieh.js";
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
let VerifyEmailPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "status");
    __publicField(this, "form", C({
      //email: '',
    }));
  }
  get verificationLinkSent() {
    return this.status === "verification-link-sent";
  }
  async submit() {
    let res = await authService.verifyEmail(this.form);
    Wr.visit(res.redirect || "/login");
  }
};
__decorateClass([
  decorator({ type: String })
], VerifyEmailPage.prototype, "status", 2);
VerifyEmailPage = __decorateClass([
  Component({
    components: {
      AuthLayout,
      GuestLayout,
      Head: me,
      Link: Pe,
      VCard,
      VCardTitle,
      VCardText,
      VCardActions,
      VBtn,
      VRow,
      VCol
    }
  })
], VerifyEmailPage);
const _sfc_main = toNative(VerifyEmailPage);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AuthLayout = resolveComponent("AuthLayout");
  const _component_GuestLayout = resolveComponent("GuestLayout");
  return openBlock(), createBlock(_component_GuestLayout, { title: "Email Verification" }, {
    default: withCtx(() => [
      createVNode(_component_AuthLayout, null, {
        default: withCtx(() => [
          createVNode(VCard, {
            class: "pa-6",
            elevation: "4"
          }, {
            default: withCtx(() => [
              createVNode(VCardText, { class: "text-secondary text-sm" }, {
                default: withCtx(() => _cache[0] || (_cache[0] = [
                  createTextVNode(" Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. ")
                ])),
                _: 1
              }),
              _ctx.verificationLinkSent ? (openBlock(), createBlock(VCardText, {
                key: 0,
                class: "font-medium text-green"
              }, {
                default: withCtx(() => _cache[1] || (_cache[1] = [
                  createTextVNode(" A new verification link has been sent to the email address you provided in your profile settings. ")
                ])),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(VCardActions, { class: "mt-4 d-flex justify-space-between" }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    color: "primary",
                    loading: _ctx.form.processing,
                    onClick: withModifiers(_ctx.submit, ["prevent"])
                  }, {
                    default: withCtx(() => _cache[2] || (_cache[2] = [
                      createTextVNode(" Resend Verification Email ")
                    ])),
                    _: 1
                  }, 8, ["loading", "onClick"]),
                  createBaseVNode("div", null, [
                    createVNode(VBtn, {
                      variant: "text",
                      href: _ctx.route("profile.show")
                    }, {
                      default: withCtx(() => _cache[3] || (_cache[3] = [
                        createTextVNode(" Edit Profile ")
                      ])),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(VBtn, {
                      variant: "text",
                      href: _ctx.route("logout"),
                      method: "post",
                      as: "button",
                      class: "ms-2"
                    }, {
                      default: withCtx(() => _cache[4] || (_cache[4] = [
                        createTextVNode(" Log Out ")
                      ])),
                      _: 1
                    }, 8, ["href"])
                  ])
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
const VerifyEmail = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  VerifyEmail as default
};
//# sourceMappingURL=VerifyEmail-B5PUKRaB.js.map
