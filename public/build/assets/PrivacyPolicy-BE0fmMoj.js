import { c as createBlock, w as withCtx, o as openBlock, e as createVNode, P as unref, g as createBaseVNode } from "./app-BV4qnAJ0.js";
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-rBZHVFWH.js";
import { G as GuestLayout } from "./GuestLayout-BRSQR84D.js";
import { V as VSheet } from "./VSheet-BCg0-igm.js";
import { V as VContainer, a as VCard, b as VCardText } from "./GuestLayout.vue_vue_type_script_lang-zdB9XH-z.js";
import "./forwardRefs-DKU3reEu.js";
const _hoisted_1 = ["innerHTML"];
const _sfc_main = {
  __name: "PrivacyPolicy",
  props: {
    policy: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(GuestLayout, { title: "Privacy Policy" }, {
        default: withCtx(() => [
          createVNode(unref(VSheet), { class: "d-flex flex-column align-center justify-center min-vh-100 py-6 bg-grey-lighten-3" }, {
            default: withCtx(() => [
              createVNode(_sfc_main$1),
              createVNode(unref(VContainer), { class: "mt-6 d-flex justify-center" }, {
                default: withCtx(() => [
                  createVNode(unref(VCard), { class: "w-100 sm:w-75 elevation-2 pa-6" }, {
                    default: withCtx(() => [
                      createVNode(unref(VCardText), null, {
                        default: withCtx(() => [
                          createBaseVNode("div", {
                            innerHTML: __props.policy,
                            class: "prose dark:prose-invert"
                          }, null, 8, _hoisted_1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
export {
  _sfc_main as default
};
//# sourceMappingURL=PrivacyPolicy-BE0fmMoj.js.map
