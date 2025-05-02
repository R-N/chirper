<script lang=ts>
import { Vue, Component, Prop, Emit, Model, toNative } from 'vue-facing-decorator';
import EditableCell from '@/components/form/EditableCell.vue';
import { EditableCellBase } from '../EditableCellBase.vue';
import { arraysEqualUnordered, getArrayText } from '@/libs/util.js';

const defaultValue = () => {
    return {"value": 0, "title": ""}
}
@Component({
    name: "EditableCellSelect",
    components: {
        EditableCell
    }
})
class EditableCellSelect extends EditableCellBase {
    @Prop({default: []}) items;
    @Prop({default: "value"}) itemValue;
    @Prop({default: "title"}) itemTitle;
    @Prop({default: false}) multiple;
    @Prop({default: false}) returnObject;
    @Model() model;

    getValue2(val){
        if(Array.isArray(val)){
            return val.map(this.getValue2);
        }else{
            return val[this.itemValue];
        }
    }

    getText(val, array=true, separator=', '){
        return getArrayText(val, (v) => v[this.itemTitle], array, separator);
    }

    changed(){
        if(Array.isArray(this.value)){
            return !arraysEqualUnordered(
                this.getValue2(this.value), 
                this.getValue2(this.valueEdit) 
            );
        }else{
            return this.getValue2(this.value) != this.getValue2(this.valueEdit);
        }
    }
}
export { EditableCellSelect };
export default toNative(EditableCellSelect);
</script>
<template>
    <EditableCell 
        :on-reset="reset"
        :on-finish="finish"
        :change-detector="changed"
        :confirm-text-maker="() => confirmTextMaker(valueEdit)"
        :parent-busy="busy"
        :disabled="disabled"
        :title="title"
        :name="name"
        :showTitle="showTitle"
        :bypass="bypass"
    >
        <template v-slot:editing>
            <VSelect
                class="bigger-input"
                :label="_label"
                :name="name"
                :items="items"
                :item-title="itemTitle"
                :item-value="itemValue"
                :model-value="valueEdit"
                @update:model-value="onUpdate"
                :on-change="value => valueEdit = value"
                :disabled="busy || disabled"
                :return-object="returnObject"
                :multiple="multiple"
                :error-messages="errorMessages || formData?.errors?.[name]"
                :rules="_rules"
                @blur="validate"
            />
        </template>
        <template v-slot:default>
            <span class="bigger-input">{{ getText(value, false) }}</span>
        </template>
    </EditableCell>
</template>
<style scoped>
</style>
