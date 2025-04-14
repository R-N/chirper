<script lang="ts">
import { Vue, Component, Prop, toNative } from 'vue-facing-decorator';
import ConfirmationSlot from '@/components/dialog/ConfirmationSlot.vue';
import {MyComponent} from '@/components/MyComponent.vue';

@Component({
    name: "IconButton",
    components: {
        ConfirmationSlot
    }
})
class IconButton extends MyComponent {
    @Prop({default: 32}) size;
    @Prop({default: true}) small;
    @Prop(String) icon;
    @Prop(String) text;
    @Prop({default: false}) disabled;
}
export { IconButton };
export default toNative(IconButton);
</script>
<template>
    <VTooltip bottom :disabled="disabled || !text">
        <template v-slot:activator="{ on, attrs }">
            <VBtn 
                icon 
                class="" 
                v-bind="attrs" 
                v-on="on"
                :disabled="disabled"
        @click="$emit('click', $event)" 
            >
                <VIcon :size="size" :small="small">{{ icon }}</VIcon>
            </VBtn>
        </template>
        <span>{{ text }}</span>
    </VTooltip>
</template>
<style scoped>
</style>
