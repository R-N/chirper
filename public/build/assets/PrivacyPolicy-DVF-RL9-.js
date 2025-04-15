import { p as propsFactory, ac as makeThemeProps, l as genericComponent, ae as provideTheme, W as toRef, e as createVNode, c as createBlock, w as withCtx, o as openBlock, a5 as unref, g as createBaseVNode } from "./app-CPu3B8nk.js";
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BVaAeieh.js";
import { G as GuestLayout } from "./GuestLayout-BN0Hy48d.js";
import { k as makeBorderProps, m as makeComponentProps, c as makeDimensionProps, n as makeElevationProps, A as makeLocationProps, B as makePositionProps, o as makeRoundedProps, q as makeTagProps, v as useBackgroundColor, C as useBorder, d as useDimension, D as useElevation, E as useLocation, F as usePosition, G as useRounded, u as useRender } from "./forwardRefs-CUUEJ2GB.js";
import { V as VContainer, a as VCard, d as VCardText } from "./GuestLayout.vue_vue_type_script_lang-B04FhGQk.js";
const makeVSheetProps = propsFactory({
  color: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VSheet");
const VSheet = genericComponent()({
  name: "VSheet",
  props: makeVSheetProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    useRender(() => createVNode(props.tag, {
      "class": ["v-sheet", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, props.class],
      "style": [backgroundColorStyles.value, dimensionStyles.value, locationStyles.value, props.style]
    }, slots));
    return {};
  }
});
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
//# sourceMappingURL=PrivacyPolicy-DVF-RL9-.js.map
