var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as AppLayout } from "./AppLayout-DTnU2NY8.js";
import DeleteUserForm from "./DeleteUserForm-BQF2rJAy.js";
import UpdatePasswordForm from "./UpdatePasswordForm-MyzenfHs.js";
import UpdateProfileInformationForm from "./UpdateProfileInformationForm-D5R4IMMP.js";
import { router, Head } from "@inertiajs/vue3";
import { VContainer, VRow, VCol, VCard, VCardTitle, VCardText } from "vuetify/components";
import { toNative, Vue, Prop, Component } from "vue-facing-decorator";
import { a as api } from "./axios-DQioN9B6.js";
import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { VCard as VCard$1, VCardText as VCardText$1 } from "vuetify/lib/components/VCard/index.mjs";
import { VContainer as VContainer$1 } from "vuetify/lib/components/VGrid/index.mjs";
import "./auth-DrKxFB6F.js";
import "pinia";
import "vuetify/lib/components/VApp/index.mjs";
import "vuetify/lib/components/VAppBar/index.mjs";
import "vuetify/lib/components/VAvatar/index.mjs";
import "vuetify/lib/components/VBtn/index.mjs";
import "vuetify/lib/components/VIcon/index.mjs";
import "vuetify/lib/components/VImg/index.mjs";
import "vuetify/lib/components/VList/index.mjs";
import "vuetify/lib/components/VMain/index.mjs";
import "vuetify/lib/components/VMenu/index.mjs";
import "vuetify/lib/components/VNavigationDrawer/index.mjs";
import "vuetify/lib/components/VToolbar/index.mjs";
import "./ActionSection-8zbzdLMG.js";
import "./SectionTitle-BOMh00mo.js";
import "./InputError-BIJeS7qt.js";
import "vuetify/lib/components/VAlert/index.mjs";
import "vuetify/lib/components/VDialog/index.mjs";
import "vuetify/lib/components/VTextField/index.mjs";
import "./ActionMessage-k3cMCvSb.js";
import "vuetify/lib/components/transitions/index.mjs";
import "./PrimaryButton-91jq1HDX.js";
import "./SecondaryButton-BgIg9sGF.js";
import "vuetify/lib/components/VFileInput/index.mjs";
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
      AppLayout,
      DeleteUserForm,
      UpdatePasswordForm,
      UpdateProfileInformationForm,
      Head,
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
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AppLayout = resolveComponent("AppLayout");
  const _component_Head = resolveComponent("Head");
  const _component_UpdateProfileInformationForm = resolveComponent("UpdateProfileInformationForm");
  const _component_UpdatePasswordForm = resolveComponent("UpdatePasswordForm");
  const _component_DeleteUserForm = resolveComponent("DeleteUserForm");
  _push(ssrRenderComponent(_component_AppLayout, _attrs, {
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
        _push2(ssrRenderComponent(_component_Head, { title: "Profile" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(VContainer$1, {
          class: "d-flex flex-column ga-5",
          justify: "center"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCard$1, { title: "Update Profile Information" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VCardText$1, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_UpdateProfileInformationForm, {
                            "must-verify-email": _ctx.mustVerifyEmail,
                            status: _ctx.status,
                            user: _ctx.$page.props.auth.user
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_UpdateProfileInformationForm, {
                              "must-verify-email": _ctx.mustVerifyEmail,
                              status: _ctx.status,
                              user: _ctx.$page.props.auth.user
                            }, null, 8, ["must-verify-email", "status", "user"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VCardText$1, null, {
                        default: withCtx(() => [
                          createVNode(_component_UpdateProfileInformationForm, {
                            "must-verify-email": _ctx.mustVerifyEmail,
                            status: _ctx.status,
                            user: _ctx.$page.props.auth.user
                          }, null, 8, ["must-verify-email", "status", "user"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCard$1, { title: "Update Password" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VCardText$1, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_UpdatePasswordForm, null, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_UpdatePasswordForm)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VCardText$1, null, {
                        default: withCtx(() => [
                          createVNode(_component_UpdatePasswordForm)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCard$1, { title: "Delete Account" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VCardText$1, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_DeleteUserForm, null, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_DeleteUserForm)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VCardText$1, null, {
                        default: withCtx(() => [
                          createVNode(_component_DeleteUserForm)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCard$1, { title: "Update Profile Information" }, {
                  default: withCtx(() => [
                    createVNode(VCardText$1, null, {
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
                createVNode(VCard$1, { title: "Update Password" }, {
                  default: withCtx(() => [
                    createVNode(VCardText$1, null, {
                      default: withCtx(() => [
                        createVNode(_component_UpdatePasswordForm)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VCard$1, { title: "Delete Account" }, {
                  default: withCtx(() => [
                    createVNode(VCardText$1, null, {
                      default: withCtx(() => [
                        createVNode(_component_DeleteUserForm)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_Head, { title: "Profile" }),
          createVNode(VContainer$1, {
            class: "d-flex flex-column ga-5",
            justify: "center"
          }, {
            default: withCtx(() => [
              createVNode(VCard$1, { title: "Update Profile Information" }, {
                default: withCtx(() => [
                  createVNode(VCardText$1, null, {
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
              createVNode(VCard$1, { title: "Update Password" }, {
                default: withCtx(() => [
                  createVNode(VCardText$1, null, {
                    default: withCtx(() => [
                      createVNode(_component_UpdatePasswordForm)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCard$1, { title: "Delete Account" }, {
                default: withCtx(() => [
                  createVNode(VCardText$1, null, {
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
        ];
      }
    }),
    _: 1
  }, _parent));
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
