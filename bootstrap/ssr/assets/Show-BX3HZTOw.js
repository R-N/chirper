var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as AppLayout } from "./AppLayout-DTon9FDr.js";
import DeleteUserForm from "./DeleteUserForm-B9j6STRK.js";
import LogoutOtherBrowserSessionsForm from "./LogoutOtherBrowserSessionsForm-CqrJCEuI.js";
import { Prop, Component, toNative, Vue } from "vue-facing-decorator";
import { VDivider, VExpandTransition } from "vuetify/components";
import { useSSRContext, mergeProps, resolveComponent, withCtx, createVNode, openBlock, createBlock, createCommentVNode, Fragment } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./axios-D4gWzKUO.js";
import { VDivider as VDivider$1 } from "vuetify/lib/components/VDivider/index.mjs";
import TwoFactorAuthenticationForm from "./TwoFactorAuthenticationForm-BH6EiTEX.js";
import UpdatePasswordForm from "./UpdatePasswordForm-C1e5S4pe.js";
import UpdateProfileInformationForm from "./UpdateProfileInformationForm-IAbSDCWf.js";
import "@inertiajs/vue3";
import "./auth-CGQkd51U.js";
import "./auth-DrKxFB6F.js";
import "pinia";
import "vuetify/lib/components/VApp/index.mjs";
import "vuetify/lib/components/VAppBar/index.mjs";
import "vuetify/lib/components/VAvatar/index.mjs";
import "vuetify/lib/components/VBtn/index.mjs";
import "vuetify/lib/components/VGrid/index.mjs";
import "vuetify/lib/components/VIcon/index.mjs";
import "vuetify/lib/components/VImg/index.mjs";
import "vuetify/lib/components/VList/index.mjs";
import "vuetify/lib/components/VMain/index.mjs";
import "vuetify/lib/components/VMenu/index.mjs";
import "vuetify/lib/components/VNavigationDrawer/index.mjs";
import "vuetify/lib/components/VToolbar/index.mjs";
import "./ActionSection-DEAOgt0M.js";
import "./SectionTitle-KsAagkYm.js";
import "vuetify/lib/components/VCard/index.mjs";
import "./InputError-BGOWAPan.js";
import "vuetify/lib/components/VAlert/index.mjs";
import "vuetify/lib/components/transitions/index.mjs";
import "./profile-BbLc0nWY.js";
import "vuetify/lib/components/VDialog/index.mjs";
import "vuetify/lib/components/VTextField/index.mjs";
import "./ActionMessage-DD3vNYCh.js";
import "axios";
import "js-cookie";
import "./FormSection-ChOV8bZ-.js";
import "vuetify/lib/components/VFileInput/index.mjs";
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let SectionBorder$1 = class SectionBorder extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "on");
  }
};
__decorateClass$1([
  Prop({ type: Boolean, required: true })
], SectionBorder$1.prototype, "on", 2);
SectionBorder$1 = __decorateClass$1([
  Component({
    components: {
      VDivider,
      VExpandTransition
    }
  })
], SectionBorder$1);
const _sfc_main$1 = toNative(SectionBorder$1);
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-none d-sm-block" }, _attrs))}><div class="py-8">`);
  _push(ssrRenderComponent(VDivider$1, null, null, _parent));
  _push(`</div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SectionBorder.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SectionBorder2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
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
      SectionBorder: SectionBorder2,
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
