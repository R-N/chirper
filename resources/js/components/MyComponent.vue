<script lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useAppStore } from '@/stores/app';

import { Vue, Component, toNative } from 'vue-facing-decorator'


@Component({
  name: "MyComponent"
})
class MyComponent extends Vue {
  authStore = useAuthStore();
  appStore = useAppStore();
  log(x){
    console.log(x);
  }
  get isSuperAdmin(){
    return this.authStore.isSuperAdmin;
  }
  get isLoggedIn(){
    return this.authStore.isLoggedIn;
  }
  get userRole(){
    return this.authStore.role;
  }
  get userName(){
      if (this.isLoggedIn && this.authStore.user) 
          return this.authStore.user.name;
      return '';
  }
  get serverReachable(){
    return this.appStore.serverReachable;
  }
}
export { MyComponent };
export default toNative(MyComponent);
</script>
