<script lang="ts">
import { Vue, Component, Prop, toNative, Emit, Model } from 'vue-facing-decorator';
import ConfirmationSlot from '@/components/dialog/ConfirmationSlot.vue';
import { WorkingComponent } from '@/components/WorkingComponent.vue';

@Component({
    name: "SyncCheckbox",
    components: {
        ConfirmationSlot
    },
    emits: ['change']
})
class SyncCheckbox extends WorkingComponent {
    @Prop({ type: String }) name;
    @Prop({ type: String }) value;
    @Prop({ type: [String, Function] }) confirmTextMaker; 
    @Prop({ default: false }) disabled;
    @Prop({ type: String }) textEnable;
    @Prop({ type: String }) textDisable;
    @Prop({default: true}) ask;
    @Prop({ type: Function }) onChange;
    @Model({ type: Boolean, default: false }) inputValue;
    @Prop({ default: null }) errorMessages;

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
            // this.emitChange({ value: !this.inputValue, releaseBusy: this.releaseBusy });
            this.$emit('update:modelValue', !this.inputValue, this.releaseBusy);
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
                <template #activator="{ props }">
                    <VCheckbox 
                        v-bind="props"
                        :name="name"
                        v-model="inputValue"
                        :value="value"
                        @click.prevent.capture="() => tryAsk(ask)"
                        readonly
                        class="text-center justify-center justify-self-center"
                        :disabled="disabled"
                        :error-messages="errorMessages"
                    />
                </template>
                <span>{{ text }}</span>
            </VTooltip>
        </template>
    </ConfirmationSlot>
</template>
<style scoped>
</style>
