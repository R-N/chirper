import { markRaw } from "vue";
import IconButton from "@/components/button/IconButton.vue";
import ConfirmationIconButton from "@/components/button/ConfirmationIconButton.vue";

const presets = {
  edit: {
    component: markRaw(IconButton),
    icon: "mdi-pencil",
    event: "edit",
  },
  delete: {
    component: markRaw(ConfirmationIconButton),
    icon: "mdi-delete",
    event: "delete",
    confirm: true,
  },
};

export function resolveAction(actionDef) {
  if (actionDef.component) return actionDef;
  const preset = presets[actionDef.type];
  if (!preset) return actionDef;
  return { ...preset, ...actionDef };
}

export function registerActionType(type, preset) {
  presets[type] = preset;
}
