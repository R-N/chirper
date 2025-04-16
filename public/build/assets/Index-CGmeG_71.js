var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as AppLayout } from "./AppLayout-ZdPB0mmE.js";
import { C as Chirp, V as VTextarea } from "./Chirp-CKJXWRXr.js";
import { t as toNative, B as BaseView, C, f as findIndex, d as deleteFromArray, a as decorator, b as Component, _ as _export_sfc, r as resolveComponent, c as createBlock, w as withCtx, o as openBlock, e as createVNode, g as createBaseVNode, h as createTextVNode, i as withModifiers, j as createElementBlock, k as renderList, F as Fragment } from "./app-BV4qnAJ0.js";
import { c as chirpService } from "./chirp-Bq5TKW2g.js";
import { V as VContainer, a as VCard } from "./GuestLayout.vue_vue_type_script_lang-zdB9XH-z.js";
import { V as VBtn } from "./forwardRefs-DKU3reEu.js";
import "./Auth.vue_vue_type_script_lang-BB9WK6Yd.js";
import "./AuthenticationCardLogo-rBZHVFWH.js";
import "./VMenu-DrB7TcKV.js";
import "./VRow-CmhFhHM-.js";
import "./Login-3i_9cOB1.js";
import "./InputError-CxVZbwKm.js";
import "./VTextField-DCXUA7Y2.js";
import "./VCheckbox-DbAD9kDN.js";
import "./crud-C7kvoR_2.js";
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
  constructor() {
    super(...arguments);
    __publicField(this, "chirps", []);
    // Adjust the type as necessary for chirps
    // Form data
    __publicField(this, "form", C({
      message: ""
    }));
  }
  mounted() {
    this.appStore.breadcrumbs = [
      { title: "Chirps" }
    ];
  }
  async storeChirp() {
    let res = await chirpService.store(this.form);
    this.chirps.unshift(res.chirp);
    this.form.reset();
  }
  updateChirp(chirp) {
    const index = findIndex(this.chirps, chirp);
    if (index !== -1) {
      this.chirps[index] = chirp;
    }
  }
  destroyChirp(chirp) {
    deleteFromArray(this.chirps, chirp);
  }
};
__decorateClass([
  decorator({ type: Array })
], ChirpsPage.prototype, "chirps", 2);
ChirpsPage = __decorateClass([
  Component({
    components: {
      AppLayout,
      Chirp,
      VContainer,
      VTextarea,
      VBtn,
      VCard
    }
  })
], ChirpsPage);
const _sfc_main = toNative(ChirpsPage);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Chirp = resolveComponent("Chirp");
  const _component_AppLayout = resolveComponent("AppLayout");
  return openBlock(), createBlock(_component_AppLayout, { title: "Chirps" }, {
    default: withCtx(() => [
      createVNode(VContainer, { class: "max-w-2xl mx-auto p-4 sm:p-6 lg:p-8" }, {
        default: withCtx(() => [
          createBaseVNode("form", {
            onSubmit: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.storeChirp && _ctx.storeChirp(...args), ["prevent"]))
          }, [
            createVNode(VTextarea, {
              modelValue: _ctx.form.message,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.form.message = $event),
              label: "What's on your mind?",
              variant: "outlined"
            }, null, 8, ["modelValue"]),
            createVNode(VBtn, {
              class: "mt-4",
              color: "primary",
              type: "submit"
            }, {
              default: withCtx(() => _cache[2] || (_cache[2] = [
                createTextVNode("Chirp")
              ])),
              _: 1
            })
          ], 32),
          createVNode(VCard, { class: "mt-6" }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.chirps, (chirp) => {
                return openBlock(), createBlock(_component_Chirp, {
                  key: chirp.id,
                  chirp,
                  onDestroy: _ctx.destroyChirp,
                  onUpdate: _ctx.updateChirp
                }, null, 8, ["chirp", "onDestroy", "onUpdate"]);
              }), 128))
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
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Index as default
};
//# sourceMappingURL=Index-CGmeG_71.js.map
