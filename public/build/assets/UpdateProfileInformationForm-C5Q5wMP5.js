var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { a as ActionSection, A as ActionMessage, F as FormSection } from "./FormSection-CZo-bzAv.js";
import { m as makeVInputProps, a as makeVFieldProps, u as useFocus, V as VInput, b as VField, c as VCounter, I as InputError } from "./InputError-ytemAFXd.js";
import { p as propsFactory, a0 as wrapInArray, l as genericComponent, $ as useLocale, u as useProxiedModel, m as computed, n as ref, x as watch, aF as humanReadableFileSize, B as filterInputAttrs, e as createVNode, D as mergeProps, F as Fragment, z as nextTick, I as callEvent, av as api, b as Component, t as toNative, V as Vue, C, aA as Wr, ar as decorator, _ as _export_sfc, r as resolveComponent, o as openBlock, c as createBlock, w as withCtx, h as createTextVNode, g as createBaseVNode, aC as withKeys, a as decorator$1, N as createCommentVNode, i as withModifiers, j as createElementBlock, E as withDirectives, aG as vShow } from "./app-DDBQLYRK.js";
import { g as VDialog, b as VRow, a as VCard } from "./GuestLayout.vue_vue_type_script_lang-2s0GDYYy.js";
import { V as VTextField } from "./VTextField-vouJgQdh.js";
import { u as useRender, f as forwardRefs, V as VBtn, M as VImg, i as VAvatar } from "./forwardRefs-B6F8wykm.js";
import { V as VCol } from "./VCol-BlRM1PkL.js";
import { V as VChip } from "./VChip-DYXUBL3A.js";
const makeVFileInputProps = propsFactory({
  chips: Boolean,
  counter: Boolean,
  counterSizeString: {
    type: String,
    default: "$vuetify.fileInput.counterSize"
  },
  counterString: {
    type: String,
    default: "$vuetify.fileInput.counter"
  },
  hideInput: Boolean,
  multiple: Boolean,
  showSize: {
    type: [Boolean, Number, String],
    default: false,
    validator: (v) => {
      return typeof v === "boolean" || [1e3, 1024].includes(Number(v));
    }
  },
  ...makeVInputProps({
    prependIcon: "$file"
  }),
  modelValue: {
    type: [Array, Object],
    default: (props) => props.multiple ? [] : null,
    validator: (val) => {
      return wrapInArray(val).every((v) => v != null && typeof v === "object");
    }
  },
  ...makeVFieldProps({
    clearable: true
  })
}, "VFileInput");
const VFileInput = genericComponent()({
  name: "VFileInput",
  inheritAttrs: false,
  props: makeVFileInputProps(),
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (files) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const model = useProxiedModel(props, "modelValue", props.modelValue, (val) => wrapInArray(val), (val) => !props.multiple && Array.isArray(val) ? val[0] : val);
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const base = computed(() => typeof props.showSize !== "boolean" ? props.showSize : void 0);
    const totalBytes = computed(() => (model.value ?? []).reduce((bytes, _ref2) => {
      let {
        size = 0
      } = _ref2;
      return bytes + size;
    }, 0));
    const totalBytesReadable = computed(() => humanReadableFileSize(totalBytes.value, base.value));
    const fileNames = computed(() => (model.value ?? []).map((file) => {
      const {
        name = "",
        size = 0
      } = file;
      return !props.showSize ? name : `${name} (${humanReadableFileSize(size, base.value)})`;
    }));
    const counterValue = computed(() => {
      var _a;
      const fileCount = ((_a = model.value) == null ? void 0 : _a.length) ?? 0;
      if (props.showSize) return t(props.counterSizeString, fileCount, totalBytesReadable.value);
      else return t(props.counterString, fileCount);
    });
    const vInputRef = ref();
    const vFieldRef = ref();
    const inputRef = ref();
    const isActive = computed(() => isFocused.value || props.active);
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    function onFocus() {
      var _a;
      if (inputRef.value !== document.activeElement) {
        (_a = inputRef.value) == null ? void 0 : _a.focus();
      }
      if (!isFocused.value) focus();
    }
    function onClickPrepend(e) {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.click();
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
    }
    function onControlClick(e) {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.click();
      emit("click:control", e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = [];
        callEvent(props["onClick:clear"], e);
      });
    }
    function onDragover(e) {
      e.preventDefault();
    }
    function onDrop(e) {
      e.preventDefault();
      if (!e.dataTransfer) return;
      model.value = [...e.dataTransfer.files ?? []];
    }
    watch(model, (newValue) => {
      const hasModelReset = !Array.isArray(newValue) || !newValue.length;
      if (hasModelReset && inputRef.value) {
        inputRef.value.value = "";
      }
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = VField.filterProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": props.multiple ? model.value : model.value[0],
        "class": ["v-file-input", {
          "v-file-input--chips": !!props.chips,
          "v-file-input--hide": props.hideInput,
          "v-input--plain-underlined": isPlainOrUnderlined.value
        }, props.class],
        "style": props.style,
        "onClick:prepend": onClickPrepend
      }, rootAttrs, inputProps, {
        "centerAffix": !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref3) => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid
          } = _ref3;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "prepend-icon": props.prependIcon,
            "onMousedown": onControlMousedown,
            "onClick": onControlClick,
            "onClick:clear": onClear,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"]
          }, fieldProps, {
            "id": id.value,
            "active": isActive.value || isDirty.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "error": isValid.value === false,
            "onDragover": onDragover,
            "onDrop": onDrop
          }), {
            ...slots,
            default: (_ref4) => {
              var _a;
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref4;
              return createVNode(Fragment, null, [createVNode("input", mergeProps({
                "ref": inputRef,
                "type": "file",
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "multiple": props.multiple,
                "name": props.name,
                "onClick": (e) => {
                  e.stopPropagation();
                  if (isReadonly.value) e.preventDefault();
                  onFocus();
                },
                "onChange": (e) => {
                  if (!e.target) return;
                  const target = e.target;
                  model.value = [...target.files ?? []];
                },
                "onFocus": onFocus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), createVNode("div", {
                "class": fieldClass
              }, [!!((_a = model.value) == null ? void 0 : _a.length) && !props.hideInput && (slots.selection ? slots.selection({
                fileNames: fileNames.value,
                totalBytes: totalBytes.value,
                totalBytesReadable: totalBytesReadable.value
              }) : props.chips ? fileNames.value.map((text) => createVNode(VChip, {
                "key": text,
                "size": "small",
                "text": text
              }, null)) : fileNames.value.join(", "))])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => {
          var _a, _b;
          return createVNode(Fragment, null, [(_a = slots.details) == null ? void 0 : _a.call(slots, slotProps), hasCounter && createVNode(Fragment, null, [createVNode("span", null, null), createVNode(VCounter, {
            "active": !!((_b = model.value) == null ? void 0 : _b.length),
            "value": counterValue.value,
            "disabled": props.disabled
          }, slots.counter)])]);
        } : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, inputRef);
  }
});
class ProfileService {
  constructor(axios) {
    this.axios = axios || api;
  }
  async deleteUser(form) {
    let target = route("current-user.destroy");
    let res = await this.axios.delete(target, { data: form });
    return res.data;
  }
  async logoutOtherBrowserSessions(form) {
    let target = route("other-browser-sessions.destroy");
    let res = await this.axios.delete(target, { data: form });
    return res.data;
  }
  async updatePassword(form) {
    let target = route("user-password.update");
    let res = await this.axios.put(target, form);
    return res.data;
  }
  async _updateProfileInformation(form) {
    let res = await this.axios.patch(route("profile.update"), form);
    return res.data;
  }
  async updateProfileInformation(form, photo = null) {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    if (photo || form.photo) {
      formData.append("photo", photo || form.photo);
    }
    let res = await this.axios.post(route("user-profile-information.update"), formData, {
      headers: { "Content-Type": "multipart/form-data" },
      params: {
        // Laravel won't process multipart/form-data in a PUT request
        // So we send a POST request but spoof it as PUT
        _method: "PUT"
      }
    });
    return res.data;
  }
  async deletePhoto() {
    let res = await this.axios.delete(route("current-user-photo.destroy"));
    return res.data;
  }
  async verifyEmail(form) {
    let res = await this.axios.post(route("verification.send"), form);
    return res.data;
  }
}
const profileService = new ProfileService();
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
  return result;
};
let DeleteUserForm$1 = class DeleteUserForm extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "confirmingUserDeletion", false);
    __publicField(this, "passwordInput");
    __publicField(this, "form", C({
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
    try {
      let res = await profileService.deleteUser(this.form);
      this.closeModal();
      Wr.visit(res.redirect || "/");
    } catch (error) {
      this.passwordInput.focus();
    } finally {
      this.form.reset();
    }
  }
};
__decorateClass$2([
  decorator("passwordInput")
], DeleteUserForm$1.prototype, "passwordInput", 2);
DeleteUserForm$1 = __decorateClass$2([
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
const _sfc_main$2 = toNative(DeleteUserForm$1);
const _hoisted_1$1 = { class: "mt-5" };
const _hoisted_2$1 = { class: "p-5" };
const _hoisted_3$1 = { class: "mt-4 d-flex justify-end" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_InputError = resolveComponent("InputError");
  const _component_ActionSection = resolveComponent("ActionSection");
  return openBlock(), createBlock(_component_ActionSection, null, {
    title: withCtx(() => _cache[2] || (_cache[2] = [
      createTextVNode(" Delete Account ")
    ])),
    description: withCtx(() => _cache[3] || (_cache[3] = [
      createTextVNode(" Permanently delete your account. ")
    ])),
    content: withCtx(() => [
      _cache[9] || (_cache[9] = createBaseVNode("p", { class: "text-sm text-body-1" }, " Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain. ", -1)),
      createBaseVNode("div", _hoisted_1$1, [
        createVNode(VBtn, {
          color: "error",
          variant: "elevated",
          onClick: _ctx.confirmUserDeletion
        }, {
          default: withCtx(() => _cache[4] || (_cache[4] = [
            createTextVNode(" Delete Account ")
          ])),
          _: 1
        }, 8, ["onClick"])
      ]),
      createVNode(VDialog, {
        modelValue: _ctx.confirmingUserDeletion,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.confirmingUserDeletion = $event),
        "max-width": "500"
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_2$1, [
            _cache[7] || (_cache[7] = createBaseVNode("h2", { class: "text-lg font-bold" }, "Delete Account", -1)),
            _cache[8] || (_cache[8] = createBaseVNode("p", { class: "mt-2" }, "Are you sure you want to delete your account? This action cannot be undone. Please enter your password to confirm.", -1)),
            createVNode(VTextField, {
              ref: "passwordInput",
              modelValue: _ctx.form.password,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.form.password = $event),
              label: "Password",
              type: "password",
              variant: "outlined",
              class: "mt-4",
              autocomplete: "current-password",
              onKeyup: withKeys(_ctx.deleteUser, ["enter"])
            }, null, 8, ["modelValue", "onKeyup"]),
            createVNode(_component_InputError, {
              message: _ctx.form.errors.password,
              class: "mt-2"
            }, null, 8, ["message"]),
            createBaseVNode("div", _hoisted_3$1, [
              createVNode(VBtn, {
                variant: "text",
                onClick: _ctx.closeModal
              }, {
                default: withCtx(() => _cache[5] || (_cache[5] = [
                  createTextVNode("Cancel")
                ])),
                _: 1
              }, 8, ["onClick"]),
              createVNode(VBtn, {
                color: "error",
                variant: "elevated",
                class: "ms-3",
                loading: _ctx.loading,
                onClick: _ctx.deleteUser
              }, {
                default: withCtx(() => _cache[6] || (_cache[6] = [
                  createTextVNode(" Delete Account ")
                ])),
                _: 1
              }, 8, ["loading", "onClick"])
            ])
          ])
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  });
}
const DeleteUserForm2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let UpdatePasswordForm$1 = class UpdatePasswordForm extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "passwordInput");
    __publicField(this, "currentPasswordInput");
    __publicField(this, "form", C({
      current_password: "",
      password: "",
      password_confirmation: ""
    }));
  }
  async updatePassword() {
    var _a;
    try {
      let res = await profileService.updatePassword(this.form);
      this.form.reset();
      Wr.visit(res.redirect || "/login");
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
__decorateClass$1([
  decorator("passwordInput")
], UpdatePasswordForm$1.prototype, "passwordInput", 2);
__decorateClass$1([
  decorator("currentPasswordInput")
], UpdatePasswordForm$1.prototype, "currentPasswordInput", 2);
UpdatePasswordForm$1 = __decorateClass$1([
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
const _sfc_main$1 = toNative(UpdatePasswordForm$1);
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_InputError = resolveComponent("InputError");
  const _component_ActionMessage = resolveComponent("ActionMessage");
  const _component_FormSection = resolveComponent("FormSection");
  return openBlock(), createBlock(_component_FormSection, { onSubmitted: _ctx.updatePassword }, {
    title: withCtx(() => _cache[3] || (_cache[3] = [
      createTextVNode(" Update Password ")
    ])),
    description: withCtx(() => _cache[4] || (_cache[4] = [
      createTextVNode(" Ensure your account is using a long, random password to stay secure. ")
    ])),
    form: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                id: "current_password",
                ref: "currentPasswordInput",
                modelValue: _ctx.form.current_password,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.form.current_password = $event),
                label: "Current Password",
                type: "password",
                autocomplete: "current-password"
              }, null, 8, ["modelValue"]),
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
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                id: "password",
                ref: "passwordInput",
                modelValue: _ctx.form.password,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.form.password = $event),
                label: "New Password",
                type: "password",
                autocomplete: "new-password"
              }, null, 8, ["modelValue"]),
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
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                id: "password_confirmation",
                modelValue: _ctx.form.password_confirmation,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.form.password_confirmation = $event),
                label: "Confirm Password",
                type: "password",
                autocomplete: "new-password"
              }, null, 8, ["modelValue"]),
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
    ]),
    actions: withCtx(() => [
      createVNode(_component_ActionMessage, {
        on: _ctx.form.recentlySuccessful,
        class: "me-3"
      }, {
        default: withCtx(() => _cache[5] || (_cache[5] = [
          createTextVNode(" Saved. ")
        ])),
        _: 1
      }, 8, ["on"]),
      createVNode(VBtn, {
        color: "primary",
        variant: "elevated",
        type: "submit",
        disabled: _ctx.form.processing
      }, {
        default: withCtx(() => _cache[6] || (_cache[6] = [
          createTextVNode(" Save ")
        ])),
        _: 1
      }, 8, ["disabled"])
    ]),
    _: 1
  }, 8, ["onSubmitted"]);
}
const UpdatePasswordForm2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
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
let UpdateProfileInformationForm$1 = class UpdateProfileInformationForm extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "user", null);
    __publicField(this, "form", C({
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
  async updateProfileInformation() {
    var _a;
    if (this.photoInput) {
      this.form.photo = this.photoInput.files[0];
    }
    try {
      let res = await profileService.updateProfileInformation(this.form, this.photoInput.files[0]);
      this.clearPhotoFileInput();
      Wr.reload({ preserveScroll: true });
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
    await profileService.deletePhoto();
    this.photoPreview = null;
    this.clearPhotoFileInput();
    Wr.reload({ preserveScroll: true });
  }
  clearPhotoFileInput() {
    var _a;
    if ((_a = this.photoInput) == null ? void 0 : _a.value) {
      this.photoInput.value = null;
    }
  }
};
__decorateClass([
  decorator$1(Object)
], UpdateProfileInformationForm$1.prototype, "user", 2);
__decorateClass([
  decorator("photoInput")
], UpdateProfileInformationForm$1.prototype, "photoInput", 2);
UpdateProfileInformationForm$1 = __decorateClass([
  Component({
    components: {
      InputError,
      ActionMessage,
      FormSection,
      VTextField,
      VFileInput,
      VBtn,
      VCard,
      VImg,
      VAvatar,
      VRow,
      VCol
    }
  })
], UpdateProfileInformationForm$1);
const _sfc_main = toNative(UpdateProfileInformationForm$1);
const _hoisted_1 = { class: "mt-2" };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { class: "text-body-2 mt-2" };
const _hoisted_4 = { class: "mt-2 font-weight-bold text-green" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_InputError = resolveComponent("InputError");
  const _component_ActionMessage = resolveComponent("ActionMessage");
  const _component_FormSection = resolveComponent("FormSection");
  return openBlock(), createBlock(_component_FormSection, { onSubmitted: _ctx.updatePassword }, {
    title: withCtx(() => _cache[4] || (_cache[4] = [
      createTextVNode(" Profile Information ")
    ])),
    description: withCtx(() => _cache[5] || (_cache[5] = [
      createTextVNode(" Update your account's profile information and email address. ")
    ])),
    form: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            class: "d-flex flex-column"
          }, {
            default: withCtx(() => [
              createVNode(VFileInput, {
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
              createBaseVNode("div", _hoisted_1, [
                createVNode(VBtn, {
                  color: "secondary",
                  class: "me-2",
                  onClick: _cache[0] || (_cache[0] = withModifiers(($event) => {
                    var _a;
                    return (_a = _ctx.photoInput) == null ? void 0 : _a.click();
                  }, ["prevent"]))
                }, {
                  default: withCtx(() => _cache[6] || (_cache[6] = [
                    createTextVNode(" Select A New Photo ")
                  ])),
                  _: 1
                }),
                _ctx.user.profile_photo_path ? (openBlock(), createBlock(VBtn, {
                  key: 0,
                  color: "error",
                  onClick: withModifiers(_ctx.deletePhoto, ["prevent"])
                }, {
                  default: withCtx(() => _cache[7] || (_cache[7] = [
                    createTextVNode(" Remove Photo ")
                  ])),
                  _: 1
                }, 8, ["onClick"])) : createCommentVNode("", true)
              ]),
              createVNode(_component_InputError, {
                message: _ctx.form.errors.photo,
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
              createVNode(VTextField, {
                modelValue: _ctx.form.name,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.form.name = $event),
                label: "Name",
                required: "",
                autocomplete: "name"
              }, null, 8, ["modelValue"]),
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
              createVNode(VTextField, {
                modelValue: _ctx.form.email,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.form.email = $event),
                label: "Email",
                required: "",
                autocomplete: "username",
                type: "email"
              }, null, 8, ["modelValue"]),
              createVNode(_component_InputError, {
                message: _ctx.form.errors.email,
                class: "mt-2"
              }, null, 8, ["message"]),
              _ctx.$page.props.jetstream.hasEmailVerification && _ctx.user.email_verified_at === null ? (openBlock(), createElementBlock("div", _hoisted_2, [
                createBaseVNode("p", _hoisted_3, [
                  _cache[9] || (_cache[9] = createTextVNode(" Your email address is unverified. ")),
                  createVNode(VBtn, {
                    variant: "text",
                    onClick: _cache[3] || (_cache[3] = withModifiers(($event) => _ctx.verificationLinkSent = true, ["prevent"]))
                  }, {
                    default: withCtx(() => _cache[8] || (_cache[8] = [
                      createTextVNode("Click here to re-send the verification email.")
                    ])),
                    _: 1
                  })
                ]),
                withDirectives(createBaseVNode("div", _hoisted_4, " A new verification link has been sent to your email address. ", 512), [
                  [vShow, _ctx.verificationLinkSent]
                ])
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    actions: withCtx(() => [
      createVNode(_component_ActionMessage, {
        on: _ctx.form.recentlySuccessful,
        class: "me-3"
      }, {
        default: withCtx(() => _cache[10] || (_cache[10] = [
          createTextVNode(" Saved. ")
        ])),
        _: 1
      }, 8, ["on"]),
      createVNode(VBtn, {
        color: "primary",
        variant: "elevated",
        type: "submit",
        loading: _ctx.form.processing,
        onClick: _ctx.updateProfileInformation
      }, {
        default: withCtx(() => _cache[11] || (_cache[11] = [
          createTextVNode(" Save ")
        ])),
        _: 1
      }, 8, ["loading", "onClick"])
    ]),
    _: 1
  }, 8, ["onSubmitted"]);
}
const UpdateProfileInformationForm2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  DeleteUserForm2 as D,
  UpdatePasswordForm2 as U,
  UpdateProfileInformationForm2 as a,
  profileService as p
};
//# sourceMappingURL=UpdateProfileInformationForm-C5Q5wMP5.js.map
