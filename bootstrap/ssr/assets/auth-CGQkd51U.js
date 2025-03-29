import { u as useAuthStore } from "./auth-DrKxFB6F.js";
import { a as api } from "./axios-D4gWzKUO.js";
class AuthService {
  constructor(axios) {
    this.axios = axios || api;
  }
  async login(form) {
    const authStore = useAuthStore();
    form = form.transform((data) => ({
      ...data,
      remember: data.remember ? "on" : ""
    }));
    let res = await this.axios.post("/login", form);
    authStore.updateUser(res.data.user);
    authStore.setAuthToken(res.data.auth_token);
    return res;
  }
  async logout() {
    const authStore = useAuthStore();
    let res = await this.axios.post("/logout");
    authStore.logout();
    return res;
  }
  async switchToTeam(team) {
    let res = await this.axios.put(route("current-team.update"), {
      team_id: team.id
    });
    return res.data;
  }
  async register(form) {
    const authStore = useAuthStore();
    let res = await this.axios.post("/register", form);
    if (res.data.suer) authStore.updateUser(res.data.user);
    if (res.data.auth_token) authStore.setAuthToken(res.data.auth_token);
    return res.data;
  }
  async twoFactorLogin(form) {
    let res = await this.axios.post(route("two-factor.login"), form);
    return res.data;
  }
  async forgotPassword(form) {
    let res = await this.axios.post(route("password.email"), form);
    return res.data;
  }
  async resetPassword(form) {
    let target = route("password.update");
    let res = await this.axios.post(target, form);
    return res.data;
  }
  async confirmPassword(form) {
    let res = await this.axios.post(route("password.confirm"), form);
    return res.data;
  }
}
const authService = new AuthService();
export {
  authService as a
};
