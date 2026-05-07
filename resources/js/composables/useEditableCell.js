import { ref, computed, watch, onMounted } from "vue";
import { useForm } from "@inertiajs/vue3";
import { isObject, getData, isObjectEmpty } from "@/libs/util";

export function useEditableCell(props, emit, { waitBusy, releaseBusy }) {
  const valueEdit = ref("");

  const value = computed({
    get() {
      return props.modelValue;
    },
    set(val) {
      emit("update:modelValue", val, releaseBusy);
    },
  });

  watch(value, () => {
    reset();
  });

  const _label = computed(() => {
    if (props.title && !props.bypass) return null;
    return props.label;
  });

  const _rules = computed(() => {
    if (isObject(props.rules)) {
      return getData(props.rules, props.name);
    }
    return props.rules;
  });

  const fieldName = props.name || "value";
  const formData = useForm({ [fieldName]: null });

  function prepopulate() {
    if (value.value) {
      if (Array.isArray(value.value)) {
        valueEdit.value = [...value.value];
      } else if (isObject(value.value)) {
        valueEdit.value = { ...value.value };
      } else {
        valueEdit.value = value.value;
      }
      formData[fieldName] = valueEdit.value;
    }
  }

  function reset() {
    if (Array.isArray(value.value)) {
      valueEdit.value = [];
    } else {
      valueEdit.value = null;
    }
    formData.reset?.();
    prepopulate();
  }

  function resetValidation() {
    formData.clearErrors();
  }

  function validate() {
    resetValidation();
    const rules = _rules.value;
    if (!rules) return;
    for (const rule of rules) {
      const result = rule(valueEdit.value);
      if (result !== true) {
        formData.errors[fieldName] = result;
        break;
      }
    }
  }

  const valid = computed(() => !Object.keys(formData.errors).length);

  function getValue() {
    if (props.emitForm) return formData;
    return valueEdit.value;
  }

  async function finish(getValueFn = null) {
    validate();
    if (!valid.value) return;
    let val = valueEdit.value;
    formData[fieldName] = getValueFn ? getValueFn(val) : val;
    value.value = valueEdit.value;
    val = getValue();
    emit("change", val, releaseBusy);
    if (props.onFinish) {
      await waitBusy(async () => await props.onFinish(val, releaseBusy));
    } else {
      emit("finish", val, releaseBusy);
    }
  }

  async function onUpdate(val) {
    valueEdit.value = val;
    if (props.bypass) {
      value.value = val;
    }
  }

  // created + mounted equivalent
  if (fieldName && (!formData || isObjectEmpty(formData))) {
    Object.assign(formData, { [fieldName]: "" });
  }
  reset();

  onMounted(() => {
    reset();
  });

  return {
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
  };
}
