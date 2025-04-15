var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { b as useResizeObserver, m as makeComponentProps, u as useRender, x as makeVOverlayProps, h as VDialogTransition, y as useScopeId, f as forwardRefs, z as VOverlay, j as VDefaultsProvider, q as makeTagProps, a7 as createSimpleFunctional, l as makeDensityProps, i as VAvatar, a as VIcon, k as makeBorderProps, c as makeDimensionProps, n as makeElevationProps, s as makeLoaderProps, A as makeLocationProps, B as makePositionProps, o as makeRoundedProps, S as makeRouterProps, r as makeVariantProps, T as Ripple, C as useBorder, H as useVariant, w as useDensity, d as useDimension, D as useElevation, t as useLoader, E as useLocation, F as usePosition, G as useRounded, X as useLink, M as VImg, L as LoaderSlot, J as genOverlays, Z as useSsrBoot, ac as VProgressCircular, V as VBtn } from "./forwardRefs-CUUEJ2GB.js";
import { p as propsFactory, a8 as inject, ao as getUid, U as getCurrentInstance, a7 as provide, s as shallowRef, aX as onDeactivated, b4 as onActivated, m as computed, y as onBeforeUnmount, n as ref, b5 as reactive, A as convertToUnit, v as onMounted, b6 as findChildrenWithProvide, ac as makeThemeProps, l as genericComponent, ae as provideTheme, ad as useRtl, e as createVNode, u as useProxiedModel, T as IN_BROWSER, x as watch, aI as focusableChildren, z as nextTick, D as mergeProps, af as provideDefaults, Y as IconValue, F as Fragment, M as toDisplayString, E as withDirectives, G as resolveDirective, b as Component, t as toNative, V as Vue, a as decorator, _ as _export_sfc, o as openBlock, j as createElementBlock, N as createCommentVNode, ap as renderSlot, as as MyComponent, c as createBlock, w as withCtx, b7 as normalizeClass, aq as WorkingComponent, aE as decorator$1, r as resolveComponent, L as decorator$2, h as createTextVNode, at as BaseView, g as createBaseVNode, aB as me } from "./app-CPu3B8nk.js";
const VuetifyLayoutKey = Symbol.for("vuetify:layout");
const VuetifyLayoutItemKey = Symbol.for("vuetify:layout-item");
const ROOT_ZINDEX = 1e3;
const makeLayoutProps = propsFactory({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, "layout");
const makeLayoutItemProps = propsFactory({
  name: {
    type: String
  },
  order: {
    type: [Number, String],
    default: 0
  },
  absolute: Boolean
}, "layout-item");
function useLayout() {
  const layout = inject(VuetifyLayoutKey);
  if (!layout) throw new Error("[Vuetify] Could not find injected layout");
  return {
    getLayoutItem: layout.getLayoutItem,
    mainRect: layout.mainRect,
    mainStyles: layout.mainStyles
  };
}
function useLayoutItem(options) {
  const layout = inject(VuetifyLayoutKey);
  if (!layout) throw new Error("[Vuetify] Could not find injected layout");
  const id = options.id ?? `layout-item-${getUid()}`;
  const vm = getCurrentInstance("useLayoutItem");
  provide(VuetifyLayoutItemKey, {
    id
  });
  const isKeptAlive = shallowRef(false);
  onDeactivated(() => isKeptAlive.value = true);
  onActivated(() => isKeptAlive.value = false);
  const {
    layoutItemStyles,
    layoutItemScrimStyles
  } = layout.register(vm, {
    ...options,
    active: computed(() => isKeptAlive.value ? false : options.active.value),
    id
  });
  onBeforeUnmount(() => layout.unregister(id));
  return {
    layoutItemStyles,
    layoutRect: layout.layoutRect,
    layoutItemScrimStyles
  };
}
const generateLayers = (layout, positions, layoutSizes, activeItems) => {
  let previousLayer = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  const layers = [{
    id: "",
    layer: {
      ...previousLayer
    }
  }];
  for (const id of layout) {
    const position = positions.get(id);
    const amount = layoutSizes.get(id);
    const active = activeItems.get(id);
    if (!position || !amount || !active) continue;
    const layer = {
      ...previousLayer,
      [position.value]: parseInt(previousLayer[position.value], 10) + (active.value ? parseInt(amount.value, 10) : 0)
    };
    layers.push({
      id,
      layer
    });
    previousLayer = layer;
  }
  return layers;
};
function createLayout(props) {
  const parentLayout = inject(VuetifyLayoutKey, null);
  const rootZIndex = computed(() => parentLayout ? parentLayout.rootZIndex.value - 100 : ROOT_ZINDEX);
  const registered = ref([]);
  const positions = reactive(/* @__PURE__ */ new Map());
  const layoutSizes = reactive(/* @__PURE__ */ new Map());
  const priorities = reactive(/* @__PURE__ */ new Map());
  const activeItems = reactive(/* @__PURE__ */ new Map());
  const disabledTransitions = reactive(/* @__PURE__ */ new Map());
  const {
    resizeRef,
    contentRect: layoutRect
  } = useResizeObserver();
  const computedOverlaps = computed(() => {
    const map = /* @__PURE__ */ new Map();
    const overlaps = props.overlaps ?? [];
    for (const overlap of overlaps.filter((item) => item.includes(":"))) {
      const [top, bottom] = overlap.split(":");
      if (!registered.value.includes(top) || !registered.value.includes(bottom)) continue;
      const topPosition = positions.get(top);
      const bottomPosition = positions.get(bottom);
      const topAmount = layoutSizes.get(top);
      const bottomAmount = layoutSizes.get(bottom);
      if (!topPosition || !bottomPosition || !topAmount || !bottomAmount) continue;
      map.set(bottom, {
        position: topPosition.value,
        amount: parseInt(topAmount.value, 10)
      });
      map.set(top, {
        position: bottomPosition.value,
        amount: -parseInt(bottomAmount.value, 10)
      });
    }
    return map;
  });
  const layers = computed(() => {
    const uniquePriorities = [...new Set([...priorities.values()].map((p) => p.value))].sort((a, b) => a - b);
    const layout = [];
    for (const p of uniquePriorities) {
      const items2 = registered.value.filter((id) => {
        var _a;
        return ((_a = priorities.get(id)) == null ? void 0 : _a.value) === p;
      });
      layout.push(...items2);
    }
    return generateLayers(layout, positions, layoutSizes, activeItems);
  });
  const transitionsEnabled = computed(() => {
    return !Array.from(disabledTransitions.values()).some((ref2) => ref2.value);
  });
  const mainRect = computed(() => {
    return layers.value[layers.value.length - 1].layer;
  });
  const mainStyles = computed(() => {
    return {
      "--v-layout-left": convertToUnit(mainRect.value.left),
      "--v-layout-right": convertToUnit(mainRect.value.right),
      "--v-layout-top": convertToUnit(mainRect.value.top),
      "--v-layout-bottom": convertToUnit(mainRect.value.bottom),
      ...transitionsEnabled.value ? void 0 : {
        transition: "none"
      }
    };
  });
  const items = computed(() => {
    return layers.value.slice(1).map((_ref, index) => {
      let {
        id
      } = _ref;
      const {
        layer
      } = layers.value[index];
      const size = layoutSizes.get(id);
      const position = positions.get(id);
      return {
        id,
        ...layer,
        size: Number(size.value),
        position: position.value
      };
    });
  });
  const getLayoutItem = (id) => {
    return items.value.find((item) => item.id === id);
  };
  const rootVm = getCurrentInstance("createLayout");
  const isMounted = shallowRef(false);
  onMounted(() => {
    isMounted.value = true;
  });
  provide(VuetifyLayoutKey, {
    register: (vm, _ref2) => {
      let {
        id,
        order,
        position,
        layoutSize,
        elementSize,
        active,
        disableTransitions,
        absolute
      } = _ref2;
      priorities.set(id, order);
      positions.set(id, position);
      layoutSizes.set(id, layoutSize);
      activeItems.set(id, active);
      disableTransitions && disabledTransitions.set(id, disableTransitions);
      const instances = findChildrenWithProvide(VuetifyLayoutItemKey, rootVm == null ? void 0 : rootVm.vnode);
      const instanceIndex = instances.indexOf(vm);
      if (instanceIndex > -1) registered.value.splice(instanceIndex, 0, id);
      else registered.value.push(id);
      const index = computed(() => items.value.findIndex((i) => i.id === id));
      const zIndex = computed(() => rootZIndex.value + layers.value.length * 2 - index.value * 2);
      const layoutItemStyles = computed(() => {
        const isHorizontal = position.value === "left" || position.value === "right";
        const isOppositeHorizontal = position.value === "right";
        const isOppositeVertical = position.value === "bottom";
        const size = elementSize.value ?? layoutSize.value;
        const unit = size === 0 ? "%" : "px";
        const styles = {
          [position.value]: 0,
          zIndex: zIndex.value,
          transform: `translate${isHorizontal ? "X" : "Y"}(${(active.value ? 0 : -(size === 0 ? 100 : size)) * (isOppositeHorizontal || isOppositeVertical ? -1 : 1)}${unit})`,
          position: absolute.value || rootZIndex.value !== ROOT_ZINDEX ? "absolute" : "fixed",
          ...transitionsEnabled.value ? void 0 : {
            transition: "none"
          }
        };
        if (!isMounted.value) return styles;
        const item = items.value[index.value];
        if (!item) throw new Error(`[Vuetify] Could not find layout item "${id}"`);
        const overlap = computedOverlaps.value.get(id);
        if (overlap) {
          item[overlap.position] += overlap.amount;
        }
        return {
          ...styles,
          height: isHorizontal ? `calc(100% - ${item.top}px - ${item.bottom}px)` : elementSize.value ? `${elementSize.value}px` : void 0,
          left: isOppositeHorizontal ? void 0 : `${item.left}px`,
          right: isOppositeHorizontal ? `${item.right}px` : void 0,
          top: position.value !== "bottom" ? `${item.top}px` : void 0,
          bottom: position.value !== "top" ? `${item.bottom}px` : void 0,
          width: !isHorizontal ? `calc(100% - ${item.left}px - ${item.right}px)` : elementSize.value ? `${elementSize.value}px` : void 0
        };
      });
      const layoutItemScrimStyles = computed(() => ({
        zIndex: zIndex.value - 1
      }));
      return {
        layoutItemStyles,
        layoutItemScrimStyles,
        zIndex
      };
    },
    unregister: (id) => {
      priorities.delete(id);
      positions.delete(id);
      layoutSizes.delete(id);
      activeItems.delete(id);
      disabledTransitions.delete(id);
      registered.value = registered.value.filter((v) => v !== id);
    },
    mainRect,
    mainStyles,
    getLayoutItem,
    items,
    layoutRect,
    rootZIndex
  });
  const layoutClasses = computed(() => ["v-layout", {
    "v-layout--full-height": props.fullHeight
  }]);
  const layoutStyles = computed(() => ({
    zIndex: parentLayout ? rootZIndex.value : void 0,
    position: parentLayout ? "relative" : void 0,
    overflow: parentLayout ? "hidden" : void 0
  }));
  return {
    layoutClasses,
    layoutStyles,
    getLayoutItem,
    items,
    layoutRect,
    layoutRef: resizeRef
  };
}
const makeVAppProps = propsFactory({
  ...makeComponentProps(),
  ...makeLayoutProps({
    fullHeight: true
  }),
  ...makeThemeProps()
}, "VApp");
const VApp = genericComponent()({
  name: "VApp",
  props: makeVAppProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const theme = provideTheme(props);
    const {
      layoutClasses,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout(props);
    const {
      rtlClasses
    } = useRtl();
    useRender(() => {
      var _a;
      return createVNode("div", {
        "ref": layoutRef,
        "class": ["v-application", theme.themeClasses.value, layoutClasses.value, rtlClasses.value, props.class],
        "style": [props.style]
      }, [createVNode("div", {
        "class": "v-application__wrap"
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    });
    return {
      getLayoutItem,
      items,
      theme
    };
  }
});
const makeVDialogProps = propsFactory({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: true
  },
  scrollable: Boolean,
  ...makeVOverlayProps({
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: VDialogTransition
    },
    zIndex: 2400
  })
}, "VDialog");
const VDialog = genericComponent()({
  name: "VDialog",
  props: makeVDialogProps(),
  emits: {
    "update:modelValue": (value) => true,
    afterEnter: () => true,
    afterLeave: () => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const overlay = ref();
    function onFocusin(e) {
      var _a, _b;
      const before = e.relatedTarget;
      const after = e.target;
      if (before !== after && ((_a = overlay.value) == null ? void 0 : _a.contentEl) && // We're the topmost dialog
      ((_b = overlay.value) == null ? void 0 : _b.globalTop) && // It isn't the document or the dialog body
      ![document, overlay.value.contentEl].includes(after) && // It isn't inside the dialog body
      !overlay.value.contentEl.contains(after)) {
        const focusable = focusableChildren(overlay.value.contentEl);
        if (!focusable.length) return;
        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];
        if (before === firstElement) {
          lastElement.focus();
        } else {
          firstElement.focus();
        }
      }
    }
    onBeforeUnmount(() => {
      document.removeEventListener("focusin", onFocusin);
    });
    if (IN_BROWSER) {
      watch(() => isActive.value && props.retainFocus, (val) => {
        val ? document.addEventListener("focusin", onFocusin) : document.removeEventListener("focusin", onFocusin);
      }, {
        immediate: true
      });
    }
    function onAfterEnter() {
      var _a;
      emit("afterEnter");
      if (((_a = overlay.value) == null ? void 0 : _a.contentEl) && !overlay.value.contentEl.contains(document.activeElement)) {
        overlay.value.contentEl.focus({
          preventScroll: true
        });
      }
    }
    function onAfterLeave() {
      emit("afterLeave");
    }
    watch(isActive, async (val) => {
      var _a;
      if (!val) {
        await nextTick();
        (_a = overlay.value.activatorEl) == null ? void 0 : _a.focus({
          preventScroll: true
        });
      }
    });
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      const activatorProps = mergeProps({
        "aria-haspopup": "dialog"
      }, props.activatorProps);
      const contentProps = mergeProps({
        tabindex: -1
      }, props.contentProps);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-dialog", {
          "v-dialog--fullscreen": props.fullscreen,
          "v-dialog--scrollable": props.scrollable
        }, props.class],
        "style": props.style
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "aria-modal": "true",
        "activatorProps": activatorProps,
        "contentProps": contentProps,
        "height": !props.fullscreen ? props.height : void 0,
        "width": !props.fullscreen ? props.width : void 0,
        "maxHeight": !props.fullscreen ? props.maxHeight : void 0,
        "maxWidth": !props.fullscreen ? props.maxWidth : void 0,
        "role": "dialog",
        "onAfterEnter": onAfterEnter,
        "onAfterLeave": onAfterLeave
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": "VDialog"
          }, {
            default: () => {
              var _a;
              return [(_a = slots.default) == null ? void 0 : _a.call(slots, ...args)];
            }
          });
        }
      });
    });
    return forwardRefs({}, overlay);
  }
});
const VCardActions = genericComponent()({
  name: "VCardActions",
  props: makeComponentProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    provideDefaults({
      VBtn: {
        slim: true,
        variant: "text"
      }
    });
    useRender(() => {
      var _a;
      return createVNode("div", {
        "class": ["v-card-actions", props.class],
        "style": props.style
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    });
    return {};
  }
});
const makeVCardSubtitleProps = propsFactory({
  opacity: [Number, String],
  ...makeComponentProps(),
  ...makeTagProps()
}, "VCardSubtitle");
const VCardSubtitle = genericComponent()({
  name: "VCardSubtitle",
  props: makeVCardSubtitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": ["v-card-subtitle", props.class],
      "style": [{
        "--v-card-subtitle-opacity": props.opacity
      }, props.style]
    }, slots));
    return {};
  }
});
const VCardTitle = createSimpleFunctional("v-card-title");
const makeCardItemProps = propsFactory({
  appendAvatar: String,
  appendIcon: IconValue,
  prependAvatar: String,
  prependIcon: IconValue,
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...makeComponentProps(),
  ...makeDensityProps()
}, "VCardItem");
const VCardItem = genericComponent()({
  name: "VCardItem",
  props: makeCardItemProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      var _a;
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasTitle = !!(props.title != null || slots.title);
      const hasSubtitle = !!(props.subtitle != null || slots.subtitle);
      return createVNode("div", {
        "class": ["v-card-item", props.class],
        "style": props.style
      }, [hasPrepend && createVNode("div", {
        "key": "prepend",
        "class": "v-card-item__prepend"
      }, [!slots.prepend ? createVNode(Fragment, null, [props.prependAvatar && createVNode(VAvatar, {
        "key": "prepend-avatar",
        "density": props.density,
        "image": props.prependAvatar
      }, null), props.prependIcon && createVNode(VIcon, {
        "key": "prepend-icon",
        "density": props.density,
        "icon": props.prependIcon
      }, null)]) : createVNode(VDefaultsProvider, {
        "key": "prepend-defaults",
        "disabled": !hasPrependMedia,
        "defaults": {
          VAvatar: {
            density: props.density,
            image: props.prependAvatar
          },
          VIcon: {
            density: props.density,
            icon: props.prependIcon
          }
        }
      }, slots.prepend)]), createVNode("div", {
        "class": "v-card-item__content"
      }, [hasTitle && createVNode(VCardTitle, {
        "key": "title"
      }, {
        default: () => {
          var _a2;
          return [((_a2 = slots.title) == null ? void 0 : _a2.call(slots)) ?? toDisplayString(props.title)];
        }
      }), hasSubtitle && createVNode(VCardSubtitle, {
        "key": "subtitle"
      }, {
        default: () => {
          var _a2;
          return [((_a2 = slots.subtitle) == null ? void 0 : _a2.call(slots)) ?? toDisplayString(props.subtitle)];
        }
      }), (_a = slots.default) == null ? void 0 : _a.call(slots)]), hasAppend && createVNode("div", {
        "key": "append",
        "class": "v-card-item__append"
      }, [!slots.append ? createVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
        "key": "append-icon",
        "density": props.density,
        "icon": props.appendIcon
      }, null), props.appendAvatar && createVNode(VAvatar, {
        "key": "append-avatar",
        "density": props.density,
        "image": props.appendAvatar
      }, null)]) : createVNode(VDefaultsProvider, {
        "key": "append-defaults",
        "disabled": !hasAppendMedia,
        "defaults": {
          VAvatar: {
            density: props.density,
            image: props.appendAvatar
          },
          VIcon: {
            density: props.density,
            icon: props.appendIcon
          }
        }
      }, slots.append)])]);
    });
    return {};
  }
});
const makeVCardTextProps = propsFactory({
  opacity: [Number, String],
  ...makeComponentProps(),
  ...makeTagProps()
}, "VCardText");
const VCardText = genericComponent()({
  name: "VCardText",
  props: makeVCardTextProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": ["v-card-text", props.class],
      "style": [{
        "--v-card-text-opacity": props.opacity
      }, props.style]
    }, slots));
    return {};
  }
});
const makeVCardProps = propsFactory({
  appendAvatar: String,
  appendIcon: IconValue,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  text: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLoaderProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "elevated"
  })
}, "VCard");
const VCard = genericComponent()({
  name: "VCard",
  directives: {
    Ripple
  },
  props: makeVCardProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
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
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const link = useLink(props, attrs);
    const isLink = computed(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value));
    useRender(() => {
      const Tag = isLink.value ? "a" : props.tag;
      const hasTitle = !!(slots.title || props.title != null);
      const hasSubtitle = !!(slots.subtitle || props.subtitle != null);
      const hasHeader = hasTitle || hasSubtitle;
      const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
      const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
      const hasImage = !!(slots.image || props.image);
      const hasCardItem = hasHeader || hasPrepend || hasAppend;
      const hasText = !!(slots.text || props.text != null);
      return withDirectives(createVNode(Tag, mergeProps({
        "class": ["v-card", {
          "v-card--disabled": props.disabled,
          "v-card--flat": props.flat,
          "v-card--hover": props.hover && !(props.disabled || props.flat),
          "v-card--link": isClickable.value
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value, props.class],
        "style": [colorStyles.value, dimensionStyles.value, locationStyles.value, props.style],
        "onClick": isClickable.value && link.navigate,
        "tabindex": props.disabled ? -1 : void 0
      }, link.linkProps), {
        default: () => {
          var _a;
          return [hasImage && createVNode("div", {
            "key": "image",
            "class": "v-card__image"
          }, [!slots.image ? createVNode(VImg, {
            "key": "image-img",
            "cover": true,
            "src": props.image
          }, null) : createVNode(VDefaultsProvider, {
            "key": "image-defaults",
            "disabled": !props.image,
            "defaults": {
              VImg: {
                cover: true,
                src: props.image
              }
            }
          }, slots.image)]), createVNode(LoaderSlot, {
            "name": "v-card",
            "active": !!props.loading,
            "color": typeof props.loading === "boolean" ? void 0 : props.loading
          }, {
            default: slots.loader
          }), hasCardItem && createVNode(VCardItem, {
            "key": "item",
            "prependAvatar": props.prependAvatar,
            "prependIcon": props.prependIcon,
            "title": props.title,
            "subtitle": props.subtitle,
            "appendAvatar": props.appendAvatar,
            "appendIcon": props.appendIcon
          }, {
            default: slots.item,
            prepend: slots.prepend,
            title: slots.title,
            subtitle: slots.subtitle,
            append: slots.append
          }), hasText && createVNode(VCardText, {
            "key": "text"
          }, {
            default: () => {
              var _a2;
              return [((_a2 = slots.text) == null ? void 0 : _a2.call(slots)) ?? props.text];
            }
          }), (_a = slots.default) == null ? void 0 : _a.call(slots), slots.actions && createVNode(VCardActions, null, {
            default: slots.actions
          }), genOverlays(isClickable.value, "v-card")];
        }
      }), [[resolveDirective("ripple"), isClickable.value && props.ripple]]);
    });
    return {};
  }
});
const makeVContainerProps = propsFactory({
  fluid: {
    type: Boolean,
    default: false
  },
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeTagProps()
}, "VContainer");
const VContainer = genericComponent()({
  name: "VContainer",
  props: makeVContainerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      rtlClasses
    } = useRtl();
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => createVNode(props.tag, {
      "class": ["v-container", {
        "v-container--fluid": props.fluid
      }, rtlClasses.value, props.class],
      "style": [dimensionStyles.value, props.style]
    }, slots));
    return {};
  }
});
const VSpacer = createSimpleFunctional("v-spacer", "div", "VSpacer");
const makeVMainProps = propsFactory({
  scrollable: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeTagProps({
    tag: "main"
  })
}, "VMain");
const VMain = genericComponent()({
  name: "VMain",
  props: makeVMainProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      mainStyles
    } = useLayout();
    const {
      ssrBootStyles
    } = useSsrBoot();
    useRender(() => createVNode(props.tag, {
      "class": ["v-main", {
        "v-main--scrollable": props.scrollable
      }, props.class],
      "style": [mainStyles.value, ssrBootStyles.value, dimensionStyles.value, props.style]
    }, {
      default: () => {
        var _a, _b;
        return [props.scrollable ? createVNode("div", {
          "class": "v-main__scroller"
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]) : (_b = slots.default) == null ? void 0 : _b.call(slots)];
      }
    }));
    return {};
  }
});
var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$6(target, key, result);
  return result;
};
let ImageBackground$1 = class ImageBackground extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "src");
  }
};
__decorateClass$6([
  decorator({ type: String })
], ImageBackground$1.prototype, "src", 2);
ImageBackground$1 = __decorateClass$6([
  Component({
    name: "ImageBackground"
  })
], ImageBackground$1);
const _sfc_main$6 = toNative(ImageBackground$1);
const _hoisted_1 = ["src"];
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    _ctx.src ? (openBlock(), createElementBlock("img", {
      key: 0,
      class: "bg",
      src: _ctx.src
    }, null, 8, _hoisted_1)) : createCommentVNode("", true),
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 64);
}
const ImageBackground2 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$4], ["__scopeId", "data-v-d4e3adbb"]]);
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$5(target, key, result);
  return result;
};
let RefreshButton = class extends MyComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "icon");
    __publicField(this, "large");
  }
  async refresh() {
    this.appStore.setRouterBusy(true);
    if (!this.appStore.globalBusy && !this.appStore.authBusy) {
      window.location.reload();
    } else {
      this.appStore.setAuthBusy(false);
      this.appStore.setGlobalBusy(false);
      this.appStore.setGlobalRefresh(true);
    }
  }
};
__decorateClass$5([
  decorator({ default: true })
], RefreshButton.prototype, "icon", 2);
__decorateClass$5([
  decorator({ default: true })
], RefreshButton.prototype, "large", 2);
RefreshButton = __decorateClass$5([
  Component({
    name: "RefreshButton"
  })
], RefreshButton);
const _sfc_main$5 = toNative(RefreshButton);
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$4(target, key, result);
  return result;
};
let CenterLayout$1 = class CenterLayout extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "class");
    __publicField(this, "fillHeight");
    __publicField(this, "column");
    __publicField(this, "baseClass", "d-flex justify-center align-center flex-grow-1");
  }
  get myClass() {
    let _class = `${this.baseClass} ${this.class} flex-column`;
    if (this.column)
      _class = `${_class} flex-column`;
    if (this.fillHeight)
      _class = `${_class} fill-height`;
    return _class;
  }
};
__decorateClass$4([
  decorator({ default: "" })
], CenterLayout$1.prototype, "class", 2);
__decorateClass$4([
  decorator({ default: true })
], CenterLayout$1.prototype, "fillHeight", 2);
__decorateClass$4([
  decorator({ default: false })
], CenterLayout$1.prototype, "column", 2);
CenterLayout$1 = __decorateClass$4([
  Component({
    name: "CenterLayout"
  })
], CenterLayout$1);
const _sfc_main$4 = toNative(CenterLayout$1);
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VContainer, {
    align: "center",
    justify: "center",
    class: normalizeClass(_ctx.myClass),
    fluid: ""
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
const CenterLayout2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3]]);
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$3(target, key, result);
  return result;
};
let LoadingOverlay$1 = class LoadingOverlay extends WorkingComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "circleSizeRefresh");
    __publicField(this, "circleSizeNormal");
    __publicField(this, "mayRefreshWait");
    __publicField(this, "mayRefresh", false);
    __publicField(this, "mayRefreshTimer", null);
  }
  mounted() {
    this.setTimer(this.busy);
  }
  get mayRefreshWaitMillis() {
    return this.mayRefreshWait * 1e3;
  }
  get circleSize() {
    return this.mayRefresh ? this.circleSizeRefresh : this.circleSizeNormal;
  }
  onBusyChanged(val, oldVal) {
    if (val != oldVal) {
      this.setTimer(val);
    }
  }
  setTimer(busy) {
    if (this.mayRefreshTimer) window.clearTimeout(this.mayRefreshTimer);
    if (busy) {
      const comp = this;
      this.mayRefreshTimer = window.setTimeout(function() {
        comp.mayRefresh = true;
      }, this.mayRefreshWaitMillis);
    } else {
      this.mayRefreshTimer = null;
      this.mayRefresh = false;
    }
  }
};
__decorateClass$3([
  decorator({ default: 96 })
], LoadingOverlay$1.prototype, "circleSizeRefresh", 2);
__decorateClass$3([
  decorator({ default: 64 })
], LoadingOverlay$1.prototype, "circleSizeNormal", 2);
__decorateClass$3([
  decorator({ default: 5 })
], LoadingOverlay$1.prototype, "mayRefreshWait", 2);
__decorateClass$3([
  decorator$1("busy")
], LoadingOverlay$1.prototype, "onBusyChanged", 1);
LoadingOverlay$1 = __decorateClass$3([
  Component({
    name: "LoadingOverlay",
    components: {
      RefreshButton: _sfc_main$5,
      CenterLayout: CenterLayout2
    }
  })
], LoadingOverlay$1);
const _sfc_main$3 = toNative(LoadingOverlay$1);
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_RefreshButton = resolveComponent("RefreshButton");
  const _component_CenterLayout = resolveComponent("CenterLayout");
  return openBlock(), createBlock(VOverlay, {
    modelValue: _ctx.busy,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.busy = $event),
    class: "full-screen"
  }, {
    default: withCtx(() => [
      createVNode(_component_CenterLayout, { column: "true" }, {
        default: withCtx(() => [
          createVNode(VProgressCircular, {
            indeterminate: "",
            size: _ctx.circleSize
          }, {
            default: withCtx(() => [
              _ctx.mayRefresh ? (openBlock(), createBlock(_component_RefreshButton, {
                key: 0,
                icon: "",
                large: ""
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["size"])
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["modelValue"]);
}
const LoadingOverlay2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2]]);
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
let DialogStack$1 = class DialogStack extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "items");
    __publicField(this, "closeText");
  }
  get item() {
    if (this.items.length == 0) return null;
    let item = this.items[this.items.length - 1];
    if (item.log)
      console.error(item);
    return item;
  }
  set item(value) {
    if (!value) {
      if (this.item.onDismiss) this.item.onDismiss();
      this.dialogStackPop();
    }
  }
  get model() {
    return !!this.item;
  }
  dialogStackPop() {
    return this.item;
  }
};
__decorateClass$2([
  decorator({ type: Array })
], DialogStack$1.prototype, "items", 2);
__decorateClass$2([
  decorator({ default: "Tutup" })
], DialogStack$1.prototype, "closeText", 2);
__decorateClass$2([
  decorator$2("dialogstackpop")
], DialogStack$1.prototype, "dialogStackPop", 1);
DialogStack$1 = __decorateClass$2([
  Component({
    name: "DialogStack",
    emits: ["dialogstackpop"]
  })
], DialogStack$1);
const _sfc_main$2 = toNative(DialogStack$1);
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.item ? (openBlock(), createBlock(VDialog, {
    key: 0,
    modelValue: _ctx.model,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.model = $event),
    persistent: "",
    "max-width": "290"
  }, {
    default: withCtx(() => [
      createVNode(VCard, { class: "pt-2 pb-2 pl-2 pr-2" }, {
        default: withCtx(() => [
          _ctx.item.title ? (openBlock(), createBlock(VCardTitle, {
            key: 0,
            class: "headline"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.item.title), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          _ctx.item.text ? (openBlock(), createBlock(VCardText, { key: 1 }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.item.text), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          createVNode(VCardActions, null, {
            default: withCtx(() => [
              createVNode(VSpacer),
              createVNode(VBtn, {
                ref: "closeButton",
                color: "secondary",
                text: "",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.item = null),
                disabled: !_ctx.item
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.closeText), 1)
                ]),
                _: 1
              }, 8, ["disabled"])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["modelValue"])) : createCommentVNode("", true);
}
const DialogStack2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1]]);
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
let ServerDownView$1 = class ServerDownView extends BaseView {
};
ServerDownView$1 = __decorateClass$1([
  Component({
    name: "ServerDownView",
    components: {
      RefreshButton: _sfc_main$5,
      CenterLayout: CenterLayout2
    }
  })
], ServerDownView$1);
const _sfc_main$1 = toNative(ServerDownView$1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_RefreshButton = resolveComponent("RefreshButton");
  const _component_CenterLayout = resolveComponent("CenterLayout");
  return openBlock(), createBlock(_component_CenterLayout, { column: "true" }, {
    default: withCtx(() => [
      _cache[0] || (_cache[0] = createBaseVNode("h1", null, "Server is down", -1)),
      createVNode(_component_RefreshButton, {
        icon: "",
        large: ""
      })
    ]),
    _: 1
  });
}
const ServerDownView2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
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
let GuestLayout = class extends BaseView {
  constructor() {
    super(...arguments);
    __publicField(this, "title");
  }
  get breadcrumbs() {
    return this.appStore.breadcrumbs;
  }
  get showBackground() {
    return this.serverReachable;
  }
  get tabDialogs() {
    return this.appStore.tabDialogs;
  }
  async popTabDialog() {
    await this.appStore.tabDialogs.pop();
  }
  errorCaptured(error, vm, info) {
    if (error.show) {
      this.appStore.showError(error);
      console.warn(error);
      return false;
    } else {
      throw error;
    }
  }
};
__decorateClass([
  decorator({ type: String })
], GuestLayout.prototype, "title", 2);
GuestLayout = __decorateClass([
  Component({
    components: {
      Head: me,
      ImageBackground: ImageBackground2,
      LoadingOverlay: LoadingOverlay2,
      DialogStack: DialogStack2,
      ServerDownView: ServerDownView2
    }
  })
], GuestLayout);
const _sfc_main = toNative(GuestLayout);
export {
  CenterLayout2 as C,
  DialogStack2 as D,
  GuestLayout as G,
  ImageBackground2 as I,
  LoadingOverlay2 as L,
  ServerDownView2 as S,
  VContainer as V,
  _sfc_main as _,
  VCard as a,
  VSpacer as b,
  VCardTitle as c,
  VCardText as d,
  VCardActions as e,
  VDialog as f,
  VuetifyLayoutKey as g,
  VMain as h,
  VApp as i,
  useLayoutItem as j,
  makeLayoutItemProps as m,
  useLayout as u
};
//# sourceMappingURL=GuestLayout.vue_vue_type_script_lang-B04FhGQk.js.map
