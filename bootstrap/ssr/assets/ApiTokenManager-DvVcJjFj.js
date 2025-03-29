var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { useForm, router } from "@inertiajs/vue3";
import { A as ActionMessage } from "./ActionMessage-DD3vNYCh.js";
import { A as ActionSection } from "./ActionSection-DEAOgt0M.js";
import { F as FormSection } from "./FormSection-ChOV8bZ-.js";
import { I as InputError } from "./InputError-BGOWAPan.js";
import { VCard, VCardTitle, VCardText, VCardActions, VDialog, VCheckbox, VBtn, VTextField, VRow, VCol, VSnackbar } from "vuetify/components";
import { a as api, _ as _export_sfc } from "./axios-D4gWzKUO.js";
import { toNative, Vue, Prop, Component } from "vue-facing-decorator";
import { resolveComponent, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { VAlert } from "vuetify/lib/components/VAlert/index.mjs";
import { VBtn as VBtn$1 } from "vuetify/lib/components/VBtn/index.mjs";
import { VCard as VCard$1, VCardTitle as VCardTitle$1, VCardText as VCardText$1, VCardActions as VCardActions$1 } from "vuetify/lib/components/VCard/index.mjs";
import { VCheckbox as VCheckbox$1 } from "vuetify/lib/components/VCheckbox/index.mjs";
import { VDialog as VDialog$1 } from "vuetify/lib/components/VDialog/index.mjs";
import { VRow as VRow$1, VCol as VCol$1, VSpacer, VContainer } from "vuetify/lib/components/VGrid/index.mjs";
import { VList, VListItem, VListItemTitle } from "vuetify/lib/components/VList/index.mjs";
import { VTextField as VTextField$1 } from "vuetify/lib/components/VTextField/index.mjs";
import "vuetify/lib/components/transitions/index.mjs";
import "./SectionTitle-KsAagkYm.js";
import "axios";
import "js-cookie";
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp2(target, key, result);
  return result;
};
let ApiTokenManagerPage = class extends Vue {
  constructor() {
    super(...arguments);
    __publicField(this, "tokens");
    __publicField(this, "availablePermissions");
    __publicField(this, "defaultPermissions");
    __publicField(this, "createApiTokenForm", useForm({
      name: "",
      permissions: []
    }));
    __publicField(this, "updateApiTokenForm", useForm({
      permissions: []
    }));
    __publicField(this, "deleteApiTokenForm", useForm({}));
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
    router.reload({ preserveScroll: true, preserveState: true });
  }
  get isManagingPermissions() {
    return this.managingPermissionsFor != null;
  }
};
__decorateClass([
  Prop(Array)
], ApiTokenManagerPage.prototype, "tokens", 2);
__decorateClass([
  Prop(Array)
], ApiTokenManagerPage.prototype, "availablePermissions", 2);
__decorateClass([
  Prop(Array)
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
const _sfc_main = toNative(ApiTokenManagerPage);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_FormSection = resolveComponent("FormSection");
  const _component_InputError = resolveComponent("InputError");
  const _component_InputLabel = resolveComponent("InputLabel");
  const _component_ActionMessage = resolveComponent("ActionMessage");
  const _component_ActionSection = resolveComponent("ActionSection");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_FormSection, { onSubmitted: _ctx.createApiToken }, {
    title: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Create API Token `);
      } else {
        return [
          createTextVNode(" Create API Token ")
        ];
      }
    }),
    description: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` API tokens allow third-party services to authenticate with our application on your behalf. `);
      } else {
        return [
          createTextVNode(" API tokens allow third-party services to authenticate with our application on your behalf. ")
        ];
      }
    }),
    form: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VRow$1, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCol$1, {
                cols: "12",
                md: "6"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField$1, {
                      id: "name",
                      modelValue: _ctx.createApiTokenForm.name,
                      "onUpdate:modelValue": ($event) => _ctx.createApiTokenForm.name = $event,
                      label: "Name",
                      autofocus: "",
                      outlined: "",
                      dense: ""
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_InputError, {
                      message: _ctx.createApiTokenForm.errors.name,
                      class: "mt-2"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VTextField$1, {
                        id: "name",
                        modelValue: _ctx.createApiTokenForm.name,
                        "onUpdate:modelValue": ($event) => _ctx.createApiTokenForm.name = $event,
                        label: "Name",
                        autofocus: "",
                        outlined: "",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_InputError, {
                        message: _ctx.createApiTokenForm.errors.name,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCol$1, {
                  cols: "12",
                  md: "6"
                }, {
                  default: withCtx(() => [
                    createVNode(VTextField$1, {
                      id: "name",
                      modelValue: _ctx.createApiTokenForm.name,
                      "onUpdate:modelValue": ($event) => _ctx.createApiTokenForm.name = $event,
                      label: "Name",
                      autofocus: "",
                      outlined: "",
                      dense: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_InputError, {
                      message: _ctx.createApiTokenForm.errors.name,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        if (_ctx.availablePermissions.length > 0) {
          _push2(ssrRenderComponent(VRow$1, null, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(VCol$1, { cols: "12" }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_InputLabel, {
                        for: "permissions",
                        value: "Permissions"
                      }, null, _parent4, _scopeId3));
                      _push4(ssrRenderComponent(VRow$1, { class: "mt-2" }, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<!--[-->`);
                            ssrRenderList(_ctx.availablePermissions, (permission) => {
                              _push5(ssrRenderComponent(VCol$1, {
                                key: permission,
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCheckbox$1, {
                                      modelValue: _ctx.createApiTokenForm.permissions,
                                      "onUpdate:modelValue": ($event) => _ctx.createApiTokenForm.permissions = $event,
                                      value: permission,
                                      label: permission
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCheckbox$1, {
                                        modelValue: _ctx.createApiTokenForm.permissions,
                                        "onUpdate:modelValue": ($event) => _ctx.createApiTokenForm.permissions = $event,
                                        value: permission,
                                        label: permission
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            });
                            _push5(`<!--]-->`);
                          } else {
                            return [
                              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.availablePermissions, (permission) => {
                                return openBlock(), createBlock(VCol$1, {
                                  key: permission,
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCheckbox$1, {
                                      modelValue: _ctx.createApiTokenForm.permissions,
                                      "onUpdate:modelValue": ($event) => _ctx.createApiTokenForm.permissions = $event,
                                      value: permission,
                                      label: permission
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label"])
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_InputLabel, {
                          for: "permissions",
                          value: "Permissions"
                        }),
                        createVNode(VRow$1, { class: "mt-2" }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.availablePermissions, (permission) => {
                              return openBlock(), createBlock(VCol$1, {
                                key: permission,
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCheckbox$1, {
                                    modelValue: _ctx.createApiTokenForm.permissions,
                                    "onUpdate:modelValue": ($event) => _ctx.createApiTokenForm.permissions = $event,
                                    value: permission,
                                    label: permission
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label"])
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                return [
                  createVNode(VCol$1, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(_component_InputLabel, {
                        for: "permissions",
                        value: "Permissions"
                      }),
                      createVNode(VRow$1, { class: "mt-2" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.availablePermissions, (permission) => {
                            return openBlock(), createBlock(VCol$1, {
                              key: permission,
                              cols: "12",
                              md: "6"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCheckbox$1, {
                                  modelValue: _ctx.createApiTokenForm.permissions,
                                  "onUpdate:modelValue": ($event) => _ctx.createApiTokenForm.permissions = $event,
                                  value: permission,
                                  label: permission
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label"])
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
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          createVNode(VRow$1, null, {
            default: withCtx(() => [
              createVNode(VCol$1, {
                cols: "12",
                md: "6"
              }, {
                default: withCtx(() => [
                  createVNode(VTextField$1, {
                    id: "name",
                    modelValue: _ctx.createApiTokenForm.name,
                    "onUpdate:modelValue": ($event) => _ctx.createApiTokenForm.name = $event,
                    label: "Name",
                    autofocus: "",
                    outlined: "",
                    dense: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
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
          _ctx.availablePermissions.length > 0 ? (openBlock(), createBlock(VRow$1, { key: 0 }, {
            default: withCtx(() => [
              createVNode(VCol$1, { cols: "12" }, {
                default: withCtx(() => [
                  createVNode(_component_InputLabel, {
                    for: "permissions",
                    value: "Permissions"
                  }),
                  createVNode(VRow$1, { class: "mt-2" }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.availablePermissions, (permission) => {
                        return openBlock(), createBlock(VCol$1, {
                          key: permission,
                          cols: "12",
                          md: "6"
                        }, {
                          default: withCtx(() => [
                            createVNode(VCheckbox$1, {
                              modelValue: _ctx.createApiTokenForm.permissions,
                              "onUpdate:modelValue": ($event) => _ctx.createApiTokenForm.permissions = $event,
                              value: permission,
                              label: permission
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label"])
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
        ];
      }
    }),
    actions: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_ActionMessage, {
          on: _ctx.createApiTokenForm.recentlySuccessful,
          class: "me-3"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Created. `);
            } else {
              return [
                createTextVNode(" Created. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VBtn$1, {
          color: "primary",
          loading: _ctx.createApiTokenForm.processing,
          elevation: "2",
          type: "submit"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Create `);
            } else {
              return [
                createTextVNode(" Create ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_ActionMessage, {
            on: _ctx.createApiTokenForm.recentlySuccessful,
            class: "me-3"
          }, {
            default: withCtx(() => [
              createTextVNode(" Created. ")
            ]),
            _: 1
          }, 8, ["on"]),
          createVNode(VBtn$1, {
            color: "primary",
            loading: _ctx.createApiTokenForm.processing,
            elevation: "2",
            type: "submit"
          }, {
            default: withCtx(() => [
              createTextVNode(" Create ")
            ]),
            _: 1
          }, 8, ["loading"])
        ];
      }
    }),
    _: 1
  }, _parent));
  if (_ctx.tokens.length > 0) {
    _push(`<div>`);
    _push(ssrRenderComponent(_component_ActionSection, null, {
      title: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(` Manage API Tokens `);
        } else {
          return [
            createTextVNode(" Manage API Tokens ")
          ];
        }
      }),
      description: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(` You may delete any of your existing tokens if they are no longer needed. `);
        } else {
          return [
            createTextVNode(" You may delete any of your existing tokens if they are no longer needed. ")
          ];
        }
      }),
      content: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(ssrRenderComponent(VList, null, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<!--[-->`);
                ssrRenderList(_ctx.tokens, (token) => {
                  _push3(ssrRenderComponent(VListItem, {
                    key: token.id
                  }, {
                    append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="d-flex align-center"${_scopeId3}>`);
                        if (token.last_used_ago) {
                          _push4(`<span class="text-grey-darken-1 text-caption"${_scopeId3}> Last used ${ssrInterpolate(token.last_used_ago)}</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (_ctx.availablePermissions.length > 0) {
                          _push4(ssrRenderComponent(VBtn$1, {
                            text: "",
                            class: "ms-4",
                            onClick: ($event) => _ctx.manageApiTokenPermissions(token)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Permissions `);
                              } else {
                                return [
                                  createTextVNode(" Permissions ")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(VBtn$1, {
                          text: "",
                          color: "red",
                          class: "ms-4",
                          onClick: ($event) => _ctx.confirmApiTokenDeletion(token)
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Delete `);
                            } else {
                              return [
                                createTextVNode(" Delete ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "d-flex align-center" }, [
                            token.last_used_ago ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-grey-darken-1 text-caption"
                            }, " Last used " + toDisplayString(token.last_used_ago), 1)) : createCommentVNode("", true),
                            _ctx.availablePermissions.length > 0 ? (openBlock(), createBlock(VBtn$1, {
                              key: 1,
                              text: "",
                              class: "ms-4",
                              onClick: ($event) => _ctx.manageApiTokenPermissions(token)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Permissions ")
                              ]),
                              _: 2
                            }, 1032, ["onClick"])) : createCommentVNode("", true),
                            createVNode(VBtn$1, {
                              text: "",
                              color: "red",
                              class: "ms-4",
                              onClick: ($event) => _ctx.confirmApiTokenDeletion(token)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Delete ")
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ])
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VListItemTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(token.name)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(token.name), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VListItemTitle, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(token.name), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                });
                _push3(`<!--]-->`);
              } else {
                return [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.tokens, (token) => {
                    return openBlock(), createBlock(VListItem, {
                      key: token.id
                    }, {
                      append: withCtx(() => [
                        createVNode("div", { class: "d-flex align-center" }, [
                          token.last_used_ago ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-grey-darken-1 text-caption"
                          }, " Last used " + toDisplayString(token.last_used_ago), 1)) : createCommentVNode("", true),
                          _ctx.availablePermissions.length > 0 ? (openBlock(), createBlock(VBtn$1, {
                            key: 1,
                            text: "",
                            class: "ms-4",
                            onClick: ($event) => _ctx.manageApiTokenPermissions(token)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Permissions ")
                            ]),
                            _: 2
                          }, 1032, ["onClick"])) : createCommentVNode("", true),
                          createVNode(VBtn$1, {
                            text: "",
                            color: "red",
                            class: "ms-4",
                            onClick: ($event) => _ctx.confirmApiTokenDeletion(token)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Delete ")
                            ]),
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
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
        } else {
          return [
            createVNode(VList, null, {
              default: withCtx(() => [
                (openBlock(true), createBlock(Fragment, null, renderList(_ctx.tokens, (token) => {
                  return openBlock(), createBlock(VListItem, {
                    key: token.id
                  }, {
                    append: withCtx(() => [
                      createVNode("div", { class: "d-flex align-center" }, [
                        token.last_used_ago ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-grey-darken-1 text-caption"
                        }, " Last used " + toDisplayString(token.last_used_ago), 1)) : createCommentVNode("", true),
                        _ctx.availablePermissions.length > 0 ? (openBlock(), createBlock(VBtn$1, {
                          key: 1,
                          text: "",
                          class: "ms-4",
                          onClick: ($event) => _ctx.manageApiTokenPermissions(token)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Permissions ")
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : createCommentVNode("", true),
                        createVNode(VBtn$1, {
                          text: "",
                          color: "red",
                          class: "ms-4",
                          onClick: ($event) => _ctx.confirmApiTokenDeletion(token)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Delete ")
                          ]),
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
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(ssrRenderComponent(VDialog$1, {
    modelValue: _ctx.displayingToken,
    "onUpdate:modelValue": ($event) => _ctx.displayingToken = $event,
    "max-width": "500"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCard$1, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCardTitle$1, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`API Token`);
                  } else {
                    return [
                      createTextVNode("API Token")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardText$1, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<p${_scopeId3}>Please copy your new API token. For your security, it won&#39;t be shown again.</p>`);
                    if (_ctx.$page.props.jetstream.flash.token) {
                      _push4(ssrRenderComponent(VAlert, {
                        class: "mt-4",
                        density: "compact",
                        variant: "tonal",
                        type: "info"
                      }, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<span class="font-mono text-sm break-all"${_scopeId4}>${ssrInterpolate(_ctx.$page.props.jetstream.flash.token)}</span>`);
                          } else {
                            return [
                              createVNode("span", { class: "font-mono text-sm break-all" }, toDisplayString(_ctx.$page.props.jetstream.flash.token), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                    } else {
                      _push4(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode("p", null, "Please copy your new API token. For your security, it won't be shown again."),
                      _ctx.$page.props.jetstream.flash.token ? (openBlock(), createBlock(VAlert, {
                        key: 0,
                        class: "mt-4",
                        density: "compact",
                        variant: "tonal",
                        type: "info"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "font-mono text-sm break-all" }, toDisplayString(_ctx.$page.props.jetstream.flash.token), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardActions$1, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VBtn$1, {
                      variant: "outlined",
                      onClick: ($event) => _ctx.displayingToken = false
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Close`);
                        } else {
                          return [
                            createTextVNode("Close")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VSpacer),
                      createVNode(VBtn$1, {
                        variant: "outlined",
                        onClick: ($event) => _ctx.displayingToken = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Close")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCardTitle$1, null, {
                  default: withCtx(() => [
                    createTextVNode("API Token")
                  ]),
                  _: 1
                }),
                createVNode(VCardText$1, null, {
                  default: withCtx(() => [
                    createVNode("p", null, "Please copy your new API token. For your security, it won't be shown again."),
                    _ctx.$page.props.jetstream.flash.token ? (openBlock(), createBlock(VAlert, {
                      key: 0,
                      class: "mt-4",
                      density: "compact",
                      variant: "tonal",
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "font-mono text-sm break-all" }, toDisplayString(_ctx.$page.props.jetstream.flash.token), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode(VCardActions$1, null, {
                  default: withCtx(() => [
                    createVNode(VSpacer),
                    createVNode(VBtn$1, {
                      variant: "outlined",
                      onClick: ($event) => _ctx.displayingToken = false
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Close")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VCard$1, null, {
            default: withCtx(() => [
              createVNode(VCardTitle$1, null, {
                default: withCtx(() => [
                  createTextVNode("API Token")
                ]),
                _: 1
              }),
              createVNode(VCardText$1, null, {
                default: withCtx(() => [
                  createVNode("p", null, "Please copy your new API token. For your security, it won't be shown again."),
                  _ctx.$page.props.jetstream.flash.token ? (openBlock(), createBlock(VAlert, {
                    key: 0,
                    class: "mt-4",
                    density: "compact",
                    variant: "tonal",
                    type: "info"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "font-mono text-sm break-all" }, toDisplayString(_ctx.$page.props.jetstream.flash.token), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(VCardActions$1, null, {
                default: withCtx(() => [
                  createVNode(VSpacer),
                  createVNode(VBtn$1, {
                    variant: "outlined",
                    onClick: ($event) => _ctx.displayingToken = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Close")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(VDialog$1, {
    modelValue: _ctx.isManagingPermissions,
    "onUpdate:modelValue": ($event) => _ctx.isManagingPermissions = $event,
    persistent: "",
    "max-width": "500px"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCard$1, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCardTitle$1, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` API Token Permissions `);
                  } else {
                    return [
                      createTextVNode(" API Token Permissions ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardText$1, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VContainer, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VRow$1, null, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`<!--[-->`);
                                ssrRenderList(_ctx.availablePermissions, (permission) => {
                                  _push6(ssrRenderComponent(VCol$1, {
                                    key: permission,
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                      if (_push7) {
                                        _push7(ssrRenderComponent(VCheckbox$1, {
                                          modelValue: _ctx.updateApiTokenForm.permissions,
                                          "onUpdate:modelValue": ($event) => _ctx.updateApiTokenForm.permissions = $event,
                                          label: permission,
                                          value: permission
                                        }, null, _parent7, _scopeId6));
                                      } else {
                                        return [
                                          createVNode(VCheckbox$1, {
                                            modelValue: _ctx.updateApiTokenForm.permissions,
                                            "onUpdate:modelValue": ($event) => _ctx.updateApiTokenForm.permissions = $event,
                                            label: permission,
                                            value: permission
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "value"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent6, _scopeId5));
                                });
                                _push6(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.availablePermissions, (permission) => {
                                    return openBlock(), createBlock(VCol$1, {
                                      key: permission,
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VCheckbox$1, {
                                          modelValue: _ctx.updateApiTokenForm.permissions,
                                          "onUpdate:modelValue": ($event) => _ctx.updateApiTokenForm.permissions = $event,
                                          label: permission,
                                          value: permission
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "value"])
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VRow$1, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(_ctx.availablePermissions, (permission) => {
                                  return openBlock(), createBlock(VCol$1, {
                                    key: permission,
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VCheckbox$1, {
                                        modelValue: _ctx.updateApiTokenForm.permissions,
                                        "onUpdate:modelValue": ($event) => _ctx.updateApiTokenForm.permissions = $event,
                                        label: permission,
                                        value: permission
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "value"])
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VContainer, null, {
                        default: withCtx(() => [
                          createVNode(VRow$1, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.availablePermissions, (permission) => {
                                return openBlock(), createBlock(VCol$1, {
                                  key: permission,
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCheckbox$1, {
                                      modelValue: _ctx.updateApiTokenForm.permissions,
                                      "onUpdate:modelValue": ($event) => _ctx.updateApiTokenForm.permissions = $event,
                                      label: permission,
                                      value: permission
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "value"])
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
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardActions$1, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VBtn$1, {
                      variant: "outlined",
                      onClick: ($event) => _ctx.managingPermissionsFor = null
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(` Cancel `);
                        } else {
                          return [
                            createTextVNode(" Cancel ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VBtn$1, {
                      color: "primary",
                      loading: _ctx.updateApiTokenForm.processing,
                      onClick: _ctx.updateApiToken
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(` Save `);
                        } else {
                          return [
                            createTextVNode(" Save ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VSpacer),
                      createVNode(VBtn$1, {
                        variant: "outlined",
                        onClick: ($event) => _ctx.managingPermissionsFor = null
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Cancel ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VBtn$1, {
                        color: "primary",
                        loading: _ctx.updateApiTokenForm.processing,
                        onClick: _ctx.updateApiToken
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Save ")
                        ]),
                        _: 1
                      }, 8, ["loading", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCardTitle$1, null, {
                  default: withCtx(() => [
                    createTextVNode(" API Token Permissions ")
                  ]),
                  _: 1
                }),
                createVNode(VCardText$1, null, {
                  default: withCtx(() => [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VRow$1, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.availablePermissions, (permission) => {
                              return openBlock(), createBlock(VCol$1, {
                                key: permission,
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCheckbox$1, {
                                    modelValue: _ctx.updateApiTokenForm.permissions,
                                    "onUpdate:modelValue": ($event) => _ctx.updateApiTokenForm.permissions = $event,
                                    label: permission,
                                    value: permission
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "value"])
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
                createVNode(VCardActions$1, null, {
                  default: withCtx(() => [
                    createVNode(VSpacer),
                    createVNode(VBtn$1, {
                      variant: "outlined",
                      onClick: ($event) => _ctx.managingPermissionsFor = null
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Cancel ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(VBtn$1, {
                      color: "primary",
                      loading: _ctx.updateApiTokenForm.processing,
                      onClick: _ctx.updateApiToken
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Save ")
                      ]),
                      _: 1
                    }, 8, ["loading", "onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VCard$1, null, {
            default: withCtx(() => [
              createVNode(VCardTitle$1, null, {
                default: withCtx(() => [
                  createTextVNode(" API Token Permissions ")
                ]),
                _: 1
              }),
              createVNode(VCardText$1, null, {
                default: withCtx(() => [
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode(VRow$1, null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.availablePermissions, (permission) => {
                            return openBlock(), createBlock(VCol$1, {
                              key: permission,
                              cols: "12",
                              md: "6"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCheckbox$1, {
                                  modelValue: _ctx.updateApiTokenForm.permissions,
                                  "onUpdate:modelValue": ($event) => _ctx.updateApiTokenForm.permissions = $event,
                                  label: permission,
                                  value: permission
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "value"])
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
              createVNode(VCardActions$1, null, {
                default: withCtx(() => [
                  createVNode(VSpacer),
                  createVNode(VBtn$1, {
                    variant: "outlined",
                    onClick: ($event) => _ctx.managingPermissionsFor = null
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Cancel ")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(VBtn$1, {
                    color: "primary",
                    loading: _ctx.updateApiTokenForm.processing,
                    onClick: _ctx.updateApiToken
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Save ")
                    ]),
                    _: 1
                  }, 8, ["loading", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(VDialog$1, {
    modelValue: _ctx.apiTokenBeingDeleted,
    "onUpdate:modelValue": ($event) => _ctx.apiTokenBeingDeleted = $event,
    "max-width": "500"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCard$1, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCardTitle$1, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Delete API Token`);
                  } else {
                    return [
                      createTextVNode("Delete API Token")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardText$1, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Are you sure you would like to delete this API token?`);
                  } else {
                    return [
                      createTextVNode("Are you sure you would like to delete this API token?")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardActions$1, { class: "justify-end" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VBtn$1, {
                      variant: "outlined",
                      onClick: ($event) => _ctx.apiTokenBeingDeleted = null
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(` Cancel `);
                        } else {
                          return [
                            createTextVNode(" Cancel ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VBtn$1, {
                      color: "error",
                      class: "ms-3",
                      loading: _ctx.deleteApiTokenForm.processing,
                      onClick: _ctx.deleteApiToken
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(` Delete `);
                        } else {
                          return [
                            createTextVNode(" Delete ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VBtn$1, {
                        variant: "outlined",
                        onClick: ($event) => _ctx.apiTokenBeingDeleted = null
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Cancel ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VBtn$1, {
                        color: "error",
                        class: "ms-3",
                        loading: _ctx.deleteApiTokenForm.processing,
                        onClick: _ctx.deleteApiToken
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Delete ")
                        ]),
                        _: 1
                      }, 8, ["loading", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCardTitle$1, null, {
                  default: withCtx(() => [
                    createTextVNode("Delete API Token")
                  ]),
                  _: 1
                }),
                createVNode(VCardText$1, null, {
                  default: withCtx(() => [
                    createTextVNode("Are you sure you would like to delete this API token?")
                  ]),
                  _: 1
                }),
                createVNode(VCardActions$1, { class: "justify-end" }, {
                  default: withCtx(() => [
                    createVNode(VBtn$1, {
                      variant: "outlined",
                      onClick: ($event) => _ctx.apiTokenBeingDeleted = null
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Cancel ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(VBtn$1, {
                      color: "error",
                      class: "ms-3",
                      loading: _ctx.deleteApiTokenForm.processing,
                      onClick: _ctx.deleteApiToken
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Delete ")
                      ]),
                      _: 1
                    }, 8, ["loading", "onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VCard$1, null, {
            default: withCtx(() => [
              createVNode(VCardTitle$1, null, {
                default: withCtx(() => [
                  createTextVNode("Delete API Token")
                ]),
                _: 1
              }),
              createVNode(VCardText$1, null, {
                default: withCtx(() => [
                  createTextVNode("Are you sure you would like to delete this API token?")
                ]),
                _: 1
              }),
              createVNode(VCardActions$1, { class: "justify-end" }, {
                default: withCtx(() => [
                  createVNode(VBtn$1, {
                    variant: "outlined",
                    onClick: ($event) => _ctx.apiTokenBeingDeleted = null
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Cancel ")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(VBtn$1, {
                    color: "error",
                    class: "ms-3",
                    loading: _ctx.deleteApiTokenForm.processing,
                    onClick: _ctx.deleteApiToken
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Delete ")
                    ]),
                    _: 1
                  }, 8, ["loading", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/API/Partials/ApiTokenManager.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ApiTokenManager = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  ApiTokenManager as default
};
