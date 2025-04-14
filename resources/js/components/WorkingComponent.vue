<script lang="ts">
import { useAppStore } from '@/stores/app';
import { Vue, Component, Prop, toNative } from 'vue-facing-decorator'
import { MyComponent } from '@/components/MyComponent.vue';


@Component({
    name: "WorkingComponent"
})
class WorkingComponent extends MyComponent {
    @Prop({ default: false }) parentBusy;
    selfBusy = false;

    get busy(){
        return this.selfBusy || this.parentBusy || this.appStore.routerBusy || this.appStore.tabBusy || this.appStore.authBusy || this.appStore.globalBusy
    }

    set busy(busy){
        this.selfBusy = busy;
    }

    releaseBusy(busy){
        this.busy = false;
    }

    get globalBusy(){
        return this.appStore.globalBusy;
    }

    set globalBusy(busy){
        this.appStore.globalBusy = busy;
    }

    get authBusy(){
        return this.appStore.authBusy;
    }

    set authBusy(busy){
        this.appStore.authBusy = busy;
    }

    get tabBusy(){
        return this.appStore.tabBusy;
    }

    set tabBusy(busy){
        this.appStore.tabBusy = busy;
    }
}
export { WorkingComponent };
export default toNative(WorkingComponent);
</script>
