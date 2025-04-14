import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({ 
    auth_token: null, 
    user: {
      id: 0,
      name: '',
      email: '',
      role: 0,
    }
  }),
  getters: {
    isAuthenticated: (state) => !!state.auth_token,
    isLoggedIn: (state) => !!state.auth_token,
    isSuperAdmin: (state) => state.role===0, // todo
  },
  actions: {
    updateUser(user) {
      Object.assign(this.user, user); 
    },
    logout() {
      this.auth_token = null;
      this.updateUser({
        id: 0,
        name: '',
        email: '',
      });
    },
  },
  persist: {
    storage: localStorage, 
  }
});
