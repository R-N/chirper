import { p as propsFactory, O as makeThemeProps, k as genericComponent, P as provideTheme, Q as toRef, e as createVNode, j as createBlock, w as withCtx, o as openBlock, M as unref, f as createBaseVNode } from "./app-CJfxbgbM.js";
import { _ as _sfc_main$1 } from "./AuthenticationCardLogo-BRpu58oV.js";
import { G as GuestLayout } from "./GuestLayout-B1u4khSo.js";
import { m as makeBorderProps, b as makeComponentProps, c as makeDimensionProps, d as makeElevationProps, e as makeLocationProps, g as makePositionProps, h as makeRoundedProps, i as makeTagProps, j as useBackgroundColor, k as useBorder, l as useDimension, n as useElevation, o as useLocation, p as usePosition, q as useRounded, u as useRender } from "./forwardRefs-Db-_QBrT.js";
import { V as VContainer, a as VCard, b as VCardText } from "./GuestLayout.vue_vue_type_script_lang-D4vr3XMc.js";
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
//# sourceMappingURL=PrivacyPolicy-CwUbbcHr.js.map
