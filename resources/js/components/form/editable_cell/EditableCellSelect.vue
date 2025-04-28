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

    created(){
        if(Array.isArray(this.value)){
            this.valueEdit = [];
        }else{
            this.valueEdit = null;
        }
    }

    getValue(val){
        if(Array.isArray(val)){
            return val.map(this.getValue);
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
                this.getValue(this.value), 
                this.getValue(this.valueEdit) 
            );
        }else{
            return this.getValue(this.value) != this.getValue(this.valueEdit);
        }
    }
}
export { EditableCellSelect };
export default toNative(EditableCellSelect);
</script>
<template>
    <EditableCell 
        :on-reset="() => valueEdit = [...value]"
        :on-finish="finish"
        :change-detector="changed"
        :confirm-text-maker="() => confirmTextMaker(valueEdit)"
        :parent-busy="busy"
        :disabled="disabled"
        :title="title"
    >
        <template v-slot:editing>
            <VSelect
                class="bigger-input"
                :label="label"
                :name="name"
                :items="items"
                :item-title="itemTitle"
                :item-value="itemValue"
                v-model="valueEdit"
                :on-change="value => valueEdit = value"
                :disabled="busy || disabled"
                :return-object="returnObject"
                :multiple="multiple"
                :error-messages="errorMessages || form?.errors?.[name]"
                :rules="_rules"
            />
        </template>
        <template v-slot:default>
            <span class="bigger-input">{{ getText(value, false) }}</span>
        </template>
    </EditableCell>
</template>
<style scoped>
</style>
