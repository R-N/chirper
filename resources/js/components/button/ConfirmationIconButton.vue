<script lang="ts">
import { Vue, Component, Prop, toNative } from 'vue-facing-decorator';
import ConfirmationSlot from '@/components/dialog/ConfirmationSlot.vue';
import {WorkingComponent} from '@/components/WorkingComponent.vue';
import IconButton from '@/components/button/IconButton.vue';

@Component({
    name: "ConfirmationIconButton",
    components: {
        ConfirmationSlot,
        IconButton
    }
})
class ConfirmationIconButton extends WorkingComponent {
    @Prop({ default: 'small' }) size;
    @Prop({ type: String }) type;
    @Prop({ type: String }) icon;
    @Prop({ type: String }) text;
    @Prop({ type: [String, Function] }) confirmTextMaker; 
    @Prop({ type: Function }) ask; 
    @Prop({ type: Function }) onConfirm; 
    @Prop({ default: false }) disabled;
    @Prop({ default: null }) item;

    tryAsk(ask){
        if (this.ask){
            this.ask(ask);
        }else{
            ask();
        }
    }
}
export { ConfirmationIconButton };
export default toNative(ConfirmationIconButton);
</script>
<template>
    <ConfirmationSlot
        class="text-center justify-center justify-self-center fill-height"
        :confirmTextMaker="confirmTextMaker"
        :on-confirm="() => onConfirm()"
        :parent-busy="busy"
    >
        <template v-slot="{ ask }">
            <IconButton
                @click.stop="tryAsk(ask)" 
                :disabled="busy || disabled"
                :icon="icon"
                :text="text"
                :size="size"
                :type="type"
            />
        </template>
    </ConfirmationSlot>
</template>
<style scoped>
</style>
