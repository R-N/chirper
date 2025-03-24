var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BuCdjuLE.js";
import DeleteUserForm from "./DeleteUserForm-BY9UM1Ho.js";
import UpdatePasswordForm from "./UpdatePasswordForm-DORgYVb9.js";
import UpdateProfileInformationForm from "./UpdateProfileInformationForm-Bwbsa8vG.js";
import { router, Head } from "@inertiajs/vue3";
import { toNative, Vue, Prop, Component } from "vue-facing-decorator";
import { a as api } from "./axios-DQioN9B6.js";
import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-B2173abF.js";
import "./DropdownLink-1M0-kqPy.js";
import "./ResponsiveNavLink-DiZnMeqJ.js";
import "./auth-DrKxFB6F.js";
import "pinia";
import "./DialogModal-Dl-MOD2C.js";
import "./SectionTitle-4i2p8f-X.js";
import "./DangerButton-BsxM2vkF.js";
import "./InputError-BRdBLb-x.js";
import "./SecondaryButton-BgIg9sGF.js";
import "./TextInput-2NFZntg2.js";
import "./ActionMessage-lseuyjgQ.js";
import "./FormSection-D-jZqCN4.js";
import "./InputLabel-Cnda-O0w.js";
import "./PrimaryButton-CtpSN9QQ.js";
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
let ProfileEditPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "mustVerifyEmail");
    __publicField(this, "status");
  }
  async submit() {
    let res = await api.post(route("verification.send"), this.form);
    router.visit(res.data.redirect || "/login");
  }
};
__decorateClass([
  Prop(Boolean)
], ProfileEditPage.prototype, "mustVerifyEmail", 2);
__decorateClass([
  Prop(String)
], ProfileEditPage.prototype, "status", 2);
ProfileEditPage = __decorateClass([
  Component({
    components: {
      AuthenticatedLayout,
      DeleteUserForm,
      UpdatePasswordForm,
      UpdateProfileInformationForm,
      Head
    }
  })
], ProfileEditPage);
const _sfc_main = toNative(ProfileEditPage);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_AuthenticatedLayout = resolveComponent("AuthenticatedLayout");
  const _component_UpdateProfileInformationForm = resolveComponent("UpdateProfileInformationForm");
  const _component_UpdatePasswordForm = resolveComponent("UpdatePasswordForm");
  const _component_DeleteUserForm = resolveComponent("DeleteUserForm");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Profile" }, null, _parent));
  _push(ssrRenderComponent(_component_AuthenticatedLayout, null, {
    header: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h2 class="text-xl font-semibold leading-tight text-gray-800"${_scopeId}> Profile </h2>`);
      } else {
        return [
          createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800" }, " Profile ")
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8"${_scopeId}><div class="bg-white p-4 shadow sm:rounded-lg sm:p-8"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_UpdateProfileInformationForm, {
          "must-verify-email": _ctx.mustVerifyEmail,
          status: _ctx.status,
          class: "max-w-xl"
        }, null, _parent2, _scopeId));
        _push2(`</div><div class="bg-white p-4 shadow sm:rounded-lg sm:p-8"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_UpdatePasswordForm, { class: "max-w-xl" }, null, _parent2, _scopeId));
        _push2(`</div><div class="bg-white p-4 shadow sm:rounded-lg sm:p-8"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_DeleteUserForm, { class: "max-w-xl" }, null, _parent2, _scopeId));
        _push2(`</div></div></div>`);
      } else {
        return [
          createVNode("div", { class: "py-12" }, [
            createVNode("div", { class: "mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8" }, [
              createVNode("div", { class: "bg-white p-4 shadow sm:rounded-lg sm:p-8" }, [
                createVNode(_component_UpdateProfileInformationForm, {
                  "must-verify-email": _ctx.mustVerifyEmail,
                  status: _ctx.status,
                  class: "max-w-xl"
                }, null, 8, ["must-verify-email", "status"])
              ]),
              createVNode("div", { class: "bg-white p-4 shadow sm:rounded-lg sm:p-8" }, [
                createVNode(_component_UpdatePasswordForm, { class: "max-w-xl" })
              ]),
              createVNode("div", { class: "bg-white p-4 shadow sm:rounded-lg sm:p-8" }, [
                createVNode(_component_DeleteUserForm, { class: "max-w-xl" })
              ])
            ])
          ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Edit as default
};
