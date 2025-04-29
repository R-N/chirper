import { defineStore } from 'pinia';
import { deepAssign } from '@/libs/util';

export const useAuthStore = defineStore('auth', {
  state: () => ({ 
    auth_token: null, 
    user: {
      id: 0,
      name: '',
      email: '',
      roles: [],
      permissions: [],
      enabled: true,
      verified: false,
      locale: 'en',
    }
  }),
  getters: {
    isAuthenticated: (state) => !!state.auth_token,
    isLoggedIn: (state) => !!state.auth_token,
    isSuperAdmin: (state) => state.role===0, // todo
  },
  actions: {
    updateUser(user) {
      deepAssign(this.user, user); 
    },
    logout() {
      this.auth_token = null;
      this.updateUser({
        id: 0,
        name: '',
        email: '',
        roles: [],
        permissions: [],
        enabled: true,
        verified: false,
        locale: 'en',
      });
    },
  },
  persist: {
    storage: localStorage, 
  }
});
