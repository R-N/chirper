<script lang="ts">
import { Vue, Component, Prop, Emit, toNative } from 'vue-facing-decorator';
import EditableCell from '@/components/form/EditableCell.vue';
import {WorkingComponent} from '@/components/WorkingComponent.vue';

@Component({
    name: "EditableCellBase",
    components: {
        EditableCell
    }
})
class EditableCellBase extends WorkingComponent {
    @Prop({ type: String }) title;
    @Prop({ type: String }) label;
    @Prop({ type: String }) name;
    @Prop({ type: [String, Object] }) value;
    @Prop({ type: [String, Function] }) confirmTextMaker; 
    @Prop({ default: false }) disabled;
    @Prop({ type: Function }) onFinish;

    valueEdit = '';

    finish(){
        this.emitChange(this.valueEdit);
        if (this.onFinish){
            this.busy = true;
            this.onFinish(this.valueEdit, this.releaseBusy);
            this.busy = false;
        } else{
            // this.emitFinish({ value: this.valueEdit, releaseBusy: this.releaseBusy });
            this.$emit("finish", this.valueEdit, this.releaseBusy);
        }
    }

    @Emit("change")
    emitChange(value){
        return value;
    }
    @Emit("finish")
    emitFinish(value){
        return value;
    }
}
export { EditableCellBase } 
export default toNative(EditableCellBase);
</script>
