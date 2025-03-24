import { defineStore } from "pinia";
const useAuthStore = defineStore("auth", {
  state: () => ({
    auth_token: null,
    user: {
      id: 0,
      name: "",
      email: ""
    }
  }),
  getters: {
    isAuthenticated: (state) => !!state.auth_token
  },
  actions: {
    updateUser(user) {
      Object.assign(this.user, user);
    },
    setAuthToken(auth_token) {
      this.auth_token = auth_token;
    },
    logout() {
      this.auth_token = null;
      this.updateUser({
        id: 0,
        name: "",
        email: ""
      });
    }
  },
  persist: {
    storage: localStorage
    // Explicitly use localStorage
  }
});
export {
  useAuthStore as u
};
