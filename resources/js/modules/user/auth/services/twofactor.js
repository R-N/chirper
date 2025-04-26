import { useAuthStore } from '@/stores/auth';
import BaseService from '@/services/base';

class TwoFactorAuthService extends BaseService{
  constructor(axios) {
    super(axios);
  }
  async enableTwoFactorAuthentication(){
    let res = await this.post(route('two-factor.enable'));
    let qrCode = await this.showQrCode();
    let setupKey = await this.showSetupKey();
    let recoveryCodes = await this.showRecoveryCodes();
    return {
      ...res,
      qrCode,
      setupKey,
      recoveryCodes
    }
  };
  async showQrCode(){
    let res = await this.get(route('two-factor.qr-code'));
    return res.svg;
  };

  async showSetupKey(){
    let res = await this.get(route('two-factor.secret-key'));
    return res.secretKey;
  }

  async showRecoveryCodes(){
    let res = await this.get(route('two-factor.recovery-codes'));
    return res;
  };

  async confirmTwoFactorAuthentication(form){
    let res = await this.post(route('two-factor.confirm'), form);
    return res;
  };

  async regenerateRecoveryCodes(){
    let res = await this.post(route('two-factor.confirm'));
    return this.showRecoveryCodes();
  };

  async disableTwoFactorAuthentication(){
    let res = await this.delete(route('two-factor.disable'));
    return res;
  };
}

const twoFactorAuthService = new TwoFactorAuthService();

export { TwoFactorAuthService, twoFactorAuthService };
export default twoFactorAuthService;
