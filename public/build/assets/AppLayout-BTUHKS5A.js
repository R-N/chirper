var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { p as propsFactory, k as genericComponent, e as createVNode, O as makeThemeProps, Q as toRef, P as provideTheme, a6 as useRtl, s as shallowRef, l as computed, ac as provideDefaults, z as convertToUnit, m as ref, I as clamp, v as watch, q as onMounted, x as onBeforeUnmount, u as useProxiedModel, U as useToggleScope, B as mergeProps, n as watchEffect, a4 as IconValue, ae as useLocale, aj as useTheme, ak as pickWithRest, D as withDirectives, af as vShow, F as Fragment, al as CircularBuffer, X as onScopeDispose, a5 as makeDisplayProps, a7 as useDisplay, am as Transition, y as nextTick, _ as _export_sfc, o as openBlock, c as createElementBlock, f as createBaseVNode, b as Component, t as toNative, an as MyComponent, Y as Wr, d as decorator, ao as decorator$1, R as Pe, r as resolveComponent, j as createBlock, w as withCtx, h as withModifiers, g as createTextVNode, K as toDisplayString, ap as normalizeProps, aq as guardReactiveProps, i as renderList, L as createCommentVNode, ar as createSlots, a3 as decorator$2, N as BaseView, a0 as renderSlot, $ as me } from "./app-CJfxbgbM.js";
import { m as makeLayoutItemProps, k as useLayoutItem, h as VSpacer, c as VRow, V as VContainer, G as GuestLayout, I as ImageBackground, L as LoadingOverlay, D as DialogStack, S as ServerDownView, i as VMain, j as VApp } from "./GuestLayout.vue_vue_type_script_lang-D4vr3XMc.js";
import { a as authService } from "./Auth.vue_vue_type_script_lang-DhBczGcz.js";
import { b as makeComponentProps, i as makeTagProps, u as useRender, m as makeBorderProps, d as makeElevationProps, h as makeRoundedProps, j as useBackgroundColor, k as useBorder, n as useElevation, q as useRounded, A as VImg, z as VDefaultsProvider, B as VExpandTransition, S as useSsrBoot, T as makeVBtnProps, V as VBtn, e as makeLocationProps, U as makeTransitionProps, W as useTextColor, o as useLocation, X as MaybeTransition, a as VIcon, J as makeRouterProps, O as useLink, G as makeDensityProps, L as useDensity, Y as makeDelayProps, Z as useRouter, t as useScopeId, _ as toPhysical, $ as useDelay, Q as VAvatar, w as VOverlay, a0 as VSlideYTransition, a1 as VSlideXTransition } from "./forwardRefs-Db-_QBrT.js";
import { V as VMenu, a as VList, b as VListItem, c as VListItemTitle, e as VListSubheader, f as VListGroup } from "./VMenu-B78fScza.js";
import { V as VCol } from "./VCol-DKYWie_M.js";
import { L as LoginView } from "./Login-Bam6njN5.js";
import { d as VAlert } from "./InputError-DG5XJAZt.js";
const makeVToolbarTitleProps = propsFactory({
  text: String,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VToolbarTitle");
const VToolbarTitle = genericComponent()({
  name: "VToolbarTitle",
  props: makeVToolbarTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const hasText = !!(slots.default || slots.text || props.text);
      return createVNode(props.tag, {
        "class": ["v-toolbar-title", props.class],
        "style": props.style
      }, {
        default: () => {
          var _a;
          return [hasText && createVNode("div", {
            "class": "v-toolbar-title__placeholder"
          }, [slots.text ? slots.text() : props.text, (_a = slots.default) == null ? void 0 : _a.call(slots)])];
        }
      });
    });
    return {};
  }
});
const allowedDensities = [null, "prominent", "default", "comfortable", "compact"];
const makeVToolbarProps = propsFactory({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (v) => allowedDensities.includes(v)
  },
  extended: Boolean,
  extensionHeight: {
    type: [Number, String],
    default: 48
  },
  flat: Boolean,
  floating: Boolean,
  height: {
    type: [Number, String],
    default: 64
  },
  image: String,
  title: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "header"
  }),
  ...makeThemeProps()
}, "VToolbar");
const VToolbar = genericComponent()({
  name: "VToolbar",
  props: makeVToolbarProps(),
  setup(props, _ref) {
    var _a;
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const isExtended = shallowRef(!!(props.extended || ((_a = slots.extension) == null ? void 0 : _a.call(slots))));
    const contentHeight = computed(() => parseInt(Number(props.height) + (props.density === "prominent" ? Number(props.height) : 0) - (props.density === "comfortable" ? 8 : 0) - (props.density === "compact" ? 16 : 0), 10));
    const extensionHeight = computed(() => isExtended.value ? parseInt(Number(props.extensionHeight) + (props.density === "prominent" ? Number(props.extensionHeight) : 0) - (props.density === "comfortable" ? 4 : 0) - (props.density === "compact" ? 8 : 0), 10) : 0);
    provideDefaults({
      VBtn: {
        variant: "text"
      }
    });
    useRender(() => {
      var _a2;
      const hasTitle = !!(props.title || slots.title);
      const hasImage = !!(slots.image || props.image);
      const extension = (_a2 = slots.extension) == null ? void 0 : _a2.call(slots);
      isExtended.value = !!(props.extended || extension);
      return createVNode(props.tag, {
        "class": ["v-toolbar", {
          "v-toolbar--absolute": props.absolute,
          "v-toolbar--collapse": props.collapse,
          "v-toolbar--flat": props.flat,
          "v-toolbar--floating": props.floating,
          [`v-toolbar--density-${props.density}`]: true
        }, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, themeClasses.value, rtlClasses.value, props.class],
        "style": [backgroundColorStyles.value, props.style]
      }, {
        default: () => [hasImage && createVNode("div", {
          "key": "image",
          "class": "v-toolbar__image"
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
        }, slots.image)]), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(contentHeight.value)
            }
          }
        }, {
          default: () => {
            var _a3, _b, _c;
            return [createVNode("div", {
              "class": "v-toolbar__content",
              "style": {
                height: convertToUnit(contentHeight.value)
              }
            }, [slots.prepend && createVNode("div", {
              "class": "v-toolbar__prepend"
            }, [(_a3 = slots.prepend) == null ? void 0 : _a3.call(slots)]), hasTitle && createVNode(VToolbarTitle, {
              "key": "title",
              "text": props.title
            }, {
              text: slots.title
            }), (_b = slots.default) == null ? void 0 : _b.call(slots), slots.append && createVNode("div", {
              "class": "v-toolbar__append"
            }, [(_c = slots.append) == null ? void 0 : _c.call(slots)])])];
          }
        }), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(extensionHeight.value)
            }
          }
        }, {
          default: () => [createVNode(VExpandTransition, null, {
            default: () => [isExtended.value && createVNode("div", {
              "class": "v-toolbar__extension",
              "style": {
                height: convertToUnit(extensionHeight.value)
              }
            }, [extension])]
          })]
        })]
      });
    });
    return {
      contentHeight,
      extensionHeight
    };
  }
});
const makeScrollProps = propsFactory({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, "scroll");
function useScroll(props) {
  let args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    canScroll
  } = args;
  let previousScroll = 0;
  let previousScrollHeight = 0;
  const target = ref(null);
  const currentScroll = shallowRef(0);
  const savedScroll = shallowRef(0);
  const currentThreshold = shallowRef(0);
  const isScrollActive = shallowRef(false);
  const isScrollingUp = shallowRef(false);
  const scrollThreshold = computed(() => {
    return Number(props.scrollThreshold);
  });
  const scrollRatio = computed(() => {
    return clamp((scrollThreshold.value - currentScroll.value) / scrollThreshold.value || 0);
  });
  const onScroll = () => {
    const targetEl = target.value;
    if (!targetEl || canScroll && !canScroll.value) return;
    previousScroll = currentScroll.value;
    currentScroll.value = "window" in targetEl ? targetEl.pageYOffset : targetEl.scrollTop;
    const currentScrollHeight = targetEl instanceof Window ? document.documentElement.scrollHeight : targetEl.scrollHeight;
    if (previousScrollHeight !== currentScrollHeight) {
      previousScrollHeight = currentScrollHeight;
      return;
    }
    isScrollingUp.value = currentScroll.value < previousScroll;
    currentThreshold.value = Math.abs(currentScroll.value - scrollThreshold.value);
  };
  watch(isScrollingUp, () => {
    savedScroll.value = savedScroll.value || currentScroll.value;
  });
  watch(isScrollActive, () => {
    savedScroll.value = 0;
  });
  onMounted(() => {
    watch(() => props.scrollTarget, (scrollTarget) => {
      var _a;
      const newTarget = scrollTarget ? document.querySelector(scrollTarget) : window;
      if (!newTarget) {
        return;
      }
      if (newTarget === target.value) return;
      (_a = target.value) == null ? void 0 : _a.removeEventListener("scroll", onScroll);
      target.value = newTarget;
      target.value.addEventListener("scroll", onScroll, {
        passive: true
      });
    }, {
      immediate: true
    });
  });
  onBeforeUnmount(() => {
    var _a;
    (_a = target.value) == null ? void 0 : _a.removeEventListener("scroll", onScroll);
  });
  canScroll && watch(canScroll, onScroll, {
    immediate: true
  });
  return {
    scrollThreshold,
    currentScroll,
    currentThreshold,
    isScrollActive,
    scrollRatio,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp,
    savedScroll
  };
}
const makeVAppBarProps = propsFactory({
  scrollBehavior: String,
  modelValue: {
    type: Boolean,
    default: true
  },
  location: {
    type: String,
    default: "top",
    validator: (value) => ["top", "bottom"].includes(value)
  },
  ...makeVToolbarProps(),
  ...makeLayoutItemProps(),
  ...makeScrollProps(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar");
const VAppBar = genericComponent()({
  name: "VAppBar",
  props: makeVAppBarProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const vToolbarRef = ref();
    const isActive = useProxiedModel(props, "modelValue");
    const scrollBehavior = computed(() => {
      var _a;
      const behavior = new Set(((_a = props.scrollBehavior) == null ? void 0 : _a.split(" ")) ?? []);
      return {
        hide: behavior.has("hide"),
        fullyHide: behavior.has("fully-hide"),
        inverted: behavior.has("inverted"),
        collapse: behavior.has("collapse"),
        elevate: behavior.has("elevate"),
        fadeImage: behavior.has("fade-image")
        // shrink: behavior.has('shrink'),
      };
    });
    const canScroll = computed(() => {
      const behavior = scrollBehavior.value;
      return behavior.hide || behavior.fullyHide || behavior.inverted || behavior.collapse || behavior.elevate || behavior.fadeImage || // behavior.shrink ||
      !isActive.value;
    });
    const {
      currentScroll,
      scrollThreshold,
      isScrollingUp,
      scrollRatio
    } = useScroll(props, {
      canScroll
    });
    const canHide = computed(() => scrollBehavior.value.hide || scrollBehavior.value.fullyHide);
    const isCollapsed = computed(() => props.collapse || scrollBehavior.value.collapse && (scrollBehavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0));
    const isFlat = computed(() => props.flat || scrollBehavior.value.fullyHide && !isActive.value || scrollBehavior.value.elevate && (scrollBehavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0));
    const opacity = computed(() => scrollBehavior.value.fadeImage ? scrollBehavior.value.inverted ? 1 - scrollRatio.value : scrollRatio.value : void 0);
    const height = computed(() => {
      var _a, _b;
      if (scrollBehavior.value.hide && scrollBehavior.value.inverted) return 0;
      const height2 = ((_a = vToolbarRef.value) == null ? void 0 : _a.contentHeight) ?? 0;
      const extensionHeight = ((_b = vToolbarRef.value) == null ? void 0 : _b.extensionHeight) ?? 0;
      if (!canHide.value) return height2 + extensionHeight;
      return currentScroll.value < scrollThreshold.value || scrollBehavior.value.fullyHide ? height2 + extensionHeight : height2;
    });
    useToggleScope(computed(() => !!props.scrollBehavior), () => {
      watchEffect(() => {
        if (canHide.value) {
          if (scrollBehavior.value.inverted) {
            isActive.value = currentScroll.value > scrollThreshold.value;
          } else {
            isActive.value = isScrollingUp.value || currentScroll.value < scrollThreshold.value;
          }
        } else {
          isActive.value = true;
        }
      });
    });
    const {
      ssrBootStyles
    } = useSsrBoot();
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(props, "location"),
      layoutSize: height,
      elementSize: shallowRef(void 0),
      active: isActive,
      absolute: toRef(props, "absolute")
    });
    useRender(() => {
      const toolbarProps = VToolbar.filterProps(props);
      return createVNode(VToolbar, mergeProps({
        "ref": vToolbarRef,
        "class": ["v-app-bar", {
          "v-app-bar--bottom": props.location === "bottom"
        }, props.class],
        "style": [{
          ...layoutItemStyles.value,
          "--v-toolbar-image-opacity": opacity.value,
          height: void 0,
          ...ssrBootStyles.value
        }, props.style]
      }, toolbarProps, {
        "collapse": isCollapsed.value,
        "flat": isFlat.value
      }), slots);
    });
    return {};
  }
});
const makeVAppBarNavIconProps = propsFactory({
  ...makeVBtnProps({
    icon: "$menu",
    variant: "text"
  })
}, "VAppBarNavIcon");
const VAppBarNavIcon = genericComponent()({
  name: "VAppBarNavIcon",
  props: makeVAppBarNavIconProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VBtn, mergeProps(props, {
      "class": ["v-app-bar-nav-icon"]
    }), slots));
    return {};
  }
});
const makeVListItemActionProps = propsFactory({
  start: Boolean,
  end: Boolean,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VListItemAction");
const VListItemAction = genericComponent()({
  name: "VListItemAction",
  props: makeVListItemActionProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": ["v-list-item-action", {
        "v-list-item-action--start": props.start,
        "v-list-item-action--end": props.end
      }, props.class],
      "style": props.style
    }, slots));
    return {};
  }
});
const makeVBadgeProps = propsFactory({
  bordered: Boolean,
  color: String,
  content: [Number, String],
  dot: Boolean,
  floating: Boolean,
  icon: IconValue,
  inline: Boolean,
  label: {
    type: String,
    default: "$vuetify.badge"
  },
  max: [Number, String],
  modelValue: {
    type: Boolean,
    default: true
  },
  offsetX: [Number, String],
  offsetY: [Number, String],
  textColor: String,
  ...makeComponentProps(),
  ...makeLocationProps({
    location: "top end"
  }),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeTransitionProps({
    transition: "scale-rotate-transition"
  })
}, "VBadge");
const VBadge = genericComponent()({
  name: "VBadge",
  inheritAttrs: false,
  props: makeVBadgeProps(),
  setup(props, ctx) {
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      roundedClasses
    } = useRounded(props);
    const {
      t
    } = useLocale();
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "textColor"));
    const {
      themeClasses
    } = useTheme();
    const {
      locationStyles
    } = useLocation(props, true, (side) => {
      const base = props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
      return base + (["top", "bottom"].includes(side) ? Number(props.offsetY ?? 0) : ["left", "right"].includes(side) ? Number(props.offsetX ?? 0) : 0);
    });
    useRender(() => {
      const value = Number(props.content);
      const content = !props.max || isNaN(value) ? props.content : value <= Number(props.max) ? value : `${props.max}+`;
      const [badgeAttrs, attrs] = pickWithRest(ctx.attrs, ["aria-atomic", "aria-label", "aria-live", "role", "title"]);
      return createVNode(props.tag, mergeProps({
        "class": ["v-badge", {
          "v-badge--bordered": props.bordered,
          "v-badge--dot": props.dot,
          "v-badge--floating": props.floating,
          "v-badge--inline": props.inline
        }, props.class]
      }, attrs, {
        "style": props.style
      }), {
        default: () => {
          var _a, _b;
          return [createVNode("div", {
            "class": "v-badge__wrapper"
          }, [(_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a), createVNode(MaybeTransition, {
            "transition": props.transition
          }, {
            default: () => {
              var _a2, _b2;
              return [withDirectives(createVNode("span", mergeProps({
                "class": ["v-badge__badge", themeClasses.value, backgroundColorClasses.value, roundedClasses.value, textColorClasses.value],
                "style": [backgroundColorStyles.value, textColorStyles.value, props.inline ? {} : locationStyles.value],
                "aria-atomic": "true",
                "aria-label": t(props.label, value),
                "aria-live": "polite",
                "role": "status"
              }, badgeAttrs), [props.dot ? void 0 : ctx.slots.badge ? (_b2 = (_a2 = ctx.slots).badge) == null ? void 0 : _b2.call(_a2) : props.icon ? createVNode(VIcon, {
                "icon": props.icon
              }, null) : content]), [[vShow, props.modelValue]])];
            }
          })])];
        }
      });
    });
    return {};
  }
});
const makeVBreadcrumbsDividerProps = propsFactory({
  divider: [Number, String],
  ...makeComponentProps()
}, "VBreadcrumbsDivider");
const VBreadcrumbsDivider = genericComponent()({
  name: "VBreadcrumbsDivider",
  props: makeVBreadcrumbsDividerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      var _a;
      return createVNode("li", {
        "aria-hidden": "true",
        "class": ["v-breadcrumbs-divider", props.class],
        "style": props.style
      }, [((_a = slots == null ? void 0 : slots.default) == null ? void 0 : _a.call(slots)) ?? props.divider]);
    });
    return {};
  }
});
const makeVBreadcrumbsItemProps = propsFactory({
  active: Boolean,
  activeClass: String,
  activeColor: String,
  color: String,
  disabled: Boolean,
  title: String,
  ...makeComponentProps(),
  ...makeRouterProps(),
  ...makeTagProps({
    tag: "li"
  })
}, "VBreadcrumbsItem");
const VBreadcrumbsItem = genericComponent()({
  name: "VBreadcrumbsItem",
  props: makeVBreadcrumbsItemProps(),
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const link = useLink(props, attrs);
    const isActive = computed(() => {
      var _a;
      return props.active || ((_a = link.isActive) == null ? void 0 : _a.value);
    });
    const color = computed(() => isActive.value ? props.activeColor : props.color);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(color);
    useRender(() => {
      return createVNode(props.tag, {
        "class": ["v-breadcrumbs-item", {
          "v-breadcrumbs-item--active": isActive.value,
          "v-breadcrumbs-item--disabled": props.disabled,
          [`${props.activeClass}`]: isActive.value && props.activeClass
        }, textColorClasses.value, props.class],
        "style": [textColorStyles.value, props.style],
        "aria-current": isActive.value ? "page" : void 0
      }, {
        default: () => {
          var _a, _b;
          return [!link.isLink.value ? ((_a = slots.default) == null ? void 0 : _a.call(slots)) ?? props.title : createVNode("a", mergeProps({
            "class": "v-breadcrumbs-item--link",
            "onClick": link.navigate
          }, link.linkProps), [((_b = slots.default) == null ? void 0 : _b.call(slots)) ?? props.title])];
        }
      });
    });
    return {};
  }
});
const makeVBreadcrumbsProps = propsFactory({
  activeClass: String,
  activeColor: String,
  bgColor: String,
  color: String,
  disabled: Boolean,
  divider: {
    type: String,
    default: "/"
  },
  icon: IconValue,
  items: {
    type: Array,
    default: () => []
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "ul"
  })
}, "VBreadcrumbs");
const VBreadcrumbs = genericComponent()({
  name: "VBreadcrumbs",
  props: makeVBreadcrumbsProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    const {
      densityClasses
    } = useDensity(props);
    const {
      roundedClasses
    } = useRounded(props);
    provideDefaults({
      VBreadcrumbsDivider: {
        divider: toRef(props, "divider")
      },
      VBreadcrumbsItem: {
        activeClass: toRef(props, "activeClass"),
        activeColor: toRef(props, "activeColor"),
        color: toRef(props, "color"),
        disabled: toRef(props, "disabled")
      }
    });
    const items = computed(() => props.items.map((item) => {
      return typeof item === "string" ? {
        item: {
          title: item
        },
        raw: item
      } : {
        item,
        raw: item
      };
    }));
    useRender(() => {
      const hasPrepend = !!(slots.prepend || props.icon);
      return createVNode(props.tag, {
        "class": ["v-breadcrumbs", backgroundColorClasses.value, densityClasses.value, roundedClasses.value, props.class],
        "style": [backgroundColorStyles.value, props.style]
      }, {
        default: () => {
          var _a;
          return [hasPrepend && createVNode("li", {
            "key": "prepend",
            "class": "v-breadcrumbs__prepend"
          }, [!slots.prepend ? createVNode(VIcon, {
            "key": "prepend-icon",
            "start": true,
            "icon": props.icon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !props.icon,
            "defaults": {
              VIcon: {
                icon: props.icon,
                start: true
              }
            }
          }, slots.prepend)]), items.value.map((_ref2, index, array) => {
            var _a2;
            let {
              item,
              raw
            } = _ref2;
            return createVNode(Fragment, null, [((_a2 = slots.item) == null ? void 0 : _a2.call(slots, {
              item,
              index
            })) ?? createVNode(VBreadcrumbsItem, mergeProps({
              "key": index,
              "disabled": index >= array.length - 1
            }, typeof item === "string" ? {
              title: item
            } : item), {
              default: slots.title ? () => {
                var _a3;
                return (_a3 = slots.title) == null ? void 0 : _a3.call(slots, {
                  item,
                  index
                });
              } : void 0
            }), index < array.length - 1 && createVNode(VBreadcrumbsDivider, null, {
              default: slots.divider ? () => {
                var _a3;
                return (_a3 = slots.divider) == null ? void 0 : _a3.call(slots, {
                  item: raw,
                  index
                });
              } : void 0
            })]);
          }), (_a = slots.default) == null ? void 0 : _a.call(slots)];
        }
      });
    });
    return {};
  }
});
function useSticky(_ref) {
  let {
    rootEl,
    isSticky,
    layoutItemStyles
  } = _ref;
  const isStuck = shallowRef(false);
  const stuckPosition = shallowRef(0);
  const stickyStyles = computed(() => {
    const side = typeof isStuck.value === "boolean" ? "top" : isStuck.value;
    return [isSticky.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, isStuck.value ? {
      [side]: convertToUnit(stuckPosition.value)
    } : {
      top: layoutItemStyles.value.top
    }];
  });
  onMounted(() => {
    watch(isSticky, (val) => {
      if (val) {
        window.addEventListener("scroll", onScroll, {
          passive: true
        });
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    }, {
      immediate: true
    });
  });
  onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
  });
  let lastScrollTop = 0;
  function onScroll() {
    const direction = lastScrollTop > window.scrollY ? "up" : "down";
    const rect = rootEl.value.getBoundingClientRect();
    const layoutTop = parseFloat(layoutItemStyles.value.top ?? 0);
    const top = window.scrollY - Math.max(0, stuckPosition.value - layoutTop);
    const bottom = rect.height + Math.max(stuckPosition.value, layoutTop) - window.scrollY - window.innerHeight;
    const bodyScroll = parseFloat(getComputedStyle(rootEl.value).getPropertyValue("--v-body-scroll-y")) || 0;
    if (rect.height < window.innerHeight - layoutTop) {
      isStuck.value = "top";
      stuckPosition.value = layoutTop;
    } else if (direction === "up" && isStuck.value === "bottom" || direction === "down" && isStuck.value === "top") {
      stuckPosition.value = window.scrollY + rect.top - bodyScroll;
      isStuck.value = true;
    } else if (direction === "down" && bottom <= 0) {
      stuckPosition.value = 0;
      isStuck.value = "bottom";
    } else if (direction === "up" && top <= 0) {
      if (!bodyScroll) {
        stuckPosition.value = rect.top + top;
        isStuck.value = "top";
      } else if (isStuck.value !== "top") {
        stuckPosition.value = -top + bodyScroll + layoutTop;
        isStuck.value = "top";
      }
    }
    lastScrollTop = window.scrollY;
  }
  return {
    isStuck,
    stickyStyles
  };
}
const HORIZON = 100;
const HISTORY = 20;
function kineticEnergyToVelocity(work) {
  const sqrt2 = 1.41421356237;
  return (work < 0 ? -1 : 1) * Math.sqrt(Math.abs(work)) * sqrt2;
}
function calculateImpulseVelocity(samples) {
  if (samples.length < 2) {
    return 0;
  }
  if (samples.length === 2) {
    if (samples[1].t === samples[0].t) {
      return 0;
    }
    return (samples[1].d - samples[0].d) / (samples[1].t - samples[0].t);
  }
  let work = 0;
  for (let i = samples.length - 1; i > 0; i--) {
    if (samples[i].t === samples[i - 1].t) {
      continue;
    }
    const vprev = kineticEnergyToVelocity(work);
    const vcurr = (samples[i].d - samples[i - 1].d) / (samples[i].t - samples[i - 1].t);
    work += (vcurr - vprev) * Math.abs(vcurr);
    if (i === samples.length - 1) {
      work *= 0.5;
    }
  }
  return kineticEnergyToVelocity(work) * 1e3;
}
function useVelocity() {
  const touches = {};
  function addMovement(e) {
    Array.from(e.changedTouches).forEach((touch) => {
      const samples = touches[touch.identifier] ?? (touches[touch.identifier] = new CircularBuffer(HISTORY));
      samples.push([e.timeStamp, touch]);
    });
  }
  function endTouch(e) {
    Array.from(e.changedTouches).forEach((touch) => {
      delete touches[touch.identifier];
    });
  }
  function getVelocity(id) {
    var _a;
    const samples = (_a = touches[id]) == null ? void 0 : _a.values().reverse();
    if (!samples) {
      throw new Error(`No samples for touch id ${id}`);
    }
    const newest = samples[0];
    const x = [];
    const y = [];
    for (const val of samples) {
      if (newest[0] - val[0] > HORIZON) break;
      x.push({
        t: val[0],
        d: val[1].clientX
      });
      y.push({
        t: val[0],
        d: val[1].clientY
      });
    }
    return {
      x: calculateImpulseVelocity(x),
      y: calculateImpulseVelocity(y),
      get direction() {
        const {
          x: x2,
          y: y2
        } = this;
        const [absX, absY] = [Math.abs(x2), Math.abs(y2)];
        return absX > absY && x2 >= 0 ? "right" : absX > absY && x2 <= 0 ? "left" : absY > absX && y2 >= 0 ? "down" : absY > absX && y2 <= 0 ? "up" : oops$1();
      }
    };
  }
  return {
    addMovement,
    endTouch,
    getVelocity
  };
}
function oops$1() {
  throw new Error();
}
function useTouch(_ref) {
  let {
    el,
    isActive,
    isTemporary,
    width,
    touchless,
    position
  } = _ref;
  onMounted(() => {
    window.addEventListener("touchstart", onTouchstart, {
      passive: true
    });
    window.addEventListener("touchmove", onTouchmove, {
      passive: false
    });
    window.addEventListener("touchend", onTouchend, {
      passive: true
    });
  });
  onBeforeUnmount(() => {
    window.removeEventListener("touchstart", onTouchstart);
    window.removeEventListener("touchmove", onTouchmove);
    window.removeEventListener("touchend", onTouchend);
  });
  const isHorizontal = computed(() => ["left", "right"].includes(position.value));
  const {
    addMovement,
    endTouch,
    getVelocity
  } = useVelocity();
  let maybeDragging = false;
  const isDragging = shallowRef(false);
  const dragProgress = shallowRef(0);
  const offset = shallowRef(0);
  let start;
  function getOffset(pos, active) {
    return (position.value === "left" ? pos : position.value === "right" ? document.documentElement.clientWidth - pos : position.value === "top" ? pos : position.value === "bottom" ? document.documentElement.clientHeight - pos : oops()) - (active ? width.value : 0);
  }
  function getProgress(pos) {
    let limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    const progress = position.value === "left" ? (pos - offset.value) / width.value : position.value === "right" ? (document.documentElement.clientWidth - pos - offset.value) / width.value : position.value === "top" ? (pos - offset.value) / width.value : position.value === "bottom" ? (document.documentElement.clientHeight - pos - offset.value) / width.value : oops();
    return limit ? Math.max(0, Math.min(1, progress)) : progress;
  }
  function onTouchstart(e) {
    if (touchless.value) return;
    const touchX = e.changedTouches[0].clientX;
    const touchY = e.changedTouches[0].clientY;
    const touchZone = 25;
    const inTouchZone = position.value === "left" ? touchX < touchZone : position.value === "right" ? touchX > document.documentElement.clientWidth - touchZone : position.value === "top" ? touchY < touchZone : position.value === "bottom" ? touchY > document.documentElement.clientHeight - touchZone : oops();
    const inElement = isActive.value && (position.value === "left" ? touchX < width.value : position.value === "right" ? touchX > document.documentElement.clientWidth - width.value : position.value === "top" ? touchY < width.value : position.value === "bottom" ? touchY > document.documentElement.clientHeight - width.value : oops());
    if (inTouchZone || inElement || isActive.value && isTemporary.value) {
      start = [touchX, touchY];
      offset.value = getOffset(isHorizontal.value ? touchX : touchY, isActive.value);
      dragProgress.value = getProgress(isHorizontal.value ? touchX : touchY);
      maybeDragging = offset.value > -20 && offset.value < 80;
      endTouch(e);
      addMovement(e);
    }
  }
  function onTouchmove(e) {
    const touchX = e.changedTouches[0].clientX;
    const touchY = e.changedTouches[0].clientY;
    if (maybeDragging) {
      if (!e.cancelable) {
        maybeDragging = false;
        return;
      }
      const dx = Math.abs(touchX - start[0]);
      const dy = Math.abs(touchY - start[1]);
      const thresholdMet = isHorizontal.value ? dx > dy && dx > 3 : dy > dx && dy > 3;
      if (thresholdMet) {
        isDragging.value = true;
        maybeDragging = false;
      } else if ((isHorizontal.value ? dy : dx) > 3) {
        maybeDragging = false;
      }
    }
    if (!isDragging.value) return;
    e.preventDefault();
    addMovement(e);
    const progress = getProgress(isHorizontal.value ? touchX : touchY, false);
    dragProgress.value = Math.max(0, Math.min(1, progress));
    if (progress > 1) {
      offset.value = getOffset(isHorizontal.value ? touchX : touchY, true);
    } else if (progress < 0) {
      offset.value = getOffset(isHorizontal.value ? touchX : touchY, false);
    }
  }
  function onTouchend(e) {
    maybeDragging = false;
    if (!isDragging.value) return;
    addMovement(e);
    isDragging.value = false;
    const velocity = getVelocity(e.changedTouches[0].identifier);
    const vx = Math.abs(velocity.x);
    const vy = Math.abs(velocity.y);
    const thresholdMet = isHorizontal.value ? vx > vy && vx > 400 : vy > vx && vy > 3;
    if (thresholdMet) {
      isActive.value = velocity.direction === ({
        left: "right",
        right: "left",
        top: "down",
        bottom: "up"
      }[position.value] || oops());
    } else {
      isActive.value = dragProgress.value > 0.5;
    }
  }
  const dragStyles = computed(() => {
    return isDragging.value ? {
      transform: position.value === "left" ? `translateX(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "right" ? `translateX(calc(100% - ${dragProgress.value * width.value}px))` : position.value === "top" ? `translateY(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "bottom" ? `translateY(calc(100% - ${dragProgress.value * width.value}px))` : oops(),
      transition: "none"
    } : void 0;
  });
  useToggleScope(isDragging, () => {
    var _a, _b;
    const transform = ((_a = el.value) == null ? void 0 : _a.style.transform) ?? null;
    const transition = ((_b = el.value) == null ? void 0 : _b.style.transition) ?? null;
    watchEffect(() => {
      var _a2, _b2, _c, _d;
      (_b2 = el.value) == null ? void 0 : _b2.style.setProperty("transform", ((_a2 = dragStyles.value) == null ? void 0 : _a2.transform) || "none");
      (_d = el.value) == null ? void 0 : _d.style.setProperty("transition", ((_c = dragStyles.value) == null ? void 0 : _c.transition) || null);
    });
    onScopeDispose(() => {
      var _a2, _b2;
      (_a2 = el.value) == null ? void 0 : _a2.style.setProperty("transform", transform);
      (_b2 = el.value) == null ? void 0 : _b2.style.setProperty("transition", transition);
    });
  });
  return {
    isDragging,
    dragProgress,
    dragStyles
  };
}
function oops() {
  throw new Error();
}
const locations = ["start", "end", "left", "right", "top", "bottom"];
const makeVNavigationDrawerProps = propsFactory({
  color: String,
  disableResizeWatcher: Boolean,
  disableRouteWatcher: Boolean,
  expandOnHover: Boolean,
  floating: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  permanent: Boolean,
  rail: {
    type: Boolean,
    default: null
  },
  railWidth: {
    type: [Number, String],
    default: 56
  },
  scrim: {
    type: [Boolean, String],
    default: true
  },
  image: String,
  temporary: Boolean,
  persistent: Boolean,
  touchless: Boolean,
  width: {
    type: [Number, String],
    default: 256
  },
  location: {
    type: String,
    default: "start",
    validator: (value) => locations.includes(value)
  },
  sticky: Boolean,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDelayProps(),
  ...makeDisplayProps({
    mobile: null
  }),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "nav"
  }),
  ...makeThemeProps()
}, "VNavigationDrawer");
const VNavigationDrawer = genericComponent()({
  name: "VNavigationDrawer",
  props: makeVNavigationDrawerProps(),
  emits: {
    "update:modelValue": (val) => true,
    "update:rail": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      elevationClasses
    } = useElevation(props);
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const {
      roundedClasses
    } = useRounded(props);
    const router = useRouter();
    const isActive = useProxiedModel(props, "modelValue", null, (v) => !!v);
    const {
      ssrBootStyles
    } = useSsrBoot();
    const {
      scopeId
    } = useScopeId();
    const rootEl = ref();
    const isHovering = shallowRef(false);
    const {
      runOpenDelay,
      runCloseDelay
    } = useDelay(props, (value) => {
      isHovering.value = value;
    });
    const width = computed(() => {
      return props.rail && props.expandOnHover && isHovering.value ? Number(props.width) : Number(props.rail ? props.railWidth : props.width);
    });
    const location = computed(() => {
      return toPhysical(props.location, isRtl.value);
    });
    const isPersistent = computed(() => props.persistent);
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary));
    const isSticky = computed(() => props.sticky && !isTemporary.value && location.value !== "bottom");
    useToggleScope(() => props.expandOnHover && props.rail != null, () => {
      watch(isHovering, (val) => emit("update:rail", !val));
    });
    useToggleScope(() => !props.disableResizeWatcher, () => {
      watch(isTemporary, (val) => !props.permanent && nextTick(() => isActive.value = !val));
    });
    useToggleScope(() => !props.disableRouteWatcher && !!router, () => {
      watch(router.currentRoute, () => isTemporary.value && (isActive.value = false));
    });
    watch(() => props.permanent, (val) => {
      if (val) isActive.value = true;
    });
    if (props.modelValue == null && !isTemporary.value) {
      isActive.value = props.permanent || !mobile.value;
    }
    const {
      isDragging,
      dragProgress
    } = useTouch({
      el: rootEl,
      isActive,
      isTemporary,
      width,
      touchless: toRef(props, "touchless"),
      position: location
    });
    const layoutSize = computed(() => {
      const size = isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value;
      return isDragging.value ? size * dragProgress.value : size;
    });
    const {
      layoutItemStyles,
      layoutItemScrimStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: location,
      layoutSize,
      elementSize: width,
      active: computed(() => isActive.value || isDragging.value),
      disableTransitions: computed(() => isDragging.value),
      absolute: computed(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        props.absolute || isSticky.value && typeof isStuck.value !== "string"
      ))
    });
    const {
      isStuck,
      stickyStyles
    } = useSticky({
      rootEl,
      isSticky,
      layoutItemStyles
    });
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === "string" ? props.scrim : null;
    }));
    const scrimStyles = computed(() => ({
      ...isDragging.value ? {
        opacity: dragProgress.value * 0.2,
        transition: "none"
      } : void 0,
      ...layoutItemScrimStyles.value
    }));
    provideDefaults({
      VList: {
        bgColor: "transparent"
      }
    });
    useRender(() => {
      const hasImage = slots.image || props.image;
      return createVNode(Fragment, null, [createVNode(props.tag, mergeProps({
        "ref": rootEl,
        "onMouseenter": runOpenDelay,
        "onMouseleave": runCloseDelay,
        "class": ["v-navigation-drawer", `v-navigation-drawer--${location.value}`, {
          "v-navigation-drawer--expand-on-hover": props.expandOnHover,
          "v-navigation-drawer--floating": props.floating,
          "v-navigation-drawer--is-hovering": isHovering.value,
          "v-navigation-drawer--rail": props.rail,
          "v-navigation-drawer--temporary": isTemporary.value,
          "v-navigation-drawer--persistent": isPersistent.value,
          "v-navigation-drawer--active": isActive.value,
          "v-navigation-drawer--sticky": isSticky.value
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, displayClasses.value, elevationClasses.value, roundedClasses.value, props.class],
        "style": [backgroundColorStyles.value, layoutItemStyles.value, ssrBootStyles.value, stickyStyles.value, props.style]
      }, scopeId, attrs), {
        default: () => {
          var _a, _b, _c;
          return [hasImage && createVNode("div", {
            "key": "image",
            "class": "v-navigation-drawer__img"
          }, [!slots.image ? createVNode(VImg, {
            "key": "image-img",
            "alt": "",
            "cover": true,
            "height": "inherit",
            "src": props.image
          }, null) : createVNode(VDefaultsProvider, {
            "key": "image-defaults",
            "disabled": !props.image,
            "defaults": {
              VImg: {
                alt: "",
                cover: true,
                height: "inherit",
                src: props.image
              }
            }
          }, slots.image)]), slots.prepend && createVNode("div", {
            "class": "v-navigation-drawer__prepend"
          }, [(_a = slots.prepend) == null ? void 0 : _a.call(slots)]), createVNode("div", {
            "class": "v-navigation-drawer__content"
          }, [(_b = slots.default) == null ? void 0 : _b.call(slots)]), slots.append && createVNode("div", {
            "class": "v-navigation-drawer__append"
          }, [(_c = slots.append) == null ? void 0 : _c.call(slots)])];
        }
      }), createVNode(Transition, {
        "name": "fade-transition"
      }, {
        default: () => [isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim && createVNode("div", mergeProps({
          "class": ["v-navigation-drawer__scrim", scrimColor.backgroundColorClasses.value],
          "style": [scrimStyles.value, scrimColor.backgroundColorStyles.value],
          "onClick": () => {
            if (isPersistent.value) return;
            isActive.value = false;
          }
        }, scopeId), null)]
      })]);
    });
    return {
      isStuck
    };
  }
});
const _sfc_main$6 = {};
const _hoisted_1 = {
  viewBox: "0 0 316 316",
  xmlns: "http://www.w3.org/2000/svg"
};
function _sfc_render$6(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _cache[0] || (_cache[0] = [
    createBaseVNode("path", { d: "M305.8 81.125C305.77 80.995 305.69 80.885 305.65 80.755C305.56 80.525 305.49 80.285 305.37 80.075C305.29 79.935 305.17 79.815 305.07 79.685C304.94 79.515 304.83 79.325 304.68 79.175C304.55 79.045 304.39 78.955 304.25 78.845C304.09 78.715 303.95 78.575 303.77 78.475L251.32 48.275C249.97 47.495 248.31 47.495 246.96 48.275L194.51 78.475C194.33 78.575 194.19 78.725 194.03 78.845C193.89 78.955 193.73 79.045 193.6 79.175C193.45 79.325 193.34 79.515 193.21 79.685C193.11 79.815 192.99 79.935 192.91 80.075C192.79 80.285 192.71 80.525 192.63 80.755C192.58 80.875 192.51 80.995 192.48 81.125C192.38 81.495 192.33 81.875 192.33 82.265V139.625L148.62 164.795V52.575C148.62 52.185 148.57 51.805 148.47 51.435C148.44 51.305 148.36 51.195 148.32 51.065C148.23 50.835 148.16 50.595 148.04 50.385C147.96 50.245 147.84 50.125 147.74 49.995C147.61 49.825 147.5 49.635 147.35 49.485C147.22 49.355 147.06 49.265 146.92 49.155C146.76 49.025 146.62 48.885 146.44 48.785L93.99 18.585C92.64 17.805 90.98 17.805 89.63 18.585L37.18 48.785C37 48.885 36.86 49.035 36.7 49.155C36.56 49.265 36.4 49.355 36.27 49.485C36.12 49.635 36.01 49.825 35.88 49.995C35.78 50.125 35.66 50.245 35.58 50.385C35.46 50.595 35.38 50.835 35.3 51.065C35.25 51.185 35.18 51.305 35.15 51.435C35.05 51.805 35 52.185 35 52.575V232.235C35 233.795 35.84 235.245 37.19 236.025L142.1 296.425C142.33 296.555 142.58 296.635 142.82 296.725C142.93 296.765 143.04 296.835 143.16 296.865C143.53 296.965 143.9 297.015 144.28 297.015C144.66 297.015 145.03 296.965 145.4 296.865C145.5 296.835 145.59 296.775 145.69 296.745C145.95 296.655 146.21 296.565 146.45 296.435L251.36 236.035C252.72 235.255 253.55 233.815 253.55 232.245V174.885L303.81 145.945C305.17 145.165 306 143.725 306 142.155V82.265C305.95 81.875 305.89 81.495 305.8 81.125ZM144.2 227.205L100.57 202.515L146.39 176.135L196.66 147.195L240.33 172.335L208.29 190.625L144.2 227.205ZM244.75 114.995V164.795L226.39 154.225L201.03 139.625V89.825L219.39 100.395L244.75 114.995ZM249.12 57.105L292.81 82.265L249.12 107.425L205.43 82.265L249.12 57.105ZM114.49 184.425L96.13 194.995V85.305L121.49 70.705L139.85 60.135V169.815L114.49 184.425ZM91.76 27.425L135.45 52.585L91.76 77.745L48.07 52.585L91.76 27.425ZM43.67 60.135L62.03 70.705L87.39 85.305V202.545V202.555V202.565C87.39 202.735 87.44 202.895 87.46 203.055C87.49 203.265 87.49 203.485 87.55 203.695V203.705C87.6 203.875 87.69 204.035 87.76 204.195C87.84 204.375 87.89 204.575 87.99 204.745C87.99 204.745 87.99 204.755 88 204.755C88.09 204.905 88.22 205.035 88.33 205.175C88.45 205.335 88.55 205.495 88.69 205.635L88.7 205.645C88.82 205.765 88.98 205.855 89.12 205.965C89.28 206.085 89.42 206.225 89.59 206.325C89.6 206.325 89.6 206.325 89.61 206.335C89.62 206.335 89.62 206.345 89.63 206.345L139.87 234.775V285.065L43.67 229.705V60.135ZM244.75 229.705L148.58 285.075V234.775L219.8 194.115L244.75 179.875V229.705ZM297.2 139.625L253.49 164.795V114.995L278.85 100.395L297.21 89.825V139.625H297.2Z" }, null, -1)
  ]));
}
const ApplicationLogo = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
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
let TopNavBar$1 = class TopNavBar extends MyComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "appName");
    __publicField(this, "syncedDrawer");
    // @Prop(Boolean) drawer;
    // get syncedDrawer(){
    //     return this.drawer;
    // }
    // set syncedDrawer(value){
    //     this.$emit('update:drawer', value);
    // }
    __publicField(this, "notifs", [
      { text: "Notif 1" },
      { text: "Notif 2" }
    ]);
  }
  get notifCount() {
    return this.notifs.length;
  }
  async logout() {
    let res = await authService.logout();
    Wr.visit(res.redirect || "/");
  }
  async switchToTeam(team) {
    await authService.switchToTeam(team);
  }
};
__decorateClass$5([
  decorator({ type: String })
], TopNavBar$1.prototype, "appName", 2);
__decorateClass$5([
  decorator$1({ name: "drawer", type: Boolean })
], TopNavBar$1.prototype, "syncedDrawer", 2);
TopNavBar$1 = __decorateClass$5([
  Component({
    name: "TopNavBar",
    components: {
      ApplicationLogo,
      Link: Pe,
      VAppBar,
      VToolbarTitle,
      VBtn,
      VMenu,
      VList,
      VListItem,
      VAvatar,
      VIcon,
      VImg
    }
  })
], TopNavBar$1);
const _sfc_main$5 = toNative(TopNavBar$1);
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ApplicationLogo = resolveComponent("ApplicationLogo");
  const _component_Link = resolveComponent("Link");
  return openBlock(), createBlock(VAppBar, {
    app: "",
    color: "primary",
    dark: ""
  }, {
    default: withCtx(() => [
      createVNode(VAppBarNavIcon, {
        onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.syncedDrawer = !_ctx.syncedDrawer, ["stop"]))
      }),
      createVNode(VToolbarTitle, {
        style: { "width": "300px" },
        class: "ml-0 pl-4"
      }, {
        default: withCtx(() => [
          createVNode(_component_Link, {
            href: _ctx.route("dashboard"),
            class: "d-flex align-center gap-2 text-decoration-none hidden-sm-and-down"
          }, {
            default: withCtx(() => [
              createVNode(_component_ApplicationLogo, { class: "h-9 w-auto" }),
              createTextVNode(" " + toDisplayString(_ctx.appName), 1)
            ]),
            _: 1
          }, 8, ["href"])
        ]),
        _: 1
      }),
      createVNode(VSpacer),
      _ctx.$page.props.jetstream.hasTeamFeatures ? (openBlock(), createBlock(VMenu, { key: 0 }, {
        activator: withCtx(({ props }) => [
          createVNode(VBtn, normalizeProps(guardReactiveProps(props)), {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$page.props.auth.user.current_team.name) + " ", 1),
              createVNode(VIcon, { end: "" }, {
                default: withCtx(() => _cache[2] || (_cache[2] = [
                  createTextVNode("mdi-chevron-down")
                ])),
                _: 1
              })
            ]),
            _: 2
          }, 1040)
        ]),
        default: withCtx(() => [
          createVNode(VList, null, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.$page.props.auth.user.all_teams, (team) => {
                return openBlock(), createBlock(VListItem, {
                  key: team.id,
                  onClick: ($event) => _ctx.switchToTeam(team)
                }, {
                  default: withCtx(() => [
                    team.id == _ctx.$page.props.auth.user.current_team_id ? (openBlock(), createBlock(VIcon, {
                      key: 0,
                      color: "success"
                    }, {
                      default: withCtx(() => _cache[3] || (_cache[3] = [
                        createTextVNode("mdi-check")
                      ])),
                      _: 1
                    })) : createCommentVNode("", true),
                    createTextVNode(" " + toDisplayString(team.name), 1)
                  ]),
                  _: 2
                }, 1032, ["onClick"]);
              }), 128))
            ]),
            _: 1
          })
        ]),
        _: 1
      })) : createCommentVNode("", true),
      createVNode(VMenu, {
        bottom: "",
        left: "",
        "close-on-click": "",
        "offset-y": ""
      }, {
        activator: withCtx(({ props }) => [
          createVNode(VBtn, mergeProps({ icon: "" }, props), {
            default: withCtx(() => [
              createVNode(VBadge, {
                overlap: "",
                color: "green",
                content: _ctx.notifCount,
                value: _ctx.notifCount
              }, {
                default: withCtx(() => [
                  createVNode(VIcon, null, {
                    default: withCtx(() => _cache[4] || (_cache[4] = [
                      createTextVNode("mdi-bell")
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["content", "value"])
            ]),
            _: 2
          }, 1040)
        ]),
        default: withCtx(() => [
          createVNode(VList, null, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.notifs, (notif, i) => {
                return openBlock(), createBlock(VListItem, {
                  key: i,
                  onClick: _cache[1] || (_cache[1] = () => {
                  })
                }, {
                  default: withCtx(() => [
                    createVNode(VListItemTitle, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(notif.text), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(VMenu, {
        bottom: "",
        left: "",
        "close-on-click": "",
        "offset-y": ""
      }, {
        activator: withCtx(({ props }) => [
          createVNode(VBtn, mergeProps({
            icon: "",
            text: "",
            large: ""
          }, props), {
            default: withCtx(() => [
              createVNode(VAvatar, {
                size: "32",
                item: ""
              }, {
                default: withCtx(() => [
                  createVNode(VImg, {
                    src: _ctx.$page.props.auth.user.profile_photo_url,
                    alt: _ctx.$page.props.auth.user.name,
                    cover: ""
                  }, null, 8, ["src", "alt"])
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1040)
        ]),
        default: withCtx(() => [
          createVNode(VList, null, {
            default: withCtx(() => [
              createVNode(VListItem, {
                href: _ctx.route("profile.show")
              }, {
                default: withCtx(() => _cache[5] || (_cache[5] = [
                  createTextVNode("Profile")
                ])),
                _: 1
              }, 8, ["href"]),
              _ctx.$page.props.jetstream.hasApiFeatures ? (openBlock(), createBlock(VListItem, {
                key: 0,
                href: _ctx.route("api-tokens.index")
              }, {
                default: withCtx(() => _cache[6] || (_cache[6] = [
                  createTextVNode("API Tokens")
                ])),
                _: 1
              }, 8, ["href"])) : createCommentVNode("", true),
              createVNode(VListItem, { onClick: _ctx.logout }, {
                default: withCtx(() => _cache[7] || (_cache[7] = [
                  createTextVNode("Log Out")
                ])),
                _: 1
              }, 8, ["onClick"])
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
const TopNavBar2 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
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
let SideNavDrawer$1 = class SideNavDrawer extends MyComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "syncedDrawer");
    // @Prop(Boolean) drawer;
    // get syncedDrawer(){
    //     return this.drawer;
    // }
    // set syncedDrawer(value){
    //     this.$emit('update:drawer', value);
    // }
    __publicField(this, "items", [
      { icon: "mdi-home", text: "Dashboard", href: route("dashboard") },
      {
        icon: "mdi-chat",
        // 'icon-alt': 'mdi-chevron-down',
        text: "Chirper",
        model: false,
        children: [
          { text: "Chirps", href: route("chirps.index") }
        ]
      }
    ]);
  }
};
__decorateClass$4([
  decorator$1({ name: "drawer", type: Boolean })
], SideNavDrawer$1.prototype, "syncedDrawer", 2);
SideNavDrawer$1 = __decorateClass$4([
  Component({
    name: "SideNavDrawer",
    components: {
      VList,
      VListItem,
      VIcon,
      VRow,
      VCol,
      VNavigationDrawer,
      VListSubheader,
      VListGroup,
      VListItemAction,
      VListItemTitle
    }
  })
], SideNavDrawer$1);
const _sfc_main$4 = toNative(SideNavDrawer$1);
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VNavigationDrawer, {
    modelValue: _ctx.syncedDrawer,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.syncedDrawer = $event),
    app: ""
  }, {
    default: withCtx(() => [
      createVNode(VList, {
        dense: "",
        nav: ""
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item) => {
            return openBlock(), createElementBlock(Fragment, null, [
              item.heading ? (openBlock(), createBlock(VRow, {
                key: item.heading,
                align: "center"
              }, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "6" }, {
                    default: withCtx(() => [
                      item.heading ? (openBlock(), createBlock(VListSubheader, { key: 0 }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item.heading), 1)
                        ]),
                        _: 2
                      }, 1024)) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(VCol, {
                    cols: "6",
                    class: "text-center"
                  }, {
                    default: withCtx(() => _cache[1] || (_cache[1] = [
                      createBaseVNode("a", {
                        href: "#!",
                        class: "body-2 black--text"
                      }, "EDIT", -1)
                    ])),
                    _: 1
                  })
                ]),
                _: 2
              }, 1024)) : item.children ? (openBlock(), createBlock(VListGroup, {
                key: item.text + "g",
                modelValue: item.model,
                "onUpdate:modelValue": ($event) => item.model = $event,
                "prepend-icon": item.icon
              }, {
                activator: withCtx(({ props }) => [
                  createVNode(VListItem, mergeProps({ ref_for: true }, props), {
                    default: withCtx(() => [
                      createVNode(VListItemTitle, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item.text), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1040)
                ]),
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(item.children, (child, i) => {
                    return openBlock(), createBlock(VListItem, {
                      key: i,
                      href: child.href,
                      to: child.to,
                      link: ""
                    }, createSlots({
                      default: withCtx(() => [
                        createVNode(VListItemTitle, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(child.text), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, [
                      child.icon ? {
                        name: "prepend",
                        fn: withCtx(() => [
                          createVNode(VIcon, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(child.icon), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1032, ["href", "to"]);
                  }), 128))
                ]),
                _: 2
              }, 1032, ["modelValue", "onUpdate:modelValue", "prepend-icon"])) : (openBlock(), createBlock(VListItem, {
                key: item.text,
                href: item.href,
                to: item.to,
                link: ""
              }, createSlots({
                default: withCtx(() => [
                  createVNode(VListItemTitle, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(item.text), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, [
                item.icon ? {
                  name: "prepend",
                  fn: withCtx(() => [
                    createVNode(VIcon, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item.icon), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["href", "to"]))
            ], 64);
          }), 256))
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["modelValue"]);
}
const SideNavDrawer2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
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
let SharedIdle$1 = class SharedIdle extends MyComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "idleWait");
    __publicField(this, "syncedIdle");
    // @Prop({ type: Boolean }) idle;
    // get syncedIdle(){
    //     return this.idle;
    // }
    // set syncedIdle(value){
    //     this.$emit('update:idle', value);
    // }
    __publicField(this, "idleTimer", null);
  }
  get idleWaitMillis() {
    return this.idleWait * 1e3;
  }
  get sharedUserPresent() {
    return this.appStore.userPresent;
  }
  onSharedUserPresent(val, oldVal) {
    if (val != oldVal && val && this.syncedIdle) {
      this.syncedIdle = false;
    }
  }
  mounted() {
    const comp = this;
    this.idleTimer = window.setInterval(() => {
      if (comp.appStore.getIdleTime >= comp.idleWaitMillis && !comp.syncedIdle) {
        comp.syncedIdle = true;
      }
    }, 1e3);
  }
  beforeDestroy() {
    if (this.idleTimer) {
      window.clearInterval(this.idleTimer);
      this.idleTimer = null;
    }
  }
};
__decorateClass$3([
  decorator(Number)
], SharedIdle$1.prototype, "idleWait", 2);
__decorateClass$3([
  decorator$1({ name: "idle", type: Boolean })
], SharedIdle$1.prototype, "syncedIdle", 2);
__decorateClass$3([
  decorator$2("sharedUserPresent")
], SharedIdle$1.prototype, "onSharedUserPresent", 1);
SharedIdle$1 = __decorateClass$3([
  Component({
    name: "SharedIdle"
  })
], SharedIdle$1);
const _sfc_main$3 = toNative(SharedIdle$1);
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div");
}
const SharedIdle2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
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
let IdleOverlay$1 = class IdleOverlay extends MyComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "logoutWait");
    __publicField(this, "idleWait");
    __publicField(this, "logoutCountdown", 0);
    __publicField(this, "logoutTimer", null);
  }
  mounted() {
  }
  get logoutCountdownMinutes() {
    return ("0" + parseInt(this.logoutCountdown / 60)).slice(-2);
  }
  get logoutCountdownSeconds() {
    return ("0" + parseInt(this.logoutCountdown % 60)).slice(-2);
  }
  get idle() {
    return this.appStore.idle;
  }
  set idle(value) {
    if (!value) this.stopCountdown();
    else this.appStore.setIdle();
  }
  async logout() {
    this.stopCountdown();
    await authService.logout();
  }
  stopCountdown() {
    if (this.logoutTimer) {
      window.clearInterval(this.logoutTimer);
      this.logoutTimer = null;
      this.logoutCountdown = -1;
    }
  }
  startCountdown() {
    this.stopCountdown();
    this.logoutCountdown = this.logoutWait;
    const comp = this;
    this.logoutTimer = window.setInterval(function() {
      comp.logoutCountdown--;
    }, 1e3);
  }
  onIdle(val, oldVal) {
    if (val != oldVal) {
      if (val && this.isLoggedIn) {
        this.startCountdown();
      } else {
        this.stopCountdown();
      }
    }
  }
  onLogoutCountdownTick(val, oldVal) {
    if (oldVal > val && val == 0) {
      if (this.isLoggedIn) this.logout();
      else this.stopCountdown();
    }
  }
  onAuthChanged(val, oldVal) {
    if (val != oldVal && !val) {
      this.stopCountdown();
    }
  }
  beforeDestroy() {
    this.stopCountdown();
  }
};
__decorateClass$2([
  decorator(Number)
], IdleOverlay$1.prototype, "logoutWait", 2);
__decorateClass$2([
  decorator(Number)
], IdleOverlay$1.prototype, "idleWait", 2);
__decorateClass$2([
  decorator$2("idle")
], IdleOverlay$1.prototype, "onIdle", 1);
__decorateClass$2([
  decorator$2("logoutCountdown")
], IdleOverlay$1.prototype, "onLogoutCountdownTick", 1);
__decorateClass$2([
  decorator$2("isLoggedIn")
], IdleOverlay$1.prototype, "onAuthChanged", 1);
IdleOverlay$1 = __decorateClass$2([
  Component({
    name: "IdleOverlay",
    components: {
      SharedIdle: SharedIdle2
    }
  })
], IdleOverlay$1);
const _sfc_main$2 = toNative(IdleOverlay$1);
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_SharedIdle = resolveComponent("SharedIdle");
  return openBlock(), createElementBlock("div", null, [
    createVNode(VOverlay, { value: _ctx.logoutTimer }, {
      default: withCtx(() => [
        createVNode(VRow, {
          align: "center",
          justify: "center",
          class: "flex-column"
        }, {
          default: withCtx(() => [
            _cache[1] || (_cache[1] = createBaseVNode("h3", null, "Anda akan otomatis logout dalam", -1)),
            createBaseVNode("h2", null, toDisplayString(_ctx.logoutCountdownMinutes) + ":" + toDisplayString(_ctx.logoutCountdownSeconds), 1)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["value"]),
    createVNode(_component_SharedIdle, {
      "idle-wait": _ctx.idleWait,
      modelValue: _ctx.idle,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.idle = $event)
    }, null, 8, ["idle-wait", "modelValue"])
  ]);
}
const IdleOverlay2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
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
let MainView$1 = class MainView extends BaseView {
  constructor() {
    super(...arguments);
    __publicField(this, "transitionDuration", {
      enter: 300,
      leave: 300
    });
    __publicField(this, "transitionDelay", {
      enter: 300,
      leave: 0
    });
  }
  mounted() {
    console.log(this.$route);
  }
  get breadcrumbs() {
    return this.appStore.breadcrumbs;
  }
};
MainView$1 = __decorateClass$1([
  Component({
    name: "MainView",
    components: {
      LoginView,
      VSlideYTransition,
      VSlideXTransition,
      VExpandTransition
    }
  })
], MainView$1);
const _sfc_main$1 = toNative(MainView$1);
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_LoginView = resolveComponent("LoginView");
  return openBlock(), createBlock(VExpandTransition, {
    appear: "",
    class: "fill-height"
  }, {
    default: withCtx(() => [
      !_ctx.isLoggedIn ? (openBlock(), createBlock(_component_LoginView, {
        appear: "",
        key: "login"
      })) : (openBlock(), createBlock(VContainer, {
        appear: "",
        class: "",
        align: "start",
        justify: "start",
        key: "main"
      }, {
        default: withCtx(() => [
          createVNode(Transition, {
            appear: "",
            name: "fade",
            mode: "out-in"
          }, {
            default: withCtx(() => [
              _ctx.serverReachable && _ctx.isLoggedIn && _ctx.breadcrumbs && _ctx.breadcrumbs.length ? (openBlock(), createBlock(VRow, {
                key: 0,
                appear: "",
                class: "",
                align: "start",
                justify: "start"
              }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    align: "start",
                    justify: "start"
                  }, {
                    default: withCtx(() => [
                      createVNode(VAlert, {
                        color: "grey",
                        text: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(VBreadcrumbs, {
                            class: "py-0",
                            items: _ctx.breadcrumbs,
                            large: ""
                          }, {
                            divider: withCtx(() => [
                              createVNode(VIcon, null, {
                                default: withCtx(() => _cache[0] || (_cache[0] = [
                                  createTextVNode("mdi-chevron-right")
                                ])),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["items"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          createVNode(VSlideYTransition, {
            group: "",
            appear: "",
            duration: _ctx.transitionDuration
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", { key: "main" })
            ]),
            _: 3
          }, 8, ["duration"]),
          createVNode(VSpacer)
        ]),
        _: 3
      }))
    ]),
    _: 3
  });
}
const MainView2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
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
let AppLayout$1 = class AppLayout extends GuestLayout {
  constructor() {
    super(...arguments);
    __publicField(this, "appName", "Chirper");
    __publicField(this, "drawer", false);
  }
  toggleDrawer(drawer) {
    this.drawer = drawer;
  }
  get globalRefresh() {
    return this.appStore.globalRefresh;
  }
  get globalLogout() {
    return this.appStore.globalLogout;
  }
  onGlobalRefreshFlagSet(val, oldVal) {
    if (val) {
      this.appStore.routerBusy = true;
      this.appStore.globalRefresh = false;
      window.location.reload();
    }
  }
  onGlobalLogoutFlagSet(val, oldVal) {
    if (val) {
      this.appStore.globalLogout = false;
    }
  }
};
__decorateClass([
  decorator$2("globalRefresh")
], AppLayout$1.prototype, "onGlobalRefreshFlagSet", 1);
__decorateClass([
  decorator$2("globalLogout")
], AppLayout$1.prototype, "onGlobalLogoutFlagSet", 1);
AppLayout$1 = __decorateClass([
  Component({
    components: {
      TopNavBar: TopNavBar2,
      SideNavDrawer: SideNavDrawer2,
      ImageBackground,
      LoadingOverlay,
      DialogStack,
      IdleOverlay: IdleOverlay2,
      ServerDownView,
      MainView: MainView2,
      Head: me
    }
  })
], AppLayout$1);
const _sfc_main = toNative(AppLayout$1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_TopNavBar = resolveComponent("TopNavBar");
  const _component_SideNavDrawer = resolveComponent("SideNavDrawer");
  const _component_ImageBackground = resolveComponent("ImageBackground");
  const _component_ServerDownView = resolveComponent("ServerDownView");
  const _component_MainView = resolveComponent("MainView");
  const _component_IdleOverlay = resolveComponent("IdleOverlay");
  const _component_LoadingOverlay = resolveComponent("LoadingOverlay");
  const _component_DialogStack = resolveComponent("DialogStack");
  return openBlock(), createBlock(VApp, null, {
    default: withCtx(() => [
      createVNode(_component_Head, { title: _ctx.title }, null, 8, ["title"]),
      createVNode(VExpandTransition, {
        appear: "",
        mode: "out-in"
      }, {
        default: withCtx(() => [
          _ctx.isLoggedIn ? (openBlock(), createBlock(_component_TopNavBar, {
            key: 0,
            appear: "",
            drawer: _ctx.drawer,
            "onUpdate:drawer": _ctx.toggleDrawer
          }, null, 8, ["drawer", "onUpdate:drawer"])) : createCommentVNode("", true)
        ]),
        _: 1
      }),
      _ctx.isLoggedIn ? (openBlock(), createBlock(_component_SideNavDrawer, {
        key: 0,
        appname: _ctx.appName,
        drawer: _ctx.drawer,
        "onUpdate:drawer": _ctx.toggleDrawer
      }, null, 8, ["appname", "drawer", "onUpdate:drawer"])) : createCommentVNode("", true),
      _ctx.showBackground ? (openBlock(), createBlock(_component_ImageBackground, { key: 1 })) : createCommentVNode("", true),
      createVNode(VMain, null, {
        default: withCtx(() => [
          createVNode(VExpandTransition, { appear: "" }, {
            default: withCtx(() => [
              !_ctx.serverReachable ? (openBlock(), createBlock(_component_ServerDownView, {
                appear: "",
                key: "down"
              })) : (openBlock(), createBlock(_component_MainView, { key: "main" }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }))
            ]),
            _: 3
          })
        ]),
        _: 3
      }),
      createVNode(_component_IdleOverlay, {
        "idle-wait": 300,
        "logout-wait": 300
      }),
      createVNode(_component_LoadingOverlay),
      createVNode(_component_DialogStack, {
        items: _ctx.tabDialogs,
        onDialogstackpop: _ctx.popTabDialog
      }, null, 8, ["items", "onDialogstackpop"])
    ]),
    _: 3
  });
}
const AppLayout2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  AppLayout2 as A,
  ApplicationLogo as a
};
//# sourceMappingURL=AppLayout-BTUHKS5A.js.map
