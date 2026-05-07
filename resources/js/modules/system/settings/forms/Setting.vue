<script setup lang="ts">
import { computed, toRef } from "vue";
import { useForm } from "@inertiajs/vue3";
import settingService from "../services/setting";
import { useWorking } from "@/composables/useWorking";
import { useFormBase } from "@/composables/useFormBase";
import { useCrudForm } from "@/composables/useCrudForm";
import { useCrud } from "@/composables/useCrud";
import ConfirmationIconButton from "@/components/button/ConfirmationIconButton.vue";
import CrudForm from "@/components/form/CrudForm.vue";
import { t } from "@/plugins/i18n";

const props = defineProps<{
  bypassEditableCell?: boolean;
  showTitle?: boolean;
  disabled?: boolean;
  data?: any;
  rules?: any;
  select?: string;
  form?: any;
  onCancel?: Function;
  onChange?: Function;
  onReset?: Function;
  onValidate?: Function;
  onSubmit?: Function;
  parentBusy?: boolean;
  settingTypes?: any[];
}>();

const emit = defineEmits<{
  submit: [value: any];
}>();

const { busy, waitBusy, showError, releaseBusy } = useWorking(props);
const formBase = useFormBase(props, emit);
const { formData, valid, interactable, validate, getValue, reset, prepopulate, getForm } = formBase;

const dataRef = toRef(props, "data");
const crud = useCrud({ client: settingService, waitBusy, nameField: "key" });

const { submit: crudFormSubmit } = useCrudForm({
  client: settingService,
  formData,
  data: dataRef,
});

function close() {}

async function submit() {
  return await crudFormSubmit({
    validate,
    valid,
    waitBusy,
    getValue,
    onSubmit: props.onSubmit,
    emit,
    close,
  });
}

const fields = computed(() => [
  {
    name: "key",
    label: t("form.key"),
    type: "text",
    required: true,
    model: "key",
  },
  {
    name: "type",
    label: t("form.type"),
    type: "select",
    required: true,
    model: "type",
    props: {
      items: props.settingTypes,
      itemTitle: null,
      itemValue: null,
    },
  },
  {
    name: "value",
    label: t("form.value"),
    type: "text",
    required: true,
    model: "value",
  },
]);
</script>
<template>
  <VForm
    v-model="valid"
    :disabled="!interactable"
    @click.prevent.stop="() => null"
    @submit.prevent.stop="submit"
    :class="select ? '' : 'd-flex flex-column ga-3'"
  >
    <div class="d-flex flex-row ga-3">
      <ConfirmationIconButton
        v-if="(!select || select == 'delete') && data"
        icon="mdi-delete"
        :text="$t('form.delete')"
        :confirmTextMaker="crud.deleteConfirmText(data)"
        :on-confirm="() => crud.delete2(data)"
        :ask="(ask) => crud.justAsk(data, ask)"
        :disabled="busy"
        :size="select ? 'small' : 'default'"
      />
    </div>
    <CrudForm
      :setFieldConfirmText="crud.setFieldConfirmText"
      :setField="crud.setField"
      :data="data"
      :bypassEditableCell="bypassEditableCell"
      :fields="fields"
      :rules="rules"
      :interactable="interactable"
      :formData="formData"
      :select="select"
    />
  </VForm>
</template>
