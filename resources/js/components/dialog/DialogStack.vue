<script lang="ts">
import { Vue, Component, Prop, toNative, Emit } from 'vue-facing-decorator';
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VSpacer, VBtn } from 'vuetify/components';

@Component({
  name: "DialogStack",
  emits: ['dialogstackpop']
})
class DialogStack extends Vue {
  @Prop({ type: Array }) items
  @Prop({ type: String }) closeText;

  get item(){
    if (this.items.length == 0) return null;
    let item = this.items[this.items.length-1];
    if (item.log)
      console.error(item);
    return item;
  }
  set item(value){
    if (!value){
      if (this.item.onDismiss) this.item.onDismiss();
      this.dialogStackPop();
    }
  }
  get model(){
    return !!this.item;
  }
  @Emit('dialogstackpop')
  dialogStackPop() {
      return this.item;
  }
}
export { DialogStack }
export default toNative(DialogStack);
</script>
<template>
  <VDialog v-model="model" persistent max-width="290" v-if="item">
    <VCard class="pt-2 pb-2 pl-2 pr-2">
      <VCardTitle class="headline" v-if="item.title">{{ item.title }}</VCardTitle>
      <VCardText v-if="item.text">{{ item.text }}</VCardText>
      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn ref="closeButton" color="secondary" text @click="item = null" :disabled="!item">{{ closeText ?? $t('form.close') }}</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
<style scoped>
</style>