var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as ActionMessage } from "./ActionMessage-D7qvabMp.js";
import { F as FormSection } from "./FormSection-DtCNjUcg.js";
import { I as InputError } from "./InputError-BNQz4Gj5.js";
import { useForm, router } from "@inertiajs/vue3";
import { VTextField, VBtn, VRow, VCol } from "vuetify/components";
import { toNative, Vue, Ref, Component } from "vue-facing-decorator";
import { a as api, _ as _export_sfc } from "./axios-l-eSoL-p.js";
import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { VBtn as VBtn$1 } from "vuetify/lib/components/VBtn/index.mjs";
import { VRow as VRow$1, VCol as VCol$1 } from "vuetify/lib/components/VGrid/index.mjs";
import { VTextField as VTextField$1 } from "vuetify/lib/components/VTextField/index.mjs";
import "vuetify/lib/components/transitions/index.mjs";
import "./SectionTitle-DOkVpph5.js";
import "vuetify/lib/components/VCard/index.mjs";
import "vuetify/lib/components/VAlert/index.mjs";
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
      ActionMessage,
      FormSection,
      InputError,
      VTextField,
      VBtn,
      VRow,
      VCol
    }
  })
], UpdatePasswordForm$1);
const _sfc_main = toNative(UpdatePasswordForm$1);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_FormSection = resolveComponent("FormSection");
  const _component_InputError = resolveComponent("InputError");
  const _component_ActionMessage = resolveComponent("ActionMessage");
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
        _push2(ssrRenderComponent(VRow$1, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCol$1, { cols: "12" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField$1, {
                      id: "current_password",
                      ref: "currentPasswordInput",
                      modelValue: _ctx.form.current_password,
                      "onUpdate:modelValue": ($event) => _ctx.form.current_password = $event,
                      label: "Current Password",
                      type: "password",
                      autocomplete: "current-password"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_InputError, {
                      message: _ctx.form.errors.current_password,
                      class: "mt-2"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VTextField$1, {
                        id: "current_password",
                        ref: "currentPasswordInput",
                        modelValue: _ctx.form.current_password,
                        "onUpdate:modelValue": ($event) => _ctx.form.current_password = $event,
                        label: "Current Password",
                        type: "password",
                        autocomplete: "current-password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_InputError, {
                        message: _ctx.form.errors.current_password,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCol$1, { cols: "12" }, {
                  default: withCtx(() => [
                    createVNode(VTextField$1, {
                      id: "current_password",
                      ref: "currentPasswordInput",
                      modelValue: _ctx.form.current_password,
                      "onUpdate:modelValue": ($event) => _ctx.form.current_password = $event,
                      label: "Current Password",
                      type: "password",
                      autocomplete: "current-password"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_InputError, {
                      message: _ctx.form.errors.current_password,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VRow$1, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCol$1, { cols: "12" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField$1, {
                      id: "password",
                      ref: "passwordInput",
                      modelValue: _ctx.form.password,
                      "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                      label: "New Password",
                      type: "password",
                      autocomplete: "new-password"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_InputError, {
                      message: _ctx.form.errors.password,
                      class: "mt-2"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VTextField$1, {
                        id: "password",
                        ref: "passwordInput",
                        modelValue: _ctx.form.password,
                        "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                        label: "New Password",
                        type: "password",
                        autocomplete: "new-password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_InputError, {
                        message: _ctx.form.errors.password,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCol$1, { cols: "12" }, {
                  default: withCtx(() => [
                    createVNode(VTextField$1, {
                      id: "password",
                      ref: "passwordInput",
                      modelValue: _ctx.form.password,
                      "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                      label: "New Password",
                      type: "password",
                      autocomplete: "new-password"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_InputError, {
                      message: _ctx.form.errors.password,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VRow$1, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCol$1, { cols: "12" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField$1, {
                      id: "password_confirmation",
                      modelValue: _ctx.form.password_confirmation,
                      "onUpdate:modelValue": ($event) => _ctx.form.password_confirmation = $event,
                      label: "Confirm Password",
                      type: "password",
                      autocomplete: "new-password"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_InputError, {
                      message: _ctx.form.errors.password_confirmation,
                      class: "mt-2"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VTextField$1, {
                        id: "password_confirmation",
                        modelValue: _ctx.form.password_confirmation,
                        "onUpdate:modelValue": ($event) => _ctx.form.password_confirmation = $event,
                        label: "Confirm Password",
                        type: "password",
                        autocomplete: "new-password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_InputError, {
                        message: _ctx.form.errors.password_confirmation,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCol$1, { cols: "12" }, {
                  default: withCtx(() => [
                    createVNode(VTextField$1, {
                      id: "password_confirmation",
                      modelValue: _ctx.form.password_confirmation,
                      "onUpdate:modelValue": ($event) => _ctx.form.password_confirmation = $event,
                      label: "Confirm Password",
                      type: "password",
                      autocomplete: "new-password"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_InputError, {
                      message: _ctx.form.errors.password_confirmation,
                      class: "mt-2"
                    }, null, 8, ["message"])
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
          createVNode(VRow$1, null, {
            default: withCtx(() => [
              createVNode(VCol$1, { cols: "12" }, {
                default: withCtx(() => [
                  createVNode(VTextField$1, {
                    id: "current_password",
                    ref: "currentPasswordInput",
                    modelValue: _ctx.form.current_password,
                    "onUpdate:modelValue": ($event) => _ctx.form.current_password = $event,
                    label: "Current Password",
                    type: "password",
                    autocomplete: "current-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_InputError, {
                    message: _ctx.form.errors.current_password,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(VRow$1, null, {
            default: withCtx(() => [
              createVNode(VCol$1, { cols: "12" }, {
                default: withCtx(() => [
                  createVNode(VTextField$1, {
                    id: "password",
                    ref: "passwordInput",
                    modelValue: _ctx.form.password,
                    "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                    label: "New Password",
                    type: "password",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_InputError, {
                    message: _ctx.form.errors.password,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(VRow$1, null, {
            default: withCtx(() => [
              createVNode(VCol$1, { cols: "12" }, {
                default: withCtx(() => [
                  createVNode(VTextField$1, {
                    id: "password_confirmation",
                    modelValue: _ctx.form.password_confirmation,
                    "onUpdate:modelValue": ($event) => _ctx.form.password_confirmation = $event,
                    label: "Confirm Password",
                    type: "password",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_InputError, {
                    message: _ctx.form.errors.password_confirmation,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
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
        _push2(ssrRenderComponent(VBtn$1, {
          color: "primary",
          variant: "elevated",
          type: "submit",
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
          createVNode(VBtn$1, {
            color: "primary",
            variant: "elevated",
            type: "submit",
            disabled: _ctx.form.processing
          }, {
            default: withCtx(() => [
              createTextVNode(" Save ")
            ]),
            _: 1
          }, 8, ["disabled"])
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
