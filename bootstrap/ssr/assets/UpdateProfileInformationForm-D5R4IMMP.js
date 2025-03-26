var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as ActionMessage } from "./ActionMessage-k3cMCvSb.js";
import { F as FormSection, _ as _sfc_main$1 } from "./PrimaryButton-91jq1HDX.js";
import { I as InputError } from "./InputError-BIJeS7qt.js";
import { _ as _sfc_main$2 } from "./SecondaryButton-BgIg9sGF.js";
import { useForm, router } from "@inertiajs/vue3";
import { VTextField, VFileInput, VBtn, VCard, VImg } from "vuetify/components";
import { toNative, Vue, Prop, Ref, Component } from "vue-facing-decorator";
import { a as api } from "./axios-DQioN9B6.js";
import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, withModifiers, withDirectives, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { VAvatar } from "vuetify/lib/components/VAvatar/index.mjs";
import { VBtn as VBtn$1 } from "vuetify/lib/components/VBtn/index.mjs";
import { VFileInput as VFileInput$1 } from "vuetify/lib/components/VFileInput/index.mjs";
import { VRow, VCol } from "vuetify/lib/components/VGrid/index.mjs";
import { VTextField as VTextField$1 } from "vuetify/lib/components/VTextField/index.mjs";
import "vuetify/lib/components/transitions/index.mjs";
import "./SectionTitle-BOMh00mo.js";
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
    if (this.photoInput && this.photoInput.files[0]) {
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
      ActionMessage,
      FormSection,
      InputError,
      PrimaryButton: _sfc_main$1,
      SecondaryButton: _sfc_main$2,
      VTextField,
      VFileInput,
      VBtn,
      VCard,
      VImg
    }
  })
], UpdateProfileInformationForm$1);
const _sfc_main = toNative(UpdateProfileInformationForm$1);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_FormSection = resolveComponent("FormSection");
  const _component_InputError = resolveComponent("InputError");
  const _component_ActionMessage = resolveComponent("ActionMessage");
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
        _push2(ssrRenderComponent(VRow, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              if (_ctx.$page.props.jetstream.managesProfilePhotos) {
                _push3(ssrRenderComponent(VCol, {
                  cols: "12",
                  class: "d-flex flex-column"
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(VFileInput$1, {
                        id: "photo",
                        class: "d-none",
                        ref: "photoInput",
                        label: "Photo",
                        accept: "image/png, image/jpeg",
                        onChange: _ctx.updatePhotoPreview
                      }, null, _parent4, _scopeId3));
                      if (!_ctx.photoPreview) {
                        _push4(ssrRenderComponent(VAvatar, {
                          image: _ctx.user.profile_photo_url,
                          alt: _ctx.user.name,
                          size: "80",
                          cover: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        _push4(`<!---->`);
                      }
                      if (_ctx.photoPreview) {
                        _push4(ssrRenderComponent(VAvatar, {
                          image: _ctx.photoPreview,
                          size: "80"
                        }, null, _parent4, _scopeId3));
                      } else {
                        _push4(`<!---->`);
                      }
                      _push4(`<div class="mt-2"${_scopeId3}>`);
                      _push4(ssrRenderComponent(VBtn$1, {
                        color: "secondary",
                        class: "me-2",
                        onClick: ($event) => {
                          var _a;
                          return (_a = _ctx.photoInput) == null ? void 0 : _a.click();
                        }
                      }, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(` Select A New Photo `);
                          } else {
                            return [
                              createTextVNode(" Select A New Photo ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                      if (_ctx.user.profile_photo_path) {
                        _push4(ssrRenderComponent(VBtn$1, {
                          color: "secondary",
                          onClick: _ctx.deletePhoto
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Remove Photo `);
                            } else {
                              return [
                                createTextVNode(" Remove Photo ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        _push4(`<!---->`);
                      }
                      _push4(`</div>`);
                      _push4(ssrRenderComponent(_component_InputError, {
                        message: _ctx.form.errors.photo,
                        class: "mt-2"
                      }, null, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(VFileInput$1, {
                          id: "photo",
                          class: "d-none",
                          ref: "photoInput",
                          label: "Photo",
                          accept: "image/png, image/jpeg",
                          onChange: _ctx.updatePhotoPreview
                        }, null, 8, ["onChange"]),
                        !_ctx.photoPreview ? (openBlock(), createBlock(VAvatar, {
                          key: 0,
                          image: _ctx.user.profile_photo_url,
                          alt: _ctx.user.name,
                          size: "80",
                          cover: ""
                        }, null, 8, ["image", "alt"])) : createCommentVNode("", true),
                        _ctx.photoPreview ? (openBlock(), createBlock(VAvatar, {
                          key: 1,
                          image: _ctx.photoPreview,
                          size: "80"
                        }, null, 8, ["image"])) : createCommentVNode("", true),
                        createVNode("div", { class: "mt-2" }, [
                          createVNode(VBtn$1, {
                            color: "secondary",
                            class: "me-2",
                            onClick: withModifiers(($event) => {
                              var _a;
                              return (_a = _ctx.photoInput) == null ? void 0 : _a.click();
                            }, ["prevent"])
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Select A New Photo ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          _ctx.user.profile_photo_path ? (openBlock(), createBlock(VBtn$1, {
                            key: 0,
                            color: "secondary",
                            onClick: withModifiers(_ctx.deletePhoto, ["prevent"])
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Remove Photo ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : createCommentVNode("", true)
                        ]),
                        createVNode(_component_InputError, {
                          message: _ctx.form.errors.photo,
                          class: "mt-2"
                        }, null, 8, ["message"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                _push3(`<!---->`);
              }
            } else {
              return [
                _ctx.$page.props.jetstream.managesProfilePhotos ? (openBlock(), createBlock(VCol, {
                  key: 0,
                  cols: "12",
                  class: "d-flex flex-column"
                }, {
                  default: withCtx(() => [
                    createVNode(VFileInput$1, {
                      id: "photo",
                      class: "d-none",
                      ref: "photoInput",
                      label: "Photo",
                      accept: "image/png, image/jpeg",
                      onChange: _ctx.updatePhotoPreview
                    }, null, 8, ["onChange"]),
                    !_ctx.photoPreview ? (openBlock(), createBlock(VAvatar, {
                      key: 0,
                      image: _ctx.user.profile_photo_url,
                      alt: _ctx.user.name,
                      size: "80",
                      cover: ""
                    }, null, 8, ["image", "alt"])) : createCommentVNode("", true),
                    _ctx.photoPreview ? (openBlock(), createBlock(VAvatar, {
                      key: 1,
                      image: _ctx.photoPreview,
                      size: "80"
                    }, null, 8, ["image"])) : createCommentVNode("", true),
                    createVNode("div", { class: "mt-2" }, [
                      createVNode(VBtn$1, {
                        color: "secondary",
                        class: "me-2",
                        onClick: withModifiers(($event) => {
                          var _a;
                          return (_a = _ctx.photoInput) == null ? void 0 : _a.click();
                        }, ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Select A New Photo ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      _ctx.user.profile_photo_path ? (openBlock(), createBlock(VBtn$1, {
                        key: 0,
                        color: "secondary",
                        onClick: withModifiers(_ctx.deletePhoto, ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Remove Photo ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true)
                    ]),
                    createVNode(_component_InputError, {
                      message: _ctx.form.errors.photo,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VRow, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField$1, {
                      modelValue: _ctx.form.name,
                      "onUpdate:modelValue": ($event) => _ctx.form.name = $event,
                      label: "Name",
                      required: "",
                      autocomplete: "name"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_InputError, {
                      message: _ctx.form.errors.name,
                      class: "mt-2"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VTextField$1, {
                        modelValue: _ctx.form.name,
                        "onUpdate:modelValue": ($event) => _ctx.form.name = $event,
                        label: "Name",
                        required: "",
                        autocomplete: "name"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_InputError, {
                        message: _ctx.form.errors.name,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCol, { cols: "12" }, {
                  default: withCtx(() => [
                    createVNode(VTextField$1, {
                      modelValue: _ctx.form.name,
                      "onUpdate:modelValue": ($event) => _ctx.form.name = $event,
                      label: "Name",
                      required: "",
                      autocomplete: "name"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_InputError, {
                      message: _ctx.form.errors.name,
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
        _push2(ssrRenderComponent(VRow, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField$1, {
                      modelValue: _ctx.form.email,
                      "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                      label: "Email",
                      required: "",
                      autocomplete: "username",
                      type: "email"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_InputError, {
                      message: _ctx.form.errors.email,
                      class: "mt-2"
                    }, null, _parent4, _scopeId3));
                    if (_ctx.$page.props.jetstream.hasEmailVerification && _ctx.user.email_verified_at === null) {
                      _push4(`<div${_scopeId3}><p class="text-sm mt-2"${_scopeId3}> Your email address is unverified. `);
                      _push4(ssrRenderComponent(VBtn$1, {
                        variant: "text",
                        onClick: _ctx.sendEmailVerification
                      }, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`Click here to re-send the verification email.`);
                          } else {
                            return [
                              createTextVNode("Click here to re-send the verification email.")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                      _push4(`</p><div style="${ssrRenderStyle(_ctx.verificationLinkSent ? null : { display: "none" })}" class="mt-2 font-medium text-sm text-green-600"${_scopeId3}> A new verification link has been sent to your email address. </div></div>`);
                    } else {
                      _push4(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode(VTextField$1, {
                        modelValue: _ctx.form.email,
                        "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                        label: "Email",
                        required: "",
                        autocomplete: "username",
                        type: "email"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_InputError, {
                        message: _ctx.form.errors.email,
                        class: "mt-2"
                      }, null, 8, ["message"]),
                      _ctx.$page.props.jetstream.hasEmailVerification && _ctx.user.email_verified_at === null ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("p", { class: "text-sm mt-2" }, [
                          createTextVNode(" Your email address is unverified. "),
                          createVNode(VBtn$1, {
                            variant: "text",
                            onClick: withModifiers(_ctx.sendEmailVerification, ["prevent"])
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Click here to re-send the verification email.")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        withDirectives(createVNode("div", { class: "mt-2 font-medium text-sm text-green-600" }, " A new verification link has been sent to your email address. ", 512), [
                          [vShow, _ctx.verificationLinkSent]
                        ])
                      ])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCol, { cols: "12" }, {
                  default: withCtx(() => [
                    createVNode(VTextField$1, {
                      modelValue: _ctx.form.email,
                      "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                      label: "Email",
                      required: "",
                      autocomplete: "username",
                      type: "email"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_InputError, {
                      message: _ctx.form.errors.email,
                      class: "mt-2"
                    }, null, 8, ["message"]),
                    _ctx.$page.props.jetstream.hasEmailVerification && _ctx.user.email_verified_at === null ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("p", { class: "text-sm mt-2" }, [
                        createTextVNode(" Your email address is unverified. "),
                        createVNode(VBtn$1, {
                          variant: "text",
                          onClick: withModifiers(_ctx.sendEmailVerification, ["prevent"])
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Click here to re-send the verification email.")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      withDirectives(createVNode("div", { class: "mt-2 font-medium text-sm text-green-600" }, " A new verification link has been sent to your email address. ", 512), [
                        [vShow, _ctx.verificationLinkSent]
                      ])
                    ])) : createCommentVNode("", true)
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
          createVNode(VRow, null, {
            default: withCtx(() => [
              _ctx.$page.props.jetstream.managesProfilePhotos ? (openBlock(), createBlock(VCol, {
                key: 0,
                cols: "12",
                class: "d-flex flex-column"
              }, {
                default: withCtx(() => [
                  createVNode(VFileInput$1, {
                    id: "photo",
                    class: "d-none",
                    ref: "photoInput",
                    label: "Photo",
                    accept: "image/png, image/jpeg",
                    onChange: _ctx.updatePhotoPreview
                  }, null, 8, ["onChange"]),
                  !_ctx.photoPreview ? (openBlock(), createBlock(VAvatar, {
                    key: 0,
                    image: _ctx.user.profile_photo_url,
                    alt: _ctx.user.name,
                    size: "80",
                    cover: ""
                  }, null, 8, ["image", "alt"])) : createCommentVNode("", true),
                  _ctx.photoPreview ? (openBlock(), createBlock(VAvatar, {
                    key: 1,
                    image: _ctx.photoPreview,
                    size: "80"
                  }, null, 8, ["image"])) : createCommentVNode("", true),
                  createVNode("div", { class: "mt-2" }, [
                    createVNode(VBtn$1, {
                      color: "secondary",
                      class: "me-2",
                      onClick: withModifiers(($event) => {
                        var _a;
                        return (_a = _ctx.photoInput) == null ? void 0 : _a.click();
                      }, ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Select A New Photo ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    _ctx.user.profile_photo_path ? (openBlock(), createBlock(VBtn$1, {
                      key: 0,
                      color: "secondary",
                      onClick: withModifiers(_ctx.deletePhoto, ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Remove Photo ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true)
                  ]),
                  createVNode(_component_InputError, {
                    message: _ctx.form.errors.photo,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          createVNode(VRow, null, {
            default: withCtx(() => [
              createVNode(VCol, { cols: "12" }, {
                default: withCtx(() => [
                  createVNode(VTextField$1, {
                    modelValue: _ctx.form.name,
                    "onUpdate:modelValue": ($event) => _ctx.form.name = $event,
                    label: "Name",
                    required: "",
                    autocomplete: "name"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_InputError, {
                    message: _ctx.form.errors.name,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(VRow, null, {
            default: withCtx(() => [
              createVNode(VCol, { cols: "12" }, {
                default: withCtx(() => [
                  createVNode(VTextField$1, {
                    modelValue: _ctx.form.email,
                    "onUpdate:modelValue": ($event) => _ctx.form.email = $event,
                    label: "Email",
                    required: "",
                    autocomplete: "username",
                    type: "email"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_InputError, {
                    message: _ctx.form.errors.email,
                    class: "mt-2"
                  }, null, 8, ["message"]),
                  _ctx.$page.props.jetstream.hasEmailVerification && _ctx.user.email_verified_at === null ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("p", { class: "text-sm mt-2" }, [
                      createTextVNode(" Your email address is unverified. "),
                      createVNode(VBtn$1, {
                        variant: "text",
                        onClick: withModifiers(_ctx.sendEmailVerification, ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Click here to re-send the verification email.")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    withDirectives(createVNode("div", { class: "mt-2 font-medium text-sm text-green-600" }, " A new verification link has been sent to your email address. ", 512), [
                      [vShow, _ctx.verificationLinkSent]
                    ])
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const UpdateProfileInformationForm2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  UpdateProfileInformationForm2 as default
};
