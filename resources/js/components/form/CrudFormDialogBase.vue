<script setup lang="ts">
import { toRef } from "vue";
import { useWorking } from "@/composables/useWorking";
import { useFormBase } from "@/composables/useFormBase";
import { useDialog } from "@/composables/useDialog";
import { useCrudForm } from "@/composables/useCrudForm";

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
  modelValue?: boolean | string | object | any[];
  onShow?: Function;
  client?: any;
  updateFunction?: string;
  storeFunction?: string;
}>();

const emit = defineEmits<{
  (e: "cancel", value?: any, releaseBusy?: Function): void;
  (e: "reset", value?: any): void;
  (e: "change", value?: any): void;
  (e: "validate", value?: any): void;
  (e: "submit", value?: any): void;
  (e: "update:modelValue", value?: any): void;
  (e: "show", value?: any): void;
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

const { myDialog, close } = useDialog(props, emit, { busy, reset, waitBusy, releaseBusy });

const dataRef = toRef(props, "data");

const { submit: crudSubmit } = useCrudForm({
  client: props.client,
  formData,
  data: dataRef,
  updateFunction: props.updateFunction ?? "update",
  storeFunction: props.storeFunction ?? "store",
});

async function submit() {
  return await crudSubmit({
    validate,
    valid,
    waitBusy,
    getValue,
    onSubmit: props.onSubmit,
    emit,
    close,
  });
}

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
  myDialog,
});
</script>
