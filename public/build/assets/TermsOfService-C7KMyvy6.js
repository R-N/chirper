import { c as createBlock, w as withCtx, o as openBlock, e as createVNode, a5 as unref } from "./app-CPu3B8nk.js";
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BVaAeieh.js";
import { G as GuestLayout } from "./GuestLayout-BN0Hy48d.js";
import { V as VContainer, a as VCard, d as VCardText } from "./GuestLayout.vue_vue_type_script_lang-B04FhGQk.js";
import "./forwardRefs-CUUEJ2GB.js";
const _sfc_main = {
  __name: "TermsOfService",
  props: {
    terms: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(GuestLayout, { title: "Terms of Service" }, {
        default: withCtx(() => [
          createVNode(unref(VContainer), { class: "d-flex flex-column align-center justify-center min-vh-100" }, {
            default: withCtx(() => [
              createVNode(_sfc_main$1),
              createVNode(unref(VCard), {
                class: "mt-6 pa-6 w-100 w-sm-75 w-md-50",
                elevation: "3"
              }, {
                default: withCtx(() => [
                  createVNode(unref(VCardText), { innerHTML: __props.terms }, null, 8, ["innerHTML"])
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
//# sourceMappingURL=TermsOfService-C7KMyvy6.js.map
