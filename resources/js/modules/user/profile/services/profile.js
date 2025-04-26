import { useAuthStore } from '@/stores/auth';
import { getI18n } from '@/plugins/i18n';
import { getData } from '@/libs/util';
import BaseService from '@/services/base';

class ProfileService extends BaseService{
  constructor(axios) {
    super(axios);
  }

  async deleteUser(form) {
    //let target = route('profile.destroy');
    let target = route('current-user.destroy');
    let res = await this.delete(target, { data: form });
    return res;
  }
  async logoutOtherBrowserSessions(form){
    let target = route('other-browser-sessions.destroy');
    let res = await this.delete(target, { data: form });
    return res;
  };
  async updatePassword(form) {
    // let target = route('password.update');
    // let target = '/user/password';
    let target = route('user-password.update');
    let res = await this.put(target, form);
    return res;
  }
  
  async _updateProfileInformation(form) {
    let res = await this.patch(route('profile.update'), form);
    return res;
  }
  
  async updateProfileInformation(form, photo=null){
    const formData = new FormData();
    
    formData.append("name", form.name);
    formData.append("email", form.email);
    //formData.append('_method', 'PUT');
    if (photo || form.photo) {
      formData.append("photo", photo || form.photo);
    }
    
    let res = await this.post(route('user-profile-information.update'), formData, {
      headers: { "Content-Type": "multipart/form-data" },
      params: {
        // Laravel won't process multipart/form-data in a PUT request
        // So we send a POST request but spoof it as PUT
        _method: "PUT", 
      },
    });
    return res;
  };
  async deletePhoto(){
    let res = await this.delete(route('current-user-photo.destroy'));
    return res;
  };
  async setLocale(form) {
    const authStore = useAuthStore();
    let res = await this.put("/user/locale", form);
    let data = res;
    data = getData(data, 'user');
    authStore.updateUser(data)
    getI18n().global.locale = data.locale ?? 'en';
    return res;
  }
}

const profileService = new ProfileService();

export { ProfileService, profileService };
export default profileService;
