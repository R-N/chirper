var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as AppLayout } from "./AppLayout-BTUHKS5A.js";
import { D as DeleteUserForm, U as UpdatePasswordForm, a as UpdateProfileInformationForm } from "./UpdateProfileInformationForm-D2VcGHL5.js";
import { t as toNative, V as Vue, d as decorator, b as Component, $ as me, _ as _export_sfc, r as resolveComponent, j as createBlock, w as withCtx, o as openBlock, f as createBaseVNode, e as createVNode } from "./app-CJfxbgbM.js";
import { V as VContainer, c as VRow, a as VCard, d as VCardTitle, b as VCardText } from "./GuestLayout.vue_vue_type_script_lang-D4vr3XMc.js";
import { V as VCol } from "./VCol-DKYWie_M.js";
import "./Auth.vue_vue_type_script_lang-DhBczGcz.js";
import "./AuthenticationCardLogo-BRpu58oV.js";
import "./forwardRefs-Db-_QBrT.js";
import "./VMenu-B78fScza.js";
import "./Login-Bam6njN5.js";
import "./InputError-DG5XJAZt.js";
import "./VTextField-CsT5nxqZ.js";
import "./VCheckbox-Bv2SmIYc.js";
import "./FormSection-CGmYcqWQ.js";
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
let ProfileEditPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "mustVerifyEmail");
    __publicField(this, "status");
  }
};
__decorateClass([
  decorator(Boolean)
], ProfileEditPage.prototype, "mustVerifyEmail", 2);
__decorateClass([
  decorator(String)
], ProfileEditPage.prototype, "status", 2);
ProfileEditPage = __decorateClass([
  Component({
    components: {
      AppLayout,
      DeleteUserForm,
      UpdatePasswordForm,
      UpdateProfileInformationForm,
      Head: me,
      VContainer,
      VRow,
      VCol,
      VCard,
      VCardTitle,
      VCardText
    }
  })
], ProfileEditPage);
const _sfc_main = toNative(ProfileEditPage);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_UpdateProfileInformationForm = resolveComponent("UpdateProfileInformationForm");
  const _component_UpdatePasswordForm = resolveComponent("UpdatePasswordForm");
  const _component_DeleteUserForm = resolveComponent("DeleteUserForm");
  const _component_AppLayout = resolveComponent("AppLayout");
  return openBlock(), createBlock(_component_AppLayout, null, {
    header: withCtx(() => _cache[0] || (_cache[0] = [
      createBaseVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800" }, " Profile ", -1)
    ])),
    default: withCtx(() => [
      createVNode(_component_Head, { title: "Profile" }),
      createVNode(VContainer, {
        class: "d-flex flex-column ga-5",
        justify: "center"
      }, {
        default: withCtx(() => [
          createVNode(VCard, { title: "Update Profile Information" }, {
            default: withCtx(() => [
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode(_component_UpdateProfileInformationForm, {
                    "must-verify-email": _ctx.mustVerifyEmail,
                    status: _ctx.status,
                    user: _ctx.$page.props.auth.user
                  }, null, 8, ["must-verify-email", "status", "user"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(VCard, { title: "Update Password" }, {
            default: withCtx(() => [
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode(_component_UpdatePasswordForm)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(VCard, { title: "Delete Account" }, {
            default: withCtx(() => [
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode(_component_DeleteUserForm)
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
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Edit as default
};
//# sourceMappingURL=Edit-DTLqOaAu.js.map
