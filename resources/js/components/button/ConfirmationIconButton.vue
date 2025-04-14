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
    @Prop({default: 32}) size;
    @Prop({default: true}) small;
    @Prop(String) icon;
    @Prop(String) text;
    @Prop([String, Function]) confirmTextMaker; 
    @Prop(Function) ask; 
    @Prop(Function) onConfirm; 
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
        class="text-center justify-center justify-self-center"
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
            :small="small"
        />
        </template>
    </ConfirmationSlot>
</template>
<style scoped>
</style>
