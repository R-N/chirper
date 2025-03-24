var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { a as _sfc_main$1, b as _sfc_main$2 } from "./DialogModal-Dl-MOD2C.js";
import { _ as _sfc_main$3 } from "./DangerButton-BsxM2vkF.js";
import { _ as _sfc_main$4 } from "./InputError-BRdBLb-x.js";
import { _ as _sfc_main$5 } from "./SecondaryButton-BgIg9sGF.js";
import { _ as _sfc_main$6 } from "./TextInput-2NFZntg2.js";
import { useForm, router } from "@inertiajs/vue3";
import { nextTick, resolveComponent, withCtx, createTextVNode, createVNode, withKeys, useSSRContext } from "vue";
import { toNative, Vue, Ref, Component } from "vue-facing-decorator";
import { a as api } from "./axios-DQioN9B6.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./SectionTitle-4i2p8f-X.js";
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
      ActionSection: _sfc_main$1,
      DialogModal: _sfc_main$2,
      DangerButton: _sfc_main$3,
      InputError: _sfc_main$4,
      // InputLabel,
      // Modal,
      SecondaryButton: _sfc_main$5,
      TextInput: _sfc_main$6
    }
  })
], DeleteUserForm$1);
const _sfc_main = toNative(DeleteUserForm$1);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ActionSection = resolveComponent("ActionSection");
  const _component_DangerButton = resolveComponent("DangerButton");
  const _component_DialogModal = resolveComponent("DialogModal");
  const _component_TextInput = resolveComponent("TextInput");
  const _component_InputError = resolveComponent("InputError");
  const _component_SecondaryButton = resolveComponent("SecondaryButton");
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
        _push2(`<div class="max-w-xl text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain. </div><div class="mt-5"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_DangerButton, { onClick: _ctx.confirmUserDeletion }, {
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
        _push2(ssrRenderComponent(_component_DialogModal, {
          show: _ctx.confirmingUserDeletion,
          onClose: _ctx.closeModal
        }, {
          title: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Delete Account `);
            } else {
              return [
                createTextVNode(" Delete Account ")
              ];
            }
          }),
          content: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. <div class="mt-4"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_TextInput, {
                ref: "passwordInput",
                modelValue: _ctx.form.password,
                "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                type: "password",
                class: "mt-1 block w-3/4",
                placeholder: "Password",
                autocomplete: "current-password",
                onKeyup: _ctx.deleteUser
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_InputError, {
                message: _ctx.form.errors.password,
                class: "mt-2"
              }, null, _parent3, _scopeId2));
              _push3(`</div>`);
            } else {
              return [
                createTextVNode(" Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. "),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_component_TextInput, {
                    ref: "passwordInput",
                    modelValue: _ctx.form.password,
                    "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                    type: "password",
                    class: "mt-1 block w-3/4",
                    placeholder: "Password",
                    autocomplete: "current-password",
                    onKeyup: withKeys(_ctx.deleteUser, ["enter"])
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                  createVNode(_component_InputError, {
                    message: _ctx.form.errors.password,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])
              ];
            }
          }),
          footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_SecondaryButton, { onClick: _ctx.closeModal }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Cancel `);
                  } else {
                    return [
                      createTextVNode(" Cancel ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_DangerButton, {
                class: ["ms-3", { "opacity-25": _ctx.form.processing }],
                disabled: _ctx.form.processing,
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
            } else {
              return [
                createVNode(_component_SecondaryButton, { onClick: _ctx.closeModal }, {
                  default: withCtx(() => [
                    createTextVNode(" Cancel ")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_DangerButton, {
                  class: ["ms-3", { "opacity-25": _ctx.form.processing }],
                  disabled: _ctx.form.processing,
                  onClick: _ctx.deleteUser
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Delete Account ")
                  ]),
                  _: 1
                }, 8, ["class", "disabled", "onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("div", { class: "max-w-xl text-sm text-gray-600 dark:text-gray-400" }, " Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain. "),
          createVNode("div", { class: "mt-5" }, [
            createVNode(_component_DangerButton, { onClick: _ctx.confirmUserDeletion }, {
              default: withCtx(() => [
                createTextVNode(" Delete Account ")
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          createVNode(_component_DialogModal, {
            show: _ctx.confirmingUserDeletion,
            onClose: _ctx.closeModal
          }, {
            title: withCtx(() => [
              createTextVNode(" Delete Account ")
            ]),
            content: withCtx(() => [
              createTextVNode(" Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. "),
              createVNode("div", { class: "mt-4" }, [
                createVNode(_component_TextInput, {
                  ref: "passwordInput",
                  modelValue: _ctx.form.password,
                  "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                  type: "password",
                  class: "mt-1 block w-3/4",
                  placeholder: "Password",
                  autocomplete: "current-password",
                  onKeyup: withKeys(_ctx.deleteUser, ["enter"])
                }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                createVNode(_component_InputError, {
                  message: _ctx.form.errors.password,
                  class: "mt-2"
                }, null, 8, ["message"])
              ])
            ]),
            footer: withCtx(() => [
              createVNode(_component_SecondaryButton, { onClick: _ctx.closeModal }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_DangerButton, {
                class: ["ms-3", { "opacity-25": _ctx.form.processing }],
                disabled: _ctx.form.processing,
                onClick: _ctx.deleteUser
              }, {
                default: withCtx(() => [
                  createTextVNode(" Delete Account ")
                ]),
                _: 1
              }, 8, ["class", "disabled", "onClick"])
            ]),
            _: 1
          }, 8, ["show", "onClose"])
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
