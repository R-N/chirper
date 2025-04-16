var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as AppLayout } from "./AppLayout-ZdPB0mmE.js";
import { R as commonjsGlobal, S as getDefaultExportFromCjs, b as Component, t as toNative, T as emptyArray, a as decorator, U as decorator$1, W as decorator$2, p as propsFactory, l as genericComponent, n as ref, m as computed, q as watchEffect, e as createVNode, F as Fragment, E as mergeProps, X as humanReadableFileSize, Y as IconValue, Z as wrapInArray, $ as pick, a0 as useLocale, u as useProxiedModel, s as shallowRef, v as onMounted, a1 as onUnmounted, D as filterInputAttrs, _ as _export_sfc, o as openBlock, c as createBlock, w as withCtx, i as withModifiers, h as createTextVNode, N as toDisplayString, g as createBaseVNode, d as deleteFromArray, r as resolveComponent, B as BaseView } from "./app-BV4qnAJ0.js";
import { D as DialogBase, B as BaseCrudViewBase, S as SimpleInputDialog, b as BaseCrudView, E as EditableCellTextField, V as VDataTable, I as IconButton, C as ConfirmationIconButton } from "./ConfirmationIconButton-C9-GzBl4.js";
import { a as VCard, d as VCardTitle, b as VCardText, c as VCardActions, e as VSpacer, f as VDialog, V as VContainer } from "./GuestLayout.vue_vue_type_script_lang-zdB9XH-z.js";
import { V as VForm } from "./Login-3i_9cOB1.js";
import { u as useRender, b as VAvatar, c as VDefaultsProvider, V as VBtn, m as makeDelayProps, d as makeDensityProps, e as useDensity, a as VIcon, g as VOverlay } from "./forwardRefs-DKU3reEu.js";
import { m as makeVListItemProps, b as VListItem, c as makeVDividerProps, d as VDivider } from "./VMenu-DrB7TcKV.js";
import { m as makeVSheetProps, V as VSheet } from "./VSheet-BCg0-igm.js";
import { C as CrudService } from "./crud-C7kvoR_2.js";
import "./Auth.vue_vue_type_script_lang-BB9WK6Yd.js";
import "./AuthenticationCardLogo-rBZHVFWH.js";
import "./VRow-CmhFhHM-.js";
import "./InputError-CxVZbwKm.js";
import "./VTextField-DCXUA7Y2.js";
import "./VCheckbox-DbAD9kDN.js";
import "./VChip-CWGGNCwM.js";
var FileSaver_min$1 = { exports: {} };
var FileSaver_min = FileSaver_min$1.exports;
var hasRequiredFileSaver_min;
function requireFileSaver_min() {
  if (hasRequiredFileSaver_min) return FileSaver_min$1.exports;
  hasRequiredFileSaver_min = 1;
  (function(module, exports) {
    (function(a, b) {
      b();
    })(FileSaver_min, function() {
      function b(a2, b2) {
        return "undefined" == typeof b2 ? b2 = { autoBom: false } : "object" != typeof b2 && (console.warn("Deprecated: Expected third argument to be a object"), b2 = { autoBom: !b2 }), b2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a2.type) ? new Blob(["\uFEFF", a2], { type: a2.type }) : a2;
      }
      function c(a2, b2, c2) {
        var d2 = new XMLHttpRequest();
        d2.open("GET", a2), d2.responseType = "blob", d2.onload = function() {
          g(d2.response, b2, c2);
        }, d2.onerror = function() {
          console.error("could not download file");
        }, d2.send();
      }
      function d(a2) {
        var b2 = new XMLHttpRequest();
        b2.open("HEAD", a2, false);
        try {
          b2.send();
        } catch (a3) {
        }
        return 200 <= b2.status && 299 >= b2.status;
      }
      function e(a2) {
        try {
          a2.dispatchEvent(new MouseEvent("click"));
        } catch (c2) {
          var b2 = document.createEvent("MouseEvents");
          b2.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), a2.dispatchEvent(b2);
        }
      }
      var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof commonjsGlobal && commonjsGlobal.global === commonjsGlobal ? commonjsGlobal : void 0, a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || ("object" != typeof window || window !== f ? function() {
      } : "download" in HTMLAnchorElement.prototype && !a ? function(b2, g2, h) {
        var i = f.URL || f.webkitURL, j = document.createElement("a");
        g2 = g2 || b2.name || "download", j.download = g2, j.rel = "noopener", "string" == typeof b2 ? (j.href = b2, j.origin === location.origin ? e(j) : d(j.href) ? c(b2, g2, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b2), setTimeout(function() {
          i.revokeObjectURL(j.href);
        }, 4e4), setTimeout(function() {
          e(j);
        }, 0));
      } : "msSaveOrOpenBlob" in navigator ? function(f2, g2, h) {
        if (g2 = g2 || f2.name || "download", "string" != typeof f2) navigator.msSaveOrOpenBlob(b(f2, h), g2);
        else if (d(f2)) c(f2, g2, h);
        else {
          var i = document.createElement("a");
          i.href = f2, i.target = "_blank", setTimeout(function() {
            e(i);
          });
        }
      } : function(b2, d2, e2, g2) {
        if (g2 = g2 || open("", "_blank"), g2 && (g2.document.title = g2.document.body.innerText = "downloading..."), "string" == typeof b2) return c(b2, d2, e2);
        var h = "application/octet-stream" === b2.type, i = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
        if ((j || h && i || a) && "undefined" != typeof FileReader) {
          var k = new FileReader();
          k.onloadend = function() {
            var a2 = k.result;
            a2 = j ? a2 : a2.replace(/^data:[^;]*;/, "data:attachment/file;"), g2 ? g2.location.href = a2 : location = a2, g2 = null;
          }, k.readAsDataURL(b2);
        } else {
          var l = f.URL || f.webkitURL, m = l.createObjectURL(b2);
          g2 ? g2.location = m : location.href = m, g2 = null, setTimeout(function() {
            l.revokeObjectURL(m);
          }, 4e4);
        }
      });
      f.saveAs = g.saveAs = g, module.exports = g;
    });
  })(FileSaver_min$1);
  return FileSaver_min$1.exports;
}
var FileSaver_minExports = requireFileSaver_min();
const FileSaver = /* @__PURE__ */ getDefaultExportFromCjs(FileSaver_minExports);
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
let defaultBackendUrl = "https://chirper.test";
let FileUploadDialog$1 = class FileUploadDialog extends DialogBase {
  constructor() {
    super(...arguments);
    __publicField(this, "preUpload");
    __publicField(this, "onUpload");
    __publicField(this, "postUpload");
    __publicField(this, "title");
    __publicField(this, "text");
    __publicField(this, "dropText");
    __publicField(this, "browseText");
    __publicField(this, "label");
    __publicField(this, "dropUpload");
    __publicField(this, "acceptedFiles");
    __publicField(this, "mimeTypes");
    __publicField(this, "file", null);
    __publicField(this, "files", []);
    __publicField(this, "fromDrop", false);
    __publicField(this, "immediateUpload", false);
    __publicField(this, "myFileUpload");
  }
  get interactable() {
    return this.busy || !this.myDialog;
  }
  reset() {
    this.file = null;
    emptyArray(this.files);
  }
  async close() {
    if (typeof this.myDialog == "boolean" || this.myDialog instanceof Boolean) {
      this.myDialog = false;
    } else if (typeof this.myDialog == "string" || this.myDialog instanceof String) {
      this.myDialog = "";
    } else if (this.myDialog instanceof Object) {
      this.myDialog = null;
    } else if (this.myDialog instanceof Array) {
      this.myDialog.pop();
    }
  }
  get accept() {
    return `${this.acceptedFiles},${this.mimeTypes.join(",")}`;
  }
  get dropzoneOptions() {
    return {
      url: defaultBackendUrl + "/upload/",
      // params: this.dropzoneParams,
      maxFilesize: 1,
      clickable: false,
      uploadMultiple: false,
      autoProcessQueue: false,
      acceptedFiles: this.acceptedFiles,
      mimeTypes: this.mimeTypes
    };
  }
  async onFilesChanged(newFiles, oldFiles) {
    if (newFiles.length > 0 && this.immediateUpload) {
      this.onFileDropped(newFiles.shift());
    }
  }
  onFileDropped(file) {
    if (!this.file)
      this.file = file;
    else
      this.files.push(file);
    this.fromDrop = true;
  }
  onDialogFileDropped(file) {
    this.myFileUpload.removeFile(file);
    this.immediateUpload = this.dropUpload;
    this.onFileDropped(file);
  }
  async onFileChanged(file, old) {
    if (this.fromDrop) {
      if (file) {
        if (!file.accepted) {
          if (this.files.length == 0) {
            this.fromDrop = false;
            this.file = old;
          } else {
            this.file = this.files.shift();
          }
          this.appStore.showError("File invalid");
        } else if (this.immediateUpload) {
          await this.uploadFile();
          this.immediateUpload = false;
        }
      }
    }
  }
  async uploadFile() {
    const comp = this;
    comp.busy = true;
    if (comp.preUpload) comp.preUpload();
    try {
      if (!comp.file && comp.files.length) comp.file = comp.files.shift();
      while (comp.file || comp.files.length) {
        await comp.onUpload(comp.file);
        if (comp.files.length) {
          comp.file = comp.files.shift();
        } else {
          comp.file = null;
        }
      }
      comp.close();
    } catch (error) {
      comp.files.unshift(comp.file);
      comp.file = null;
      throw error;
    } finally {
      if (comp.postUpload) comp.postUpload();
      comp.busy = false;
    }
  }
};
__decorateClass$2([
  decorator({ type: Function })
], FileUploadDialog$1.prototype, "preUpload", 2);
__decorateClass$2([
  decorator({ type: Function })
], FileUploadDialog$1.prototype, "onUpload", 2);
__decorateClass$2([
  decorator({ type: Function })
], FileUploadDialog$1.prototype, "postUpload", 2);
__decorateClass$2([
  decorator({ default: "Upload File" })
], FileUploadDialog$1.prototype, "title", 2);
__decorateClass$2([
  decorator({ default: "Choose backup file to upload" })
], FileUploadDialog$1.prototype, "text", 2);
__decorateClass$2([
  decorator({ default: "Drop here" })
], FileUploadDialog$1.prototype, "dropText", 2);
__decorateClass$2([
  decorator({ default: "Browse" })
], FileUploadDialog$1.prototype, "browseText", 2);
__decorateClass$2([
  decorator({ default: "File" })
], FileUploadDialog$1.prototype, "label", 2);
__decorateClass$2([
  decorator({ default: true })
], FileUploadDialog$1.prototype, "dropUpload", 2);
__decorateClass$2([
  decorator({ default: "" })
], FileUploadDialog$1.prototype, "acceptedFiles", 2);
__decorateClass$2([
  decorator({ default: [] })
], FileUploadDialog$1.prototype, "mimeTypes", 2);
__decorateClass$2([
  decorator$1("myFileUpload")
], FileUploadDialog$1.prototype, "myFileUpload", 2);
__decorateClass$2([
  decorator$2("files")
], FileUploadDialog$1.prototype, "onFilesChanged", 1);
__decorateClass$2([
  decorator$2("file")
], FileUploadDialog$1.prototype, "onFileChanged", 1);
FileUploadDialog$1 = __decorateClass$2([
  Component({
    name: "FileUploadDialog",
    components: {}
  })
], FileUploadDialog$1);
const _sfc_main$2 = toNative(FileUploadDialog$1);
const makeVFileUploadItemProps = propsFactory({
  clearable: Boolean,
  file: {
    type: Object,
    default: null
  },
  fileIcon: {
    type: String,
    // TODO: setup up a proper aliased icon
    default: "mdi-file-document"
  },
  showSize: Boolean,
  ...makeVListItemProps({
    border: true,
    rounded: true,
    lines: "two"
  })
}, "VFileUploadItem");
const VFileUploadItem = genericComponent()({
  name: "VFileUploadItem",
  props: makeVFileUploadItemProps(),
  emits: {
    "click:remove": () => true,
    click: (e) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const preview = ref();
    const base = computed(() => typeof props.showSize !== "boolean" ? props.showSize : void 0);
    function onClickRemove() {
      emit("click:remove");
    }
    watchEffect(() => {
      var _a;
      preview.value = ((_a = props.file) == null ? void 0 : _a.type.startsWith("image")) ? URL.createObjectURL(props.file) : void 0;
    });
    useRender(() => {
      var _a, _b, _c;
      const listItemProps = VListItem.filterProps(props);
      return createVNode(VListItem, mergeProps(listItemProps, {
        "title": props.title ?? ((_a = props.file) == null ? void 0 : _a.name),
        "subtitle": props.showSize ? humanReadableFileSize((_b = props.file) == null ? void 0 : _b.size, base.value) : (_c = props.file) == null ? void 0 : _c.type,
        "class": "v-file-upload-item"
      }), {
        ...slots,
        prepend: (slotProps) => createVNode(Fragment, null, [!slots.prepend ? createVNode(VAvatar, {
          "icon": props.fileIcon,
          "image": preview.value,
          "rounded": true
        }, null) : createVNode(VDefaultsProvider, {
          "defaults": {
            VAvatar: {
              image: preview.value,
              icon: !preview.value ? props.fileIcon : void 0,
              rounded: true
            }
          }
        }, {
          default: () => {
            var _a2;
            return [((_a2 = slots.prepend) == null ? void 0 : _a2.call(slots, slotProps)) ?? createVNode(VAvatar, null, null)];
          }
        })]),
        append: (slotProps) => {
          var _a2;
          return createVNode(Fragment, null, [props.clearable && createVNode(Fragment, null, [!slots.clear ? createVNode(VBtn, {
            "icon": "$clear",
            "density": "comfortable",
            "variant": "text",
            "onClick": onClickRemove
          }, null) : createVNode(VDefaultsProvider, {
            "defaults": {
              VBtn: {
                icon: "$clear",
                density: "comfortable",
                variant: "text"
              }
            }
          }, {
            default: () => {
              var _a3;
              return [((_a3 = slots.clear) == null ? void 0 : _a3.call(slots, {
                ...slotProps,
                props: {
                  onClick: onClickRemove
                }
              })) ?? createVNode(VBtn, null, null)];
            }
          })]), (_a2 = slots.append) == null ? void 0 : _a2.call(slots, slotProps)]);
        }
      });
    });
  }
});
const makeVFileUploadProps = propsFactory({
  browseText: {
    type: String,
    default: "$vuetify.fileUpload.browse"
  },
  dividerText: {
    type: String,
    default: "$vuetify.fileUpload.divider"
  },
  title: {
    type: String,
    default: "$vuetify.fileUpload.title"
  },
  subtitle: String,
  icon: {
    type: IconValue,
    default: "$upload"
  },
  modelValue: {
    type: [Array, Object],
    default: null,
    validator: (val) => {
      return wrapInArray(val).every((v) => v != null && typeof v === "object");
    }
  },
  clearable: Boolean,
  disabled: Boolean,
  hideBrowse: Boolean,
  multiple: Boolean,
  scrim: {
    type: [Boolean, String],
    default: true
  },
  showSize: Boolean,
  name: String,
  ...makeDelayProps(),
  ...makeDensityProps(),
  ...pick(makeVDividerProps({
    length: 150
  }), ["length", "thickness", "opacity"]),
  ...makeVSheetProps()
}, "VFileUpload");
const VFileUpload = genericComponent()({
  name: "VFileUpload",
  inheritAttrs: false,
  props: makeVFileUploadProps(),
  emits: {
    "update:modelValue": (files) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      densityClasses
    } = useDensity(props);
    const model = useProxiedModel(props, "modelValue", props.modelValue, (val) => wrapInArray(val), (val) => props.multiple || Array.isArray(props.modelValue) ? val : val[0]);
    const dragOver = shallowRef(false);
    const vSheetRef = ref(null);
    const inputRef = ref(null);
    onMounted(() => {
      var _a, _b;
      (_a = vSheetRef.value) == null ? void 0 : _a.$el.addEventListener("dragover", onDragOver);
      (_b = vSheetRef.value) == null ? void 0 : _b.$el.addEventListener("drop", onDrop);
    });
    onUnmounted(() => {
      var _a, _b;
      (_a = vSheetRef.value) == null ? void 0 : _a.$el.removeEventListener("dragover", onDragOver);
      (_b = vSheetRef.value) == null ? void 0 : _b.$el.removeEventListener("drop", onDrop);
    });
    function onDragOver(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      dragOver.value = true;
    }
    function onDragLeave(e) {
      e.preventDefault();
      dragOver.value = false;
    }
    function onDrop(e) {
      var _a;
      e.preventDefault();
      e.stopImmediatePropagation();
      dragOver.value = false;
      const files = Array.from(((_a = e.dataTransfer) == null ? void 0 : _a.files) ?? []);
      if (!files.length) return;
      if (!props.multiple) {
        model.value = [files[0]];
        return;
      }
      const array = model.value.slice();
      for (const file of files) {
        if (!array.some((f) => f.name === file.name)) {
          array.push(file);
        }
      }
      model.value = array;
    }
    function onClick() {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.click();
    }
    function onClickRemove(index) {
      const newValue = model.value.filter((_, i) => i !== index);
      model.value = newValue;
      if (newValue.length > 0 || !inputRef.value) return;
      inputRef.value.value = "";
    }
    useRender(() => {
      const hasTitle = !!(slots.title || props.title);
      const hasIcon = !!(slots.icon || props.icon);
      const hasBrowse = !!(!props.hideBrowse && (slots.browse || props.density === "default"));
      const cardProps = VSheet.filterProps(props);
      const dividerProps = VDivider.filterProps(props);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const inputNode = createVNode("input", mergeProps({
        "ref": inputRef,
        "type": "file",
        "disabled": props.disabled,
        "multiple": props.multiple,
        "name": props.name,
        "onChange": (e) => {
          if (!e.target) return;
          const target = e.target;
          model.value = [...target.files ?? []];
        }
      }, inputAttrs), null);
      return createVNode(Fragment, null, [createVNode(VSheet, mergeProps({
        "ref": vSheetRef
      }, cardProps, {
        "class": ["v-file-upload", {
          "v-file-upload--clickable": !hasBrowse,
          "v-file-upload--disabled": props.disabled,
          "v-file-upload--dragging": dragOver.value
        }, densityClasses.value],
        "onDragleave": onDragLeave,
        "onDragover": onDragOver,
        "onDrop": onDrop,
        "onClick": !hasBrowse ? onClick : void 0
      }, rootAttrs), {
        default: () => {
          var _a, _b, _c;
          return [hasIcon && createVNode("div", {
            "key": "icon",
            "class": "v-file-upload-icon"
          }, [!slots.icon ? createVNode(VIcon, {
            "key": "icon-icon",
            "icon": props.icon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "icon-defaults",
            "defaults": {
              VIcon: {
                icon: props.icon
              }
            }
          }, {
            default: () => [slots.icon()]
          })]), hasTitle && createVNode("div", {
            "key": "title",
            "class": "v-file-upload-title"
          }, [((_a = slots.title) == null ? void 0 : _a.call(slots)) ?? t(props.title)]), props.density === "default" && createVNode(Fragment, null, [createVNode("div", {
            "key": "upload-divider",
            "class": "v-file-upload-divider"
          }, [((_b = slots.divider) == null ? void 0 : _b.call(slots)) ?? createVNode(VDivider, dividerProps, {
            default: () => [t(props.dividerText)]
          })]), hasBrowse && createVNode(Fragment, null, [!slots.browse ? createVNode(VBtn, {
            "readonly": props.disabled,
            "size": "large",
            "text": t(props.browseText),
            "variant": "tonal",
            "onClick": onClick
          }, null) : createVNode(VDefaultsProvider, {
            "defaults": {
              VBtn: {
                readonly: props.disabled,
                size: "large",
                text: t(props.browseText),
                variant: "tonal"
              }
            }
          }, {
            default: () => [slots.browse({
              props: {
                onClick
              }
            })]
          })]), props.subtitle && createVNode("div", {
            "class": "v-file-upload-subtitle"
          }, [props.subtitle])]), createVNode(VOverlay, {
            "model-value": dragOver.value,
            "contained": true,
            "scrim": props.scrim
          }, null), ((_c = slots.input) == null ? void 0 : _c.call(slots, {
            inputNode
          })) ?? inputNode];
        }
      }), model.value.length > 0 && createVNode("div", {
        "class": "v-file-upload-items"
      }, [model.value.map((file, i) => {
        const slotProps = {
          file,
          props: {
            "onClick:remove": () => onClickRemove(i)
          }
        };
        return createVNode(VDefaultsProvider, {
          "key": i,
          "defaults": {
            VFileUploadItem: {
              file,
              clearable: props.clearable,
              disabled: props.disabled,
              showSize: props.showSize
            }
          }
        }, {
          default: () => {
            var _a;
            return [((_a = slots.item) == null ? void 0 : _a.call(slots, slotProps)) ?? createVNode(VFileUploadItem, {
              "key": i,
              "onClick:remove": () => onClickRemove(i)
            }, slots)];
          }
        });
      })])]);
    });
  }
});
const _hoisted_1$1 = { class: "text-left" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VDialog, {
    modelValue: _ctx.myDialog,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.myDialog = $event),
    "max-width": "290",
    persistent: _ctx.busy
  }, {
    default: withCtx(() => [
      createVNode(VCard, { class: "pt-3 pb-3 pl-3 pr-3" }, {
        default: withCtx(() => [
          createVNode(VForm, {
            onSubmit: withModifiers(_ctx.uploadFile, ["prevent", "stop"])
          }, {
            default: withCtx(() => [
              createVNode(VCardTitle, { class: "headline" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.title), 1)
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createBaseVNode("p", _hoisted_1$1, toDisplayString(_ctx.text), 1),
                  createVNode(VFileUpload, {
                    clearable: "",
                    density: "compact",
                    variant: "compact",
                    ref: "myFileUpload",
                    modelValue: _ctx.files,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.files = $event),
                    "browse-text": _ctx.browseText,
                    title: _ctx.dropText,
                    accept: _ctx.accept,
                    multiple: true,
                    "show-size": "",
                    onChange: _ctx.onFilesChanged
                  }, null, 8, ["modelValue", "browse-text", "title", "accept", "onChange"])
                ]),
                _: 1
              }),
              createVNode(VCardActions, null, {
                default: withCtx(() => [
                  createVNode(VSpacer),
                  createVNode(VBtn, {
                    color: "green darken-1",
                    text: "",
                    onClick: _cache[1] || (_cache[1] = withModifiers(($event) => _ctx.close(), ["stop"])),
                    disabled: _ctx.interactable
                  }, {
                    default: withCtx(() => _cache[3] || (_cache[3] = [
                      createTextVNode(" Batal ")
                    ])),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(VBtn, {
                    color: "green darken-1",
                    text: "",
                    type: "submit",
                    disabled: _ctx.interactable,
                    loading: _ctx.busy
                  }, {
                    default: withCtx(() => _cache[4] || (_cache[4] = [
                      createTextVNode(" Upload ")
                    ])),
                    _: 1
                  }, 8, ["disabled", "loading"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["onSubmit"])
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["modelValue", "persistent"]);
}
const FileUploadDialog2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
class BackupService extends CrudService {
  constructor() {
    super(
      "Backup",
      "/system/backup",
      ["index", "create", "get", "put", "patch", "delete"],
      ["id"],
      ["file"]
    );
  }
}
const backupService = new BackupService();
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
let BackupView$1 = class BackupView extends BaseCrudViewBase {
  constructor() {
    super(...arguments);
    __publicField(this, "uploadDialog", false);
    __publicField(this, "formDialog", false);
  }
  get nameField() {
    return "id";
  }
  get itemName() {
    return "Backup";
  }
  get client() {
    return backupService;
  }
  get headers() {
    let headers = [
      { title: "File", value: "id" },
      { title: "Size", value: "size" },
      { title: "Last Modified", value: "modified" },
      { title: "Actions", value: "actions", sortable: false }
    ];
    return headers;
  }
  showForm(chirp = null) {
    this.editing = chirp;
    this.formDialog = true;
  }
  showUpload() {
    this.uploadDialog = true;
  }
  async createBackup(file_name) {
    console.log("Create backup " + file_name);
    const view = this;
    view.busy = true;
    try {
      let res = await backupService.create({ id: file_name });
      this.fetch();
    } catch (error) {
      view.showError(error);
    } finally {
      view.busy = false;
    }
  }
  async deleteBackup(item) {
    const view = this;
    view.busy = true;
    try {
      let res = await backupService.destroy(item);
      deleteFromArray(view.items, item);
    } catch (error) {
      view.showError(error);
    } finally {
      view.busy = false;
    }
  }
  restoreText(item) {
    return `Apa Anda yakin ingin me-restore backup '${item.id}'?`;
  }
  async restoreBackup(item) {
    const view = this;
    view.busy = true;
    try {
      let res = await backupService.put(item);
    } catch (error) {
      view.showError(error);
    } finally {
      view.busy = false;
    }
  }
  async downloadBackup(item) {
    const view = this;
    view.busy = true;
    try {
      let res = await backupService.get(item, { responseType: "blob" });
      FileSaver.saveAs(res, item.id);
    } catch (error) {
      view.showError(error);
    } finally {
      view.busy = false;
    }
  }
  async uploadBackup(file) {
    const view = this;
    view.busy = true;
    try {
      let res = await backupService.put(null, { file });
      this.items.push(res.backup);
    } catch (error) {
      view.showError(error);
    } finally {
      view.busy = false;
    }
  }
  async setId(backup, id) {
    const view = this;
    view.busy = true;
    try {
      let res = await backupService.set_id(backup, id);
      Object.assign(backup, res.backup);
    } catch (error) {
      view.showError(error);
    } finally {
      view.busy = false;
    }
  }
};
BackupView$1 = __decorateClass$1([
  Component({
    name: "BackupView",
    components: {
      FileUploadDialog: FileUploadDialog2,
      SimpleInputDialog,
      BaseCrudView,
      EditableCellTextField,
      VDataTable,
      IconButton,
      ConfirmationIconButton
    }
  })
], BackupView$1);
const _sfc_main$1 = toNative(BackupView$1);
const _hoisted_1 = { class: "ml-2 text-sm text-gray-600" };
const _hoisted_2 = { class: "ml-2 text-sm text-gray-600" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_IconButton = resolveComponent("IconButton");
  const _component_EditableCellTextField = resolveComponent("EditableCellTextField");
  const _component_ConfirmationIconButton = resolveComponent("ConfirmationIconButton");
  const _component_FileUploadDialog = resolveComponent("FileUploadDialog");
  const _component_SimpleInputDialog = resolveComponent("SimpleInputDialog");
  const _component_BaseCrudView = resolveComponent("BaseCrudView");
  return openBlock(), createBlock(_component_BaseCrudView, {
    title: "Backup",
    create: () => _ctx.showForm(),
    fetch: _ctx.fetch,
    "create-text": "Backup",
    search: _ctx.search,
    "onUpdate:search": _cache[3] || (_cache[3] = ($event) => _ctx.search = $event)
  }, {
    "toolbar-left": withCtx(() => [
      createVNode(_component_IconButton, {
        onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.uploadDialog = true, ["stop"])),
        disabled: _ctx.busy,
        icon: "mdi-upload",
        text: "Upload"
      }, null, 8, ["disabled"])
    ]),
    default: withCtx(() => [
      createVNode(VDataTable, {
        class: "backup-table",
        headers: _ctx.headers,
        items: _ctx.items,
        "item-key": "id",
        search: _ctx.search,
        loading: _ctx.busy
      }, {
        "item.id": withCtx(({ item }) => [
          createVNode(_component_EditableCellTextField, {
            name: "id",
            "confirm-text-maker": (value) => _ctx.setFieldConfirmText("id", item, value),
            value: item.id,
            "on-finish": (value) => _ctx.setId(item, value),
            disabled: _ctx.busy
          }, null, 8, ["confirm-text-maker", "value", "on-finish", "disabled"])
        ]),
        "item.size": withCtx(({ item }) => [
          createBaseVNode("small", _hoisted_1, toDisplayString(item.size), 1)
        ]),
        "item.modified": withCtx(({ item }) => [
          createBaseVNode("small", _hoisted_2, toDisplayString(item.modified), 1)
        ]),
        "item.actions": withCtx(({ item }) => [
          createVNode(_component_IconButton, {
            onClick: withModifiers(() => _ctx.downloadBackup(item), ["stop"]),
            disabled: _ctx.busy,
            icon: "mdi-download",
            text: "Download"
          }, null, 8, ["onClick", "disabled"]),
          createVNode(_component_ConfirmationIconButton, {
            icon: "mdi-restore",
            text: "Restore",
            confirmTextMaker: _ctx.restoreText(item),
            "on-confirm": () => _ctx.restoreBackup(item),
            disabled: _ctx.busy
          }, null, 8, ["confirmTextMaker", "on-confirm", "disabled"]),
          createVNode(_component_ConfirmationIconButton, {
            icon: "mdi-delete",
            text: "Delete",
            confirmTextMaker: _ctx.deleteConfirmText(item),
            "on-confirm": () => _ctx.deleteItem(item),
            ask: (ask) => _ctx.askDelete(item, ask),
            disabled: _ctx.busy
          }, null, 8, ["confirmTextMaker", "on-confirm", "ask", "disabled"])
        ]),
        _: 1
      }, 8, ["headers", "items", "search", "loading"]),
      createVNode(_component_FileUploadDialog, {
        modelValue: _ctx.uploadDialog,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.uploadDialog = $event),
        "on-upload": _ctx.uploadBackup,
        title: "Upload Backup",
        text: "Silahkan pilih file backup untuk diupload",
        label: "File backup",
        acceptedFiles: ".zip",
        mimeTypes: [
          "application/zip"
        ]
      }, null, 8, ["modelValue", "on-upload"]),
      createVNode(_component_SimpleInputDialog, {
        modelValue: _ctx.formDialog,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.formDialog = $event),
        "on-submit": _ctx.createBackup,
        title: "Buat Backup?",
        label: "Nama backup",
        noInput: "true"
      }, null, 8, ["modelValue", "on-submit"])
    ]),
    _: 1
  }, 8, ["create", "fetch", "search"]);
}
const BackupView2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-d5d94fa0"]]);
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
let BackupsPage = class extends BaseView {
  async mounted() {
    this.appStore.breadcrumbs = [
      { title: "System" },
      { title: "Backup" }
    ];
  }
};
BackupsPage = __decorateClass([
  Component({
    components: {
      AppLayout,
      BackupView: BackupView2
    }
  })
], BackupsPage);
const _sfc_main = toNative(BackupsPage);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_BackupView = resolveComponent("BackupView");
  const _component_AppLayout = resolveComponent("AppLayout");
  return openBlock(), createBlock(_component_AppLayout, { title: "Backup" }, {
    default: withCtx(() => [
      createVNode(VContainer, null, {
        default: withCtx(() => [
          createVNode(_component_BackupView)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Index as default
};
//# sourceMappingURL=Index-OD3Sn6aF.js.map
