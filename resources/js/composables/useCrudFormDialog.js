import { computed } from "vue";
import { useForm } from "@inertiajs/vue3";
import { useWorking } from "@/composables/useWorking";
import { useFormBase } from "@/composables/useFormBase";
import { useDialog } from "@/composables/useDialog";
import { useCrudForm } from "@/composables/useCrudForm";

export function useCrudFormDialog(props, emit, { client, initialFormData = {} } = {}) {
  const { busy, waitBusy, releaseBusy, showError } = useWorking(props);

  const formData = useForm(initialFormData);

  const {
    formData: _formData,
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
  } = useFormBase(props, emit, { formData });

  const { myDialog, close } = useDialog(props, emit, { busy, reset, waitBusy, releaseBusy });

  const crudForm = useCrudForm({
    client,
    formData,
    data: computed(() => props.data),
  });

  async function submit() {
    validate();
    if (!valid.value) return;
    await crudForm.submit({
      validate,
      valid,
      waitBusy,
      getValue,
      onSubmit: props.onSubmit,
      emit,
      close,
    });
  }

  return {
    busy,
    waitBusy,
    releaseBusy,
    showError,
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
    myDialog,
    close,
    submit,
  };
}
