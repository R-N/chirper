<script lang="ts">
import { Vue, Component, Prop, Emit, toNative } from 'vue-facing-decorator';
import EditableCell from '@/components/form/EditableCell.vue';
import { EditableCellBase } from '../EditableCellBase.vue';

@Component({
      name: "EditableCellTextField",
      components: {
        EditableCell
      }
})
class EditableCellTextField extends EditableCellBase {
    @Prop({ type: String }) type;
    @Prop({ type: Number }) counter;
    @Prop({default: true}) required; 
}
export { EditableCellTextField } 
export default toNative(EditableCellTextField);
</script>
<template>
    <EditableCell 
        :on-reset="reset"
        :on-finish="finish"
        :change-detector="() => value != valueEdit"
        :confirm-text-maker="() => confirmTextMaker(valueEdit)"
        :parent-busy="busy"
        :disabled="disabled"
        :title="title"
        :name="name"
        :showTitle="showTitle"
        :bypass="bypass"
    >
        <template v-slot:editing>
            <VTextField 
                class="bigger-input"
                :name="name" 
                :model-value="valueEdit"
                @update:model-value="onUpdate"
                :rules="_rules"
                :counter="counter"
                :type="type"
                :disabled="busy || disabled"
                :required="required"
                :label="_label"
                :error-messages="errorMessages || formData?.errors?.[name]"
                @blur="validate"
            />
        </template>
        <template v-slot:default>
            <span class="bigger-input">{{ value }}</span>
        </template>
    </EditableCell>
</template>
<style scoped>
</style>
