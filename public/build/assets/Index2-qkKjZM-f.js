var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { A as AppLayout } from "./AppLayout-CCsEuygK.js";
import { O as isOn, p as propsFactory, l as genericComponent, x as watch, e as createVNode, F as Fragment, D as mergeProps, P as useDisplay, s as shallowRef, q as watchEffect, n as ref, m as computed, Q as onScopeDispose, J as clamp, R as isObject, S as debounce, z as nextTick, T as IN_BROWSER, U as getCurrentInstance, W as toRef, X as useToggleScope, v as onMounted, A as convertToUnit, Y as IconValue, Z as omit, $ as useLocale, u as useProxiedModel, a0 as wrapInArray, a1 as deepEqual, a2 as ensureValidVNode, h as createTextVNode, a3 as checkPrintable, a4 as matchesSelector, a5 as unref, a6 as getPropertyFromItem, a7 as provide, a8 as inject, a9 as getObjectValueByPath, aa as isEmpty, ab as onBeforeUpdate, ac as makeThemeProps, ad as useRtl, ae as provideTheme, af as provideDefaults, ag as createRange, ah as keyValues, ai as defineFunctionalComponent, aj as capitalize, ak as consoleError, al as makeDisplayProps, am as EventProp, i as withModifiers, M as toDisplayString, an as toRefs, ao as getUid, b as Component, t as toNative, V as Vue, _ as _export_sfc, o as openBlock, c as createBlock, w as withCtx, ap as renderSlot, a as decorator, r as resolveComponent, N as createCommentVNode, aq as WorkingComponent, ar as decorator$1, L as decorator$2, g as createBaseVNode, j as createElementBlock, C, as as MyComponent, at as BaseView, au as decorator$3, f as findIndex, d as deleteFromArray, K as dayjs } from "./app-DDBQLYRK.js";
import { C as CardTitle, V as VForm } from "./Login-D98toHKk.js";
import { b as VRow, c as VSpacer, d as VCardTitle, e as VCardText, a as VCard, f as VCardActions, g as VDialog, V as VContainer } from "./GuestLayout.vue_vue_type_script_lang-2s0GDYYy.js";
import { V as VCol } from "./VCol-BlRM1PkL.js";
import { m as makeComponentProps, b as useResizeObserver, u as useRender, c as makeDimensionProps, d as useDimension, g as getScrollParent, e as makeTransitionProps, h as VDialogTransition, i as VAvatar, a as VIcon, j as VDefaultsProvider, f as forwardRefs, k as makeBorderProps, l as makeDensityProps, n as makeElevationProps, o as makeRoundedProps, p as makeSizeProps, q as makeTagProps, r as makeVariantProps, V as VBtn, s as makeLoaderProps, t as useLoader, v as useBackgroundColor, L as LoaderSlot, w as useDensity, x as makeVOverlayProps, y as useScopeId, z as VOverlay } from "./forwardRefs-B6F8wykm.js";
import { m as makeVTextFieldProps, V as VTextField } from "./VTextField-vouJgQdh.js";
import { V as VCheckboxBtn, a as VCheckbox } from "./VCheckbox-Igf5GVeL.js";
import { c as chirpService } from "./chirp-CiCeBEuc.js";
import { d as useForm } from "./InputError-ytemAFXd.js";
import { m as makeItemsProps, u as useItems, V as VMenu, a as VList, b as VListItem, c as VDivider } from "./VMenu-BESDRVXS.js";
import { V as VChip } from "./VChip-DYXUBL3A.js";
import "./Auth.vue_vue_type_script_lang-BqrvBsHH.js";
import "./AuthenticationCardLogo-D6E1IMSQ.js";
function getPrefixedEventHandlers(attrs, suffix, getData) {
  return Object.keys(attrs).filter((key) => isOn(key) && key.endsWith(suffix)).reduce((acc, key) => {
    acc[key.slice(0, -suffix.length)] = (event) => attrs[key](event, getData(event));
    return acc;
  }, {});
}
const makeVVirtualScrollItemProps = propsFactory({
  renderless: Boolean,
  ...makeComponentProps()
}, "VVirtualScrollItem");
const VVirtualScrollItem = genericComponent()({
  name: "VVirtualScrollItem",
  inheritAttrs: false,
  props: makeVVirtualScrollItemProps(),
  emits: {
    "update:height": (height) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      resizeRef,
      contentRect
    } = useResizeObserver(void 0, "border");
    watch(() => {
      var _a;
      return (_a = contentRect.value) == null ? void 0 : _a.height;
    }, (height) => {
      if (height != null) emit("update:height", height);
    });
    useRender(() => {
      var _a, _b;
      return props.renderless ? createVNode(Fragment, null, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
        itemRef: resizeRef
      })]) : createVNode("div", mergeProps({
        "ref": resizeRef,
        "class": ["v-virtual-scroll__item", props.class],
        "style": props.style
      }, attrs), [(_b = slots.default) == null ? void 0 : _b.call(slots)]);
    });
  }
});
const UP = -1;
const DOWN = 1;
const BUFFER_PX = 100;
const makeVirtualProps = propsFactory({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  height: [Number, String]
}, "virtual");
function useVirtual(props, items) {
  const display = useDisplay();
  const itemHeight = shallowRef(0);
  watchEffect(() => {
    itemHeight.value = parseFloat(props.itemHeight || 0);
  });
  const first = shallowRef(0);
  const last = shallowRef(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(props.height) || display.height.value) / (itemHeight.value || 16)
  ) || 1);
  const paddingTop = shallowRef(0);
  const paddingBottom = shallowRef(0);
  const containerRef = ref();
  const markerRef = ref();
  let markerOffset = 0;
  const {
    resizeRef,
    contentRect
  } = useResizeObserver();
  watchEffect(() => {
    resizeRef.value = containerRef.value;
  });
  const viewportHeight = computed(() => {
    var _a;
    return containerRef.value === document.documentElement ? display.height.value : ((_a = contentRect.value) == null ? void 0 : _a.height) || parseInt(props.height) || 0;
  });
  const hasInitialRender = computed(() => {
    return !!(containerRef.value && markerRef.value && viewportHeight.value && itemHeight.value);
  });
  let sizes = Array.from({
    length: items.value.length
  });
  let offsets = Array.from({
    length: items.value.length
  });
  const updateTime = shallowRef(0);
  let targetScrollIndex = -1;
  function getSize(index) {
    return sizes[index] || itemHeight.value;
  }
  const updateOffsets = debounce(() => {
    const start = performance.now();
    offsets[0] = 0;
    const length = items.value.length;
    for (let i = 1; i <= length - 1; i++) {
      offsets[i] = (offsets[i - 1] || 0) + getSize(i - 1);
    }
    updateTime.value = Math.max(updateTime.value, performance.now() - start);
  }, updateTime);
  const unwatch = watch(hasInitialRender, (v) => {
    if (!v) return;
    unwatch();
    markerOffset = markerRef.value.offsetTop;
    updateOffsets.immediate();
    calculateVisibleItems();
    if (!~targetScrollIndex) return;
    nextTick(() => {
      IN_BROWSER && window.requestAnimationFrame(() => {
        scrollToIndex(targetScrollIndex);
        targetScrollIndex = -1;
      });
    });
  });
  onScopeDispose(() => {
    updateOffsets.clear();
  });
  function handleItemResize(index, height) {
    const prevHeight = sizes[index];
    const prevMinHeight = itemHeight.value;
    itemHeight.value = prevMinHeight ? Math.min(itemHeight.value, height) : height;
    if (prevHeight !== height || prevMinHeight !== itemHeight.value) {
      sizes[index] = height;
      updateOffsets();
    }
  }
  function calculateOffset(index) {
    index = clamp(index, 0, items.value.length - 1);
    return offsets[index] || 0;
  }
  function calculateIndex(scrollTop) {
    return binaryClosest(offsets, scrollTop);
  }
  let lastScrollTop = 0;
  let scrollVelocity = 0;
  let lastScrollTime = 0;
  watch(viewportHeight, (val, oldVal) => {
    if (oldVal) {
      calculateVisibleItems();
      if (val < oldVal) {
        requestAnimationFrame(() => {
          scrollVelocity = 0;
          calculateVisibleItems();
        });
      }
    }
  });
  let scrollTimeout = -1;
  function handleScroll() {
    if (!containerRef.value || !markerRef.value) return;
    const scrollTop = containerRef.value.scrollTop;
    const scrollTime = performance.now();
    const scrollDeltaT = scrollTime - lastScrollTime;
    if (scrollDeltaT > 500) {
      scrollVelocity = Math.sign(scrollTop - lastScrollTop);
      markerOffset = markerRef.value.offsetTop;
    } else {
      scrollVelocity = scrollTop - lastScrollTop;
    }
    lastScrollTop = scrollTop;
    lastScrollTime = scrollTime;
    window.clearTimeout(scrollTimeout);
    scrollTimeout = window.setTimeout(handleScrollend, 500);
    calculateVisibleItems();
  }
  function handleScrollend() {
    if (!containerRef.value || !markerRef.value) return;
    scrollVelocity = 0;
    lastScrollTime = 0;
    window.clearTimeout(scrollTimeout);
    calculateVisibleItems();
  }
  let raf = -1;
  function calculateVisibleItems() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(_calculateVisibleItems);
  }
  function _calculateVisibleItems() {
    if (!containerRef.value || !viewportHeight.value) return;
    const scrollTop = lastScrollTop - markerOffset;
    const direction = Math.sign(scrollVelocity);
    const startPx = Math.max(0, scrollTop - BUFFER_PX);
    const start = clamp(calculateIndex(startPx), 0, items.value.length);
    const endPx = scrollTop + viewportHeight.value + BUFFER_PX;
    const end = clamp(calculateIndex(endPx) + 1, start + 1, items.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (direction !== UP || start < first.value) && (direction !== DOWN || end > last.value)
    ) {
      const topOverflow = calculateOffset(first.value) - calculateOffset(start);
      const bottomOverflow = calculateOffset(end) - calculateOffset(last.value);
      const bufferOverflow = Math.max(topOverflow, bottomOverflow);
      if (bufferOverflow > BUFFER_PX) {
        first.value = start;
        last.value = end;
      } else {
        if (start <= 0) first.value = start;
        if (end >= items.value.length) last.value = end;
      }
    }
    paddingTop.value = calculateOffset(first.value);
    paddingBottom.value = calculateOffset(items.value.length) - calculateOffset(last.value);
  }
  function scrollToIndex(index) {
    const offset = calculateOffset(index);
    if (!containerRef.value || index && !offset) {
      targetScrollIndex = index;
    } else {
      containerRef.value.scrollTop = offset;
    }
  }
  const computedItems = computed(() => {
    return items.value.slice(first.value, last.value).map((item, index) => ({
      raw: item,
      index: index + first.value,
      key: isObject(item) && "value" in item ? item.value : index + first.value
    }));
  });
  watch(items, () => {
    sizes = Array.from({
      length: items.value.length
    });
    offsets = Array.from({
      length: items.value.length
    });
    updateOffsets.immediate();
    calculateVisibleItems();
  }, {
    deep: true
  });
  return {
    calculateVisibleItems,
    containerRef,
    markerRef,
    computedItems,
    paddingTop,
    paddingBottom,
    scrollToIndex,
    handleScroll,
    handleScrollend,
    handleItemResize
  };
}
function binaryClosest(arr, val) {
  let high = arr.length - 1;
  let low = 0;
  let mid = 0;
  let item = null;
  let target = -1;
  if (arr[high] < val) {
    return high;
  }
  while (low <= high) {
    mid = low + high >> 1;
    item = arr[mid];
    if (item > val) {
      high = mid - 1;
    } else if (item < val) {
      target = mid;
      low = mid + 1;
    } else if (item === val) {
      return mid;
    } else {
      return low;
    }
  }
  return target;
}
const makeVVirtualScrollProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...makeVirtualProps(),
  ...makeComponentProps(),
  ...makeDimensionProps()
}, "VVirtualScroll");
const VVirtualScroll = genericComponent()({
  name: "VVirtualScroll",
  props: makeVVirtualScrollProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const vm = getCurrentInstance("VVirtualScroll");
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      calculateVisibleItems,
      containerRef,
      markerRef,
      handleScroll,
      handleScrollend,
      handleItemResize,
      scrollToIndex,
      paddingTop,
      paddingBottom,
      computedItems
    } = useVirtual(props, toRef(props, "items"));
    useToggleScope(() => props.renderless, () => {
      function handleListeners() {
        var _a, _b;
        let add = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        const method = add ? "addEventListener" : "removeEventListener";
        if (containerRef.value === document.documentElement) {
          document[method]("scroll", handleScroll, {
            passive: true
          });
          document[method]("scrollend", handleScrollend);
        } else {
          (_a = containerRef.value) == null ? void 0 : _a[method]("scroll", handleScroll, {
            passive: true
          });
          (_b = containerRef.value) == null ? void 0 : _b[method]("scrollend", handleScrollend);
        }
      }
      onMounted(() => {
        containerRef.value = getScrollParent(vm.vnode.el, true);
        handleListeners(true);
      });
      onScopeDispose(handleListeners);
    });
    useRender(() => {
      const children = computedItems.value.map((item) => createVNode(VVirtualScrollItem, {
        "key": item.key,
        "renderless": props.renderless,
        "onUpdate:height": (height) => handleItemResize(item.index, height)
      }, {
        default: (slotProps) => {
          var _a;
          return (_a = slots.default) == null ? void 0 : _a.call(slots, {
            item: item.raw,
            index: item.index,
            ...slotProps
          });
        }
      }));
      return props.renderless ? createVNode(Fragment, null, [createVNode("div", {
        "ref": markerRef,
        "class": "v-virtual-scroll__spacer",
        "style": {
          paddingTop: convertToUnit(paddingTop.value)
        }
      }, null), children, createVNode("div", {
        "class": "v-virtual-scroll__spacer",
        "style": {
          paddingBottom: convertToUnit(paddingBottom.value)
        }
      }, null)]) : createVNode("div", {
        "ref": containerRef,
        "class": ["v-virtual-scroll", props.class],
        "onScrollPassive": handleScroll,
        "onScrollend": handleScrollend,
        "style": [dimensionStyles.value, props.style]
      }, [createVNode("div", {
        "ref": markerRef,
        "class": "v-virtual-scroll__container",
        "style": {
          paddingTop: convertToUnit(paddingTop.value),
          paddingBottom: convertToUnit(paddingBottom.value)
        }
      }, [children])]);
    });
    return {
      calculateVisibleItems,
      scrollToIndex
    };
  }
});
function useScrolling(listRef, textFieldRef) {
  const isScrolling = shallowRef(false);
  let scrollTimeout;
  function onListScroll(e) {
    cancelAnimationFrame(scrollTimeout);
    isScrolling.value = true;
    scrollTimeout = requestAnimationFrame(() => {
      scrollTimeout = requestAnimationFrame(() => {
        isScrolling.value = false;
      });
    });
  }
  async function finishScrolling() {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => {
      if (isScrolling.value) {
        const stop = watch(isScrolling, () => {
          stop();
          resolve();
        });
      } else resolve();
    });
  }
  async function onListKeydown(e) {
    var _a, _b;
    if (e.key === "Tab") {
      (_a = textFieldRef.value) == null ? void 0 : _a.focus();
    }
    if (!["PageDown", "PageUp", "Home", "End"].includes(e.key)) return;
    const el = (_b = listRef.value) == null ? void 0 : _b.$el;
    if (!el) return;
    if (e.key === "Home" || e.key === "End") {
      el.scrollTo({
        top: e.key === "Home" ? 0 : el.scrollHeight,
        behavior: "smooth"
      });
    }
    await finishScrolling();
    const children = el.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (e.key === "PageDown" || e.key === "Home") {
      const top = el.getBoundingClientRect().top;
      for (const child of children) {
        if (child.getBoundingClientRect().top >= top) {
          child.focus();
          break;
        }
      }
    } else {
      const bottom = el.getBoundingClientRect().bottom;
      for (const child of [...children].reverse()) {
        if (child.getBoundingClientRect().bottom <= bottom) {
          child.focus();
          break;
        }
      }
    }
  }
  return {
    onScrollPassive: onListScroll,
    onKeydown: onListKeydown
  };
}
const makeSelectProps = propsFactory({
  chips: Boolean,
  closableChips: Boolean,
  closeText: {
    type: String,
    default: "$vuetify.close"
  },
  openText: {
    type: String,
    default: "$vuetify.open"
  },
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  listProps: {
    type: Object
  },
  menu: Boolean,
  menuIcon: {
    type: IconValue,
    default: "$dropdown"
  },
  menuProps: {
    type: Object
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  openOnClear: Boolean,
  itemColor: String,
  ...makeItemsProps({
    itemChildren: false
  })
}, "Select");
const makeVSelectProps = propsFactory({
  ...makeSelectProps(),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...makeTransitionProps({
    transition: {
      component: VDialogTransition
    }
  })
}, "VSelect");
const VSelect = genericComponent()({
  name: "VSelect",
  props: makeVSelectProps(),
  emits: {
    "update:focused": (focused) => true,
    "update:modelValue": (value) => true,
    "update:menu": (ue) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const vMenuRef = ref();
    const vVirtualScrollRef = ref();
    const _menu = useProxiedModel(props, "menu");
    const menu = computed({
      get: () => _menu.value,
      set: (v) => {
        var _a;
        if (_menu.value && !v && ((_a = vMenuRef.value) == null ? void 0 : _a.ΨopenChildren.size)) return;
        _menu.value = v;
      }
    });
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(v === null ? [null] : wrapInArray(v)), (v) => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0] ?? null;
    });
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : typeof props.counterValue === "number" ? props.counterValue : model.value.length;
    });
    const form = useForm(props);
    const selectedValues = computed(() => model.value.map((selection) => selection.value));
    const isFocused = shallowRef(false);
    const label = computed(() => menu.value ? props.closeText : props.openText);
    let keyboardLookupPrefix = "";
    let keyboardLookupLastTime;
    const displayItems = computed(() => {
      if (props.hideSelected) {
        return items.value.filter((item) => !model.value.some((s) => (props.valueComparator || deepEqual)(s, item)));
      }
      return items.value;
    });
    const menuDisabled = computed(() => props.hideNoData && !displayItems.value.length || form.isReadonly.value || form.isDisabled.value);
    const computedMenuProps = computed(() => {
      var _a;
      return {
        ...props.menuProps,
        activatorProps: {
          ...((_a = props.menuProps) == null ? void 0 : _a.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    });
    const listRef = ref();
    const listEvents = useScrolling(listRef, vTextFieldRef);
    function onClear(e) {
      if (props.openOnClear) {
        menu.value = true;
      }
    }
    function onMousedownControl() {
      if (menuDisabled.value) return;
      menu.value = !menu.value;
    }
    function onListKeydown(e) {
      if (checkPrintable(e)) {
        onKeydown(e);
      }
    }
    function onKeydown(e) {
      var _a, _b;
      if (!e.key || form.isReadonly.value) return;
      if (["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
        e.preventDefault();
      }
      if (["Enter", "ArrowDown", " "].includes(e.key)) {
        menu.value = true;
      }
      if (["Escape", "Tab"].includes(e.key)) {
        menu.value = false;
      }
      if (e.key === "Home") {
        (_a = listRef.value) == null ? void 0 : _a.focus("first");
      } else if (e.key === "End") {
        (_b = listRef.value) == null ? void 0 : _b.focus("last");
      }
      const KEYBOARD_LOOKUP_THRESHOLD = 1e3;
      if (!checkPrintable(e)) return;
      const now = performance.now();
      if (now - keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
        keyboardLookupPrefix = "";
      }
      keyboardLookupPrefix += e.key.toLowerCase();
      keyboardLookupLastTime = now;
      const item = items.value.find((item2) => item2.title.toLowerCase().startsWith(keyboardLookupPrefix));
      if (item !== void 0) {
        model.value = [item];
        const index = displayItems.value.indexOf(item);
        IN_BROWSER && window.requestAnimationFrame(() => {
          var _a2;
          index >= 0 && ((_a2 = vVirtualScrollRef.value) == null ? void 0 : _a2.scrollToIndex(index));
        });
      }
    }
    function select(item) {
      let set = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (item.props.disabled) return;
      if (props.multiple) {
        const index = model.value.findIndex((selection) => (props.valueComparator || deepEqual)(selection.value, item.value));
        const add = set == null ? !~index : set;
        if (~index) {
          const value = add ? [...model.value, item] : [...model.value];
          value.splice(index, 1);
          model.value = value;
        } else if (add) {
          model.value = [...model.value, item];
        }
      } else {
        const add = set !== false;
        model.value = add ? [item] : [];
        nextTick(() => {
          menu.value = false;
        });
      }
    }
    function onBlur(e) {
      var _a;
      if (!((_a = listRef.value) == null ? void 0 : _a.$el.contains(e.relatedTarget))) {
        menu.value = false;
      }
    }
    function onAfterEnter() {
      var _a;
      if (props.eager) {
        (_a = vVirtualScrollRef.value) == null ? void 0 : _a.calculateVisibleItems();
      }
    }
    function onAfterLeave() {
      var _a;
      if (isFocused.value) {
        (_a = vTextFieldRef.value) == null ? void 0 : _a.focus();
      }
    }
    function onFocusin(e) {
      isFocused.value = true;
    }
    function onModelUpdate(v) {
      if (v == null) model.value = [];
      else if (matchesSelector(vTextFieldRef.value, ":autofill") || matchesSelector(vTextFieldRef.value, ":-webkit-autofill")) {
        const item = items.value.find((item2) => item2.title === v);
        if (item) {
          select(item);
        }
      } else if (vTextFieldRef.value) {
        vTextFieldRef.value.value = "";
      }
    }
    watch(menu, () => {
      if (!props.hideSelected && menu.value && model.value.length) {
        const index = displayItems.value.findIndex((item) => model.value.some((s) => (props.valueComparator || deepEqual)(s.value, item.value)));
        IN_BROWSER && window.requestAnimationFrame(() => {
          var _a;
          index >= 0 && ((_a = vVirtualScrollRef.value) == null ? void 0 : _a.scrollToIndex(index));
        });
      }
    });
    watch(() => props.items, (newVal, oldVal) => {
      if (menu.value) return;
      if (isFocused.value && !oldVal.length && newVal.length) {
        menu.value = true;
      }
    });
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      const hasList = !!(!props.hideNoData || displayItems.value.length || slots["prepend-item"] || slots["append-item"] || slots["no-data"]);
      const isDirty = model.value.length > 0;
      const textFieldProps = VTextField.filterProps(props);
      const placeholder = isDirty || !isFocused.value && props.label && !props.persistentPlaceholder ? void 0 : props.placeholder;
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": model.value.map((v) => v.props.value).join(", "),
        "onUpdate:modelValue": onModelUpdate,
        "focused": isFocused.value,
        "onUpdate:focused": ($event) => isFocused.value = $event,
        "validationValue": model.externalValue,
        "counterValue": counterValue.value,
        "dirty": isDirty,
        "class": ["v-select", {
          "v-select--active-menu": menu.value,
          "v-select--chips": !!props.chips,
          [`v-select--${props.multiple ? "multiple" : "single"}`]: true,
          "v-select--selected": model.value.length,
          "v-select--selection-slot": !!slots.selection
        }, props.class],
        "style": props.style,
        "inputmode": "none",
        "placeholder": placeholder,
        "onClick:clear": onClear,
        "onMousedown:control": onMousedownControl,
        "onBlur": onBlur,
        "onKeydown": onKeydown,
        "aria-label": t(label.value),
        "title": t(label.value)
      }), {
        ...slots,
        default: () => createVNode(Fragment, null, [createVNode(VMenu, mergeProps({
          "ref": vMenuRef,
          "modelValue": menu.value,
          "onUpdate:modelValue": ($event) => menu.value = $event,
          "activator": "parent",
          "contentClass": "v-select__content",
          "disabled": menuDisabled.value,
          "eager": props.eager,
          "maxHeight": 310,
          "openOnClick": false,
          "closeOnContentClick": false,
          "transition": props.transition,
          "onAfterEnter": onAfterEnter,
          "onAfterLeave": onAfterLeave
        }, computedMenuProps.value), {
          default: () => [hasList && createVNode(VList, mergeProps({
            "ref": listRef,
            "selected": selectedValues.value,
            "selectStrategy": props.multiple ? "independent" : "single-independent",
            "onMousedown": (e) => e.preventDefault(),
            "onKeydown": onListKeydown,
            "onFocusin": onFocusin,
            "tabindex": "-1",
            "aria-live": "polite",
            "color": props.itemColor ?? props.color
          }, listEvents, props.listProps), {
            default: () => {
              var _a, _b, _c;
              return [(_a = slots["prepend-item"]) == null ? void 0 : _a.call(slots), !displayItems.value.length && !props.hideNoData && (((_b = slots["no-data"]) == null ? void 0 : _b.call(slots)) ?? createVNode(VListItem, {
                "key": "no-data",
                "title": t(props.noDataText)
              }, null)), createVNode(VVirtualScroll, {
                "ref": vVirtualScrollRef,
                "renderless": true,
                "items": displayItems.value
              }, {
                default: (_ref2) => {
                  var _a2;
                  let {
                    item,
                    index,
                    itemRef
                  } = _ref2;
                  const itemProps = mergeProps(item.props, {
                    ref: itemRef,
                    key: item.value,
                    onClick: () => select(item, null)
                  });
                  return ((_a2 = slots.item) == null ? void 0 : _a2.call(slots, {
                    item,
                    index,
                    props: itemProps
                  })) ?? createVNode(VListItem, mergeProps(itemProps, {
                    "role": "option"
                  }), {
                    prepend: (_ref3) => {
                      let {
                        isSelected
                      } = _ref3;
                      return createVNode(Fragment, null, [props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                        "key": item.value,
                        "modelValue": isSelected,
                        "ripple": false,
                        "tabindex": "-1"
                      }, null) : void 0, item.props.prependAvatar && createVNode(VAvatar, {
                        "image": item.props.prependAvatar
                      }, null), item.props.prependIcon && createVNode(VIcon, {
                        "icon": item.props.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (_c = slots["append-item"]) == null ? void 0 : _c.call(slots)];
            }
          })]
        }), model.value.map((item, index) => {
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(item, false);
          }
          const slotProps = {
            "onClick:close": onChipClose,
            onKeydown(e) {
              if (e.key !== "Enter" && e.key !== " ") return;
              e.preventDefault();
              e.stopPropagation();
              onChipClose(e);
            },
            onMousedown(e) {
              e.preventDefault();
              e.stopPropagation();
            },
            modelValue: true,
            "onUpdate:modelValue": void 0
          };
          const hasSlot = hasChips ? !!slots.chip : !!slots.selection;
          const slotContent = hasSlot ? ensureValidVNode(hasChips ? slots.chip({
            item,
            index,
            props: slotProps
          }) : slots.selection({
            item,
            index
          })) : void 0;
          if (hasSlot && !slotContent) return void 0;
          return createVNode("div", {
            "key": item.value,
            "class": "v-select__selection"
          }, [hasChips ? !slots.chip ? createVNode(VChip, mergeProps({
            "key": "chip",
            "closable": props.closableChips,
            "size": "small",
            "text": item.title,
            "disabled": item.props.disabled
          }, slotProps), null) : createVNode(VDefaultsProvider, {
            "key": "chip-defaults",
            "defaults": {
              VChip: {
                closable: props.closableChips,
                size: "small",
                text: item.title
              }
            }
          }, {
            default: () => [slotContent]
          }) : slotContent ?? createVNode("span", {
            "class": "v-select__selection-text"
          }, [item.title, props.multiple && index < model.value.length - 1 && createVNode("span", {
            "class": "v-select__selection-comma"
          }, [createTextVNode(",")])])]);
        })]),
        "append-inner": function() {
          var _a;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(Fragment, null, [(_a = slots["append-inner"]) == null ? void 0 : _a.call(slots, ...args), props.menuIcon ? createVNode(VIcon, {
            "class": "v-select__menu-icon",
            "icon": props.menuIcon
          }, null) : void 0]);
        }
      });
    });
    return forwardRefs({
      isFocused,
      menu,
      select
    }, vTextFieldRef);
  }
});
const defaultFilter = (value, query, item) => {
  if (value == null || query == null) return -1;
  return value.toString().toLocaleLowerCase().indexOf(query.toString().toLocaleLowerCase());
};
const makeFilterProps = propsFactory({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function filterItems(items, query, options) {
  var _a;
  const array = [];
  const filter = (options == null ? void 0 : options.default) ?? defaultFilter;
  const keys = (options == null ? void 0 : options.filterKeys) ? wrapInArray(options.filterKeys) : false;
  const customFiltersLength = Object.keys((options == null ? void 0 : options.customKeyFilter) ?? {}).length;
  if (!(items == null ? void 0 : items.length)) return array;
  loop: for (let i = 0; i < items.length; i++) {
    const [item, transformed = item] = wrapInArray(items[i]);
    const customMatches = {};
    const defaultMatches = {};
    let match = -1;
    if ((query || customFiltersLength > 0) && !(options == null ? void 0 : options.noFilter)) {
      if (typeof item === "object") {
        const filterKeys = keys || Object.keys(transformed);
        for (const key of filterKeys) {
          const value = getPropertyFromItem(transformed, key);
          const keyFilter = (_a = options == null ? void 0 : options.customKeyFilter) == null ? void 0 : _a[key];
          match = keyFilter ? keyFilter(value, query, item) : filter(value, query, item);
          if (match !== -1 && match !== false) {
            if (keyFilter) customMatches[key] = match;
            else defaultMatches[key] = match;
          } else if ((options == null ? void 0 : options.filterMode) === "every") {
            continue loop;
          }
        }
      } else {
        match = filter(item, query, item);
        if (match !== -1 && match !== false) {
          defaultMatches.title = match;
        }
      }
      const defaultMatchesLength = Object.keys(defaultMatches).length;
      const customMatchesLength = Object.keys(customMatches).length;
      if (!defaultMatchesLength && !customMatchesLength) continue;
      if ((options == null ? void 0 : options.filterMode) === "union" && customMatchesLength !== customFiltersLength && !defaultMatchesLength) continue;
      if ((options == null ? void 0 : options.filterMode) === "intersection" && (customMatchesLength !== customFiltersLength || !defaultMatchesLength)) continue;
    }
    array.push({
      index: i,
      matches: {
        ...defaultMatches,
        ...customMatches
      }
    });
  }
  return array;
}
function useFilter(props, items, query, options) {
  const filteredItems = shallowRef([]);
  const filteredMatches = shallowRef(/* @__PURE__ */ new Map());
  const transformedItems = computed(() => (options == null ? void 0 : options.transform) ? unref(items).map((item) => [item, options.transform(item)]) : unref(items));
  watchEffect(() => {
    const _query = typeof query === "function" ? query() : unref(query);
    const strQuery = typeof _query !== "string" && typeof _query !== "number" ? "" : String(_query);
    const results = filterItems(transformedItems.value, strQuery, {
      customKeyFilter: {
        ...props.customKeyFilter,
        ...unref(options == null ? void 0 : options.customKeyFilter)
      },
      default: props.customFilter,
      filterKeys: props.filterKeys,
      filterMode: props.filterMode,
      noFilter: props.noFilter
    });
    const originalItems = unref(items);
    const _filteredItems = [];
    const _filteredMatches = /* @__PURE__ */ new Map();
    results.forEach((_ref) => {
      let {
        index,
        matches
      } = _ref;
      const item = originalItems[index];
      _filteredItems.push(item);
      _filteredMatches.set(item.value, matches);
    });
    filteredItems.value = _filteredItems;
    filteredMatches.value = _filteredMatches;
  });
  function getMatches(item) {
    return filteredMatches.value.get(item.value);
  }
  return {
    filteredItems,
    filteredMatches,
    getMatches
  };
}
const makeDataTableExpandProps = propsFactory({
  expandOnClick: Boolean,
  showExpand: Boolean,
  expanded: {
    type: Array,
    default: () => []
  }
}, "DataTable-expand");
const VDataTableExpandedKey = Symbol.for("vuetify:datatable:expanded");
function provideExpanded(props) {
  const expandOnClick = toRef(props, "expandOnClick");
  const expanded = useProxiedModel(props, "expanded", props.expanded, (v) => {
    return new Set(v);
  }, (v) => {
    return [...v.values()];
  });
  function expand(item, value) {
    const newExpanded = new Set(expanded.value);
    if (!value) {
      newExpanded.delete(item.value);
    } else {
      newExpanded.add(item.value);
    }
    expanded.value = newExpanded;
  }
  function isExpanded(item) {
    return expanded.value.has(item.value);
  }
  function toggleExpand(item) {
    expand(item, !isExpanded(item));
  }
  const data = {
    expand,
    expanded,
    expandOnClick,
    isExpanded,
    toggleExpand
  };
  provide(VDataTableExpandedKey, data);
  return data;
}
function useExpanded() {
  const data = inject(VDataTableExpandedKey);
  if (!data) throw new Error("foo");
  return data;
}
const makeDataTableGroupProps = propsFactory({
  groupBy: {
    type: Array,
    default: () => []
  }
}, "DataTable-group");
const VDataTableGroupSymbol = Symbol.for("vuetify:data-table-group");
function createGroupBy(props) {
  const groupBy = useProxiedModel(props, "groupBy");
  return {
    groupBy
  };
}
function provideGroupBy(options) {
  const {
    disableSort,
    groupBy,
    sortBy
  } = options;
  const opened = ref(/* @__PURE__ */ new Set());
  const sortByWithGroups = computed(() => {
    return groupBy.value.map((val) => ({
      ...val,
      order: val.order ?? false
    })).concat((disableSort == null ? void 0 : disableSort.value) ? [] : sortBy.value);
  });
  function isGroupOpen(group) {
    return opened.value.has(group.id);
  }
  function toggleGroup(group) {
    const newOpened = new Set(opened.value);
    if (!isGroupOpen(group)) newOpened.add(group.id);
    else newOpened.delete(group.id);
    opened.value = newOpened;
  }
  function extractRows(items) {
    function dive(group) {
      const arr = [];
      for (const item of group.items) {
        if ("type" in item && item.type === "group") {
          arr.push(...dive(item));
        } else {
          arr.push(item);
        }
      }
      return [...new Set(arr)];
    }
    return dive({
      type: "group",
      items,
      id: "dummy",
      key: "dummy",
      value: "dummy",
      depth: 0
    });
  }
  const data = {
    sortByWithGroups,
    toggleGroup,
    opened,
    groupBy,
    extractRows,
    isGroupOpen
  };
  provide(VDataTableGroupSymbol, data);
  return data;
}
function useGroupBy() {
  const data = inject(VDataTableGroupSymbol);
  if (!data) throw new Error("Missing group!");
  return data;
}
function groupItemsByProperty(items, groupBy) {
  if (!items.length) return [];
  const groups = /* @__PURE__ */ new Map();
  for (const item of items) {
    const value = getObjectValueByPath(item.raw, groupBy);
    if (!groups.has(value)) {
      groups.set(value, []);
    }
    groups.get(value).push(item);
  }
  return groups;
}
function groupItems(items, groupBy) {
  let depth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  let prefix = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "root";
  if (!groupBy.length) return [];
  const groupedItems = groupItemsByProperty(items, groupBy[0]);
  const groups = [];
  const rest = groupBy.slice(1);
  groupedItems.forEach((items2, value) => {
    const key = groupBy[0];
    const id = `${prefix}_${key}_${value}`;
    groups.push({
      depth,
      id,
      key,
      value,
      items: rest.length ? groupItems(items2, rest, depth + 1, id) : items2,
      type: "group"
    });
  });
  return groups;
}
function flattenItems(items, opened) {
  const flatItems = [];
  for (const item of items) {
    if ("type" in item && item.type === "group") {
      if (item.value != null) {
        flatItems.push(item);
      }
      if (opened.has(item.id) || item.value == null) {
        flatItems.push(...flattenItems(item.items, opened));
      }
    } else {
      flatItems.push(item);
    }
  }
  return flatItems;
}
function useGroupedItems(items, groupBy, opened) {
  const flatItems = computed(() => {
    if (!groupBy.value.length) return items.value;
    const groupedItems = groupItems(items.value, groupBy.value.map((item) => item.key));
    return flattenItems(groupedItems, opened.value);
  });
  return {
    flatItems
  };
}
function useOptions(_ref) {
  let {
    page,
    itemsPerPage,
    sortBy,
    groupBy,
    search
  } = _ref;
  const vm = getCurrentInstance("VDataTable");
  const options = computed(() => ({
    page: page.value,
    itemsPerPage: itemsPerPage.value,
    sortBy: sortBy.value,
    groupBy: groupBy.value,
    search: search.value
  }));
  let oldOptions = null;
  watch(options, () => {
    if (deepEqual(oldOptions, options.value)) return;
    if (oldOptions && oldOptions.search !== options.value.search) {
      page.value = 1;
    }
    vm.emit("update:options", options.value);
    oldOptions = options.value;
  }, {
    deep: true,
    immediate: true
  });
}
const makeDataTablePaginateProps = propsFactory({
  page: {
    type: [Number, String],
    default: 1
  },
  itemsPerPage: {
    type: [Number, String],
    default: 10
  }
}, "DataTable-paginate");
const VDataTablePaginationSymbol = Symbol.for("vuetify:data-table-pagination");
function createPagination(props) {
  const page = useProxiedModel(props, "page", void 0, (value) => Number(value ?? 1));
  const itemsPerPage = useProxiedModel(props, "itemsPerPage", void 0, (value) => Number(value ?? 10));
  return {
    page,
    itemsPerPage
  };
}
function providePagination(options) {
  const {
    page,
    itemsPerPage,
    itemsLength
  } = options;
  const startIndex = computed(() => {
    if (itemsPerPage.value === -1) return 0;
    return itemsPerPage.value * (page.value - 1);
  });
  const stopIndex = computed(() => {
    if (itemsPerPage.value === -1) return itemsLength.value;
    return Math.min(itemsLength.value, startIndex.value + itemsPerPage.value);
  });
  const pageCount = computed(() => {
    if (itemsPerPage.value === -1 || itemsLength.value === 0) return 1;
    return Math.ceil(itemsLength.value / itemsPerPage.value);
  });
  watch([page, pageCount], () => {
    if (page.value > pageCount.value) {
      page.value = pageCount.value;
    }
  });
  function setItemsPerPage(value) {
    itemsPerPage.value = value;
    page.value = 1;
  }
  function nextPage() {
    page.value = clamp(page.value + 1, 1, pageCount.value);
  }
  function prevPage() {
    page.value = clamp(page.value - 1, 1, pageCount.value);
  }
  function setPage(value) {
    page.value = clamp(value, 1, pageCount.value);
  }
  const data = {
    page,
    itemsPerPage,
    startIndex,
    stopIndex,
    pageCount,
    itemsLength,
    nextPage,
    prevPage,
    setPage,
    setItemsPerPage
  };
  provide(VDataTablePaginationSymbol, data);
  return data;
}
function usePagination() {
  const data = inject(VDataTablePaginationSymbol);
  if (!data) throw new Error("Missing pagination!");
  return data;
}
function usePaginatedItems(options) {
  const vm = getCurrentInstance("usePaginatedItems");
  const {
    items,
    startIndex,
    stopIndex,
    itemsPerPage
  } = options;
  const paginatedItems = computed(() => {
    if (itemsPerPage.value <= 0) return items.value;
    return items.value.slice(startIndex.value, stopIndex.value);
  });
  watch(paginatedItems, (val) => {
    vm.emit("update:currentItems", val);
  }, {
    immediate: true
  });
  return {
    paginatedItems
  };
}
const singleSelectStrategy = {
  showSelectAll: false,
  allSelected: () => [],
  select: (_ref) => {
    var _a;
    let {
      items,
      value
    } = _ref;
    return new Set(value ? [(_a = items[0]) == null ? void 0 : _a.value] : []);
  },
  selectAll: (_ref2) => {
    let {
      selected
    } = _ref2;
    return selected;
  }
};
const pageSelectStrategy = {
  showSelectAll: true,
  allSelected: (_ref3) => {
    let {
      currentPage
    } = _ref3;
    return currentPage;
  },
  select: (_ref4) => {
    let {
      items,
      value,
      selected
    } = _ref4;
    for (const item of items) {
      if (value) selected.add(item.value);
      else selected.delete(item.value);
    }
    return selected;
  },
  selectAll: (_ref5) => {
    let {
      value,
      currentPage,
      selected
    } = _ref5;
    return pageSelectStrategy.select({
      items: currentPage,
      value,
      selected
    });
  }
};
const allSelectStrategy = {
  showSelectAll: true,
  allSelected: (_ref6) => {
    let {
      allItems
    } = _ref6;
    return allItems;
  },
  select: (_ref7) => {
    let {
      items,
      value,
      selected
    } = _ref7;
    for (const item of items) {
      if (value) selected.add(item.value);
      else selected.delete(item.value);
    }
    return selected;
  },
  selectAll: (_ref8) => {
    let {
      value,
      allItems,
      selected
    } = _ref8;
    return allSelectStrategy.select({
      items: allItems,
      value,
      selected
    });
  }
};
const makeDataTableSelectProps = propsFactory({
  showSelect: Boolean,
  selectStrategy: {
    type: [String, Object],
    default: "page"
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  valueComparator: {
    type: Function,
    default: deepEqual
  }
}, "DataTable-select");
const VDataTableSelectionSymbol = Symbol.for("vuetify:data-table-selection");
function provideSelection(props, _ref9) {
  let {
    allItems,
    currentPage
  } = _ref9;
  const selected = useProxiedModel(props, "modelValue", props.modelValue, (v) => {
    return new Set(wrapInArray(v).map((v2) => {
      var _a;
      return ((_a = allItems.value.find((item) => props.valueComparator(v2, item.value))) == null ? void 0 : _a.value) ?? v2;
    }));
  }, (v) => {
    return [...v.values()];
  });
  const allSelectable = computed(() => allItems.value.filter((item) => item.selectable));
  const currentPageSelectable = computed(() => currentPage.value.filter((item) => item.selectable));
  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === "object") return props.selectStrategy;
    switch (props.selectStrategy) {
      case "single":
        return singleSelectStrategy;
      case "all":
        return allSelectStrategy;
      case "page":
      default:
        return pageSelectStrategy;
    }
  });
  function isSelected(items) {
    return wrapInArray(items).every((item) => selected.value.has(item.value));
  }
  function isSomeSelected(items) {
    return wrapInArray(items).some((item) => selected.value.has(item.value));
  }
  function select(items, value) {
    const newSelected = selectStrategy.value.select({
      items,
      value,
      selected: new Set(selected.value)
    });
    selected.value = newSelected;
  }
  function toggleSelect(item) {
    select([item], !isSelected([item]));
  }
  function selectAll(value) {
    const newSelected = selectStrategy.value.selectAll({
      value,
      allItems: allSelectable.value,
      currentPage: currentPageSelectable.value,
      selected: new Set(selected.value)
    });
    selected.value = newSelected;
  }
  const someSelected = computed(() => selected.value.size > 0);
  const allSelected = computed(() => {
    const items = selectStrategy.value.allSelected({
      allItems: allSelectable.value,
      currentPage: currentPageSelectable.value
    });
    return !!items.length && isSelected(items);
  });
  const showSelectAll = computed(() => selectStrategy.value.showSelectAll);
  const data = {
    toggleSelect,
    select,
    selectAll,
    isSelected,
    isSomeSelected,
    someSelected,
    allSelected,
    showSelectAll
  };
  provide(VDataTableSelectionSymbol, data);
  return data;
}
function useSelection() {
  const data = inject(VDataTableSelectionSymbol);
  if (!data) throw new Error("Missing selection!");
  return data;
}
const makeDataTableSortProps = propsFactory({
  sortBy: {
    type: Array,
    default: () => []
  },
  customKeySort: Object,
  multiSort: Boolean,
  mustSort: Boolean
}, "DataTable-sort");
const VDataTableSortSymbol = Symbol.for("vuetify:data-table-sort");
function createSort(props) {
  const sortBy = useProxiedModel(props, "sortBy");
  const mustSort = toRef(props, "mustSort");
  const multiSort = toRef(props, "multiSort");
  return {
    sortBy,
    mustSort,
    multiSort
  };
}
function provideSort(options) {
  const {
    sortBy,
    mustSort,
    multiSort,
    page
  } = options;
  const toggleSort = (column) => {
    if (column.key == null) return;
    let newSortBy = sortBy.value.map((x) => ({
      ...x
    })) ?? [];
    const item = newSortBy.find((x) => x.key === column.key);
    if (!item) {
      if (multiSort.value) {
        newSortBy.push({
          key: column.key,
          order: "asc"
        });
      } else {
        newSortBy = [{
          key: column.key,
          order: "asc"
        }];
      }
    } else if (item.order === "desc") {
      if (mustSort.value && newSortBy.length === 1) {
        item.order = "asc";
      } else {
        newSortBy = newSortBy.filter((x) => x.key !== column.key);
      }
    } else {
      item.order = "desc";
    }
    sortBy.value = newSortBy;
    if (page) page.value = 1;
  };
  function isSorted(column) {
    return !!sortBy.value.find((item) => item.key === column.key);
  }
  const data = {
    sortBy,
    toggleSort,
    isSorted
  };
  provide(VDataTableSortSymbol, data);
  return data;
}
function useSort() {
  const data = inject(VDataTableSortSymbol);
  if (!data) throw new Error("Missing sort!");
  return data;
}
function useSortedItems(props, items, sortBy, options) {
  const locale = useLocale();
  const sortedItems = computed(() => {
    var _a, _b;
    if (!sortBy.value.length) return items.value;
    return sortItems(items.value, sortBy.value, locale.current.value, {
      transform: options == null ? void 0 : options.transform,
      sortFunctions: {
        ...props.customKeySort,
        ...(_a = options == null ? void 0 : options.sortFunctions) == null ? void 0 : _a.value
      },
      sortRawFunctions: (_b = options == null ? void 0 : options.sortRawFunctions) == null ? void 0 : _b.value
    });
  });
  return {
    sortedItems
  };
}
function sortItems(items, sortByItems, locale, options) {
  const stringCollator = new Intl.Collator(locale, {
    sensitivity: "accent",
    usage: "sort"
  });
  const transformedItems = items.map((item) => [item, (options == null ? void 0 : options.transform) ? options.transform(item) : item]);
  return transformedItems.sort((a, b) => {
    var _a, _b;
    for (let i = 0; i < sortByItems.length; i++) {
      let hasCustomResult = false;
      const sortKey = sortByItems[i].key;
      const sortOrder = sortByItems[i].order ?? "asc";
      if (sortOrder === false) continue;
      let sortA = getObjectValueByPath(a[1], sortKey);
      let sortB = getObjectValueByPath(b[1], sortKey);
      let sortARaw = a[0].raw;
      let sortBRaw = b[0].raw;
      if (sortOrder === "desc") {
        [sortA, sortB] = [sortB, sortA];
        [sortARaw, sortBRaw] = [sortBRaw, sortARaw];
      }
      if ((_a = options == null ? void 0 : options.sortRawFunctions) == null ? void 0 : _a[sortKey]) {
        const customResult = options.sortRawFunctions[sortKey](sortARaw, sortBRaw);
        if (customResult == null) continue;
        hasCustomResult = true;
        if (customResult) return customResult;
      }
      if ((_b = options == null ? void 0 : options.sortFunctions) == null ? void 0 : _b[sortKey]) {
        const customResult = options.sortFunctions[sortKey](sortA, sortB);
        if (customResult == null) continue;
        hasCustomResult = true;
        if (customResult) return customResult;
      }
      if (hasCustomResult) continue;
      if (sortA instanceof Date && sortB instanceof Date) {
        return sortA.getTime() - sortB.getTime();
      }
      [sortA, sortB] = [sortA, sortB].map((s) => s != null ? s.toString().toLocaleLowerCase() : s);
      if (sortA !== sortB) {
        if (isEmpty(sortA) && isEmpty(sortB)) return 0;
        if (isEmpty(sortA)) return -1;
        if (isEmpty(sortB)) return 1;
        if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB);
        return stringCollator.compare(sortA, sortB);
      }
    }
    return 0;
  }).map((_ref) => {
    let [item] = _ref;
    return item;
  });
}
function useRefs() {
  const refs = ref([]);
  onBeforeUpdate(() => refs.value = []);
  function updateRef(e, i) {
    refs.value[i] = e;
  }
  return {
    refs,
    updateRef
  };
}
const makeVPaginationProps = propsFactory({
  activeColor: String,
  start: {
    type: [Number, String],
    default: 1
  },
  modelValue: {
    type: Number,
    default: (props) => props.start
  },
  disabled: Boolean,
  length: {
    type: [Number, String],
    default: 1,
    validator: (val) => val % 1 === 0
  },
  totalVisible: [Number, String],
  firstIcon: {
    type: IconValue,
    default: "$first"
  },
  prevIcon: {
    type: IconValue,
    default: "$prev"
  },
  nextIcon: {
    type: IconValue,
    default: "$next"
  },
  lastIcon: {
    type: IconValue,
    default: "$last"
  },
  ariaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.root"
  },
  pageAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.page"
  },
  currentPageAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.currentPage"
  },
  firstAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.first"
  },
  previousAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.previous"
  },
  nextAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.next"
  },
  lastAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.last"
  },
  ellipsis: {
    type: String,
    default: "..."
  },
  showFirstLastPage: Boolean,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "nav"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "text"
  })
}, "VPagination");
const VPagination = genericComponent()({
  name: "VPagination",
  props: makeVPaginationProps(),
  emits: {
    "update:modelValue": (value) => true,
    first: (value) => true,
    prev: (value) => true,
    next: (value) => true,
    last: (value) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const page = useProxiedModel(props, "modelValue");
    const {
      t,
      n
    } = useLocale();
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      width
    } = useDisplay();
    const maxButtons = shallowRef(-1);
    provideDefaults(void 0, {
      scoped: true
    });
    const {
      resizeRef
    } = useResizeObserver((entries) => {
      if (!entries.length) return;
      const {
        target,
        contentRect
      } = entries[0];
      const firstItem = target.querySelector(".v-pagination__list > *");
      if (!firstItem) return;
      const totalWidth = contentRect.width;
      const itemWidth = firstItem.offsetWidth + parseFloat(getComputedStyle(firstItem).marginRight) * 2;
      maxButtons.value = getMax(totalWidth, itemWidth);
    });
    const length = computed(() => parseInt(props.length, 10));
    const start = computed(() => parseInt(props.start, 10));
    const totalVisible = computed(() => {
      if (props.totalVisible != null) return parseInt(props.totalVisible, 10);
      else if (maxButtons.value >= 0) return maxButtons.value;
      return getMax(width.value, 58);
    });
    function getMax(totalWidth, itemWidth) {
      const minButtons = props.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        Number(((totalWidth - itemWidth * minButtons) / itemWidth).toFixed(2))
      ));
    }
    const range = computed(() => {
      if (length.value <= 0 || isNaN(length.value) || length.value > Number.MAX_SAFE_INTEGER) return [];
      if (totalVisible.value <= 0) return [];
      else if (totalVisible.value === 1) return [page.value];
      if (length.value <= totalVisible.value) {
        return createRange(length.value, start.value);
      }
      const even = totalVisible.value % 2 === 0;
      const middle = even ? totalVisible.value / 2 : Math.floor(totalVisible.value / 2);
      const left = even ? middle : middle + 1;
      const right = length.value - middle;
      if (left - page.value >= 0) {
        return [...createRange(Math.max(1, totalVisible.value - 1), start.value), props.ellipsis, length.value];
      } else if (page.value - right >= (even ? 1 : 0)) {
        const rangeLength = totalVisible.value - 1;
        const rangeStart = length.value - rangeLength + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)];
      } else {
        const rangeLength = Math.max(1, totalVisible.value - 2);
        const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value];
      }
    });
    function setValue(e, value, event) {
      e.preventDefault();
      page.value = value;
      event && emit(event, value);
    }
    const {
      refs,
      updateRef
    } = useRefs();
    provideDefaults({
      VPaginationBtn: {
        color: toRef(props, "color"),
        border: toRef(props, "border"),
        density: toRef(props, "density"),
        size: toRef(props, "size"),
        variant: toRef(props, "variant"),
        rounded: toRef(props, "rounded"),
        elevation: toRef(props, "elevation")
      }
    });
    const items = computed(() => {
      return range.value.map((item, index) => {
        const ref2 = (e) => updateRef(e, index);
        if (typeof item === "string") {
          return {
            isActive: false,
            key: `ellipsis-${index}`,
            page: item,
            props: {
              ref: ref2,
              ellipsis: true,
              icon: true,
              disabled: true
            }
          };
        } else {
          const isActive = item === page.value;
          return {
            isActive,
            key: item,
            page: n(item),
            props: {
              ref: ref2,
              ellipsis: false,
              icon: true,
              disabled: !!props.disabled || Number(props.length) < 2,
              color: isActive ? props.activeColor : props.color,
              "aria-current": isActive,
              "aria-label": t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, item),
              onClick: (e) => setValue(e, item)
            }
          };
        }
      });
    });
    const controls = computed(() => {
      const prevDisabled = !!props.disabled || page.value <= start.value;
      const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1;
      return {
        first: props.showFirstLastPage ? {
          icon: isRtl.value ? props.lastIcon : props.firstIcon,
          onClick: (e) => setValue(e, start.value, "first"),
          disabled: prevDisabled,
          "aria-label": t(props.firstAriaLabel),
          "aria-disabled": prevDisabled
        } : void 0,
        prev: {
          icon: isRtl.value ? props.nextIcon : props.prevIcon,
          onClick: (e) => setValue(e, page.value - 1, "prev"),
          disabled: prevDisabled,
          "aria-label": t(props.previousAriaLabel),
          "aria-disabled": prevDisabled
        },
        next: {
          icon: isRtl.value ? props.prevIcon : props.nextIcon,
          onClick: (e) => setValue(e, page.value + 1, "next"),
          disabled: nextDisabled,
          "aria-label": t(props.nextAriaLabel),
          "aria-disabled": nextDisabled
        },
        last: props.showFirstLastPage ? {
          icon: isRtl.value ? props.firstIcon : props.lastIcon,
          onClick: (e) => setValue(e, start.value + length.value - 1, "last"),
          disabled: nextDisabled,
          "aria-label": t(props.lastAriaLabel),
          "aria-disabled": nextDisabled
        } : void 0
      };
    });
    function updateFocus() {
      var _a;
      const currentIndex = page.value - start.value;
      (_a = refs.value[currentIndex]) == null ? void 0 : _a.$el.focus();
    }
    function onKeydown(e) {
      if (e.key === keyValues.left && !props.disabled && page.value > Number(props.start)) {
        page.value = page.value - 1;
        nextTick(updateFocus);
      } else if (e.key === keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
        page.value = page.value + 1;
        nextTick(updateFocus);
      }
    }
    useRender(() => createVNode(props.tag, {
      "ref": resizeRef,
      "class": ["v-pagination", themeClasses.value, props.class],
      "style": props.style,
      "role": "navigation",
      "aria-label": t(props.ariaLabel),
      "onKeydown": onKeydown,
      "data-test": "v-pagination-root"
    }, {
      default: () => [createVNode("ul", {
        "class": "v-pagination__list"
      }, [props.showFirstLastPage && createVNode("li", {
        "key": "first",
        "class": "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [slots.first ? slots.first(controls.value.first) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.first), null)]), createVNode("li", {
        "key": "prev",
        "class": "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [slots.prev ? slots.prev(controls.value.prev) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.prev), null)]), items.value.map((item, index) => createVNode("li", {
        "key": item.key,
        "class": ["v-pagination__item", {
          "v-pagination__item--is-active": item.isActive
        }],
        "data-test": "v-pagination-item"
      }, [slots.item ? slots.item(item) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, item.props), {
        default: () => [item.page]
      })])), createVNode("li", {
        "key": "next",
        "class": "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [slots.next ? slots.next(controls.value.next) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.next), null)]), props.showFirstLastPage && createVNode("li", {
        "key": "last",
        "class": "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [slots.last ? slots.last(controls.value.last) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.last), null)])])]
    }));
    return {};
  }
});
const makeVDataTableFooterProps = propsFactory({
  prevIcon: {
    type: IconValue,
    default: "$prev"
  },
  nextIcon: {
    type: IconValue,
    default: "$next"
  },
  firstIcon: {
    type: IconValue,
    default: "$first"
  },
  lastIcon: {
    type: IconValue,
    default: "$last"
  },
  itemsPerPageText: {
    type: String,
    default: "$vuetify.dataFooter.itemsPerPageText"
  },
  pageText: {
    type: String,
    default: "$vuetify.dataFooter.pageText"
  },
  firstPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.firstPage"
  },
  prevPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.prevPage"
  },
  nextPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.nextPage"
  },
  lastPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.lastPage"
  },
  itemsPerPageOptions: {
    type: Array,
    default: () => [{
      value: 10,
      title: "10"
    }, {
      value: 25,
      title: "25"
    }, {
      value: 50,
      title: "50"
    }, {
      value: 100,
      title: "100"
    }, {
      value: -1,
      title: "$vuetify.dataFooter.itemsPerPageAll"
    }]
  },
  showCurrentPage: Boolean
}, "VDataTableFooter");
const VDataTableFooter = genericComponent()({
  name: "VDataTableFooter",
  props: makeVDataTableFooterProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      page,
      pageCount,
      startIndex,
      stopIndex,
      itemsLength,
      itemsPerPage,
      setItemsPerPage
    } = usePagination();
    const itemsPerPageOptions = computed(() => props.itemsPerPageOptions.map((option) => {
      if (typeof option === "number") {
        return {
          value: option,
          title: option === -1 ? t("$vuetify.dataFooter.itemsPerPageAll") : String(option)
        };
      }
      return {
        ...option,
        title: !isNaN(Number(option.title)) ? option.title : t(option.title)
      };
    }));
    useRender(() => {
      var _a;
      const paginationProps = VPagination.filterProps(props);
      return createVNode("div", {
        "class": "v-data-table-footer"
      }, [(_a = slots.prepend) == null ? void 0 : _a.call(slots), createVNode("div", {
        "class": "v-data-table-footer__items-per-page"
      }, [createVNode("span", null, [t(props.itemsPerPageText)]), createVNode(VSelect, {
        "items": itemsPerPageOptions.value,
        "modelValue": itemsPerPage.value,
        "onUpdate:modelValue": (v) => setItemsPerPage(Number(v)),
        "density": "compact",
        "variant": "outlined",
        "hide-details": true
      }, null)]), createVNode("div", {
        "class": "v-data-table-footer__info"
      }, [createVNode("div", null, [t(props.pageText, !itemsLength.value ? 0 : startIndex.value + 1, stopIndex.value, itemsLength.value)])]), createVNode("div", {
        "class": "v-data-table-footer__pagination"
      }, [createVNode(VPagination, mergeProps({
        "modelValue": page.value,
        "onUpdate:modelValue": ($event) => page.value = $event,
        "density": "comfortable",
        "first-aria-label": props.firstPageLabel,
        "last-aria-label": props.lastPageLabel,
        "length": pageCount.value,
        "next-aria-label": props.nextPageLabel,
        "previous-aria-label": props.prevPageLabel,
        "rounded": true,
        "show-first-last-page": true,
        "total-visible": props.showCurrentPage ? 1 : 0,
        "variant": "plain"
      }, paginationProps), null)])]);
    });
    return {};
  }
});
const VDataTableColumn = defineFunctionalComponent({
  align: {
    type: String,
    default: "start"
  },
  fixed: Boolean,
  fixedOffset: [Number, String],
  height: [Number, String],
  lastFixed: Boolean,
  noPadding: Boolean,
  tag: String,
  width: [Number, String],
  maxWidth: [Number, String],
  nowrap: Boolean
}, (props, _ref) => {
  let {
    slots
  } = _ref;
  const Tag = props.tag ?? "td";
  return createVNode(Tag, {
    "class": ["v-data-table__td", {
      "v-data-table-column--fixed": props.fixed,
      "v-data-table-column--last-fixed": props.lastFixed,
      "v-data-table-column--no-padding": props.noPadding,
      "v-data-table-column--nowrap": props.nowrap
    }, `v-data-table-column--align-${props.align}`],
    "style": {
      height: convertToUnit(props.height),
      width: convertToUnit(props.width),
      maxWidth: convertToUnit(props.maxWidth),
      left: convertToUnit(props.fixedOffset || null)
    }
  }, {
    default: () => {
      var _a;
      return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
    }
  });
});
const makeDataTableHeaderProps = propsFactory({
  headers: Array
}, "DataTable-header");
const VDataTableHeadersSymbol = Symbol.for("vuetify:data-table-headers");
const defaultHeader = {
  title: "",
  sortable: false
};
const defaultActionHeader = {
  ...defaultHeader,
  width: 48
};
function priorityQueue() {
  let arr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  const queue = arr.map((element) => ({
    element,
    priority: 0
  }));
  return {
    enqueue: (element, priority) => {
      let added = false;
      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        if (item.priority > priority) {
          queue.splice(i, 0, {
            element,
            priority
          });
          added = true;
          break;
        }
      }
      if (!added) queue.push({
        element,
        priority
      });
    },
    size: () => queue.length,
    count: () => {
      let count = 0;
      if (!queue.length) return 0;
      const whole = Math.floor(queue[0].priority);
      for (let i = 0; i < queue.length; i++) {
        if (Math.floor(queue[i].priority) === whole) count += 1;
      }
      return count;
    },
    dequeue: () => {
      return queue.shift();
    }
  };
}
function extractLeaves(item) {
  let columns = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  if (!item.children) {
    columns.push(item);
  } else {
    for (const child of item.children) {
      extractLeaves(child, columns);
    }
  }
  return columns;
}
function extractKeys(headers) {
  let keys = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Set();
  for (const item of headers) {
    if (item.key) keys.add(item.key);
    if (item.children) {
      extractKeys(item.children, keys);
    }
  }
  return keys;
}
function getDefaultItem(item) {
  if (!item.key) return void 0;
  if (item.key === "data-table-group") return defaultHeader;
  if (["data-table-expand", "data-table-select"].includes(item.key)) return defaultActionHeader;
  return void 0;
}
function getDepth(item) {
  let depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  if (!item.children) return depth;
  return Math.max(depth, ...item.children.map((child) => getDepth(child, depth + 1)));
}
function parseFixedColumns(items) {
  let seenFixed = false;
  function setFixed(item) {
    let parentFixed = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    if (!item) return;
    if (parentFixed) {
      item.fixed = true;
    }
    if (item.fixed) {
      if (item.children) {
        for (let i = item.children.length - 1; i >= 0; i--) {
          setFixed(item.children[i], true);
        }
      } else {
        if (!seenFixed) {
          item.lastFixed = true;
        } else if (isNaN(Number(item.width))) {
          consoleError(`Multiple fixed columns should have a static width (key: ${item.key})`);
        } else {
          item.minWidth = Math.max(Number(item.width) || 0, Number(item.minWidth) || 0);
        }
        seenFixed = true;
      }
    } else {
      if (item.children) {
        for (let i = item.children.length - 1; i >= 0; i--) {
          setFixed(item.children[i]);
        }
      } else {
        seenFixed = false;
      }
    }
  }
  for (let i = items.length - 1; i >= 0; i--) {
    setFixed(items[i]);
  }
  function setFixedOffset(item) {
    let fixedOffset2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    if (!item) return fixedOffset2;
    if (item.children) {
      item.fixedOffset = fixedOffset2;
      for (const child of item.children) {
        fixedOffset2 = setFixedOffset(child, fixedOffset2);
      }
    } else if (item.fixed) {
      item.fixedOffset = fixedOffset2;
      fixedOffset2 += parseFloat(item.width || "0") || 0;
    }
    return fixedOffset2;
  }
  let fixedOffset = 0;
  for (const item of items) {
    fixedOffset = setFixedOffset(item, fixedOffset);
  }
}
function parse(items, maxDepth) {
  const headers = [];
  let currentDepth = 0;
  const queue = priorityQueue(items);
  while (queue.size() > 0) {
    let rowSize = queue.count();
    const row = [];
    let fraction = 1;
    while (rowSize > 0) {
      const {
        element: item,
        priority
      } = queue.dequeue();
      const diff = maxDepth - currentDepth - getDepth(item);
      row.push({
        ...item,
        rowspan: diff ?? 1,
        colspan: item.children ? extractLeaves(item).length : 1
      });
      if (item.children) {
        for (const child of item.children) {
          const sort = priority % 1 + fraction / Math.pow(10, currentDepth + 2);
          queue.enqueue(child, currentDepth + diff + sort);
        }
      }
      fraction += 1;
      rowSize -= 1;
    }
    currentDepth += 1;
    headers.push(row);
  }
  const columns = items.map((item) => extractLeaves(item)).flat();
  return {
    columns,
    headers
  };
}
function convertToInternalHeaders(items) {
  const internalHeaders = [];
  for (const item of items) {
    const defaultItem = {
      ...getDefaultItem(item),
      ...item
    };
    const key = defaultItem.key ?? (typeof defaultItem.value === "string" ? defaultItem.value : null);
    const value = defaultItem.value ?? key ?? null;
    const internalItem = {
      ...defaultItem,
      key,
      value,
      sortable: defaultItem.sortable ?? (defaultItem.key != null || !!defaultItem.sort),
      children: defaultItem.children ? convertToInternalHeaders(defaultItem.children) : void 0
    };
    internalHeaders.push(internalItem);
  }
  return internalHeaders;
}
function createHeaders(props, options) {
  const headers = ref([]);
  const columns = ref([]);
  const sortFunctions = ref({});
  const sortRawFunctions = ref({});
  const filterFunctions = ref({});
  watchEffect(() => {
    var _a, _b, _c;
    const _headers = props.headers || Object.keys(props.items[0] ?? {}).map((key) => ({
      key,
      title: capitalize(key)
    }));
    const items = _headers.slice();
    const keys = extractKeys(items);
    if (((_a = options == null ? void 0 : options.groupBy) == null ? void 0 : _a.value.length) && !keys.has("data-table-group")) {
      items.unshift({
        key: "data-table-group",
        title: "Group"
      });
    }
    if (((_b = options == null ? void 0 : options.showSelect) == null ? void 0 : _b.value) && !keys.has("data-table-select")) {
      items.unshift({
        key: "data-table-select"
      });
    }
    if (((_c = options == null ? void 0 : options.showExpand) == null ? void 0 : _c.value) && !keys.has("data-table-expand")) {
      items.push({
        key: "data-table-expand"
      });
    }
    const internalHeaders = convertToInternalHeaders(items);
    parseFixedColumns(internalHeaders);
    const maxDepth = Math.max(...internalHeaders.map((item) => getDepth(item))) + 1;
    const parsed = parse(internalHeaders, maxDepth);
    headers.value = parsed.headers;
    columns.value = parsed.columns;
    const flatHeaders = parsed.headers.flat(1);
    for (const header of flatHeaders) {
      if (!header.key) continue;
      if (header.sortable) {
        if (header.sort) {
          sortFunctions.value[header.key] = header.sort;
        }
        if (header.sortRaw) {
          sortRawFunctions.value[header.key] = header.sortRaw;
        }
      }
      if (header.filter) {
        filterFunctions.value[header.key] = header.filter;
      }
    }
  });
  const data = {
    headers,
    columns,
    sortFunctions,
    sortRawFunctions,
    filterFunctions
  };
  provide(VDataTableHeadersSymbol, data);
  return data;
}
function useHeaders() {
  const data = inject(VDataTableHeadersSymbol);
  if (!data) throw new Error("Missing headers!");
  return data;
}
const makeVDataTableHeadersProps = propsFactory({
  color: String,
  disableSort: Boolean,
  fixedHeader: Boolean,
  multiSort: Boolean,
  sortAscIcon: {
    type: IconValue,
    default: "$sortAsc"
  },
  sortDescIcon: {
    type: IconValue,
    default: "$sortDesc"
  },
  headerProps: {
    type: Object
  },
  /** @deprecated */
  sticky: Boolean,
  ...makeDisplayProps(),
  ...makeLoaderProps()
}, "VDataTableHeaders");
const VDataTableHeaders = genericComponent()({
  name: "VDataTableHeaders",
  props: makeVDataTableHeadersProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      toggleSort,
      sortBy,
      isSorted
    } = useSort();
    const {
      someSelected,
      allSelected,
      selectAll,
      showSelectAll
    } = useSelection();
    const {
      columns,
      headers
    } = useHeaders();
    const {
      loaderClasses
    } = useLoader(props);
    function getFixedStyles(column, y) {
      if (!(props.sticky || props.fixedHeader) && !column.fixed) return void 0;
      return {
        position: "sticky",
        left: column.fixed ? convertToUnit(column.fixedOffset) : void 0,
        top: props.sticky || props.fixedHeader ? `calc(var(--v-table-header-height) * ${y})` : void 0
      };
    }
    function getSortIcon(column) {
      const item = sortBy.value.find((item2) => item2.key === column.key);
      if (!item) return props.sortAscIcon;
      return item.order === "asc" ? props.sortAscIcon : props.sortDescIcon;
    }
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, "color");
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const slotProps = computed(() => ({
      headers: headers.value,
      columns: columns.value,
      toggleSort,
      isSorted,
      sortBy: sortBy.value,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      selectAll,
      getSortIcon
    }));
    const headerCellClasses = computed(() => ["v-data-table__th", {
      "v-data-table__th--sticky": props.sticky || props.fixedHeader
    }, displayClasses.value, loaderClasses.value]);
    const VDataTableHeaderCell = (_ref2) => {
      let {
        column,
        x,
        y
      } = _ref2;
      const noPadding = column.key === "data-table-select" || column.key === "data-table-expand";
      const headerProps = mergeProps(props.headerProps ?? {}, column.headerProps ?? {});
      return createVNode(VDataTableColumn, mergeProps({
        "tag": "th",
        "align": column.align,
        "class": [{
          "v-data-table__th--sortable": column.sortable && !props.disableSort,
          "v-data-table__th--sorted": isSorted(column),
          "v-data-table__th--fixed": column.fixed
        }, ...headerCellClasses.value],
        "style": {
          width: convertToUnit(column.width),
          minWidth: convertToUnit(column.minWidth),
          maxWidth: convertToUnit(column.maxWidth),
          ...getFixedStyles(column, y)
        },
        "colspan": column.colspan,
        "rowspan": column.rowspan,
        "onClick": column.sortable ? () => toggleSort(column) : void 0,
        "fixed": column.fixed,
        "nowrap": column.nowrap,
        "lastFixed": column.lastFixed,
        "noPadding": noPadding
      }, headerProps), {
        default: () => {
          var _a;
          const columnSlotName = `header.${column.key}`;
          const columnSlotProps = {
            column,
            selectAll,
            isSorted,
            toggleSort,
            sortBy: sortBy.value,
            someSelected: someSelected.value,
            allSelected: allSelected.value,
            getSortIcon
          };
          if (slots[columnSlotName]) return slots[columnSlotName](columnSlotProps);
          if (column.key === "data-table-select") {
            return ((_a = slots["header.data-table-select"]) == null ? void 0 : _a.call(slots, columnSlotProps)) ?? (showSelectAll.value && createVNode(VCheckboxBtn, {
              "modelValue": allSelected.value,
              "indeterminate": someSelected.value && !allSelected.value,
              "onUpdate:modelValue": selectAll
            }, null));
          }
          return createVNode("div", {
            "class": "v-data-table-header__content"
          }, [createVNode("span", null, [column.title]), column.sortable && !props.disableSort && createVNode(VIcon, {
            "key": "icon",
            "class": "v-data-table-header__sort-icon",
            "icon": getSortIcon(column)
          }, null), props.multiSort && isSorted(column) && createVNode("div", {
            "key": "badge",
            "class": ["v-data-table-header__sort-badge", ...backgroundColorClasses.value],
            "style": backgroundColorStyles.value
          }, [sortBy.value.findIndex((x2) => x2.key === column.key) + 1])]);
        }
      });
    };
    const VDataTableMobileHeaderCell = () => {
      const headerProps = mergeProps(props.headerProps ?? {} ?? {});
      const displayItems = computed(() => {
        return columns.value.filter((column) => (column == null ? void 0 : column.sortable) && !props.disableSort);
      });
      const appendIcon = computed(() => {
        const showSelectColumn = columns.value.find((column) => column.key === "data-table-select");
        if (showSelectColumn == null) return;
        return allSelected.value ? "$checkboxOn" : someSelected.value ? "$checkboxIndeterminate" : "$checkboxOff";
      });
      return createVNode(VDataTableColumn, mergeProps({
        "tag": "th",
        "class": [...headerCellClasses.value],
        "colspan": headers.value.length + 1
      }, headerProps), {
        default: () => [createVNode("div", {
          "class": "v-data-table-header__content"
        }, [createVNode(VSelect, {
          "chips": true,
          "class": "v-data-table__td-sort-select",
          "clearable": true,
          "density": "default",
          "items": displayItems.value,
          "label": t("$vuetify.dataTable.sortBy"),
          "multiple": props.multiSort,
          "variant": "underlined",
          "onClick:clear": () => sortBy.value = [],
          "appendIcon": appendIcon.value,
          "onClick:append": () => selectAll(!allSelected.value)
        }, {
          ...slots,
          chip: (props2) => {
            var _a;
            return createVNode(VChip, {
              "onClick": ((_a = props2.item.raw) == null ? void 0 : _a.sortable) ? () => toggleSort(props2.item.raw) : void 0,
              "onMousedown": (e) => {
                e.preventDefault();
                e.stopPropagation();
              }
            }, {
              default: () => [props2.item.title, createVNode(VIcon, {
                "class": ["v-data-table__td-sort-icon", isSorted(props2.item.raw) && "v-data-table__td-sort-icon-active"],
                "icon": getSortIcon(props2.item.raw),
                "size": "small"
              }, null)]
            });
          }
        })])]
      });
    };
    useRender(() => {
      return mobile.value ? createVNode("tr", null, [createVNode(VDataTableMobileHeaderCell, null, null)]) : createVNode(Fragment, null, [slots.headers ? slots.headers(slotProps.value) : headers.value.map((row, y) => createVNode("tr", null, [row.map((column, x) => createVNode(VDataTableHeaderCell, {
        "column": column,
        "x": x,
        "y": y
      }, null))])), props.loading && createVNode("tr", {
        "class": "v-data-table-progress"
      }, [createVNode("th", {
        "colspan": columns.value.length
      }, [createVNode(LoaderSlot, {
        "name": "v-data-table-progress",
        "absolute": true,
        "active": true,
        "color": typeof props.loading === "boolean" ? void 0 : props.loading,
        "indeterminate": true
      }, {
        default: slots.loader
      })])])]);
    });
  }
});
const makeVDataTableGroupHeaderRowProps = propsFactory({
  item: {
    type: Object,
    required: true
  }
}, "VDataTableGroupHeaderRow");
const VDataTableGroupHeaderRow = genericComponent()({
  name: "VDataTableGroupHeaderRow",
  props: makeVDataTableGroupHeaderRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isGroupOpen,
      toggleGroup,
      extractRows
    } = useGroupBy();
    const {
      isSelected,
      isSomeSelected,
      select
    } = useSelection();
    const {
      columns
    } = useHeaders();
    const rows = computed(() => {
      return extractRows([props.item]);
    });
    return () => createVNode("tr", {
      "class": "v-data-table-group-header-row",
      "style": {
        "--v-data-table-group-header-row-depth": props.item.depth
      }
    }, [columns.value.map((column) => {
      var _a, _b;
      if (column.key === "data-table-group") {
        const icon = isGroupOpen(props.item) ? "$expand" : "$next";
        const onClick = () => toggleGroup(props.item);
        return ((_a = slots["data-table-group"]) == null ? void 0 : _a.call(slots, {
          item: props.item,
          count: rows.value.length,
          props: {
            icon,
            onClick
          }
        })) ?? createVNode(VDataTableColumn, {
          "class": "v-data-table-group-header-row__column"
        }, {
          default: () => [createVNode(VBtn, {
            "size": "small",
            "variant": "text",
            "icon": icon,
            "onClick": onClick
          }, null), createVNode("span", null, [props.item.value]), createVNode("span", null, [createTextVNode("("), rows.value.length, createTextVNode(")")])]
        });
      }
      if (column.key === "data-table-select") {
        const modelValue = isSelected(rows.value);
        const indeterminate = isSomeSelected(rows.value) && !modelValue;
        const selectGroup = (v) => select(rows.value, v);
        return ((_b = slots["data-table-select"]) == null ? void 0 : _b.call(slots, {
          props: {
            modelValue,
            indeterminate,
            "onUpdate:modelValue": selectGroup
          }
        })) ?? createVNode("td", null, [createVNode(VCheckboxBtn, {
          "modelValue": modelValue,
          "indeterminate": indeterminate,
          "onUpdate:modelValue": selectGroup
        }, null)]);
      }
      return createVNode("td", null, null);
    })]);
  }
});
const makeVDataTableRowProps = propsFactory({
  index: Number,
  item: Object,
  cellProps: [Object, Function],
  onClick: EventProp(),
  onContextmenu: EventProp(),
  onDblclick: EventProp(),
  ...makeDisplayProps()
}, "VDataTableRow");
const VDataTableRow = genericComponent()({
  name: "VDataTableRow",
  props: makeVDataTableRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      displayClasses,
      mobile
    } = useDisplay(props, "v-data-table__tr");
    const {
      isSelected,
      toggleSelect,
      someSelected,
      allSelected,
      selectAll
    } = useSelection();
    const {
      isExpanded,
      toggleExpand
    } = useExpanded();
    const {
      toggleSort,
      sortBy,
      isSorted
    } = useSort();
    const {
      columns
    } = useHeaders();
    useRender(() => createVNode("tr", {
      "class": ["v-data-table__tr", {
        "v-data-table__tr--clickable": !!(props.onClick || props.onContextmenu || props.onDblclick)
      }, displayClasses.value],
      "onClick": props.onClick,
      "onContextmenu": props.onContextmenu,
      "onDblclick": props.onDblclick
    }, [props.item && columns.value.map((column, i) => {
      const item = props.item;
      const slotName = `item.${column.key}`;
      const headerSlotName = `header.${column.key}`;
      const slotProps = {
        index: props.index,
        item: item.raw,
        internalItem: item,
        value: getObjectValueByPath(item.columns, column.key),
        column,
        isSelected,
        toggleSelect,
        isExpanded,
        toggleExpand
      };
      const columnSlotProps = {
        column,
        selectAll,
        isSorted,
        toggleSort,
        sortBy: sortBy.value,
        someSelected: someSelected.value,
        allSelected: allSelected.value,
        getSortIcon: () => ""
      };
      const cellProps = typeof props.cellProps === "function" ? props.cellProps({
        index: slotProps.index,
        item: slotProps.item,
        internalItem: slotProps.internalItem,
        value: slotProps.value,
        column
      }) : props.cellProps;
      const columnCellProps = typeof column.cellProps === "function" ? column.cellProps({
        index: slotProps.index,
        item: slotProps.item,
        internalItem: slotProps.internalItem,
        value: slotProps.value
      }) : column.cellProps;
      return createVNode(VDataTableColumn, mergeProps({
        "align": column.align,
        "class": {
          "v-data-table__td--expanded-row": column.key === "data-table-expand",
          "v-data-table__td--select-row": column.key === "data-table-select"
        },
        "fixed": column.fixed,
        "fixedOffset": column.fixedOffset,
        "lastFixed": column.lastFixed,
        "maxWidth": !mobile.value ? column.maxWidth : void 0,
        "noPadding": column.key === "data-table-select" || column.key === "data-table-expand",
        "nowrap": column.nowrap,
        "width": !mobile.value ? column.width : void 0
      }, cellProps, columnCellProps), {
        default: () => {
          var _a, _b, _c, _d, _e;
          if (slots[slotName] && !mobile.value) return (_a = slots[slotName]) == null ? void 0 : _a.call(slots, slotProps);
          if (column.key === "data-table-select") {
            return ((_b = slots["item.data-table-select"]) == null ? void 0 : _b.call(slots, slotProps)) ?? createVNode(VCheckboxBtn, {
              "disabled": !item.selectable,
              "modelValue": isSelected([item]),
              "onClick": withModifiers(() => toggleSelect(item), ["stop"])
            }, null);
          }
          if (column.key === "data-table-expand") {
            return ((_c = slots["item.data-table-expand"]) == null ? void 0 : _c.call(slots, slotProps)) ?? createVNode(VBtn, {
              "icon": isExpanded(item) ? "$collapse" : "$expand",
              "size": "small",
              "variant": "text",
              "onClick": withModifiers(() => toggleExpand(item), ["stop"])
            }, null);
          }
          const displayValue = toDisplayString(slotProps.value);
          return !mobile.value ? displayValue : createVNode(Fragment, null, [createVNode("div", {
            "class": "v-data-table__td-title"
          }, [((_d = slots[headerSlotName]) == null ? void 0 : _d.call(slots, columnSlotProps)) ?? column.title]), createVNode("div", {
            "class": "v-data-table__td-value"
          }, [((_e = slots[slotName]) == null ? void 0 : _e.call(slots, slotProps)) ?? displayValue])]);
        }
      });
    })]));
  }
});
const makeVDataTableRowsProps = propsFactory({
  loading: [Boolean, String],
  loadingText: {
    type: String,
    default: "$vuetify.dataIterator.loadingText"
  },
  hideNoData: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  rowProps: [Object, Function],
  cellProps: [Object, Function],
  ...makeDisplayProps()
}, "VDataTableRows");
const VDataTableRows = genericComponent()({
  name: "VDataTableRows",
  inheritAttrs: false,
  props: makeVDataTableRowsProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      columns
    } = useHeaders();
    const {
      expandOnClick,
      toggleExpand,
      isExpanded
    } = useExpanded();
    const {
      isSelected,
      toggleSelect
    } = useSelection();
    const {
      toggleGroup,
      isGroupOpen
    } = useGroupBy();
    const {
      t
    } = useLocale();
    const {
      mobile
    } = useDisplay(props);
    useRender(() => {
      var _a, _b;
      if (props.loading && (!props.items.length || slots.loading)) {
        return createVNode("tr", {
          "class": "v-data-table-rows-loading",
          "key": "loading"
        }, [createVNode("td", {
          "colspan": columns.value.length
        }, [((_a = slots.loading) == null ? void 0 : _a.call(slots)) ?? t(props.loadingText)])]);
      }
      if (!props.loading && !props.items.length && !props.hideNoData) {
        return createVNode("tr", {
          "class": "v-data-table-rows-no-data",
          "key": "no-data"
        }, [createVNode("td", {
          "colspan": columns.value.length
        }, [((_b = slots["no-data"]) == null ? void 0 : _b.call(slots)) ?? t(props.noDataText)])]);
      }
      return createVNode(Fragment, null, [props.items.map((item, index) => {
        var _a2;
        if (item.type === "group") {
          const slotProps2 = {
            index,
            item,
            columns: columns.value,
            isExpanded,
            toggleExpand,
            isSelected,
            toggleSelect,
            toggleGroup,
            isGroupOpen
          };
          return slots["group-header"] ? slots["group-header"](slotProps2) : createVNode(VDataTableGroupHeaderRow, mergeProps({
            "key": `group-header_${item.id}`,
            "item": item
          }, getPrefixedEventHandlers(attrs, ":group-header", () => slotProps2)), slots);
        }
        const slotProps = {
          index,
          item: item.raw,
          internalItem: item,
          columns: columns.value,
          isExpanded,
          toggleExpand,
          isSelected,
          toggleSelect
        };
        const itemSlotProps = {
          ...slotProps,
          props: mergeProps({
            key: `item_${item.key ?? item.index}`,
            onClick: expandOnClick.value ? () => {
              toggleExpand(item);
            } : void 0,
            index,
            item,
            cellProps: props.cellProps,
            mobile: mobile.value
          }, getPrefixedEventHandlers(attrs, ":row", () => slotProps), typeof props.rowProps === "function" ? props.rowProps({
            item: slotProps.item,
            index: slotProps.index,
            internalItem: slotProps.internalItem
          }) : props.rowProps)
        };
        return createVNode(Fragment, {
          "key": itemSlotProps.props.key
        }, [slots.item ? slots.item(itemSlotProps) : createVNode(VDataTableRow, itemSlotProps.props, slots), isExpanded(item) && ((_a2 = slots["expanded-row"]) == null ? void 0 : _a2.call(slots, slotProps))]);
      })]);
    });
    return {};
  }
});
const makeVTableProps = propsFactory({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VTable");
const VTable = genericComponent()({
  name: "VTable",
  props: makeVTableProps(),
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    useRender(() => createVNode(props.tag, {
      "class": ["v-table", {
        "v-table--fixed-height": !!props.height,
        "v-table--fixed-header": props.fixedHeader,
        "v-table--fixed-footer": props.fixedFooter,
        "v-table--has-top": !!slots.top,
        "v-table--has-bottom": !!slots.bottom,
        "v-table--hover": props.hover
      }, themeClasses.value, densityClasses.value, props.class],
      "style": props.style
    }, {
      default: () => {
        var _a, _b, _c;
        return [(_a = slots.top) == null ? void 0 : _a.call(slots), slots.default ? createVNode("div", {
          "class": "v-table__wrapper",
          "style": {
            height: convertToUnit(props.height)
          }
        }, [createVNode("table", null, [slots.default()])]) : (_b = slots.wrapper) == null ? void 0 : _b.call(slots), (_c = slots.bottom) == null ? void 0 : _c.call(slots)];
      }
    }));
    return {};
  }
});
const makeDataTableItemsProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  itemValue: {
    type: [String, Array, Function],
    default: "id"
  },
  itemSelectable: {
    type: [String, Array, Function],
    default: null
  },
  rowProps: [Object, Function],
  cellProps: [Object, Function],
  returnObject: Boolean
}, "DataTable-items");
function transformItem(props, item, index, columns) {
  const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue);
  const selectable = getPropertyFromItem(item, props.itemSelectable, true);
  const itemColumns = columns.reduce((obj, column) => {
    if (column.key != null) obj[column.key] = getPropertyFromItem(item, column.value);
    return obj;
  }, {});
  return {
    type: "item",
    key: props.returnObject ? getPropertyFromItem(item, props.itemValue) : value,
    index,
    value,
    selectable,
    columns: itemColumns,
    raw: item
  };
}
function transformItems(props, items, columns) {
  return items.map((item, index) => transformItem(props, item, index, columns));
}
function useDataTableItems(props, columns) {
  const items = computed(() => transformItems(props, props.items, columns.value));
  return {
    items
  };
}
const makeDataTableProps = propsFactory({
  ...makeVDataTableRowsProps(),
  hideDefaultBody: Boolean,
  hideDefaultFooter: Boolean,
  hideDefaultHeader: Boolean,
  width: [String, Number],
  search: String,
  ...makeDataTableExpandProps(),
  ...makeDataTableGroupProps(),
  ...makeDataTableHeaderProps(),
  ...makeDataTableItemsProps(),
  ...makeDataTableSelectProps(),
  ...makeDataTableSortProps(),
  ...makeVDataTableHeadersProps(),
  ...makeVTableProps()
}, "DataTable");
const makeVDataTableProps = propsFactory({
  ...makeDataTablePaginateProps(),
  ...makeDataTableProps(),
  ...makeFilterProps(),
  ...makeVDataTableFooterProps()
}, "VDataTable");
const VDataTable = genericComponent()({
  name: "VDataTable",
  props: makeVDataTableProps(),
  emits: {
    "update:modelValue": (value) => true,
    "update:page": (value) => true,
    "update:itemsPerPage": (value) => true,
    "update:sortBy": (value) => true,
    "update:options": (value) => true,
    "update:groupBy": (value) => true,
    "update:expanded": (value) => true,
    "update:currentItems": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      groupBy
    } = createGroupBy(props);
    const {
      sortBy,
      multiSort,
      mustSort
    } = createSort(props);
    const {
      page,
      itemsPerPage
    } = createPagination(props);
    const {
      disableSort
    } = toRefs(props);
    const {
      columns,
      headers,
      sortFunctions,
      sortRawFunctions,
      filterFunctions
    } = createHeaders(props, {
      groupBy,
      showSelect: toRef(props, "showSelect"),
      showExpand: toRef(props, "showExpand")
    });
    const {
      items
    } = useDataTableItems(props, columns);
    const search = toRef(props, "search");
    const {
      filteredItems
    } = useFilter(props, items, search, {
      transform: (item) => item.columns,
      customKeyFilter: filterFunctions
    });
    const {
      toggleSort
    } = provideSort({
      sortBy,
      multiSort,
      mustSort,
      page
    });
    const {
      sortByWithGroups,
      opened,
      extractRows,
      isGroupOpen,
      toggleGroup
    } = provideGroupBy({
      groupBy,
      sortBy,
      disableSort
    });
    const {
      sortedItems
    } = useSortedItems(props, filteredItems, sortByWithGroups, {
      transform: (item) => ({
        ...item.raw,
        ...item.columns
      }),
      sortFunctions,
      sortRawFunctions
    });
    const {
      flatItems
    } = useGroupedItems(sortedItems, groupBy, opened);
    const itemsLength = computed(() => flatItems.value.length);
    const {
      startIndex,
      stopIndex,
      pageCount,
      setItemsPerPage
    } = providePagination({
      page,
      itemsPerPage,
      itemsLength
    });
    const {
      paginatedItems
    } = usePaginatedItems({
      items: flatItems,
      startIndex,
      stopIndex,
      itemsPerPage
    });
    const paginatedItemsWithoutGroups = computed(() => extractRows(paginatedItems.value));
    const {
      isSelected,
      select,
      selectAll,
      toggleSelect,
      someSelected,
      allSelected
    } = provideSelection(props, {
      allItems: items,
      currentPage: paginatedItemsWithoutGroups
    });
    const {
      isExpanded,
      toggleExpand
    } = provideExpanded(props);
    useOptions({
      page,
      itemsPerPage,
      sortBy,
      groupBy,
      search
    });
    provideDefaults({
      VDataTableRows: {
        hideNoData: toRef(props, "hideNoData"),
        noDataText: toRef(props, "noDataText"),
        loading: toRef(props, "loading"),
        loadingText: toRef(props, "loadingText")
      }
    });
    const slotProps = computed(() => ({
      page: page.value,
      itemsPerPage: itemsPerPage.value,
      sortBy: sortBy.value,
      pageCount: pageCount.value,
      toggleSort,
      setItemsPerPage,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      isSelected,
      select,
      selectAll,
      toggleSelect,
      isExpanded,
      toggleExpand,
      isGroupOpen,
      toggleGroup,
      items: paginatedItemsWithoutGroups.value.map((item) => item.raw),
      internalItems: paginatedItemsWithoutGroups.value,
      groupedItems: paginatedItems.value,
      columns: columns.value,
      headers: headers.value
    }));
    useRender(() => {
      const dataTableFooterProps = VDataTableFooter.filterProps(props);
      const dataTableHeadersProps = VDataTableHeaders.filterProps(props);
      const dataTableRowsProps = VDataTableRows.filterProps(props);
      const tableProps = VTable.filterProps(props);
      return createVNode(VTable, mergeProps({
        "class": ["v-data-table", {
          "v-data-table--show-select": props.showSelect,
          "v-data-table--loading": props.loading
        }, props.class],
        "style": props.style
      }, tableProps, {
        "fixedHeader": props.fixedHeader || props.sticky
      }), {
        top: () => {
          var _a;
          return (_a = slots.top) == null ? void 0 : _a.call(slots, slotProps.value);
        },
        default: () => {
          var _a, _b, _c, _d, _e, _f;
          return slots.default ? slots.default(slotProps.value) : createVNode(Fragment, null, [(_a = slots.colgroup) == null ? void 0 : _a.call(slots, slotProps.value), !props.hideDefaultHeader && createVNode("thead", {
            "key": "thead"
          }, [createVNode(VDataTableHeaders, dataTableHeadersProps, slots)]), (_b = slots.thead) == null ? void 0 : _b.call(slots, slotProps.value), !props.hideDefaultBody && createVNode("tbody", null, [(_c = slots["body.prepend"]) == null ? void 0 : _c.call(slots, slotProps.value), slots.body ? slots.body(slotProps.value) : createVNode(VDataTableRows, mergeProps(attrs, dataTableRowsProps, {
            "items": paginatedItems.value
          }), slots), (_d = slots["body.append"]) == null ? void 0 : _d.call(slots, slotProps.value)]), (_e = slots.tbody) == null ? void 0 : _e.call(slots, slotProps.value), (_f = slots.tfoot) == null ? void 0 : _f.call(slots, slotProps.value)]);
        },
        bottom: () => slots.bottom ? slots.bottom(slotProps.value) : !props.hideDefaultFooter && createVNode(Fragment, null, [createVNode(VDivider, null, null), createVNode(VDataTableFooter, dataTableFooterProps, {
          prepend: slots["footer.prepend"]
        })])
      });
    });
    return {};
  }
});
const makeVTooltipProps = propsFactory({
  id: String,
  text: String,
  ...omit(makeVOverlayProps({
    closeOnBack: false,
    location: "end",
    locationStrategy: "connected",
    eager: true,
    minWidth: 0,
    offset: 10,
    openOnClick: false,
    openOnHover: true,
    origin: "auto",
    scrim: false,
    scrollStrategy: "reposition",
    transition: false
  }), ["absolute", "persistent"])
}, "VTooltip");
const VTooltip = genericComponent()({
  name: "VTooltip",
  props: makeVTooltipProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const uid = getUid();
    const id = computed(() => props.id || `v-tooltip-${uid}`);
    const overlay = ref();
    const location = computed(() => {
      return props.location.split(" ").length > 1 ? props.location : props.location + " center";
    });
    const origin = computed(() => {
      return props.origin === "auto" || props.origin === "overlap" || props.origin.split(" ").length > 1 || props.location.split(" ").length > 1 ? props.origin : props.origin + " center";
    });
    const transition = computed(() => {
      if (props.transition) return props.transition;
      return isActive.value ? "scale-transition" : "fade-transition";
    });
    const activatorProps = computed(() => mergeProps({
      "aria-describedby": id.value
    }, props.activatorProps));
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-tooltip", props.class],
        "style": props.style,
        "id": id.value
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "transition": transition.value,
        "absolute": true,
        "location": location.value,
        "origin": origin.value,
        "persistent": true,
        "role": "tooltip",
        "activatorProps": activatorProps.value,
        "_disableGlobalStack": true
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          var _a;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return ((_a = slots.default) == null ? void 0 : _a.call(slots, ...args)) ?? props.text;
        }
      });
    });
    return forwardRefs({}, overlay);
  }
});
var __defProp$i = Object.defineProperty;
var __getOwnPropDesc$i = Object.getOwnPropertyDescriptor;
var __decorateClass$i = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$i(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$i(target, key, result);
  return result;
};
let CardToolbar$1 = class CardToolbar extends Vue {
};
CardToolbar$1 = __decorateClass$i([
  Component({
    name: "CardToolbar"
  })
], CardToolbar$1);
const _sfc_main$c = toNative(CardToolbar$1);
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VCardTitle, {
    class: "my-0 pb-0",
    align: "start"
  }, {
    default: withCtx(() => [
      createVNode(VRow, null, {
        default: withCtx(() => [
          createVNode(VCol, {
            align: "start",
            justify: "start"
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "left")
            ]),
            _: 3
          }),
          createVNode(VSpacer),
          createVNode(VCol, {
            align: "start",
            justify: "start"
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "right")
            ]),
            _: 3
          })
        ]),
        _: 3
      })
    ]),
    _: 3
  });
}
const CardToolbar2 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c]]);
var __defProp$h = Object.defineProperty;
var __getOwnPropDesc$h = Object.getOwnPropertyDescriptor;
var __decorateClass$h = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$h(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$h(target, key, result);
  return result;
};
let MainCard$1 = class MainCard extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "title");
    __publicField(this, "noToolbar");
  }
};
__decorateClass$h([
  decorator({ default: "Title" })
], MainCard$1.prototype, "title", 2);
__decorateClass$h([
  decorator({ default: false })
], MainCard$1.prototype, "noToolbar", 2);
MainCard$1 = __decorateClass$h([
  Component({
    name: "MainCard",
    components: {
      CardTitle,
      CardToolbar: CardToolbar2
    }
  })
], MainCard$1);
const _sfc_main$b = toNative(MainCard$1);
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CardTitle = resolveComponent("CardTitle");
  const _component_CardToolbar = resolveComponent("CardToolbar");
  return openBlock(), createBlock(VCard, { class: "fill-width py-2 px-4" }, {
    default: withCtx(() => [
      createVNode(_component_CardTitle, { title: _ctx.title }, null, 8, ["title"]),
      !_ctx.noToolbar ? (openBlock(), createBlock(_component_CardToolbar, { key: 0 }, {
        left: withCtx(() => [
          renderSlot(_ctx.$slots, "toolbar-left")
        ]),
        right: withCtx(() => [
          renderSlot(_ctx.$slots, "toolbar-right")
        ]),
        _: 3
      })) : createCommentVNode("", true),
      createVNode(VCardText, null, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "content"),
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      })
    ]),
    _: 3
  });
}
const MainCard2 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b]]);
var __defProp$g = Object.defineProperty;
var __getOwnPropDesc$g = Object.getOwnPropertyDescriptor;
var __decorateClass$g = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$g(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$g(target, key, result);
  return result;
};
let FormBase = class extends WorkingComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "myForm");
    __publicField(this, "valid", true);
    __publicField(this, "disabled");
    __publicField(this, "onCancel");
    __publicField(this, "onChange");
    __publicField(this, "onReset");
    __publicField(this, "onValidate");
    __publicField(this, "onSubmit");
  }
  emitCancel(value = null) {
    return value;
  }
  emitReset(value = null) {
    return value;
  }
  emitChange(value = null) {
    return value;
  }
  emitValidate(value = null) {
    return value;
  }
  emitSubmit(value = null) {
    return value;
  }
  getForm() {
    return this.myForm;
  }
  _getValue() {
    let val = this.getForm();
    if (!val)
      val = this.$event;
    return val;
  }
  getValue() {
    return this._getValue();
  }
  _validate() {
    if (this.getForm()) {
      this.getForm().validate();
    }
    if (this.onValidate)
      this.onValidate(this.getForm());
    else
      this.emitValidate(this.getForm());
    return true;
  }
  validate() {
    return this._validate();
  }
  _resetValidation() {
    if (this.getForm()) {
      this.getForm().resetValidation();
    }
    this.valid = true;
  }
  resetValidation() {
    return this._resetValidation();
  }
  _reset() {
    this.resetValidation();
    if (this.onReset)
      this.onReset(this.getForm());
    else
      this.emitReset(this.getForm());
  }
  reset() {
    this._reset();
  }
  async _submit() {
    this.validate();
    if (!this.valid) return;
    if (this.onSubmit) {
      this.busy = true;
      await this.onSubmit(this.getValue());
    } else {
      this.emitSubmit(this.getValue());
    }
    this.close();
  }
  async submit() {
    return await this._submit();
  }
  close() {
  }
};
__decorateClass$g([
  decorator$1("myForm")
], FormBase.prototype, "myForm", 2);
__decorateClass$g([
  decorator({ type: Boolean, default: false })
], FormBase.prototype, "disabled", 2);
__decorateClass$g([
  decorator({ type: Function })
], FormBase.prototype, "onCancel", 2);
__decorateClass$g([
  decorator({ type: Function })
], FormBase.prototype, "onChange", 2);
__decorateClass$g([
  decorator({ type: Function })
], FormBase.prototype, "onReset", 2);
__decorateClass$g([
  decorator({ type: Function })
], FormBase.prototype, "onValidate", 2);
__decorateClass$g([
  decorator({ type: Function })
], FormBase.prototype, "onSubmit", 2);
__decorateClass$g([
  decorator$2("cancel")
], FormBase.prototype, "emitCancel", 1);
__decorateClass$g([
  decorator$2("reset")
], FormBase.prototype, "emitReset", 1);
__decorateClass$g([
  decorator$2("change")
], FormBase.prototype, "emitChange", 1);
__decorateClass$g([
  decorator$2("validate")
], FormBase.prototype, "emitValidate", 1);
__decorateClass$g([
  decorator$2("submit")
], FormBase.prototype, "emitSubmit", 1);
FormBase = __decorateClass$g([
  Component({
    name: "FormBase",
    components: {},
    emits: ["cancel", "reset", "change", "validate", "submit"]
  })
], FormBase);
toNative(FormBase);
var __defProp$f = Object.defineProperty;
var __getOwnPropDesc$f = Object.getOwnPropertyDescriptor;
var __decorateClass$f = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$f(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$f(target, key, result);
  return result;
};
let modelEvent$1 = "update:modelValue";
let DialogBase = class extends FormBase {
  constructor() {
    super(...arguments);
    __publicField(this, "modelValue");
  }
  get myDialog() {
    return this.modelValue;
  }
  set myDialog(value) {
    if (value == this.modelValue) return;
    this.reset();
    this.busy = false;
    this.emitChange(value);
    this.emitModel(value);
  }
  emitModel(value = null) {
    return value;
  }
  async _close() {
    if (this.onCancel) {
      this.busy = true;
      await this.onCancel(this.myDialog, this.releaseBusy);
    } else {
      this.$emit("cancel", this.myDialog, this.releaseBusy);
    }
    if (typeof this.myDialog == "boolean" || this.myDialog instanceof Boolean) {
      this.myDialog = false;
    } else if (typeof this.myDialog == "string" || this.myDialog instanceof String) {
      this.myDialog = "";
    } else if (this.myDialog instanceof Object) {
      this.myDialog = null;
    } else if (this.myDialog instanceof Array) {
      this.myDialog.pop();
      this.myDialog = this.myDialog;
    } else {
      console.log(this.myDialog);
    }
    if (this.reset)
      this.reset();
    this.busy = false;
  }
  async close() {
    return await this._close();
  }
  get interactable() {
    return !this.disabled && !this.busy;
  }
};
__decorateClass$f([
  decorator({ type: [Boolean, String, Object, Array] })
], DialogBase.prototype, "modelValue", 2);
__decorateClass$f([
  decorator$2(modelEvent$1)
], DialogBase.prototype, "emitModel", 1);
DialogBase = __decorateClass$f([
  Component({
    name: "DialogBase",
    components: {},
    emits: [modelEvent$1]
  })
], DialogBase);
toNative(DialogBase);
var __defProp$e = Object.defineProperty;
var __getOwnPropDesc$e = Object.getOwnPropertyDescriptor;
var __decorateClass$e = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$e(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$e(target, key, result);
  return result;
};
let FormDialogBase = class extends DialogBase {
};
FormDialogBase = __decorateClass$e([
  Component({
    name: "FormDialogBase",
    components: {}
  })
], FormDialogBase);
toNative(FormDialogBase);
var __defProp$d = Object.defineProperty;
var __getOwnPropDesc$d = Object.getOwnPropertyDescriptor;
var __decorateClass$d = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$d(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$d(target, key, result);
  return result;
};
let FormDialog$1 = class FormDialog extends FormDialogBase {
  constructor() {
    super(...arguments);
    __publicField(this, "cancelText");
    __publicField(this, "confirmText");
    __publicField(this, "maxWidth");
    __publicField(this, "title");
  }
};
__decorateClass$d([
  decorator({ default: "Batal" })
], FormDialog$1.prototype, "cancelText", 2);
__decorateClass$d([
  decorator({ default: "Ok" })
], FormDialog$1.prototype, "confirmText", 2);
__decorateClass$d([
  decorator({ default: 400 })
], FormDialog$1.prototype, "maxWidth", 2);
__decorateClass$d([
  decorator({ default: "Form" })
], FormDialog$1.prototype, "title", 2);
FormDialog$1 = __decorateClass$d([
  Component({
    name: "FormDialog",
    components: {}
  })
], FormDialog$1);
const _sfc_main$a = toNative(FormDialog$1);
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VDialog, {
    modelValue: _ctx.myDialog,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.myDialog = $event),
    "max-width": _ctx.maxWidth,
    persistent: _ctx.busy
  }, {
    default: withCtx(() => [
      createVNode(VCard, { class: "" }, {
        default: withCtx(() => [
          createVNode(VForm, {
            ref: "myForm",
            modelValue: _ctx.valid,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.valid = $event),
            class: "p-2",
            disabled: !_ctx.interactable,
            onSubmit: withModifiers(_ctx.submit, ["prevent"])
          }, {
            default: withCtx(() => [
              createVNode(VCardTitle, { class: "headline" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.title), 1)
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "fields", {
                    interactable: _ctx.interactable,
                    busy: _ctx.busy,
                    disabled: _ctx.disabled
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "buttons-left", {
                        interactable: _ctx.interactable,
                        busy: _ctx.busy,
                        disabled: _ctx.disabled
                      }),
                      createVNode(VSpacer),
                      renderSlot(_ctx.$slots, "buttons", {
                        interactable: _ctx.interactable,
                        busy: _ctx.busy,
                        disabled: _ctx.disabled
                      }),
                      renderSlot(_ctx.$slots, "buttons-right", {
                        interactable: _ctx.interactable,
                        busy: _ctx.busy,
                        disabled: _ctx.disabled
                      }),
                      _ctx.cancelText ? (openBlock(), createBlock(VBtn, {
                        key: 0,
                        color: "green darken-1",
                        text: "",
                        onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.close(), ["stop"])),
                        disabled: !_ctx.interactable
                      }, {
                        default: withCtx(() => _cache[3] || (_cache[3] = [
                          createTextVNode(" Batal ")
                        ])),
                        _: 1
                      }, 8, ["disabled"])) : createCommentVNode("", true),
                      _ctx.confirmText ? (openBlock(), createBlock(VBtn, {
                        key: 1,
                        type: "submit",
                        color: "green darken-1",
                        text: "",
                        disabled: !_ctx.interactable,
                        loading: _ctx.busy
                      }, {
                        default: withCtx(() => _cache[4] || (_cache[4] = [
                          createTextVNode(" Ok ")
                        ])),
                        _: 1
                      }, 8, ["disabled", "loading"])) : createCommentVNode("", true)
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              })
            ]),
            _: 3
          }, 8, ["modelValue", "disabled", "onSubmit"])
        ]),
        _: 3
      })
    ]),
    _: 3
  }, 8, ["modelValue", "max-width", "persistent"]);
}
const FormDialog2 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a]]);
var __defProp$c = Object.defineProperty;
var __getOwnPropDesc$c = Object.getOwnPropertyDescriptor;
var __decorateClass$c = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$c(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$c(target, key, result);
  return result;
};
let SimpleInputDialog$1 = class SimpleInputDialog extends FormDialogBase {
  constructor() {
    super(...arguments);
    __publicField(this, "cancelText");
    __publicField(this, "confirmText");
    __publicField(this, "maxWidth");
    __publicField(this, "title");
    __publicField(this, "text");
    __publicField(this, "type");
    __publicField(this, "label");
    __publicField(this, "password");
    __publicField(this, "noInput");
    __publicField(this, "rules");
    __publicField(this, "counter");
    __publicField(this, "input", "");
    __publicField(this, "inputConfirm", "");
    __publicField(this, "passwordVisible", false);
  }
  reset() {
    this.input = "";
    this.inputConfirm = "";
  }
  validateConfirm(inputConfirm) {
    return this.input === inputConfirm;
  }
  getValue() {
    return this.input;
  }
  get confirmRules() {
    return [
      (v) => !!v || "Konfirmasi tidak boleh kosong",
      (v) => this.validateConfirm(v) || "Konfirmasi tidak sama"
    ];
  }
};
__decorateClass$c([
  decorator({ default: "Batal" })
], SimpleInputDialog$1.prototype, "cancelText", 2);
__decorateClass$c([
  decorator({ default: "Ok" })
], SimpleInputDialog$1.prototype, "confirmText", 2);
__decorateClass$c([
  decorator({ default: 400 })
], SimpleInputDialog$1.prototype, "maxWidth", 2);
__decorateClass$c([
  decorator({ default: "Input Text" })
], SimpleInputDialog$1.prototype, "title", 2);
__decorateClass$c([
  decorator({ default: "" })
], SimpleInputDialog$1.prototype, "text", 2);
__decorateClass$c([
  decorator({ default: "" })
], SimpleInputDialog$1.prototype, "type", 2);
__decorateClass$c([
  decorator({ default: "Input" })
], SimpleInputDialog$1.prototype, "label", 2);
__decorateClass$c([
  decorator({ default: false })
], SimpleInputDialog$1.prototype, "password", 2);
__decorateClass$c([
  decorator({ default: false })
], SimpleInputDialog$1.prototype, "noInput", 2);
__decorateClass$c([
  decorator({ type: [Array, Function] })
], SimpleInputDialog$1.prototype, "rules", 2);
__decorateClass$c([
  decorator({ type: [Function, Number] })
], SimpleInputDialog$1.prototype, "counter", 2);
SimpleInputDialog$1 = __decorateClass$c([
  Component({
    name: "SimpleInputDialog",
    components: {
      FormDialog: FormDialog2
    }
  })
], SimpleInputDialog$1);
const _sfc_main$9 = toNative(SimpleInputDialog$1);
const _hoisted_1$2 = { class: "text-left" };
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FormDialog = resolveComponent("FormDialog");
  return openBlock(), createBlock(_component_FormDialog, {
    "max-width": "290",
    "parent-busy": _ctx.busy,
    title: _ctx.title,
    disabled: _ctx.disabled,
    modelValue: _ctx.myDialog,
    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.myDialog = $event),
    "on-reset": _ctx.reset,
    "on-cancel": _ctx.onCancel,
    "on-submit": _ctx.submit
  }, {
    fields: withCtx(({ interactable, busy }) => [
      createBaseVNode("p", _hoisted_1$2, toDisplayString(_ctx.text), 1),
      !_ctx.noInput && !_ctx.password ? (openBlock(), createBlock(VTextField, {
        key: 0,
        class: "bigger-input",
        label: _ctx.label,
        modelValue: _ctx.input,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.input = $event),
        disabled: !interactable,
        required: "",
        rules: _ctx.rules,
        counter: _ctx.counter
      }, null, 8, ["label", "modelValue", "disabled", "rules", "counter"])) : createCommentVNode("", true),
      !_ctx.noInput && _ctx.password ? (openBlock(), createBlock(VTextField, {
        key: 1,
        class: "bigger-input",
        label: _ctx.label,
        modelValue: _ctx.input,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.input = $event),
        disabled: !interactable,
        "append-icon": _ctx.passwordVisible ? "mdi-eye" : "mdi-eye-off",
        "onClick:append": _cache[2] || (_cache[2] = () => {
          _ctx.passwordVisible = !_ctx.passwordVisible;
        }),
        type: _ctx.passwordVisible ? "text" : "password",
        required: "",
        rules: _ctx.rules,
        counter: _ctx.counter
      }, null, 8, ["label", "modelValue", "disabled", "append-icon", "type", "rules", "counter"])) : createCommentVNode("", true),
      !_ctx.noInput && _ctx.password ? (openBlock(), createBlock(VTextField, {
        key: 2,
        class: "bigger-input",
        label: "Konfirmasi " + _ctx.label,
        modelValue: _ctx.inputConfirm,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.inputConfirm = $event),
        disabled: !interactable,
        type: "password",
        required: "",
        counter: _ctx.counter,
        rules: _ctx.confirmRules
      }, null, 8, ["label", "modelValue", "disabled", "counter", "rules"])) : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["parent-busy", "title", "disabled", "modelValue", "on-reset", "on-cancel", "on-submit"]);
}
const SimpleInputDialog2 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__scopeId", "data-v-01fd217e"]]);
var __defProp$b = Object.defineProperty;
var __getOwnPropDesc$b = Object.getOwnPropertyDescriptor;
var __decorateClass$b = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$b(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$b(target, key, result);
  return result;
};
let ConfirmationSlot$1 = class ConfirmationSlot extends WorkingComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "confirmTextMaker");
    __publicField(this, "onConfirm");
    __publicField(this, "onCancel");
    __publicField(this, "confirmText", "");
    __publicField(this, "confirmDialog", false);
  }
  emitConfirm() {
    return true;
  }
  emitCancel() {
    return true;
  }
  confirm() {
    if (this.onConfirm) {
      this.busy = true;
      this.onConfirm();
    } else {
      this.emitConfirm();
    }
    this.confirmDialog = false;
    this.busy = false;
  }
  ask() {
    if (!this.confirmTextMaker) {
      this.confirm();
    } else {
      if (this.confirmTextMaker instanceof Function) {
        this.confirmText = this.confirmTextMaker();
      } else if (typeof this.confirmTextMaker === "string" || this.confirmTextMaker instanceof String) {
        this.confirmText = this.confirmTextMaker;
      } else {
        this.confirmText = "";
      }
      this.confirmDialog = true;
    }
  }
};
__decorateClass$b([
  decorator({ type: [String, Function] })
], ConfirmationSlot$1.prototype, "confirmTextMaker", 2);
__decorateClass$b([
  decorator({ type: Function })
], ConfirmationSlot$1.prototype, "onConfirm", 2);
__decorateClass$b([
  decorator({ type: Function })
], ConfirmationSlot$1.prototype, "onCancel", 2);
__decorateClass$b([
  decorator$2("confirm")
], ConfirmationSlot$1.prototype, "emitConfirm", 1);
__decorateClass$b([
  decorator$2("cancel")
], ConfirmationSlot$1.prototype, "emitCancel", 1);
ConfirmationSlot$1 = __decorateClass$b([
  Component({
    name: "ConfirmationSlot",
    components: {
      SimpleInputDialog: SimpleInputDialog2
    },
    emits: ["confirm", "cancel"]
  })
], ConfirmationSlot$1);
const _sfc_main$8 = toNative(ConfirmationSlot$1);
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_SimpleInputDialog = resolveComponent("SimpleInputDialog");
  return openBlock(), createElementBlock("span", null, [
    renderSlot(_ctx.$slots, "default", { ask: _ctx.ask }),
    _ctx.confirmTextMaker && _ctx.confirmDialog ? (openBlock(), createBlock(_component_SimpleInputDialog, {
      key: 0,
      modelValue: _ctx.confirmDialog,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.confirmDialog = $event),
      "on-submit": _ctx.confirm,
      "on-cancel": _ctx.onCancel,
      title: "Konfirmasi",
      text: _ctx.confirmText,
      "no-input": "true",
      "parent-busy": _ctx.busy
    }, null, 8, ["modelValue", "on-submit", "on-cancel", "text", "parent-busy"])) : createCommentVNode("", true)
  ]);
}
const ConfirmationSlot2 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
var __defProp$a = Object.defineProperty;
var __getOwnPropDesc$a = Object.getOwnPropertyDescriptor;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$a(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$a(target, key, result);
  return result;
};
let SyncCheckbox$1 = class SyncCheckbox extends WorkingComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "name");
    __publicField(this, "value");
    __publicField(this, "inputValue");
    __publicField(this, "confirmTextMaker");
    __publicField(this, "disabled");
    __publicField(this, "textEnable");
    __publicField(this, "textDisable");
    __publicField(this, "ask");
    __publicField(this, "onChange");
  }
  emitChange(value) {
    return value;
  }
  async tryAsk(ask) {
    if (!this.disabled) {
      if (this.ask)
        await ask();
      else
        await this.change();
    }
  }
  get text() {
    return this.inputValue ? this.textDisable : this.textEnable;
  }
  async change() {
    if (this.onChange) {
      this.busy = true;
      await this.onChange(!this.inputValue, this.releaseBusy);
      this.busy = false;
    } else {
      this.$emit("change", !this.inputValue, this.releaseBusy);
    }
  }
};
__decorateClass$a([
  decorator({ type: String })
], SyncCheckbox$1.prototype, "name", 2);
__decorateClass$a([
  decorator({ type: String })
], SyncCheckbox$1.prototype, "value", 2);
__decorateClass$a([
  decorator({ default: false })
], SyncCheckbox$1.prototype, "inputValue", 2);
__decorateClass$a([
  decorator({ type: [String, Function] })
], SyncCheckbox$1.prototype, "confirmTextMaker", 2);
__decorateClass$a([
  decorator({ default: false })
], SyncCheckbox$1.prototype, "disabled", 2);
__decorateClass$a([
  decorator({ type: String })
], SyncCheckbox$1.prototype, "textEnable", 2);
__decorateClass$a([
  decorator({ type: String })
], SyncCheckbox$1.prototype, "textDisable", 2);
__decorateClass$a([
  decorator({ default: true })
], SyncCheckbox$1.prototype, "ask", 2);
__decorateClass$a([
  decorator({ type: Function })
], SyncCheckbox$1.prototype, "onChange", 2);
__decorateClass$a([
  decorator$2("change")
], SyncCheckbox$1.prototype, "emitChange", 1);
SyncCheckbox$1 = __decorateClass$a([
  Component({
    name: "SyncCheckbox",
    components: {
      ConfirmationSlot: ConfirmationSlot2
    },
    emits: ["change"]
  })
], SyncCheckbox$1);
const _sfc_main$7 = toNative(SyncCheckbox$1);
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ConfirmationSlot = resolveComponent("ConfirmationSlot");
  return openBlock(), createBlock(_component_ConfirmationSlot, {
    class: "d-flex text-center justify-center justify-self-center",
    confirmTextMaker: _ctx.confirmTextMaker,
    "on-confirm": _ctx.change,
    "parent-busy": _ctx.busy
  }, {
    default: withCtx(({ ask }) => [
      createVNode(VTooltip, {
        bottom: "",
        disabled: _ctx.disabled || !_ctx.text
      }, {
        activator: withCtx(({ props }) => [
          createVNode(VCheckbox, mergeProps(props, {
            name: _ctx.name,
            "input-value": _ctx.inputValue,
            value: _ctx.value,
            onClickCapture: withModifiers(() => _ctx.tryAsk(ask), ["prevent"]),
            readonly: "",
            class: "text-center justify-center justify-self-center",
            disabled: _ctx.disabled
          }), null, 16, ["name", "input-value", "value", "onClickCapture", "disabled"])
        ]),
        default: withCtx(() => [
          createBaseVNode("span", null, toDisplayString(_ctx.text), 1)
        ]),
        _: 2
      }, 1032, ["disabled"])
    ]),
    _: 1
  }, 8, ["confirmTextMaker", "on-confirm", "parent-busy"]);
}
const SyncCheckbox2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
var __defProp$9 = Object.defineProperty;
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$9(target, key, result);
  return result;
};
let ChirpFormDialog$1 = class ChirpFormDialog extends FormDialogBase {
  constructor() {
    super(...arguments);
    __publicField(this, "data");
    __publicField(this, "form", C({
      message: ""
    }));
  }
  reset() {
    this.form.reset();
  }
  async submit() {
    if (!this.valid) return;
    const view = this;
    view.busy = true;
    try {
      let res = null;
      if (this.data) {
        res = await chirpService.update(this.data, this.form);
      } else {
        res = await chirpService.store(this.form);
      }
      view.emitSubmit(res.chirp);
      view.close();
    } finally {
      view.busy = false;
    }
  }
  emitSubmit(chirp) {
    return chirp;
  }
};
__decorateClass$9([
  decorator({ default: null })
], ChirpFormDialog$1.prototype, "data", 2);
__decorateClass$9([
  decorator$2("submit")
], ChirpFormDialog$1.prototype, "emitSubmit", 1);
ChirpFormDialog$1 = __decorateClass$9([
  Component({
    name: "ChirpFormDialog",
    components: {
      FormDialog: FormDialog2,
      VTextField
    },
    emits: ["submit"]
  })
], ChirpFormDialog$1);
const _sfc_main$6 = toNative(ChirpFormDialog$1);
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FormDialog = resolveComponent("FormDialog", true);
  return openBlock(), createBlock(_component_FormDialog, {
    "max-width": "400",
    "parent-busy": _ctx.busy,
    "on-submit": _ctx.submit,
    title: "Chirp",
    disabled: _ctx.disabled,
    "on-reset": _ctx.reset,
    modelValue: _ctx.myDialog,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.myDialog = $event)
  }, {
    fields: withCtx(({ interactable, busy }) => [
      createVNode(VTextField, {
        name: "message",
        class: "bigger-input",
        label: "Message",
        modelValue: _ctx.form.message,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.form.message = $event),
        disabled: !interactable,
        required: ""
      }, null, 8, ["modelValue", "disabled"])
    ]),
    _: 1
  }, 8, ["parent-busy", "on-submit", "disabled", "on-reset", "modelValue"]);
}
const ChirpFormDialog2 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$8(target, key, result);
  return result;
};
let IconButton$1 = class IconButton extends MyComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "size");
    __publicField(this, "small");
    __publicField(this, "icon");
    __publicField(this, "text");
    __publicField(this, "disabled");
  }
  emitClick(event) {
    return event;
  }
};
__decorateClass$8([
  decorator({ default: 32 })
], IconButton$1.prototype, "size", 2);
__decorateClass$8([
  decorator({ default: true })
], IconButton$1.prototype, "small", 2);
__decorateClass$8([
  decorator({ type: String })
], IconButton$1.prototype, "icon", 2);
__decorateClass$8([
  decorator({ type: String })
], IconButton$1.prototype, "text", 2);
__decorateClass$8([
  decorator({ default: false })
], IconButton$1.prototype, "disabled", 2);
__decorateClass$8([
  decorator$2("click")
], IconButton$1.prototype, "emitClick", 1);
IconButton$1 = __decorateClass$8([
  Component({
    name: "IconButton",
    components: {
      ConfirmationSlot: ConfirmationSlot2
    },
    emits: ["click"]
  })
], IconButton$1);
const _sfc_main$5 = toNative(IconButton$1);
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VTooltip, {
    bottom: "",
    disabled: _ctx.disabled || !_ctx.text
  }, {
    activator: withCtx(({ props }) => [
      createVNode(VBtn, mergeProps({
        icon: "",
        class: ""
      }, props, {
        disabled: _ctx.disabled,
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.emitClick($event))
      }), {
        default: withCtx(() => [
          createVNode(VIcon, {
            size: _ctx.size,
            small: _ctx.small
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.icon), 1)
            ]),
            _: 1
          }, 8, ["size", "small"])
        ]),
        _: 2
      }, 1040, ["disabled"])
    ]),
    default: withCtx(() => [
      createBaseVNode("span", null, toDisplayString(_ctx.text), 1)
    ]),
    _: 1
  }, 8, ["disabled"]);
}
const IconButton2 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
  for (var i = decorators.length - 1, decorator2; i >= 0; i--)
    if (decorator2 = decorators[i])
      result = (kind ? decorator2(target, key, result) : decorator2(result)) || result;
  if (kind && result) __defProp$7(target, key, result);
  return result;
};
let modelEvent = "update:modelValue";
let BaseCrudView$1 = class BaseCrudView extends BaseView {
  constructor() {
    super(...arguments);
    __publicField(this, "title");
    __publicField(this, "createText");
    __publicField(this, "refreshText");
    __publicField(this, "create");
    __publicField(this, "fetch");
    __publicField(this, "mySearch");
  }
  emitModel(value) {
    return value;
  }
};
__decorateClass$7([
  decorator({ default: "Crud" })
], BaseCrudView$1.prototype, "title", 2);
__decorateClass$7([
  decorator({ default: "Buat" })
], BaseCrudView$1.prototype, "createText", 2);
__decorateClass$7([
  decorator({ default: "Refresh" })
], BaseCrudView$1.prototype, "refreshText", 2);
__decorateClass$7([
  decorator({ type: Function })
], BaseCrudView$1.prototype, "create", 2);
__decorateClass$7([
  decorator({ type: Function })
], BaseCrudView$1.prototype, "fetch", 2);
__decorateClass$7([
  decorator$3({ name: "search", type: [String, Object] })
], BaseCrudView$1.prototype, "mySearch", 2);
__decorateClass$7([
  decorator$2(modelEvent)
], BaseCrudView$1.prototype, "emitModel", 1);
BaseCrudView$1 = __decorateClass$7([
  Component({
    name: "BaseCrudView",
    components: {
      MainCard: MainCard2,
      IconButton: IconButton2
    },
    emits: [modelEvent]
  })
], BaseCrudView$1);
const _sfc_main$4 = toNative(BaseCrudView$1);
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_IconButton = resolveComponent("IconButton");
  const _component_MainCard = resolveComponent("MainCard");
  return openBlock(), createBlock(_component_MainCard, { title: _ctx.title }, {
    "toolbar-left": withCtx(() => [
      createVNode(_component_IconButton, {
        onClick: _ctx.create,
        disabled: _ctx.busy,
        icon: "mdi-plus",
        text: _ctx.createText,
        small: false
      }, null, 8, ["onClick", "disabled", "text"]),
      createVNode(_component_IconButton, {
        onClick: _ctx.fetch,
        disabled: _ctx.busy,
        icon: "mdi-refresh",
        text: _ctx.refreshText,
        small: false
      }, null, 8, ["onClick", "disabled", "text"]),
      renderSlot(_ctx.$slots, "toolbar-left", { busy: _ctx.busy })
    ]),
    "toolbar-right": withCtx(() => [
      renderSlot(_ctx.$slots, "toolbar-right", { busy: _ctx.busy }),
      !(typeof _ctx.search === "undefined" || _ctx.search === null) ? (openBlock(), createBlock(VTextField, {
        key: 0,
        class: "pt-0 mt-0",
        modelValue: _ctx.mySearch,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.mySearch = $event),
        "append-icon": "mdi-magnify",
        label: "Search",
        "single-line": "",
        "hide-details": "",
        disabled: _ctx.busy
      }, null, 8, ["modelValue", "disabled"])) : createCommentVNode("", true)
    ]),
    content: withCtx(() => [
      renderSlot(_ctx.$slots, "content", { busy: _ctx.busy })
    ]),
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", { busy: _ctx.busy })
    ]),
    _: 3
  }, 8, ["title"]);
}
const BaseCrudView2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
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
let BaseCrudViewBase = class extends BaseView {
  constructor() {
    super(...arguments);
    __publicField(this, "createDialog", false);
    __publicField(this, "search", "");
    __publicField(this, "items", []);
  }
  get nameField() {
    return "name";
  }
  get itemName() {
    return "Item";
  }
  get client() {
    return null;
  }
  get headers() {
    return [];
  }
  get breadcrumbs() {
    return [];
  }
  get query() {
    return {};
  }
  get filteredErrors() {
    return [];
  }
  _deleteConfirmText(item) {
    return `Apa Anda yakin ingin menghapus ${this.itemName.toLowerCase()} '${item[this.nameField]}'?`;
  }
  storeItem(item) {
    let index = findIndex(this.items, item);
    if (index < 0) {
      this.items.push(item);
    } else {
      this.items[index] = item;
    }
  }
  async _askDelete(item, ask) {
    if (ask)
      ask();
  }
  async _deleteItem(item, releaseBusy = true) {
    const view = this;
    view.busy = true;
    try {
      await this.client.delete(item.id);
      deleteFromArray(this.items, item);
    } catch (error) {
      view.showError(error);
    } finally {
      if (releaseBusy)
        view.busy = false;
    }
  }
  async _mounted() {
    await this.fetch();
  }
  async _fetch(releaseBusy = true) {
    const view = this;
    view.busy = true;
    let query = this.query;
    try {
      let res = await this.client.fetch(query);
      this.items = this.client.getData(res);
    } catch (error) {
      view.showError(error);
    } finally {
      if (releaseBusy)
        view.busy = false;
    }
  }
  _setNameConfirmText(item, newValue) {
    return this.setFieldConfirmText(this.nameField, item, newValue);
  }
  async _setName(item, newValue) {
    return await this.setField(this.nameField, item, newValue);
  }
  _setFieldConfirmText(fieldName, item, newValue, alias = null) {
    let oldValue = item[fieldName];
    if (alias) {
      oldValue = alias[oldValue];
      newValue = alias[newValue];
    }
    return `Apa Anda yakin ingin mengubah ${fieldName} ${this.itemName.toLowerCase()} '${item[this.nameField]}' dari '${oldValue}' menjadi '${newValue}'?`;
  }
  async _setField(fieldName, item, value, releaseBusy = true) {
    const view = this;
    view.busy = true;
    try {
      await this.client[`set_${fieldName}`](item.id, value);
      item[fieldName] = value;
    } catch (error) {
      view.showError(error);
    } finally {
      if (releaseBusy)
        view.busy = false;
    }
  }
  _setEnabledConfirmText(item) {
    return this.toggleFieldConfirmText("enabled", "menonaktifkan", "mengaktifkan", item);
  }
  async _setEnabled(item, enabled) {
    return await this.toggleField("enabled", item, enabled);
  }
  _toggleFieldConfirmText(fieldName, disable, enable, item) {
    let action = item[fieldName] ? disable : enable;
    return `Apa Anda yakin ingin ${action} ${this.itemName.toLowerCase()} '${item[this.nameField]}'?`;
  }
  async _toggleField(toggleName, item, enabled) {
    if (enabled === void 0 || enabled === null)
      enabled = !item.enabled;
    return await this.setField(toggleName, item, enabled);
  }
  _showError(error) {
    throw error;
  }
  deleteConfirmText(item) {
    return this._deleteConfirmText(item);
  }
  async askDelete(item, ask) {
    return await this._askDelete(item, ask);
  }
  async deleteItem(item, releaseBusy = true) {
    return await this._deleteItem(item, releaseBusy);
  }
  async mounted() {
    return await this._mounted();
  }
  async fetch(releaseBusy = true) {
    return await this._fetch(releaseBusy = true);
  }
  setNameConfirmText(item, newValue) {
    return this._setNameConfirmText(item, newValue);
  }
  async setName(item, name) {
    return await this._setName(item, name);
  }
  setFieldConfirmText(fieldName, item, newValue, alias = null) {
    return this._setFieldConfirmText(fieldName, item, newValue, alias);
  }
  async setField(fieldName, item, value, releaseBusy = true) {
    return await this._setField(fieldName, item, value, releaseBusy);
  }
  setEnabledConfirmText(item) {
    return this._setEnabledConfirmText(item);
  }
  async setEnabled(item, enabled) {
    return await this._setEnabled(item, enabled);
  }
  toggleFieldConfirmText(fieldName, disable, enable, item) {
    return this._toggleFieldConfirmText(fieldName, disable, enable, item);
  }
  async toggleField(toggleName, item, enabled) {
    return await this._toggleField(toggleName, item, enabled);
  }
  showError(error) {
    return this._showError(error);
  }
};
BaseCrudViewBase = __decorateClass$6([
  Component({
    name: "BaseCrudViewBase",
    components: {}
  })
], BaseCrudViewBase);
toNative(BaseCrudViewBase);
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
let EditableCell$1 = class EditableCell extends FormBase {
  constructor() {
    super(...arguments);
    __publicField(this, "title");
    __publicField(this, "editText");
    __publicField(this, "cancelText");
    __publicField(this, "saveText");
    __publicField(this, "confirmTextMaker");
    __publicField(this, "changeDetector");
    __publicField(this, "confirmDialog", false);
    __publicField(this, "editing", false);
    __publicField(this, "edit");
    __publicField(this, "onEdit");
    __publicField(this, "onFinish");
  }
  emitEdit() {
    return true;
  }
  emitFinish(value) {
    return value;
  }
  async beginEdit() {
    if (this.onEdit)
      await this.onEdit();
    else
      this.emitEdit();
    this.editing = true;
    this.reset();
  }
  async cancelEdit() {
    this.editing = false;
    if (this.onCancel)
      await this.onCancel();
    else
      this.emitCancel();
    this.reset();
  }
  async finishEdit(ask = null) {
    this.validate();
    if (!this.valid) return;
    if (this.changeDetector && !this.changeDetector()) {
      await this.cancelEdit();
      return;
    }
    if (!this.confirmTextMaker || !ask) {
      await this.onConfirm();
      return;
    }
    await ask(this.onConfirm);
  }
  async onConfirm() {
    let form = this.myForm.$el;
    let formData = Object.fromEntries(new FormData(form).entries());
    if (this.onFinish)
      await this.onFinish(formData);
    else
      this.emitFinish(formData);
    this.editing = false;
  }
};
__decorateClass$5([
  decorator({ type: String })
], EditableCell$1.prototype, "title", 2);
__decorateClass$5([
  decorator({ type: String, default: "Ubah" })
], EditableCell$1.prototype, "editText", 2);
__decorateClass$5([
  decorator({ type: String, default: "Batal" })
], EditableCell$1.prototype, "cancelText", 2);
__decorateClass$5([
  decorator({ type: String, default: "Simpan" })
], EditableCell$1.prototype, "saveText", 2);
__decorateClass$5([
  decorator({ type: [String, Function] })
], EditableCell$1.prototype, "confirmTextMaker", 2);
__decorateClass$5([
  decorator({ type: Function })
], EditableCell$1.prototype, "changeDetector", 2);
__decorateClass$5([
  decorator$3({ name: "change", default: false })
], EditableCell$1.prototype, "edit", 2);
__decorateClass$5([
  decorator({ type: Function })
], EditableCell$1.prototype, "onEdit", 2);
__decorateClass$5([
  decorator({ type: Function })
], EditableCell$1.prototype, "onFinish", 2);
__decorateClass$5([
  decorator$2("edit")
], EditableCell$1.prototype, "emitEdit", 1);
__decorateClass$5([
  decorator$2("finish")
], EditableCell$1.prototype, "emitFinish", 1);
EditableCell$1 = __decorateClass$5([
  Component({
    name: "EditableCell",
    components: {
      ConfirmationSlot: ConfirmationSlot2
    },
    emits: ["edit", "finish"]
  })
], EditableCell$1);
const _sfc_main$3 = toNative(EditableCell$1);
const _hoisted_1$1 = {
  key: 0,
  class: "d-flex align-left justify-space-between"
};
const _hoisted_2 = { class: "font-weight-bold" };
const _hoisted_3 = { class: "d-flex align-center justify-space-between" };
const _hoisted_4 = { class: "flex-grow-1" };
const _hoisted_5 = {
  key: 0,
  class: "flex-grow-0 flex-shrink-0"
};
const _hoisted_6 = { key: 0 };
const _hoisted_7 = { key: 1 };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ConfirmationSlot = resolveComponent("ConfirmationSlot");
  return openBlock(), createBlock(_component_ConfirmationSlot, {
    confirmTextMaker: _ctx.confirmTextMaker,
    "on-confirm": _ctx.onConfirm,
    class: "d-flex flex-grow-1"
  }, {
    default: withCtx(({ ask }) => [
      createVNode(VForm, {
        class: "flex-grow-1",
        ref: "myForm",
        onSubmit: withModifiers(($event) => _ctx.finishEdit(ask), ["prevent", "stop"]),
        modelValue: _ctx.valid,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.valid = $event),
        disabled: _ctx.busy
      }, {
        default: withCtx(() => [
          _ctx.title ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
            createBaseVNode("span", _hoisted_2, toDisplayString(_ctx.title), 1)
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("span", _hoisted_4, [
              _ctx.editing && !(_ctx.disabled || _ctx.busy) ? renderSlot(_ctx.$slots, "editing", {
                key: 0,
                readonly: _ctx.disabled || _ctx.busy || !_ctx.editing,
                disabled: _ctx.disabled || _ctx.busy || !_ctx.editing,
                editing: _ctx.editing
              }) : renderSlot(_ctx.$slots, "default", { key: 1 })
            ]),
            !(_ctx.disabled || _ctx.busy) ? (openBlock(), createElementBlock("span", _hoisted_5, [
              _ctx.editing ? (openBlock(), createElementBlock("span", _hoisted_6, [
                createVNode(VTooltip, {
                  bottom: "",
                  key: "submit"
                }, {
                  activator: withCtx(({ props }) => [
                    createVNode(VBtn, mergeProps({
                      icon: "",
                      type: "submit"
                    }, props, { disabled: _ctx.busy }), {
                      default: withCtx(() => [
                        createVNode(VIcon, {
                          size: "32",
                          small: ""
                        }, {
                          default: withCtx(() => _cache[1] || (_cache[1] = [
                            createTextVNode("mdi-check")
                          ])),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1040, ["disabled"])
                  ]),
                  default: withCtx(() => [
                    createBaseVNode("span", null, toDisplayString(_ctx.saveText), 1)
                  ]),
                  _: 1
                }),
                createVNode(VTooltip, {
                  bottom: "",
                  key: "cancel"
                }, {
                  activator: withCtx(({ props }) => [
                    createVNode(VBtn, mergeProps({
                      icon: "",
                      onClick: withModifiers(_ctx.cancelEdit, ["stop"])
                    }, props, { disabled: _ctx.busy }), {
                      default: withCtx(() => [
                        createVNode(VIcon, {
                          size: "32",
                          small: ""
                        }, {
                          default: withCtx(() => _cache[2] || (_cache[2] = [
                            createTextVNode("mdi-cancel")
                          ])),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1040, ["onClick", "disabled"])
                  ]),
                  default: withCtx(() => [
                    createBaseVNode("span", null, toDisplayString(_ctx.cancelText), 1)
                  ]),
                  _: 1
                })
              ])) : (openBlock(), createElementBlock("span", _hoisted_7, [
                createVNode(VTooltip, {
                  bottom: "",
                  key: "edit"
                }, {
                  activator: withCtx(({ props }) => [
                    createVNode(VBtn, mergeProps({
                      icon: "",
                      onClick: withModifiers(_ctx.beginEdit, ["stop"])
                    }, props, { disabled: _ctx.busy }), {
                      default: withCtx(() => [
                        createVNode(VIcon, {
                          size: "32",
                          small: ""
                        }, {
                          default: withCtx(() => _cache[3] || (_cache[3] = [
                            createTextVNode("mdi-pencil")
                          ])),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1040, ["onClick", "disabled"])
                  ]),
                  default: withCtx(() => [
                    createBaseVNode("span", null, toDisplayString(_ctx.editText), 1)
                  ]),
                  _: 1
                })
              ]))
            ])) : createCommentVNode("", true)
          ])
        ]),
        _: 2
      }, 1032, ["onSubmit", "modelValue", "disabled"])
    ]),
    _: 3
  }, 8, ["confirmTextMaker", "on-confirm"]);
}
const EditableCell2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
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
let EditableCellBase = class extends WorkingComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "title");
    __publicField(this, "label");
    __publicField(this, "name");
    __publicField(this, "value");
    __publicField(this, "confirmTextMaker");
    __publicField(this, "disabled");
    __publicField(this, "onFinish");
    __publicField(this, "valueEdit", "");
  }
  finish() {
    this.emitChange(this.valueEdit);
    if (this.onFinish) {
      this.busy = true;
      this.onFinish(this.valueEdit, this.releaseBusy);
      this.busy = false;
    } else {
      this.$emit("finish", this.valueEdit, this.releaseBusy);
    }
  }
  emitChange(value) {
    return value;
  }
  emitFinish(value) {
    return value;
  }
};
__decorateClass$4([
  decorator({ type: String })
], EditableCellBase.prototype, "title", 2);
__decorateClass$4([
  decorator({ type: String })
], EditableCellBase.prototype, "label", 2);
__decorateClass$4([
  decorator({ type: String })
], EditableCellBase.prototype, "name", 2);
__decorateClass$4([
  decorator({ type: [String, Object] })
], EditableCellBase.prototype, "value", 2);
__decorateClass$4([
  decorator({ type: [String, Function] })
], EditableCellBase.prototype, "confirmTextMaker", 2);
__decorateClass$4([
  decorator({ default: false })
], EditableCellBase.prototype, "disabled", 2);
__decorateClass$4([
  decorator({ type: Function })
], EditableCellBase.prototype, "onFinish", 2);
__decorateClass$4([
  decorator$2("change")
], EditableCellBase.prototype, "emitChange", 1);
__decorateClass$4([
  decorator$2("finish")
], EditableCellBase.prototype, "emitFinish", 1);
EditableCellBase = __decorateClass$4([
  Component({
    name: "EditableCellBase",
    components: {
      EditableCell: EditableCell2
    }
  })
], EditableCellBase);
toNative(EditableCellBase);
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
let EditableCellTextField$1 = class EditableCellTextField extends EditableCellBase {
  constructor() {
    super(...arguments);
    __publicField(this, "type");
    __publicField(this, "counter");
    __publicField(this, "rules");
    __publicField(this, "required");
  }
};
__decorateClass$3([
  decorator({ type: String })
], EditableCellTextField$1.prototype, "type", 2);
__decorateClass$3([
  decorator({ type: Number })
], EditableCellTextField$1.prototype, "counter", 2);
__decorateClass$3([
  decorator({ type: [Function, Array] })
], EditableCellTextField$1.prototype, "rules", 2);
__decorateClass$3([
  decorator({ default: true })
], EditableCellTextField$1.prototype, "required", 2);
EditableCellTextField$1 = __decorateClass$3([
  Component({
    name: "EditableCellTextField",
    components: {
      EditableCell: EditableCell2
    }
  })
], EditableCellTextField$1);
const _sfc_main$2 = toNative(EditableCellTextField$1);
const _hoisted_1 = { class: "bigger-input" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_EditableCell = resolveComponent("EditableCell");
  return openBlock(), createBlock(_component_EditableCell, {
    "on-reset": () => _ctx.valueEdit = _ctx.value,
    "on-finish": _ctx.finish,
    "change-detector": () => _ctx.value != _ctx.valueEdit,
    "confirm-text-maker": () => _ctx.confirmTextMaker(_ctx.valueEdit),
    "parent-busy": _ctx.busy,
    disabled: _ctx.disabled,
    title: _ctx.title
  }, {
    editing: withCtx(() => [
      createVNode(VTextField, {
        class: "bigger-input",
        name: _ctx.name,
        modelValue: _ctx.valueEdit,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.valueEdit = $event),
        rules: _ctx.rules,
        counter: _ctx.counter,
        type: _ctx.type,
        disabled: _ctx.busy || _ctx.disabled,
        required: _ctx.required,
        label: _ctx.label
      }, null, 8, ["name", "modelValue", "rules", "counter", "type", "disabled", "required", "label"])
    ]),
    default: withCtx(() => [
      createBaseVNode("span", _hoisted_1, toDisplayString(_ctx.value), 1)
    ]),
    _: 1
  }, 8, ["on-reset", "on-finish", "change-detector", "confirm-text-maker", "parent-busy", "disabled", "title"]);
}
const EditableCellTextField2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
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
let ConfirmationIconButton$1 = class ConfirmationIconButton extends WorkingComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "size");
    __publicField(this, "small");
    __publicField(this, "icon");
    __publicField(this, "text");
    __publicField(this, "confirmTextMaker");
    __publicField(this, "ask");
    __publicField(this, "onConfirm");
    __publicField(this, "disabled");
    __publicField(this, "item");
  }
  tryAsk(ask) {
    if (this.ask) {
      this.ask(ask);
    } else {
      ask();
    }
  }
};
__decorateClass$2([
  decorator({ default: 32 })
], ConfirmationIconButton$1.prototype, "size", 2);
__decorateClass$2([
  decorator({ default: true })
], ConfirmationIconButton$1.prototype, "small", 2);
__decorateClass$2([
  decorator({ type: String })
], ConfirmationIconButton$1.prototype, "icon", 2);
__decorateClass$2([
  decorator({ type: String })
], ConfirmationIconButton$1.prototype, "text", 2);
__decorateClass$2([
  decorator({ type: [String, Function] })
], ConfirmationIconButton$1.prototype, "confirmTextMaker", 2);
__decorateClass$2([
  decorator({ type: Function })
], ConfirmationIconButton$1.prototype, "ask", 2);
__decorateClass$2([
  decorator({ type: Function })
], ConfirmationIconButton$1.prototype, "onConfirm", 2);
__decorateClass$2([
  decorator({ default: false })
], ConfirmationIconButton$1.prototype, "disabled", 2);
__decorateClass$2([
  decorator({ default: null })
], ConfirmationIconButton$1.prototype, "item", 2);
ConfirmationIconButton$1 = __decorateClass$2([
  Component({
    name: "ConfirmationIconButton",
    components: {
      ConfirmationSlot: ConfirmationSlot2,
      IconButton: IconButton2
    }
  })
], ConfirmationIconButton$1);
const _sfc_main$1 = toNative(ConfirmationIconButton$1);
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_IconButton = resolveComponent("IconButton");
  const _component_ConfirmationSlot = resolveComponent("ConfirmationSlot");
  return openBlock(), createBlock(_component_ConfirmationSlot, {
    class: "text-center justify-center justify-self-center",
    confirmTextMaker: _ctx.confirmTextMaker,
    "on-confirm": () => _ctx.onConfirm(),
    "parent-busy": _ctx.busy
  }, {
    default: withCtx(({ ask }) => [
      createVNode(_component_IconButton, {
        onClick: withModifiers(($event) => _ctx.tryAsk(ask), ["stop"]),
        disabled: _ctx.busy || _ctx.disabled,
        icon: _ctx.icon,
        text: _ctx.text,
        size: _ctx.size,
        small: _ctx.small
      }, null, 8, ["onClick", "disabled", "icon", "text", "size", "small"])
    ]),
    _: 1
  }, 8, ["confirmTextMaker", "on-confirm", "parent-busy"]);
}
const ConfirmationIconButton2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
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
let ChirpCrudView = class extends BaseCrudViewBase {
  constructor() {
    super(...arguments);
    __publicField(this, "editingChirp", null);
    __publicField(this, "formDialog", false);
  }
  get isSuperAdmin() {
    return true;
  }
  get nameField() {
    return "created_at";
  }
  get itemName() {
    return "Chirp";
  }
  get client() {
    return chirpService;
  }
  get breadcrumbs() {
    return [
      { text: "Beranda", to: { name: "beranda" }, exact: true },
      { text: "Data" },
      { text: "Departemen" }
    ];
  }
  get headers() {
    let headers = [
      { title: "User", value: "user" },
      { title: "Meessage", value: "message" },
      { title: "Created At", value: "created_at" },
      { title: "Actions", value: "actions" }
    ];
    return headers;
  }
  duration(time) {
    return dayjs(time).fromNow();
  }
  async setMessage(chirp, message) {
    const view = this;
    view.busy = true;
    try {
      let res = await chirpService.set_message(chirp, message);
      Object.assign(chirp, res.chirp);
    } catch (error) {
      view.showError(error);
    } finally {
      view.busy = false;
    }
  }
  showForm(chirp = null) {
    this.editingChirp = chirp;
    this.formDialog = true;
  }
};
ChirpCrudView = __decorateClass$1([
  Component({
    name: "ChirpCrudView",
    components: {
      MainCard: MainCard2,
      SyncCheckbox: SyncCheckbox2,
      ChirpFormDialog: ChirpFormDialog2,
      BaseCrudView: BaseCrudView2,
      EditableCellTextField: EditableCellTextField2,
      VDataTable,
      IconButton: IconButton2,
      ConfirmationIconButton: ConfirmationIconButton2
    }
  })
], ChirpCrudView);
toNative(ChirpCrudView);
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
  }
  mounted() {
  }
};
__decorateClass([
  decorator({ type: Array })
], ChirpsPage.prototype, "chirps", 2);
ChirpsPage = __decorateClass([
  Component({
    components: {
      AppLayout,
      ChirpCrudView
    }
  })
], ChirpsPage);
const _sfc_main = toNative(ChirpsPage);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ChirpCrudView = resolveComponent("ChirpCrudView");
  const _component_AppLayout = resolveComponent("AppLayout");
  return openBlock(), createBlock(_component_AppLayout, { title: "Chirps" }, {
    default: withCtx(() => [
      createVNode(VContainer, null, {
        default: withCtx(() => [
          createVNode(_component_ChirpCrudView)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const Index2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Index2 as default
};
//# sourceMappingURL=Index2-qkKjZM-f.js.map
