<script lang="ts">
import { Vue, Component, Prop, toNative } from 'vue-facing-decorator';

@Component({
  name: "DialogStack"
})
class DialogStack extends Vue {
  @Prop(Array) items
  @Prop({default: "Tutup"}) closeText;

  get item(){
    if (this.items.length == 0) return null;
    return this.items[this.items.length-1];
  }
  set item(value){
    if (!value){
      if (this.item.onDismiss) this.item.onDismiss();
      this.$emit('dialogstackpop');
    }
  }

}
export { DialogStack }
export default toNative(DialogStack);
</script>
<template>
  <VDialog v-model="item" persistent max-width="290" v-if="item">
    <VCard>
      <VCardTitle class="headline" v-if="item.title">{{ item.title }}</VCardTitle>
      <VCardText v-if="item.text">{{ item.text }}</VCardText>
      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn ref="closeButton" color="green darken-1" text @click="item = null" :disabled="!item">{{ closeText }}</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
<style scoped>
</style>