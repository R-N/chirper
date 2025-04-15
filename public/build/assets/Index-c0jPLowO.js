var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { p as propsFactory, ac as makeThemeProps, Z as omit, l as genericComponent, u as useProxiedModel, ae as provideTheme, n as ref, s as shallowRef, a8 as inject, X as useToggleScope, x as watch, v as onMounted, az as refElement, m as computed, Q as onScopeDispose, e as createVNode, D as mergeProps, z as nextTick, q as watchEffect, b as Component, t as toNative, V as Vue, C, av as api, aA as Wr, a as decorator, _ as _export_sfc, r as resolveComponent, o as openBlock, j as createElementBlock, w as withCtx, h as createTextVNode, c as createBlock, F as Fragment, k as renderList, N as createCommentVNode, g as createBaseVNode, M as toDisplayString } from "./app-DDBQLYRK.js";
import { A as ActionMessage, a as ActionSection, F as FormSection } from "./FormSection-CZo-bzAv.js";
import { I as InputError, e as VAlert } from "./InputError-ytemAFXd.js";
import { h as VuetifyLayoutKey, u as useLayout, a as VCard, d as VCardTitle, e as VCardText, f as VCardActions, g as VDialog, b as VRow, c as VSpacer, V as VContainer } from "./GuestLayout.vue_vue_type_script_lang-2s0GDYYy.js";
import { A as makeLocationProps, B as makePositionProps, o as makeRoundedProps, r as makeVariantProps, x as makeVOverlayProps, F as usePosition, y as useScopeId, H as useVariant, G as useRounded, u as useRender, f as forwardRefs, z as VOverlay, J as genOverlays, K as VProgressLinear, j as VDefaultsProvider, V as VBtn } from "./forwardRefs-B6F8wykm.js";
import { a as VCheckbox } from "./VCheckbox-Igf5GVeL.js";
import { V as VTextField } from "./VTextField-vouJgQdh.js";
import { V as VCol } from "./VCol-BlRM1PkL.js";
import { a as VList, b as VListItem, d as VListItemTitle } from "./VMenu-BESDRVXS.js";
import { A as AppLayout } from "./AppLayout-CCsEuygK.js";
import "./Auth.vue_vue_type_script_lang-BqrvBsHH.js";
import "./AuthenticationCardLogo-D6E1IMSQ.js";
import "./Login-D98toHKk.js";
function useCountdown(milliseconds) {
  const time = shallowRef(milliseconds());
  let timer = -1;
  function clear() {
    clearInterval(timer);
  }
  function reset() {
    clear();
    nextTick(() => time.value = milliseconds());
  }
  function start(el) {
    const style = el ? getComputedStyle(el) : {
      transitionDuration: 0.2
    };
    const interval = parseFloat(style.transitionDuration) * 1e3 || 200;
    clear();
    if (time.value <= 0) return;
    const startTime = performance.now();
    timer = window.setInterval(() => {
      const elapsed = performance.now() - startTime + interval;
      time.value = Math.max(milliseconds() - elapsed, 0);
      if (time.value <= 0) clear();
    }, interval);
  }
  onScopeDispose(clear);
  return {
    clear,
    time,
    start,
    reset
  };
}
const makeVSnackbarProps = propsFactory({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...makeLocationProps({
    location: "bottom"
  }),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeVariantProps(),
  ...makeThemeProps(),
  ...omit(makeVOverlayProps({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
}, "VSnackbar");
const VSnackbar = genericComponent()({
  name: "VSnackbar",
  props: makeVSnackbarProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      positionClasses
    } = usePosition(props);
    const {
      scopeId
    } = useScopeId();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      roundedClasses
    } = useRounded(props);
    const countdown = useCountdown(() => Number(props.timeout));
    const overlay = ref();
    const timerRef = ref();
    const isHovering = shallowRef(false);
    const startY = shallowRef(0);
    const mainStyles = ref();
    const hasLayout = inject(VuetifyLayoutKey, void 0);
    useToggleScope(() => !!hasLayout, () => {
      const layout = useLayout();
      watchEffect(() => {
        mainStyles.value = layout.mainStyles.value;
      });
    });
    watch(isActive, startTimeout);
    watch(() => props.timeout, startTimeout);
    onMounted(() => {
      if (isActive.value) startTimeout();
    });
    let activeTimeout = -1;
    function startTimeout() {
      countdown.reset();
      window.clearTimeout(activeTimeout);
      const timeout = Number(props.timeout);
      if (!isActive.value || timeout === -1) return;
      const element = refElement(timerRef.value);
      countdown.start(element);
      activeTimeout = window.setTimeout(() => {
        isActive.value = false;
      }, timeout);
    }
    function clearTimeout() {
      countdown.reset();
      window.clearTimeout(activeTimeout);
    }
    function onPointerenter() {
      isHovering.value = true;
      clearTimeout();
    }
    function onPointerleave() {
      isHovering.value = false;
      startTimeout();
    }
    function onTouchstart(event) {
      startY.value = event.touches[0].clientY;
    }
    function onTouchend(event) {
      if (Math.abs(startY.value - event.changedTouches[0].clientY) > 50) {
        isActive.value = false;
      }
    }
    function onAfterLeave() {
      if (isHovering.value) onPointerleave();
    }
    const locationClasses = computed(() => {
      return props.location.split(" ").reduce((acc, loc) => {
        acc[`v-snackbar--${loc}`] = true;
        return acc;
      }, {});
    });
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      const hasContent = !!(slots.default || slots.text || props.text);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-snackbar", {
          "v-snackbar--active": isActive.value,
          "v-snackbar--multi-line": props.multiLine && !props.vertical,
          "v-snackbar--timer": !!props.timer,
          "v-snackbar--vertical": props.vertical
        }, locationClasses.value, positionClasses.value, props.class],
        "style": [mainStyles.value, props.style]
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "contentProps": mergeProps({
          class: ["v-snackbar__wrapper", themeClasses.value, colorClasses.value, roundedClasses.value, variantClasses.value],
          style: [colorStyles.value],
          onPointerenter,
          onPointerleave
        }, overlayProps.contentProps),
        "persistent": true,
        "noClickAnimation": true,
        "scrim": false,
        "scrollStrategy": "none",
        "_disableGlobalStack": true,
        "onTouchstartPassive": onTouchstart,
        "onTouchend": onTouchend,
        "onAfterLeave": onAfterLeave
      }, scopeId), {
        default: () => {
          var _a, _b;
          return [genOverlays(false, "v-snackbar"), props.timer && !isHovering.value && createVNode("div", {
            "key": "timer",
            "class": "v-snackbar__timer"
          }, [createVNode(VProgressLinear, {
            "ref": timerRef,
            "color": typeof props.timer === "string" ? props.timer : "info",
            "max": props.timeout,
            "model-value": countdown.time.value
          }, null)]), hasContent && createVNode("div", {
            "key": "content",
            "class": "v-snackbar__content",
            "role": "status",
            "aria-live": "polite"
          }, [((_a = slots.text) == null ? void 0 : _a.call(slots)) ?? props.text, (_b = slots.default) == null ? void 0 : _b.call(slots)]), slots.actions && createVNode(VDefaultsProvider, {
            "defaults": {
              VBtn: {
                variant: "text",
                ripple: false,
                slim: true
              }
            }
          }, {
            default: () => [createVNode("div", {
              "class": "v-snackbar__actions"
            }, [slots.actions({
              isActive
            })])]
          })];
        },
        activator: slots.activator
      });
    });
    return forwardRefs({}, overlay);
  }
});
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
let ApiTokenManagerPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "tokens");
    __publicField(this, "availablePermissions");
    __publicField(this, "defaultPermissions");
    __publicField(this, "createApiTokenForm", C({
      name: "",
      permissions: []
    }));
    __publicField(this, "updateApiTokenForm", C({
      permissions: []
    }));
    __publicField(this, "deleteApiTokenForm", C({}));
    __publicField(this, "displayingToken", false);
    __publicField(this, "managingPermissionsFor", null);
    __publicField(this, "apiTokenBeingDeleted", null);
  }
  mounted() {
    this.createApiTokenForm.permissions = this.defaultPermissions;
  }
  async createApiToken() {
    this.createApiTokenForm.post(route("api-tokens.store"), {
      preserveScroll: true,
      onSuccess: () => {
        this.displayingToken = true;
        this.createApiTokenForm.reset();
      }
    });
  }
  manageApiTokenPermissions(token) {
    this.updateApiTokenForm.permissions = token.abilities;
    this.managingPermissionsFor = token;
  }
  async updateApiToken() {
    this.updateApiTokenForm.put(route("api-tokens.update", this.managingPermissionsFor), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => this.managingPermissionsFor = null
    });
  }
  confirmApiTokenDeletion(token) {
    this.apiTokenBeingDeleted = token;
  }
  async deleteApiToken() {
    await api.delete(route("api-tokens.destroy", this.apiTokenBeingDeleted.id), {
      data: this.deleteApiTokenForm
    });
    this.apiTokenBeingDeleted = null;
    Wr.reload({ preserveScroll: true, preserveState: true });
  }
  get isManagingPermissions() {
    return this.managingPermissionsFor != null;
  }
};
__decorateClass([
  decorator({ type: Array })
], ApiTokenManagerPage.prototype, "tokens", 2);
__decorateClass([
  decorator({ type: Array })
], ApiTokenManagerPage.prototype, "availablePermissions", 2);
__decorateClass([
  decorator({ type: Array })
], ApiTokenManagerPage.prototype, "defaultPermissions", 2);
ApiTokenManagerPage = __decorateClass([
  Component({
    components: {
      ActionMessage,
      ActionSection,
      FormSection,
      InputError,
      VCard,
      VCardTitle,
      VCardText,
      VCardActions,
      VDialog,
      VCheckbox,
      VBtn,
      VTextField,
      VRow,
      VCol,
      VSnackbar
    }
  })
], ApiTokenManagerPage);
const _sfc_main$1 = toNative(ApiTokenManagerPage);
const _hoisted_1$1 = { key: 0 };
const _hoisted_2 = { class: "d-flex align-center" };
const _hoisted_3 = {
  key: 0,
  class: "text-grey-darken-1 text-caption"
};
const _hoisted_4 = { class: "font-mono text-sm break-all" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_InputError = resolveComponent("InputError");
  const _component_InputLabel = resolveComponent("InputLabel");
  const _component_ActionMessage = resolveComponent("ActionMessage");
  const _component_FormSection = resolveComponent("FormSection");
  const _component_ActionSection = resolveComponent("ActionSection");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_FormSection, { onSubmitted: _ctx.createApiToken }, {
      title: withCtx(() => _cache[9] || (_cache[9] = [
        createTextVNode(" Create API Token ")
      ])),
      description: withCtx(() => _cache[10] || (_cache[10] = [
        createTextVNode(" API tokens allow third-party services to authenticate with our application on your behalf. ")
      ])),
      form: withCtx(() => [
        createVNode(VRow, null, {
          default: withCtx(() => [
            createVNode(VCol, {
              cols: "12",
              md: "6"
            }, {
              default: withCtx(() => [
                createVNode(VTextField, {
                  id: "name",
                  modelValue: _ctx.createApiTokenForm.name,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.createApiTokenForm.name = $event),
                  label: "Name",
                  autofocus: "",
                  outlined: "",
                  dense: ""
                }, null, 8, ["modelValue"]),
                createVNode(_component_InputError, {
                  message: _ctx.createApiTokenForm.errors.name,
                  class: "mt-2"
                }, null, 8, ["message"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        _ctx.availablePermissions.length > 0 ? (openBlock(), createBlock(VRow, { key: 0 }, {
          default: withCtx(() => [
            createVNode(VCol, { cols: "12" }, {
              default: withCtx(() => [
                createVNode(_component_InputLabel, {
                  for: "permissions",
                  value: "Permissions"
                }),
                createVNode(VRow, { class: "mt-2" }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.availablePermissions, (permission) => {
                      return openBlock(), createBlock(VCol, {
                        key: permission,
                        cols: "12",
                        md: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCheckbox, {
                            modelValue: _ctx.createApiTokenForm.permissions,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.createApiTokenForm.permissions = $event),
                            value: permission,
                            label: permission
                          }, null, 8, ["modelValue", "value", "label"])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
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
      actions: withCtx(() => [
        createVNode(_component_ActionMessage, {
          on: _ctx.createApiTokenForm.recentlySuccessful,
          class: "me-3"
        }, {
          default: withCtx(() => _cache[11] || (_cache[11] = [
            createTextVNode(" Created. ")
          ])),
          _: 1
        }, 8, ["on"]),
        createVNode(VBtn, {
          color: "primary",
          loading: _ctx.createApiTokenForm.processing,
          elevation: "2",
          type: "submit"
        }, {
          default: withCtx(() => _cache[12] || (_cache[12] = [
            createTextVNode(" Create ")
          ])),
          _: 1
        }, 8, ["loading"])
      ]),
      _: 1
    }, 8, ["onSubmitted"]),
    _ctx.tokens.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
      createVNode(_component_ActionSection, null, {
        title: withCtx(() => _cache[13] || (_cache[13] = [
          createTextVNode(" Manage API Tokens ")
        ])),
        description: withCtx(() => _cache[14] || (_cache[14] = [
          createTextVNode(" You may delete any of your existing tokens if they are no longer needed. ")
        ])),
        content: withCtx(() => [
          createVNode(VList, null, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tokens, (token) => {
                return openBlock(), createBlock(VListItem, {
                  key: token.id
                }, {
                  append: withCtx(() => [
                    createBaseVNode("div", _hoisted_2, [
                      token.last_used_ago ? (openBlock(), createElementBlock("span", _hoisted_3, " Last used " + toDisplayString(token.last_used_ago), 1)) : createCommentVNode("", true),
                      _ctx.availablePermissions.length > 0 ? (openBlock(), createBlock(VBtn, {
                        key: 1,
                        text: "",
                        class: "ms-4",
                        onClick: ($event) => _ctx.manageApiTokenPermissions(token)
                      }, {
                        default: withCtx(() => _cache[15] || (_cache[15] = [
                          createTextVNode(" Permissions ")
                        ])),
                        _: 2
                      }, 1032, ["onClick"])) : createCommentVNode("", true),
                      createVNode(VBtn, {
                        text: "",
                        color: "red",
                        class: "ms-4",
                        onClick: ($event) => _ctx.confirmApiTokenDeletion(token)
                      }, {
                        default: withCtx(() => _cache[16] || (_cache[16] = [
                          createTextVNode(" Delete ")
                        ])),
                        _: 2
                      }, 1032, ["onClick"])
                    ])
                  ]),
                  default: withCtx(() => [
                    createVNode(VListItemTitle, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(token.name), 1)
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
      })
    ])) : createCommentVNode("", true),
    createVNode(VDialog, {
      modelValue: _ctx.displayingToken,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.displayingToken = $event),
      "max-width": "500"
    }, {
      default: withCtx(() => [
        createVNode(VCard, null, {
          default: withCtx(() => [
            createVNode(VCardTitle, null, {
              default: withCtx(() => _cache[17] || (_cache[17] = [
                createTextVNode("API Token")
              ])),
              _: 1
            }),
            createVNode(VCardText, null, {
              default: withCtx(() => [
                _cache[18] || (_cache[18] = createBaseVNode("p", null, "Please copy your new API token. For your security, it won't be shown again.", -1)),
                _ctx.$page.props.jetstream.flash.token ? (openBlock(), createBlock(VAlert, {
                  key: 0,
                  class: "mt-4",
                  density: "compact",
                  variant: "tonal",
                  type: "info"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("span", _hoisted_4, toDisplayString(_ctx.$page.props.jetstream.flash.token), 1)
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            createVNode(VCardActions, null, {
              default: withCtx(() => [
                createVNode(VSpacer),
                createVNode(VBtn, {
                  variant: "outlined",
                  onClick: _cache[2] || (_cache[2] = ($event) => _ctx.displayingToken = false)
                }, {
                  default: withCtx(() => _cache[19] || (_cache[19] = [
                    createTextVNode("Close")
                  ])),
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
    }, 8, ["modelValue"]),
    createVNode(VDialog, {
      modelValue: _ctx.isManagingPermissions,
      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.isManagingPermissions = $event),
      persistent: "",
      "max-width": "500px"
    }, {
      default: withCtx(() => [
        createVNode(VCard, null, {
          default: withCtx(() => [
            createVNode(VCardTitle, null, {
              default: withCtx(() => _cache[20] || (_cache[20] = [
                createTextVNode(" API Token Permissions ")
              ])),
              _: 1
            }),
            createVNode(VCardText, null, {
              default: withCtx(() => [
                createVNode(VContainer, null, {
                  default: withCtx(() => [
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.availablePermissions, (permission) => {
                          return openBlock(), createBlock(VCol, {
                            key: permission,
                            cols: "12",
                            md: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCheckbox, {
                                modelValue: _ctx.updateApiTokenForm.permissions,
                                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.updateApiTokenForm.permissions = $event),
                                label: permission,
                                value: permission
                              }, null, 8, ["modelValue", "label", "value"])
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(VCardActions, null, {
              default: withCtx(() => [
                createVNode(VSpacer),
                createVNode(VBtn, {
                  variant: "outlined",
                  onClick: _cache[5] || (_cache[5] = ($event) => _ctx.managingPermissionsFor = null)
                }, {
                  default: withCtx(() => _cache[21] || (_cache[21] = [
                    createTextVNode(" Cancel ")
                  ])),
                  _: 1
                }),
                createVNode(VBtn, {
                  color: "primary",
                  loading: _ctx.updateApiTokenForm.processing,
                  onClick: _ctx.updateApiToken
                }, {
                  default: withCtx(() => _cache[22] || (_cache[22] = [
                    createTextVNode(" Save ")
                  ])),
                  _: 1
                }, 8, ["loading", "onClick"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"]),
    createVNode(VDialog, {
      modelValue: _ctx.apiTokenBeingDeleted,
      "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.apiTokenBeingDeleted = $event),
      "max-width": "500"
    }, {
      default: withCtx(() => [
        createVNode(VCard, null, {
          default: withCtx(() => [
            createVNode(VCardTitle, null, {
              default: withCtx(() => _cache[23] || (_cache[23] = [
                createTextVNode("Delete API Token")
              ])),
              _: 1
            }),
            createVNode(VCardText, null, {
              default: withCtx(() => _cache[24] || (_cache[24] = [
                createTextVNode("Are you sure you would like to delete this API token?")
              ])),
              _: 1
            }),
            createVNode(VCardActions, { class: "justify-end" }, {
              default: withCtx(() => [
                createVNode(VBtn, {
                  variant: "outlined",
                  onClick: _cache[7] || (_cache[7] = ($event) => _ctx.apiTokenBeingDeleted = null)
                }, {
                  default: withCtx(() => _cache[25] || (_cache[25] = [
                    createTextVNode(" Cancel ")
                  ])),
                  _: 1
                }),
                createVNode(VBtn, {
                  color: "error",
                  class: "ms-3",
                  loading: _ctx.deleteApiTokenForm.processing,
                  onClick: _ctx.deleteApiToken
                }, {
                  default: withCtx(() => _cache[26] || (_cache[26] = [
                    createTextVNode(" Delete ")
                  ])),
                  _: 1
                }, 8, ["loading", "onClick"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"])
  ]);
}
const ApiTokenManager = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
const _hoisted_1 = { class: "max-w-7xl mx-auto py-10 sm:px-6 lg:px-8" };
const _sfc_main = {
  __name: "Index",
  props: {
    tokens: Array,
    availablePermissions: Array,
    defaultPermissions: Array
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(AppLayout, { title: "API Tokens" }, {
        header: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("h2", { class: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight" }, " API Tokens ", -1)
        ])),
        default: withCtx(() => [
          createBaseVNode("div", null, [
            createBaseVNode("div", _hoisted_1, [
              createVNode(ApiTokenManager, {
                tokens: __props.tokens,
                "available-permissions": __props.availablePermissions,
                "default-permissions": __props.defaultPermissions
              }, null, 8, ["tokens", "available-permissions", "default-permissions"])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Index-c0jPLowO.js.map
