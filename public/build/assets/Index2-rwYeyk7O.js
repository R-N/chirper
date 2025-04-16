var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as AppLayout } from "./AppLayout-ZdPB0mmE.js";
import { b as Component, t as toNative, C, a as decorator, M as decorator$1, _ as _export_sfc, r as resolveComponent, o as openBlock, c as createBlock, w as withCtx, e as createVNode, L as dayjs, B as BaseView } from "./app-BV4qnAJ0.js";
import { F as FormDialogBase, a as FormDialog, B as BaseCrudViewBase, b as BaseCrudView, E as EditableCellTextField, V as VDataTable, I as IconButton, C as ConfirmationIconButton } from "./ConfirmationIconButton-C9-GzBl4.js";
import { c as chirpService } from "./chirp-Bq5TKW2g.js";
import { V as VTextField } from "./VTextField-DCXUA7Y2.js";
import { V as VContainer } from "./GuestLayout.vue_vue_type_script_lang-zdB9XH-z.js";
import "./Auth.vue_vue_type_script_lang-BB9WK6Yd.js";
import "./AuthenticationCardLogo-rBZHVFWH.js";
import "./forwardRefs-DKU3reEu.js";
import "./VMenu-DrB7TcKV.js";
import "./VRow-CmhFhHM-.js";
import "./Login-3i_9cOB1.js";
import "./InputError-CxVZbwKm.js";
import "./VCheckbox-DbAD9kDN.js";
import "./VChip-CWGGNCwM.js";
import "./crud-C7kvoR_2.js";
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
let ChirpFormDialog$1 = class ChirpFormDialog extends FormDialogBase {
  constructor() {
    super(...arguments);
    __publicField(this, "data");
    __publicField(this, "form", C({
      message: ""
    }));
  }
  reset() {
    this.form.reset();
  }
  async submit() {
    if (!this.valid) return;
    const view = this;
    view.busy = true;
    try {
      let res = null;
      if (this.data) {
        res = await chirpService.update(this.data, this.form);
      } else {
        res = await chirpService.store(this.form);
      }
      view.emitSubmit(res.chirp);
      view.close();
    } finally {
      view.busy = false;
    }
  }
  emitSubmit(chirp) {
    return chirp;
  }
};
__decorateClass$2([
  decorator({ type: Object, default: null })
], ChirpFormDialog$1.prototype, "data", 2);
__decorateClass$2([
  decorator$1("submit")
], ChirpFormDialog$1.prototype, "emitSubmit", 1);
ChirpFormDialog$1 = __decorateClass$2([
  Component({
    name: "ChirpFormDialog",
    components: {
      FormDialog,
      VTextField
    },
    emits: ["submit"]
  })
], ChirpFormDialog$1);
const _sfc_main$1 = toNative(ChirpFormDialog$1);
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FormDialog = resolveComponent("FormDialog", true);
  return openBlock(), createBlock(_component_FormDialog, {
    "max-width": "400",
    "parent-busy": _ctx.busy,
    "on-submit": _ctx.submit,
    title: "Chirp",
    disabled: _ctx.disabled,
    "on-reset": _ctx.reset,
    modelValue: _ctx.myDialog,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.myDialog = $event)
  }, {
    fields: withCtx(({ interactable, busy }) => [
      createVNode(VTextField, {
        name: "message",
        class: "bigger-input",
        label: "Message",
        modelValue: _ctx.form.message,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.form.message = $event),
        disabled: !interactable,
        required: ""
      }, null, 8, ["modelValue", "disabled"])
    ]),
    _: 1
  }, 8, ["parent-busy", "on-submit", "disabled", "on-reset", "modelValue"]);
}
const ChirpFormDialog2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
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
let ChirpCrudView = class extends BaseCrudViewBase {
  constructor() {
    super(...arguments);
    __publicField(this, "editing", null);
  }
  get nameField() {
    return "created_at";
  }
  get itemName() {
    return "Chirp";
  }
  get client() {
    return chirpService;
  }
  get headers() {
    let headers = [
      { title: "User", value: "user" },
      { title: "Meessage", value: "message" },
      { title: "Created At", value: "created_at" },
      { title: "Actions", value: "actions" }
    ];
    return headers;
  }
  duration(time) {
    return dayjs(time).fromNow();
  }
  async setMessage(chirp, message) {
    const view = this;
    view.busy = true;
    try {
      let res = await chirpService.set_message(chirp, message);
      Object.assign(chirp, res.chirp);
    } catch (error) {
      view.showError(error);
    } finally {
      view.busy = false;
    }
  }
  showForm(chirp = null) {
    this.editing = chirp;
    this.formDialog = true;
  }
};
ChirpCrudView = __decorateClass$1([
  Component({
    name: "ChirpCrudView",
    components: {
      ChirpFormDialog: ChirpFormDialog2,
      BaseCrudView,
      EditableCellTextField,
      VDataTable,
      IconButton,
      ConfirmationIconButton
    }
  })
], ChirpCrudView);
toNative(ChirpCrudView);
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
let ChirpsPage = class extends BaseView {
  mounted() {
    this.appStore.breadcrumbs = [
      { title: "Chirps" }
    ];
  }
};
ChirpsPage = __decorateClass([
  Component({
    components: {
      AppLayout,
      ChirpCrudView
    }
  })
], ChirpsPage);
const _sfc_main = toNative(ChirpsPage);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ChirpCrudView = resolveComponent("ChirpCrudView");
  const _component_AppLayout = resolveComponent("AppLayout");
  return openBlock(), createBlock(_component_AppLayout, { title: "Chirps" }, {
    default: withCtx(() => [
      createVNode(VContainer, null, {
        default: withCtx(() => [
          createVNode(_component_ChirpCrudView)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const Index2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Index2 as default
};
//# sourceMappingURL=Index2-rwYeyk7O.js.map
