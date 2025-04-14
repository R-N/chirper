<script lang="ts">
import { Vue, Component, Prop, toNative } from 'vue-facing-decorator';
import EditableCell from '@/components/form/EditableCell.vue';
import {WorkingComponent} from '@/components/WorkingComponent.vue';

@Component({
      name: "EditableCellTextField",
      components: {
        EditableCell
      }
})
class EditableCellTextField extends WorkingComponent {
    @Prop(String) title;
    @Prop(String) label;
    @Prop(String) name;
    @Prop(String) type;
    @Prop(String) value;
    @Prop(Number) counter;
    @Prop([String, Function]) confirmTextMaker; 
    @Prop({ default: false }) disabled;
    @Prop([Function, Array]) rules; 
    @Prop({default: true}) required; 
    @Prop(Function) onFinish;

    valueEdit = '';

    finish(){
        this.$emit('change', this.valueEdit);
        if (this.onFinish){
            this.busy = true;
            this.onFinish(this.valueEdit, this.releaseBusy);
            this.busy = false;
        } else{
            this.$emit('finish', this.valueEdit, this.releaseBusy);
        }
    }
}
export { EditableCellTextField } 
export default toNative(EditableCellTextField);
</script>
<template>
    <EditableCell 
        :on-reset="() => valueEdit = value"
        :on-finish="finish"
        :change-detector="() => value != valueEdit"
        :confirm-text-maker="() => confirmTextMaker(valueEdit)"
        :parent-busy="busy"
        :disabled="disabled"
        :title="title"
    >
        <template v-slot:editing>
            <VTextField 
                class="bigger-input"
                :name="name" 
                v-model="valueEdit" 
                :rules="rules"
                :counter="counter"
                :type="type"
                :disabled="busy || disabled"
                :required="required"
                :label="label"
            />
        </template>
        <template v-slot:default>
            <span class="bigger-input">{{ value }}</span>
        </template>
    </EditableCell>
</template>
<style scoped>
</style>
