var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as ActionSection } from "./ActionSection-8zbzdLMG.js";
import { I as InputError } from "./InputError-BIJeS7qt.js";
import { useForm, router } from "@inertiajs/vue3";
import { nextTick, resolveComponent, withCtx, createTextVNode, createVNode, withKeys, useSSRContext } from "vue";
import { VDialog, VTextField, VBtn } from "vuetify/components";
import { toNative, Vue, Ref, Component } from "vue-facing-decorator";
import { a as api } from "./axios-DQioN9B6.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { VBtn as VBtn$1 } from "vuetify/lib/components/VBtn/index.mjs";
import { VDialog as VDialog$1 } from "vuetify/lib/components/VDialog/index.mjs";
import { VTextField as VTextField$1 } from "vuetify/lib/components/VTextField/index.mjs";
import "./SectionTitle-BOMh00mo.js";
import "vuetify/lib/components/VGrid/index.mjs";
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
let DeleteUserForm$1 = class DeleteUserForm extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "confirmingUserDeletion", false);
    __publicField(this, "passwordInput");
    __publicField(this, "form", useForm({
      password: ""
    }));
  }
  confirmUserDeletion() {
    this.confirmingUserDeletion = true;
    nextTick(() => this.passwordInput.focus());
  }
  closeModal() {
    this.confirmingUserDeletion = false;
    this.form.clearErrors();
    this.form.reset();
  }
  async deleteUser() {
    let target = route("current-user.destroy");
    try {
      let res = await api.delete(target, { data: this.form });
      this.closeModal();
      router.visit(res.data.redirect || "/");
    } catch (error) {
      this.passwordInput.focus();
    } finally {
      this.form.reset();
    }
  }
};
__decorateClass([
  Ref("passwordInput")
], DeleteUserForm$1.prototype, "passwordInput", 2);
DeleteUserForm$1 = __decorateClass([
  Component({
    components: {
      ActionSection,
      VDialog,
      VTextField,
      VBtn,
      InputError
    }
  })
], DeleteUserForm$1);
const _sfc_main = toNative(DeleteUserForm$1);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ActionSection = resolveComponent("ActionSection");
  const _component_InputError = resolveComponent("InputError");
  _push(ssrRenderComponent(_component_ActionSection, _attrs, {
    title: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Delete Account `);
      } else {
        return [
          createTextVNode(" Delete Account ")
        ];
      }
    }),
    description: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Permanently delete your account. `);
      } else {
        return [
          createTextVNode(" Permanently delete your account. ")
        ];
      }
    }),
    content: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<p class="text-sm text-body-1"${_scopeId}> Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain. </p><div class="mt-5"${_scopeId}>`);
        _push2(ssrRenderComponent(VBtn$1, {
          color: "error",
          variant: "elevated",
          onClick: _ctx.confirmUserDeletion
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Delete Account `);
            } else {
              return [
                createTextVNode(" Delete Account ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
        _push2(ssrRenderComponent(VDialog$1, {
          modelValue: _ctx.confirmingUserDeletion,
          "onUpdate:modelValue": ($event) => _ctx.confirmingUserDeletion = $event,
          "max-width": "500"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="p-5"${_scopeId2}><h2 class="text-lg font-bold"${_scopeId2}>Delete Account</h2><p class="mt-2"${_scopeId2}>Are you sure you want to delete your account? This action cannot be undone. Please enter your password to confirm.</p>`);
              _push3(ssrRenderComponent(VTextField$1, {
                ref: "passwordInput",
                modelValue: _ctx.form.password,
                "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                label: "Password",
                type: "password",
                variant: "outlined",
                class: "mt-4",
                autocomplete: "current-password",
                onKeyup: _ctx.deleteUser
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_InputError, {
                message: _ctx.form.errors.password,
                class: "mt-2"
              }, null, _parent3, _scopeId2));
              _push3(`<div class="mt-4 d-flex justify-end"${_scopeId2}>`);
              _push3(ssrRenderComponent(VBtn$1, {
                variant: "text",
                onClick: _ctx.closeModal
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Cancel`);
                  } else {
                    return [
                      createTextVNode("Cancel")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VBtn$1, {
                color: "error",
                variant: "elevated",
                class: "ms-3",
                loading: _ctx.loading,
                onClick: _ctx.deleteUser
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Delete Account `);
                  } else {
                    return [
                      createTextVNode(" Delete Account ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "p-5" }, [
                  createVNode("h2", { class: "text-lg font-bold" }, "Delete Account"),
                  createVNode("p", { class: "mt-2" }, "Are you sure you want to delete your account? This action cannot be undone. Please enter your password to confirm."),
                  createVNode(VTextField$1, {
                    ref: "passwordInput",
                    modelValue: _ctx.form.password,
                    "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                    label: "Password",
                    type: "password",
                    variant: "outlined",
                    class: "mt-4",
                    autocomplete: "current-password",
                    onKeyup: withKeys(_ctx.deleteUser, ["enter"])
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                  createVNode(_component_InputError, {
                    message: _ctx.form.errors.password,
                    class: "mt-2"
                  }, null, 8, ["message"]),
                  createVNode("div", { class: "mt-4 d-flex justify-end" }, [
                    createVNode(VBtn$1, {
                      variant: "text",
                      onClick: _ctx.closeModal
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Cancel")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(VBtn$1, {
                      color: "error",
                      variant: "elevated",
                      class: "ms-3",
                      loading: _ctx.loading,
                      onClick: _ctx.deleteUser
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Delete Account ")
                      ]),
                      _: 1
                    }, 8, ["loading", "onClick"])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("p", { class: "text-sm text-body-1" }, " Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain. "),
          createVNode("div", { class: "mt-5" }, [
            createVNode(VBtn$1, {
              color: "error",
              variant: "elevated",
              onClick: _ctx.confirmUserDeletion
            }, {
              default: withCtx(() => [
                createTextVNode(" Delete Account ")
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          createVNode(VDialog$1, {
            modelValue: _ctx.confirmingUserDeletion,
            "onUpdate:modelValue": ($event) => _ctx.confirmingUserDeletion = $event,
            "max-width": "500"
          }, {
            default: withCtx(() => [
              createVNode("div", { class: "p-5" }, [
                createVNode("h2", { class: "text-lg font-bold" }, "Delete Account"),
                createVNode("p", { class: "mt-2" }, "Are you sure you want to delete your account? This action cannot be undone. Please enter your password to confirm."),
                createVNode(VTextField$1, {
                  ref: "passwordInput",
                  modelValue: _ctx.form.password,
                  "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                  label: "Password",
                  type: "password",
                  variant: "outlined",
                  class: "mt-4",
                  autocomplete: "current-password",
                  onKeyup: withKeys(_ctx.deleteUser, ["enter"])
                }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                createVNode(_component_InputError, {
                  message: _ctx.form.errors.password,
                  class: "mt-2"
                }, null, 8, ["message"]),
                createVNode("div", { class: "mt-4 d-flex justify-end" }, [
                  createVNode(VBtn$1, {
                    variant: "text",
                    onClick: _ctx.closeModal
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Cancel")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(VBtn$1, {
                    color: "error",
                    variant: "elevated",
                    class: "ms-3",
                    loading: _ctx.loading,
                    onClick: _ctx.deleteUser
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Delete Account ")
                    ]),
                    _: 1
                  }, 8, ["loading", "onClick"])
                ])
              ])
            ]),
            _: 1
          }, 8, ["modelValue", "onUpdate:modelValue"])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/DeleteUserForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DeleteUserForm2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  DeleteUserForm2 as default
};
