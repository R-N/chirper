import { C as Chirp } from "./Chirp-CTKjf79B.js";
import { useSSRContext } from "vue";
import "./InputError-BNQz4Gj5.js";
import "vue-facing-decorator";
import "vuetify/components";
import "vue/server-renderer";
import "./axios-l-eSoL-p.js";
import "axios";
import "js-cookie";
import "vuetify/lib/components/VAlert/index.mjs";
import "vuetify/lib/components/transitions/index.mjs";
import "dayjs";
import "@inertiajs/vue3";
import "vuetify/lib/components/VBtn/index.mjs";
import "vuetify/lib/components/VIcon/index.mjs";
import "vuetify/lib/components/VList/index.mjs";
import "vuetify/lib/components/VMenu/index.mjs";
import "vuetify/lib/components/VTextarea/index.mjs";
const _sfc_setup = Chirp.setup;
Chirp.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Chirps/Chirp.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  Chirp as default
};
