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
import CrudForm from "@/components/form/CrudForm.vue";

const BaseClass = SettingFormMixin(CrudFormBase);

@Component({
  name: "SettingForm",
  components: {
    EditableCellTextField,
    EditableCellSelect,
    SyncCheckbox,
    ConfirmationIconButton,
    CrudForm
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
  get fields() {
    return [
      {
        name: "key",
        label: this.$t('form.key'),
        type: "text",
        required: true,
      },
      {
        name: "type",
        label: this.$t('form.type'),
        type: "select",
        required: true,
        items: this.settingTypes,
        props: {
          itemTitle: null,
          itemValue: null
        }
      },
      {
        name: "value",
        label: this.$t('form.value'),
        type: "text",
        required: true,
      },
    ];
  }
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
    <CrudForm
      :setFieldConfirmText="setFieldConfirmText"
      :setField="setField"
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
<style scoped></style>
