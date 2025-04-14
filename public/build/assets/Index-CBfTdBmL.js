var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as AppLayout } from "./AppLayout-BTUHKS5A.js";
import { C as Chirp, V as VTextarea } from "./Chirp-BACAjuSQ.js";
import { t as toNative, V as Vue, C, a as api, d as decorator, b as Component, _ as _export_sfc, r as resolveComponent, c as createElementBlock, e as createVNode, w as withCtx, F as Fragment, o as openBlock, f as createBaseVNode, g as createTextVNode, h as withModifiers, i as renderList, j as createBlock } from "./app-CJfxbgbM.js";
import { V as VContainer, a as VCard } from "./GuestLayout.vue_vue_type_script_lang-D4vr3XMc.js";
import { V as VBtn } from "./forwardRefs-Db-_QBrT.js";
import "./Auth.vue_vue_type_script_lang-DhBczGcz.js";
import "./AuthenticationCardLogo-BRpu58oV.js";
import "./VMenu-B78fScza.js";
import "./VCol-DKYWie_M.js";
import "./Login-Bam6njN5.js";
import "./InputError-DG5XJAZt.js";
import "./VTextField-CsT5nxqZ.js";
import "./VCheckbox-Bv2SmIYc.js";
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
let ChirpsPage = class extends Vue {
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
  }
  async create() {
    let res = await api.post(route("chirps.store"), this.form);
    this.chirps.unshift(res.data.chirp);
    this.form.reset();
  }
  update(chirp) {
    const index = this.chirps.findIndex((chirp2) => chirp2.id === chirp2.id);
    if (index !== -1) {
      this.chirps[index] = chirp;
    }
  }
  remove(id) {
    const index = this.chirps.findIndex((chirp) => chirp.id === id);
    this.chirps.splice(index, 1);
  }
};
__decorateClass([
  decorator(Array)
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
  const _component_Head = resolveComponent("Head");
  const _component_Chirp = resolveComponent("Chirp");
  const _component_AppLayout = resolveComponent("AppLayout");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_Head, { title: "Chirps" }),
    createVNode(_component_AppLayout, null, {
      default: withCtx(() => [
        createVNode(VContainer, { class: "max-w-2xl mx-auto p-4 sm:p-6 lg:p-8" }, {
          default: withCtx(() => [
            createBaseVNode("form", {
              onSubmit: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.create && _ctx.create(...args), ["prevent"]))
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
                    onRemove: _ctx.remove,
                    onUpdate: _ctx.update
                  }, null, 8, ["chirp", "onRemove", "onUpdate"]);
                }), 128))
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ], 64);
}
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Index as default
};
//# sourceMappingURL=Index-CBfTdBmL.js.map
