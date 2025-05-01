import { useAuthStore } from '@/stores/auth';
import { getI18n } from '@/plugins/i18n';
import BaseService from '@/services/base';

class AuthService extends BaseService{
  constructor(axios) {
    super(axios);
  }

  async getCsrfToken(){
    return await this.axios.init(true);
  }

  async login(form) {
    const authStore = useAuthStore();

    form = form.transform(data => ({
        ...data,
        remember: data.remember ? 'on' : '',
    }));

    let res = await this.post("/api/login", form);
    authStore.logout();
    if (res.auth_token){
      authStore.auth_token = res.auth_token;
    }
    if (res.user){
      authStore.updateUser(res.user);
      getI18n().global.locale = res.user.locale ?? 'en';
    }
    return res;
  }
  async logout() {
    const authStore = useAuthStore();

    let res = await this.get("/api/logout");

    authStore.logout();
    return res;
  }
  async switchToTeam(team){
    // router.put(route('api.current-team.update'), {
    //   team_id: team.id,
    // }, {
    //   preserveState: false,
    // });
    let res = await this.put(route('api.current-team.update'), {
      team_id: team.id,
    });
    return res;
  };
  async register(form) {
    const authStore = useAuthStore();
    let res = await this.post("/api/register", form);
    if (res.suer) authStore.updateUser(res.user);
    if (res.auth_token) authStore.auth_token = res.auth_token;
    return res;
  }
  async twoFactorLogin(form) {
    // await form.post(route('api.two-factor.login'));
    let res = await this.post(route('api.two-factor.login'), form);
    return res;
  }
  async forgotPassword(form) {
    //await form.post(route('api.password.email'));
    let res = await this.post(route('api.password.email'), form);
    return res;
  }
  async resetPassword(form) {
    //let target = route('api.password.store');
    let target = route('api.password.store');
    let res = await this.post(target, form);
    return res;
  }
  async confirmPassword(form) {
    //await form.post(route('api.password.confirm'));
    let res = await this.post(route('api.password.confirm'), form);
    return res;
  }
  async verifyEmail(form) {
    let res = await this.post(route('api.verification.send'), form);
    return res;
  }
}

const authService = new AuthService();

export { AuthService, authService };
export default authService;
