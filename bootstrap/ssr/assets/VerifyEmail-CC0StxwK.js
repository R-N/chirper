var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as AuthenticationCard } from "./AuthenticationCard-CS2KeZEJ.js";
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BCaUMAMf.js";
import { _ as _sfc_main$2 } from "./PrimaryButton-CtpSN9QQ.js";
import { useForm, router, Link, Head } from "@inertiajs/vue3";
import { toNative, Vue, Prop, Component } from "vue-facing-decorator";
import { a as api } from "./axios-DQioN9B6.js";
import { resolveComponent, withCtx, createVNode, createTextVNode, openBlock, createBlock, createCommentVNode, withModifiers, useSSRContext } from "vue";
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
let VerifyEmailPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "status");
    __publicField(this, "form", useForm({
      //email: '',
    }));
  }
  get verificationLinkSent() {
    return this.status === "verification-link-sent";
  }
  async submit() {
    let res = await api.post(route("verification.send"), this.form);
    router.visit(res.data.redirect || "/login");
  }
};
__decorateClass([
  Prop(String)
], VerifyEmailPage.prototype, "status", 2);
VerifyEmailPage = __decorateClass([
  Component({
    components: {
      AuthenticationCard,
      AuthenticationCardLogo: _sfc_main$1,
      // InputError,
      // InputLabel,
      PrimaryButton: _sfc_main$2,
      // TextInput,
      Link,
      Head
    }
  })
], VerifyEmailPage);
const _sfc_main = toNative(VerifyEmailPage);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_AuthenticationCard = resolveComponent("AuthenticationCard");
  const _component_AuthenticationCardLogo = resolveComponent("AuthenticationCardLogo");
  const _component_PrimaryButton = resolveComponent("PrimaryButton");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Email Verification" }, null, _parent));
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
        _push2(`<div class="mb-4 text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn&#39;t receive the email, we will gladly send you another. </div>`);
        if (_ctx.verificationLinkSent) {
          _push2(`<div class="mb-4 font-medium text-sm text-green-600 dark:text-green-400"${_scopeId}> A new verification link has been sent to the email address you provided in your profile settings. </div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<form${_scopeId}><div class="mt-4 flex items-center justify-between"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_PrimaryButton, {
          class: { "opacity-25": _ctx.form.processing },
          disabled: _ctx.form.processing
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Resend Verification Email `);
            } else {
              return [
                createTextVNode(" Resend Verification Email ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<div${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, {
          href: _ctx.route("profile.show"),
          class: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Edit Profile`);
            } else {
              return [
                createTextVNode(" Edit Profile")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_Link, {
          href: _ctx.route("logout"),
          method: "post",
          as: "button",
          class: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 ms-2"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Log Out `);
            } else {
              return [
                createTextVNode(" Log Out ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div></div></form>`);
      } else {
        return [
          createVNode("div", { class: "mb-4 text-sm text-gray-600 dark:text-gray-400" }, " Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. "),
          _ctx.verificationLinkSent ? (openBlock(), createBlock("div", {
            key: 0,
            class: "mb-4 font-medium text-sm text-green-600 dark:text-green-400"
          }, " A new verification link has been sent to the email address you provided in your profile settings. ")) : createCommentVNode("", true),
          createVNode("form", {
            onSubmit: withModifiers(_ctx.submit, ["prevent"])
          }, [
            createVNode("div", { class: "mt-4 flex items-center justify-between" }, [
              createVNode(_component_PrimaryButton, {
                class: { "opacity-25": _ctx.form.processing },
                disabled: _ctx.form.processing
              }, {
                default: withCtx(() => [
                  createTextVNode(" Resend Verification Email ")
                ]),
                _: 1
              }, 8, ["class", "disabled"]),
              createVNode("div", null, [
                createVNode(_component_Link, {
                  href: _ctx.route("profile.show"),
                  class: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Edit Profile")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode(_component_Link, {
                  href: _ctx.route("logout"),
                  method: "post",
                  as: "button",
                  class: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 ms-2"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Log Out ")
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const VerifyEmail = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  VerifyEmail as default
};
