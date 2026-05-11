<script setup lang="ts">
import { computed, ref } from "vue";
import { useForm } from "@/plugins/inertia";

import CrudForm from "@/components/form/CrudForm.vue";
import { useWorking } from "@/composables/useWorking";
import { useFormBase } from "@/composables/useFormBase";
import { useCrudForm } from "@/composables/useCrudForm";
import { parseLaravelRules } from "@/libs/validation";
import { t } from "@/plugins/i18n";

const props = withDefaults(defineProps<{
  fields?: any[];
  client?: any;
  rules?: any;
  data?: any;
  nameField?: string;
  disabled?: boolean;
  title?: string;
  embedded?: boolean;
}>(), {
  fields: () => [],
  nameField: "name",
  embedded: false,
});

const emit = defineEmits<{
  submit: [value: any];
  cancel: [value: any];
  validate: [value: any];
}>();

const { busy, waitBusy } = useWorking();

const formBase = useFormBase(props, emit);
const {
  formData,
  valid,
  interactable,
  getForm,
  getValue,
  validate,
  reset,
} = formBase;

const _rules = computed(() => parseLaravelRules(props.rules));

const crudForm = useCrudForm({
  client: props.client,
  formData,
  data: computed(() => props.data),
});

function cancel() {
  reset();
  emit("cancel", getValue());
}

async function submit() {
  return await crudForm.submit({
    validate,
    valid,
    waitBusy,
    getValue,
    onSubmit: (result: any) => emit("submit", result),
    emit,
    close: () => {},
  });
}

const crud = computed(() => ({
  storeItem: null,
  setFieldConfirmText: () => "",
  setField: () => {},
}));

defineExpose({
  submit,
  validate,
  reset,
  getForm,
  getValue,
  busy,
  formData,
});
</script>
<template>
  <VForm
    v-model="valid"
    :disabled="!interactable"
    @submit.prevent.stop="submit"
    ref="form"
  >
    <VCard v-if="!embedded" class="pa-2">
      <VCardTitle v-if="title" class="pb-1">{{ title }}</VCardTitle>
      <VCardText>
        <CrudForm
          :fields="fields"
          :data="data"
          :form-data="formData"
          :rules="_rules"
          :set-field="crud.setField"
          :set-field-confirm-text="crud.setFieldConfirmText"
          :interactable="interactable && !busy"
          :bypass-editable-cell="true"
        />
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn
          color="green darken-1"
          text
          @click.stop="cancel"
          :disabled="!interactable || busy"
        >
          {{ $t("form.cancel") }}
        </VBtn>
        <VBtn
          color="green darken-1"
          text
          @click.prevent.stop="submit"
          :disabled="!interactable || busy"
          :loading="busy"
        >
          {{ $t("form.confirm") }}
        </VBtn>
      </VCardActions>
    </VCard>
    <template v-else>
      <CrudForm
        :fields="fields"
        :data="data"
        :form-data="formData"
        :rules="_rules"
        :set-field="crud.setField"
        :set-field-confirm-text="crud.setFieldConfirmText"
        :interactable="interactable && !busy"
        :bypass-editable-cell="true"
      />
    </template>
  </VForm>
</template>
