<script lang="ts">
import { Vue, Component, Prop, Emit, toNative, Setup } from 'vue-facing-decorator';
import EditableCell from '@/components/form/EditableCell.vue';
import {WorkingComponent} from '@/components/WorkingComponent.vue';
import { useForm } from '@inertiajs/vue3';

@Component({
    name: "EditableCellBase",
    components: {
        EditableCell
    }
})
class EditableCellBase extends WorkingComponent {
    @Prop({ type: String }) title;
    @Prop({ type: String }) label;
    @Prop({ type: String, default: 'value' }) name;
    @Prop({ type: [String, Object, Array] }) value;
    @Prop({ type: [String, Function] }) confirmTextMaker; 
    @Prop({ default: false }) disabled;
    @Prop({ type: Function }) onFinish;
    @Prop({ default: null }) errorMessages;
    @Prop({ default: true }) emitForm;

    @Setup((props, ctx) => {
        if (props.name){
            return useForm({
                [props.name]: null,
            });
        }else{
            return useForm({
                value: null,
            });
        }
    }) form;
    valueEdit = '';

    created(){
        this.form = useForm({
            [this.name]: '',
        });
    }

    getValue(){
        if (this.emitForm)
            return this.form;
        return this.valueEdit;
    }

    finish(){
        this.form[this.name] = this.valueEdit;
        this.$emit("change", this.getValue());
        if (this.onFinish){
            this.busy = true;
            this.onFinish(this.getValue(), this.releaseBusy);
            this.busy = false;
        } else{
            // this.emitFinish({ value: this.valueEdit, releaseBusy: this.releaseBusy });
            this.$emit("finish", this.getValue(), this.releaseBusy);
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
