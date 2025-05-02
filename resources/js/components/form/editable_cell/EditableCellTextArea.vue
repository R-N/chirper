<script lang="ts">
import { Vue, Component, Prop, toNative } from 'vue-facing-decorator';
import EditableCell from '@/components/form/EditableCell.vue';
import {EditableCellTextField} from '@/components/form/editable_cell/EditableCellTextField.vue';

@Component({
    name: "EditableCellTextArea",
    components: {
        EditableCell
    }
})
class EditableCellTextArea extends EditableCellTextField {
}
export { EditableCellTextArea };
export default toNative(EditableCellTextArea);
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
        :name="name"
        :bypass="bypass"
    >
        <template v-slot:editing>
            <VTextarea 
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
            <span class="bigger-input" style="white-space: pre-line">{{ value }}</span>
        </template>
    </EditableCell>
</template>
<style scoped>
</style>
