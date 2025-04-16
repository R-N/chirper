import { p as makeBorderProps, h as makeComponentProps, j as makeDimensionProps, q as makeElevationProps, B as makeLocationProps, C as makePositionProps, r as makeRoundedProps, t as makeTagProps, y as useBackgroundColor, D as useBorder, k as useDimension, E as useElevation, F as useLocation, G as usePosition, H as useRounded, u as useRender } from "./forwardRefs-DKU3reEu.js";
import { p as propsFactory, am as makeThemeProps, l as genericComponent, ao as provideTheme, a9 as toRef, e as createVNode } from "./app-BV4qnAJ0.js";
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
export {
  VSheet as V,
  makeVSheetProps as m
};
//# sourceMappingURL=VSheet-BCg0-igm.js.map
