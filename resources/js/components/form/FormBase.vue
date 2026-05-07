<script setup lang="ts">
import { useWorking } from "@/composables/useWorking";
import { useFormBase } from "@/composables/useFormBase";

const props = defineProps<{
  name?: string;
  disabled?: boolean;
  data?: object | null;
  rules?: any[] | Function | object;
  select?: string | null;
  form?: object | Function;
  onCancel?: Function;
  onChange?: Function;
  onReset?: Function;
  onValidate?: Function;
  onSubmit?: Function;
  parentBusy?: boolean;
}>();

const emit = defineEmits<{
  (e: "cancel", value?: any): void;
  (e: "reset", value?: any): void;
  (e: "change", value?: any): void;
  (e: "validate", value?: any): void;
  (e: "submit", value?: any): void;
}>();

const { busy, releaseBusy, waitBusy, showError } = useWorking(props);

const {
  formData,
  dynamicFormRef,
  valid,
  _valid,
  item,
  interactable,
  getForm,
  getValue,
  prepopulate,
  validate,
  resetValidation,
  reset,
} = useFormBase(props, emit);

async function submit() {
  validate();
  if (!valid.value) return;
  return await waitBusy(async () => {
    const form = getForm();
    let ret = null;
    if (props.onSubmit) {
      ret = await props.onSubmit(getValue());
    } else if (form && form.submit) {
      ret = await form.submit();
    } else {
      ret = emit("submit", getValue());
    }
    close();
    return ret;
  });
}

function close() {}

defineExpose({
  formData,
  dynamicFormRef,
  valid,
  _valid,
  item,
  interactable,
  getForm,
  getValue,
  prepopulate,
  validate,
  resetValidation,
  reset,
  submit,
  close,
  busy,
  waitBusy,
  releaseBusy,
  showError,
});
</script>
