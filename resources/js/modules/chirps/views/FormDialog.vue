<script lang="ts">
import { Component, Prop, Emit, toNative } from 'vue-facing-decorator';
import FormDialog from '@/components/form/FormDialog.vue';
import { FormDialogBase } from '@/components/form/FormDialogBase.vue';
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
class ChirpFormDialog extends FormDialogBase {
    @Prop({ type: Object, default: null }) data;
    form = useForm({
        message: '',
    });

    reset(){
        this.form.reset();
    }

    async submit(){
        if(!this.valid) return;
        const view = this;
        view.busy = true;
        try{
            let res = null;
            if (this.data){
                res = await chirpService.update(this.data, this.form);
            }else{
                res = await chirpService.store(this.form);
            }
            view.emitSubmit(res.chirp);
            view.close();
        } finally {
            view.busy = false;
        }
    }

    @Emit("submit")
    emitSubmit(chirp){
        return chirp;
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
        title="Chirp"
        :disabled="disabled"
        :on-reset="reset"
        v-model="myDialog"
    >
        <template v-slot:fields="{ interactable, busy }">
            <VTextField 
                name="message"
                class="bigger-input" 
                label="Message" 
                v-model="form.message" 
                :disabled="!interactable" 
                required
            />
        </template>
    </FormDialog>
</template>
<style scoped>
</style>
