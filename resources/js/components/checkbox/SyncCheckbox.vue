<script lang="ts">
import { Vue, Component, Prop, toNative } from 'vue-facing-decorator';
import ConfirmationSlot from '@/components/dialog/ConfirmationSlot.vue';
import { WorkingComponent } from '@/components/WorkingComponent.vue';

@Component({
    name: "SyncCheckbox",
    components: {
        ConfirmationSlot
    }
})
class SyncCheckbox extends WorkingComponent {
    @Prop(String) name;
    @Prop(String) value;
    @Prop({ default: false }) inputValue;
    @Prop([String, Function]) confirmTextMaker; 
    @Prop({ default: false }) disabled;
    @Prop(String) textEnable;
    @Prop(String) textDisable;
    @Prop(Function) onChange;
    @Prop({default: true}) ask;

    async tryAsk(ask){
        if (!this.disabled){
            if (this.ask)
                await ask();
            else
                await this.change();
        }
    }

    get text(){
        return this.inputValue ? this.textDisable :this. textEnable;
    }
    async change(){
        if (this.onChange){
            this.busy = true;
            await this.onChange(!this.inputValue, this.releaseBusy);
            this.busy = false;
        } else{
            this.$emit('change', !this.inputValue, this.releaseBusy);
        }
    }
}
export { SyncCheckbox } 
export default toNative(SyncCheckbox);
</script>
<template>
    <ConfirmationSlot
        class="d-flex text-center justify-center justify-self-center"
        :confirmTextMaker="confirmTextMaker"
        :on-confirm="change"
        :parent-busy="busy"
    >
        <template v-slot="{ ask }">
            <VTooltip bottom :disabled="disabled || !text">
                <template v-slot:activator="{ on, attrs }">
                    <VCheckbox 
                        :name="name"
                        :input-value="inputValue"
                        :value="value"
                        @click.prevent.capture="() => tryAsk(ask)"
                        readonly
                        class="text-center justify-center justify-self-center"
                        :disabled="disabled"
                    />
                </template>
                <span>aa{{ text }}</span>
            </VTooltip>
        </template>
    </ConfirmationSlot>
</template>
<style scoped>
</style>
