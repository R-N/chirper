<script lang="ts">
import { useAuthStore } from '@/stores/auth';
import { Component } from 'vue-facing-decorator'
import { Constructor } from './Constructor.vue';

export const AuthMixin = <TBase extends Constructor>(Base: TBase) => {
  @Component({
    name: "AuthBase"
  })
  class AuthBase extends Base {
    authStore = useAuthStore();
    get isLoggedIn(){
      return this.authStore.isLoggedIn;
    }
    get userRoles(){
        if (this.isLoggedIn && this.authStore.user){
          return this.authStore.user.roles;
        }
        return [];
    }
    get userRolesText(){
        return this.userRoles.map((r) => r.name).join(', ');
    }
    get userName(){
        if (this.isLoggedIn && this.authStore.user) 
            return this.authStore.user.name;
        return '';
    }
  }
  return AuthBase;
}
</script>
