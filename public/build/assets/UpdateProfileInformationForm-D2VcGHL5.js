var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { a as ActionSection, A as ActionMessage, F as FormSection } from "./FormSection-CGmYcqWQ.js";
import { m as makeVInputProps, a as makeVFieldProps, u as useFocus, V as VInput, b as VField, c as VCounter, I as InputError } from "./InputError-DG5XJAZt.js";
import { p as propsFactory, a4 as IconValue, a5 as makeDisplayProps, k as genericComponent, a6 as useRtl, a7 as useDisplay, s as shallowRef, l as computed, a8 as useGoTo, a9 as IN_BROWSER, v as watch, e as createVNode, aa as focusableChildren, ab as deepEqual, O as makeThemeProps, P as provideTheme, ac as provideDefaults, Q as toRef, B as mergeProps, ad as EventProp, ae as useLocale, u as useProxiedModel, D as withDirectives, E as resolveDirective, af as vShow, F as Fragment, K as toDisplayString, ag as wrapInArray, m as ref, ah as humanReadableFileSize, A as filterInputAttrs, y as nextTick, H as callEvent, a as api, b as Component, t as toNative, V as Vue, C, Y as Wr, Z as decorator, _ as _export_sfc, r as resolveComponent, o as openBlock, j as createBlock, w as withCtx, g as createTextVNode, f as createBaseVNode, a1 as withKeys, d as decorator$1, L as createCommentVNode, h as withModifiers, c as createElementBlock } from "./app-CJfxbgbM.js";
import { g as VDialog, c as VRow, a as VCard } from "./GuestLayout.vue_vue_type_script_lang-D4vr3XMc.js";
import { V as VTextField } from "./VTextField-CsT5nxqZ.js";
import { b as makeComponentProps, i as makeTagProps, C as makeGroupProps, D as useGroup, E as useResizeObserver, u as useRender, F as VFadeTransition, a as VIcon, r as makeVariantProps, m as makeBorderProps, G as makeDensityProps, d as makeElevationProps, H as makeGroupItemProps, h as makeRoundedProps, J as makeRouterProps, K as makeSizeProps, R as Ripple, k as useBorder, v as useVariant, L as useDensity, n as useElevation, q as useRounded, M as useSize, N as useGroupItem, O as useLink, x as genOverlays, P as VExpandXTransition, z as VDefaultsProvider, Q as VAvatar, f as forwardRefs, V as VBtn, A as VImg } from "./forwardRefs-Db-_QBrT.js";
import { V as VCol } from "./VCol-DKYWie_M.js";
function calculateUpdatedTarget(_ref) {
  let {
    selectedElement,
    containerElement,
    isRtl,
    isHorizontal
  } = _ref;
  const containerSize = getOffsetSize(isHorizontal, containerElement);
  const scrollPosition = getScrollPosition(isHorizontal, isRtl, containerElement);
  const childrenSize = getOffsetSize(isHorizontal, selectedElement);
  const childrenStartPosition = getOffsetPosition(isHorizontal, selectedElement);
  const additionalOffset = childrenSize * 0.4;
  if (scrollPosition > childrenStartPosition) {
    return childrenStartPosition - additionalOffset;
  } else if (scrollPosition + containerSize < childrenStartPosition + childrenSize) {
    return childrenStartPosition - containerSize + childrenSize + additionalOffset;
  }
  return scrollPosition;
}
function calculateCenteredTarget(_ref2) {
  let {
    selectedElement,
    containerElement,
    isHorizontal
  } = _ref2;
  const containerOffsetSize = getOffsetSize(isHorizontal, containerElement);
  const childrenOffsetPosition = getOffsetPosition(isHorizontal, selectedElement);
  const childrenOffsetSize = getOffsetSize(isHorizontal, selectedElement);
  return childrenOffsetPosition - containerOffsetSize / 2 + childrenOffsetSize / 2;
}
function getScrollSize(isHorizontal, element) {
  const key = isHorizontal ? "scrollWidth" : "scrollHeight";
  return (element == null ? void 0 : element[key]) || 0;
}
function getClientSize(isHorizontal, element) {
  const key = isHorizontal ? "clientWidth" : "clientHeight";
  return (element == null ? void 0 : element[key]) || 0;
}
function getScrollPosition(isHorizontal, rtl, element) {
  if (!element) {
    return 0;
  }
  const {
    scrollLeft,
    offsetWidth,
    scrollWidth
  } = element;
  if (isHorizontal) {
    return rtl ? scrollWidth - offsetWidth + scrollLeft : scrollLeft;
  }
  return element.scrollTop;
}
function getOffsetSize(isHorizontal, element) {
  const key = isHorizontal ? "offsetWidth" : "offsetHeight";
  return (element == null ? void 0 : element[key]) || 0;
}
function getOffsetPosition(isHorizontal, element) {
  const key = isHorizontal ? "offsetLeft" : "offsetTop";
  return (element == null ? void 0 : element[key]) || 0;
}
const VSlideGroupSymbol = Symbol.for("vuetify:v-slide-group");
const makeVSlideGroupProps = propsFactory({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: VSlideGroupSymbol
  },
  nextIcon: {
    type: IconValue,
    default: "$next"
  },
  prevIcon: {
    type: IconValue,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (v) => typeof v === "boolean" || ["always", "desktop", "mobile"].includes(v)
  },
  ...makeComponentProps(),
  ...makeDisplayProps({
    mobile: null
  }),
  ...makeTagProps(),
  ...makeGroupProps({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup");
const VSlideGroup = genericComponent()({
  name: "VSlideGroup",
  props: makeVSlideGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const group = useGroup(props, props.symbol);
    const isOverflowing = shallowRef(false);
    const scrollOffset = shallowRef(0);
    const containerSize = shallowRef(0);
    const contentSize = shallowRef(0);
    const isHorizontal = computed(() => props.direction === "horizontal");
    const {
      resizeRef: containerRef,
      contentRect: containerRect
    } = useResizeObserver();
    const {
      resizeRef: contentRef,
      contentRect
    } = useResizeObserver();
    const goTo = useGoTo();
    const goToOptions = computed(() => {
      return {
        container: containerRef.el,
        duration: 200,
        easing: "easeOutQuart"
      };
    });
    const firstSelectedIndex = computed(() => {
      if (!group.selected.value.length) return -1;
      return group.items.value.findIndex((item) => item.id === group.selected.value[0]);
    });
    const lastSelectedIndex = computed(() => {
      if (!group.selected.value.length) return -1;
      return group.items.value.findIndex((item) => item.id === group.selected.value[group.selected.value.length - 1]);
    });
    if (IN_BROWSER) {
      let frame = -1;
      watch(() => [group.selected.value, containerRect.value, contentRect.value, isHorizontal.value], () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          if (containerRect.value && contentRect.value) {
            const sizeProperty = isHorizontal.value ? "width" : "height";
            containerSize.value = containerRect.value[sizeProperty];
            contentSize.value = contentRect.value[sizeProperty];
            isOverflowing.value = containerSize.value + 1 < contentSize.value;
          }
          if (firstSelectedIndex.value >= 0 && contentRef.el) {
            const selectedElement = contentRef.el.children[lastSelectedIndex.value];
            scrollToChildren(selectedElement, props.centerActive);
          }
        });
      });
    }
    const isFocused = shallowRef(false);
    function scrollToChildren(children, center) {
      let target = 0;
      if (center) {
        target = calculateCenteredTarget({
          containerElement: containerRef.el,
          isHorizontal: isHorizontal.value,
          selectedElement: children
        });
      } else {
        target = calculateUpdatedTarget({
          containerElement: containerRef.el,
          isHorizontal: isHorizontal.value,
          isRtl: isRtl.value,
          selectedElement: children
        });
      }
      scrollToPosition(target);
    }
    function scrollToPosition(newPosition) {
      if (!IN_BROWSER || !containerRef.el) return;
      const offsetSize = getOffsetSize(isHorizontal.value, containerRef.el);
      const scrollPosition = getScrollPosition(isHorizontal.value, isRtl.value, containerRef.el);
      const scrollSize = getScrollSize(isHorizontal.value, containerRef.el);
      if (scrollSize <= offsetSize || // Prevent scrolling by only a couple of pixels, which doesn't look smooth
      Math.abs(newPosition - scrollPosition) < 16) return;
      if (isHorizontal.value && isRtl.value && containerRef.el) {
        const {
          scrollWidth,
          offsetWidth: containerWidth
        } = containerRef.el;
        newPosition = scrollWidth - containerWidth - newPosition;
      }
      if (isHorizontal.value) {
        goTo.horizontal(newPosition, goToOptions.value);
      } else {
        goTo(newPosition, goToOptions.value);
      }
    }
    function onScroll(e) {
      const {
        scrollTop,
        scrollLeft
      } = e.target;
      scrollOffset.value = isHorizontal.value ? scrollLeft : scrollTop;
    }
    function onFocusin(e) {
      isFocused.value = true;
      if (!isOverflowing.value || !contentRef.el) return;
      for (const el of e.composedPath()) {
        for (const item of contentRef.el.children) {
          if (item === el) {
            scrollToChildren(item);
            return;
          }
        }
      }
    }
    function onFocusout(e) {
      isFocused.value = false;
    }
    let ignoreFocusEvent = false;
    function onFocus(e) {
      var _a;
      if (!ignoreFocusEvent && !isFocused.value && !(e.relatedTarget && ((_a = contentRef.el) == null ? void 0 : _a.contains(e.relatedTarget)))) focus();
      ignoreFocusEvent = false;
    }
    function onFocusAffixes() {
      ignoreFocusEvent = true;
    }
    function onKeydown(e) {
      if (!contentRef.el) return;
      function toFocus(location) {
        e.preventDefault();
        focus(location);
      }
      if (isHorizontal.value) {
        if (e.key === "ArrowRight") {
          toFocus(isRtl.value ? "prev" : "next");
        } else if (e.key === "ArrowLeft") {
          toFocus(isRtl.value ? "next" : "prev");
        }
      } else {
        if (e.key === "ArrowDown") {
          toFocus("next");
        } else if (e.key === "ArrowUp") {
          toFocus("prev");
        }
      }
      if (e.key === "Home") {
        toFocus("first");
      } else if (e.key === "End") {
        toFocus("last");
      }
    }
    function getSiblingElement(el, location) {
      if (!el) return void 0;
      let sibling = el;
      do {
        sibling = sibling == null ? void 0 : sibling[location === "next" ? "nextElementSibling" : "previousElementSibling"];
      } while (sibling == null ? void 0 : sibling.hasAttribute("disabled"));
      return sibling;
    }
    function focus(location) {
      if (!contentRef.el) return;
      let el;
      if (!location) {
        const focusable = focusableChildren(contentRef.el);
        el = focusable[0];
      } else if (location === "next") {
        el = getSiblingElement(contentRef.el.querySelector(":focus"), location);
        if (!el) return focus("first");
      } else if (location === "prev") {
        el = getSiblingElement(contentRef.el.querySelector(":focus"), location);
        if (!el) return focus("last");
      } else if (location === "first") {
        el = contentRef.el.firstElementChild;
        if (el == null ? void 0 : el.hasAttribute("disabled")) el = getSiblingElement(el, "next");
      } else if (location === "last") {
        el = contentRef.el.lastElementChild;
        if (el == null ? void 0 : el.hasAttribute("disabled")) el = getSiblingElement(el, "prev");
      }
      if (el) {
        el.focus({
          preventScroll: true
        });
      }
    }
    function scrollTo(location) {
      const direction = isHorizontal.value && isRtl.value ? -1 : 1;
      const offsetStep = (location === "prev" ? -direction : direction) * containerSize.value;
      let newPosition = scrollOffset.value + offsetStep;
      if (isHorizontal.value && isRtl.value && containerRef.el) {
        const {
          scrollWidth,
          offsetWidth: containerWidth
        } = containerRef.el;
        newPosition += scrollWidth - containerWidth;
      }
      scrollToPosition(newPosition);
    }
    const slotProps = computed(() => ({
      next: group.next,
      prev: group.prev,
      select: group.select,
      isSelected: group.isSelected
    }));
    const hasAffixes = computed(() => {
      switch (props.showArrows) {
        // Always show arrows on desktop & mobile
        case "always":
          return true;
        // Always show arrows on desktop
        case "desktop":
          return !mobile.value;
        // Show arrows on mobile when overflowing.
        // This matches the default 2.2 behavior
        case true:
          return isOverflowing.value || Math.abs(scrollOffset.value) > 0;
        // Always show on mobile
        case "mobile":
          return mobile.value || isOverflowing.value || Math.abs(scrollOffset.value) > 0;
        // https://material.io/components/tabs#scrollable-tabs
        // Always show arrows when
        // overflowed on desktop
        default:
          return !mobile.value && (isOverflowing.value || Math.abs(scrollOffset.value) > 0);
      }
    });
    const hasPrev = computed(() => {
      return Math.abs(scrollOffset.value) > 1;
    });
    const hasNext = computed(() => {
      if (!containerRef.value) return false;
      const scrollSize = getScrollSize(isHorizontal.value, containerRef.el);
      const clientSize = getClientSize(isHorizontal.value, containerRef.el);
      const scrollSizeMax = scrollSize - clientSize;
      return scrollSizeMax - Math.abs(scrollOffset.value) > 1;
    });
    useRender(() => createVNode(props.tag, {
      "class": ["v-slide-group", {
        "v-slide-group--vertical": !isHorizontal.value,
        "v-slide-group--has-affixes": hasAffixes.value,
        "v-slide-group--is-overflowing": isOverflowing.value
      }, displayClasses.value, props.class],
      "style": props.style,
      "tabindex": isFocused.value || group.selected.value.length ? -1 : 0,
      "onFocus": onFocus
    }, {
      default: () => {
        var _a, _b, _c;
        return [hasAffixes.value && createVNode("div", {
          "key": "prev",
          "class": ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !hasPrev.value
          }],
          "onMousedown": onFocusAffixes,
          "onClick": () => hasPrev.value && scrollTo("prev")
        }, [((_a = slots.prev) == null ? void 0 : _a.call(slots, slotProps.value)) ?? createVNode(VFadeTransition, null, {
          default: () => [createVNode(VIcon, {
            "icon": isRtl.value ? props.nextIcon : props.prevIcon
          }, null)]
        })]), createVNode("div", {
          "key": "container",
          "ref": containerRef,
          "class": "v-slide-group__container",
          "onScroll": onScroll
        }, [createVNode("div", {
          "ref": contentRef,
          "class": "v-slide-group__content",
          "onFocusin": onFocusin,
          "onFocusout": onFocusout,
          "onKeydown": onKeydown
        }, [(_b = slots.default) == null ? void 0 : _b.call(slots, slotProps.value)])]), hasAffixes.value && createVNode("div", {
          "key": "next",
          "class": ["v-slide-group__next", {
            "v-slide-group__next--disabled": !hasNext.value
          }],
          "onMousedown": onFocusAffixes,
          "onClick": () => hasNext.value && scrollTo("next")
        }, [((_c = slots.next) == null ? void 0 : _c.call(slots, slotProps.value)) ?? createVNode(VFadeTransition, null, {
          default: () => [createVNode(VIcon, {
            "icon": isRtl.value ? props.prevIcon : props.nextIcon
          }, null)]
        })])];
      }
    }));
    return {
      selected: group.selected,
      scrollTo,
      scrollOffset,
      focus,
      hasPrev,
      hasNext
    };
  }
});
const VChipGroupSymbol = Symbol.for("vuetify:v-chip-group");
const makeVChipGroupProps = propsFactory({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeVSlideGroupProps(),
  ...makeComponentProps(),
  ...makeGroupProps({
    selectedClass: "v-chip--selected"
  }),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "tonal"
  })
}, "VChipGroup");
genericComponent()({
  name: "VChipGroup",
  props: makeVChipGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VChipGroupSymbol);
    provideDefaults({
      VChip: {
        color: toRef(props, "color"),
        disabled: toRef(props, "disabled"),
        filter: toRef(props, "filter"),
        variant: toRef(props, "variant")
      }
    });
    useRender(() => {
      const slideGroupProps = VSlideGroup.filterProps(props);
      return createVNode(VSlideGroup, mergeProps(slideGroupProps, {
        "class": ["v-chip-group", {
          "v-chip-group--column": props.column
        }, themeClasses.value, props.class],
        "style": props.style
      }), {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots, {
            isSelected,
            select,
            next,
            prev,
            selected: selected.value
          })];
        }
      });
    });
    return {};
  }
});
const makeVChipProps = propsFactory({
  activeClass: String,
  appendAvatar: String,
  appendIcon: IconValue,
  closable: Boolean,
  closeIcon: {
    type: IconValue,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: IconValue,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  text: {
    type: [String, Number, Boolean],
    default: void 0
  },
  modelValue: {
    type: Boolean,
    default: true
  },
  onClick: EventProp(),
  onClickOnce: EventProp(),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "span"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "tonal"
  })
}, "VChip");
const VChip = genericComponent()({
  name: "VChip",
  directives: {
    Ripple
  },
  props: makeVChipProps(),
  emits: {
    "click:close": (e) => true,
    "update:modelValue": (value) => true,
    "group:selected": (val) => true,
    click: (e) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses
    } = useSize(props);
    const {
      themeClasses
    } = provideTheme(props);
    const isActive = useProxiedModel(props, "modelValue");
    const group = useGroupItem(props, VChipGroupSymbol, false);
    const link = useLink(props, attrs);
    const isLink = computed(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() => !props.disabled && props.link !== false && (!!group || props.link || link.isClickable.value));
    const closeProps = computed(() => ({
      "aria-label": t(props.closeLabel),
      onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        isActive.value = false;
        emit("click:close", e);
      }
    }));
    function onClick(e) {
      var _a;
      emit("click", e);
      if (!isClickable.value) return;
      (_a = link.navigate) == null ? void 0 : _a.call(link, e);
      group == null ? void 0 : group.toggle();
    }
    function onKeyDown(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(e);
      }
    }
    return () => {
      var _a;
      const Tag = link.isLink.value ? "a" : props.tag;
      const hasAppendMedia = !!(props.appendIcon || props.appendAvatar);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasClose = !!(slots.close || props.closable);
      const hasFilter = !!(slots.filter || props.filter) && group;
      const hasPrependMedia = !!(props.prependIcon || props.prependAvatar);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      const hasColor = !group || group.isSelected.value;
      return isActive.value && withDirectives(createVNode(Tag, mergeProps({
        "class": ["v-chip", {
          "v-chip--disabled": props.disabled,
          "v-chip--label": props.label,
          "v-chip--link": isClickable.value,
          "v-chip--filter": hasFilter,
          "v-chip--pill": props.pill,
          [`${props.activeClass}`]: props.activeClass && ((_a = link.isActive) == null ? void 0 : _a.value)
        }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : void 0, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, group == null ? void 0 : group.selectedClass.value, props.class],
        "style": [hasColor ? colorStyles.value : void 0, props.style],
        "disabled": props.disabled || void 0,
        "draggable": props.draggable,
        "tabindex": isClickable.value ? 0 : void 0,
        "onClick": onClick,
        "onKeydown": isClickable.value && !isLink.value && onKeyDown
      }, link.linkProps), {
        default: () => {
          var _a2;
          return [genOverlays(isClickable.value, "v-chip"), hasFilter && createVNode(VExpandXTransition, {
            "key": "filter"
          }, {
            default: () => [withDirectives(createVNode("div", {
              "class": "v-chip__filter"
            }, [!slots.filter ? createVNode(VIcon, {
              "key": "filter-icon",
              "icon": props.filterIcon
            }, null) : createVNode(VDefaultsProvider, {
              "key": "filter-defaults",
              "disabled": !props.filterIcon,
              "defaults": {
                VIcon: {
                  icon: props.filterIcon
                }
              }
            }, slots.filter)]), [[vShow, group.isSelected.value]])]
          }), hasPrepend && createVNode("div", {
            "key": "prepend",
            "class": "v-chip__prepend"
          }, [!slots.prepend ? createVNode(Fragment, null, [props.prependIcon && createVNode(VIcon, {
            "key": "prepend-icon",
            "icon": props.prependIcon,
            "start": true
          }, null), props.prependAvatar && createVNode(VAvatar, {
            "key": "prepend-avatar",
            "image": props.prependAvatar,
            "start": true
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !hasPrependMedia,
            "defaults": {
              VAvatar: {
                image: props.prependAvatar,
                start: true
              },
              VIcon: {
                icon: props.prependIcon,
                start: true
              }
            }
          }, slots.prepend)]), createVNode("div", {
            "class": "v-chip__content",
            "data-no-activator": ""
          }, [((_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
            isSelected: group == null ? void 0 : group.isSelected.value,
            selectedClass: group == null ? void 0 : group.selectedClass.value,
            select: group == null ? void 0 : group.select,
            toggle: group == null ? void 0 : group.toggle,
            value: group == null ? void 0 : group.value.value,
            disabled: props.disabled
          })) ?? toDisplayString(props.text)]), hasAppend && createVNode("div", {
            "key": "append",
            "class": "v-chip__append"
          }, [!slots.append ? createVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
            "key": "append-icon",
            "end": true,
            "icon": props.appendIcon
          }, null), props.appendAvatar && createVNode(VAvatar, {
            "key": "append-avatar",
            "end": true,
            "image": props.appendAvatar
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "disabled": !hasAppendMedia,
            "defaults": {
              VAvatar: {
                end: true,
                image: props.appendAvatar
              },
              VIcon: {
                end: true,
                icon: props.appendIcon
              }
            }
          }, slots.append)]), hasClose && createVNode("button", mergeProps({
            "key": "close",
            "class": "v-chip__close",
            "type": "button",
            "data-testid": "close-chip"
          }, closeProps.value), [!slots.close ? createVNode(VIcon, {
            "key": "close-icon",
            "icon": props.closeIcon,
            "size": "x-small"
          }, null) : createVNode(VDefaultsProvider, {
            "key": "close-defaults",
            "defaults": {
              VIcon: {
                icon: props.closeIcon,
                size: "x-small"
              }
            }
          }, slots.close)])];
        }
      }), [[resolveDirective("ripple"), isClickable.value && props.ripple, null]]);
    };
  }
});
const makeVFileInputProps = propsFactory({
  chips: Boolean,
  counter: Boolean,
  counterSizeString: {
    type: String,
    default: "$vuetify.fileInput.counterSize"
  },
  counterString: {
    type: String,
    default: "$vuetify.fileInput.counter"
  },
  hideInput: Boolean,
  multiple: Boolean,
  showSize: {
    type: [Boolean, Number, String],
    default: false,
    validator: (v) => {
      return typeof v === "boolean" || [1e3, 1024].includes(Number(v));
    }
  },
  ...makeVInputProps({
    prependIcon: "$file"
  }),
  modelValue: {
    type: [Array, Object],
    default: (props) => props.multiple ? [] : null,
    validator: (val) => {
      return wrapInArray(val).every((v) => v != null && typeof v === "object");
    }
  },
  ...makeVFieldProps({
    clearable: true
  })
}, "VFileInput");
const VFileInput = genericComponent()({
  name: "VFileInput",
  inheritAttrs: false,
  props: makeVFileInputProps(),
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (files) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const model = useProxiedModel(props, "modelValue", props.modelValue, (val) => wrapInArray(val), (val) => !props.multiple && Array.isArray(val) ? val[0] : val);
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const base = computed(() => typeof props.showSize !== "boolean" ? props.showSize : void 0);
    const totalBytes = computed(() => (model.value ?? []).reduce((bytes, _ref2) => {
      let {
        size = 0
      } = _ref2;
      return bytes + size;
    }, 0));
    const totalBytesReadable = computed(() => humanReadableFileSize(totalBytes.value, base.value));
    const fileNames = computed(() => (model.value ?? []).map((file) => {
      const {
        name = "",
        size = 0
      } = file;
      return !props.showSize ? name : `${name} (${humanReadableFileSize(size, base.value)})`;
    }));
    const counterValue = computed(() => {
      var _a;
      const fileCount = ((_a = model.value) == null ? void 0 : _a.length) ?? 0;
      if (props.showSize) return t(props.counterSizeString, fileCount, totalBytesReadable.value);
      else return t(props.counterString, fileCount);
    });
    const vInputRef = ref();
    const vFieldRef = ref();
    const inputRef = ref();
    const isActive = computed(() => isFocused.value || props.active);
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    function onFocus() {
      var _a;
      if (inputRef.value !== document.activeElement) {
        (_a = inputRef.value) == null ? void 0 : _a.focus();
      }
      if (!isFocused.value) focus();
    }
    function onClickPrepend(e) {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.click();
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
    }
    function onControlClick(e) {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.click();
      emit("click:control", e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = [];
        callEvent(props["onClick:clear"], e);
      });
    }
    function onDragover(e) {
      e.preventDefault();
    }
    function onDrop(e) {
      e.preventDefault();
      if (!e.dataTransfer) return;
      model.value = [...e.dataTransfer.files ?? []];
    }
    watch(model, (newValue) => {
      const hasModelReset = !Array.isArray(newValue) || !newValue.length;
      if (hasModelReset && inputRef.value) {
        inputRef.value.value = "";
      }
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = VField.filterProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": props.multiple ? model.value : model.value[0],
        "class": ["v-file-input", {
          "v-file-input--chips": !!props.chips,
          "v-file-input--hide": props.hideInput,
          "v-input--plain-underlined": isPlainOrUnderlined.value
        }, props.class],
        "style": props.style,
        "onClick:prepend": onClickPrepend
      }, rootAttrs, inputProps, {
        "centerAffix": !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref3) => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid
          } = _ref3;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "prepend-icon": props.prependIcon,
            "onMousedown": onControlMousedown,
            "onClick": onControlClick,
            "onClick:clear": onClear,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"]
          }, fieldProps, {
            "id": id.value,
            "active": isActive.value || isDirty.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "error": isValid.value === false,
            "onDragover": onDragover,
            "onDrop": onDrop
          }), {
            ...slots,
            default: (_ref4) => {
              var _a;
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref4;
              return createVNode(Fragment, null, [createVNode("input", mergeProps({
                "ref": inputRef,
                "type": "file",
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "multiple": props.multiple,
                "name": props.name,
                "onClick": (e) => {
                  e.stopPropagation();
                  if (isReadonly.value) e.preventDefault();
                  onFocus();
                },
                "onChange": (e) => {
                  if (!e.target) return;
                  const target = e.target;
                  model.value = [...target.files ?? []];
                },
                "onFocus": onFocus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), createVNode("div", {
                "class": fieldClass
              }, [!!((_a = model.value) == null ? void 0 : _a.length) && !props.hideInput && (slots.selection ? slots.selection({
                fileNames: fileNames.value,
                totalBytes: totalBytes.value,
                totalBytesReadable: totalBytesReadable.value
              }) : props.chips ? fileNames.value.map((text) => createVNode(VChip, {
                "key": text,
                "size": "small",
                "text": text
              }, null)) : fileNames.value.join(", "))])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => {
          var _a, _b;
          return createVNode(Fragment, null, [(_a = slots.details) == null ? void 0 : _a.call(slots, slotProps), hasCounter && createVNode(Fragment, null, [createVNode("span", null, null), createVNode(VCounter, {
            "active": !!((_b = model.value) == null ? void 0 : _b.length),
            "value": counterValue.value,
            "disabled": props.disabled
          }, slots.counter)])]);
        } : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, inputRef);
  }
});
class ProfileService {
  constructor(axios) {
    this.axios = axios || api;
  }
  async deleteUser(form) {
    let target = route("current-user.destroy");
    let res = await this.axios.delete(target, { data: form });
    return res.data;
  }
  async logoutOtherBrowserSessions(form) {
    let target = route("other-browser-sessions.destroy");
    let res = await this.axios.delete(target, { data: form });
    return res.data;
  }
  async updatePassword(form) {
    let target = route("user-password.update");
    let res = await this.axios.put(target, form);
    return res.data;
  }
  async _updateProfileInformation(form) {
    let res = await this.axios.patch(route("profile.update"), form);
    return res.data;
  }
  async updateProfileInformation(form, photo = null) {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    if (photo || form.photo) {
      formData.append("photo", photo || form.photo);
    }
    let res = await this.axios.post(route("user-profile-information.update"), formData, {
      headers: { "Content-Type": "multipart/form-data" },
      params: {
        // Laravel won't process multipart/form-data in a PUT request
        // So we send a POST request but spoof it as PUT
        _method: "PUT"
      }
    });
    return res.data;
  }
  async deletePhoto() {
    let res = await this.axios.delete(route("current-user-photo.destroy"));
    return res.data;
  }
  async verifyEmail(form) {
    let res = await this.axios.post(route("verification.send"), form);
    return res.data;
  }
}
const profileService = new ProfileService();
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
let DeleteUserForm$1 = class DeleteUserForm extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "confirmingUserDeletion", false);
    __publicField(this, "passwordInput");
    __publicField(this, "form", C({
      password: ""
    }));
  }
  confirmUserDeletion() {
    this.confirmingUserDeletion = true;
    nextTick(() => this.passwordInput.focus());
  }
  closeModal() {
    this.confirmingUserDeletion = false;
    this.form.clearErrors();
    this.form.reset();
  }
  async deleteUser() {
    try {
      let res = await profileService.deleteUser(this.form);
      this.closeModal();
      Wr.visit(res.redirect || "/");
    } catch (error) {
      this.passwordInput.focus();
    } finally {
      this.form.reset();
    }
  }
};
__decorateClass$2([
  decorator("passwordInput")
], DeleteUserForm$1.prototype, "passwordInput", 2);
DeleteUserForm$1 = __decorateClass$2([
  Component({
    components: {
      ActionSection,
      VDialog,
      VTextField,
      VBtn,
      InputError
    }
  })
], DeleteUserForm$1);
const _sfc_main$2 = toNative(DeleteUserForm$1);
const _hoisted_1$1 = { class: "mt-5" };
const _hoisted_2$1 = { class: "p-5" };
const _hoisted_3$1 = { class: "mt-4 d-flex justify-end" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_InputError = resolveComponent("InputError");
  const _component_ActionSection = resolveComponent("ActionSection");
  return openBlock(), createBlock(_component_ActionSection, null, {
    title: withCtx(() => _cache[2] || (_cache[2] = [
      createTextVNode(" Delete Account ")
    ])),
    description: withCtx(() => _cache[3] || (_cache[3] = [
      createTextVNode(" Permanently delete your account. ")
    ])),
    content: withCtx(() => [
      _cache[9] || (_cache[9] = createBaseVNode("p", { class: "text-sm text-body-1" }, " Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain. ", -1)),
      createBaseVNode("div", _hoisted_1$1, [
        createVNode(VBtn, {
          color: "error",
          variant: "elevated",
          onClick: _ctx.confirmUserDeletion
        }, {
          default: withCtx(() => _cache[4] || (_cache[4] = [
            createTextVNode(" Delete Account ")
          ])),
          _: 1
        }, 8, ["onClick"])
      ]),
      createVNode(VDialog, {
        modelValue: _ctx.confirmingUserDeletion,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.confirmingUserDeletion = $event),
        "max-width": "500"
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_2$1, [
            _cache[7] || (_cache[7] = createBaseVNode("h2", { class: "text-lg font-bold" }, "Delete Account", -1)),
            _cache[8] || (_cache[8] = createBaseVNode("p", { class: "mt-2" }, "Are you sure you want to delete your account? This action cannot be undone. Please enter your password to confirm.", -1)),
            createVNode(VTextField, {
              ref: "passwordInput",
              modelValue: _ctx.form.password,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.form.password = $event),
              label: "Password",
              type: "password",
              variant: "outlined",
              class: "mt-4",
              autocomplete: "current-password",
              onKeyup: withKeys(_ctx.deleteUser, ["enter"])
            }, null, 8, ["modelValue", "onKeyup"]),
            createVNode(_component_InputError, {
              message: _ctx.form.errors.password,
              class: "mt-2"
            }, null, 8, ["message"]),
            createBaseVNode("div", _hoisted_3$1, [
              createVNode(VBtn, {
                variant: "text",
                onClick: _ctx.closeModal
              }, {
                default: withCtx(() => _cache[5] || (_cache[5] = [
                  createTextVNode("Cancel")
                ])),
                _: 1
              }, 8, ["onClick"]),
              createVNode(VBtn, {
                color: "error",
                variant: "elevated",
                class: "ms-3",
                loading: _ctx.loading,
                onClick: _ctx.deleteUser
              }, {
                default: withCtx(() => _cache[6] || (_cache[6] = [
                  createTextVNode(" Delete Account ")
                ])),
                _: 1
              }, 8, ["loading", "onClick"])
            ])
          ])
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  });
}
const DeleteUserForm2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
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
let UpdatePasswordForm$1 = class UpdatePasswordForm extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "passwordInput");
    __publicField(this, "currentPasswordInput");
    __publicField(this, "form", C({
      current_password: "",
      password: "",
      password_confirmation: ""
    }));
  }
  async updatePassword() {
    var _a;
    try {
      let res = await profileService.updatePassword(this.form);
      this.form.reset();
      Wr.visit(res.redirect || "/login");
    } catch (error) {
      if (((_a = error.response) == null ? void 0 : _a.status) === 422) {
        this.form.errors = error.response.data.errors;
      } else {
        console.error("Unexpected error:", error);
      }
      if (this.form.errors.password) {
        this.form.reset("password", "password_confirmation");
        this.passwordInput.focus();
      }
      if (this.form.errors.current_password) {
        this.form.reset("current_password");
        this.currentPasswordInput.focus();
      }
    }
  }
};
__decorateClass$1([
  decorator("passwordInput")
], UpdatePasswordForm$1.prototype, "passwordInput", 2);
__decorateClass$1([
  decorator("currentPasswordInput")
], UpdatePasswordForm$1.prototype, "currentPasswordInput", 2);
UpdatePasswordForm$1 = __decorateClass$1([
  Component({
    components: {
      ActionMessage,
      FormSection,
      InputError,
      VTextField,
      VBtn,
      VRow,
      VCol
    }
  })
], UpdatePasswordForm$1);
const _sfc_main$1 = toNative(UpdatePasswordForm$1);
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_InputError = resolveComponent("InputError");
  const _component_ActionMessage = resolveComponent("ActionMessage");
  const _component_FormSection = resolveComponent("FormSection");
  return openBlock(), createBlock(_component_FormSection, { onSubmitted: _ctx.updatePassword }, {
    title: withCtx(() => _cache[3] || (_cache[3] = [
      createTextVNode(" Update Password ")
    ])),
    description: withCtx(() => _cache[4] || (_cache[4] = [
      createTextVNode(" Ensure your account is using a long, random password to stay secure. ")
    ])),
    form: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                id: "current_password",
                ref: "currentPasswordInput",
                modelValue: _ctx.form.current_password,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.form.current_password = $event),
                label: "Current Password",
                type: "password",
                autocomplete: "current-password"
              }, null, 8, ["modelValue"]),
              createVNode(_component_InputError, {
                message: _ctx.form.errors.current_password,
                class: "mt-2"
              }, null, 8, ["message"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                id: "password",
                ref: "passwordInput",
                modelValue: _ctx.form.password,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.form.password = $event),
                label: "New Password",
                type: "password",
                autocomplete: "new-password"
              }, null, 8, ["modelValue"]),
              createVNode(_component_InputError, {
                message: _ctx.form.errors.password,
                class: "mt-2"
              }, null, 8, ["message"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                id: "password_confirmation",
                modelValue: _ctx.form.password_confirmation,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.form.password_confirmation = $event),
                label: "Confirm Password",
                type: "password",
                autocomplete: "new-password"
              }, null, 8, ["modelValue"]),
              createVNode(_component_InputError, {
                message: _ctx.form.errors.password_confirmation,
                class: "mt-2"
              }, null, 8, ["message"])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    actions: withCtx(() => [
      createVNode(_component_ActionMessage, {
        on: _ctx.form.recentlySuccessful,
        class: "me-3"
      }, {
        default: withCtx(() => _cache[5] || (_cache[5] = [
          createTextVNode(" Saved. ")
        ])),
        _: 1
      }, 8, ["on"]),
      createVNode(VBtn, {
        color: "primary",
        variant: "elevated",
        type: "submit",
        disabled: _ctx.form.processing
      }, {
        default: withCtx(() => _cache[6] || (_cache[6] = [
          createTextVNode(" Save ")
        ])),
        _: 1
      }, 8, ["disabled"])
    ]),
    _: 1
  }, 8, ["onSubmitted"]);
}
const UpdatePasswordForm2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
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
let UpdateProfileInformationForm$1 = class UpdateProfileInformationForm extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "user", null);
    __publicField(this, "form", C({
      _method: "PUT",
      name: "",
      email: "",
      photo: null
    }));
    __publicField(this, "verificationLinkSent", null);
    __publicField(this, "photoPreview", null);
    __publicField(this, "photoInput");
  }
  mounted() {
    this.form.name = this.user.name;
    this.form.email = this.user.email;
  }
  async updateProfileInformation() {
    var _a;
    if (this.photoInput) {
      this.form.photo = this.photoInput.files[0];
    }
    try {
      let res = await profileService.updateProfileInformation(this.form, this.photoInput.files[0]);
      this.clearPhotoFileInput();
      Wr.reload({ preserveScroll: true });
    } catch (error) {
      if (((_a = error.response) == null ? void 0 : _a.status) === 422) {
        this.form.errors = error.response.data.errors;
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }
  sendEmailVerification() {
    this.verificationLinkSent = true;
  }
  selectNewPhoto() {
    this.photoInput.click();
  }
  async updatePhotoPreview() {
    const photo = this.photoInput.files[0];
    if (!photo) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.photoPreview = e.target.result;
    };
    return await reader.readAsDataURL(photo);
  }
  async deletePhoto() {
    await profileService.deletePhoto();
    this.photoPreview = null;
    this.clearPhotoFileInput();
    Wr.reload({ preserveScroll: true });
  }
  clearPhotoFileInput() {
    var _a;
    if ((_a = this.photoInput) == null ? void 0 : _a.value) {
      this.photoInput.value = null;
    }
  }
};
__decorateClass([
  decorator$1(Object)
], UpdateProfileInformationForm$1.prototype, "user", 2);
__decorateClass([
  decorator("photoInput")
], UpdateProfileInformationForm$1.prototype, "photoInput", 2);
UpdateProfileInformationForm$1 = __decorateClass([
  Component({
    components: {
      InputError,
      ActionMessage,
      FormSection,
      VTextField,
      VFileInput,
      VBtn,
      VCard,
      VImg,
      VAvatar,
      VRow,
      VCol
    }
  })
], UpdateProfileInformationForm$1);
const _sfc_main = toNative(UpdateProfileInformationForm$1);
const _hoisted_1 = { class: "mt-2" };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { class: "text-body-2 mt-2" };
const _hoisted_4 = { class: "mt-2 font-weight-bold text-green" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_InputError = resolveComponent("InputError");
  const _component_ActionMessage = resolveComponent("ActionMessage");
  const _component_FormSection = resolveComponent("FormSection");
  return openBlock(), createBlock(_component_FormSection, { onSubmitted: _ctx.updatePassword }, {
    title: withCtx(() => _cache[4] || (_cache[4] = [
      createTextVNode(" Profile Information ")
    ])),
    description: withCtx(() => _cache[5] || (_cache[5] = [
      createTextVNode(" Update your account's profile information and email address. ")
    ])),
    form: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            class: "d-flex flex-column"
          }, {
            default: withCtx(() => [
              createVNode(VFileInput, {
                id: "photo",
                class: "d-none",
                ref: "photoInput",
                label: "Photo",
                accept: "image/png, image/jpeg",
                onChange: _ctx.updatePhotoPreview
              }, null, 8, ["onChange"]),
              !_ctx.photoPreview ? (openBlock(), createBlock(VAvatar, {
                key: 0,
                image: _ctx.user.profile_photo_url,
                alt: _ctx.user.name,
                size: "80",
                cover: ""
              }, null, 8, ["image", "alt"])) : createCommentVNode("", true),
              _ctx.photoPreview ? (openBlock(), createBlock(VAvatar, {
                key: 1,
                image: _ctx.photoPreview,
                size: "80"
              }, null, 8, ["image"])) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_1, [
                createVNode(VBtn, {
                  color: "secondary",
                  class: "me-2",
                  onClick: _cache[0] || (_cache[0] = withModifiers(($event) => {
                    var _a;
                    return (_a = _ctx.photoInput) == null ? void 0 : _a.click();
                  }, ["prevent"]))
                }, {
                  default: withCtx(() => _cache[6] || (_cache[6] = [
                    createTextVNode(" Select A New Photo ")
                  ])),
                  _: 1
                }),
                _ctx.user.profile_photo_path ? (openBlock(), createBlock(VBtn, {
                  key: 0,
                  color: "error",
                  onClick: withModifiers(_ctx.deletePhoto, ["prevent"])
                }, {
                  default: withCtx(() => _cache[7] || (_cache[7] = [
                    createTextVNode(" Remove Photo ")
                  ])),
                  _: 1
                }, 8, ["onClick"])) : createCommentVNode("", true)
              ]),
              createVNode(_component_InputError, {
                message: _ctx.form.errors.photo,
                class: "mt-2"
              }, null, 8, ["message"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                modelValue: _ctx.form.name,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.form.name = $event),
                label: "Name",
                required: "",
                autocomplete: "name"
              }, null, 8, ["modelValue"]),
              createVNode(_component_InputError, {
                message: _ctx.form.errors.name,
                class: "mt-2"
              }, null, 8, ["message"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                modelValue: _ctx.form.email,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.form.email = $event),
                label: "Email",
                required: "",
                autocomplete: "username",
                type: "email"
              }, null, 8, ["modelValue"]),
              createVNode(_component_InputError, {
                message: _ctx.form.errors.email,
                class: "mt-2"
              }, null, 8, ["message"]),
              _ctx.$page.props.jetstream.hasEmailVerification && _ctx.user.email_verified_at === null ? (openBlock(), createElementBlock("div", _hoisted_2, [
                createBaseVNode("p", _hoisted_3, [
                  _cache[9] || (_cache[9] = createTextVNode(" Your email address is unverified. ")),
                  createVNode(VBtn, {
                    variant: "text",
                    onClick: _cache[3] || (_cache[3] = withModifiers(($event) => _ctx.verificationLinkSent = true, ["prevent"]))
                  }, {
                    default: withCtx(() => _cache[8] || (_cache[8] = [
                      createTextVNode("Click here to re-send the verification email.")
                    ])),
                    _: 1
                  })
                ]),
                withDirectives(createBaseVNode("div", _hoisted_4, " A new verification link has been sent to your email address. ", 512), [
                  [vShow, _ctx.verificationLinkSent]
                ])
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    actions: withCtx(() => [
      createVNode(_component_ActionMessage, {
        on: _ctx.form.recentlySuccessful,
        class: "me-3"
      }, {
        default: withCtx(() => _cache[10] || (_cache[10] = [
          createTextVNode(" Saved. ")
        ])),
        _: 1
      }, 8, ["on"]),
      createVNode(VBtn, {
        color: "primary",
        variant: "elevated",
        type: "submit",
        loading: _ctx.form.processing,
        onClick: _ctx.updateProfileInformation
      }, {
        default: withCtx(() => _cache[11] || (_cache[11] = [
          createTextVNode(" Save ")
        ])),
        _: 1
      }, 8, ["loading", "onClick"])
    ]),
    _: 1
  }, 8, ["onSubmitted"]);
}
const UpdateProfileInformationForm2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  DeleteUserForm2 as D,
  UpdatePasswordForm2 as U,
  UpdateProfileInformationForm2 as a,
  profileService as p
};
//# sourceMappingURL=UpdateProfileInformationForm-D2VcGHL5.js.map
