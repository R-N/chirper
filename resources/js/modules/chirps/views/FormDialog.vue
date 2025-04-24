<script lang="ts">
import { Component, Prop, Emit, toNative } from 'vue-facing-decorator';
import FormDialog from '@/components/form/FormDialog.vue';
import { CrudFormDialogBase } from '@/components/form/CrudFormDialogBase.vue';
import { useForm } from '@inertiajs/vue3';
import chirpService from '../services/chirp';
import { VTextField } from 'vuetify/components';

@Component({
    name: "ChirpFormDialog",
    components: {
        FormDialog,
        VTextField
    },
    emits: ['submit']
})
class ChirpFormDialog extends CrudFormDialogBase {
    form = useForm({
        message: '',
    });

    get client(){
        return chirpService;
    }
}
export { ChirpFormDialog }
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
            <VTextField 
                name="message"
                class="bigger-input" 
                :label="$t('chirp.message')" 
                v-model="form.message" 
                :disabled="!interactable" 
                required
            />
        </template>
    </FormDialog>
</template>
<style scoped>
</style>
