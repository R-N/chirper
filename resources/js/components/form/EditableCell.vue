<script lang="ts">
import { Vue, Component, Prop, Model, Emit, Ref, toNative, Setup } from 'vue-facing-decorator';
import { FormBase } from '@/components/form/FormBase.vue';
import { useForm } from '@inertiajs/vue3';

import ConfirmationSlot from '@/components/dialog/ConfirmationSlot.vue';
import IconButton from '../button/IconButton.vue';

@Component({
    name: "EditableCell",
    components: {
      ConfirmationSlot,
      IconButton
    },
    emits: ['edit', 'finish']
})
class EditableCell extends FormBase {
  @Prop({ default: false }) bypass;
  @Prop({ type: String }) title;
  @Prop({ type: String }) editText;
  @Prop({ type: String }) cancelText;
  @Prop({ type: String }) saveText;
  @Prop({ default: true }) showTitle;

  @Prop({ type: [String, Function] }) confirmTextMaker; 
  @Prop({ type: Function }) changeDetector;
  confirmDialog = false;

  editing = false;
  @Model({ default: false }) edit;
  @Prop({ type: String, default: 'value' }) name;
  
  @Prop({ type: Function }) onEdit;
  @Prop({ type: Function }) onFinish;

  @Emit("edit")
  emitEdit(){
    return true;
  }
  @Emit("finish")
  emitFinish(value=null){
      return value;
  }
  
  async beginEdit(){
    if(this.onEdit)
      await this.onEdit();
    else
      this.emitEdit();
    this.editing = true;
    this.reset();
  }

  async cancelEdit(){
    this.editing = false;
    if(this.onCancel)
      await this.onCancel();
    else
      this.emitCancel();
    this.reset();
  }

  async finishEdit(ask=null){
    this.validate();
    if(!this.valid) return;
    if(this.changeDetector && !this.changeDetector()){
      await this.cancelEdit();
      return;
    }
    if(!this.confirmTextMaker || !ask){
      await this.onConfirm();
      return;
    }
    await ask(this.onConfirm);
  }

  async onConfirm(){
    if(this.onFinish)
      await this.onFinish();
    else
      this.emitFinish();
    this.editing = false;
  }

}
export { EditableCell };
export default toNative(EditableCell);
</script>
<template>
  <ConfirmationSlot
    :confirmTextMaker="confirmTextMaker"
    v-slot="{ ask }"
    :on-confirm="onConfirm"
    class="d-flex flex-column flex-grow-1"
  >
    <div class="d-flex align-left justify-space-between" v-if="title && showTitle && !bypass">
      <span class="font-weight-bold">{{ title }}</span>
    </div>
    <div 
      class="d-flex align-center justify-space-between"
      @keydown.enter="finishEdit(ask)"
    >
      <span class="flex-grow-1">
        <slot v-if="bypass || (editing && !(disabled || busy))" name="editing" :readonly="disabled || busy || !editing" :disabled="disabled || busy || !editing" :editing="editing"></slot>
        <slot v-else name="default"></slot>
      </span>
      <span class="flex-grow-0 flex-shrink-0" v-if="!(disabled || busy) && !bypass">
        <span v-if="editing">
          <IconButton
              @click.prevent.stop="() => finishEdit(ask)" 
              :disabled="busy"
              icon="mdi-check"
              :text="saveText ?? $t('form.save')"
          />
          <IconButton
              @click.prevent.stop="cancelEdit" 
              :disabled="busy"
              icon="mdi-cancel"
              :text="cancelText ?? $t('form.cancel')"
          />
        </span>
        <span v-else>
          <IconButton
              @click.prevent.stop="beginEdit" 
              :disabled="busy"
              icon="mdi-pencil"
              :text="editText ?? $t('form.edit')"
          />
        </span>
      </span>
    </div>
  </ConfirmationSlot>
</template>
<style scoped>
</style>
