var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { _ as _sfc_main$1 } from "./ActionMessage-lseuyjgQ.js";
import { _ as _sfc_main$2 } from "./FormSection-D-jZqCN4.js";
import { _ as _sfc_main$3 } from "./InputError-BRdBLb-x.js";
import { _ as _sfc_main$4 } from "./InputLabel-Cnda-O0w.js";
import { _ as _sfc_main$5 } from "./PrimaryButton-CtpSN9QQ.js";
import { _ as _sfc_main$6 } from "./SecondaryButton-BgIg9sGF.js";
import { _ as _sfc_main$7 } from "./TextInput-2NFZntg2.js";
import { useForm, router, Link } from "@inertiajs/vue3";
import { toNative, Vue, Prop, Ref, Component } from "vue-facing-decorator";
import { a as api } from "./axios-DQioN9B6.js";
import { resolveComponent, mergeProps, withCtx, createTextVNode, openBlock, createBlock, createVNode, withDirectives, vShow, withModifiers, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
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
let UpdateProfileInformationForm$1 = class UpdateProfileInformationForm extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "user", null);
    __publicField(this, "form", useForm({
      _method: "PUT",
      name: "",
      email: "",
      photo: null
    }));
    __publicField(this, "verificationLinkSent", null);
    __publicField(this, "photoPreview", null);
    __publicField(this, "photoInput");
  }
  mounted() {
    this.form.name = this.user.name;
    this.form.email = this.user.email;
  }
  async submit() {
    await api.patch(route("profile.update"), this.form);
  }
  async updateProfileInformation() {
    var _a;
    if (this.photoInput) {
      this.form.photo = this.photoInput.files[0];
    }
    const formData = new FormData();
    formData.append("name", this.form.name);
    formData.append("email", this.form.email);
    if (this.photoInput) {
      formData.append("photo", this.photoInput.files[0]);
    }
    try {
      let res = await api.post(route("user-profile-information.update"), formData, {
        headers: { "Content-Type": "multipart/form-data" },
        params: {
          // Laravel won't process multipart/form-data in a PUT request
          // So we send a POST request but spoof it as PUT
          _method: "PUT"
        }
      });
      this.clearPhotoFileInput();
      router.reload({ preserveScroll: true });
    } catch (error) {
      if (((_a = error.response) == null ? void 0 : _a.status) === 422) {
        this.form.errors = error.response.data.errors;
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }
  sendEmailVerification() {
    this.verificationLinkSent = true;
  }
  selectNewPhoto() {
    this.photoInput.click();
  }
  async updatePhotoPreview() {
    const photo = this.photoInput.files[0];
    if (!photo) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.photoPreview = e.target.result;
    };
    return await reader.readAsDataURL(photo);
  }
  async deletePhoto() {
    await api.delete(route("current-user-photo.destroy"));
    this.photoPreview = null;
    this.clearPhotoFileInput();
    router.reload({ preserveScroll: true });
  }
  clearPhotoFileInput() {
    var _a;
    if ((_a = this.photoInput) == null ? void 0 : _a.value) {
      this.photoInput.value = null;
    }
  }
};
__decorateClass([
  Prop(Object)
], UpdateProfileInformationForm$1.prototype, "user", 2);
__decorateClass([
  Ref("photoInput")
], UpdateProfileInformationForm$1.prototype, "photoInput", 2);
UpdateProfileInformationForm$1 = __decorateClass([
  Component({
    components: {
      ActionMessage: _sfc_main$1,
      FormSection: _sfc_main$2,
      InputError: _sfc_main$3,
      InputLabel: _sfc_main$4,
      PrimaryButton: _sfc_main$5,
      SecondaryButton: _sfc_main$6,
      TextInput: _sfc_main$7,
      Link
    }
  })
], UpdateProfileInformationForm$1);
const _sfc_main = toNative(UpdateProfileInformationForm$1);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_FormSection = resolveComponent("FormSection");
  const _component_InputLabel = resolveComponent("InputLabel");
  const _component_SecondaryButton = resolveComponent("SecondaryButton");
  const _component_InputError = resolveComponent("InputError");
  const _component_TextInput = resolveComponent("TextInput");
  const _component_Link = resolveComponent("Link");
  const _component_ActionMessage = resolveComponent("ActionMessage");
  const _component_PrimaryButton = resolveComponent("PrimaryButton");
  _push(ssrRenderComponent(_component_FormSection, mergeProps({
    onSubmitted: _ctx.updateProfileInformation,
    enctype: "multipart/form-data"
  }, _attrs), {
    title: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Profile Information `);
      } else {
        return [
          createTextVNode(" Profile Information ")
        ];
      }
    }),
    description: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Update your account&#39;s profile information and email address. `);
      } else {
        return [
          createTextVNode(" Update your account's profile information and email address. ")
        ];
      }
    }),
    form: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (_ctx.$page.props.jetstream.managesProfilePhotos) {
          _push2(`<div class="col-span-6 sm:col-span-4"${_scopeId}><input id="photo" type="file" class="hidden" accept=".jpg,.jpeg,.png"${_scopeId}>`);
          _push2(ssrRenderComponent(_component_InputLabel, {
            for: "photo",
            value: "Photo"
          }, null, _parent2, _scopeId));
          _push2(`<div style="${ssrRenderStyle(!_ctx.photoPreview ? null : { display: "none" })}" class="mt-2"${_scopeId}><img${ssrRenderAttr("src", _ctx.user.profile_photo_url)}${ssrRenderAttr("alt", _ctx.user.name)} class="rounded-full size-20 object-cover"${_scopeId}></div><div style="${ssrRenderStyle(_ctx.photoPreview ? null : { display: "none" })}" class="mt-2"${_scopeId}><span class="block rounded-full size-20 bg-cover bg-no-repeat bg-center" style="${ssrRenderStyle("background-image: url('" + _ctx.photoPreview + "');")}"${_scopeId}></span></div>`);
          _push2(ssrRenderComponent(_component_SecondaryButton, {
            class: "mt-2 me-2",
            type: "button",
            onClick: _ctx.selectNewPhoto
          }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(` Select A New Photo `);
              } else {
                return [
                  createTextVNode(" Select A New Photo ")
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          if (_ctx.user.profile_photo_path) {
            _push2(ssrRenderComponent(_component_SecondaryButton, {
              type: "button",
              class: "mt-2",
              onClick: _ctx.deletePhoto
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Remove Photo `);
                } else {
                  return [
                    createTextVNode(" Remove Photo ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            _push2(`<!---->`);
          }
          _push2(ssrRenderComponent(_component_InputError, {
            message: _ctx.form.errors.photo,
            class: "mt-2"
          }, null, _parent2, _scopeId));
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="col-span-6 sm:col-span-4"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_InputLabel, {
          for: "name",
          value: "Name"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_TextInput, {
          id: "name",
          modelValue: _ctx.form.name,
          "onUpdate:modelValue": ($event) => _ctx.form.name = $event,
          type: "text",
          class: "mt-1 block w-full",
          required: "",
          autocomplete: "name"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_InputError, {
          message: _ctx.form.errors.name,
          class: "mt-2"
        }, null, _parent2, _scopeId));
        _push2(`</div><div class="col-span-6 sm:col-span-4"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_InputLabel, {
          for: "email",
          value: "Email"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_TextInput, {
          id: "email",
          modelValue: _ctx.form.email,
          "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
          type: "email",
          class: "mt-1 block w-full",
          required: "",
          autocomplete: "username"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_InputError, {
          message: _ctx.form.errors.email,
          class: "mt-2"
        }, null, _parent2, _scopeId));
        if (_ctx.$page.props.jetstream.hasEmailVerification && _ctx.user.email_verified_at === null) {
          _push2(`<div${_scopeId}><p class="text-sm mt-2 dark:text-white"${_scopeId}> Your email address is unverified. `);
          _push2(ssrRenderComponent(_component_Link, {
            href: _ctx.route("verification.send"),
            method: "post",
            as: "button",
            class: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800",
            onClick: _ctx.sendEmailVerification
          }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(` Click here to re-send the verification email. `);
              } else {
                return [
                  createTextVNode(" Click here to re-send the verification email. ")
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(`</p><div style="${ssrRenderStyle(_ctx.verificationLinkSent ? null : { display: "none" })}" class="mt-2 font-medium text-sm text-green-600 dark:text-green-400"${_scopeId}> A new verification link has been sent to your email address. </div></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div>`);
      } else {
        return [
          _ctx.$page.props.jetstream.managesProfilePhotos ? (openBlock(), createBlock("div", {
            key: 0,
            class: "col-span-6 sm:col-span-4"
          }, [
            createVNode("input", {
              id: "photo",
              ref: "photoInput",
              type: "file",
              class: "hidden",
              onChange: _ctx.updatePhotoPreview,
              accept: ".jpg,.jpeg,.png"
            }, null, 40, ["onChange"]),
            createVNode(_component_InputLabel, {
              for: "photo",
              value: "Photo"
            }),
            withDirectives(createVNode("div", { class: "mt-2" }, [
              createVNode("img", {
                src: _ctx.user.profile_photo_url,
                alt: _ctx.user.name,
                class: "rounded-full size-20 object-cover"
              }, null, 8, ["src", "alt"])
            ], 512), [
              [vShow, !_ctx.photoPreview]
            ]),
            withDirectives(createVNode("div", { class: "mt-2" }, [
              createVNode("span", {
                class: "block rounded-full size-20 bg-cover bg-no-repeat bg-center",
                style: "background-image: url('" + _ctx.photoPreview + "');"
              }, null, 4)
            ], 512), [
              [vShow, _ctx.photoPreview]
            ]),
            createVNode(_component_SecondaryButton, {
              class: "mt-2 me-2",
              type: "button",
              onClick: withModifiers(_ctx.selectNewPhoto, ["prevent"])
            }, {
              default: withCtx(() => [
                createTextVNode(" Select A New Photo ")
              ]),
              _: 1
            }, 8, ["onClick"]),
            _ctx.user.profile_photo_path ? (openBlock(), createBlock(_component_SecondaryButton, {
              key: 0,
              type: "button",
              class: "mt-2",
              onClick: withModifiers(_ctx.deletePhoto, ["prevent"])
            }, {
              default: withCtx(() => [
                createTextVNode(" Remove Photo ")
              ]),
              _: 1
            }, 8, ["onClick"])) : createCommentVNode("", true),
            createVNode(_component_InputError, {
              message: _ctx.form.errors.photo,
              class: "mt-2"
            }, null, 8, ["message"])
          ])) : createCommentVNode("", true),
          createVNode("div", { class: "col-span-6 sm:col-span-4" }, [
            createVNode(_component_InputLabel, {
              for: "name",
              value: "Name"
            }),
            createVNode(_component_TextInput, {
              id: "name",
              modelValue: _ctx.form.name,
              "onUpdate:modelValue": ($event) => _ctx.form.name = $event,
              type: "text",
              class: "mt-1 block w-full",
              required: "",
              autocomplete: "name"
            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode(_component_InputError, {
              message: _ctx.form.errors.name,
              class: "mt-2"
            }, null, 8, ["message"])
          ]),
          createVNode("div", { class: "col-span-6 sm:col-span-4" }, [
            createVNode(_component_InputLabel, {
              for: "email",
              value: "Email"
            }),
            createVNode(_component_TextInput, {
              id: "email",
              modelValue: _ctx.form.email,
              "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
              type: "email",
              class: "mt-1 block w-full",
              required: "",
              autocomplete: "username"
            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode(_component_InputError, {
              message: _ctx.form.errors.email,
              class: "mt-2"
            }, null, 8, ["message"]),
            _ctx.$page.props.jetstream.hasEmailVerification && _ctx.user.email_verified_at === null ? (openBlock(), createBlock("div", { key: 0 }, [
              createVNode("p", { class: "text-sm mt-2 dark:text-white" }, [
                createTextVNode(" Your email address is unverified. "),
                createVNode(_component_Link, {
                  href: _ctx.route("verification.send"),
                  method: "post",
                  as: "button",
                  class: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800",
                  onClick: withModifiers(_ctx.sendEmailVerification, ["prevent"])
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Click here to re-send the verification email. ")
                  ]),
                  _: 1
                }, 8, ["href", "onClick"])
              ]),
              withDirectives(createVNode("div", { class: "mt-2 font-medium text-sm text-green-600 dark:text-green-400" }, " A new verification link has been sent to your email address. ", 512), [
                [vShow, _ctx.verificationLinkSent]
              ])
            ])) : createCommentVNode("", true)
          ])
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
        _push2(ssrRenderComponent(_component_PrimaryButton, {
          class: { "opacity-25": _ctx.form.processing },
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
          createVNode(_component_PrimaryButton, {
            class: { "opacity-25": _ctx.form.processing },
            disabled: _ctx.form.processing
          }, {
            default: withCtx(() => [
              createTextVNode(" Save ")
            ]),
            _: 1
          }, 8, ["class", "disabled"])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const UpdateProfileInformationForm2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  UpdateProfileInformationForm2 as default
};
