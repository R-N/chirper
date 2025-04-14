<script lang="ts">
import { Vue, Component, Prop, toNative } from 'vue-facing-decorator';
import {MyComponent} from '@/components/MyComponent.vue';

@Component({
  name: "RefreshButton"
})
class RefreshButton extends MyComponent {
  @Prop({ default: true }) icon;
  @Prop({ default: true }) large;
  async refresh(){
    this.appStore.setRouterBusy(true);
    if(!this.appStore.globalBusy && !this.appStore.authBusy){
      window.location.reload();
    }else{
      this.appStore.setAuthBusy(false);
      this.appStore.setGlobalBusy(false);
      this.appStore.setGlobalRefresh(true);
    }
  }
}
export { RefreshButton };
export default toNative(RefreshButton);
</script>
<style scoped>
</style>