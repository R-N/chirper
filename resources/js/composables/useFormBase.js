import { ref, computed, watch, onMounted, useTemplateRef, useSlots } from "vue";
import { useForm } from "@/plugins/inertia";
import { isFunction } from "@/libs/util";

export function useFormBase(props, emit, { formData: existingFormData } = {}) {
  const formData = existingFormData || useForm({});

  const refName = props.name ? `${props.name}Form` : "form";
  const dynamicFormRef = useTemplateRef(refName);

  const _valid = ref(true);

  const valid = computed({
    get() {
      if (getForm()?.valid === false) return false;
      if (getValue()?.valid === false) return false;
      return _valid.value;
    },
    set(value) {
      _valid.value = value;
    },
  });

  const item = computed(() => props.data);

  function getForm() {
    let form = null;
    if (props.form) form = props.form;
    else if (dynamicFormRef.value) form = dynamicFormRef.value;
    if (isFunction(form)) form = form();
    return form;
  }

  function getValue() {
    let form = getForm();
    form = form?.getForm?.() || form;
    return formData || form;
  }

  function prepopulate() {
    const form = getForm();
    form?.prepopulate?.();
    if (props.data) {
      Object.assign(formData, props.data);
    }
  }

  function resetValidation() {
    formData.clearErrors?.();
    getForm()?.resetValidation?.();
    _valid.value = true;
  }

  function validate() {
    resetValidation();
    const form = getForm();
    form?.validate?.();
    if (props.onValidate) props.onValidate(getForm()?.getForm?.() || getForm());
    else emit("validate", getForm()?.getForm?.() || getForm());
    return true;
  }

  function reset() {
    resetValidation();
    const form = getForm();
    form?.reset?.();
    formData.reset?.();
    const innerForm = form?.getForm?.() || form;
    innerForm?.reset?.();
    prepopulate();
    if (props.onReset) props.onReset(innerForm, formData);
    else emit("reset", innerForm, formData);
  }

  const interactable = computed(() => !props.disabled);

  watch(() => props.data, (newValue) => {
    if (newValue) prepopulate();
  });

  onMounted(() => {
    prepopulate();
  });

  return {
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
  };
}
