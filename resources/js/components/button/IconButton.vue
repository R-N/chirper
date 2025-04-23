<script lang="ts">
import { Vue, Component, Prop, Emit, toNative } from 'vue-facing-decorator';
import ConfirmationSlot from '@/components/dialog/ConfirmationSlot.vue';
import {MyComponent} from '@/components/MyComponent.vue';

@Component({
    name: "IconButton",
    components: {
        ConfirmationSlot
    },
    emits: ['click']
})
class IconButton extends MyComponent {
    @Prop({default: 32}) size;
    @Prop({default: true}) small;
    @Prop({ type: String }) icon;
    @Prop({ type: String }) text;
    @Prop({default: false}) disabled;
    @Emit('click')
    emitClick(event){
        return event;
    }
}
export { IconButton };
export default toNative(IconButton);
</script>
<template>
    <VTooltip location="bottom" :disabled="disabled || !text" class="fill-height d-inline-flex">
        <template #activator="{ props }">
            <VBtn 
                icon 
                class="d-inline-flex" 
                v-bind="props" 
                :disabled="disabled"
                @click="emitClick($event)" 
            >
                <VIcon :size="size" :small="small">{{ icon }}</VIcon>
            </VBtn>
        </template>
        <span>{{ text }}</span>
    </VTooltip>
</template>
<style scoped>
</style>
