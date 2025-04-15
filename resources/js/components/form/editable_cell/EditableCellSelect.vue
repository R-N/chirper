<script lang=ts>
import { Vue, Component, Prop, Emit, toNative } from 'vue-facing-decorator';
import EditableCell from '@/components/form/EditableCell.vue';
import { EditableCellBase } from '../EditableCellBase.vue';

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
}
export { EditableCellSelect };
export default toNative(EditableCellSelect);
</script>
<template>
    <EditableCell 
        :on-reset="() => valueEdit = value"
        :on-finish="finish"
        :change-detector="() => value[itemValue] != valueEdit[itemValue]"
        :confirm-text-maker="() => confirmTextMaker(valueEdit)"
        :parent-busy="busy"
        :disabled="disabled"
        :title="title"
    >
        <template v-slot:editing>
            <v-select
                class="bigger-input"
                :label="label"
                :name="name"
                :items="items"
                :item-title="itemTitle"
                :item-value="itemValue"
                :value="value"
                :on-change="value => valueEdit = value"
                :disabled="busy || disabled"
            />
        </template>
        <template v-slot:default>
            <span class="bigger-input">{{ value[itemTitle] }}</span>
        </template>
    </EditableCell>
</template>
<style scoped>
</style>
