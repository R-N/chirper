import { useAuthStore } from '@/stores/auth';
import _axios from '@/plugins/axios'; 
import { getI18n } from '@/plugins/i18n';

class AuthService{
  constructor(axios) {
    this.axios = axios || _axios;
  }

  async login(form) {
    const authStore = useAuthStore();

    form = form.transform(data => ({
        ...data,
        remember: data.remember ? 'on' : '',
    }));

    let res = await this.axios.post("/login", form);
    authStore.logout();
    if (res.data.auth_token){
      authStore.auth_token = res.data.auth_token;
    }
    if (res.data.user){
      authStore.updateUser(res.data.user);
      getI18n().global.locale = res.data.user.locale ?? 'en';
    }
    return res;
  }
  async logout() {
    const authStore = useAuthStore();

    let res = await this.axios.get("/logout");

    authStore.logout();
    return res;
  }
  async switchToTeam(team){
    // router.put(route('current-team.update'), {
    //   team_id: team.id,
    // }, {
    //   preserveState: false,
    // });
    let res = await this.axios.put(route('current-team.update'), {
      team_id: team.id,
    });
    return res.data;
  };
  async register(form) {
    const authStore = useAuthStore();
    let res = await this.axios.post("/register", form);
    if (res.data.suer) authStore.updateUser(res.data.user);
    if (res.data.auth_token) authStore.auth_token = res.data.auth_token;
    return res.data;
  }
  async twoFactorLogin(form) {
    // await form.post(route('two-factor.login'));
    let res = await this.axios.post(route('two-factor.login'), form);
    return res.data;
  }
  async forgotPassword(form) {
    //await form.post(route('password.email'));
    let res = await this.axios.post(route('password.email'), form);
    return res.data;
  }
  async resetPassword(form) {
    //let target = route('password.store');
    let target = route('password.store');
    let res = await this.axios.post(target, form);
    return res.data;
  }
  async confirmPassword(form) {
    //await form.post(route('password.confirm'));
    let res = await this.axios.post(route('password.confirm'), form);
    return res.data;
  }
  async verifyEmail(form) {
    let res = await this.axios.post(route('verification.send'), form);
    return res.data;
  }
}

const authService = new AuthService();

export { AuthService, authService };
export default authService;
