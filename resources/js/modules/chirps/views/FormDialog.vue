<script lang="ts">
import { Component, Prop, Emit, toNative } from "vue-facing-decorator";
import FormDialog from "@/components/form/FormDialog.vue";
import { CrudFormDialogBase } from "@/components/form/CrudFormDialogBase.vue";
import { useForm } from "@inertiajs/vue3";
import chirpService from "../services/chirp";
import { VTextField } from "vuetify/components";

@Component({
  name: "ChirpFormDialog",
  components: {
    FormDialog,
    VTextField
  },
  emits: ["submit"]
})
class ChirpFormDialog extends CrudFormDialogBase {
  formData = useForm({
    message: ""
  });
  client = chirpService;
}
export { ChirpFormDialog };
export default toNative(ChirpFormDialog);
</script>
<template>
  <FormDialog
    max-width="400"
    :parent-busy="busy"
    :on-submit="submit"
    :title="$t('chirp.item')"
    :disabled="disabled"
    :on-reset="reset"
    v-model="myDialog"
  >
    <template v-slot:fields="{ interactable, busy }">
      <VForm
        v-model="valid"
        :disabled="!interactable"
        @click.prevent.stop="() => null"
        @submit.prevent.stop="submit"
        :class="select ? '' : 'd-flex flex-column ga-3'"
        ref="form"
      >
        <VTextField
          name="message"
          class="bigger-input"
          :label="$t('chirp.message')"
          v-model="formData.message"
          :disabled="!interactable"
          required
          :error-messages="formData.errors.message"
          :rules="rules.message"
        />
      </VForm>
    </template>
  </FormDialog>
</template>
<style scoped></style>
