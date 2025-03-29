import { useAuthStore } from '@/stores/auth';
import _axios from '@/plugins/axios'; 

class TwoFactorAuthService{
  constructor(axios) {
    this.axios = axios || _axios;
  }
  async enableTwoFactorAuthentication(){
    let res = await this.axios.post(route('two-factor.enable'));
    let qrCode = await this.showQrCode();
    let setupKey = await this.showSetupKey();
    let recoveryCodes = await this.showRecoveryCodes();
    return {
      ...res.data,
      qrCode,
      setupKey,
      recoveryCodes
    }
  };
  async showQrCode(){
    let res = await this.axios.get(route('two-factor.qr-code'));
    return res.data.svg;
  };

  async showSetupKey(){
    let res = await this.axios.get(route('two-factor.secret-key'));
    return res.data.secretKey;
  }

  async showRecoveryCodes(){
    let res = await this.axios.get(route('two-factor.recovery-codes'));
    return res.data;
  };

  async confirmTwoFactorAuthentication(form){
    let res = await this.axios.post(route('two-factor.confirm'), form);
    return res.data;
  };

  async regenerateRecoveryCodes(){
    let res = await this.axios.post(route('two-factor.confirm'));
    return this.showRecoveryCodes();
  };

  async disableTwoFactorAuthentication(){
    let res = await this.axios.delete(route('two-factor.disable'));
    return res.data;
  };
}

const twoFactorAuthService = new TwoFactorAuthService();

export { TwoFactorAuthService, twoFactorAuthService };
export default twoFactorAuthService;
