var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as AppLayout } from "./AppLayout-4TteSdBe.js";
import DeleteUserForm from "./DeleteUserForm-BY9UM1Ho.js";
import LogoutOtherBrowserSessionsForm from "./LogoutOtherBrowserSessionsForm-DECnZ9nS.js";
import { S as SectionBorder } from "./SectionBorder-DTXjL6cy.js";
import TwoFactorAuthenticationForm from "./TwoFactorAuthenticationForm-2vMpMfoH.js";
import UpdatePasswordForm from "./UpdatePasswordForm-DORgYVb9.js";
import UpdateProfileInformationForm from "./UpdateProfileInformationForm-Bwbsa8vG.js";
import { toNative, Vue, Prop, Component } from "vue-facing-decorator";
import { resolveComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, createCommentVNode, Fragment, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
import "./DropdownLink-1M0-kqPy.js";
import "./ResponsiveNavLink-DiZnMeqJ.js";
import "./auth-DrKxFB6F.js";
import "pinia";
import "./axios-DQioN9B6.js";
import "axios";
import "js-cookie";
import "./DialogModal-Dl-MOD2C.js";
import "./SectionTitle-4i2p8f-X.js";
import "./DangerButton-BsxM2vkF.js";
import "./InputError-BRdBLb-x.js";
import "./SecondaryButton-BgIg9sGF.js";
import "./TextInput-2NFZntg2.js";
import "./ActionMessage-lseuyjgQ.js";
import "./PrimaryButton-CtpSN9QQ.js";
import "./InputLabel-Cnda-O0w.js";
import "./FormSection-D-jZqCN4.js";
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
let ProfileShowPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "confirmsTwoFactorAuthentication");
    __publicField(this, "sessions");
  }
};
__decorateClass([
  Prop(Boolean)
], ProfileShowPage.prototype, "confirmsTwoFactorAuthentication", 2);
__decorateClass([
  Prop(Array)
], ProfileShowPage.prototype, "sessions", 2);
ProfileShowPage = __decorateClass([
  Component({
    components: {
      AppLayout,
      DeleteUserForm,
      LogoutOtherBrowserSessionsForm,
      SectionBorder,
      TwoFactorAuthenticationForm,
      UpdatePasswordForm,
      UpdateProfileInformationForm
    }
  })
], ProfileShowPage);
const _sfc_main = toNative(ProfileShowPage);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AppLayout = resolveComponent("AppLayout");
  const _component_UpdateProfileInformationForm = resolveComponent("UpdateProfileInformationForm");
  const _component_SectionBorder = resolveComponent("SectionBorder");
  const _component_UpdatePasswordForm = resolveComponent("UpdatePasswordForm");
  const _component_TwoFactorAuthenticationForm = resolveComponent("TwoFactorAuthenticationForm");
  const _component_LogoutOtherBrowserSessionsForm = resolveComponent("LogoutOtherBrowserSessionsForm");
  const _component_DeleteUserForm = resolveComponent("DeleteUserForm");
  _push(ssrRenderComponent(_component_AppLayout, mergeProps({ title: "Profile" }, _attrs), {
    header: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"${_scopeId}> Profile </h2>`);
      } else {
        return [
          createVNode("h2", { class: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight" }, " Profile ")
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div${_scopeId}><div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"${_scopeId}>`);
        if (_ctx.$page.props.jetstream.canUpdateProfileInformation) {
          _push2(`<div${_scopeId}>`);
          _push2(ssrRenderComponent(_component_UpdateProfileInformationForm, {
            user: _ctx.$page.props.auth.user
          }, null, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_SectionBorder, null, null, _parent2, _scopeId));
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
        if (_ctx.$page.props.jetstream.canUpdatePassword) {
          _push2(`<div${_scopeId}>`);
          _push2(ssrRenderComponent(_component_UpdatePasswordForm, { class: "mt-10 sm:mt-0" }, null, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_SectionBorder, null, null, _parent2, _scopeId));
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
        if (_ctx.$page.props.jetstream.canManageTwoFactorAuthentication) {
          _push2(`<div${_scopeId}>`);
          _push2(ssrRenderComponent(_component_TwoFactorAuthenticationForm, {
            "requires-confirmation": _ctx.confirmsTwoFactorAuthentication,
            class: "mt-10 sm:mt-0"
          }, null, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_SectionBorder, null, null, _parent2, _scopeId));
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(ssrRenderComponent(_component_LogoutOtherBrowserSessionsForm, {
          sessions: _ctx.sessions,
          class: "mt-10 sm:mt-0"
        }, null, _parent2, _scopeId));
        if (_ctx.$page.props.jetstream.hasAccountDeletionFeatures) {
          _push2(`<!--[-->`);
          _push2(ssrRenderComponent(_component_SectionBorder, null, null, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_DeleteUserForm, { class: "mt-10 sm:mt-0" }, null, _parent2, _scopeId));
          _push2(`<!--]-->`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div></div>`);
      } else {
        return [
          createVNode("div", null, [
            createVNode("div", { class: "max-w-7xl mx-auto py-10 sm:px-6 lg:px-8" }, [
              _ctx.$page.props.jetstream.canUpdateProfileInformation ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode(_component_UpdateProfileInformationForm, {
                  user: _ctx.$page.props.auth.user
                }, null, 8, ["user"]),
                createVNode(_component_SectionBorder)
              ])) : createCommentVNode("", true),
              _ctx.$page.props.jetstream.canUpdatePassword ? (openBlock(), createBlock("div", { key: 1 }, [
                createVNode(_component_UpdatePasswordForm, { class: "mt-10 sm:mt-0" }),
                createVNode(_component_SectionBorder)
              ])) : createCommentVNode("", true),
              _ctx.$page.props.jetstream.canManageTwoFactorAuthentication ? (openBlock(), createBlock("div", { key: 2 }, [
                createVNode(_component_TwoFactorAuthenticationForm, {
                  "requires-confirmation": _ctx.confirmsTwoFactorAuthentication,
                  class: "mt-10 sm:mt-0"
                }, null, 8, ["requires-confirmation"]),
                createVNode(_component_SectionBorder)
              ])) : createCommentVNode("", true),
              createVNode(_component_LogoutOtherBrowserSessionsForm, {
                sessions: _ctx.sessions,
                class: "mt-10 sm:mt-0"
              }, null, 8, ["sessions"]),
              _ctx.$page.props.jetstream.hasAccountDeletionFeatures ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                createVNode(_component_SectionBorder),
                createVNode(_component_DeleteUserForm, { class: "mt-10 sm:mt-0" })
              ], 64)) : createCommentVNode("", true)
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Show as default
};
