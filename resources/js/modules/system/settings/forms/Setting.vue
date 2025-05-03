<script lang="ts">
import { Component, Prop, Emit, Watch, toNative } from "vue-facing-decorator";
import { useForm } from "@inertiajs/vue3";
import settingService from "../services/setting";
import { CrudFormBase } from "@/components/form/CrudFormBase.vue";
import EditableCellTextField from "@/components/form/editable_cell/EditableCellTextField.vue";
import EditableCellSelect from "@/components/form/editable_cell/EditableCellSelect.vue";
import SyncCheckbox from "@/components/checkbox/SyncCheckbox.vue";
import { getArrayText } from "@/libs/util.js";
import ConfirmationIconButton from "@/components/button/ConfirmationIconButton.vue";
import { SettingFormMixin } from "../mixins/SettingForm.vue";

const BaseClass = SettingFormMixin(CrudFormBase);

@Component({
  name: "SettingForm",
  components: {
    EditableCellTextField,
    EditableCellSelect,
    SyncCheckbox,
    ConfirmationIconButton
  },
  emits: ["submit"]
})
class SettingForm extends BaseClass {
  @Prop({ default: true }) bypassEditableCell;

  client = settingService;
  formData = useForm({
    key: "",
    type: "",
    value: "",
    options: ""
  });
}
export { SettingForm };
export default toNative(SettingForm);
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
        :confirmTextMaker="deleteConfirmText(data)"
        :on-confirm="() => delete2(data)"
        :ask="(ask) => justAsk(data, ask)"
        :disabled="busy"
        :size="select ? 'small' : 'default'"
      />
    </div>
    <EditableCellTextField
      v-if="!select || select == 'key'"
      name="key"
      class="bigger-input"
      :label="$t('form.key')"
      :title="$t('form.key')"
      :showTitle="!select"
      v-model="formData.key"
      :disabled="!interactable"
      required
      :error-messages="formData.errors.key"
      :rules="rules.key"
      :bypass="bypassEditableCell"
      :value="formData.key"
      :confirm-text-maker="(value) => setFieldConfirmText('key', data, value)"
      :on-finish="(value) => setField('key', data, value)"
    />
    <EditableCellSelect
      v-if="!select || select == 'type'"
      class="bigger-input"
      name="type"
      type="type"
      :label="$t('form.type')"
      :title="$t('form.type')"
      :showTitle="!select"
      :items="settingTypes"
      item-value="name"
      item-title="name"
      v-model="formData.type"
      :disabled="!interactable"
      :error-messages="formData.errors.type"
      :bypass="bypassEditableCell"
      :confirm-text-maker="(value) => setFieldConfirmText('type', data, value)"
      :on-finish="(value) => setField('type', data, value)"
      :return-object="true"
    />
    <EditableCellTextField
      v-if="!select || select == 'value'"
      name="value"
      class="bigger-input"
      :label="$t('form.value')"
      :title="$t('form.value')"
      :showTitle="!select"
      v-model="formData.value"
      :disabled="!interactable"
      required
      :error-messages="formData.errors.value"
      :rules="rules.value"
      :bypass="bypassEditableCell"
      :value="formData.value"
      :confirm-text-maker="(value) => setFieldConfirmText('value', data, value)"
      :on-finish="(value) => setField('value', data, value)"
    />
  </VForm>
</template>
<style scoped></style>
