import { computed, watch } from "vue";

export function useDialog(props, emit, { busy, reset, waitBusy, releaseBusy }) {
  const myDialog = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      if (value == props.modelValue) return;
      reset?.();
      releaseBusy?.();
      emit("change", value);
      emit("update:modelValue", value);
    },
  });

  watch(() => props.modelValue, (newValue) => {
    if (newValue) {
      // prepopulate would be called by the form base if used
      if (props.onShow) props.onShow();
      else emit("show", true);
    }
  });

  async function close() {
    if (props.onCancel) {
      await waitBusy(async () => await props.onCancel(myDialog.value, releaseBusy));
    } else {
      emit("cancel", myDialog.value, releaseBusy);
    }
    if (typeof myDialog.value === "boolean" || myDialog.value instanceof Boolean) {
      myDialog.value = false;
    } else if (typeof myDialog.value === "string" || myDialog.value instanceof String) {
      myDialog.value = "";
    } else if (myDialog.value instanceof Object) {
      myDialog.value = null;
    } else if (myDialog.value instanceof Array) {
      myDialog.value.pop();
      myDialog.value = myDialog.value;
    } else {
      console.log(myDialog.value);
    }
    reset?.();
    releaseBusy?.();
  }

  return {
    myDialog,
    close,
  };
}
