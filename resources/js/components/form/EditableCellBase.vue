<script setup lang="ts">
import { useWorking } from "@/composables/useWorking";
import { useEditableCell } from "@/composables/useEditableCell";

const props = defineProps<{
  bypass?: boolean;
  title?: string;
  label?: string;
  name?: string;
  modelValue?: any;
  confirmTextMaker?: string | Function;
  disabled?: boolean;
  onFinish?: Function;
  errorMessages?: any;
  emitForm?: boolean;
  rules?: string | object | any[];
  showTitle?: boolean;
  parentBusy?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: any, releaseBusy?: Function): void;
  (e: "change", value: any, releaseBusy?: Function): void;
  (e: "finish", value: any, releaseBusy?: Function): void;
  (e: "reset"): void;
}>();

const { busy, releaseBusy, waitBusy, showError } = useWorking(props);

const {
  valueEdit,
  value,
  formData,
  _label,
  _rules,
  valid,
  getValue,
  reset,
  resetValidation,
  validate,
  prepopulate,
  finish,
  onUpdate,
} = useEditableCell(props, emit, { waitBusy, releaseBusy });

defineExpose({
  valueEdit,
  value,
  formData,
  _label,
  _rules,
  valid,
  getValue,
  reset,
  resetValidation,
  validate,
  prepopulate,
  finish,
  onUpdate,
  busy,
  waitBusy,
  releaseBusy,
  showError,
});
</script>
