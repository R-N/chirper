import { useAuthStore } from '@/stores/auth';
import _axios from '@/plugins/axios'; 

class ProfileService{
  constructor(axios) {
    this.axios = axios || _axios;
  }

  async deleteUser(form) {
    //let target = route('profile.destroy');
    let target = route('current-user.destroy');
    let res = await this.axios.delete(target, { data: form });
    return res.data;
  }
  async logoutOtherBrowserSessions(form){
    let target = route('other-browser-sessions.destroy');
    let res = await this.axios.delete(target, { data: form });
    return res.data;
  };
  async updatePassword(form) {
    // let target = route('password.update');
    // let target = '/user/password';
    let target = route('user-password.update');
    let res = await this.axios.put(target, form);
    return res.data;
  }
  
  async _updateProfileInformation(form) {
    let res = await this.axios.patch(route('profile.update'), form);
    return res.data;
  }
  
  async updateProfileInformation(form, photo=null){
    const formData = new FormData();
    
    formData.append("name", form.name);
    formData.append("email", form.email);
    //formData.append('_method', 'PUT');
    if (photo || form.photo) {
      formData.append("photo", photo || form.photo);
    }
    
    let res = await this.axios.post(route('user-profile-information.update'), formData, {
      headers: { "Content-Type": "multipart/form-data" },
      params: {
        // Laravel won't process multipart/form-data in a PUT request
        // So we send a POST request but spoof it as PUT
        _method: "PUT", 
      },
    });
    return res.data;
  };
  async deletePhoto(){
    let res = await this.axios.delete(route('current-user-photo.destroy'));
    return res.data;
  };
  async setLocale(form) {
    const authStore = useAuthStore();
    let res = await this.axios.put("/user/locale", form);
    authStore.user.locale = form.locale;
    i18n.global.locale.value = form.locale ?? 'en';
    return res;
  }
}

const profileService = new ProfileService();

export { ProfileService, profileService };
export default profileService;
